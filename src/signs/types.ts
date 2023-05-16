export interface Sign {
  language: string;
  token: string;
  steps: SignSteps;
}

interface SignSteps {
  start: {
    dominant: SignConfiguration;
    nonDominant?: SignConfiguration;
  };
  movement: {
    dominant: MovementConfiguration;
    nonDominant?: MovementConfiguration;
  };
  end: {
    dominant: SignConfiguration;
    nonDominant?: SignConfiguration;
  };
}

interface SignConfiguration {
  location: Location | Location[];
  handShape: HandShapeType;
  palmOrientation: PalmOrientation;
  handOrientation?: HandOrientation;
  options?: {
    location: {
      track?: boolean;
      radiusOffset?: number;
      verticalOffset?: number;
      horizontalOffset?: number;
      same?: boolean;
      side?: string;
    };
  };
}

interface MovementConfiguration {
  detect: Movement[] | [Movement[]];
  forbidden?: Movement[];
  options?: {
    detect: {
      circular: boolean;
    };
  };
  metadata: {
    description: string;
    type: string;
  };
}

interface Movement {
  x?: 1 | 0 | -1;
  y?: 1 | 0 | -1;
  z?: 1 | 0 | -1;
  wristRotate?: boolean;
  wristExtension?: boolean;
  wristFlexion?: boolean;
  wristAbduction?: boolean;
  wristAdduction?: boolean;
}

export enum Location {
  FOREHEAD = "forehead",
  FOREHEAD_LEFT = "forehead_left",
  FOREHEAD_RIGHT = "forehead_right",
  NOSE = "nose",
  EYE_LEFT = "eye_left",
  EYE_LEFT_INNER = "eye_left_inner",
  EYE_LEFT_OUTER = "eye_left_outer",
  EYE_RIGHT = "eye_right",
  EYE_RIGHT_INNER = "eye_right_inner",
  EYE_RIGHT_OUTER = "eye_right_outer",
  EAR_LEFT = "ear_left",
  EAR_RIGHT = "ear_right",
  CHEEK_LEFT = "cheek_left",
  CHEEK_RIGHT = "cheek_right",
  MOUTH = "mouth",
  MOUTH_LEFT = "mouth_left",
  MOUTH_RIGHT = "mouth_right",
  CHIN = "chin",
  SHOULDER_LEFT = "shoulder_left",
  SHOULDER_RIGHT = "shoulder_right",
  ELBOW_LEFT = "elbow_left",
  ELBOW_RIGHT = "elbow_right",
  WRIST_LEFT = "wrist_left",
  WRIST_RIGHT = "wrist_right",
  PALM_LEFT = "palm_left",
  PALM_RIGHT = "palm_right",
  THUMB_LEFT = "thumb_cmc_left",
  THUMB_RIGHT = "thumb_cmc_right",
  INDEX_LEFT = "index_mcp_left",
  INDEX_RIGHT = "index_mcp_right",
  MIDDLE_LEFT = "middle_mcp_left",
  MIDDLE_RIGHT = "middle_mcp_right",
  RING_LEFT = "ring_mcp_left",
  RING_RIGHT = "ring_mcp_right",
  PINKY_LEFT = "pinky_mcp_left",
  PINKY_RIGHT = "pinky_mcp_right",
  TORAX = "torax",
  TORAX_LEFT = "torax_left",
  TORAX_RIGHT = "torax_right",
  TORAX_UPPER = "torax_upper",
  TORAX_UPPER_LEFT = "torax_upper_left",
  TORAX_UPPER_RIGHT = "torax_upper_right",
  TORAX_LOWER = "torax_lower",
  TORAX_LOWER_LEFT = "torax_lower_left",
  TORAX_LOWER_RIGHT = "torax_lower_right",
  BELLY = "belly",
  HIP_LEFT = "hip_left",
  HIP_RIGHT = "hip_right",
}

type LeafValues<T> = T extends object
  ? {
      [K in keyof T]: LeafValues<T[K]>;
    }[keyof T]
  : T;

type HandShapeType = LeafValues<typeof HandShape>;

export const HandShape = {
  libras: {
    A: "a",
    B: "b",
    C: "c",
    D: "d",
    E: "e",
    F: "f",
    G: "g",
    H: "h",
    I: "i",
    J: "j",
    K: "k",
    L: "l",
    M: "m",
    N: "n",
    O: "o",
    P: "p",
    Q: "q",
    R: "r",
    S: "s",
    T: "t",
    U: "u",
    V: "v",
    W: "w",
    X: "x",
    Y: "y",
    middleAndIndexFinger: "middle_and_index_finger",
  },
};

export enum PalmOrientation {
  UP = "up",
  DOWN = "down",
  LEFT = "left",
  RIGHT = "right",
  FRONT = "front",
  BACK = "back",
}

export enum HandOrientation {
  UP = "up",
  DOWN = "down",
  LEFT = "left",
  RIGHT = "right",
  FRONT = "front",
  BACK = "back",
}
