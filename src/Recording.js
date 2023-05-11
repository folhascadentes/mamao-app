import React, { useRef, useEffect, useState } from "react";
import { Camera } from "@mediapipe/camera_utils";
import {
  signs,
  HandshapeImages,
  PalmDirectionCategoryDescription,
} from "./signs/signs";
import { Subject } from "./utils/subject";
import { Detector, DetectorStates, DETECTOR_STATES } from "./utils/detector";
import { Instructor } from "./utils/instructor";
import {
  initalizeHandsDetector,
  initializePoseDetector,
} from "./utils/mediapipe";
import { MdOutlinePending, MdDone } from "react-icons/md";

function Recording({ setLoading, model, cameraSettings }) {
  const debuger = !!localStorage.getItem("debug");
  const SIGN_N_TIMES = 5;
  const DURATION = 5;
  const FPS = cameraSettings.frameRate;
  const BUFFER_SIZE = DURATION * FPS;

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const subjectRef = useRef(null);
  const detectorRef = useRef(null);
  const instructorRef = useRef(null);
  const signIndex = useRef(1);

  const [sign, setSign] = useState(signs[0]);
  const [signCounter, setSignCounter] = useState(0);
  const [todoActions, setTodoActions] = useState([]);
  const [doneActions, setDoneActions] = useState([]);

  const imageBuffer = [];
  let poseLandmarks = [];
  let poseWorldLandmarks = [];

  let buffer = [];

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

  const onResultsHandsCallback = (results) => {
    const subject = subjectRef.current;
    const detector = detectorRef.current;
    const instructor = instructorRef.current;

    // merge pose and hands results
    results.poseLandmarks = poseLandmarks;
    results.poseWorldLandmarks = poseWorldLandmarks;

    const subjectData = subject.parse(results);
    const response = detector.run(subjectData);

    if (debuger) {
      const ctx = canvasRef.current.getContext("2d");

      drawPointsDebug(buffer);

      if (subjectData.dominantHandLandmarks.length) {
        const landmarks = subjectData.dominantHandLandmarks;
        drawHand(
          ctx,
          landmarks,
          true,
          subjectData.hand.dominantHand.palm.z > 0
        );
      }

      if (subjectData.nonDominantHandLandmarks.length) {
        const landmarks = subjectData.nonDominantHandLandmarks;
        drawHand(
          ctx,
          landmarks,
          false,
          subjectData.hand.nonDominantHand.palm.z > 0
        );
      }
    }

    instructor.instruct(subjectData, response);

    if (
      response.state === DetectorStates.FINAL_HAND_CONFIGURATION &&
      response.valid
    ) {
      if (detector.memory.endSignFrame - detector.memory.endMovementFrame < 7) {
        success();
        setSignCounter((prevCounter) => prevCounter + 1);
        const startIndex = subject.buffer.findIndex(
          (value) => value.frame === detector.memory.startFrame
        );
        const endIndex = subject.buffer.findIndex(
          (value) => value.frame === detector.memory.endSignFrame
        );

        buffer = subject.buffer.slice(startIndex, endIndex + 1);
      } else {
        failure();
      }
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
  };

  useEffect(() => {
    const subject = new Subject(canvasRef, BUFFER_SIZE, model);
    const detector = new Detector(sign);
    const instructor = new Instructor(canvasRef.current.getContext("2d"), sign);
    let loaded = false;

    subjectRef.current = subject;
    detectorRef.current = detector;
    instructorRef.current = instructor;

    const hands = initalizeHandsDetector();
    const pose = initializePoseDetector();

    pose.onResults(onResultPoseCallback);
    hands.onResults(onResultsHandsCallback);

    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        renderCameraImage(videoRef.current);
        await hands.send({ image: videoRef.current });
        await pose.send({ image: videoRef.current });
        if (!loaded) {
          setLoading(false);
          changeSign();
          loaded = true;
        }
      },
      width: 720,
      height: 720,
    });

    camera.start();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const detector = detectorRef.current;
    const instructor = instructorRef.current;

    if (signCounter === SIGN_N_TIMES) {
      changeSign();
      setSignCounter(0);
      setSign(signs[signIndex.current % signs.length]);
      detector.setSign(signs[signIndex.current % signs.length]);
      instructor.setSign(signs[signIndex.current % signs.length]);
      signIndex.current += 1;
    }
    // eslint-disable-next-line
  }, [signCounter]);

  return (
    <div className="recording flex flex-col justify-center">
      <video
        ref={videoRef}
        className="input_video hidden"
        width="720"
        height="720"
      ></video>
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-16 justify-center">
        <div className="flex flex-col space-y-4" style={{ width: "600px" }}>
          <div>
            <h1 className="text-3xl font-bold text-left mb-4">
              Sinal ({signCounter} de {SIGN_N_TIMES})
            </h1>
            <div className="text-lg">
              Você vai sinalizar o sinal <b>{sign.token}</b> em{" "}
              <b>{sign.language}</b> {SIGN_N_TIMES} vezes. Siga as instruções
              abaixo
            </div>
          </div>
          <div>
            <h1 className="text-xl md:text-3xl font-bold text-left mb-4 md:mb-6">
              Instruções
            </h1>
            <div className="flex flex-col space-y-2">
              {todoActions.map((step, index) => (
                <div key={step.state} className="flex flex-col">
                  <div className="flex space-x-3 items-center text-lg">
                    <MdOutlinePending
                      className="text-yellow-500 font-bold"
                      size={24}
                    />
                    <span>{step.description}</span>
                  </div>
                  {index === 0 &&
                    (step.state === DetectorStates.HAND_CONFIGURATION ? (
                      <HandConfigurationInstructions sign={sign} />
                    ) : step.state === DetectorStates.PALM_DIRECTION ? (
                      <PalmDirectionInstructions sign={sign} />
                    ) : step.state === DetectorStates.INITIAL_POSITION ? (
                      <InitialPositionInstructions sign={sign} />
                    ) : step.state === DetectorStates.MOVEMENT ? (
                      <MovementInstructions sign={sign} />
                    ) : step.state === DetectorStates.FINAL_POSITION ? (
                      <FinalPositionInstructions sign={sign} />
                    ) : step.state === DetectorStates.FINAL_PALM_DIRECTION ? (
                      <FinalPalmDirectionInstructions sign={sign} />
                    ) : step.state ===
                      DetectorStates.FINAL_HAND_CONFIGURATION ? (
                      <FinalHandConfigurationInstructions sign={sign} />
                    ) : (
                      ""
                    ))}
                </div>
              ))}
            </div>
            <div className="flex flex-col space-y-2 mt-10">
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
        <div className="flex justify-center relative">
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
          <div
            id="canvas-overlay"
            className="flex items-center justify-center text-6xl font-bold uppercase absolute opacity-0"
            style={{
              color: "rgba(253, 179, 94)",
              height: "720px",
              width: "720px",
            }}
          >
            SINAL {sign.token}
          </div>
        </div>
      </div>
    </div>
  );

  function drawPointsDebug(buffer) {
    if (buffer.length) {
      const ctx = canvasRef.current.getContext("2d");

      const value = buffer.shift();

      drawHand(ctx, value.dominantHandLandmarks, true);
    }
  }

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

  function success() {
    canvasRef.current.classList.remove("canvas-success");
    setTimeout(() => {
      canvasRef.current.classList.add("canvas-success");
    }, 0);
  }

  function failure() {
    canvasRef.current.classList.remove("canvas-failure");
    setTimeout(() => {
      canvasRef.current.classList.add("canvas-failure");
    }, 0);
  }

  function changeSign() {
    document.querySelector("#canvas-overlay").classList.remove("overlay");
    setTimeout(() => {
      document.querySelector("#canvas-overlay").classList.add("overlay");
    }, 0);
  }
}

export default Recording;

function HandConfigurationInstructions({ sign }) {
  const dominantHandConfiguration =
    sign.signSteps.startPosition.dominantHand.handConfiguration;
  const nonDominantHandConfiguration =
    sign.signSteps.startPosition.nonDominantHand.handConfiguration;

  return (
    <div className="flex flex-col space-y-4 mx-8 my-4">
      {dominantHandConfiguration && (
        <div>
          <div>
            1. Configure e mantenha a <b>mão direita</b> conforme as imagens
            abaixo
          </div>
          <div className="flex space-x-8 mt-4">
            {HandshapeImages[dominantHandConfiguration].map((image, index) => {
              return (
                <div
                  key={`handshape_do_${index}`}
                  className="flex flex-col text-center space-y-4"
                >
                  <img alt={image.alt} className="h-60" src={image.path} />
                  <span className="text-sm font-bold">{image.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {nonDominantHandConfiguration && (
        <div>
          <div>
            2. Configure e mantenha a <b>mão esquerda</b> conforme as imagens
            abaixo
          </div>
          <div className="flex space-x-8 mt-4">
            {HandshapeImages[nonDominantHandConfiguration].map(
              (image, index) => {
                return (
                  <div
                    key={`handshape_ndo_${index}`}
                    className="flex flex-col text-center space-y-4"
                  >
                    <img alt={image.alt} className="h-60" src={image.path} />
                    <span className="text-sm font-bold">{image.label}</span>
                  </div>
                );
              }
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function PalmDirectionInstructions({ sign }) {
  const dominantHandCategory =
    sign.signSteps.startPosition.dominantHand.palmDirectionCategory;
  const nonDominantHandCategory =
    sign.signSteps.startPosition.nonDominantHand.palmDirectionCategory;

  return (
    <div className="flex flex-col mx-8 my-4">
      <div>
        1. Direcione e mantenha palma da mão <b>direita</b> apontado para{" "}
        <b>{PalmDirectionCategoryDescription[dominantHandCategory]}</b>
      </div>
      {nonDominantHandCategory && (
        <div>
          2. Direcione e mantenha da mão <b>esquerda</b> apontado para{" "}
          <b>{PalmDirectionCategoryDescription[nonDominantHandCategory]}</b>
        </div>
      )}
    </div>
  );
}

function InitialPositionInstructions({ sign }) {
  const hasNonDominantHand =
    sign.signSteps.startPosition.nonDominantHand.bodyRegion;
  return (
    <div className="flex flex-col mx-8 my-4">
      <div>
        1. Posicione a <b>mão dominante</b> no <b>círculo laranja</b> na câmera
      </div>
      {hasNonDominantHand && (
        <div>
          1. Posicione a <b>mão dominante</b> no <b>círculo azul</b> na câmera
        </div>
      )}
    </div>
  );
}

function MovementInstructions({ sign }) {
  const dominanHandDescription =
    sign.signSteps.movements.dominanHandDescription;
  const dominantHandCategory = sign.signSteps.movements.dominantHandCategory;

  return (
    <div className="flex flex-col mx-8 my-4">
      <div>
        1. Com a <b>mão dominante</b> {dominanHandDescription}
      </div>
      {dominantHandCategory === "CIRCULAR_MOTION" && (
        <div>2. Acompanhe o movimento da bola laranja na câmera</div>
      )}
    </div>
  );
}

function FinalPositionInstructions({ sign }) {
  const hasNonDominantHand =
    sign.signSteps.startPosition.nonDominantHand.bodyRegion;
  return (
    <div className="flex flex-col mx-8 my-4">
      <div>
        1. Posicione a <b>mão dominante</b> no <b>círculo laranja</b> na câmera
      </div>
      {hasNonDominantHand && (
        <div>
          1. Posicione a <b>mão dominante</b> no <b>círculo azul</b> na câmera
        </div>
      )}
    </div>
  );
}

function FinalPalmDirectionInstructions({ sign }) {
  const dominantHandCategory =
    sign.signSteps.endPosition.dominantHand.palmDirectionCategory;
  const nonDominantHandCategory =
    sign.signSteps.endPosition.nonDominantHand.palmDirectionCategory;

  return (
    <div className="flex flex-col mx-8 my-4">
      <div>
        1. Direcione e mantenha palma da mão <b>direita</b> apontando para{" "}
        <b>{PalmDirectionCategoryDescription[dominantHandCategory]}</b>
      </div>
      {nonDominantHandCategory && (
        <div>
          2. Direcione e mantenha da mão <b>esquerda</b> apontando para{" "}
          <b>{PalmDirectionCategoryDescription[nonDominantHandCategory]}</b>
        </div>
      )}
    </div>
  );
}

function FinalHandConfigurationInstructions({ sign }) {
  const dominantHandConfiguration =
    sign.signSteps.endPosition.dominantHand.handConfiguration;
  const nonDominantHandConfiguration =
    sign.signSteps.endPosition.nonDominantHand.handConfiguration;

  return (
    <div className="flex flex-col space-y-4 mx-8 my-4">
      {dominantHandConfiguration && (
        <div>
          <div>
            1. Configure e mantenha a <b>mão direita</b> conforme as imagens
            abaixo
          </div>
          <div className="flex space-x-8 mt-4">
            {HandshapeImages[dominantHandConfiguration].map((image, index) => {
              return (
                <div
                  key={`handshape_do_${index}`}
                  className="flex flex-col text-center space-y-4"
                >
                  <img alt={image.alt} className="h-60" src={image.path} />
                  <span className="text-sm font-bold">{image.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {nonDominantHandConfiguration && (
        <div>
          <div>
            2. Configure e mantenha a <b>mão esquerda</b> conforme as imagens
            abaixo
          </div>
          <div className="flex space-x-8 mt-4">
            {HandshapeImages[nonDominantHandConfiguration].map(
              (image, index) => {
                return (
                  <div
                    key={`handshape_ndo_${index}`}
                    className="flex flex-col text-center space-y-4"
                  >
                    <img alt={image.alt} className="h-60" src={image.path} />
                    <span className="text-sm font-bold">{image.label}</span>
                  </div>
                );
              }
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function drawHand(ctx, landmarks, isDominant, palmDirection) {
  drawHandConnectors(ctx, landmarks, isDominant, palmDirection);
}

function drawHandConnectors(ctx, landmarks, isDominant, palmDirection) {
  const palm = [
    landmarks[0],
    landmarks[1],
    landmarks[5],
    landmarks[9],
    landmarks[13],
    landmarks[17],
    landmarks[0],
  ];

  if (palmDirection) {
    drawPolygon(ctx, palm, isDominant);
  }

  const strokes = [
    [landmarks[1], landmarks[2]],
    [landmarks[2], landmarks[3]],
    [landmarks[3], landmarks[4]],
    [landmarks[5], landmarks[6]],
    [landmarks[6], landmarks[7]],
    [landmarks[7], landmarks[8]],
    [landmarks[9], landmarks[10]],
    [landmarks[10], landmarks[11]],
    [landmarks[11], landmarks[12]],
    [landmarks[13], landmarks[14]],
    [landmarks[14], landmarks[15]],
    [landmarks[15], landmarks[16]],
    [landmarks[17], landmarks[18]],
    [landmarks[18], landmarks[19]],
    [landmarks[19], landmarks[20]],
  ];

  strokes.sort((a, b) => {
    if (a[1].z < b[1].z) {
      return 1;
    }
    if (a[1].z > b[1].z) {
      return -1;
    }
    return 0;
  });

  strokes.forEach((stroke) => {
    drawStroke(ctx, stroke[0], stroke[1], isDominant);
  });

  if (!palmDirection) {
    drawPolygon(ctx, palm, isDominant);
  }
}

function drawStroke(ctx, p1, p2, isDominant) {
  const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
  gradient.addColorStop(0, isDominant ? "#ffc685" : "#8985ff");
  gradient.addColorStop(1, isDominant ? "#ff8c08" : "#4d47ff");
  ctx.strokeStyle = gradient;
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.stroke();
}

function drawPolygon(ctx, pts, isDominant) {
  const gradient = ctx.createLinearGradient(0, 0, 720, 720);
  gradient.addColorStop(0, isDominant ? "#ffdeb8" : "#bab8ff");
  gradient.addColorStop(1, isDominant ? "#ff8c08" : "#4d47ff");

  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length; i++) {
    ctx.lineTo(pts[i].x, pts[i].y);
  }
  ctx.closePath();

  ctx.fillStyle = gradient;
  ctx.strokeStyle = gradient;

  ctx.fill();
  ctx.stroke();
}
