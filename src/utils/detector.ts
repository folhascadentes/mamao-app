import { getLocationCoordinate } from "./locations";
import { angleBetweenTwoVectors, getMiddlePoint } from "./geometrics";
import {
  HandOrientation,
  HandOrientationDescriptor,
  Location,
  Movement,
  PalmOrientation,
  PalmOrientationDescriptor,
  Sign,
  SignConfigurationLocationOptions,
} from "../signs";
import { SubjectData, SubjectReadings } from "./subject";

export const CIRCLE_RADIUS = 40;

export enum DetectorStates {
  HAND_SHAPE = "HAND_SHAPE",
  PALM_ORIENTATION = "PALM_ORIENTATION",
  INITIAL_LOCATION = "INITIAL_LOCATION",
  MOVEMENT = "MOVEMENT",
  FINAL_LOCATION = "FINAL_LOCATION",
  FINAL_PALM_ORIENTATION = "FINAL_PALM_ORIENTATION",
  FINAL_HAND_SHAPE = "FINAL_HAND_SHAPE",
}

export interface DetectorState {
  state: DetectorStates;
  description: string;
}

export const DETECTOR_STATES: DetectorState[] = [
  {
    state: DetectorStates.HAND_SHAPE,
    description: "Configure a(s) de mão(s) de forma correta",
  },
  {
    state: DetectorStates.PALM_ORIENTATION,
    description: "Ajuste a orientação da(s) mão(s)",
  },
  {
    state: DetectorStates.INITIAL_LOCATION,
    description: "Posicione a(s) de mão(s) no local correto",
  },
  {
    state: DetectorStates.MOVEMENT,
    description: "Realize o(s) movimentos corretamente",
  },
  {
    state: DetectorStates.FINAL_LOCATION,
    description: "Posicione a(s) de mão(s) de forma correta",
  },
  {
    state: DetectorStates.FINAL_PALM_ORIENTATION,
    description: "Ajuste a orientação da(s) mão(s) após o movimento",
  },
  {
    state: DetectorStates.FINAL_HAND_SHAPE,
    description:
      "Ajuste a(s) mão(s) para a configuração correta após o movimento",
  },
];

export interface DetectorMemory {
  dominantCoordinate: Coordinate;
  nonDominantCoordinate: Coordinate;
  dominantEndCoordinate: Coordinate;
  nonDominantEndCoordinate: Coordinate;
  dominantCoordinateOffset: Coordinate | undefined;
  nonDominantCoordinateOffset: Coordinate | undefined;
  dominantEndCoordinateOffset: Coordinate | undefined;
  nonDominantEndCoordinateOffset: Coordinate | undefined;
  dominantStartFrame: { [key: number]: number };
  dominantMovementsStartIndex: { [key: number]: number };
  dominantMovementsCurrentIndex: { [key: number]: number };
  nonDominantStartFrame: { [key: number]: number };
  nonDominantMovementsStartIndex: { [key: number]: number };
  nonDominantMovementsCurrentIndex: { [key: number]: number };
  startFrame: number | undefined;
  endMovementFrame: number | undefined;
  endSignFrame: number | undefined;
}

export interface DetectorData {
  [key: string]: any;
  memory: DetectorMemory;
  state: DetectorStates;
  valid: boolean;
}

interface State {
  onInit?: (sign: Sign, subject: SubjectData, memory: any) => void;
  onRun: (
    sign: Sign,
    subject: SubjectData,
    memory: any
  ) => { valid: boolean; [key: string]: any };
  nextState: DetectorStates;
}

export class Detector {
  private sign: Sign;
  private currentState: DetectorStates;
  private memory: any;
  private states: { [K in DetectorStates]: State };

  constructor(sign: Sign) {
    this.sign = sign;
    this.currentState = DetectorStates.HAND_SHAPE;
    this.memory = {};
    this.states = {
      [DetectorStates.HAND_SHAPE]: handConfigurationState,
      [DetectorStates.PALM_ORIENTATION]: palmOrientationState,
      [DetectorStates.INITIAL_LOCATION]: initialLocationState,
      [DetectorStates.MOVEMENT]: movementState,
      [DetectorStates.FINAL_LOCATION]: finalLocationState,
      [DetectorStates.FINAL_PALM_ORIENTATION]: finalPalmOrientationState,
      [DetectorStates.FINAL_HAND_SHAPE]: finalHandShapeState,
    };
  }

  public setSign(sign: Sign) {
    this.sign = sign;
    this.currentState = DetectorStates.HAND_SHAPE;
    this.memory = {};
  }

  public getMemory() {
    return this.memory;
  }

  public run(subject: SubjectData): DetectorData {
    const response = this.states[this.currentState].onRun(
      this.sign,
      subject,
      this.memory
    );
    const currentState = this.currentState;

    if (response?.valid) {
      this.currentState = this.states[this.currentState].nextState;

      if (this.states[this.currentState].onInit !== undefined) {
        // @ts-ignore
        this.states[this.currentState].onInit(this.sign, subject, this.memory);
      }
    }

    return {
      ...response,
      state: currentState,
      memory: this.memory,
    };
  }
}

const handConfigurationState: State = {
  onRun: (sign: Sign, subject: SubjectData) => {
    const start = sign.steps.start;
    return checkHandShape(
      start.dominant.handShape,
      start.nonDominant?.handShape,
      subject.hand.dominant.handShape,
      subject.hand.nonDominant.handShape
    );
  },
  nextState: DetectorStates.PALM_ORIENTATION,
};

const palmOrientationState = {
  onRun: (sign: Sign, subject: SubjectData) => {
    const start = sign.steps.start;
    const palmOrientation = checkPalmOrientation(
      start.dominant.palmOrientation,
      start.nonDominant?.palmOrientation,
      subject.hand.dominant.palm,
      subject.hand.nonDominant.palm
    );
    const handOrientation = checkHandOrientation(
      start.dominant.handOrientation,
      start.nonDominant?.handOrientation,
      subject.hand.dominant.ponting,
      subject.hand.nonDominant.ponting
    );

    return { valid: palmOrientation.valid && handOrientation.valid };
  },
  nextState: DetectorStates.INITIAL_LOCATION,
};

const initialLocationState = {
  onInit: (sign: Sign, subject: SubjectData, memory: DetectorMemory) => {
    // value -1 represent the coordinate equivalent of null
    memory.dominantCoordinate = { x: -1, y: -1, z: 0 };
    memory.nonDominantCoordinate = { x: -1, y: -1, z: 0 };
    memory.dominantEndCoordinate = { x: -1, y: -1, z: 0 };
    memory.nonDominantEndCoordinate = { x: -1, y: -1, z: 0 };
    memory.dominantCoordinateOffset = undefined;
    memory.nonDominantCoordinateOffset = undefined;
    memory.dominantEndCoordinateOffset = undefined;
    memory.nonDominantEndCoordinateOffset = undefined;
  },
  onRun: (sign: Sign, subject: SubjectData, memory: DetectorMemory) => {
    setHandPostionsCoordinates(sign, subject, memory);

    return checkHandPosition(
      memory.dominantCoordinate,
      memory.nonDominantCoordinate,
      subject.readings.dominantLandmarks,
      subject.readings.nonDominantLandmarks,
      subject.readings.poseLandmarks ?? []
    );
  },
  nextState: DetectorStates.MOVEMENT,
};

const movementState = {
  onInit: (sign: Sign, subject: SubjectData, memory: DetectorMemory) => {
    memory.dominantStartFrame = {};
    memory.dominantMovementsStartIndex = {};
    memory.dominantMovementsCurrentIndex = {};
    memory.nonDominantStartFrame = {};
    memory.nonDominantMovementsStartIndex = {};
    memory.nonDominantMovementsCurrentIndex = {};
    memory.startFrame = undefined;
  },
  onRun: (sign: Sign, subject: SubjectData, memory: DetectorMemory) => {
    const dominantMoves = sign.steps.movement.dominant.detect;
    const nonDominantMoves = sign.steps.movement.nonDominant?.detect;

    const dominantOkay =
      dominantMoves === undefined ||
      checkMovement(
        subject.hand.dominant.movement,
        Array.isArray(dominantMoves[0])
          ? (dominantMoves as [Movement[]])
          : [dominantMoves as Movement[]],
        memory.dominantMovementsStartIndex,
        memory.dominantMovementsCurrentIndex,
        memory.dominantStartFrame,
        !!sign.steps.movement.dominant.options?.detect.circular,
        subject.frame
      );

    const nonDominantOkay =
      nonDominantMoves === undefined ||
      checkMovement(
        subject.hand.nonDominant.movement,
        Array.isArray(nonDominantMoves[0])
          ? (nonDominantMoves as [Movement[]])
          : [nonDominantMoves as Movement[]],
        memory.nonDominantMovementsStartIndex,
        memory.nonDominantMovementsCurrentIndex,
        memory.nonDominantStartFrame,
        !!sign.steps.movement.nonDominant?.options?.detect.circular,
        subject.frame
      );

    const valid = dominantOkay && nonDominantOkay;

    if (valid) {
      memory.startFrame = Math.min(...Object.values(memory.dominantStartFrame));
    }

    return {
      valid,
    };
  },
  nextState: DetectorStates.FINAL_LOCATION,
};

const finalLocationState = {
  onInit: (sign: Sign, subject: SubjectData, memory: DetectorMemory) => {
    memory.endMovementFrame = subject.frame;
  },
  onRun: (sign: Sign, subject: SubjectData, memory: DetectorMemory) => {
    return checkHandPosition(
      memory.dominantEndCoordinate,
      memory.nonDominantEndCoordinate,
      subject.readings.dominantLandmarks,
      subject.readings.nonDominantLandmarks,
      subject.readings.poseLandmarks ?? []
    );
  },
  nextState: DetectorStates.FINAL_PALM_ORIENTATION,
};

const finalPalmOrientationState = {
  onRun: (sign: Sign, subject: SubjectData) => {
    const end = sign.steps.end;
    const palmOrientation = checkPalmOrientation(
      end.dominant.palmOrientation,
      end.nonDominant?.palmOrientation,
      subject.hand.dominant.palm,
      subject.hand.nonDominant.palm
    );
    const handOrientation = checkHandOrientation(
      end.dominant.handOrientation,
      end.nonDominant?.handOrientation,
      subject.hand.dominant.ponting,
      subject.hand.nonDominant.ponting
    );
    return { valid: palmOrientation.valid && handOrientation.valid };
  },
  nextState: DetectorStates.FINAL_HAND_SHAPE,
};

const finalHandShapeState = {
  onRun: (sign: Sign, subject: SubjectData, memory: DetectorMemory) => {
    const end = sign.steps.end;
    const response = checkHandShape(
      end.dominant.handShape,
      end.nonDominant?.handShape,
      subject.hand.dominant.handShape,
      subject.hand.nonDominant.handShape
    );

    if (response.valid) {
      memory.endSignFrame = subject.frame;
    }

    return response;
  },
  nextState: DetectorStates.HAND_SHAPE,
};

// -- Hand Shape --
function checkHandShape(
  dominantShape: string | undefined,
  nonDominantShape: string | undefined,
  detectedDominantShape: string | undefined,
  detectedNonDominantShape: string | undefined
): { valid: boolean } {
  const dominantOkay =
    !dominantShape || detectedDominantShape === dominantShape;
  const nonDominantOkay =
    !nonDominantShape || detectedNonDominantShape === nonDominantShape;

  if (dominantOkay && nonDominantOkay) {
    return { valid: true };
  } else {
    return { valid: false };
  }
}

// -- Hand Orientation --
function checkPalmOrientation(
  dominantPalmOrientation: PalmOrientation | undefined,
  nonDominantPalmOrientation: PalmOrientation | undefined,
  subjectDominantPalmOrientation: Vector | undefined,
  subjectNonDominantPalmOrientation: Vector | undefined
): { valid: boolean } {
  const dominantOkay =
    !dominantPalmOrientation ||
    checkOrientationUtil(
      PalmOrientationDescriptor[dominantPalmOrientation],
      subjectDominantPalmOrientation
    );

  const nonDominantOkay =
    !nonDominantPalmOrientation ||
    checkOrientationUtil(
      PalmOrientationDescriptor[nonDominantPalmOrientation],
      subjectNonDominantPalmOrientation
    );

  if (dominantOkay && nonDominantOkay) {
    return { valid: true };
  } else {
    return { valid: false };
  }
}

function checkHandOrientation(
  dominantHandOrientation: HandOrientation | undefined,
  nonDominantHandOrientation: HandOrientation | undefined,
  subjectDominantHandOrientation: Vector | undefined,
  subjectNonDominantHandOrientation: Vector | undefined
): { valid: boolean } {
  const dominantOkay =
    !dominantHandOrientation ||
    checkOrientationUtil(
      HandOrientationDescriptor[dominantHandOrientation],
      subjectDominantHandOrientation
    );

  const nonDominantOkay =
    !nonDominantHandOrientation ||
    checkOrientationUtil(
      PalmOrientationDescriptor[nonDominantHandOrientation],
      subjectNonDominantHandOrientation
    );

  if (dominantOkay && nonDominantOkay) {
    return { valid: true };
  } else {
    return { valid: false };
  }
}

function checkOrientationUtil(
  orientation: Vector,
  subjectOrientation?: Vector
): boolean {
  if (!subjectOrientation) {
    return false;
  }
  const angle = angleBetweenTwoVectors(orientation, subjectOrientation);
  return angle < 60;
}

// -- Hand Location --
function setHandPostionsCoordinates(
  sign: Sign,
  subject: SubjectData,
  memory: DetectorMemory
): void {
  if (!subject.readings.poseLandmarks.length) {
    return;
  }

  if (
    memory.dominantCoordinate.x === -1 ||
    sign.steps.start.dominant.options?.location.track
  ) {
    const { coordinate, offset } = findLocationCoordinate(
      sign.steps.start.dominant.location,
      subject.readings,
      sign.steps.start.dominant.options?.location,
      memory.dominantCoordinateOffset
    );
    memory.dominantCoordinate = coordinate;
    memory.dominantCoordinateOffset = offset;
  }

  if (
    sign.steps.start.nonDominant?.location &&
    (memory.nonDominantCoordinate.x === -1 ||
      sign.steps.start.nonDominant.options?.location.track)
  ) {
    const { coordinate, offset } = findLocationCoordinate(
      sign.steps.start.nonDominant.location,
      subject.readings,
      sign.steps.start.nonDominant.options?.location,
      memory.nonDominantCoordinateOffset
    );

    memory.nonDominantCoordinate = coordinate;
    memory.nonDominantCoordinateOffset = offset;

    if (sign.steps.start.nonDominant.options?.location.side) {
      memory.nonDominantCoordinate.y = memory.dominantCoordinate.y;
    }
  }

  if (
    memory.dominantEndCoordinate.x === -1 ||
    sign.steps.end.dominant.options?.location.track
  ) {
    if (sign.steps.end.dominant.options?.location.same) {
      memory.dominantEndCoordinate = memory.dominantCoordinate;
    } else {
      const { coordinate, offset } = findLocationCoordinate(
        sign.steps.end.dominant.location,
        subject.readings,
        sign.steps.end.dominant.options?.location,
        memory.dominantEndCoordinateOffset
      );

      memory.dominantEndCoordinate = coordinate;
      memory.dominantEndCoordinateOffset = offset;
    }
  }

  if (
    sign.steps.end.nonDominant?.location &&
    (memory.nonDominantEndCoordinate.x === -1 ||
      sign.steps.end.nonDominant.options?.location.track)
  ) {
    if (sign.steps.end.nonDominant.options?.location.same) {
      memory.nonDominantEndCoordinate = memory.dominantEndCoordinate;
    } else {
      const { coordinate, offset } = findLocationCoordinate(
        sign.steps.end.nonDominant.location,
        subject.readings,
        sign.steps.end.nonDominant.options?.location,
        memory.nonDominantEndCoordinateOffset
      );

      memory.nonDominantEndCoordinate = coordinate;
      memory.nonDominantEndCoordinateOffset = offset;

      if (sign.steps.end.nonDominant.options?.location.side) {
        memory.nonDominantEndCoordinate.y = memory.dominantEndCoordinate.y;
      }
    }
  }
}

function findLocationCoordinate(
  location: Location | Location[],
  readings: SubjectReadings,
  options: SignConfigurationLocationOptions | undefined,
  offset: Coordinate | undefined // util memory for keep track of the offset
): { coordinate: Coordinate; offset: Coordinate } {
  const coordinate = getLocationCoordinate(parseLocation(location), readings);

  if (offset === undefined) {
    const randomOffset = randomizeCoordinate(options);
    return {
      coordinate: {
        x: coordinate.x - randomOffset.x,
        y: coordinate.y - randomOffset.y,
        z: 0,
      },
      offset: randomOffset,
    };
  } else {
    return {
      coordinate: {
        x: coordinate.x - offset.x,
        y: coordinate.y - offset.y,
        z: 0,
      },
      offset,
    };
  }
}

function parseLocation(location: Location | Location[]): Location {
  if (Array.isArray(location)) {
    return chooseArrayElement(location);
  } else {
    return location;
  }
}

function chooseArrayElement(array: any[]): any {
  if (array.length === 0) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

function randomizeCoordinate(
  options?: SignConfigurationLocationOptions
): Coordinate {
  if (options?.radiusOffset !== undefined) {
    return randomizeRadiusOffset(options.radiusOffset);
  } else if (options?.horizontalOffset !== undefined) {
    return randomizeHorizontalOffset(options.horizontalOffset);
  } else if (options?.verticalOffset !== undefined) {
    return randomizeVerticalOffset(options.verticalOffset);
  } else {
    return { x: 0, y: 0, z: 0 };
  }
}

function randomizeRadiusOffset(
  radius:
    | number
    | {
        value: number;
        leftLimitValue?: number;
        rightLimitValue?: number;
        upLimitValue?: number;
        downLimitValue?: number;
      }
): Coordinate {
  const radiusValue = typeof radius === "number" ? radius : radius.value;
  const angle = Math.random() * 2 * Math.PI;
  const r = Math.random() * radiusValue;

  if (typeof radius === "number") {
    const x = r * Math.cos(angle);
    const y = r * Math.sin(angle);
    return { x, y, z: 0 };
  } else {
    const x = r * Math.cos(angle);
    const y = r * Math.sin(angle);

    const cropedX = Math.min(
      radius.rightLimitValue ?? Number.MAX_SAFE_INTEGER,
      Math.max(x, radius.leftLimitValue ?? Number.MIN_SAFE_INTEGER)
    );

    const cropedY = Math.min(
      radius.upLimitValue ?? Number.MAX_SAFE_INTEGER,
      Math.max(y, radius.downLimitValue ?? Number.MIN_SAFE_INTEGER)
    );

    return { x: cropedX, y: cropedY, z: 0 };
  }
}

function randomizeHorizontalOffset(offset: number) {
  const x = Math.random() * offset - offset / 2;
  return { x, y: 0, z: 0 };
}

function randomizeVerticalOffset(offset: number) {
  const y = Math.random() * offset - offset / 2;
  return { x: 0, y, z: 0 };
}

function handCloseToLocation(
  landmarks: Coordinate[],
  position: Coordinate
): boolean {
  if (!position || !landmarks.length) {
    return false;
  }

  const middle = getMiddlePoint(landmarks);

  const distance = Math.sqrt(
    Math.pow(middle.x - position.x, 2) + Math.pow(middle.y - position.y, 2)
  );

  return distance < CIRCLE_RADIUS * 1.8;
}

function checkHandPosition(
  dominantCoordinate: Coordinate,
  nonDominantCoordinate: Coordinate,
  dominantLandmarks: Coordinate[],
  nonDominantLandmarks: Coordinate[],
  poseLandmarks: Coordinate[]
): {
  valid: boolean;
  dominantCoordinate?: Coordinate;
  nonDominantCoordinate?: Coordinate;
} {
  if (
    poseLandmarks.length &&
    (dominantLandmarks.length || nonDominantLandmarks.length)
  ) {
    const dominantOkay = handCloseToLocation(
      dominantLandmarks,
      dominantCoordinate
    );

    const nonDominantOkay =
      nonDominantCoordinate.x === -1 ||
      handCloseToLocation(nonDominantLandmarks, nonDominantCoordinate);

    if (dominantOkay && nonDominantOkay) {
      return { valid: true };
    } else {
      return {
        valid: false,
        dominantCoordinate,
        nonDominantCoordinate,
      };
    }
  } else {
    return {
      valid: false,
    };
  }
}

// -- Movements --

/**
 
Dado um vetor de possíveis movimentos desejado como 
[
  [
    { y: 1, x: 1 },
    { y: -1, x: 1 },
    { y: -1, x: -1 },
    { y: 1, x: -1 },
  ],
  [
    { y: 1, x: -1 },
    { y: -1, x: -1 },
    { y: -1, x: 1 },
    { y: 1, x: 1 },
  ]
] 
que representa um movimento horário ou não horário, 
verifica se uma das sequencias de movimento é completada.
Caso seja, retorna true, caso contrário, retorna false.
 */
function checkMovement(
  subjectMovement: Movement,
  movements: [Movement[]],
  startIndex: { [key: number]: number },
  currentIndex: { [key: number]: number },
  startFrame: { [key: number]: number },
  circularPolicy: boolean,
  frame: number
) {
  for (const [index, movement] of movements.entries()) {
    if (startIndex[index] === null || startIndex[index] === undefined) {
      const moveIndex = movement.findIndex((expectedMovement: Movement) =>
        checkSameMovement(subjectMovement, expectedMovement)
      );

      // Caso circularPolicy = true, então apenas considera o primeiro movimento
      // de cada sequência de movimentos
      if (
        (circularPolicy && moveIndex === 0) ||
        (!circularPolicy && moveIndex >= 0)
      ) {
        startIndex[index] = moveIndex;
        startFrame[index] = frame;
        currentIndex[index] = (moveIndex + 1) % movement.length;
      }
    } else if (startIndex[index] !== null && startIndex[index] !== undefined) {
      const movementIndex = currentIndex[index];
      const currentMovement = movement[movementIndex];
      const isCorrectMovement = checkSameMovement(
        subjectMovement,
        currentMovement
      );

      if (isCorrectMovement) {
        currentIndex[index] = (movementIndex + 1) % movement.length;
      }
    }

    if (
      startIndex[index] !== undefined &&
      currentIndex[index] === startIndex[index]
    ) {
      return true;
    }
  }

  return false;
}

function checkSameMovement(
  subjectMovement: Movement,
  expectedMovement: Movement
): boolean {
  return Object.keys(expectedMovement ?? []).every((key) => {
    if (
      subjectMovement.hasOwnProperty(key) &&
      expectedMovement.hasOwnProperty(key)
    ) {
      // @ts-ignore
      return subjectMovement[key] === expectedMovement[key];
    }
    return false;
  });
}
