import * as tensorflow from "@tensorflow/tfjs";
import { POSE_LANDMARKS } from "@mediapipe/pose";
import { Results } from "./mediapipe";
import {
  angleBetweenTwoVectors,
  crossProduct,
  directionBetweenTwoVectors,
  findPerpendicularVector,
  getAngleWithXAxis,
  getPerpendicularVector,
  normalizeVector,
  pointDifference,
} from "./geometrics";
import { HandShapeType, Movement, MovementAxis } from "../signs";

// Developement mode only for capture dataset for handshape
const CAPTURE_HAND_DATA = true;

export interface SubjectData {
  frame: number;
  body: {
    // [-] left [+] right
    angle: number | undefined;
  };
  hand: {
    dominant: SubjectHandData;
    nonDominant: SubjectHandData;
  };
  readings: SubjectReadings;
}

export interface SubjectHandData {
  // x [+] dominant hand oposite direction [-1] dominant hand direction
  // y [+] up [-1] down
  // z [+] front [-1] back
  ponting: Vector | undefined;
  // [+] dominant hand oposite direction [-1] dominant hand direction
  // [+] up [-1] down
  // [+] front [-1] back
  palm: Vector | undefined;
  handShape: HandShapeType | undefined;
  movement: Movement;
  location?: string;
}

export interface SubjectReadings {
  dominantLandmarks: Coordinate[];
  nonDominantLandmarks: Coordinate[];
  dominantWorldLandmarks: Coordinate[];
  nonDominantWorldLandmarks: Coordinate[];
  poseLandmarks: Coordinate[];
  poseWorldLandmarks: Coordinate[];
}

export class Subject {
  private canvas: HTMLCanvasElement;
  private bufferSize: number;
  private model: tensorflow.LayersModel;
  private buffer: SubjectData[];
  private dominantHand: "RIGHT" | "LEFT";
  private frame: number;
  private dataset: any[];

  constructor(
    canvas: HTMLCanvasElement,
    bufferSize: number,
    model: tensorflow.LayersModel,
    dominantHand: "RIGHT" | "LEFT" = "RIGHT"
  ) {
    this.canvas = canvas;
    this.bufferSize = bufferSize;
    this.model = model;
    this.buffer = [];
    this.dominantHand = dominantHand;
    this.frame = 0;
    // Capture dataset: dev mode only
    this.dataset = [];
  }

  public parse(results: Results, isSpacedPressed = false): SubjectData {
    const subject = this.initializeSujectObject(results);

    this.updateBuffer(subject);
    this.setSubjectBodyAngle(subject, results);
    this.setSubjectHandShape(subject, isSpacedPressed);
    this.setSubjectHandPointing(subject);
    this.setSubjectHandPalm(subject);
    this.setSubjectHandMovement(subject);

    return subject;
  }

  public getBuffer(start?: number, end?: number): SubjectData[] {
    const startIndex = start
      ? this.buffer.findIndex((value) => value.frame === start)
      : 0;
    const endIndex = end
      ? this.buffer.findIndex((value) => value.frame === end)
      : this.buffer.length - 1;

    return this.buffer.slice(startIndex, endIndex + 1);
  }

  public getBufferIndexes(
    start?: number,
    end?: number
  ): { startIndex: number; endIndex: number } {
    const startIndex = start
      ? this.buffer.findIndex((value) => value.frame === start)
      : 0;
    const endIndex = end
      ? this.buffer.findIndex((value) => value.frame === end)
      : this.buffer.length - 1;

    return {
      startIndex,
      endIndex,
    };
  }

  private initializeSujectObject(results: Results): SubjectData {
    const {
      dominantLandmarks,
      nonDominantLandmarks,
      dominantWorldLandmarks,
      nonDominantWorldLandmarks,
    } = this.parseHandsLandmarks(results);

    const subject = {
      frame: this.frame,
      body: {
        angle: undefined,
      },
      hand: {
        dominant: {
          ponting: undefined,
          palm: undefined,
          handShape: undefined,
          movement: {},
        },
        nonDominant: {
          ponting: undefined,
          palm: undefined,
          handShape: undefined,
          movement: {},
        },
      },
      readings: {
        dominantLandmarks,
        nonDominantLandmarks,
        dominantWorldLandmarks,
        nonDominantWorldLandmarks,
        poseLandmarks: results.poseLandmarks,
        poseWorldLandmarks: results.poseWorldLandmarks,
      },
    };

    this.frame += 1;

    return subject;
  }

  private updateBuffer(subject: SubjectData): void {
    this.buffer.push(subject);

    if (this.buffer.length > this.bufferSize) {
      this.buffer.shift();
    }
  }

  private setSubjectBodyAngle(subject: SubjectData, results: Results): void {
    if (results.poseWorldLandmarks.length) {
      const vector = getPerpendicularVector(
        results.poseWorldLandmarks[POSE_LANDMARKS.RIGHT_SHOULDER],
        results.poseWorldLandmarks[POSE_LANDMARKS.LEFT_SHOULDER]
      );
      const angle = getAngleWithXAxis(vector);

      subject.body.angle = angle - 90;
    }
  }

  private parseHandsLandmarks(results: Results): {
    dominantLandmarks: Coordinate[];
    nonDominantLandmarks: Coordinate[];
    dominantWorldLandmarks: Coordinate[];
    nonDominantWorldLandmarks: Coordinate[];
  } {
    let nonDominantLandmarks: Coordinate[] = [];
    let dominantLandmarks: Coordinate[] = [];
    let nonDominantWorldLandmarks: Coordinate[] = [];
    let dominantWorldLandmarks: Coordinate[] = [];

    results.multiHandedness.forEach((hand, index) => {
      if (
        // mediapipe joga as maos invertidas, porque espera a imagem invertida e não espelhada da
        // camera
        (this.dominantHand === "RIGHT" && hand.label === "Left") ||
        (this.dominantHand === "LEFT" && hand.label === "Right")
      ) {
        dominantLandmarks = (results.multiHandLandmarks[index] ?? []).map(
          (landmark) => {
            return {
              x: landmark.x * this.canvas.width,
              y: landmark.y * this.canvas.height,
              z: landmark.z * this.canvas.width,
            };
          }
        );
        dominantWorldLandmarks = results.multiHandWorldLandmarks[index] ?? [];
      } else if (
        (this.dominantHand === "LEFT" && hand.label === "Left") ||
        (this.dominantHand === "RIGHT" && hand.label === "Right")
      ) {
        nonDominantLandmarks = results.multiHandLandmarks[index].map(
          (landmark) => {
            return {
              x: landmark.x * this.canvas.width,
              y: landmark.y * this.canvas.height,
              z: landmark.z * this.canvas.width,
            };
          }
        );
        nonDominantWorldLandmarks = results.multiHandWorldLandmarks[index];
      }
    });

    return {
      dominantLandmarks,
      nonDominantLandmarks,
      dominantWorldLandmarks,
      nonDominantWorldLandmarks,
    };
  }

  private setSubjectHandShape(
    subject: SubjectData,
    isSpacedPressed = false
  ): void {
    const dominantWorldLandmarks = subject.readings.dominantWorldLandmarks;
    const nonDominantWorldLandmarks =
      subject.readings.nonDominantWorldLandmarks;
    const PROBABILITY_THRESHOLD = 0.7;

    if (dominantWorldLandmarks.length) {
      const { handShape, probability } = this.detectHandShape(
        dominantWorldLandmarks,
        isSpacedPressed
      );

      if (probability > PROBABILITY_THRESHOLD) {
        subject.hand.dominant.handShape = handShape;
      }
    }

    if (nonDominantWorldLandmarks.length) {
      const { handShape, probability } = this.detectHandShape(
        nonDominantWorldLandmarks,
        isSpacedPressed
      );

      if (probability > PROBABILITY_THRESHOLD) {
        subject.hand.nonDominant.handShape = handShape;
      }
    }
  }

  private detectHandShape(
    landmarks: Coordinate[],
    isSpacedPressed = false
  ): {
    handShape: HandShapeType;
    probability: number;
  } {
    const inputData: number[] = landmarks
      .map((landmark) => [landmark.x, landmark.y, landmark.z])
      .flat();

    if (CAPTURE_HAND_DATA && isSpacedPressed) {
      this.dataset.push(inputData);
      (window as any).DATASET = this.dataset;
      console.log(this.dataset);
    }

    const inputTensor = tensorflow.tensor2d([inputData]);
    const prediction = this.model.predict(inputTensor);
    const predictionArray: number[][] = (prediction as any).arraySync();

    const maxProbability = Math.max(...predictionArray[0]);
    const indexOfMaxProbability = predictionArray[0].indexOf(maxProbability);

    const mapper = [
      "a",
      "c",
      "claws",
      "d",
      "f",
      "handCupping",
      "i",
      "indexFinger",
      "l",
      "middleAndIndexFinger",
      "middleFingerBendedFingersApart",
      "o",
      "oi",
      "openHand",
      "openHandFingersApart",
      "openHandThumbApart",
      "s",
      "thumbFinger",
      "thumbTouchIndexFingersClosed",
      "thumbTouchIndexFingersOpen",
      "y",
    ];

    const handShape = mapper[indexOfMaxProbability];
    const probability = maxProbability;

    return { handShape, probability };
  }

  private setSubjectHandPointing(subject: SubjectData): void {
    const dominantWorldLandmarks = subject.readings.dominantWorldLandmarks;
    const nonDominantWorldLandmarks =
      subject.readings.nonDominantWorldLandmarks;

    if (dominantWorldLandmarks.length) {
      subject.hand.dominant.ponting = this.parseSubjectHandPointing(
        dominantWorldLandmarks
      );
    }

    if (nonDominantWorldLandmarks.length) {
      subject.hand.nonDominant.ponting = this.parseSubjectHandPointing(
        nonDominantWorldLandmarks
      );
    }
  }

  private parseSubjectHandPointing(handWorldLandmarks: Coordinate[]): Vector {
    return normalizeVector(
      pointDifference(handWorldLandmarks[9], handWorldLandmarks[0])
    );
  }

  private setSubjectHandPalm(subject: SubjectData): void {
    const dominantWorldLandmarks = subject.readings.dominantWorldLandmarks;
    const nonDominantWorldLandmarks =
      subject.readings.nonDominantWorldLandmarks;

    if (dominantWorldLandmarks.length) {
      subject.hand.dominant.palm = this.parseSubjectHandPalm(
        dominantWorldLandmarks
      );
    }

    if (nonDominantWorldLandmarks.length) {
      subject.hand.nonDominant.palm = this.parseSubjectHandPalm(
        nonDominantWorldLandmarks
      );
      subject.hand.nonDominant.palm.x = -subject.hand.nonDominant.palm.x;
      subject.hand.nonDominant.palm.y = -subject.hand.nonDominant.palm.y;
      subject.hand.nonDominant.palm.z = -subject.hand.nonDominant.palm.z;
    }
  }

  private parseSubjectHandPalm(handWorldLandmarks: Coordinate[]): Vector {
    const vector = findPerpendicularVector(
      handWorldLandmarks[5],
      handWorldLandmarks[9],
      handWorldLandmarks[0]
    );

    return {
      x: -vector.x, // [-] = left, [+] = right
      y: -vector.y, // [-] = down, [+] = up
      z: -vector.z, // [-] = user, [+] = camera
    };
  }

  private setSubjectHandMovement(subject: SubjectData): void {
    const before = this.buffer[this.buffer.length - 5];
    const after = this.buffer[this.buffer.length - 1];

    if (
      before?.readings.poseWorldLandmarks.length &&
      after?.readings.poseWorldLandmarks.length
    ) {
      const frontOrBackMoviment = this.parseSubjectHandMovimentFrontOrBack(
        before.readings.poseLandmarks,
        after.readings.poseLandmarks
      );

      if (
        before?.readings.dominantLandmarks.length &&
        after?.readings.dominantLandmarks.length
      ) {
        const wristExtensionOrFlexion = this.parseWristFlexionOrExtension(
          after.readings.dominantLandmarks,
          before.readings.dominantLandmarks,
          after.readings.poseLandmarks,
          before.readings.poseLandmarks,
          true
        );

        subject.hand.dominant.movement = {
          ...this.parseSubjectHandMovement(
            before.readings.dominantLandmarks,
            after.readings.dominantLandmarks
          ),
          ...wristExtensionOrFlexion,
          ...frontOrBackMoviment.dominant,
        };
      }

      if (
        before?.readings.nonDominantLandmarks.length &&
        after?.readings.nonDominantLandmarks.length
      ) {
        const wristExtensionOrFlexion = this.parseWristFlexionOrExtension(
          after.readings.nonDominantLandmarks,
          before.readings.nonDominantLandmarks,
          after.readings.poseLandmarks,
          before.readings.poseLandmarks,
          false
        );

        subject.hand.nonDominant.movement = {
          ...this.parseSubjectHandMovement(
            before.readings.nonDominantLandmarks,
            after.readings.nonDominantLandmarks
          ),
          ...wristExtensionOrFlexion,
          ...frontOrBackMoviment.nonDominant,
        };
      }
    }
  }

  private parseSubjectHandMovement(
    beforeHandLandmarks: Coordinate[],
    afterHandLandmarks: Coordinate[]
  ): Movement {
    const WRIST_ROTATE_UPPER_THRESHOLD = 25;
    const WRIST_ROTATE_THRESHOLD = 20;
    const ZONE_SIZE = 75;
    const movement: Movement = {};

    const angle = this.parseWristRotationAngle(
      afterHandLandmarks,
      beforeHandLandmarks
    );

    if (angle > WRIST_ROTATE_THRESHOLD) {
      const direction = this.parseWristRotationDirection(
        afterHandLandmarks,
        beforeHandLandmarks
      );

      if (angle > WRIST_ROTATE_UPPER_THRESHOLD) {
        movement.wristRotate = true;
      }

      if (direction === "clockwise") {
        movement.wristRotateClockwise = true;
      } else if (direction === "counterclockwise") {
        movement.wristRotateCounterClockwise = true;
      }
    }

    const differenceX = beforeHandLandmarks[0].x - afterHandLandmarks[0].x;
    const differenceY = beforeHandLandmarks[0].y - afterHandLandmarks[0].y;
    const moveX =
      Math.floor(Math.abs(differenceX / ZONE_SIZE)) *
      (differenceX < 0 ? -1 : 1);
    const moveY =
      Math.floor(Math.abs(differenceY / ZONE_SIZE)) *
      (differenceY < 0 ? -1 : 1);

    if (moveX <= -1) {
      movement.x = -1;
    } else if (moveX >= 1) {
      movement.x = 1;
    }

    if (moveY <= -1) {
      movement.y = -1;
    } else if (moveY >= 1) {
      movement.y = 1;
    }

    movement.landmarks = this.parseSubjectHandLandmarksMovements(
      beforeHandLandmarks,
      afterHandLandmarks
    );

    return movement;
  }

  private parseSubjectHandLandmarksMovements(
    beforeHandLandmarks: Coordinate[],
    afterHandLandmarks: Coordinate[]
  ): { [landmark: number]: { x?: 1 | -1; y?: 1 | -1 } } {
    const ZONE_SIZE = 75;
    const movement: { [landmark: number]: { x?: 1 | -1; y?: 1 | -1 } } = {};

    for (let i = 0; i < 21; i++) {
      movement[i] = {};

      const differenceX = beforeHandLandmarks[i].x - afterHandLandmarks[i].x;
      const differenceY = beforeHandLandmarks[i].y - afterHandLandmarks[i].y;

      const moveX =
        Math.floor(Math.abs(differenceX / ZONE_SIZE)) *
        (differenceX < 0 ? -1 : 1);
      const moveY =
        Math.floor(Math.abs(differenceY / ZONE_SIZE)) *
        (differenceY < 0 ? -1 : 1);

      if (moveX <= -1) {
        movement[i].x = -1;
      } else if (moveX >= 1) {
        movement[i].x = 1;
      }

      if (moveY <= -1) {
        movement[i].y = -1;
      } else if (moveY >= 1) {
        movement[i].y = 1;
      }
    }

    return movement;
  }

  private parseWristFlexionOrExtension(
    afterHandLandmarks: Coordinate[],
    beforeHandLandmarks: Coordinate[],
    afterPoseLanmarks: Coordinate[],
    beforePoseLanmarks: Coordinate[],
    isDominant: boolean
  ): { wristFlexion: boolean } | { wristExtension: boolean } | {} {
    const ANGLE_THRESHOLD = 17.5;
    const MOVEMENT_THRESHOLD = 50;

    const mov = isDominant
      ? pointDifference(beforePoseLanmarks[16], afterPoseLanmarks[16])
      : pointDifference(beforePoseLanmarks[15], afterPoseLanmarks[15]);

    const v1 = this.parseSubjectHandPointing(beforeHandLandmarks);
    const v2 = this.parseSubjectHandPointing(afterHandLandmarks);

    const angle = angleBetweenTwoVectors(v1, v2);
    const direction = directionBetweenTwoVectors(v2, v1);

    if (
      angle > ANGLE_THRESHOLD &&
      Math.abs(mov.x) + Math.abs(mov.y) < MOVEMENT_THRESHOLD
    ) {
      if (direction.z < 0) {
        return { wristFlexion: true };
      } else {
        return { wristExtension: true };
      }
    } else {
      return {};
    }
  }

  private parseWristRotationAngle(
    afterHandLandmarks: Coordinate[],
    beforeHandLandmarks: Coordinate[]
  ): number {
    const afterVector = normalizeVector(
      pointDifference(afterHandLandmarks[5], afterHandLandmarks[17])
    );
    const beforeVector = normalizeVector(
      pointDifference(beforeHandLandmarks[5], beforeHandLandmarks[17])
    );
    const angle = angleBetweenTwoVectors(afterVector, beforeVector);
    return angle;
  }

  private parseWristRotationDirection(
    afterHandLandmarks: Coordinate[],
    beforeHandLandmarks: Coordinate[]
  ): "clockwise" | "counterclockwise" | "collinear" {
    const afterVector = normalizeVector(
      pointDifference(afterHandLandmarks[5], afterHandLandmarks[17])
    );
    const beforeVector = normalizeVector(
      pointDifference(beforeHandLandmarks[5], beforeHandLandmarks[17])
    );
    const crossProductValue = crossProduct(afterVector, beforeVector);
    return crossProductValue.z > 0
      ? "clockwise"
      : crossProductValue.z < 0
      ? "counterclockwise"
      : "collinear";
  }

  private parseSubjectHandMovimentFrontOrBack(
    beforePoseLanmarks: Coordinate[],
    afterPoseLanmarks: Coordinate[]
  ): {
    dominant: Pick<MovementAxis, "z">;
    nonDominant: Pick<MovementAxis, "z">;
  } {
    const rightArm = this.parseSubjectHandMovimentFrontOrBackUtil(
      beforePoseLanmarks[POSE_LANDMARKS.RIGHT_SHOULDER],
      beforePoseLanmarks[POSE_LANDMARKS.RIGHT_ELBOW],
      beforePoseLanmarks[POSE_LANDMARKS.RIGHT_WRIST],
      afterPoseLanmarks[POSE_LANDMARKS.RIGHT_SHOULDER],
      afterPoseLanmarks[POSE_LANDMARKS.RIGHT_ELBOW],
      afterPoseLanmarks[POSE_LANDMARKS.RIGHT_WRIST]
    );
    const leftArm = this.parseSubjectHandMovimentFrontOrBackUtil(
      beforePoseLanmarks[POSE_LANDMARKS.LEFT_SHOULDER],
      beforePoseLanmarks[POSE_LANDMARKS.LEFT_ELBOW],
      beforePoseLanmarks[POSE_LANDMARKS.LEFT_WRIST],
      afterPoseLanmarks[POSE_LANDMARKS.LEFT_SHOULDER],
      afterPoseLanmarks[POSE_LANDMARKS.LEFT_ELBOW],
      afterPoseLanmarks[POSE_LANDMARKS.LEFT_WRIST]
    );

    if (this.dominantHand === "RIGHT") {
      return { dominant: rightArm, nonDominant: leftArm };
    } else {
      return { dominant: leftArm, nonDominant: rightArm };
    }
  }

  private parseSubjectHandMovimentFrontOrBackUtil(
    beforeShoulder: Coordinate,
    beforeElbow: Coordinate,
    beforeWrist: Coordinate,
    afterShoulder: Coordinate,
    afterElbow: Coordinate,
    afterWrist: Coordinate
  ): Pick<MovementAxis, "z"> {
    // A challenge to find the right threshold if because the Z value is not very precise for pose landmarks
    const THRESHOLD = 5;

    const beforeV1 = pointDifference(beforeElbow, beforeShoulder);
    const beforeV2 = pointDifference(beforeElbow, beforeWrist);

    const afterV1 = pointDifference(afterElbow, afterShoulder);
    const afterV2 = pointDifference(afterElbow, afterWrist);

    const afterAngle = angleBetweenTwoVectors(afterV1, afterV2);
    const beforeAngle = angleBetweenTwoVectors(beforeV1, beforeV2);

    if (afterAngle - beforeAngle >= THRESHOLD) {
      return { z: 1 };
    } else if (afterAngle - beforeAngle <= -THRESHOLD) {
      return { z: -1 };
    } else {
      return { z: undefined };
    }
  }
}
