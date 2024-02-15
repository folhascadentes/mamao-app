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
import { Subject } from "./core/subject";
import { checkOrientationUtil, checkSameMovement } from "./core/detector";
import { getLocationCoordinate } from "./core/locations";
import { Location } from "./signs/types";
import { getDistance } from "./core/geometrics";
import { signsStates } from "./signs/phonemes";

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

    try {
      const rightHandCoordinates = getLocationCoordinate(
        Location.HAND_PALM_RIGHT,
        subjectData.readings
      );

      const positions = [
        Location.BELLY_LEFT,
        Location.BELLY_RIGHT,
        Location.BELLY,
        Location.FACE_FOREHEAD,
        Location.FACE_MOUTH,
        Location.SHOULDER_LEFT,
        Location.SHOULDER_RIGHT,
        Location.TORAX_LEFT,
        Location.TORAX_LOWER_LEFT,
        Location.TORAX_LOWER_RIGHT,
        Location.TORAX_LOWER,
        Location.TORAX_RIGHT,
        Location.TORAX_UPPER_LEFT,
        Location.TORAX_UPPER_RIGHT,
        Location.TORAX_UPPER,
      ];

      let currentDistance = 10000000000;

      for (let position of positions) {
        const coordinates = getLocationCoordinate(
          position,
          subjectData.readings
        );
        const distance = getDistance(rightHandCoordinates, coordinates);
        if (currentDistance > distance) {
          currentDistance = distance;
          subjectData.hand.dominant.location = position;
        }
      }
    } catch (e) {}

    for (let sign of signsStates) {
      if (subjectData.frame - sign.frame > 15) {
        sign.index = 0;
        sign.frame = subjectData.frame;
      }

      const sameHandsape =
        sign.states[sign.index].shape === undefined ||
        (subjectData.hand.dominant.handShape &&
          subjectData.hand.dominant.handShape.includes(
            sign.states[sign.index].shape as string
          ));
      const sameOrientation =
        sign.states[sign.index].orientation === undefined ||
        checkOrientationUtil(
          sign.states[sign.index].orientation as any,
          subjectData.hand.dominant.palm
        );
      const samePointing =
        sign.states[sign.index].pointing === undefined ||
        checkOrientationUtil(
          sign.states[sign.index].pointing as any,
          subjectData.hand.dominant.ponting
        );
      const sameMovement =
        sign.states[sign.index].movement === undefined ||
        checkSameMovement(
          subjectData.hand.dominant.movement,
          sign.states[sign.index].movement as any
        );
      const sameLocation =
        sign.states[sign.index].location === undefined ||
        (subjectData.hand.dominant.location &&
          subjectData.hand.dominant.location.includes(
            sign.states[sign.index].location as string
          ));

      if (
        sameHandsape &&
        sameOrientation &&
        samePointing &&
        sameMovement &&
        sameLocation
      ) {
        console.log(sign.id);
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
