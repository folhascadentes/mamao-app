import { getMiddlePoint, pointDifference } from "./geometrics";
import { SubjectReadings } from "./subject";
import { Location } from "../signs/types";

// To see landmarks body model
// https://github.com/google/mediapipe/blob/master/docs/solutions/pose.md
export function getLocationCoordinate(
  type: Location,
  readings: SubjectReadings
): Coordinate {
  const { poseLandmarks, dominantLandmarks, nonDominantLandmarks } = readings;
  const mapper: { [key in Location]: () => Coordinate } = {
    [Location.FOREHEAD]: () => {
      const distanceBetweenNoseMouth = pointDifference(
        poseLandmarks[0],
        getMiddlePoint([poseLandmarks[9], poseLandmarks[10]])
      );
      const middlePointBetweenEyebrows = getMiddlePoint([
        poseLandmarks[1],
        poseLandmarks[4],
      ]);

      return {
        x: middlePointBetweenEyebrows.x,
        y: middlePointBetweenEyebrows.y - distanceBetweenNoseMouth.y,
        z: 0,
      };
    },
    [Location.FOREHEAD_LEFT]: () => {
      const distanceBetweenNoseMouth = pointDifference(
        poseLandmarks[0],
        getMiddlePoint([poseLandmarks[9], poseLandmarks[10]])
      );

      return {
        x: poseLandmarks[7].x,
        y: poseLandmarks[3].y - distanceBetweenNoseMouth.y,
        z: 0,
      };
    },
    [Location.FOREHEAD_RIGHT]: () => {
      const distanceBetweenNoseMouth = pointDifference(
        poseLandmarks[0],
        getMiddlePoint([poseLandmarks[9], poseLandmarks[10]])
      );

      return {
        x: poseLandmarks[8].x,
        y: poseLandmarks[6].y - distanceBetweenNoseMouth.y,
        z: 0,
      };
    },
    [Location.NOSE]: () => {
      return poseLandmarks[0];
    },
    [Location.EYE_LEFT]: () => {
      return poseLandmarks[2];
    },
    [Location.EYE_LEFT_INNER]: () => {
      return poseLandmarks[1];
    },
    [Location.EYE_LEFT_OUTER]: () => {
      return poseLandmarks[3];
    },
    [Location.EYE_RIGHT]: () => {
      return poseLandmarks[5];
    },
    [Location.EYE_RIGHT_INNER]: () => {
      return poseLandmarks[4];
    },
    [Location.EYE_RIGHT_OUTER]: () => {
      return poseLandmarks[6];
    },
    [Location.EAR_LEFT]: () => {
      return poseLandmarks[7];
    },
    [Location.EAR_RIGHT]: () => {
      return poseLandmarks[8];
    },
    [Location.CHEEK_LEFT]: () => {
      const middleMouthEar = getMiddlePoint([
        getMiddlePoint([poseLandmarks[9], poseLandmarks[7]]),
        poseLandmarks[7],
      ]);

      return { x: middleMouthEar.x, y: poseLandmarks[9].y, z: 0 };
    },
    [Location.CHEEK_RIGHT]: () => {
      const middleMouthEar = getMiddlePoint([
        getMiddlePoint([poseLandmarks[10], poseLandmarks[8]]),
        poseLandmarks[8],
      ]);

      return { x: middleMouthEar.x, y: poseLandmarks[10].y, z: 0 };
    },
    [Location.MOUTH]: () => {
      return getMiddlePoint([poseLandmarks[9], poseLandmarks[10]]);
    },
    [Location.MOUTH_LEFT]: () => {
      return poseLandmarks[9];
    },
    [Location.MOUTH_RIGHT]: () => {
      return poseLandmarks[10];
    },
    [Location.CHIN]: () => {
      const distanceBetweenNoseMouth = pointDifference(
        poseLandmarks[0],
        getMiddlePoint([poseLandmarks[9], poseLandmarks[10]])
      );
      const mouth = getMiddlePoint([poseLandmarks[9], poseLandmarks[10]]);
      return {
        x: mouth.x,
        y: mouth.y + distanceBetweenNoseMouth.y,
        z: 0,
      };
    },
    [Location.SHOULDER_LEFT]: () => {
      return poseLandmarks[11];
    },
    [Location.SHOULDER_RIGHT]: () => {
      return poseLandmarks[12];
    },
    [Location.ELBOW_LEFT]: () => {
      return poseLandmarks[13];
    },
    [Location.ELBOW_RIGHT]: () => {
      return poseLandmarks[14];
    },
    [Location.WRIST_LEFT]: () => {
      return poseLandmarks[15];
    },
    [Location.WRIST_RIGHT]: () => {
      return poseLandmarks[16];
    },
    [Location.PALM_LEFT]: () => {
      return getMiddlePoint([nonDominantLandmarks[0], nonDominantLandmarks[9]]);
    },
    [Location.PALM_RIGHT]: () => {
      return getMiddlePoint([dominantLandmarks[0], dominantLandmarks[9]]);
    },
    [Location.THUMB_LEFT]: () => {
      return nonDominantLandmarks[4];
    },
    [Location.THUMB_RIGHT]: () => {
      return dominantLandmarks[4];
    },
    [Location.INDEX_LEFT]: () => {
      return nonDominantLandmarks[8];
    },
    [Location.INDEX_RIGHT]: () => {
      return dominantLandmarks[8];
    },
    [Location.MIDDLE_LEFT]: () => {
      return nonDominantLandmarks[12];
    },
    [Location.MIDDLE_RIGHT]: () => {
      return dominantLandmarks[12];
    },
    [Location.RING_LEFT]: () => {
      return nonDominantLandmarks[16];
    },
    [Location.RING_RIGHT]: () => {
      return dominantLandmarks[16];
    },
    [Location.PINKY_LEFT]: () => {
      return nonDominantLandmarks[20];
    },
    [Location.PINKY_RIGHT]: () => {
      return dominantLandmarks[20];
    },
    [Location.TORAX]: () => {
      return getMiddlePoint([
        getMiddlePoint([
          poseLandmarks[11],
          poseLandmarks[12],
          poseLandmarks[23],
          poseLandmarks[24],
        ]),
        getMiddlePoint([poseLandmarks[11], poseLandmarks[12]]),
      ]);
    },
    [Location.TORAX_LEFT]: () => {
      return getMiddlePoint([
        getMiddlePoint([
          poseLandmarks[11],
          poseLandmarks[23],
          poseLandmarks[24],
        ]),
        poseLandmarks[11],
      ]);
    },
    [Location.TORAX_RIGHT]: () => {
      return getMiddlePoint([
        getMiddlePoint([
          poseLandmarks[12],
          poseLandmarks[23],
          poseLandmarks[24],
        ]),
        poseLandmarks[12],
      ]);
    },
    [Location.TORAX_UPPER]: () => {
      const distanceMouthEyebrows = pointDifference(
        getMiddlePoint([poseLandmarks[1], poseLandmarks[4]]),
        getMiddlePoint([poseLandmarks[9], poseLandmarks[10]])
      );
      const torax = getMiddlePoint([
        getMiddlePoint([
          poseLandmarks[11],
          poseLandmarks[12],
          poseLandmarks[23],
          poseLandmarks[24],
        ]),
        getMiddlePoint([poseLandmarks[11], poseLandmarks[12]]),
      ]);

      return {
        x: torax.x,
        y: torax.y - distanceMouthEyebrows.y * 1.4,
        z: 0,
      };
    },
    [Location.TORAX_UPPER_LEFT]: () => {
      const distanceMouthEyebrows = pointDifference(
        getMiddlePoint([poseLandmarks[1], poseLandmarks[4]]),
        getMiddlePoint([poseLandmarks[9], poseLandmarks[10]])
      );
      const toraxLeft = getMiddlePoint([
        getMiddlePoint([
          poseLandmarks[11],
          poseLandmarks[23],
          poseLandmarks[24],
        ]),
        poseLandmarks[11],
      ]);
      return {
        x: toraxLeft.x,
        y: toraxLeft.y - distanceMouthEyebrows.y * 1.4,
        z: 0,
      };
    },
    [Location.TORAX_UPPER_RIGHT]: () => {
      const distanceMouthEyebrows = pointDifference(
        getMiddlePoint([poseLandmarks[1], poseLandmarks[4]]),
        getMiddlePoint([poseLandmarks[9], poseLandmarks[10]])
      );
      const toraxRight = getMiddlePoint([
        getMiddlePoint([
          poseLandmarks[12],
          poseLandmarks[23],
          poseLandmarks[24],
        ]),
        poseLandmarks[12],
      ]);
      return {
        x: toraxRight.x,
        y: toraxRight.y - distanceMouthEyebrows.y * 1.4,
        z: 0,
      };
    },
    [Location.TORAX_LOWER]: () => {
      const distanceMouthEyebrows = pointDifference(
        getMiddlePoint([poseLandmarks[1], poseLandmarks[4]]),
        getMiddlePoint([poseLandmarks[9], poseLandmarks[10]])
      );
      const torax = getMiddlePoint([
        getMiddlePoint([
          poseLandmarks[11],
          poseLandmarks[12],
          poseLandmarks[23],
          poseLandmarks[24],
        ]),
        getMiddlePoint([poseLandmarks[11], poseLandmarks[12]]),
      ]);

      return {
        x: torax.x,
        y: torax.y + distanceMouthEyebrows.y * 1.4,
        z: 0,
      };
    },
    [Location.TORAX_LOWER_LEFT]: () => {
      const distanceMouthEyebrows = pointDifference(
        getMiddlePoint([poseLandmarks[1], poseLandmarks[4]]),
        getMiddlePoint([poseLandmarks[9], poseLandmarks[10]])
      );
      const toraxLeft = getMiddlePoint([
        getMiddlePoint([
          poseLandmarks[11],
          poseLandmarks[23],
          poseLandmarks[24],
        ]),
        poseLandmarks[11],
      ]);
      return {
        x: toraxLeft.x,
        y: toraxLeft.y + distanceMouthEyebrows.y * 1.4,
        z: 0,
      };
    },
    [Location.TORAX_LOWER_RIGHT]: () => {
      const distanceMouthEyebrows = pointDifference(
        getMiddlePoint([poseLandmarks[1], poseLandmarks[4]]),
        getMiddlePoint([poseLandmarks[9], poseLandmarks[10]])
      );
      const toraxRight = getMiddlePoint([
        getMiddlePoint([
          poseLandmarks[12],
          poseLandmarks[23],
          poseLandmarks[24],
        ]),
        poseLandmarks[12],
      ]);
      return {
        x: toraxRight.x,
        y: toraxRight.y + distanceMouthEyebrows.y * 1.4,
        z: 0,
      };
    },
    [Location.BELLY]: () => {
      const distanceMouthEyebrows = pointDifference(
        getMiddlePoint([poseLandmarks[1], poseLandmarks[4]]),
        getMiddlePoint([poseLandmarks[9], poseLandmarks[10]])
      );
      const torax = getMiddlePoint([
        getMiddlePoint([
          poseLandmarks[11],
          poseLandmarks[12],
          poseLandmarks[23],
          poseLandmarks[24],
        ]),
        getMiddlePoint([poseLandmarks[11], poseLandmarks[12]]),
      ]);

      return {
        x: torax.x,
        y: torax.y + distanceMouthEyebrows.y * 3,
        z: 0,
      };
    },
    [Location.HIP_LEFT]: () => {
      return poseLandmarks[23];
    },
    [Location.HIP_RIGHT]: () => {
      return poseLandmarks[24];
    },
  };

  return mapper[type]();
}
