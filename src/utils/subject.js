import * as tensorflow from "@tensorflow/tfjs";
import {
  getAngleWithXAxis,
  findPerpendicularVector,
  getPerpendicularVector,
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

    this.setSubjectHandMoviment(subject, this.buffer);

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
          moviment: {
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
          moviment: {
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

  setSubjectHandMoviment(subject, buffer) {
    const [before, _, after] = buffer.slice(-3);

    if (
      before?.dominantHandLandmarks.length &&
      after?.dominantHandLandmarks?.length
    ) {
      subject.hand.dominantHand.moviment = this.parseSubjectHandMoviment(
        before.dominantHandLandmarks,
        after.dominantHandLandmarks
      );
    }

    if (
      before?.nonDominantHandLandmarks.length &&
      after?.nonDominantHandLandmarks?.length
    ) {
      subject.hand.nonDominantHand.moviment = this.parseSubjectHandMoviment(
        before.nonDominantHandLandmarks,
        after.nonDominantHandLandmarks
      );
    }
  }

  parseSubjectHandMoviment(beforeHandLandmarks, afterHandLandmarks) {
    const THRESHOLD = 15;
    const moviment = {
      x: null,
      y: null,
      z: null,
    };

    if (afterHandLandmarks[0].x - beforeHandLandmarks[0].x > THRESHOLD) {
      moviment.x = -1;
    } else if (
      afterHandLandmarks[0].x - beforeHandLandmarks[0].x <
      -THRESHOLD
    ) {
      moviment.x = 1;
    }

    if (afterHandLandmarks[0].y - beforeHandLandmarks[0].y > THRESHOLD) {
      moviment.y = -1;
    } else if (
      afterHandLandmarks[0].y - beforeHandLandmarks[0].y <
      -THRESHOLD
    ) {
      moviment.y = 1;
    }

    return moviment;
  }
}
