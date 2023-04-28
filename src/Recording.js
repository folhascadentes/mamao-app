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
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [sign, setSign] = useState(signs?.[0] ?? {});
  const [todoActions, setTodoActions] = useState([]);
  const [doneActions, setDoneActions] = useState([]);
  const imageBuffer = [];
  const DURATION = 5;
  const FPS = cameraSettings.frameRate;
  const BUFFER_SIZE = DURATION * FPS;

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
    const instructor = new Instructor(canvasRef.current.getContext("2d"), sign);

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

    hands.onResults((results) => {
      results.poseLandmarks = poseLandmarks;
      results.poseWorldLandmarks = poseWorldLandmarks;

      const subjectData = subject.parse(results);
      const response = detector.run(subjectData);

      instructor.instruct(subjectData, response);

      if (
        response.state === DetectorStates.FINAL_HAND_CONFIGURATION &&
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
            <h1 className="text-3xl font-bold text-left mb-4">Sinal</h1>
            <div className="text-lg">
              Você vai sinalizar o sinal <b>{sign.token}</b> em{" "}
              <b>{sign.language}</b> (0/20) vezes. Siga as instruções abaixo
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
  return (
    <div className="flex flex-col mx-8 my-4">
      <div>
        1. Com a <b>mão dominante</b> faça um{" "}
        <b>movimento circular em sentido horário</b>
      </div>
      <div>2. Acompanhe o movimento da bola laranja na câmera</div>
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
