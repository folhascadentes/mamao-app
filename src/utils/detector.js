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
    };
  }
}

const handConfigurationState = {
  onRun: (sign, subject) => {
    const startPosition = sign.signSteps.startPosition;
    return checkHandConfiguration(
      startPosition.dominantHand.handConfiguration,
      startPosition.nonDominantHand.handConfiguration,
      subject.hand.dominantHand.configuration
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
  onRun: (sign, subject) => {
    return checkHandPosition(
      sign.signSteps.startPosition.dominantHand.bodyRegion,
      sign.signSteps.startPosition.nonDominantHand.bodyRegion,
      subject.dominantHandLandmarks,
      subject.nonDominantHandLandmarks,
      subject.poseLandmarks ?? []
    );
  },
  nextState: DetectorStates.MOVEMENT,
};

function checkHandDistanceToPosition(handLandmarks, position) {
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
        memory.startFrame = subject.frame - 3;
      }
    }

    if (
      correctNonDominantHandMovement &&
      memory.movements.nonDominantHand.length > 0
    ) {
      memory.movements.nonDominantHand.shift();

      if (!memory.startFrame) {
        memory.startFrame = subject.frame - 3;
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
    memory.endMovementFrame = subject.frame;
  },
  onRun: (sign, subject, memory) => {
    return checkHandPosition(
      sign.signSteps.endPosition.dominantHand.bodyRegion,
      sign.signSteps.endPosition.nonDominantHand.bodyRegion,
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
      subject.hand.dominantHand.configuration
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
  detectedHandConfiguration
) {
  const dominantHandOkay =
    !dominantHandConfiguration ||
    detectedHandConfiguration === dominantHandConfiguration;
  const nonDominantHandOkay =
    !nonDominantHandConfiguration ||
    detectedHandConfiguration === nonDominantHandConfiguration;

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
  return angle < 45;
}

function checkHandPosition(
  dominantHandBodyRegion,
  nonDominantHandBodyRegion,
  dominantHandLandmarks,
  nonDominantHandLandmarks,
  poseLandmarks
) {
  if (
    poseLandmarks.length &&
    (dominantHandLandmarks.length || nonDominantHandLandmarks.length)
  ) {
    const dominantHandCoordinate = getBodyRegionCoordinates(
      dominantHandBodyRegion,
      poseLandmarks
    );

    const nonDominantHandCoordinate = getBodyRegionCoordinates(
      nonDominantHandBodyRegion,
      poseLandmarks
    );

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
