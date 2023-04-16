import React, { useRef, useEffect, useState } from "react";
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
import { getBodyRegionCoordinates, getMiddlePoint } from "./utils/positions";

function getRandomXY(V) {
  const x = Math.random() * (2 * V) - V;
  const y = Math.random() * (2 * V) - V;
  return { x, y };
}

class Detector {
  CIRCLE_RADIUS = 40;

  constructor(sign, ctx) {
    this.sign = JSON.parse(JSON.stringify(sign));
    this.currentSign = sign.sign[0];
    this.ctx = ctx;
    this.state = "configuration"; // "initialPosition" | "moviment" | "finalPosition"
  }

  run(subject, results) {
    if (this.state === "configuration") {
      if (
        subject.hand.dominantHand.configuration ===
          this.currentSign.start.configuration &&
        subject.hand.dominantHand.palm.x === this.currentSign.start.palm
      ) {
        this.state = "initialPosition";
        this.offset = getRandomXY(25);
      }
    } else if (this.state === "initialPosition") {
      this.initialPosition(subject, results);
      this.moviment = JSON.parse(JSON.stringify(this.currentSign.moviment));
    } else if (this.state === "moviment") {
      if (this.moviment === undefined || this.moviment.length == 0) {
        this.state = "finalPosition";
      } else if (this.moviment[0]) {
        const moviment = this.moviment[0];
        const correctMoviment = Object.keys(moviment).every((key) => {
          return subject.hand.dominantHand.moviment[key] === moviment[key];
        });
        if (correctMoviment) {
          this.moviment.shift();
        }
      }
    } else if (this.state === "finalPosition") {
      if (
        subject.hand.dominantHand.configuration ===
          this.currentSign.start.configuration &&
        subject.hand.dominantHand.palm.x === this.currentSign.start.palm
      ) {
        console.log("Uhaa");
        this.state = "configuration";
        return true;
      }
    }
  }

  initialPosition(subject, results) {
    if (subject && results.poseLandmarks.length) {
      const coordinate = getBodyRegionCoordinates(
        this.currentSign.start.region,
        results.poseLandmarks
      );

      const oldCoordinate = this.lastCoordinate ?? coordinate;
      const smoothCoordinate = getMiddlePoint(
        oldCoordinate,
        oldCoordinate,
        oldCoordinate,
        coordinate
      );
      this.lastCoordinate = coordinate;

      this.drawCircle({
        x:
          smoothCoordinate.x +
          this.offset.x +
          Math.floor(subject.body.angle / 10) * 10 * 2.9,
        y: smoothCoordinate.y + this.offset.y,
      });

      if (results.dominantHandLandmarks.length) {
        const middle = getMiddlePoint(...results.dominantHandLandmarks);
        const distance = Math.sqrt(
          Math.pow(middle.x - coordinate.x, 2) +
            Math.pow(middle.y - coordinate.y, 2)
        );

        if (distance < this.CIRCLE_RADIUS * 2) {
          this.state = "moviment";
        }
      }
    }
  }

  drawCircle(landmark, color = "rgb(229, 123, 69, 0.8)") {
    this.ctx.beginPath();
    this.ctx.arc(
      landmark.x,
      landmark.y,
      this.CIRCLE_RADIUS,
      0,
      2 * Math.PI,
      false
    );
    this.ctx.fillStyle = color;
    this.ctx.fill();
  }
}

function Recording({ setLoading, model, cameraSettings }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const imageBuffer = [];
  const skeletonBuffer = [];
  const DURATION = 5;
  const FPS = cameraSettings.frameRate;
  const BUFFER_SIZE = DURATION * FPS;

  let poseLandmarks = [];
  let poseWorldLandmarks = [];
  let detector = new Detector(signs.oi, ctx);

  useEffect(() => {
    setCtx(canvasRef.current.getContext("2d"));

    if (ctx) {
      ctx.willReadFrequently = true;
    }

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
        dominantHandLandmarks,
        nonDominantHandLandmarks,
        dominantHandWorldLandmarks,
        nonDominantHandWorldLandmarks,
      } = parseHandsWorldLandmarks(results);

      results.dominantHandLandmarks = dominantHandLandmarks;
      results.nonDominantHandLandmarks = nonDominantHandLandmarks;
      results.dominantHandWorldLandmarks = dominantHandWorldLandmarks;
      results.nonDominantHandWorldLandmarks = nonDominantHandWorldLandmarks;
      results.poseLandmarks = poseLandmarks;
      results.poseWorldLandmarks = poseWorldLandmarks;

      updateSkeletonBuffer(
        dominantHandLandmarks,
        nonDominantHandLandmarks,
        dominantHandWorldLandmarks,
        nonDominantHandWorldLandmarks
      );

      setSubjectBodyAngle(subject);
      setSubjectHandShape(
        subject,
        dominantHandWorldLandmarks,
        nonDominantHandWorldLandmarks
      );
      setSubjectHandPointing(
        subject,
        dominantHandWorldLandmarks,
        nonDominantHandWorldLandmarks
      );
      setSubjectHandPalm(
        subject,
        dominantHandWorldLandmarks,
        nonDominantHandWorldLandmarks
      );
      setSubjectHandMoviment(subject);

      if (detector.run(subject, results)) {
        detector = new Detector(signs.oi, ctx);
      }
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
              borderRadius: "1.4rem",
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
      before?.dominantHandLandmarks.length &&
      after?.dominantHandLandmarks?.length
    ) {
      subject.hand.dominantHand.moviment = parseSubjectHandMoviment(
        before.dominantHandLandmarks,
        after.dominantHandLandmarks
      );
    }

    if (
      before?.nonDominantHandLandmarks.length &&
      after?.nonDominantHandLandmarks?.length
    ) {
      subject.hand.nonDominantHand.moviment = parseSubjectHandMoviment(
        before.nonDominantHandLandmarks,
        after.nonDominantHandLandmarks
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
    dominantHandLandmarks,
    nonDominantHandLandmarks,
    dominantHandWorldLandmarks,
    nonDominantHandWorldLandmarks
  ) {
    if (poseLandmarks.length && poseWorldLandmarks.length) {
      skeletonBuffer.push({
        poseLandmarks,
        poseWorldLandmarks,
        dominantHandLandmarks,
        nonDominantHandLandmarks,
        dominantHandWorldLandmarks,
        nonDominantHandWorldLandmarks,
      });

      if (skeletonBuffer.length > BUFFER_SIZE) {
        skeletonBuffer.shift();
      }
    }
  }

  function setSubjectHandPalm(
    subject,
    dominantHandWorldLandmarks,
    nonDominantHandWorldLandmarks
  ) {
    if (dominantHandWorldLandmarks.length) {
      subject.hand.dominantHand.palm = parseSubjectHandPalm(
        dominantHandWorldLandmarks
      );
    }

    if (nonDominantHandWorldLandmarks.length) {
      subject.hand.nonDominantHand.palm = parseSubjectHandPalm(
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

  function parseSubjectHandPalm(handWorldLandmarks) {
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

  function setSubjectHandPointing(
    subject,
    dominantHandWorldLandmarks,
    nonDominantHandWorldLandmarks
  ) {
    if (dominantHandWorldLandmarks.length) {
      subject.hand.dominantHand.ponting = parseSubjectHandPointing(
        dominantHandWorldLandmarks
      );
    }

    if (nonDominantHandWorldLandmarks.length) {
      subject.hand.nonDominantHand.ponting = parseSubjectHandPointing(
        nonDominantHandWorldLandmarks
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
    dominantHandWorldLandmarks,
    nonDominantHandWorldLandmarks
  ) {
    if (dominantHandWorldLandmarks.length) {
      const { handShape, probability } = detectHandShape(
        dominantHandWorldLandmarks
      );

      if (probability > 0.5) {
        subject.hand.dominantHand.configuration = handShape;
      }
    }

    if (nonDominantHandWorldLandmarks.length) {
      const { handShape, probability } = detectHandShape(
        nonDominantHandWorldLandmarks
      );

      if (probability > 0.5) {
        subject.hand.nonDominantHand.configuration = handShape;
      }
    }
  }

  function initializeSujectObject() {
    return {
      body: {
        angle: null,
      },
      hand: {
        nonDominantHand: {
          ponting: null,
          palm: null,
          configuration: null,
          moviment: {
            x: null, // [+] direita [-1] esquerda
            y: null, // [+] cima [-1] baixo
            z: null,
          },
        },
        dominantHand: {
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

  function parseHandsWorldLandmarks(results) {
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
            x: landmark.x * canvasRef.current.width,
            y: landmark.y * canvasRef.current.height,
            z: landmark.z * canvasRef.current.width,
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
            x: landmark.x * canvasRef.current.width,
            y: landmark.y * canvasRef.current.height,
            z: landmark.z * canvasRef.current.width,
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
