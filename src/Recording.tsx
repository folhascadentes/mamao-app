import React, { useRef, useEffect, useState, useContext } from "react";
import * as tensorflow from "@tensorflow/tfjs";
import { useNavigate } from "react-router-dom";
import { Camera } from "@mediapipe/camera_utils";
import {
  HandshapeImages,
  MovementType,
  PalmOrientationDescription,
  Sign,
  signs,
} from "./signs";
import { Subject, SubjectData } from "./core/subject";
import {
  Detector,
  DetectorStates,
  DetectorState,
  DETECTOR_STATES,
  DetectorData,
} from "./core/detector";
import { Instructor, drawHand } from "./core/instructor";
import {
  HandResults,
  initalizeHandsDetector,
  initializePoseDetector,
  PoseResults,
  Results,
} from "./core/mediapipe";
import { MdOutlinePending, MdDone } from "react-icons/md";
import { StyleContext } from "./reducers/style.reducer";

function Recording({
  setLoading,
  handShapeModel,
  cameraSettings,
}: {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  handShapeModel: tensorflow.LayersModel;
  cameraSettings: MediaTrackSettings;
}) {
  const navigate = useNavigate();
  const { state } = useContext(StyleContext);
  const debuger: boolean = !!localStorage.getItem("debug");
  const SIGN_N_TIMES: number = 10;
  const DURATION: number = 5; // in seconds
  const FPS: number = cameraSettings?.frameRate ?? 24;
  const BUFFER_SIZE: number = DURATION * FPS;

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const subjectRef = useRef<Subject>();
  const detectorRef = useRef<Detector>();
  const instructorRef = useRef<Instructor>();
  const signIndex = useRef<number>(1);

  const [subjectFraming, setSubjectFraming] = useState<boolean>(false);
  const [sign, setSign] = useState<Sign>(signs[0]);
  const [signCounter, setSignCounter] = useState<number>(0);
  const [todoActions, setTodoActions] = useState<DetectorState[]>([]);
  const [doneActions, setDoneActions] = useState<DetectorState[]>([]);

  const imageBuffer: ImageData[] = [];
  let movementBuffer: SubjectData[] = [];
  let poseLandmarks: Coordinate[] = [];
  let poseWorldLandmarks: Coordinate[] = [];

  const onResultPoseCallback = (results: PoseResults) => {
    if (results.poseWorldLandmarks) {
      poseWorldLandmarks = results.poseWorldLandmarks;
    } else {
      poseWorldLandmarks = [];
    }

    if (results.poseLandmarks) {
      const canvas = canvasRef.current as HTMLCanvasElement;

      poseLandmarks = results.poseLandmarks.map((landmark: Coordinate) => {
        return {
          x: landmark.x * canvas.width,
          y: landmark.y * canvas.height,
          z: landmark.z,
        };
      });

      if (checkSubjectFramming(poseLandmarks)) {
        setSubjectFraming(() => true);
      }
    } else {
      poseLandmarks = [];
    }
  };

  const onResultsHandsCallback = (handResults: HandResults) => {
    const subject = subjectRef.current as Subject;
    const detector = detectorRef.current as Detector;
    const instructor = instructorRef.current;

    const results: Results = {
      ...handResults,
      poseLandmarks,
      poseWorldLandmarks,
    };

    const subjectData = subject.parse(results);
    const response = detector.run(subjectData);
    instructor?.instruct(subjectData, response);

    if (debuger) {
      drawHandDebugMode(movementBuffer, subjectData);
    }

    if (response.invalid === true) {
      detector.setState(DetectorStates.HAND_SHAPE);
      failure();
    } else if (
      response.state === DetectorStates.FINAL_HAND_SHAPE &&
      response.valid
    ) {
      if (detector.isValid()) {
        success();
        setSignCounter((prevCounter) => prevCounter + 1);
        const { start, end } = detector.getMovementIndex();

        movementBuffer = subject?.getBuffer(start, end) as SubjectData[];

        if (navigator.serviceWorker.controller) {
          const { startIndex, endIndex } = subject?.getBufferIndexes(
            start,
            end
          );
          const frames = imageBuffer.slice(startIndex, endIndex + 10);
          const message = {
            frames,
            landmarks: movementBuffer.map((buffer) => buffer.readings),
            language: sign.language,
            token: sign.token,
            url: process.env.REACT_APP_BACK_END_API,
            accessToken: localStorage.getItem("token"),
          };
          navigator.serviceWorker.controller.postMessage(message);
        }
      } else {
        failure();
      }
    } else {
      setActionsInstructionsState(response);
    }
  };

  useEffect(() => {
    if (!handShapeModel) {
      navigate("/instructions");
    }

    const subject = new Subject(
      canvasRef.current as HTMLCanvasElement,
      BUFFER_SIZE,
      handShapeModel
    );
    const detector = new Detector(sign);
    const instructor = new Instructor(
      (canvasRef.current as HTMLCanvasElement).getContext(
        "2d"
      ) as CanvasRenderingContext2D,
      sign
    );
    let loaded = false;

    subjectRef.current = subject;
    detectorRef.current = detector;
    instructorRef.current = instructor;

    const hands = initalizeHandsDetector();
    const pose = initializePoseDetector();

    pose.onResults(onResultPoseCallback);
    hands.onResults(onResultsHandsCallback);

    const camera = new Camera(videoRef.current as HTMLVideoElement, {
      onFrame: async () => {
        const video = videoRef.current as HTMLVideoElement;
        renderCameraImage(video as HTMLVideoElement);
        await hands.send({ image: video });
        await pose.send({ image: video });
        if (!loaded) {
          setLoading(false);
          showSign();
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
      showSign();
      setSignCounter(0);
      setSign(signs[signIndex.current % signs.length]);
      detector?.setSign(signs[signIndex.current % signs.length]);
      instructor?.setSign(signs[signIndex.current % signs.length]);
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
      <div className="flex flex-col md:flex-row md:space-x-8 justify-center font-sm">
        <div className="flex flex-col space-y-4" style={{ width: "650px" }}>
          <div>
            <h1 className="text-3xl text-left mb-4">
              Sinal ({signCounter} de {SIGN_N_TIMES})
            </h1>
            <div>
              Você vai sinalizar o sinal <b>{sign.token}</b> em{" "}
              <b>{sign.language}</b> {SIGN_N_TIMES} vezes. Siga as instruções
              abaixo
            </div>
          </div>
          <div>
            <h1 className="text-3xl text-left mb-4">
              Instruções
            </h1>
            <div className="flex flex-col space-y-1">
              <div className="flex flex-col mb-2">
                <div className="flex space-x-3 items-center">
                  {subjectFraming ? (
                    <MdDone className="text-green-500 font-bold " size={24} />
                  ) : (
                    <MdOutlinePending
                      className="text-yellow-500 font-bold"
                      size={24}
                    />
                  )}
                  <div>Enquadre o seu corpo corretamente</div>
                </div>
                {!subjectFraming && (
                  <div className="ml-8 mt-3">
                    1. Afaste seu corpo da câmera e deixe visível desde a cabeça
                    até o início do quadril
                  </div>
                )}
              </div>
              {todoActions.map((step, index) => (
                <div key={step.state} className="flex flex-col">
                  <div className="flex space-x-3 items-center">
                    <MdOutlinePending
                      className="text-yellow-500 font-bold"
                      size={24}
                    />
                    <span>{step.description}</span>
                  </div>
                  {index === 0 &&
                    (step.state === DetectorStates.HAND_SHAPE ? (
                      <HandShapeInstructions
                        sign={sign}
                        backgroundColor={state.backgroundColor}
                      />
                    ) : step.state === DetectorStates.PALM_ORIENTATION ? (
                      <PalmOrientationInstructions sign={sign} />
                    ) : step.state === DetectorStates.INITIAL_LOCATION ? (
                      <InitialLocationInstructions sign={sign} />
                    ) : step.state === DetectorStates.MOVEMENT ? (
                      <MovementInstructions sign={sign} />
                    ) : step.state === DetectorStates.FINAL_LOCATION ? (
                      <FinalLocationInstructions sign={sign} />
                    ) : step.state === DetectorStates.FINAL_PALM_ORIENTATION ? (
                      <FinalPalmOrientationInstructions sign={sign} />
                    ) : step.state === DetectorStates.FINAL_HAND_SHAPE ? (
                      <FinalHandShapeInstructions
                        sign={sign}
                        backgroundColor={state.backgroundColor}
                      />
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
                  className="flex space-x-3 items-center"
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
            className="output_canvas_hands border-4 border-neutral-200"
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
              borderRadius: "1rem",
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

  function setActionsInstructionsState(response: DetectorData) {
    const todo: DetectorState[] = [];
    const done: DetectorState[] = [];
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

  function drawHandDebugMode(
    buffer: SubjectData[],
    subjectData: SubjectData
  ): void {
    if (buffer.length) {
      const ctx = canvasRef.current?.getContext("2d");

      const value = buffer.shift();

      if (value && ctx && value.hand.dominant.palm?.z) {
        drawHand(
          ctx,
          value.readings.dominantLandmarks,
          true,
          value.hand.dominant.palm.z > 0
        );

        if (value.readings.nonDominantLandmarks.length) {
          drawHand(
            ctx,
            value.readings.nonDominantLandmarks,
            false,
            value.hand.dominant.palm.z > 0
          );
        }
      }
    }

    const ctx = (canvasRef.current as HTMLCanvasElement).getContext("2d");

    if (
      subjectData.readings.dominantLandmarks.length &&
      subjectData.hand.dominant.palm?.z
    ) {
      const landmarks = subjectData.readings.dominantLandmarks;
      drawHand(
        ctx as CanvasRenderingContext2D,
        landmarks,
        true,
        subjectData.hand.dominant.palm.z > 0
      );
    }

    if (
      subjectData.readings.nonDominantLandmarks.length &&
      subjectData.hand.nonDominant.palm?.z
    ) {
      const landmarks = subjectData.readings.nonDominantLandmarks;
      drawHand(
        ctx as CanvasRenderingContext2D,
        landmarks,
        false,
        subjectData.hand.nonDominant.palm.z > 0
      );
    }
  }

  function renderCameraImage(image: HTMLVideoElement): void {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d", {
        willReadFrequently: true,
      });

      if (ctx) {
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
  }

  function success(): void {
    canvasRef.current?.classList.remove("canvas-success");
    canvasRef.current?.classList.remove("canvas-failure");
    setTimeout(() => {
      canvasRef.current?.classList.add("canvas-success");
    }, 0);
  }

  function failure(): void {
    canvasRef.current?.classList.remove("canvas-success");
    canvasRef.current?.classList.remove("canvas-failure");
    setTimeout(() => {
      canvasRef.current?.classList.add("canvas-failure");
    }, 0);
  }

  function showSign(): void {
    document.querySelector("#canvas-overlay")?.classList.remove("overlay");
    setTimeout(() => {
      document.querySelector("#canvas-overlay")?.classList.add("overlay");
    }, 0);
  }

  function checkSubjectFramming(poseLandmarks: { y: number }[]): boolean {
    const threshold = -125;
    const leftHipVisible = 720 - poseLandmarks[23].y > threshold;
    return leftHipVisible;
  }
}

export default Recording;

function HandShapeInstructions({
  sign,
  backgroundColor,
}: {
  sign: Sign;
  backgroundColor: "#f5f5f5" | "#000000";
}): JSX.Element {
  const dominantHandShape = sign.steps.start.dominant.handShape;
  const nonDominantHandShape = sign.steps.start.nonDominant?.handShape;

  return (
    <div className="flex flex-col space-y-4 mx-8 my-4">
      {dominantHandShape && (
        <div>
          <div>
            1. Configure e mantenha a <b>mão direita</b> conforme as imagens
            abaixo
          </div>
          <div className="flex space-x-16 mt-4">
            {HandshapeImages[dominantHandShape] &&
              HandshapeImages[dominantHandShape].map((image, index) => {
                return (
                  <div
                    key={`handshape_do_${index}`}
                    className="flex flex-col text-center space-y-4"
                  >
                    <img
                      alt={image.alt}
                      className="h-44"
                      src={image.path}
                      style={{
                        filter:
                          backgroundColor === "#000000" ? "invert(100%)" : "",
                      }}
                    />
                    <span className="text-sm font-bold">{image.label}</span>
                  </div>
                );
              })}
          </div>
        </div>
      )}
      {nonDominantHandShape && (
        <div>
          <div>
            2. Configure e mantenha a <b>mão esquerda</b> conforme as imagens
            abaixo
          </div>
          <div className="flex space-x-16 mt-4">
            {HandshapeImages[nonDominantHandShape] &&
              HandshapeImages[nonDominantHandShape].map((image, index) => {
                return (
                  <div
                    key={`handshape_ndo_${index}`}
                    className="flex flex-col text-center space-y-4"
                  >
                    <img
                      alt={image.alt}
                      className="h-60"
                      src={image.path}
                      style={{
                        filter:
                          backgroundColor === "#000000" ? "invert(100%)" : "",
                      }}
                    />
                    <span className="text-sm font-bold">{image.label}</span>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}

function PalmOrientationInstructions({ sign }: { sign: Sign }): JSX.Element {
  const dominantCategory = sign.steps.start.dominant.palmOrientation;
  const nonDominantCategory = sign.steps.start.nonDominant?.palmOrientation;

  return (
    <div className="flex flex-col mx-8 my-4">
      <div>
        1. Direcione e mantenha palma da mão <b>direita</b> apontado para{" "}
        <b>{PalmOrientationDescription[dominantCategory]}</b>
      </div>
      {nonDominantCategory && (
        <div>
          2. Direcione e mantenha da mão <b>esquerda</b> apontado para{" "}
          <b>{PalmOrientationDescription[nonDominantCategory]}</b>
        </div>
      )}
    </div>
  );
}

function InitialLocationInstructions({ sign }: { sign: Sign }): JSX.Element {
  const hasNonDominantHand = sign.steps.start.nonDominant?.location;
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

function MovementInstructions({ sign }: { sign: Sign }): JSX.Element {
  const dominanHandDescription =
    sign.steps.movement.dominant.metadata.description;
  const dominantHandCategory = sign.steps.movement.dominant.metadata.type;

  return (
    <div className="flex flex-col mx-8 my-4">
      <div>
        1. Com a <b>mão dominante</b> {dominanHandDescription}
      </div>
      {dominantHandCategory === MovementType.CIRCULAR_MOTION && (
        <div>2. Acompanhe o movimento da bola laranja na câmera</div>
      )}
    </div>
  );
}

function FinalLocationInstructions({ sign }: { sign: Sign }): JSX.Element {
  const hasNonDominantHand = sign.steps.start.nonDominant?.location;
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

function FinalPalmOrientationInstructions({
  sign,
}: {
  sign: Sign;
}): JSX.Element {
  const dominantCategory = sign.steps.end.dominant.palmOrientation;
  const nonDominantCategory = sign.steps.end.nonDominant?.palmOrientation;

  return (
    <div className="flex flex-col mx-8 my-4">
      <div>
        1. Direcione e mantenha palma da mão <b>direita</b> apontando para{" "}
        <b>{PalmOrientationDescription[dominantCategory]}</b>
      </div>
      {nonDominantCategory && (
        <div>
          2. Direcione e mantenha da mão <b>esquerda</b> apontando para{" "}
          <b>{PalmOrientationDescription[nonDominantCategory]}</b>
        </div>
      )}
    </div>
  );
}

function FinalHandShapeInstructions({
  sign,
  backgroundColor,
}: {
  sign: Sign;
  backgroundColor: "#f5f5f5" | "#000000";
}): JSX.Element {
  const dominantHandShape = sign.steps.end.dominant.handShape;
  const nonDominantHandShape = sign.steps.end?.nonDominant?.handShape;

  return (
    <div className="flex flex-col space-y-4 mx-8 my-4">
      {dominantHandShape && (
        <div>
          <div>
            1. Configure e mantenha a <b>mão direita</b> conforme as imagens
            abaixo
          </div>
          <div className="flex space-x-8 mt-4">
            {HandshapeImages[dominantHandShape] &&
              HandshapeImages[dominantHandShape].map((image, index) => {
                return (
                  <div
                    key={`handshape_do_${index}`}
                    className="flex flex-col text-center space-y-4"
                  >
                    <img
                      alt={image.alt}
                      className="h-60"
                      src={image.path}
                      style={{
                        filter:
                          backgroundColor === "#000000" ? "invert(100%)" : "",
                      }}
                    />
                    <span className="text-sm font-bold">{image.label}</span>
                  </div>
                );
              })}
          </div>
        </div>
      )}
      {nonDominantHandShape && (
        <div>
          <div>
            2. Configure e mantenha a <b>mão esquerda</b> conforme as imagens
            abaixo
          </div>
          <div className="flex space-x-8 mt-4">
            {HandshapeImages[nonDominantHandShape] &&
              HandshapeImages[nonDominantHandShape].map((image, index) => {
                return (
                  <div
                    key={`handshape_ndo_${index}`}
                    className="flex flex-col text-center space-y-4"
                  >
                    <img
                      alt={image.alt}
                      className="h-60"
                      src={image.path}
                      style={{
                        filter:
                          backgroundColor === "#000000" ? "invert(100%)" : "",
                      }}
                    />
                    <span className="text-sm font-bold">{image.label}</span>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
