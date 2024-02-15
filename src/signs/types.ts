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
    location?: SignConfigurationLocationOptions;
    palmOrientation?: PalmOrientationOptions;
    handShape?: HandShapeOptions;
  };
}

export interface SignConfigurationLocationOptions {
  handLocation?: HandLocation;
  detectionRadius?: number;
  track?: boolean;
  radiusOffset?:
    | number
    | {
        value: number;
        leftLimitValue?: number;
        rightLimitValue?: number;
        upLimitValue?: number;
        downLimitValue?: number;
      };
  verticalOffset?: number;
  horizontalOffset?: number;
  same?: boolean;
  sameY?: boolean;
  sameX?: boolean;
  side?: boolean;
}

export interface PalmOrientationOptions {
  detectionAngle?: number;
}

export interface HandShapeOptions {
  extraDetect: HandShapeType[];
}

interface MovementConfiguration {
  detect?: Movement[] | Movement[][];
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

export enum MovementType {
  CIRCULAR_MOTION = "CIRCULAR_MOTION",
  LINEAR_MOTION = "LINEAR_MOTION",
  PARABOLIC_MOTION = "PARABOLIC_MOTION",
  STATIC = "STATIC",
  SHAKE_MOTION = "SHAKE_MOTION",
  WRIST_FLEXION_EXTENSION = "WRIST_FLEXION_EXTENSION",
  WRIST_ROTATE = "WRIST_ROTATE",
  ZIG_ZAG = "ZIG_ZAG",
}

export interface MovementAxis {
  x?: 1 | -1;
  y?: 1 | -1;
  z?: 1 | -1;
}

export interface Movement extends MovementAxis {
  wristRotate?: boolean;
  wristRotateClockwise?: boolean;
  wristRotateCounterClockwise?: boolean;
  wristExtension?: boolean;
  wristFlexion?: boolean;
  wristAbduction?: boolean; // TODO
  wristAdduction?: boolean; // TODO
}

export enum Location {
  ARM_ELBOW_LEFT = "ARM_ELBOW_LEFT",
  ARM_ELBOW_RIGHT = "ARM_ELBOW_RIGHT",
  BELLY = "BELLY",
  BELLY_LEFT = "BELLY_LEFT",
  BELLY_RIGHT = "BELLY_RIGHT",
  FACE_CHEEK_LEFT = "FACE_CHEEK_LEFT",
  FACE_CHEEK_RIGHT = "FACE_CHEEK_RIGHT",
  FACE_CHIN = "FACE_CHIN",
  FACE_EAR_LEFT = "FACE_EAR_LEFT",
  FACE_EAR_RIGHT = "FACE_EAR_RIGHT",
  FACE_EYE_LEFT = "FACE_EYE_LEFT",
  FACE_EYE_LEFT_INNER = "FACE_EYE_LEFT_INNER",
  FACE_EYE_LEFT_OUTER = "FACE_EYE_LEFT_OUTER",
  FACE_EYE_RIGHT = "FACE_EYE_RIGHT",
  FACE_EYE_RIGHT_INNER = "FACE_EYE_RIGHT_INNER",
  FACE_EYE_RIGHT_OUTER = "FACE_EYE_RIGHT_OUTER",
  FACE_FOREHEAD = "FACE_FOREHEAD",
  FACE_FOREHEAD_LEFT = "FACE_FOREHEAD_LEFT",
  FACE_FOREHEAD_RIGHT = "FACE_FOREHEAD_RIGHT",
  FACE_MOUTH = "FACE_MOUTH",
  FACE_MOUTH_LEFT = "FACE_MOUTH_LEFT",
  FACE_MOUTH_RIGHT = "FACE_MOUTH_RIGHT",
  FACE_NOSE = "FACE_NOSE",
  HAND_INDEX_LEFT = "HAND_INDEX_MCP_LEFT",
  HAND_INDEX_RIGHT = "HAND_INDEX_MCP_RIGHT",
  HAND_MIDDLE_LEFT = "HAND_MIDDLE_MCP_LEFT",
  HAND_MIDDLE_RIGHT = "HAND_MIDDLE_MCP_RIGHT",
  HAND_PALM_LEFT = "HAND_PALM_LEFT",
  HAND_PALM_RIGHT = "HAND_PALM_RIGHT",
  HAND_PINKY_LEFT = "HAND_PINKY_MCP_LEFT",
  HAND_PINKY_RIGHT = "HAND_PINKY_MCP_RIGHT",
  HAND_RING_LEFT = "HAND_RING_MCP_LEFT",
  HAND_RING_RIGHT = "HAND_RING_MCP_RIGHT",
  HAND_THUMB_LEFT = "HAND_THUMB_CMC_LEFT",
  HAND_THUMB_RIGHT = "HAND_THUMB_CMC_RIGHT",
  HAND_WRIST_LEFT = "HAND_WRIST_LEFT",
  HAND_WRIST_RIGHT = "HAND_WRIST_RIGHT",
  SHOULDER_LEFT = "SHOULDER_LEFT",
  SHOULDER_RIGHT = "SHOULDER_RIGHT",
  TORAX = "TORAX",
  TORAX_LEFT = "TORAX_LEFT",
  TORAX_LOWER = "TORAX_LOWER",
  TORAX_LOWER_LEFT = "TORAX_LOWER_LEFT",
  TORAX_LOWER_RIGHT = "TORAX_LOWER_RIGHT",
  TORAX_RIGHT = "TORAX_RIGHT",
  TORAX_UPPER = "TORAX_UPPER",
  TORAX_UPPER_LEFT = "TORAX_UPPER_LEFT",
  TORAX_UPPER_RIGHT = "TORAX_UPPER_RIGHT",
}

export enum HandLocation {
  WRIST = 0,
  THUMB_CMC = 1,
  THUMB_MCP = 2,
  THUMB_IP = 3,
  THUMB_TIP = 4,
  INDEX_FINGER_MCP = 5,
  INDEX_FINGER_PIP = 6,
  INDEX_FINGER_DIP = 7,
  INDEX_FINGER_TIP = 8,
  MIDDLE_FINGER_MCP = 9,
  MIDDLE_FINGER_PIP = 10,
  MIDDLE_FINGER_DIP = 11,
  MIDDLE_FINGER_TIP = 12,
  RING_FINGER_MCP = 13,
  RING_FINGER_PIP = 14,
  RING_FINGER_DIP = 15,
  RING_FINGER_TIP = 16,
  PINKY_MCP = 17,
  PINKY_PIP = 18,
  PINKY_DIP = 19,
  PINKY_TIP = 20,
}

type LeafValues<T> = T extends object
  ? {
      [K in keyof T]: LeafValues<T[K]>;
    }[keyof T]
  : T;

export type HandShapeType = LeafValues<typeof HandShape>;

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
    Z: "z",
    CLOSE_HAND_INDEX_FINGER: "closeHandIndexFinger",
    CLOSE_HAND_MIDDLE_AND_INDEX_FINGER: "closeHandMiddleAndIndexFinger",
    OI: "oi",
    OPEN_HAND_CLAW: "openHandClaws",
    OPEN_HAND_FINGERS_APART: "openHandFingersApart",
    OPEN_HAND_MIDDLE_FINGER_BENDED_FINGERS_APART:
      "openHandMiddleFingerBendedFingersApart",
    OPEN_HAND_THUMB_APART: "openHandThumbApart",
    OPEN_HAND: "openHand",
    THUMB_FINGER: "thumbFinger",
    THUMB_TOUCH_INDEX_FINGERS_CLOSED: "thumbTouchIndexFingersClosed",
    THUMB_TOUCH_INDEX_FINGERS_OPEN: "thumbTouchIndexFingersOpen",
  },
};

export enum PalmOrientation {
  BACK = "BACK",
  BACK_LEFT = "BACK_LEFT",
  BACK_RIGHT = "BACK_RIGHT",
  DOWN = "DOWN",
  DOWN_BACK = "DOWN_BACK",
  DOWN_FRONT = "DOWN_FRONT",
  DOWN_LEFT = "DOWN_LEFT",
  DOWN_RIGHT = "DOWN_RIGHT",
  FRONT = "FRONT",
  FRONT_LEFT = "FRONT_LEFT",
  FRONT_RIGHT = "FRONT_RIGHT",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  UP = "UP",
  UP_BACK = "UP_BACK",
  UP_LEFT = "UP_LEFT",
  UP_RIGHT = "UP_RIGHT",
}

export const PalmOrientationDescriptor: {
  [key in PalmOrientation]: Vector;
} = {
  [PalmOrientation.BACK_LEFT]: { x: -1, y: 0, z: -1 },
  [PalmOrientation.BACK_RIGHT]: { x: 1, y: 0, z: -1 },
  [PalmOrientation.BACK]: { x: 0, y: 0, z: -1 },
  [PalmOrientation.DOWN_BACK]: { x: 0, y: -1, z: -1 },
  [PalmOrientation.DOWN_FRONT]: { x: 0, y: -1, z: 1 },
  [PalmOrientation.DOWN_LEFT]: { x: -1, y: -1, z: 0 },
  [PalmOrientation.DOWN_RIGHT]: { x: 1, y: -1, z: 0 },
  [PalmOrientation.DOWN]: { x: 0, y: -1, z: 0 },
  [PalmOrientation.FRONT_LEFT]: { x: -1, y: 0, z: 1 },
  [PalmOrientation.FRONT_RIGHT]: { x: 1, y: 0, z: 1 },
  [PalmOrientation.FRONT]: { x: 0, y: 0, z: 1 },
  [PalmOrientation.LEFT]: { x: -1, y: 0, z: 0 },
  [PalmOrientation.RIGHT]: { x: 1, y: 0, z: 0 },
  [PalmOrientation.UP_BACK]: { x: 0, y: 1, z: -1 },
  [PalmOrientation.UP_LEFT]: { x: -1, y: 1, z: 0 },
  [PalmOrientation.UP_RIGHT]: { x: 1, y: 1, z: 0 },
  [PalmOrientation.UP]: { x: 0, y: 1, z: 0 },
};

export const PalmOrientationDescription: { [K in PalmOrientation]: string } = {
  [PalmOrientation.BACK_LEFT]: "para si e esquerda",
  [PalmOrientation.BACK_RIGHT]: "para si e direita",
  [PalmOrientation.BACK]: "para si",
  [PalmOrientation.DOWN_BACK]: "baixo e para si",
  [PalmOrientation.DOWN_FRONT]: "baixo e para frente",
  [PalmOrientation.DOWN_LEFT]: "baixo e esquerda",
  [PalmOrientation.DOWN_RIGHT]: "baixo e direita",
  [PalmOrientation.DOWN]: "baixo",
  [PalmOrientation.FRONT_LEFT]: "frente e esquerda",
  [PalmOrientation.FRONT_RIGHT]: "frente e direita",
  [PalmOrientation.FRONT]: "frente",
  [PalmOrientation.LEFT]: "esquerda",
  [PalmOrientation.RIGHT]: "direita",
  [PalmOrientation.UP_BACK]: "cima e para si",
  [PalmOrientation.UP_LEFT]: "cima e esquerda",
  [PalmOrientation.UP_RIGHT]: "cima e direita",
  [PalmOrientation.UP]: "cima",
};

export enum HandOrientation {
  BACK = "BACK",
  BACK_LEFT = "BACK_LEFT",
  BACK_RIGHT = "BACK_RIGHT",
  DOWN = "DOWN",
  DOWN_BACK = "DOWN_BACK",
  DOWN_FRONT = "DOWN_FRONT",
  DOWN_LEFT = "DOWN_LEFT",
  DOWN_RIGHT = "DOWN_RIGHT",
  FRONT = "FRONT",
  FRONT_LEFT = "FRONT_LEFT",
  FRONT_RIGHT = "FRONT_RIGHT",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  UP = "UP",
  UP_BACK = "UP_BACK",
  UP_LEFT = "UP_LEFT",
  UP_RIGHT = "UP_RIGHT",
}

export const HandOrientationDescriptor: {
  [key in HandOrientation]: Vector;
} = {
  [HandOrientation.BACK_LEFT]: { x: -1, y: 0, z: -1 },
  [HandOrientation.BACK_RIGHT]: { x: 1, y: 0, z: -1 },
  [HandOrientation.BACK]: { x: 0, y: 0, z: -1 },
  [HandOrientation.DOWN_BACK]: { x: 0, y: -1, z: -1 },
  [HandOrientation.DOWN_FRONT]: { x: 0, y: -1, z: 1 },
  [HandOrientation.DOWN_LEFT]: { x: -1, y: -1, z: 0 },
  [HandOrientation.DOWN_RIGHT]: { x: 1, y: -1, z: 0 },
  [HandOrientation.DOWN]: { x: 0, y: -1, z: 0 },
  [HandOrientation.FRONT_LEFT]: { x: -1, y: 0, z: 1 },
  [HandOrientation.FRONT_RIGHT]: { x: 1, y: 0, z: 1 },
  [HandOrientation.FRONT]: { x: 0, y: 0, z: 1 },
  [HandOrientation.LEFT]: { x: -1, y: 0, z: 0 },
  [HandOrientation.RIGHT]: { x: 1, y: 0, z: 0 },
  [HandOrientation.UP_BACK]: { x: 0, y: 1, z: -1 },
  [HandOrientation.UP_LEFT]: { x: -1, y: 1, z: 0 },
  [HandOrientation.UP_RIGHT]: { x: 1, y: 1, z: 0 },
  [HandOrientation.UP]: { x: 0, y: 1, z: 0 },
};
