import { getLocationCoordinate } from "./locations";
import { angleBetweenTwoVectors, getMiddlePoint } from "./geometrics";
import {
  HandLocation,
  HandOrientation,
  HandOrientationDescriptor,
  HandShapeOptions,
  Location,
  Movement,
  PalmOrientation,
  PalmOrientationDescriptor,
  PalmOrientationOptions,
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
  dominantCoordinate?: Coordinate;
  nonDominantCoordinate?: Coordinate;
  dominantEndCoordinate?: Coordinate;
  nonDominantEndCoordinate?: Coordinate;
  dominantCoordinateOffset?: Coordinate;
  nonDominantCoordinateOffset?: Coordinate;
  dominantEndCoordinateOffset?: Coordinate;
  nonDominantEndCoordinateOffset?: Coordinate;
  dominantStartFrame?: { [key: number]: number };
  dominantMovementsStartIndex?: { [key: number]: number };
  dominantMovementsCurrentIndex?: { [key: number]: number };
  nonDominantStartFrame?: { [key: number]: number };
  nonDominantMovementsStartIndex?: { [key: number]: number };
  nonDominantMovementsCurrentIndex?: { [key: number]: number };
  startFrame?: number;
  endMovementFrame?: number;
  endSignFrame?: number;
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
    memory: DetectorMemory
  ) => { valid: boolean; invalid?: boolean; [key: string]: any };
  nextState: DetectorStates;
}

export class Detector {
  private sign: Sign;
  private currentState: DetectorStates;
  private memory: DetectorMemory;
  private states: { [K in DetectorStates]: State };
  private dominantHand: "RIGHT" | "LEFT" = "RIGHT";

  constructor(sign: Sign, dominantHand: "RIGHT" | "LEFT" = "RIGHT") {
    this.sign = JSON.parse(JSON.stringify(sign));
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
    this.dominantHand = dominantHand;

    if (this.dominantHand === "LEFT") {
      this.swapDirections(this.sign);
    }
  }

  public setSign(sign: Sign): void {
    this.sign = JSON.parse(JSON.stringify(sign));
    this.currentState = DetectorStates.HAND_SHAPE;
    this.memory = {};

    if (this.dominantHand === "LEFT") {
      this.swapDirections(this.sign);
    }
  }

  private swapDirections(json: any) {
    for (let key in json) {
      if (typeof json[key] === "object" && json[key] !== null) {
        this.swapDirections(json[key]);
      } else {
        if (key === "x" && typeof json[key] === "number") {
          json[key] = -json[key];
        } else if (typeof json[key] === "string") {
          json[key] = json[key].replace("LEFT", "TEMP");
          json[key] = json[key].replace("RIGHT", "LEFT");
          json[key] = json[key].replace("TEMP", "RIGHT");
        }
      }
    }
  }

  public getSign(): Sign {
    return this.sign;
  }

  public setState(state: DetectorStates): void {
    this.currentState = state;
    if (this.states[this.currentState].onInit !== undefined) {
      // @ts-ignore
      this.states[this.currentState].onInit(this.sign, subject, this.memory);
    }
  }

  public isValid() {
    // Check if end of movement until final location and final hand shape and orientation
    // is less than 7 frames
    return (
      this.memory.endSignFrame &&
      this.memory.endMovementFrame &&
      this.memory.endSignFrame - this.memory.endMovementFrame < 7
    );
  }

  public getMovementIndex(): { start: number; end: number } {
    return {
      start: this.memory.startFrame ?? 0,
      end: this.memory.endMovementFrame ?? 0,
    };
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
      subject.hand.nonDominant.handShape,
      start.dominant.options?.handShape,
      start.nonDominant?.options?.handShape
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
      subject.hand.nonDominant.palm,
      start.dominant.options?.palmOrientation,
      start.nonDominant?.options?.palmOrientation
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
      memory.dominantCoordinate as Coordinate,
      memory.nonDominantCoordinate as Coordinate,
      subject.readings.dominantLandmarks,
      subject.readings.nonDominantLandmarks,
      sign.steps.start.dominant.options?.location,
      sign.steps.start.nonDominant?.options?.location
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
    setHandPostionsCoordinates(sign, subject, memory);

    const dominantMoves = sign.steps.movement.dominant.detect;
    const nonDominantMoves = sign.steps.movement.nonDominant?.detect;
    const dominantForbiddenMoves = sign.steps.movement.dominant.forbidden;
    const nonDominantForbiddenMoves =
      sign.steps.movement.nonDominant?.forbidden;

    const dominantOkay =
      dominantMoves === undefined ||
      checkMovement(
        subject.hand.dominant.movement,
        Array.isArray(dominantMoves[0])
          ? (dominantMoves as [Movement[]])
          : [dominantMoves as Movement[]],
        memory.dominantMovementsStartIndex as { [key: number]: number },
        memory.dominantMovementsCurrentIndex as { [key: number]: number },
        memory.dominantStartFrame as { [key: number]: number },
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
        memory.nonDominantMovementsStartIndex as { [key: number]: number },
        memory.nonDominantMovementsCurrentIndex as { [key: number]: number },
        memory.nonDominantStartFrame as { [key: number]: number },
        !!sign.steps.movement.nonDominant?.options?.detect.circular,
        subject.frame
      );

    const dominantOutsideLocation =
      !memory.dominantCoordinate ||
      !handCloseToLocation(
        subject.readings.dominantLandmarks,
        memory.dominantCoordinate,
        sign.steps.start.dominant.options?.location?.handLocation,
        sign.steps.start.dominant.options?.location?.detectionRadius
      );

    const dominantInvalid =
      dominantOutsideLocation &&
      dominantForbiddenMoves &&
      checkForbiddenMovement(
        subject.hand.dominant.movement,
        dominantForbiddenMoves
      );

    const nonDominantOutsideLocation =
      !memory.nonDominantCoordinate ||
      !handCloseToLocation(
        subject.readings.nonDominantLandmarks,
        memory.nonDominantCoordinate,
        sign.steps.start.nonDominant?.options?.location?.handLocation,
        sign.steps.start.nonDominant?.options?.location?.detectionRadius
      );

    const nonDominantInvalid =
      nonDominantOutsideLocation &&
      nonDominantForbiddenMoves &&
      checkForbiddenMovement(
        subject.hand.nonDominant.movement,
        nonDominantForbiddenMoves
      );

    const valid = dominantOkay && nonDominantOkay;
    const invalid = dominantInvalid || nonDominantInvalid;

    if (valid && memory.dominantStartFrame) {
      memory.startFrame =
        Math.min(...Object.values(memory.dominantStartFrame)) - 2;
    }

    return {
      valid,
      invalid,
    };
  },
  nextState: DetectorStates.FINAL_LOCATION,
};

const finalLocationState = {
  onRun: (sign: Sign, subject: SubjectData, memory: DetectorMemory) => {
    setHandPostionsCoordinates(sign, subject, memory);

    const response = checkHandPosition(
      memory.dominantEndCoordinate as Coordinate,
      memory.nonDominantEndCoordinate as Coordinate,
      subject.readings.dominantLandmarks,
      subject.readings.nonDominantLandmarks,
      sign.steps.end.dominant.options?.location,
      sign.steps.end.nonDominant?.options?.location
    );

    if (response.valid) {
      memory.endMovementFrame = subject.frame;
    }

    return response;
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
      subject.hand.nonDominant.handShape,
      end.dominant.options?.handShape,
      end.nonDominant?.options?.handShape
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
  detectedNonDominantShape: string | undefined,
  dominantHandShapeOptions?: HandShapeOptions,
  nonDominantHandShapeOptions?: HandShapeOptions
): { valid: boolean } {
  const dominantOkay =
    !dominantShape ||
    detectedDominantShape === dominantShape ||
    dominantHandShapeOptions?.extraDetect?.includes(
      detectedDominantShape ?? ""
    );
  const nonDominantOkay =
    !nonDominantShape ||
    detectedNonDominantShape === nonDominantShape ||
    nonDominantHandShapeOptions?.extraDetect?.includes(
      detectedNonDominantShape ?? ""
    );

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
  subjectNonDominantPalmOrientation: Vector | undefined,
  dominantOptions?: PalmOrientationOptions,
  nonDominantOptions?: PalmOrientationOptions
): { valid: boolean } {
  const dominantOkay =
    !dominantPalmOrientation ||
    checkOrientationUtil(
      PalmOrientationDescriptor[dominantPalmOrientation],
      subjectDominantPalmOrientation,
      dominantOptions?.detectionAngle
    );

  const nonDominantOkay =
    !nonDominantPalmOrientation ||
    checkOrientationUtil(
      PalmOrientationDescriptor[nonDominantPalmOrientation],
      subjectNonDominantPalmOrientation,
      nonDominantOptions?.detectionAngle
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
  subjectOrientation?: Vector,
  detectionAngle: number = 65
): boolean {
  if (!subjectOrientation) {
    return false;
  }
  const angle = angleBetweenTwoVectors(orientation, subjectOrientation);
  return angle < detectionAngle;
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
    memory.dominantCoordinate?.x === -1 ||
    sign.steps.start.dominant.options?.location?.track
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
    (memory.nonDominantCoordinate?.x === -1 ||
      sign.steps.start.nonDominant.options?.location?.track)
  ) {
    const { coordinate, offset } = findLocationCoordinate(
      sign.steps.start.nonDominant.location,
      subject.readings,
      sign.steps.start.nonDominant.options?.location,
      memory.nonDominantCoordinateOffset
    );

    memory.nonDominantCoordinate = coordinate;
    memory.nonDominantCoordinateOffset = offset;

    if (
      sign.steps.start.nonDominant.options?.location?.side &&
      memory.dominantCoordinate
    ) {
      memory.nonDominantCoordinate.y = memory.dominantCoordinate.y;
    }
  }

  if (
    memory.dominantEndCoordinate?.x === -1 ||
    sign.steps.end.dominant.options?.location?.track
  ) {
    if (sign.steps.end.dominant.options?.location?.same) {
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

      if (
        sign.steps.end.dominant.options?.location?.sameX &&
        memory.dominantCoordinate
      ) {
        memory.dominantEndCoordinate.x = memory.dominantCoordinate.x;
      }

      if (
        sign.steps.end.dominant.options?.location?.sameY &&
        memory.dominantCoordinate
      ) {
        memory.dominantEndCoordinate.y = memory.dominantCoordinate.y;
      }
    }
  }

  if (
    sign.steps.end.nonDominant?.location &&
    (memory.nonDominantEndCoordinate?.x === -1 ||
      sign.steps.end.nonDominant.options?.location?.track)
  ) {
    if (sign.steps.end.nonDominant.options?.location?.same) {
      memory.nonDominantEndCoordinate = memory.nonDominantCoordinate;
    } else {
      const { coordinate, offset } = findLocationCoordinate(
        sign.steps.end.nonDominant.location,
        subject.readings,
        sign.steps.end.nonDominant.options?.location,
        memory.nonDominantEndCoordinateOffset
      );

      memory.nonDominantEndCoordinate = coordinate;
      memory.nonDominantEndCoordinateOffset = offset;

      if (
        sign.steps.end.dominant.options?.location?.sameX &&
        memory.dominantCoordinate &&
        memory.dominantEndCoordinate
      ) {
        memory.dominantEndCoordinate.x = memory.dominantCoordinate.x;
      }

      if (
        sign.steps.end.dominant.options?.location?.sameY &&
        memory.dominantCoordinate &&
        memory.dominantEndCoordinate
      ) {
        memory.dominantEndCoordinate.y = memory.dominantCoordinate.y;
      } else if (
        sign.steps.end.nonDominant.options?.location?.side &&
        memory.dominantEndCoordinate
      ) {
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
  let radiusValue,
    leftLimitValue,
    rightLimitValue,
    upLimitValue,
    downLimitValue;
  if (typeof radius === "number") {
    radiusValue = radius;
    leftLimitValue = -radius;
    rightLimitValue = radius;
    downLimitValue = -radius;
    upLimitValue = radius;
  } else {
    radiusValue = radius.value;
    leftLimitValue = radius.leftLimitValue ?? -radius.value;
    rightLimitValue = radius.rightLimitValue ?? radius.value;
    downLimitValue = radius.downLimitValue ?? -radius.value;
    upLimitValue = radius.upLimitValue ?? radius.value;
  }

  let x = Math.random() * (rightLimitValue - leftLimitValue) + leftLimitValue;
  let y = Math.random() * (upLimitValue - downLimitValue) + downLimitValue;

  // Check if the coordinates exceed the radius distance from the center
  const distance = Math.sqrt(x * x + y * y);
  if (distance > radiusValue) {
    const scalingFactor = radiusValue / distance;
    x *= scalingFactor;
    y *= scalingFactor;
  }

  return { x, y, z: 0 };
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
  location: Coordinate,
  handLocation?: HandLocation,
  detectionRadius?: number
): boolean {
  if (!location || !landmarks.length) {
    return false;
  }

  let handLocationCoordinate = { x: 0, y: 0, z: 0 };

  if (handLocation === undefined) {
    handLocationCoordinate = getMiddlePoint(landmarks);
  } else {
    handLocationCoordinate = landmarks[handLocation];
  }

  const distance = Math.sqrt(
    Math.pow(handLocationCoordinate.x - location.x, 2) +
      Math.pow(handLocationCoordinate.y - location.y, 2)
  );

  return distance < (detectionRadius ?? CIRCLE_RADIUS);
}

function checkHandPosition(
  dominantCoordinate: Coordinate,
  nonDominantCoordinate: Coordinate,
  dominantLandmarks: Coordinate[],
  nonDominantLandmarks: Coordinate[],
  dominantOptions?: SignConfigurationLocationOptions,
  nonDominantOptions?: SignConfigurationLocationOptions
): {
  valid: boolean;
  dominantCoordinate?: Coordinate;
  nonDominantCoordinate?: Coordinate;
} {
  if (dominantLandmarks.length || nonDominantLandmarks.length) {
    const dominantOkay = handCloseToLocation(
      dominantLandmarks,
      dominantCoordinate,
      dominantOptions?.handLocation,
      dominantOptions?.detectionRadius
    );

    const nonDominantOkay =
      nonDominantCoordinate.x === -1 ||
      handCloseToLocation(
        nonDominantLandmarks,
        nonDominantCoordinate,
        nonDominantOptions?.handLocation,
        nonDominantOptions?.detectionRadius
      );

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

function checkForbiddenMovement(
  subjetMovement: Movement,
  forbiddenMovements: Movement[]
): boolean {
  return forbiddenMovements.some((forbiddenMovement) =>
    checkSameMovement(subjetMovement, forbiddenMovement)
  );
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
