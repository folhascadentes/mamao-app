import {
  Location,
  HandShape,
  Movement,
  HandLocation,
  HandOrientation,
  FingersLocation,
} from "./types";

export type PhonemeDescriptor = {
  shape?: string;
  orientation?: HandOrientation[];
  pointing?: HandOrientation[];
  movement?: Movement;
  location?: Location[];
  options?: {
    movementPivot?: HandLocation;
    locationPivot?: Location;
    pontingFinger?: FingersLocation;
  };
};

export type SignDescriptor = {
  id: string;
  phonemes: {
    right: PhonemeDescriptor;
    left?: PhonemeDescriptor;
  }[];
};

export const signsDescriptors: SignDescriptor[] = [
  {
    id: "A",
    phonemes: [
      {
        right: {
          shape: HandShape.libras.A,
          orientation: [HandOrientation.FRONT],
          location: [Location.TORAX_RIGHT, Location.SHOULDER_RIGHT],
        },
      },
    ],
  },
  {
    id: "C",
    phonemes: [
      {
        right: {
          shape: HandShape.libras.C,
          orientation: [HandOrientation.LEFT],
          location: [Location.TORAX_RIGHT, Location.SHOULDER_RIGHT],
        },
      },
    ],
  },
  {
    id: "D",
    phonemes: [
      {
        right: {
          shape: HandShape.libras.D,
          orientation: [HandOrientation.FRONT],
          location: [Location.TORAX_RIGHT, Location.SHOULDER_RIGHT],
        },
      },
    ],
  },
  {
    id: "F",
    phonemes: [
      {
        right: {
          shape: HandShape.libras.F,
          orientation: [HandOrientation.LEFT],
          location: [Location.TORAX_RIGHT, Location.SHOULDER_RIGHT],
        },
      },
    ],
  },
  {
    id: "L",
    phonemes: [
      {
        right: {
          shape: HandShape.libras.L,
          orientation: [HandOrientation.FRONT],
          location: [Location.TORAX_RIGHT, Location.SHOULDER_RIGHT],
        },
      },
    ],
  },
  {
    id: "O",
    phonemes: [
      {
        right: {
          shape: HandShape.libras.O,
          orientation: [HandOrientation.LEFT],
          location: [Location.TORAX_RIGHT, Location.SHOULDER_RIGHT],
        },
      },
    ],
  },
  {
    id: "S",
    phonemes: [
      {
        right: {
          shape: HandShape.libras.S,
          orientation: [HandOrientation.FRONT],
          location: [Location.TORAX_RIGHT, Location.SHOULDER_RIGHT],
        },
      },
    ],
  },
  {
    id: "Y",
    phonemes: [
      {
        right: {
          shape: HandShape.libras.Y,
          orientation: [HandOrientation.FRONT],
          location: [Location.TORAX_RIGHT, Location.SHOULDER_RIGHT],
        },
      },
    ],
  },
  {
    id: "Nome",
    phonemes: [
      {
        right: {
          shape: HandShape.libras.MIDDLE_AND_INDEX_FINGER,
          orientation: [HandOrientation.LEFT],
          pointing: [HandOrientation.UP],
          location: [Location.TORAX_LEFT, Location.SHOULDER_LEFT],
          options: {
            pontingFinger: FingersLocation.INDEX,
            locationPivot: Location.HAND_INDEX_RIGHT,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.MIDDLE_AND_INDEX_FINGER,
          orientation: [HandOrientation.FRONT],
          pointing: [HandOrientation.UP],
          location: [Location.TORAX_RIGHT, Location.SHOULDER_RIGHT],
          options: {
            pontingFinger: FingersLocation.INDEX,
            locationPivot: Location.HAND_INDEX_RIGHT,
          },
        },
      },
    ],
  },
  {
    id: "Meu-Nome",
    phonemes: [
      {
        right: {
          shape: HandShape.libras.MIDDLE_AND_INDEX_FINGER,
          orientation: [HandOrientation.BACK, HandOrientation.UP],
          pointing: [HandOrientation.UP, HandOrientation.FRONT],
          location: [Location.TORAX_LEFT, Location.SHOULDER_LEFT],
          options: {
            pontingFinger: FingersLocation.INDEX,
            locationPivot: Location.HAND_INDEX_RIGHT,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.MIDDLE_AND_INDEX_FINGER,
          orientation: [HandOrientation.BACK, HandOrientation.UP],
          pointing: [HandOrientation.UP, HandOrientation.FRONT],
          location: [Location.TORAX_RIGHT, Location.SHOULDER_RIGHT],
          options: {
            pontingFinger: FingersLocation.INDEX,
            locationPivot: Location.HAND_INDEX_RIGHT,
          },
        },
      },
    ],
  },
  {
    id: "Você",
    phonemes: [
      {
        right: {
          shape: HandShape.libras.INDEX_FINGER,
          orientation: [HandOrientation.LEFT],
          pointing: [HandOrientation.FRONT],
          options: {
            pontingFinger: FingersLocation.INDEX,
          },
        },
      },
    ],
  },
  {
    id: "Eu",
    phonemes: [
      {
        right: {
          shape: HandShape.libras.INDEX_FINGER,
          pointing: [HandOrientation.BACK, HandOrientation.LEFT],
          options: {
            pontingFinger: FingersLocation.INDEX,
          },
        },
      },
    ],
  },
  {
    id: "Olá",
    phonemes: [
      {
        right: {
          shape: HandShape.libras.OPEN_HAND_FINGERS_APART,
          orientation: [HandOrientation.FRONT, HandOrientation.LEFT],
          location: [Location.TORAX],
        },
      },
      {
        right: {
          shape: HandShape.libras.OPEN_HAND_FINGERS_APART,
          orientation: [HandOrientation.FRONT],
          pointing: [HandOrientation.UP],
          location: [Location.SHOULDER_RIGHT],
        },
      },
    ],
  },
  {
    id: "Amigo",
    phonemes: [
      {
        right: {
          shape: HandShape.libras.OPEN_HAND_THUMB_APART,
          orientation: [HandOrientation.UP],
          pointing: [HandOrientation.LEFT],
          location: [Location.TORAX],
        },
      },
    ],
  },
  {
    id: "Fevereiro",
    phonemes: [
      {
        right: {
          shape: HandShape.libras.F,
          pointing: [HandOrientation.UP],
          movement: {
            wristRotateClockwise: true,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.F,
          pointing: [HandOrientation.UP],
          movement: {
            wristRotateCounterClockwise: true,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.F,
          pointing: [HandOrientation.UP],
          movement: {
            wristRotateClockwise: true,
          },
        },
      },
    ],
  },
  {
    id: "Outubro",
    phonemes: [
      {
        right: {
          shape: HandShape.libras.O,
          orientation: [HandOrientation.LEFT],
          movement: {
            y: 1,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.O,
          orientation: [HandOrientation.LEFT],
          movement: {
            x: 1,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.O,
          orientation: [HandOrientation.LEFT],
          movement: {
            y: -1,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.O,
          orientation: [HandOrientation.LEFT],
          movement: {
            x: -1,
          },
        },
      },
    ],
  },
  {
    id: "Lado",
    phonemes: [
      {
        right: {
          shape: HandShape.libras.OPEN_HAND,
          orientation: [HandOrientation.DOWN],
          location: [Location.TORAX_LEFT],
        },
      },
      {
        right: {
          shape: HandShape.libras.OPEN_HAND,
          orientation: [HandOrientation.UP],
          location: [Location.TORAX_RIGHT],
        },
      },
    ],
  },
  {
    id: "Feliz",
    phonemes: [
      {
        right: {
          shape: HandShape.libras.F,
          pointing: [HandOrientation.UP],
          movement: {
            x: 1,
          },
        },
        left: {
          shape: HandShape.libras.F,
          pointing: [HandOrientation.UP],
          movement: {
            x: -1,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.F,
          pointing: [HandOrientation.UP],
          movement: {
            x: -1,
          },
        },
        left: {
          shape: HandShape.libras.F,
          pointing: [HandOrientation.UP],
          movement: {
            x: 1,
          },
        },
      },
    ],
  },
  {
    id: "Idade",
    phonemes: [
      {
        right: {
          shape: HandShape.libras.Y,
          orientation: [HandOrientation.BACK],
          location: [Location.SHOULDER_RIGHT],
          movement: {
            wristFlexion: true,
          },
        },
      },
    ],
  },
  {
    id: "Saúde",
    phonemes: [
      {
        right: {
          shape: HandShape.libras.MIDDLE_FINGER_BENDED_FINGERS_APART,
          orientation: [HandOrientation.BACK],
          pointing: [HandOrientation.LEFT],
          location: [Location.TORAX_LEFT],
          options: {
            locationPivot: Location.HAND_MIDDLE_RIGHT,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.MIDDLE_FINGER_BENDED_FINGERS_APART,
          orientation: [HandOrientation.BACK],
          pointing: [HandOrientation.LEFT],
          location: [Location.TORAX_RIGHT],
          options: {
            locationPivot: Location.HAND_MIDDLE_RIGHT,
          },
        },
      },
    ],
  },
  {
    id: "Telefone",
    phonemes: [
      {
        right: {
          shape: HandShape.libras.Y,
          orientation: [HandOrientation.BACK],
          pointing: [HandOrientation.LEFT],
          location: [Location.FACE],
          options: {
            locationPivot: Location.HAND_THUMB_RIGHT,
          },
        },
      },
    ],
  },
  {
    id: "Dia",
    phonemes: [
      {
        right: {
          shape: HandShape.libras.D,
          orientation: [HandOrientation.LEFT],
          location: [Location.FACE],
          movement: {
            x: 1,
          },
        },
      },
    ],
  },
  {
    id: "Oi",
    phonemes: [
      {
        right: {
          shape: HandShape.libras.OI,
          orientation: [HandOrientation.LEFT],
          movement: {
            y: 1,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.OI,
          orientation: [HandOrientation.LEFT],
          movement: {
            x: 1,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.OI,
          orientation: [HandOrientation.LEFT],
          movement: {
            y: -1,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.OI,
          orientation: [HandOrientation.LEFT],
          location: [Location.TORAX],
          movement: {
            x: -1,
          },
        },
      },
    ],
  },
  {
    id: "Bom",
    phonemes: [
      {
        right: {
          shape: HandShape.libras.O,
          orientation: [HandOrientation.BACK],
          location: [Location.FACE_MOUTH],
        },
      },
      {
        right: {
          shape: HandShape.libras.OPEN_HAND_FINGERS_APART,
          orientation: [HandOrientation.BACK],
        },
      },
    ],
  },
  {
    id: "Agosto",
    phonemes: [
      {
        right: {
          shape: HandShape.libras.A,
          orientation: [HandOrientation.BACK],
          pointing: [HandOrientation.LEFT],
          location: [Location.TORAX, Location.SHOULDER],
          movement: {
            y: -1,
          },
          options: {
            movementPivot: HandLocation.THUMB_TIP,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.A,
          orientation: [HandOrientation.BACK],
          pointing: [HandOrientation.LEFT],
          location: [Location.TORAX, Location.SHOULDER],
          movement: {
            y: 1,
          },
          options: {
            movementPivot: HandLocation.THUMB_TIP,
          },
        },
      },
    ],
  },
  {
    id: "Avisar",
    phonemes: [
      {
        right: {
          shape: HandShape.libras.Y,
          orientation: [HandOrientation.LEFT],
          pointing: [HandOrientation.UP],
          location: [Location.FACE_MOUTH],
          options: {
            locationPivot: Location.HAND_MIDDLE_RIGHT,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.Y,
          orientation: [HandOrientation.LEFT],
          pointing: [HandOrientation.FRONT],
          location: [Location.TORAX, Location.BELLY],
        },
      },
    ],
  },
  {
    id: "Me-Avisar",
    phonemes: [
      {
        right: {
          shape: HandShape.libras.Y,
          orientation: [HandOrientation.LEFT],
          pointing: [HandOrientation.FRONT],
          location: [Location.TORAX, Location.BELLY],
        },
      },
      {
        right: {
          shape: HandShape.libras.Y,
          orientation: [HandOrientation.LEFT],
          pointing: [HandOrientation.UP],
          location: [Location.FACE_MOUTH],
          options: {
            locationPivot: Location.HAND_MIDDLE_RIGHT,
          },
        },
      },
    ],
  },
  {
    id: "Entender",
    phonemes: [
      {
        right: {
          shape: HandShape.libras.OPEN_HAND_THUMB_APART,
          orientation: [HandOrientation.LEFT],
          location: [Location.FACE_FOREHEAD_RIGHT],
          movement: {
            wristRotateClockwise: true,
          },
          options: {
            locationPivot: Location.HAND_INDEX_RIGHT,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.OPEN_HAND_THUMB_APART,
          orientation: [HandOrientation.LEFT],
          location: [Location.FACE_FOREHEAD_RIGHT],
          movement: {
            wristRotateCounterClockwise: true,
          },
          options: {
            locationPivot: Location.HAND_INDEX_RIGHT,
          },
        },
      },
    ],
  },
  {
    id: "Gostar",
    phonemes: [
      {
        right: {
          shape: HandShape.libras.OPEN_HAND_FINGERS_APART,
          orientation: [HandOrientation.BACK],
          movement: {
            y: 1,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.OPEN_HAND_FINGERS_APART,
          orientation: [HandOrientation.BACK],
          movement: {
            x: 1,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.OPEN_HAND_FINGERS_APART,
          orientation: [HandOrientation.BACK],
          movement: {
            y: -1,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.OPEN_HAND_FINGERS_APART,
          orientation: [HandOrientation.BACK],
          location: [Location.TORAX],
          movement: {
            x: -1,
          },
        },
      },
    ],
  },
  {
    id: "Rápido", // Sentimento - Parecidos
    phonemes: [
      {
        right: {
          shape: HandShape.libras.CLAW,
          orientation: [HandOrientation.BACK],
          pointing: [HandOrientation.LEFT],
          location: [Location.TORAX, Location.SHOULDER],
          movement: {
            y: -1,
          },
          options: {
            movementPivot: HandLocation.MIDDLE_FINGER_TIP,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.CLAW,
          orientation: [HandOrientation.BACK],
          pointing: [HandOrientation.LEFT],
          location: [Location.TORAX, Location.SHOULDER],
          movement: {
            y: 1,
          },
          options: {
            movementPivot: HandLocation.MIDDLE_FINGER_TIP,
          },
        },
      },
    ],
  },
  {
    id: "Não",
    phonemes: [
      {
        right: {
          shape: HandShape.libras.INDEX_FINGER,
          orientation: [HandOrientation.FRONT],
          pointing: [HandOrientation.UP],
          movement: {
            x: -1,
          },
          options: {
            movementPivot: HandLocation.INDEX_FINGER_TIP,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.INDEX_FINGER,
          orientation: [HandOrientation.FRONT],
          pointing: [HandOrientation.UP],
          movement: {
            x: 1,
          },
          options: {
            movementPivot: HandLocation.INDEX_FINGER_TIP,
          },
        },
      },
    ],
  },
  {
    id: "Tchau",
    phonemes: [
      {
        right: {
          shape: HandShape.libras.OPEN_HAND_FINGERS_APART,
          orientation: [HandOrientation.FRONT],
          pointing: [HandOrientation.UP],
          movement: {
            x: -1,
          },
          options: {
            movementPivot: HandLocation.INDEX_FINGER_TIP,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.OPEN_HAND_FINGERS_APART,
          orientation: [HandOrientation.FRONT],
          pointing: [HandOrientation.UP],
          movement: {
            x: 1,
          },
          options: {
            movementPivot: HandLocation.INDEX_FINGER_TIP,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.OPEN_HAND_FINGERS_APART,
          orientation: [HandOrientation.FRONT],
          pointing: [HandOrientation.UP],
          movement: {
            x: -1,
          },
          options: {
            movementPivot: HandLocation.INDEX_FINGER_TIP,
          },
        },
      },
    ],
  },
  {
    id: "Quente",
    phonemes: [
      {
        right: {
          shape: HandShape.libras.C,
          orientation: [HandOrientation.LEFT],
          location: [Location.TORAX_RIGHT, Location.SHOULDER_RIGHT],
        },
      },
      {
        right: {
          shape: HandShape.libras.C,
          orientation: [HandOrientation.LEFT],
          location: [Location.TORAX_RIGHT, Location.SHOULDER_RIGHT],
          movement: {
            x: -1,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.C,
          orientation: [HandOrientation.LEFT],
          location: [Location.TORAX_LEFT, Location.SHOULDER_LEFT],
        },
      },
    ],
  },
  {
    id: "Certeza",
    phonemes: [
      {
        right: {
          shape: HandShape.libras.THUMB_TOUCH_INDEX_FINGERS_OPEN,
          orientation: [HandOrientation.BACK],
          location: [Location.SHOULDER],
        },
      },
      {
        right: {
          shape: HandShape.libras.THUMB_TOUCH_INDEX_FINGERS_OPEN,
          orientation: [HandOrientation.BACK],
          location: [Location.TORAX],
        },
      },
    ],
  },
  {
    id: "Pessoa",
    phonemes: [
      {
        right: {
          shape: HandShape.libras.MIDDLE_FINGER_BENDED_FINGERS_APART,
          orientation: [HandOrientation.BACK],
          pointing: [HandOrientation.LEFT],
          location: [Location.FACE_FOREHEAD_LEFT],
          options: {
            locationPivot: Location.HAND_MIDDLE_RIGHT,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.MIDDLE_FINGER_BENDED_FINGERS_APART,
          orientation: [HandOrientation.BACK],
          pointing: [HandOrientation.LEFT],
          location: [Location.FACE_FOREHEAD_RIGHT],
          options: {
            locationPivot: Location.HAND_MIDDLE_RIGHT,
          },
        },
      },
    ],
  },
  {
    id: "Obrigado",
    phonemes: [
      {
        right: {
          shape: HandShape.libras.OPEN_HAND,
          orientation: [HandOrientation.BACK],
          location: [Location.FACE_FOREHEAD],
          options: {
            locationPivot: Location.HAND_INDEX_RIGHT,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.OPEN_HAND,
          orientation: [HandOrientation.BACK],
          location: [Location.FACE_MOUTH],
          options: {
            locationPivot: Location.HAND_INDEX_RIGHT,
          },
        },
      },
    ],
  },
  {
    id: "Tarde",
    phonemes: [
      {
        right: {
          shape: HandShape.libras.OPEN_HAND,
          orientation: [HandOrientation.FRONT],
          location: [Location.SHOULDER_RIGHT],
        },
      },
      {
        right: {
          shape: HandShape.libras.OPEN_HAND,
          orientation: [HandOrientation.DOWN],
          location: [Location.TORAX_RIGHT, Location.BELLY_RIGHT],
        },
      },
    ],
  },
  // {
  //   id: "Futuro",
  //   index: 0,
  //   frame: 0,
  //   phonemes: [
  //     {
  //       right: {
  //         shape: HandShape.libras.F,
  //         orientation: [HandOrientation.LEFT],
  //         pointing: [HandOrientation.UP],
  //       },
  //     },
  //     {
  //       right: {
  //         shape: HandShape.libras.Y,
  //         orientation: [HandOrientation.LEFT],
  //         pointing: [HandOrientation.FRONT],
  //       },
  //     },
  //   ],
  // },
  {
    id: "Aqui",
    phonemes: [
      {
        right: {
          shape: HandShape.libras.INDEX_FINGER,
          orientation: [HandOrientation.BACK],
          pointing: [HandOrientation.DOWN],
        },
      },
    ],
  },
  {
    id: "Sim",
    phonemes: [
      {
        right: {
          shape: HandShape.libras.S,
          orientation: [HandOrientation.FRONT],
        },
      },
      {
        right: {
          shape: HandShape.libras.S,
          orientation: [HandOrientation.DOWN],
        },
      },
      {
        right: {
          shape: HandShape.libras.S,
          orientation: [HandOrientation.FRONT],
        },
      },
    ],
  },
  // {
  //   id: "Ancião",
  //   index: 0,
  //   frame: 0,
  //   phonemes: [
  //     {
  //       right: {
  //         shape: HandShape.libras.S,
  //         orientation: [HandOrientation.FRONT],
  //         location: [Location.FACE_MOUTH],
  //         options: {
  //           locationPivot: Location.HAND_INDEX_RIGHT,
  //         },
  //       },
  //     },
  //     {
  //       right: {
  //         shape: HandShape.libras.S,
  //         orientation: [HandOrientation.FRONT],
  //         location: [Location.TORAX],
  //         options: {
  //           locationPivot: Location.HAND_INDEX_RIGHT,
  //         },
  //       },
  //     },
  //   ],
  // },
  // {
  //   id: "Agredir",
  //   index: 0,
  //   frame: 0,
  //   phonemes: [
  //     {
  //       right: {
  //         shape: HandShape.libras.S,
  //         orientation: [HandOrientation.LEFT],
  //         pointing: [HandOrientation.FRONT],
  //       },
  //     },
  //     {
  //       right: {
  //         shape: HandShape.libras.S,
  //         orientation: [HandOrientation.DOWN],
  //         pointing: [HandOrientation.FRONT],
  //       },
  //     },
  //   ],
  // },
  // {
  //   id: "Arrepender",
  //   index: 0,
  //   frame: 0,
  //   phonemes: [
  //     {
  //       right: {
  //         shape: HandShape.libras.A,
  //         orientation: [HandOrientation.UP],
  //         pointing: [HandOrientation.FRONT],
  //         location: [Location.TORAX_RIGHT],
  //         options: {
  //           locationPivot: Location.HAND_MIDDLE_RIGHT,
  //         },
  //       },
  //     },
  //     {
  //       right: {
  //         shape: HandShape.libras.A,
  //         orientation: [HandOrientation.BACK],
  //         pointing: [HandOrientation.UP],
  //         location: [Location.FACE_FOREHEAD_RIGHT],
  //         options: {
  //           locationPivot: Location.HAND_MIDDLE_RIGHT,
  //         },
  //       },
  //     },
  //   ],
  // },
  {
    id: "Atrás",
    phonemes: [
      {
        right: {
          shape: HandShape.libras.THUMB_FINGER,
          orientation: [HandOrientation.LEFT],
          pointing: [HandOrientation.FRONT],
          location: [Location.TORAX_RIGHT, Location.SHOULDER_RIGHT],
          options: {
            locationPivot: Location.HAND_MIDDLE_RIGHT,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.THUMB_FINGER,
          orientation: [HandOrientation.LEFT],
          pointing: [HandOrientation.UP],
          location: [Location.FACE_FOREHEAD_RIGHT],
          options: {
            locationPivot: Location.HAND_MIDDLE_RIGHT,
          },
        },
      },
    ],
  },
  {
    id: "Beleza",
    phonemes: [
      {
        right: {
          shape: HandShape.libras.THUMB_FINGER,
          orientation: [HandOrientation.BACK, HandOrientation.LEFT],
          pointing: [HandOrientation.LEFT, HandOrientation.FRONT],
          location: [Location.TORAX],
        },
      },
    ],
  },
  {
    id: "Não-Beleza",
    phonemes: [
      {
        right: {
          shape: HandShape.libras.THUMB_FINGER,
          orientation: [HandOrientation.FRONT],
          pointing: [HandOrientation.LEFT],
          location: [Location.TORAX],
        },
      },
    ],
  },
  // {
  //   id: "Receber",
  //   index: 0,
  //   frame: 0,
  //   phonemes: [
  //     {
  //       right: {
  //         shape: HandShape.libras.OPEN_HAND_FINGERS_APART,
  //         orientation: [HandOrientation.UP],
  //         pointing: [HandOrientation.FRONT],
  //       },
  //     },
  //     {
  //       right: {
  //         shape: HandShape.libras.S,
  //         orientation: [HandOrientation.BACK],
  //         pointing: [HandOrientation.UP],
  //         location: [Location.TORAX],
  //       },
  //     },
  //   ],
  // },
  {
    id: "Mais-ou-menos",
    phonemes: [
      {
        right: {
          shape: HandShape.libras.OPEN_HAND_FINGERS_APART,
          orientation: [HandOrientation.DOWN],
          location: [Location.TORAX, Location.SHOULDER],
          movement: {
            wristRotate: true,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.OPEN_HAND_FINGERS_APART,
          orientation: [HandOrientation.BACK],
          location: [Location.TORAX, Location.SHOULDER],
          movement: {
            wristRotate: true,
          },
        },
      },
    ],
  },
  {
    id: "Palmas",
    phonemes: [
      {
        right: {
          shape: HandShape.libras.OPEN_HAND_FINGERS_APART,
          pointing: [HandOrientation.UP],
          movement: {
            wristRotate: true,
          },
        },
        left: {
          shape: HandShape.libras.OPEN_HAND_FINGERS_APART,
          pointing: [HandOrientation.UP],
          movement: {
            wristRotate: true,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.OPEN_HAND_FINGERS_APART,
          pointing: [HandOrientation.UP],
          movement: {
            wristRotate: true,
          },
        },
        left: {
          shape: HandShape.libras.OPEN_HAND_FINGERS_APART,
          pointing: [HandOrientation.UP],
          movement: {
            wristRotate: true,
          },
        },
      },
    ],
  },
  {
    id: "Saudade",
    phonemes: [
      {
        right: {
          shape: HandShape.libras.S,
          orientation: [HandOrientation.BACK],
          movement: {
            y: 1,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.S,
          orientation: [HandOrientation.BACK],
          movement: {
            x: 1,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.S,
          orientation: [HandOrientation.BACK],
          movement: {
            y: -1,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.S,
          orientation: [HandOrientation.BACK],
          location: [Location.TORAX],
          movement: {
            x: -1,
          },
        },
      },
    ],
  },
  {
    id: "Ter",
    phonemes: [
      {
        right: {
          shape: HandShape.libras.L,
          orientation: [HandOrientation.DOWN],
          pointing: [HandOrientation.LEFT],
          location: [Location.TORAX],
        },
      },
    ],
  },
  // {
  //   id: "Frente",
  //   index: 0,
  //   frame: 0,
  //   phonemes: [
  //     {
  //       right: {
  //         shape: HandShape.libras.OPEN_HAND,
  //         orientation: [HandOrientation.LEFT],
  //         pointing: [HandOrientation.FRONT],
  //         location: [Location.TORAX],
  //       },
  //     },
  //     {
  //       right: {
  //         shape: HandShape.libras.OPEN_HAND,
  //         orientation: [HandOrientation.LEFT],
  //         pointing: [HandOrientation.UP],
  //         location: [Location.TORAX],
  //       },
  //     },
  //   ],
  // },
  {
    id: "Direita",
    phonemes: [
      {
        right: {
          shape: HandShape.libras.OPEN_HAND,
          orientation: [HandOrientation.FRONT],
          pointing: [HandOrientation.RIGHT],
          movement: {
            x: 1,
          },
        },
      },
    ],
  },
  {
    id: "Esquerda",
    phonemes: [
      {
        right: {
          shape: HandShape.libras.OPEN_HAND,
          orientation: [HandOrientation.BACK],
          pointing: [HandOrientation.LEFT],
          movement: {
            x: -1,
          },
        },
      },
    ],
  },
  // {
  //   id: "A-Exceção-De",
  //   index: 0,
  //   frame: 0,
  //   phonemes: [
  //     {
  //       right: {
  //         shape: HandShape.libras.INDEX_FINGER,
  //         orientation: [HandOrientation.DOWN],
  //         pointing: [HandOrientation.FRONT],
  //         movement: {
  //           y: -1,
  //         },
  //       },
  //       left: {
  //         shape: HandShape.libras.OPEN_HAND,
  //         orientation: [HandOrientation.RIGHT],
  //         pointing: [HandOrientation.FRONT],
  //       },
  //     },
  //   ],
  // },
  {
    id: "A-Leste",
    phonemes: [
      {
        right: {
          shape: HandShape.libras.L,
          orientation: [HandOrientation.FRONT],
          location: [Location.TORAX],
        },
      },
      {
        right: {
          shape: HandShape.libras.L,
          orientation: [HandOrientation.FRONT],
          location: [Location.TORAX],
          movement: {
            x: 1,
          },
        },
      },
    ],
  },
  {
    id: "A-Norte",
    phonemes: [
      {
        right: {
          shape: HandShape.libras.MIDDLE_AND_INDEX_FINGER,
          orientation: [HandOrientation.BACK, HandOrientation.DOWN],
          pointing: [HandOrientation.DOWN, HandOrientation.FRONT],
          location: [Location.TORAX, Location.SHOULDER],
          movement: {
            y: 1,
          },
        },
      },
    ],
  },
  {
    id: "A-Oeste",
    phonemes: [
      {
        right: {
          shape: HandShape.libras.O,
          orientation: [HandOrientation.LEFT],
          location: [Location.TORAX],
        },
      },
      {
        right: {
          shape: HandShape.libras.O,
          orientation: [HandOrientation.LEFT],
          location: [Location.TORAX],
          movement: {
            x: -1,
          },
        },
      },
    ],
  },
  {
    id: "A-Sul",
    phonemes: [
      {
        right: {
          shape: HandShape.libras.S,
          orientation: [HandOrientation.FRONT],
        },
      },
      {
        right: {
          shape: HandShape.libras.S,
          orientation: [HandOrientation.FRONT],
          movement: {
            y: -1,
          },
        },
      },
    ],
  },
  // {
  //   id: "A-Mesma-Coisa",
  //   index: 0,
  //   frame: 0,
  //   phonemes: [
  //     {
  //       right: {
  //         shape: HandShape.libras.INDEX_FINGER,
  //         orientation: [HandOrientation.DOWN],
  //         pointing: [HandOrientation.FRONT],
  //         movement: {
  //           x: -1,
  //         },
  //       },
  //       left: {
  //         shape: HandShape.libras.INDEX_FINGER,
  //         orientation: [HandOrientation.DOWN],
  //         pointing: [HandOrientation.FRONT],
  //         movement: {
  //           x: 1,
  //         },
  //       },
  //     },
  //     {
  //       right: {
  //         shape: HandShape.libras.INDEX_FINGER,
  //         orientation: [HandOrientation.DOWN],
  //         pointing: [HandOrientation.FRONT],
  //         movement: {
  //           x: 1,
  //         },
  //       },
  //       left: {
  //         shape: HandShape.libras.INDEX_FINGER,
  //         orientation: [HandOrientation.DOWN],
  //         pointing: [HandOrientation.FRONT],
  //         movement: {
  //           x: -1,
  //         },
  //       },
  //     },
  //     {
  //       right: {
  //         shape: HandShape.libras.INDEX_FINGER,
  //         orientation: [HandOrientation.DOWN],
  //         pointing: [HandOrientation.FRONT],
  //         movement: {
  //           x: -1,
  //         },
  //       },
  //       left: {
  //         shape: HandShape.libras.INDEX_FINGER,
  //         orientation: [HandOrientation.DOWN],
  //         pointing: [HandOrientation.FRONT],
  //         movement: {
  //           x: 1,
  //         },
  //       },
  //     },
  //   ],
  // },
  {
    id: "Abaixar",
    phonemes: [
      {
        right: {
          shape: HandShape.libras.OPEN_HAND,
          orientation: [HandOrientation.DOWN],
          location: [Location.TORAX],
          movement: {
            y: -1,
          },
        },
        left: {
          shape: HandShape.libras.OPEN_HAND,
          orientation: [HandOrientation.DOWN],
          location: [Location.TORAX],
          movement: {
            y: -1,
          },
        },
      },
    ],
  },
  {
    id: "Branco",
    phonemes: [
      {
        right: {
          shape: HandShape.libras.L,
          orientation: [HandOrientation.LEFT],
          location: [Location.FACE_MOUTH],
        },
      },
      {
        right: {
          shape: HandShape.libras.L,
          orientation: [HandOrientation.LEFT],
          location: [Location.FACE_MOUTH],
          movement: {
            x: -1,
          },
        },
      },
    ],
  },
  // {
  //   id: "BÓSNIA-HERZEGOVINA",
  //   index: 0,
  //   frame: 0,
  //   phonemes: [
  //     {
  //       right: {
  //         shape: HandShape.libras.S,
  //         orientation: [HandOrientation.BACK],
  //         location: [Location.TORAX],
  //         movement: {
  //           x: 1,
  //         },
  //       },
  //       left: {
  //         shape: HandShape.libras.S,
  //         orientation: [HandOrientation.BACK],
  //         location: [Location.TORAX],
  //         movement: {
  //           x: -1,
  //         },
  //       },
  //     },
  //     {
  //       right: {
  //         shape: HandShape.libras.S,
  //         orientation: [HandOrientation.FRONT],
  //         location: [Location.TORAX],
  //       },
  //       left: {
  //         shape: HandShape.libras.S,
  //         orientation: [HandOrientation.FRONT],
  //         location: [Location.TORAX],
  //       },
  //     },
  //   ],
  // },
  {
    id: "De-Nada (1)",
    phonemes: [
      {
        right: {
          shape: HandShape.libras.OPEN_HAND,
          orientation: [HandOrientation.FRONT],
          pointing: [HandOrientation.UP],
        },
      },
      {
        right: {
          shape: HandShape.libras.OPEN_HAND,
          orientation: [HandOrientation.FRONT],
          pointing: [HandOrientation.UP],
          movement: {
            x: -1,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.OPEN_HAND,
          orientation: [HandOrientation.FRONT],
          pointing: [HandOrientation.UP],
          movement: {
            x: 1,
          },
        },
      },
    ],
  },
  // {
  //   id: "De-Nada (3)",
  //   index: 0,
  //   frame: 0,
  //   phonemes: [
  //     {
  //       right: {
  //         shape: HandShape.libras.MIDDLE_AND_INDEX_FINGER,
  //         orientation: [HandOrientation.UP],
  //       },
  //     },
  //     {
  //       right: {
  //         shape: HandShape.libras.A,
  //         orientation: [HandOrientation.UP],
  //       },
  //     },
  //     {
  //       right: {
  //         shape: HandShape.libras.D,
  //         orientation: [HandOrientation.UP],
  //       },
  //     },
  //     {
  //       right: {
  //         shape: HandShape.libras.A,
  //         orientation: [HandOrientation.UP],
  //       },
  //     },
  //   ],
  // },
];
