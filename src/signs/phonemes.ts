import {
  Location,
  HandShape,
  Movement,
  PalmOrientationDescriptor,
} from "./types";

export const signsStates: {
  id: string;
  index: number;
  frame: number;
  states: {
    shape?: string;
    orientation?: Vector;
    pointing?: Vector;
    movement?: Movement;
    location?: Location;
  }[];
}[] = [
  {
    id: "Nome",
    index: 0,
    frame: 0,
    states: [
      {
        shape: HandShape.libras.CLOSE_HAND_MIDDLE_AND_INDEX_FINGER,
        orientation: PalmOrientationDescriptor.FRONT,
        pointing: PalmOrientationDescriptor.UP,
        location: Location.TORAX,
      },
      {
        shape: HandShape.libras.CLOSE_HAND_MIDDLE_AND_INDEX_FINGER,
        orientation: PalmOrientationDescriptor.FRONT,
        pointing: PalmOrientationDescriptor.UP,
        location: Location.TORAX_RIGHT,
      },
    ],
  },
  {
    id: "Meu-Nome",
    index: 0,
    frame: 0,
    states: [
      {
        shape: HandShape.libras.CLOSE_HAND_MIDDLE_AND_INDEX_FINGER,
        orientation: PalmOrientationDescriptor.BACK,
        pointing: PalmOrientationDescriptor.UP,
        location: Location.TORAX_LEFT,
      },
      {
        shape: HandShape.libras.CLOSE_HAND_MIDDLE_AND_INDEX_FINGER,
        orientation: PalmOrientationDescriptor.BACK,
        pointing: PalmOrientationDescriptor.UP,
        location: Location.TORAX_RIGHT,
      },
    ],
  },
  {
    id: "Você",
    index: 0,
    frame: 0,
    states: [
      {
        shape: HandShape.libras.CLOSE_HAND_INDEX_FINGER,
        orientation: PalmOrientationDescriptor.LEFT,
        pointing: PalmOrientationDescriptor.FRONT,
      },
    ],
  },
  {
    id: "Eu",
    index: 0,
    frame: 0,
    states: [
      {
        shape: HandShape.libras.CLOSE_HAND_INDEX_FINGER,
        pointing: PalmOrientationDescriptor.BACK,
      },
    ],
  },
  {
    id: "Olá",
    index: 0,
    frame: 0,
    states: [
      {
        shape: HandShape.libras.OPEN_HAND_FINGERS_APART,
        orientation: PalmOrientationDescriptor.FRONT,
        pointing: PalmOrientationDescriptor.UP,
        location: Location.TORAX,
      },
      {
        shape: HandShape.libras.OPEN_HAND_FINGERS_APART,
        orientation: PalmOrientationDescriptor.FRONT,
        pointing: PalmOrientationDescriptor.UP,
        location: Location.SHOULDER_RIGHT,
      },
    ],
  },
  {
    id: "Amigo",
    index: 0,
    frame: 0,
    states: [
      {
        shape: HandShape.libras.OPEN_HAND_THUMB_APART,
        orientation: PalmOrientationDescriptor.UP,
        pointing: PalmOrientationDescriptor.LEFT,
        location: Location.TORAX,
      },
    ],
  },
  {
    id: "Fevereiro",
    index: 0,
    frame: 0,
    states: [
      {
        shape: HandShape.libras.F,
        orientation: PalmOrientationDescriptor.LEFT,
        pointing: PalmOrientationDescriptor.UP,
        location: Location.TORAX,
        movement: {
          wristRotateCounterClockwise: true,
        },
      },
      {
        shape: HandShape.libras.F,
        orientation: PalmOrientationDescriptor.LEFT,
        pointing: PalmOrientationDescriptor.UP,
        location: Location.TORAX,
        movement: {
          wristRotateClockwise: true,
        },
      },
    ],
  },
  {
    id: "Outubro",
    index: 0,
    frame: 0,
    states: [
      {
        shape: HandShape.libras.O,
        orientation: PalmOrientationDescriptor.LEFT,
        location: Location.TORAX,
        movement: {
          x: 1,
          y: 1,
        },
      },
      {
        shape: HandShape.libras.O,
        orientation: PalmOrientationDescriptor.LEFT,
        location: Location.TORAX,
        movement: {
          x: 1,
          y: -1,
        },
      },
      {
        shape: HandShape.libras.O,
        orientation: PalmOrientationDescriptor.LEFT,
        location: Location.TORAX,
        movement: {
          x: -1,
          y: -1,
        },
      },
      {
        shape: HandShape.libras.O,
        orientation: PalmOrientationDescriptor.LEFT,
        location: Location.TORAX,
        movement: {
          x: -1,
          y: 1,
        },
      },
    ],
  },
  {
    id: "Lado",
    index: 0,
    frame: 0,
    states: [
      {
        shape: HandShape.libras.OPEN_HAND,
        orientation: PalmOrientationDescriptor.DOWN,
        pointing: PalmOrientationDescriptor.FRONT,
        location: Location.TORAX,
      },
      {
        shape: HandShape.libras.OPEN_HAND,
        orientation: PalmOrientationDescriptor.UP,
        pointing: PalmOrientationDescriptor.FRONT,
        location: Location.TORAX_RIGHT,
      },
    ],
  },
];
