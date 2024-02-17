import React, { useRef, useEffect } from "react";
import * as tensorflow from "@tensorflow/tfjs";
import { useNavigate } from "react-router-dom";
import { Camera } from "@mediapipe/camera_utils";
import {
  HandResults,
  initalizeHandsDetector,
  initializePoseDetector,
  PoseResults,
  Results,
} from "./core/mediapipe";
import { Subject, SubjectHandData, SubjectReadings } from "./core/subject";
import { checkMostOrientation, checkSameMovement } from "./core/detector";
import { getLocationCoordinate } from "./core/locations";
import { FingersLocation, Location } from "./signs/types";
import { getDistance } from "./core/geometrics";
import { ParametersConfig, signsStates } from "./signs/phonemes";

function Transcribe({
  setLoading,
  handShapeModel,
  transcribeModel,
}: {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  handShapeModel: tensorflow.LayersModel;
  transcribeModel: tensorflow.LayersModel;
}) {
  const navigate = useNavigate();

  const [predictShow, setPredictShow] = React.useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const subjectRef = useRef<Subject>();

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
    } else {
      poseLandmarks = [];
    }
  };

  const onResultsHandsCallback = (handResults: HandResults) => {
    const subject = subjectRef.current as Subject;

    const results: Results = {
      ...handResults,
      poseLandmarks,
      poseWorldLandmarks,
    };

    const subjectData = subject.parse(results);

    console.log(
      checkMostOrientation(subjectData.hand.dominant.ponting),
      checkMostOrientation(subjectData.hand.dominant.palm),
      subjectData.hand.dominant.handShape
    );

    for (let sign of signsStates) {
      if (subjectData.frame - sign.frame > 15) {
        sign.index = 0;
        sign.frame = subjectData.frame;
      }

      if (
        detectPhoneme(
          sign.states[sign.index].right,
          subjectData.hand.dominant,
          subjectData.readings
        ) &&
        (sign.states[sign.index].left === undefined ||
          detectPhoneme(
            sign.states[sign.index].left as ParametersConfig,
            subjectData.hand.nonDominant,
            subjectData.readings
          ))
      ) {
        sign.index++;
        sign.frame = subjectData.frame;

        if (sign.index === sign.states.length) {
          setPredictShow(sign.id);

          for (let sign of signsStates) {
            sign.index = 0;
          }
        }
      }
    }
  };

  useEffect(() => {
    if (!transcribeModel) {
      navigate("/instructions");
      return;
    }

    const subject = new Subject(
      canvasRef.current as HTMLCanvasElement,
      24,
      handShapeModel
    );
    subjectRef.current = subject;

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
        setLoading(false);
      },
      width: 720,
      height: 720,
    });

    camera.start();

    return () => {
      camera.stop();
      hands.close();
      pose.close();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="recording flex flex-col justify-center">
      <video
        ref={videoRef}
        className="input_video hidden"
        width="720"
        height="720"
      ></video>
      <div className="flex flex-col md:flex-row md:space-x-8 justify-center font-sm mx-6">
        <div className="w-1/2 flex flex-col space-y-4 items-center justify-center text-center ">
          <h1 className="text-4xl">Transcrição</h1>
          <div className="text-9xl text-orange-500 font-black">
            {predictShow}
          </div>
        </div>
        <div className="w-1/2">
          <div className="flex relative">
            <canvas
              ref={canvasRef}
              className={`border-4 border-neutral-200`}
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
          </div>
        </div>
      </div>
    </div>
  );

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
      }
    }
  }
}

export default Transcribe;

function detectPhoneme(
  param: ParametersConfig,
  detect: SubjectHandData,
  readings: SubjectReadings
): boolean {
  const sameHandsape =
    param.shape === undefined || param.shape === detect.handShape;

  const sameOrientation =
    param.orientation === undefined ||
    param.orientation === checkMostOrientation(detect.palm);

  const samePointing =
    param.pointing === undefined ||
    param.pointing ===
      checkMostOrientation(
        detect.pontingFingers?.[
          param.options?.pontingFinger as FingersLocation
        ] ?? detect.ponting
      );

  const sameMovement =
    param.movement === undefined ||
    checkSameMovement(detect.movement, param.movement as any);

  const location = detectLocation(
    param.options?.locationPivot ?? Location.HAND_PALM_RIGHT,
    readings
  );

  const sameLocation =
    param.location === undefined ||
    (location !== undefined &&
      location !== undefined &&
      param.location.some((l) => location.includes(l)));

  return (
    sameHandsape &&
    sameOrientation &&
    samePointing &&
    sameMovement &&
    sameLocation
  );
}

function detectLocation(
  pivot: Location,
  readings: SubjectReadings
): Location | undefined {
  let currentLocation: Location | undefined;

  try {
    const pivotCoordinates = getLocationCoordinate(pivot, readings);

    const positions = [
      Location.BELLY_LEFT,
      Location.BELLY_RIGHT,
      Location.BELLY,
      Location.FACE_FOREHEAD_RIGHT,
      Location.FACE_FOREHEAD_LEFT,
      Location.FACE_MOUTH,
      Location.SHOULDER_LEFT,
      Location.SHOULDER_RIGHT,
      Location.TORAX_LEFT,
      Location.TORAX_RIGHT,
    ];

    let currentDistance = 10000000000;

    for (let position of positions) {
      const coordinates = getLocationCoordinate(position, readings);
      const distance = getDistance(pivotCoordinates, coordinates);
      if (currentDistance > distance) {
        currentDistance = distance;
        currentLocation = position;
      }
    }
  } catch (e) {}

  return currentLocation;
}
