import { getLocationCoordinate } from "./locations";
import { angleBetweenTwoVectors, getMiddlePoint } from "./geometrics";
import { Sign, Location } from "../signs";

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

export const DETECTOR_STATES = [
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
      [DetectorStates.INITIAL_LOCATION]: initialPositionState,
      [DetectorStates.MOVEMENT]: movementState,
      [DetectorStates.FINAL_LOCATION]: finalPositionState,
      [DetectorStates.FINAL_PALM_ORIENTATION]: finalPalmOrientationState,
      [DetectorStates.FINAL_HAND_SHAPE]: finalHandShapeState,
    };
  }

  setSign(sign: Sign) {
    this.sign = sign;
    this.currentState = DetectorStates.HAND_SHAPE;
    this.memory = {};
  }

  run(subject) {
    const response = this.states[this.currentState].onRun(
      this.sign,
      subject,
      this.memory
    );
    const currentState = this.currentState;

    if (response?.valid) {
      this.currentState = this.states[this.currentState].nextState;

      if (this.states[this.currentState].onInit) {
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

interface State {
  onInit?: (sign: Sign, subject: any, memory: any) => void;
  onRun: (sign: Sign, subject: any, memory: any) => any;
  nextState: DetectorStates;
}

const handConfigurationState: State = {
  onRun: (sign: Sign, subject) => {
    const start = sign.steps.start;
    return checkHandShape(
      start.dominant.handShape,
      start.nonDominant?.handShape,
      subject.hand.dominant.configuration,
      subject.hand.nonDominant.configuration
    );
  },
  nextState: DetectorStates.PALM_ORIENTATION,
};

const palmOrientationState = {
  onRun: (sign: Sign, subject) => {
    const start = sign.steps.start;
    return checkPalmOrientation(
      start.dominant.palmOrientation,
      start.nonDominant?.palmOrientation,
      subject.hand.dominant.palm,
      subject.hand.nonDominant.palm
    );
  },
  nextState: DetectorStates.INITIAL_LOCATION,
};

const initialPositionState = {
  onInit: (sign: Sign, subject, memory) => {
    setHandPostionsCoordinates(sign, subject, memory);
  },
  onRun: (sign: Sign, subject, memory) => {
    if (!memory.dominantCoordinate) {
      setHandPostionsCoordinates(sign, subject, memory);
    }

    return (
      memory.dominantCoordinate &&
      checkHandPosition(
        memory.dominantCoordinate,
        memory.nonDominantCoordinate,
        subject.dominantLandmarks,
        subject.nonDominantLandmarks,
        subject.poseLandmarks ?? []
      )
    );
  },
  nextState: DetectorStates.MOVEMENT,
};

function setHandPostionsCoordinates(sign: Sign, subject, memory): void {
  if (!subject.poseLandmarks.length) {
    return;
  }

  const startDominantBodyRegion = parseLocation(
    sign.steps.start.dominant.location
  );
  const startDominantBodyOffset =
    sign.steps.start.dominant.options?.location.radiusOffset;
  const startNonDominantBodyRegion = parseLocation(
    sign.steps.start.nonDominant?.location
  );
  const startNonDominantBodyOffset =
    sign.steps.start.nonDominant?.options?.location.radiusOffset;
  const endDominantBodyRegion = parseLocation(sign.steps.end.dominant.location);
  const endDominantBodyOffset =
    sign.steps.end.dominant.options?.location.radiusOffset;
  const endNonDominantBodyRegion = parseLocation(
    sign.steps.end.nonDominant?.location
  );
  const endNonDominantBodyOffset =
    sign.steps.end.nonDominant?.options?.location.radiusOffset;

  const dominantCoordinate = randomizeCoordinate(
    getLocationCoordinate(startDominantBodyRegion, subject.poseLandmarks),
    startDominantBodyOffset ?? 0
  );

  const nonDominantCoordinate = randomizeCoordinate(
    getLocationCoordinate(startNonDominantBodyRegion, subject.poseLandmarks),
    startNonDominantBodyOffset ?? 0
  );

  const dominantEndCoordinate =
    endDominantBodyRegion === "same"
      ? dominantCoordinate
      : randomizeCoordinate(
          getLocationCoordinate(endDominantBodyRegion, subject.poseLandmarks),
          endDominantBodyOffset ?? 0
        );

  const nonDominantEndCoordinate =
    endNonDominantBodyRegion === "same"
      ? nonDominantCoordinate
      : randomizeCoordinate(
          getLocationCoordinate(
            endNonDominantBodyRegion,
            subject.poseLandmarks
          ),
          endNonDominantBodyOffset ?? 0
        );

  memory.dominantCoordinate = dominantCoordinate;
  memory.nonDominantCoordinate = nonDominantCoordinate;
  memory.dominantEndCoordinate = dominantEndCoordinate;
  memory.nonDominantEndCoordinate = nonDominantEndCoordinate;
}

function parseLocation(
  location: Location | Location[] | undefined
): Location | undefined {
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
  coordinate: Coordinate,
  radius: number
): Coordinate {
  const angle = Math.random() * 2 * Math.PI;
  const r = Math.random() * radius;
  const x = r * Math.cos(angle);
  const y = r * Math.sin(angle);
  return { x: coordinate.x + x, y: coordinate.y + y, z: 0 };
}

function handCloseToLocation(
  landmarks: Coordinate[],
  position: Coordinate
): boolean {
  if (!position) {
    return false;
  }

  const middle = getMiddlePoint(landmarks);

  const distance = Math.sqrt(
    Math.pow(middle.x - position.x, 2) + Math.pow(middle.y - position.y, 2)
  );

  return distance < CIRCLE_RADIUS * 1.8;
}

const movementState = {
  onInit: (sign: Sign, subject, memory) => {
    memory.dominantStartFrame = {};
    memory.dominantMovementsStartIndex = {};
    memory.dominantMovementsCurrentIndex = {};
    memory.nonDominantStartFrame = {};
    memory.nonDominantMovementsStartIndex = {};
    memory.nonDominantMovementsCurrentIndex = {};
    memory.startFrame = undefined;
  },
  onRun: (sign: Sign, subject, memory) => {
    const dominantMoves = sign.steps.movement.dominant;
    const nonDominantMoves = sign.steps.movement.nonDominant;

    const dominantOkay =
      !(dominantMoves ?? []).length ||
      checkMovement(
        subject.hand.dominant.movement,
        Array.isArray(dominantMoves[0]) ? dominantMoves : [dominantMoves],
        memory.dominantMovementsStartIndex,
        memory.dominantMovementsCurrentIndex,
        memory.dominantStartFrame,
        sign.steps.movement.dominant.circularPolicy,
        subject.frame
      );

    const nonDominantOkay =
      !(nonDominantMoves ?? []).length ||
      checkMovement(
        subject.hand.nonDominant.movement,
        Array.isArray(nonDominantMoves[0])
          ? nonDominantMoves
          : [nonDominantMoves],
        memory.nonDominantMovementsStartIndex,
        memory.nonDominantMovementsCurrentIndex,
        memory.nonDominantStartFrame,
        sign.steps.movements.nonDominant.circularPolicy,
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
  subjectMovement,
  movements,
  startIndex,
  currentIndex,
  startFrame,
  circularPolicy,
  frame
) {
  for (const [index, movement] of movements.entries()) {
    if (startIndex[index] === null || startIndex[index] === undefined) {
      const moveIndex = movement.findIndex((expectedMovement) =>
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

function checkSameMovement(subjectMovement, expectedMovement): boolean {
  return Object.keys(expectedMovement ?? []).every((key) => {
    return subjectMovement[key] === expectedMovement[key];
  });
}

const finalPositionState = {
  onInit: (sign: Sign, subject, memory) => {
    memory.endMovementFrame = subject.frame;
  },
  onRun: (sign: Sign, subject, memory) => {
    return checkHandPosition(
      memory.dominantEndCoordinate,
      memory.nonDominantEndCoordinate,
      subject.dominantLandmarks,
      subject.nonDominantLandmarks,
      subject.poseLandmarks ?? []
    );
  },
  nextState: DetectorStates.FINAL_PALM_ORIENTATION,
};

const finalPalmOrientationState = {
  onRun: (sign: Sign, subject) => {
    const end = sign.steps.end;
    return checkPalmOrientation(
      end.dominant.palmOrientation,
      end.nonDominant.palmOrientation,
      subject.hand.dominant.palm,
      subject.hand.nonDominant.palm
    );
  },
  nextState: DetectorStates.FINAL_HAND_SHAPE,
};

const finalHandShapeState = {
  onRun: (sign: Sign, subject, memory) => {
    const end = sign.steps.end;
    const response = checkHandShape(
      end.dominant.handShape,
      end.nonDominant?.handShape,
      subject.hand.dominant.configuration,
      subject.hand.nonDominant.configuration
    );

    if (response.valid) {
      memory.endSignFrame = subject.frame;
    }

    return response;
  },
  nextState: DetectorStates.HAND_SHAPE,
};

function checkHandShape(
  dominantShape: string,
  nonDominantShape: string | undefined,
  detectedDominantShape: string,
  detectedNonDominantShape: string
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

function checkPalmOrientation(
  dominantPalmOrientation: Vector | undefined,
  nonDominantPalmOrientation: Vector | undefined,
  subjectDominantPalmOrientation: Vector,
  subjectNonDominantPalmOrientation: Vector
): { valid: boolean } {
  const dominantOkay =
    !dominantPalmOrientation ||
    checkPalmOrientationUtil(
      dominantPalmOrientation,
      subjectDominantPalmOrientation
    );

  const nonDominantOkay =
    !nonDominantPalmOrientation ||
    checkPalmOrientationUtil(
      nonDominantPalmOrientation,
      subjectNonDominantPalmOrientation
    );

  if (dominantOkay && nonDominantOkay) {
    return { valid: true };
  } else {
    return { valid: false };
  }
}

function checkPalmOrientationUtil(
  palmOrientation: Vector,
  subjectPalmOrientation: Vector
): boolean {
  const angle = angleBetweenTwoVectors(palmOrientation, subjectPalmOrientation);
  return angle < 60;
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
    const dominantOkay =
      !dominantLandmarks.length ||
      handCloseToLocation(dominantLandmarks, dominantCoordinate);

    const nonDominantOkay =
      !nonDominantLandmarks.length ||
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
