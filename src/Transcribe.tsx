import React, { useRef, useEffect, useState } from "react";
import * as tensorflow from "@tensorflow/tfjs";
import { Camera } from "@mediapipe/camera_utils";
import {
  HandResults,
  initalizeHandsDetector,
  initializePoseDetector,
  PoseResults,
  Results,
} from "./core/mediapipe";
import {
  Subject,
  SubjectData,
  SubjectHandData,
  SubjectReadings,
} from "./core/subject";
import { checkMostOrientation, checkSameMovement } from "./core/detector";
import { getLocationCoordinate } from "./core/locations";
import { FingersLocation, Location } from "./signs/types";
import { getDistance } from "./core/geometrics";
import {
  PhonemeDescriptor,
  SignDescriptor,
  signsDescriptors,
} from "./signs/phonemes";

function Transcribe({
  setLoading,
}: {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [handShapeModel, setHandShapeModel] =
    useState<tensorflow.LayersModel>();
  const [predictShow, setPredictShow] = React.useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const subjectRef = useRef<Subject>();

  let poseLandmarks: Coordinate[] = [];
  let poseWorldLandmarks: Coordinate[] = [];
  let phonemes: (SubjectData | undefined)[] = [];
  let memory: Set<string> = new Set();

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

    let memoryHasPrior = memory.size > 0;

    for (let sign of signsDescriptors) {
      for (let phoneme of sign.phonemes) {
        const phonemeDetected = detectPhoneme(phoneme, subjectData);
        const hash = hashPhoneme(phoneme);

        if (memoryHasPrior && phonemeDetected && !memory.has(hash)) {
          memory.clear();
          memoryHasPrior = false;
        }

        if (phonemeDetected && !memory.has(hash)) {
          memory.add(hash);
        }
      }
    }

    if (memoryHasPrior === false && memory.size > 0) {
      phonemes.push(subjectData);
      console.log(
        Array.from(memory.values())
          .map((v) => v)
          .join("#"),
        phonemes.length
      );
    }

    // Some times any handmark is detected even when the hand is in the camera,
    // triggering the prediction with an empty phoneme list
    if (
      subjectData.readings.dominantLandmarks.length === 0 &&
      subjectData.readings.nonDominantLandmarks.length === 0 &&
      phonemes.length > 0 &&
      phonemes[phonemes.length - 1] !== undefined
    ) {
      // console.log("EMPTY", subjectData.readings.dominantLandmarks.length);
      // phonemes.push(undefined);
    }

    const { remainingPhonemes, matchedSignId } = parseSigns(
      phonemes,
      signsDescriptors
    );

    phonemes = remainingPhonemes;

    if (matchedSignId) {
      setPredictShow(matchedSignId);
      console.log("PREDICTION", phonemes.length);
    }
  };

  useEffect(() => {
    (async function () {
      if (handShapeModel === undefined) {
        const model = await tensorflow.loadLayersModel(
          process.env.REACT_APP_HAND_SHAPE_MODEL_URL as string
        );
        setHandShapeModel(model);
      }
    })();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const subject = new Subject(
      canvasRef.current as HTMLCanvasElement,
      24,
      handShapeModel as tensorflow.LayersModel
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
  }, [handShapeModel]);

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

function parseSigns(
  phonemes: (SubjectData | undefined)[],
  signs: SignDescriptor[]
): {
  remainingPhonemes: (SubjectData | undefined)[];
  matchedSignId: string | undefined;
} {
  const phonemeMatchLength: {
    [signId: string]: {
      startDetectionIndex: number; // Index of the phoneme list where the detection started
      endDetectionIndex: number; // Index of the phoneme list where the detection ended
      detectedLength: number; // Length of the detected phonemes
    };
  } = {};

  signs.forEach((sign) => {
    for (
      let detectedIndex = 0, signIndex = 0;
      detectedIndex < phonemes.length && signIndex < sign.phonemes.length;
      detectedIndex++
    ) {
      if (detectPhoneme(sign.phonemes[signIndex], phonemes[detectedIndex])) {
        signIndex++;

        if (phonemeMatchLength[sign.id] === undefined) {
          phonemeMatchLength[sign.id] = {
            startDetectionIndex: detectedIndex,
            endDetectionIndex: detectedIndex,
            detectedLength: 1,
          };
        } else {
          phonemeMatchLength[sign.id].detectedLength = signIndex;
          phonemeMatchLength[sign.id].endDetectionIndex = detectedIndex;
        }
      }
    }
  });

  const matchedSigns = Object.entries(phonemeMatchLength)
    .map(([signId, data]) => {
      const sign = signs.find((sign) => sign.id === signId);
      return {
        signId,
        startDetectionIndex: data.startDetectionIndex,
        endDetectionIndex: data.endDetectionIndex,
        detectedLength: data.detectedLength,
        isCompleteMatch: data.detectedLength === sign?.phonemes.length,
      };
    })
    .sort((a, b) => {
      if (a.isCompleteMatch && b.isCompleteMatch) {
        if (a.startDetectionIndex === b.startDetectionIndex) {
          return b.detectedLength - a.detectedLength;
        } else {
          return a.startDetectionIndex - b.startDetectionIndex;
        }
      } else {
        return a.isCompleteMatch ? -1 : 1;
      }
    });

  // If any sign is completed matched, we have at least one sign to return
  const hasCompletedMatch = matchedSigns[0]?.isCompleteMatch;

  // we will not return yet with new phonemes could lead to a longer sign matched
  // for instance:
  //  SA = #a#b
  //  sB = #a
  //  phonemes = #a
  // if we return now, we will not be able to match the sign SA
  const hasPotencialMatch = matchedSigns.find(
    (sign) =>
      !sign.isCompleteMatch && sign.endDetectionIndex + 1 === phonemes.length
  );

  if (hasCompletedMatch && !hasPotencialMatch) {
    console.log(matchedSigns);
    return {
      remainingPhonemes: phonemes.slice(matchedSigns[0].endDetectionIndex + 1),
      matchedSignId: matchedSigns[0].signId,
    };
  }

  return {
    remainingPhonemes: phonemes,
    matchedSignId: undefined,
  };
}

function hashPhoneme(phoneme: {
  right: PhonemeDescriptor;
  left?: PhonemeDescriptor;
}): string {
  return (
    hashPhonemeUtil(phoneme.right) +
    (phoneme.left ? hashPhonemeUtil(phoneme.left) : "")
  );
}

function hashPhonemeUtil(descriptor: PhonemeDescriptor): string {
  const { shape, orientation, pointing, movement, location } = descriptor;

  return `(${shape ? shape + ";" : ""}${
    orientation ? orientation.sort().join(",") + ";" : ""
  }${pointing ? pointing.sort().join(",") + ";" : ""}${
    movement ? JSON.stringify(movement) + ";" : ""
  }${location ? location.sort().join(",") + ";" : ""})`;
}

function detectPhoneme(
  phoneme: {
    right: PhonemeDescriptor;
    left?: PhonemeDescriptor;
  },
  subjectData: SubjectData | undefined
): boolean {
  if (subjectData === undefined) {
    return false;
  }

  return (
    detectPhonemeUtil(
      phoneme.right,
      subjectData.hand.dominant,
      subjectData.readings
    ) &&
    (phoneme.left === undefined ||
      detectPhonemeUtil(
        phoneme.left as PhonemeDescriptor,
        subjectData.hand.nonDominant,
        subjectData.readings
      ))
  );
}

function detectPhonemeUtil(
  param: PhonemeDescriptor,
  detect: SubjectHandData,
  readings: SubjectReadings
): boolean {
  const sameHandsape =
    param.shape === undefined || param.shape === detect.handShape;

  const sameOrientation =
    param.orientation === undefined ||
    param.orientation.some(
      (orientation) => orientation === checkMostOrientation(detect.palm)
    );

  const samePointing =
    param.pointing === undefined ||
    param.pointing.some(
      (pointing) =>
        pointing ===
        checkMostOrientation(
          detect.pontingFingers?.[
            param.options?.pontingFinger as FingersLocation
          ] ?? detect.ponting
        )
    );

  const movementPivot =
    param.options?.movementPivot &&
    detect.movement.landmarks?.[param.options?.movementPivot];

  const sameMovement =
    param.movement === undefined ||
    checkSameMovement(movementPivot || detect.movement, param.movement as any);

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
