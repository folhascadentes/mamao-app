import React, { useRef, useEffect } from "react";
import { Hands } from "@mediapipe/hands";
import { Pose } from "@mediapipe/pose";
import { Camera } from "@mediapipe/camera_utils";
import * as tensorflow from "@tensorflow/tfjs";
import { signs } from "./signs/signs";
import {
  getAngleWithXAxis,
  findPerpendicularVector,
  getPerpendicularVector,
} from "./utils/geometrics";

class Detector {
  sign = null;

  constructor(sign) {
    this.sign = sign;
  }

  run(subject) {}

  instruction() {}
}

function Recording({ setLoading, model, cameraSettings }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const imageBuffer = [];
  const skeletonBuffer = [];
  const DURATION = 5;
  const FPS = cameraSettings.frameRate;
  const BUFFER_SIZE = DURATION * FPS;

  let poseLandmarks = [];
  let poseWorldLandmarks = [];
  let detector = new Detector(signs.oi);

  useEffect(() => {
    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        await hands.send({ image: videoRef.current });
        await pose.send({ image: videoRef.current });
      },
      width: 720,
      height: 720,
    });

    const hands = initalizeHandsDetector();
    const pose = initializePoseDetector();

    hands.onResults((results) => {
      renderCameraImage(results);

      const subject = initializeSujectObject();

      let {
        rightHandLandmarks,
        leftHandLandmarks,
        rightHandWorldLandmarks,
        leftHandWorldLandmarks,
      } = parseLeftRightHandWorldLandmarks(results);

      updateSkeletonBuffer(
        rightHandLandmarks,
        leftHandLandmarks,
        rightHandWorldLandmarks,
        leftHandWorldLandmarks
      );

      setSubjectBodyAngle(subject);
      setSubjectHandShape(
        subject,
        rightHandWorldLandmarks,
        leftHandWorldLandmarks
      );
      setSubjectHandPointing(
        subject,
        rightHandWorldLandmarks,
        leftHandWorldLandmarks
      );
      setSubjectHandPalm(
        subject,
        rightHandWorldLandmarks,
        leftHandWorldLandmarks
      );
      setSubjectHandMoviment(subject);

      detector.run(subject);
    });

    pose.onResults((results) => {
      setLoading(false);

      if (results.poseWorldLandmarks) {
        poseWorldLandmarks = results.poseWorldLandmarks;
      } else {
        poseWorldLandmarks = [];
      }

      if (results.poseLandmarks) {
        poseLandmarks = results.poseLandmarks.map((landmark) => {
          return {
            x: landmark.x * canvasRef.current.width,
            y: landmark.y * canvasRef.current.height,
            z: landmark.z,
          };
        });
      } else {
        poseLandmarks = [];
      }
    });

    camera.start();
  });

  return (
    <div className="recording flex flex-col items-center justify-center mt-10">
      <video
        ref={videoRef}
        className="input_video hidden"
        width="720"
        height="720"
      ></video>
      <div className="flex space-x-16 justify-center">
        <div className="items-center">
          <canvas
            ref={canvasRef}
            className="output_canvas_hands"
            width="720"
            height="720"
            style={{
              transform: "scaleX(-1)",
              borderRadius: "2.4rem",
            }}
          ></canvas>
        </div>
        <div style={{ width: "400px" }}>
          <h1 className="text-3xl font-bold text-left mb-6">Instruções</h1>
        </div>
      </div>
    </div>
  );

  function setSubjectHandMoviment(subject) {
    const [before, _, after] = skeletonBuffer.slice(-3);

    if (
      before?.rightHandLandmarks.length &&
      after?.rightHandLandmarks?.length
    ) {
      subject.hand.right.moviment = parseSubjectHandMoviment(
        before.rightHandLandmarks,
        after.rightHandLandmarks
      );
    }

    if (before?.leftHandLandmarks.length && after?.leftHandLandmarks?.length) {
      subject.hand.left.moviment = parseSubjectHandMoviment(
        before.leftHandLandmarks,
        after.leftHandLandmarks
      );
    }
  }

  function parseSubjectHandMoviment(beforeHandLandmarks, afterHandLandmarks) {
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

  function updateSkeletonBuffer(
    rightHandLandmarks,
    leftHandLandmarks,
    rightHandWorldLandmarks,
    leftHandWorldLandmarks
  ) {
    if (poseLandmarks.length && poseWorldLandmarks.length) {
      skeletonBuffer.push({
        poseLandmarks,
        poseWorldLandmarks,
        rightHandLandmarks,
        leftHandLandmarks,
        rightHandWorldLandmarks,
        leftHandWorldLandmarks,
      });

      if (skeletonBuffer.length > BUFFER_SIZE) {
        skeletonBuffer.shift();
      }
    }
  }

  function setSubjectHandPalm(
    subject,
    rightHandWorldLandmarks,
    leftHandWorldLandmarks
  ) {
    if (rightHandWorldLandmarks.length) {
      subject.hand.right.palm = parseSubjectHandPalm(rightHandWorldLandmarks);
    }

    if (leftHandWorldLandmarks.length) {
      subject.hand.left.palm = parseSubjectHandPalm(leftHandWorldLandmarks);
      subject.hand.left.palm.x = -subject.hand.left.palm.x;
      subject.hand.left.palm.y = -subject.hand.left.palm.y;
      subject.hand.left.palm.z = -subject.hand.left.palm.z;
    }
  }

  function parseSubjectHandPalm(handWorldLandmarks) {
    const vector = findPerpendicularVector(
      handWorldLandmarks[5],
      handWorldLandmarks[17],
      handWorldLandmarks[0]
    );

    return {
      x: vector.x < 0 ? 1 : -1,
      y: vector.y < 0 ? 1 : -1,
      z: vector.z < 0 ? 1 : -1,
    };
  }

  function setSubjectHandPointing(
    subject,
    rightHandWorldLandmarks,
    lefthandWorldLandmarks
  ) {
    if (rightHandWorldLandmarks.length) {
      subject.hand.right.ponting = parseSubjectHandPointing(
        rightHandWorldLandmarks
      );
    }

    if (lefthandWorldLandmarks.length) {
      subject.hand.left.ponting = parseSubjectHandPointing(
        lefthandWorldLandmarks
      );
    }
  }

  function parseSubjectHandPointing(handWorldLandmarks) {
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

  function setSubjectBodyAngle(subject) {
    if (poseWorldLandmarks.length) {
      const vector = getPerpendicularVector(
        poseWorldLandmarks[12],
        poseWorldLandmarks[11]
      );
      const angle = getAngleWithXAxis(vector);

      subject.body.angle = angle - 90;
    }
  }

  function setSubjectHandShape(
    subject,
    rightHandWorldLandmarks,
    leftHandWorldLandmarks
  ) {
    if (rightHandWorldLandmarks.length) {
      const { handShape, probability } = detectHandShape(
        rightHandWorldLandmarks
      );

      if (probability > 0.5) {
        subject.hand.right.configuration = handShape;
      }
    }

    if (leftHandWorldLandmarks.length) {
      const { handShape, probability } = detectHandShape(
        leftHandWorldLandmarks
      );

      if (probability > 0.5) {
        subject.hand.left.configuration = handShape;
      }
    }
  }

  function initializeSujectObject() {
    return {
      body: {
        angle: null,
      },
      hand: {
        left: {
          ponting: null,
          palm: null,
          configuration: null,
          moviment: {
            x: null, // [+] direita [-1] esquerda
            y: null, // [+] cima [-1] baixo
            z: null,
          },
        },
        right: {
          ponting: null,
          palm: null,
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

  function parseLeftRightHandWorldLandmarks(results) {
    let leftHandLandmarks = [];
    let rightHandLandmarks = [];
    let leftHandWorldLandmarks = [];
    let rightHandWorldLandmarks = [];

    results.multiHandedness.forEach((hand) => {
      if (hand.label === "Right") {
        leftHandLandmarks =
          (results.multiHandedness.length === 2
            ? results.multiHandLandmarks[hand.index]
            : results.multiHandLandmarks[0]) ?? [];
        leftHandLandmarks = leftHandLandmarks.map((landmark) => {
          return {
            x: landmark.x * canvasRef.current.width,
            y: landmark.y * canvasRef.current.height,
            z: landmark.z * canvasRef.current.width,
          };
        });
        leftHandWorldLandmarks =
          (results.multiHandedness.length === 2
            ? results.multiHandWorldLandmarks[hand.index]
            : results.multiHandWorldLandmarks[0]) ?? [];
      } else if (hand.label === "Left") {
        rightHandLandmarks = (results.multiHandLandmarks[hand.index] ?? []).map(
          (landmark) => {
            return {
              x: landmark.x * canvasRef.current.width,
              y: landmark.y * canvasRef.current.height,
              z: landmark.z * canvasRef.current.width,
            };
          }
        );
        rightHandWorldLandmarks =
          results.multiHandWorldLandmarks[hand.index] ?? [];
      }
    });
    return {
      rightHandLandmarks,
      leftHandLandmarks,
      rightHandWorldLandmarks,
      leftHandWorldLandmarks,
    };
  }

  function initalizeHandsDetector() {
    const hands = new Hands({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
      },
    });

    hands.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    return hands;
  }

  function initializePoseDetector() {
    const pose = new Pose({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
      },
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: false,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    return pose;
  }

  function renderCameraImage(results) {
    const ctx = canvasRef.current.getContext("2d");

    ctx.save();
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.drawImage(
      results.image,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    ctx.restore();

    // Save image buffer
    const imageData = ctx.getImageData(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    imageBuffer.push(imageData);

    if (imageBuffer.length > BUFFER_SIZE) {
      imageBuffer.shift();
    }
  }

  function detectHandShape(landmarks) {
    const inputData = landmarks
      .map((landmark) => [landmark.x, landmark.y, landmark.z])
      .flat();
    const inputTensor = tensorflow.tensor2d([inputData]);
    const prediction = model.predict(inputTensor);
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
}

export default Recording;
