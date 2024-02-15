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
        shape: HandShape.libras.MIDDLE_AND_INDEX_FINGER,
        orientation: PalmOrientationDescriptor.FRONT,
        pointing: PalmOrientationDescriptor.UP,
        location: Location.TORAX_LEFT,
      },
      {
        shape: HandShape.libras.MIDDLE_AND_INDEX_FINGER,
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
        shape: HandShape.libras.MIDDLE_AND_INDEX_FINGER,
        orientation: PalmOrientationDescriptor.BACK,
        pointing: PalmOrientationDescriptor.UP,
        location: Location.TORAX_LEFT,
      },
      {
        shape: HandShape.libras.MIDDLE_AND_INDEX_FINGER,
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
        shape: HandShape.libras.INDEX_FINGER,
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
        shape: HandShape.libras.INDEX_FINGER,
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
        orientation: PalmOrientationDescriptor.FRONT,
        pointing: PalmOrientationDescriptor.UP,
        movement: {
          wristRotateCounterClockwise: true,
        },
      },
      {
        shape: HandShape.libras.F,
        pointing: PalmOrientationDescriptor.UP,
        movement: {
          wristRotateClockwise: true,
        },
      },
      {
        shape: HandShape.libras.F,
        pointing: PalmOrientationDescriptor.UP,
        movement: {
          wristRotateCounterClockwise: true,
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
      },
      {
        shape: HandShape.libras.OPEN_HAND,
        orientation: PalmOrientationDescriptor.UP,
      },
    ],
  },
  {
    id: "Feliz",
    index: 0,
    frame: 0,
    states: [
      {
        shape: HandShape.libras.F,
        orientation: PalmOrientationDescriptor.LEFT,
        pointing: PalmOrientationDescriptor.UP,
        movement: {
          x: 1,
          y: -1,
        },
      },
      {
        shape: HandShape.libras.F,
        orientation: PalmOrientationDescriptor.LEFT,
        pointing: PalmOrientationDescriptor.UP,
        movement: {
          x: -1,
          y: -1,
        },
      },
    ],
  },
  {
    id: "Idade",
    index: 0,
    frame: 0,
    states: [
      {
        shape: HandShape.libras.Y,
        orientation: PalmOrientationDescriptor.BACK,
        location: Location.TORAX_RIGHT,
        movement: {
          wristFlexion: true,
        },
      },
    ],
  },
  {
    id: "Saúde",
    index: 0,
    frame: 0,
    states: [
      {
        shape: HandShape.libras.MIDDLE_FINGER_BENDED_FINGERS_APART,
        orientation: PalmOrientationDescriptor.BACK,
        pointing: PalmOrientationDescriptor.LEFT,
        location: Location.TORAX_LEFT,
      },
      {
        shape: HandShape.libras.MIDDLE_FINGER_BENDED_FINGERS_APART,
        orientation: PalmOrientationDescriptor.BACK,
        pointing: PalmOrientationDescriptor.LEFT,
        location: Location.TORAX_RIGHT,
      },
    ],
  },
  {
    id: "Telefone",
    index: 0,
    frame: 0,
    states: [
      {
        shape: HandShape.libras.Y,
        orientation: PalmOrientationDescriptor.BACK,
        pointing: PalmOrientationDescriptor.LEFT,
        location: Location.FACE_MOUTH,
      },
    ],
  },
  {
    id: "Dia",
    index: 0,
    frame: 0,
    states: [
      {
        shape: HandShape.libras.D,
        orientation: PalmOrientationDescriptor.LEFT,
        location: Location.FACE,
        movement: {
          x: 1,
          y: 1,
        },
      },
    ],
  },
  {
    id: "Oi",
    index: 0,
    frame: 0,
    states: [
      {
        shape: HandShape.libras.OI,
        orientation: PalmOrientationDescriptor.LEFT,
        location: Location.TORAX,
        movement: {
          x: 1,
          y: 1,
        },
      },
      {
        shape: HandShape.libras.OI,
        orientation: PalmOrientationDescriptor.LEFT,
        location: Location.TORAX,
        movement: {
          x: 1,
          y: -1,
        },
      },
      {
        shape: HandShape.libras.OI,
        orientation: PalmOrientationDescriptor.LEFT,
        location: Location.TORAX,
        movement: {
          x: -1,
          y: -1,
        },
      },
      {
        shape: HandShape.libras.OI,
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
    id: "Bom",
    index: 0,
    frame: 0,
    states: [
      {
        shape: HandShape.libras.O,
        orientation: PalmOrientationDescriptor.BACK,
        location: Location.FACE_MOUTH,
      },
      {
        shape: HandShape.libras.OPEN_HAND_FINGERS_APART,
        orientation: PalmOrientationDescriptor.BACK,
      },
    ],
  },
  {
    id: "Agosto",
    index: 0,
    frame: 0,
    states: [
      {
        shape: HandShape.libras.A,
        orientation: PalmOrientationDescriptor.BACK,
        pointing: PalmOrientationDescriptor.LEFT,
        location: Location.TORAX,
        movement: {
          y: -1,
        },
      },
      {
        shape: HandShape.libras.A,
        orientation: PalmOrientationDescriptor.BACK,
        pointing: PalmOrientationDescriptor.LEFT,
        location: Location.TORAX,
        movement: {
          y: 1,
        },
      },
    ],
  },
  {
    id: "Avisar",
    index: 0,
    frame: 0,
    states: [
      {
        shape: HandShape.libras.Y,
        orientation: PalmOrientationDescriptor.LEFT,
        pointing: PalmOrientationDescriptor.UP,
      },
      {
        shape: HandShape.libras.Y,
        orientation: PalmOrientationDescriptor.LEFT,
        pointing: PalmOrientationDescriptor.FRONT,
      },
    ],
  },
  {
    id: "Me-Avisar",
    index: 0,
    frame: 0,
    states: [
      {
        shape: HandShape.libras.Y,
        orientation: PalmOrientationDescriptor.LEFT,
        pointing: PalmOrientationDescriptor.FRONT,
      },
      {
        shape: HandShape.libras.Y,
        orientation: PalmOrientationDescriptor.LEFT,
        pointing: PalmOrientationDescriptor.UP,
      },
    ],
  },
];

// Lado - handshape detection and perhaps orientation
// Idade - Movement detection
