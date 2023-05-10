import { getBodyRegionCoordinates, getMiddlePoint } from "./positions";
import { angleBetweenTwoVectors } from "./geometrics";

const CIRCLE_RADIUS = 40;

export const DetectorStates = {
  HAND_CONFIGURATION: "HAND_CONFIGURATION",
  PALM_DIRECTION: "PALM_DIRECTION",
  INITIAL_POSITION: "INITIAL_POSITION",
  MOVEMENT: "MOVEMENT",
  FINAL_POSITION: "FINAL_POSITION",
  FINAL_PALM_DIRECTION: "FINAL_PALM_DIRECTION",
  FINAL_HAND_CONFIGURATION: "FINAL_HAND_CONFIGURATION",
};

export const DETECTOR_STATES = [
  {
    state: DetectorStates.HAND_CONFIGURATION,
    description: "Configure a(s) de mão(s) de forma correta",
  },
  {
    state: DetectorStates.PALM_DIRECTION,
    description: "Ajuste a orientação da(s) mão(s)",
  },
  {
    state: DetectorStates.INITIAL_POSITION,
    description: "Posicione a(s) de mão(s) no local correto",
  },
  {
    state: DetectorStates.MOVEMENT,
    description: "Realize o(s) movimentos corretamente",
  },
  {
    state: DetectorStates.FINAL_POSITION,
    description: "Posicione a(s) de mão(s) de forma correta",
  },
  {
    state: DetectorStates.FINAL_PALM_DIRECTION,
    description: "Ajuste a orientação da(s) mão(s) após o movimento",
  },
  {
    state: DetectorStates.FINAL_HAND_CONFIGURATION,
    description:
      "Ajuste a(s) mão(s) para a configuração correta após o movimento",
  },
];

export class Detector {
  constructor(sign) {
    this.sign = sign;
    this.currentState = DetectorStates.HAND_CONFIGURATION;
    this.memory = {};
    this.states = {
      [DetectorStates.HAND_CONFIGURATION]: handConfigurationState,
      [DetectorStates.PALM_DIRECTION]: palmDirectionState,
      [DetectorStates.INITIAL_POSITION]: initialPositionState,
      [DetectorStates.MOVEMENT]: movementState,
      [DetectorStates.FINAL_POSITION]: finalPositionState,
      [DetectorStates.FINAL_PALM_DIRECTION]: finalPalmDirectionState,
      [DetectorStates.FINAL_HAND_CONFIGURATION]: finalHandConfigurationState,
    };
  }

  setSign(sign) {
    this.sign = sign;
    this.currentState = DetectorStates.HAND_CONFIGURATION;
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
      state: currentState,
      ...response,
      memory: this.memory,
    };
  }
}

const handConfigurationState = {
  onRun: (sign, subject) => {
    const startPosition = sign.signSteps.startPosition;
    return checkHandConfiguration(
      startPosition.dominantHand.handConfiguration,
      startPosition.nonDominantHand.handConfiguration,
      subject.hand.dominantHand.configuration,
      subject.hand.nonDominantHand.configuration
    );
  },
  nextState: DetectorStates.PALM_DIRECTION,
};

const palmDirectionState = {
  onRun: (sign, subject) => {
    const startPosition = sign.signSteps.startPosition;
    return checkPalmDirection(
      startPosition.dominantHand.palmDirection,
      startPosition.nonDominantHand.palmDirection,
      subject.hand.dominantHand.palm,
      subject.hand.nonDominantHand.palm
    );
  },
  nextState: DetectorStates.INITIAL_POSITION,
};

const initialPositionState = {
  onInit: (sign, subject, memory) => {
    setHandPostionsCoordinates(sign, subject, memory);
  },
  onRun: (sign, subject, memory) => {
    if (!memory.dominantHandCoordinate) {
      setHandPostionsCoordinates(sign, subject, memory);
    }

    return (
      memory.dominantHandCoordinate &&
      checkHandPosition(
        memory.dominantHandCoordinate,
        memory.nonDominantHandCoordinate,
        subject.dominantHandLandmarks,
        subject.nonDominantHandLandmarks,
        subject.poseLandmarks ?? []
      )
    );
  },
  nextState: DetectorStates.MOVEMENT,
};

function setHandPostionsCoordinates(sign, subject, memory) {
  if (!subject.poseLandmarks.length) {
    return;
  }

  const startPositionDominantHandBodyRegion =
    sign.signSteps.startPosition.dominantHand.bodyRegion;
  const startPositionDominantHandBodyOffset =
    sign.signSteps.startPosition.dominantHand.bodyOffsetRadius;
  const startPositionNonDominantHandBodyRegion =
    sign.signSteps.startPosition.nonDominantHand.bodyRegion;
  const startPositionNonDominantHandBodyOffset =
    sign.signSteps.startPosition.nonDominantHand.bodyOffsetRadius;
  const endPositionDominantHandBodyRegion =
    sign.signSteps.endPosition.dominantHand.bodyRegion;
  const endPositionDominantHandBodyOffset =
    sign.signSteps.endPosition.dominantHand.bodyOffsetRadius;
  const endPositionNonDominantHandBodyRegion =
    sign.signSteps.endPosition.nonDominantHand.bodyRegion;
  const endPositionNonDominantHandBodyOffset =
    sign.signSteps.endPosition.nonDominantHand.bodyOffsetRadius;

  const dominantHandCoordinate = randomizeCoordinate(
    getBodyRegionCoordinates(
      startPositionDominantHandBodyRegion,
      subject.poseLandmarks
    ),
    startPositionDominantHandBodyOffset ?? 0
  );

  const nonDominantHandCoordinate = randomizeCoordinate(
    getBodyRegionCoordinates(
      startPositionNonDominantHandBodyRegion,
      subject.poseLandmarks
    ),
    startPositionNonDominantHandBodyOffset ?? 0
  );

  const dominantHandEndCoordinate =
    endPositionDominantHandBodyRegion === "same"
      ? dominantHandCoordinate
      : randomizeCoordinate(
          getBodyRegionCoordinates(
            endPositionDominantHandBodyRegion,
            subject.poseLandmarks
          ),
          endPositionDominantHandBodyOffset ?? 0
        );

  const nonDominantHandEndCoordinate =
    endPositionNonDominantHandBodyRegion === "same"
      ? nonDominantHandCoordinate
      : randomizeCoordinate(
          getBodyRegionCoordinates(
            endPositionNonDominantHandBodyRegion,
            subject.poseLandmarks
          ),
          endPositionNonDominantHandBodyOffset ?? 0
        );

  memory.dominantHandCoordinate = dominantHandCoordinate;
  memory.nonDominantHandCoordinate = nonDominantHandCoordinate;
  memory.dominantHandEndCoordinate = dominantHandEndCoordinate;
  memory.nonDominantHandEndCoordinate = nonDominantHandEndCoordinate;
}

function randomizeCoordinate(coordinate, radius) {
  if (coordinate) {
    var angle = Math.random() * 2 * Math.PI;
    var r = Math.random() * radius;
    var x = r * Math.cos(angle);
    var y = r * Math.sin(angle);
    return { x: coordinate.x + x, y: coordinate.y + y };
  }
}

function checkHandDistanceToPosition(handLandmarks, position) {
  if (!position) {
    return false;
  }

  const middle = getMiddlePoint(...handLandmarks);

  const distance = Math.sqrt(
    Math.pow(middle.x - position.x, 2) + Math.pow(middle.y - position.y, 2)
  );

  return distance < CIRCLE_RADIUS * 1.8;
}

const movementState = {
  onInit: (sign, subject, memory) => {
    memory.movements = JSON.parse(JSON.stringify(sign.signSteps.movements));
    memory.startFrame = undefined;
  },
  onRun: (sign, subject, memory) => {
    const dominantHandMoves = memory.movements.dominantHand[0];
    const nonDominantHandMoves = memory.movements.nonDominantHand[0];

    const correctDominantHandMovement = Object.keys(
      dominantHandMoves ?? []
    ).every((key) => {
      return subject.hand.dominantHand.movement[key] === dominantHandMoves[key];
    });

    const correctNonDominantHandMovement = Object.keys(
      nonDominantHandMoves ?? []
    ).every((key) => {
      return (
        subject.hand.nonDominantHand.movement[key] === nonDominantHandMoves[key]
      );
    });

    if (
      correctDominantHandMovement &&
      memory.movements.dominantHand.length > 0
    ) {
      memory.movements.dominantHand.shift();

      if (!memory.startFrame) {
        memory.startFrame = subject.frame - 6;
      }
    }

    if (
      correctNonDominantHandMovement &&
      memory.movements.nonDominantHand.length > 0
    ) {
      memory.movements.nonDominantHand.shift();

      if (!memory.startFrame) {
        memory.startFrame = subject.frame - 6;
      }
    }

    const noMoreDominantHandMoves =
      memory.movements.dominantHand === undefined ||
      memory.movements.dominantHand.length === 0;
    const noMoreNonDominantHandMoves =
      memory.movements.nonDominantHand === undefined ||
      memory.movements.nonDominantHand.length === 0;

    if (noMoreDominantHandMoves && noMoreNonDominantHandMoves) {
      return { valid: true };
    } else {
      return { valid: false };
    }
  },
  nextState: DetectorStates.FINAL_POSITION,
};

const finalPositionState = {
  onInit: (sign, subject, memory) => {
    memory.endMovementFrame = subject.frame + 6;
  },
  onRun: (sign, subject, memory) => {
    return checkHandPosition(
      memory.dominantHandEndCoordinate,
      memory.nonDominantHandEndCoordinate,
      subject.dominantHandLandmarks,
      subject.nonDominantHandLandmarks,
      subject.poseLandmarks ?? []
    );
  },
  nextState: DetectorStates.FINAL_PALM_DIRECTION,
};

const finalPalmDirectionState = {
  onRun: (sign, subject) => {
    const endPosition = sign.signSteps.endPosition;
    return checkPalmDirection(
      endPosition.dominantHand.palmDirection,
      endPosition.nonDominantHand.palmDirection,
      subject.hand.dominantHand.palm,
      subject.hand.nonDominantHand.palm
    );
  },
  nextState: DetectorStates.FINAL_HAND_CONFIGURATION,
};

const finalHandConfigurationState = {
  onRun: (sign, subject, memory) => {
    const endPosition = sign.signSteps.endPosition;
    const response = checkHandConfiguration(
      endPosition.dominantHand.handConfiguration,
      endPosition.nonDominantHand.handConfiguration,
      subject.hand.dominantHand.configuration,
      subject.hand.nonDominantHand.configuration
    );

    if (response.valid) {
      memory.endSignFrame = subject.frame;
    }

    return response;
  },
  nextState: DetectorStates.HAND_CONFIGURATION,
};

function checkHandConfiguration(
  dominantHandConfiguration,
  nonDominantHandConfiguration,
  detectedDominantHandConfiguration,
  detectedNonDominantHandConfiguration
) {
  const dominantHandOkay =
    !dominantHandConfiguration ||
    detectedDominantHandConfiguration === dominantHandConfiguration;
  const nonDominantHandOkay =
    !nonDominantHandConfiguration ||
    detectedNonDominantHandConfiguration === nonDominantHandConfiguration;

  if (dominantHandOkay && nonDominantHandOkay) {
    return { valid: true };
  } else {
    return { valid: false };
  }
}

function checkPalmDirection(
  dominantHandPalmDirection,
  nonDominantHandPalmDirection,
  subjectDominantHandPalmDirection,
  subjectNonDominantHandPalmDirection
) {
  const dominantHandOkay =
    !dominantHandPalmDirection ||
    checkPalmDirectionUtil(
      dominantHandPalmDirection,
      subjectDominantHandPalmDirection
    );

  const nonDominantHandOkay =
    !nonDominantHandPalmDirection ||
    checkPalmDirectionUtil(
      nonDominantHandPalmDirection,
      subjectNonDominantHandPalmDirection
    );

  if (dominantHandOkay && nonDominantHandOkay) {
    return { valid: true };
  } else {
    return { valid: false };
  }
}

function checkPalmDirectionUtil(palmDirection, subjectPalmDirection) {
  const angle = angleBetweenTwoVectors(palmDirection, subjectPalmDirection);
  return angle < 60;
}

function checkHandPosition(
  dominantHandCoordinate,
  nonDominantHandCoordinate,
  dominantHandLandmarks,
  nonDominantHandLandmarks,
  poseLandmarks
) {
  if (
    poseLandmarks.length &&
    (dominantHandLandmarks.length || nonDominantHandLandmarks.length)
  ) {
    const dominantHandOkay =
      !dominantHandLandmarks.length ||
      checkHandDistanceToPosition(
        dominantHandLandmarks,
        dominantHandCoordinate
      );

    const nonDominantHandOkay =
      !nonDominantHandLandmarks.length ||
      checkHandDistanceToPosition(
        nonDominantHandLandmarks,
        nonDominantHandCoordinate
      );

    if (dominantHandOkay && nonDominantHandOkay) {
      return { valid: true };
    } else {
      return {
        valid: false,
        dominantHandCoordinate,
        nonDominantHandCoordinate,
      };
    }
  } else {
    return {
      valid: false,
    };
  }
}
