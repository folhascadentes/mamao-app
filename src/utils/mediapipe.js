import { Hands } from "@mediapipe/hands";
import { Pose } from "@mediapipe/pose";

export function initalizeHandsDetector() {
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

export function initializePoseDetector() {
  const pose = new Pose({
    locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
    },
  });

  pose.setOptions({
    modelComplexity: 1,
    smoothLandmarks: false,
    minDetectionConfidence: 0.7,
    minTrackingConfidence: 0.7,
  });

  return pose;
}
