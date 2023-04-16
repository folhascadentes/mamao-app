import React, { useRef, useEffect, useState } from "react";
import { Hands } from "@mediapipe/hands";
import { Pose } from "@mediapipe/pose";
import { Camera } from "@mediapipe/camera_utils";
import { signs } from "./signs/signs";
import { Subject } from "./utils/subject";
import { Detector } from "./utils/detector";

function Recording({ setLoading, model, cameraSettings }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const imageBuffer = [];
  const DURATION = 5;
  const FPS = cameraSettings.frameRate;
  const BUFFER_SIZE = DURATION * FPS;

  let poseLandmarks = [];
  let poseWorldLandmarks = [];
  let detector = new Detector(signs?.[0] ?? {}, ctx);

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
    const subject = new Subject(canvasRef, BUFFER_SIZE, model);

    hands.onResults((results) => {
      results.poseLandmarks = poseLandmarks;
      results.poseWorldLandmarks = poseWorldLandmarks;

      renderCameraImage(results);

      const subjectData = subject.parse(results);

      if (detector.run(subjectData, results)) {
        detector = new Detector(signs[0], ctx);
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
}

export default Recording;
