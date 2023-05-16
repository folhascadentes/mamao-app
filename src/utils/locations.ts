import { getMiddlePoint } from "./geometrics";
import { Location } from "../signs/types";

// To see landmarks body model
// https://github.com/google/mediapipe/blob/master/docs/solutions/pose.md
export function getLocationCoordinate(
  type: Location,
  poseLandmarks: Coordinate[]
): Coordinate {
  if (type === Location.CHIN) {
    return getMiddlePoint([
      poseLandmarks[4],
      poseLandmarks[1],
      poseLandmarks[11],
      poseLandmarks[12],
    ]);
  } else if (type === Location.TORAX) {
    return getMiddlePoint([
      poseLandmarks[9],
      poseLandmarks[10],
      poseLandmarks[11],
      poseLandmarks[12],
      poseLandmarks[24],
      poseLandmarks[23],
    ]);
  } else if (type === Location.TORAX_UPPER) {
    return getMiddlePoint([
      getMiddlePoint([
        poseLandmarks[24],
        poseLandmarks[23],
        poseLandmarks[4],
        poseLandmarks[1],
      ]),
      poseLandmarks[12],
      poseLandmarks[11],
    ]);
  } else if (type === Location.TORAX_LOWER) {
    return getMiddlePoint([
      getMiddlePoint([
        poseLandmarks[24],
        poseLandmarks[23],
        poseLandmarks[4],
        poseLandmarks[1],
      ]),
      poseLandmarks[0],
      poseLandmarks[24],
      poseLandmarks[23],
    ]);
  } else if (type === Location.TORAX_LEFT) {
    return getMiddlePoint([
      poseLandmarks[11],
      poseLandmarks[23],
      poseLandmarks[9],
    ]);
  } else if (type === Location.TORAX_RIGHT) {
    return getMiddlePoint([
      poseLandmarks[12],
      poseLandmarks[24],
      poseLandmarks[10],
    ]);
  } else if (type === Location.TORAX_LOWER_RIGHT) {
    return getMiddlePoint([
      getMiddlePoint([poseLandmarks[24], poseLandmarks[4], poseLandmarks[1]]),
      poseLandmarks[24],
    ]);
    // } else if (type === "arm_upper") {
    //   return getMiddlePoint([poseLandmarks[13]], {
    //     x: 0,
    //     y: -200,
    //   });
    // } else if (type === "arm_extended") {
    //   return getMiddlePoint([poseLandmarks[11], poseLandmarks[23]]);
  } else if (type === Location.WRIST_LEFT) {
    return getMiddlePoint([poseLandmarks[19]], {
      x: 0,
      y: -100,
    });
  } else if (type === Location.SHOULDER_LEFT) {
    return getMiddlePoint([poseLandmarks[11]]);
  } else if (type === Location.ELBOW_LEFT) {
    return getMiddlePoint([poseLandmarks[13]]);
  } else {
    return { x: 0, y: 0, z: 0 };
  }
}
