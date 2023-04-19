import * as tensorflow from "@tensorflow/tfjs";
import {
  angleBetweenTwoVectors,
  findPerpendicularVector,
  getAngleWithXAxis,
  getPerpendicularVector,
  pointDifference,
} from "./geometrics";

export class Subject {
  constructor(canvasRef, bufferSize, model, dominantHand = "RIGHT") {
    this.canvasRef = canvasRef;
    this.bufferSize = bufferSize;
    this.model = model;
    this.buffer = [];
    this.dominantHand = dominantHand;
  }

  parse(results) {
    const subject = this.initializeSujectObject();

    this.setSubjectBodyAngle(subject, results);

    const {
      dominantHandLandmarks,
      nonDominantHandLandmarks,
      dominantHandWorldLandmarks,
      nonDominantHandWorldLandmarks,
    } = this.parseHandsWorldLandmarks(results);

    subject.dominantHandLandmarks = dominantHandLandmarks;
    subject.nonDominantHandLandmarks = nonDominantHandLandmarks;
    subject.dominantHandWorldLandmarks = dominantHandWorldLandmarks;
    subject.nonDominantHandWorldLandmarks = nonDominantHandWorldLandmarks;
    subject.poseLandmarks = results.poseLandmarks;
    subject.poseWorldLandmarks = results.poseWorldLandmarks;

    this.updateSkeletonBuffer(
      dominantHandLandmarks,
      nonDominantHandLandmarks,
      dominantHandWorldLandmarks,
      nonDominantHandWorldLandmarks,
      results.poseLandmarks,
      results.poseWorldLandmarks
    );

    this.setSubjectHandShape(
      subject,
      dominantHandWorldLandmarks,
      nonDominantHandWorldLandmarks
    );

    this.setSubjectHandPointing(
      subject,
      dominantHandWorldLandmarks,
      nonDominantHandWorldLandmarks
    );

    this.setSubjectHandPalm(
      subject,
      dominantHandWorldLandmarks,
      nonDominantHandWorldLandmarks
    );

    this.setSubjectHandMovement(subject, this.buffer);

    return subject;
  }

  initializeSujectObject() {
    return {
      body: {
        angle: null, // [-] esquerda [+] direita
      },
      hand: {
        nonDominantHand: {
          ponting: {
            x: null, // [+] oposto a mão dominante [-1] direção mão dominante
            y: null, // [+] cima [-1] baixo
            z: null, // [+] frente [-1] trás
          },
          palm: {
            x: null, // [+] oposto a mão dominante [-1] direção mão dominante
            y: null, // [+] cima [-1] baixo
            z: null, // [+] frente [-1] trás
          },
          configuration: null,
          movement: {
            x: null, // [+] oposto a mão dominante [-1] direção mão dominante
            y: null, // [+] cima [-1] baixo
            z: null, // [+] frente [-1] trás
          },
        },
        dominantHand: {
          ponting: {
            x: null,
            y: null,
            z: null,
          },
          palm: {
            x: null,
            y: null,
            z: null,
          },
          configuration: null,
          movement: {
            x: null,
            y: null,
            z: null,
          },
        },
      },
    };
  }

  updateSkeletonBuffer(
    dominantHandLandmarks,
    nonDominantHandLandmarks,
    dominantHandWorldLandmarks,
    nonDominantHandWorldLandmarks,
    poseLandmarks,
    poseWorldLandmarks
  ) {
    this.buffer.push({
      poseLandmarks,
      poseWorldLandmarks,
      dominantHandLandmarks,
      nonDominantHandLandmarks,
      dominantHandWorldLandmarks,
      nonDominantHandWorldLandmarks,
    });

    if (this.buffer.length > this.bufferSize) {
      this.buffer.shift();
    }
  }

  setSubjectBodyAngle(subject, results) {
    if (results.poseWorldLandmarks.length) {
      const vector = getPerpendicularVector(
        results.poseWorldLandmarks[12],
        results.poseWorldLandmarks[11]
      );
      const angle = getAngleWithXAxis(vector);

      subject.body.angle = angle - 90;
    }
  }

  parseHandsWorldLandmarks(results) {
    let nonDominantHandLandmarks = [];
    let dominantHandLandmarks = [];
    let nonDominantHandWorldLandmarks = [];
    let dominantHandWorldLandmarks = [];

    results.multiHandedness.forEach((hand) => {
      if (hand.label === "Right") {
        nonDominantHandLandmarks =
          (results.multiHandedness.length === 2
            ? results.multiHandLandmarks[hand.index]
            : results.multiHandLandmarks[0]) ?? [];
        nonDominantHandLandmarks = nonDominantHandLandmarks.map((landmark) => {
          return {
            x: landmark.x * this.canvasRef.current.width,
            y: landmark.y * this.canvasRef.current.height,
            z: landmark.z * this.canvasRef.current.width,
          };
        });
        nonDominantHandWorldLandmarks =
          (results.multiHandedness.length === 2
            ? results.multiHandWorldLandmarks[hand.index]
            : results.multiHandWorldLandmarks[0]) ?? [];
      } else if (hand.label === "Left") {
        dominantHandLandmarks = (
          results.multiHandLandmarks[hand.index] ?? []
        ).map((landmark) => {
          return {
            x: landmark.x * this.canvasRef.current.width,
            y: landmark.y * this.canvasRef.current.height,
            z: landmark.z * this.canvasRef.current.width,
          };
        });
        dominantHandWorldLandmarks =
          results.multiHandWorldLandmarks[hand.index] ?? [];
      }
    });
    return {
      dominantHandLandmarks,
      nonDominantHandLandmarks,
      dominantHandWorldLandmarks,
      nonDominantHandWorldLandmarks,
    };
  }

  setSubjectHandShape(
    subject,
    dominantHandWorldLandmarks,
    nonDominantHandWorldLandmarks
  ) {
    if (dominantHandWorldLandmarks.length) {
      const { handShape, probability } = this.detectHandShape(
        dominantHandWorldLandmarks
      );

      if (probability > 0.5) {
        subject.hand.dominantHand.configuration = handShape;
      }
    }

    if (nonDominantHandWorldLandmarks.length) {
      const { handShape, probability } = this.detectHandShape(
        nonDominantHandWorldLandmarks
      );

      if (probability > 0.5) {
        subject.hand.nonDominantHand.configuration = handShape;
      }
    }
  }

  detectHandShape(landmarks) {
    const inputData = landmarks
      .map((landmark) => [landmark.x, landmark.y, landmark.z])
      .flat();
    const inputTensor = tensorflow.tensor2d([inputData]);
    const prediction = this.model.predict(inputTensor);
    const predictionArray = prediction.arraySync();

    const maxProbability = Math.max(...predictionArray[0]);
    const indexOfMaxProbability = predictionArray[0].indexOf(maxProbability);

    const mapper = [
      "index_finger_cm",
      "middle_index_finger_cm",
      "oi_cm",
      "open_hand_cm",
      "open_hand_fingers_apart_cm",
      "a_cm",
      "l_cm",
      "s_cm",
    ];

    const handShape = mapper[indexOfMaxProbability];
    const probability = maxProbability;

    return { handShape, probability };
  }

  setSubjectHandPointing(
    subject,
    dominantHandWorldLandmarks,
    nonDominantHandWorldLandmarks
  ) {
    if (dominantHandWorldLandmarks.length) {
      subject.hand.dominantHand.ponting = this.parseSubjectHandPointing(
        dominantHandWorldLandmarks
      );
    }

    if (nonDominantHandWorldLandmarks.length) {
      subject.hand.nonDominantHand.ponting = this.parseSubjectHandPointing(
        nonDominantHandWorldLandmarks
      );
    }
  }

  parseSubjectHandPointing(handWorldLandmarks) {
    const xy = Math.floor(
      (-Math.atan2(
        handWorldLandmarks[9].y - handWorldLandmarks[0].y,
        handWorldLandmarks[9].x - handWorldLandmarks[0].x
      ) *
        180) /
        Math.PI
    );
    const xz = Math.floor(
      (-Math.atan2(
        handWorldLandmarks[9].z - handWorldLandmarks[0].z,
        handWorldLandmarks[9].x - handWorldLandmarks[0].x
      ) *
        180) /
        Math.PI
    );

    return {
      x: Math.abs(xy) < 90 ? -1 : 1,
      y: xy > 0 ? 1 : -1,
      z: xz > 0 ? 1 : -1,
    };
  }

  setSubjectHandPalm(
    subject,
    dominantHandWorldLandmarks,
    nonDominantHandWorldLandmarks
  ) {
    if (dominantHandWorldLandmarks.length) {
      subject.hand.dominantHand.palm = this.parseSubjectHandPalm(
        dominantHandWorldLandmarks
      );
    }

    if (nonDominantHandWorldLandmarks.length) {
      subject.hand.nonDominantHand.palm = this.parseSubjectHandPalm(
        nonDominantHandWorldLandmarks
      );
      subject.hand.nonDominantHand.palm.x =
        -subject.hand.nonDominantHand.palm.x;
      subject.hand.nonDominantHand.palm.y =
        -subject.hand.nonDominantHand.palm.y;
      subject.hand.nonDominantHand.palm.z =
        -subject.hand.nonDominantHand.palm.z;
    }
  }

  parseSubjectHandPalm(handWorldLandmarks) {
    const vector = findPerpendicularVector(
      handWorldLandmarks[5],
      handWorldLandmarks[17],
      handWorldLandmarks[0]
    );

    return {
      x: vector.x < 0 ? 1 : -1, // [-] = esquerda, [+] = direita
      y: vector.y < 0 ? 1 : -1, // [-] = baixo, [+] = cima
      z: vector.z < 0 ? 1 : -1, // [-] = usuario, [+] = camera
    };
  }

  setSubjectHandMovement(subject, buffer) {
    const [before, _, after] = buffer.slice(-3);

    if (before?.poseWorldLandmarks.length && after?.poseWorldLandmarks.length) {
      const frontOrBackMoviment = this.parseSubjectHandMovimentFrontOrBack(
        before.poseWorldLandmarks,
        after.poseWorldLandmarks
      );

      if (
        before?.dominantHandLandmarks.length &&
        after?.dominantHandLandmarks.length
      ) {
        subject.hand.dominantHand.movement = {
          ...this.parseSubjectHandMovement(
            before.dominantHandLandmarks,
            after.dominantHandLandmarks
          ),
          ...frontOrBackMoviment.dominantHand,
        };
      }

      if (
        before?.nonDominantHandLandmarks.length &&
        after?.nonDominantHandLandmarks.length
      ) {
        subject.hand.nonDominantHand.movement = {
          ...this.parseSubjectHandMovement(
            before.nonDominantHandLandmarks,
            after.nonDominantHandLandmarks
          ),
          ...frontOrBackMoviment.nonDominantHand,
        };
      }
    }
  }

  parseSubjectHandMovement(beforeHandLandmarks, afterHandLandmarks) {
    const THRESHOLD = 15;
    const movement = {
      x: null,
      y: null,
    };

    if (afterHandLandmarks[0].x - beforeHandLandmarks[0].x > THRESHOLD) {
      movement.x = -1;
    } else if (
      afterHandLandmarks[0].x - beforeHandLandmarks[0].x <
      -THRESHOLD
    ) {
      movement.x = 1;
    }

    if (afterHandLandmarks[0].y - beforeHandLandmarks[0].y > THRESHOLD) {
      movement.y = -1;
    } else if (
      afterHandLandmarks[0].y - beforeHandLandmarks[0].y <
      -THRESHOLD
    ) {
      movement.y = 1;
    }

    return movement;
  }

  parseSubjectHandMovimentFrontOrBack(
    beforePoseWolrdLanmarks,
    afterPoseWolrdLanmarks
  ) {
    const rightArm = this.parseSubjectHandMovimentFrontOrBackUtil(
      beforePoseWolrdLanmarks[12],
      beforePoseWolrdLanmarks[14],
      beforePoseWolrdLanmarks[16],
      afterPoseWolrdLanmarks[12],
      afterPoseWolrdLanmarks[14],
      afterPoseWolrdLanmarks[16]
    );
    const leftArm = this.parseSubjectHandMovimentFrontOrBackUtil(
      beforePoseWolrdLanmarks[11],
      beforePoseWolrdLanmarks[13],
      beforePoseWolrdLanmarks[15],
      afterPoseWolrdLanmarks[11],
      afterPoseWolrdLanmarks[13],
      afterPoseWolrdLanmarks[15]
    );

    if (this.dominantHand === "RIGHT") {
      return { dominantHand: rightArm, nonDominantHand: leftArm };
    } else {
      return { dominantHand: leftArm, nonDominantHand: rightArm };
    }
  }

  parseSubjectHandMovimentFrontOrBackUtil(
    beforeShoulder,
    beforeElbow,
    beforeWrist,
    afterShoulder,
    afterElbow,
    afterWrist
  ) {
    const THRESHOLD = 5;

    const beforeV1 = pointDifference(beforeElbow, beforeShoulder);
    const beforeV2 = pointDifference(beforeElbow, beforeWrist);

    const afterV1 = pointDifference(afterElbow, afterShoulder);
    const afterV2 = pointDifference(afterElbow, afterWrist);

    const afterAngle = angleBetweenTwoVectors(afterV1, afterV2);
    const beforeAngle = angleBetweenTwoVectors(beforeV1, beforeV2);

    if (afterAngle - beforeAngle > THRESHOLD) {
      return { z: 1 };
    } else if (afterAngle - beforeAngle < -THRESHOLD) {
      return { z: -1 };
    } else {
      return { z: null };
    }
  }
}
