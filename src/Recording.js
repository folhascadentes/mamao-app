import React, { useRef, useEffect, useState } from "react";
import { Camera } from "@mediapipe/camera_utils";
import { signs } from "./signs/signs";
import { Subject } from "./utils/subject";
import { Detector, DetectorStates, DETECTOR_STATES } from "./utils/detector";
import {
  initalizeHandsDetector,
  initializePoseDetector,
} from "./utils/mediapipe";
import { MdOutlinePending, MdDone } from "react-icons/md";
import { getMiddlePoint } from "./utils/positions";

function Recording({ setLoading, model, cameraSettings }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [todoActions, setTodoActions] = useState([]);
  const [doneActions, setDoneActions] = useState([]);
  const imageBuffer = [];
  const DURATION = 5;
  const FPS = cameraSettings.frameRate;
  const BUFFER_SIZE = DURATION * FPS;

  let sign = signs?.[0] ?? {};
  let poseLandmarks = [];
  let poseWorldLandmarks = [];

  const onResultPoseCallback = (results) => {
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
  };

  useEffect(() => {
    const detector = new Detector(sign);

    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        renderCameraImage(videoRef.current);
        await hands.send({ image: videoRef.current });
        await pose.send({ image: videoRef.current });
        setLoading(false);
      },
      width: 720,
      height: 720,
    });

    const hands = initalizeHandsDetector();
    const pose = initializePoseDetector();
    const subject = new Subject(canvasRef, BUFFER_SIZE, model);

    function rotateVectorZ(vector, degrees) {
      // Convert degrees to radians
      const radians = (degrees * Math.PI) / 180;

      // Apply rotation matrix for rotation around z-axis
      const x = vector.x * Math.cos(radians) - vector.y * Math.sin(radians);
      const y = vector.x * Math.sin(radians) + vector.y * Math.cos(radians);
      const z = vector.z;

      return { x, y, z };
    }

    hands.onResults((results) => {
      results.poseLandmarks = poseLandmarks;
      results.poseWorldLandmarks = poseWorldLandmarks;

      const subjectData = subject.parse(results);
      const response = detector.run(subjectData);

      if (
        subjectData.dominantHandLandmarks.length &&
        response.state === DetectorStates.PALM_DIRECTION
      ) {
        const vector = subjectData.hand.dominantHand.palm;
        const angleXY = (Math.atan2(vector.y, vector.x) * 180) / Math.PI;
        const angleXZ = (Math.atan2(vector.z, vector.x) * 180) / Math.PI;

        const ctx = canvasRef.current.getContext("2d");
        const coordinate = getMiddlePoint(
          subjectData.dominantHandLandmarks[0],
          subjectData.dominantHandLandmarks[5],
          subjectData.dominantHandLandmarks[17]
        );
        const offsetX = rotateVectorZ(
          { x: 100, y: 0, z: 0 },
          subjectData.body.angle
        ).x;
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#ed5b51";
        ctx.beginPath();
        ctx.moveTo(coordinate.x, coordinate.y);
        ctx.lineTo(coordinate.x + offsetX, coordinate.y);
        ctx.stroke();
        ctx.moveTo(coordinate.x, coordinate.y);
        ctx.lineTo(coordinate.x, coordinate.y - 100);
        ctx.stroke();
        ctx.strokeStyle = "#51ed7d";
        ctx.beginPath();
        ctx.moveTo(coordinate.x, coordinate.y);
        ctx.lineTo(
          coordinate.x -
            rotateVectorZ(
              { x: 100, y: 0, z: 0 },
              angleXZ - subjectData.body.angle
            ).x,
          coordinate.y
        );
        ctx.stroke();
        ctx.moveTo(coordinate.x, coordinate.y);
        ctx.lineTo(
          coordinate.x,
          coordinate.y + rotateVectorX({ x: 0, y: 100, z: 0 }, angleXY).y
        );
        ctx.stroke();
      }

      if (
        response.state === DetectorStates.HAND_CONFIGURATION &&
        response.valid
      ) {
        success();
      } else {
        const todo = [];
        const done = [];
        let isCheckingTodoActions = false;
        DETECTOR_STATES.forEach((step) => {
          if (response.state === step.state) {
            isCheckingTodoActions = true;
          }
          if (isCheckingTodoActions) {
            todo.push(step);
          } else {
            done.push(step);
          }
        });
        setDoneActions(done);
        setTodoActions(todo);
      }
    });

    pose.onResults(onResultPoseCallback);

    camera.start();
  }, []);

  function success() {
    canvasRef.current.classList.remove("canvas-shadow");
    setTimeout(() => {
      canvasRef.current.classList.add("canvas-shadow");
    }, 0);
  }

  return (
    <div className="recording flex flex-col justify-center mt-6">
      <video
        ref={videoRef}
        className="input_video hidden"
        width="720"
        height="720"
      ></video>
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-16 justify-center">
        <div className="flex justify-center">
          <canvas
            ref={canvasRef}
            className="output_canvas_hands"
            width="720"
            height="720"
            style={{
              maxHeight: "720px",
              transform: "scaleX(-1)",
              zoom:
                window.innerWidth <= 500
                  ? "0.50"
                  : window.innerHeight <= 800
                  ? "0.7"
                  : "",
              borderRadius: "1.4rem",
            }}
          ></canvas>
        </div>
        <div className="flex flex-col space-y-4" style={{ width: "600px" }}>
          <div>
            <h1 className="text-3xl font-bold text-left mb-4">Sinal</h1>
            <span className="text-lg">
              {sign.token} - {sign.language}
            </span>
          </div>
          <div>
            <h1 className="text-xl md:text-3xl font-bold text-left mb-4 md:mb-6">
              Instruções
            </h1>
            <div className="flex flex-col space-y-2">
              {todoActions.map((step, index) => (
                <div className="flex flex-col">
                  <div
                    key={step.state}
                    className="flex space-x-3 items-center text-lg"
                  >
                    <MdOutlinePending
                      className="text-yellow-500 font-bold"
                      size={24}
                    />
                    <span>{step.description}</span>
                  </div>
                  {index === 0 &&
                    (step.state === DetectorStates.HAND_CONFIGURATION ? (
                      <HandConfigurationInstructions />
                    ) : step.state === DetectorStates.PALM_DIRECTION ? (
                      <PalmDirectionInstructions />
                    ) : (
                      ""
                    ))}
                </div>
              ))}
            </div>
            <div className="flex flex-col space-y-2 mt-6">
              {doneActions.map((step) => (
                <div
                  key={step.state}
                  className="flex space-x-3 items-center text-lg"
                >
                  <MdDone className="text-green-500 font-bold" size={24} />
                  <span>{step.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  function renderCameraImage(image) {
    const ctx = canvasRef.current.getContext("2d", {
      willReadFrequently: true,
    });
    ctx.save();
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.drawImage(
      image,
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

function HandConfigurationInstructions() {
  return (
    <div className="flex flex-col mx-8 my-4">
      <div>
        1. Configure a <b>mão dominante</b> conforme as imagens abaixo
      </div>
      <div className="flex space-x-6 mt-4">
        <div className="flex flex-col text-center space-y-4">
          <img className="h-60" src="/handshapes/oi_front.png" />
          <span className="text-sm font-bold">Visão frontal</span>
        </div>
        <div className="flex flex-col text-center space-y-4">
          <img className="h-60" src="/handshapes/oi_side.png" />
          <span className="text-sm font-bold">Visão lateral</span>
        </div>
      </div>
    </div>
  );
}

function PalmDirectionInstructions() {
  return (
    <div className="flex flex-col mx-8 my-4">
      <div>
        1. A palma da <b>mão dominante</b> deve estar apontada para o lado{" "}
        <b>esquerdo</b>
      </div>
    </div>
  );
}

function rotateVectorX(vector, degrees) {
  // Convert degrees to radians
  const radians = (degrees * Math.PI) / 180;

  // Apply rotation matrix for rotation around x-axis
  const x = vector.x;
  const y = vector.y * Math.cos(radians) - vector.z * Math.sin(radians);
  const z = vector.y * Math.sin(radians) + vector.z * Math.cos(radians);

  return { x, y, z };
}
