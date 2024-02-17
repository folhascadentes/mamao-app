import {
  Location,
  HandShape,
  Movement,
  HandLocation,
  HandOrientation,
  FingersLocation,
} from "./types";

export type ParametersConfig = {
  shape?: string;
  orientation?: HandOrientation;
  pointing?: HandOrientation;
  movement?: Movement;
  location?: Location[];
  options?: {
    movementPivot?: HandLocation;
    locationPivot?: Location;
    pontingFinger?: FingersLocation;
  };
};

export const signsStates: {
  id: string;
  index: number;
  frame: number;
  states: {
    right: ParametersConfig;
    left?: ParametersConfig;
  }[];
}[] = [
  {
    id: "Nome",
    index: 0,
    frame: 0,
    states: [
      {
        right: {
          shape: HandShape.libras.MIDDLE_AND_INDEX_FINGER,
          orientation: HandOrientation.LEFT,
          pointing: HandOrientation.UP,
          location: [Location.TORAX_LEFT],
        },
      },
      {
        right: {
          shape: HandShape.libras.MIDDLE_AND_INDEX_FINGER,
          orientation: HandOrientation.FRONT,
          pointing: HandOrientation.UP,
          location: [Location.TORAX_RIGHT],
        },
      },
    ],
  },
  {
    id: "Meu-Nome",
    index: 0,
    frame: 0,
    states: [
      {
        right: {
          shape: HandShape.libras.MIDDLE_AND_INDEX_FINGER,
          orientation: HandOrientation.BACK,
          pointing: HandOrientation.UP,
          location: [Location.TORAX_LEFT],
          options: {
            pontingFinger: FingersLocation.INDEX,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.MIDDLE_AND_INDEX_FINGER,
          orientation: HandOrientation.BACK,
          pointing: HandOrientation.UP,
          location: [Location.TORAX_RIGHT],
          options: {
            pontingFinger: FingersLocation.INDEX,
          },
        },
      },
    ],
  },
  {
    id: "Você",
    index: 0,
    frame: 0,
    states: [
      {
        right: {
          shape: HandShape.libras.INDEX_FINGER,
          orientation: HandOrientation.LEFT,
          pointing: HandOrientation.FRONT,
        },
      },
    ],
  },
  {
    id: "Eu",
    index: 0,
    frame: 0,
    states: [
      {
        right: {
          shape: HandShape.libras.INDEX_FINGER,
          pointing: HandOrientation.BACK,
          options: {
            pontingFinger: FingersLocation.INDEX,
          },
        },
      },
    ],
  },
  {
    id: "Olá",
    index: 0,
    frame: 0,
    states: [
      {
        right: {
          shape: HandShape.libras.OPEN_HAND_FINGERS_APART,
          orientation: HandOrientation.FRONT,
          pointing: HandOrientation.UP,
          location: [Location.TORAX],
        },
      },
      {
        right: {
          shape: HandShape.libras.OPEN_HAND_FINGERS_APART,
          orientation: HandOrientation.FRONT,
          pointing: HandOrientation.UP,
          location: [Location.SHOULDER_RIGHT],
        },
      },
    ],
  },
  {
    id: "Amigo",
    index: 0,
    frame: 0,
    states: [
      {
        right: {
          shape: HandShape.libras.OPEN_HAND_THUMB_APART,
          orientation: HandOrientation.UP,
          pointing: HandOrientation.LEFT,
          location: [Location.TORAX],
        },
      },
    ],
  },
  {
    id: "Fevereiro",
    index: 0,
    frame: 0,
    states: [
      {
        right: {
          shape: HandShape.libras.F,
          orientation: HandOrientation.FRONT,
          pointing: HandOrientation.UP,
          movement: {
            wristRotate: true,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.F,
          pointing: HandOrientation.UP,
          movement: {
            wristRotate: true,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.F,
          pointing: HandOrientation.UP,
          movement: {
            wristRotate: true,
          },
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
        right: {
          shape: HandShape.libras.O,
          orientation: HandOrientation.LEFT,
          movement: {
            x: 1,
            y: 1,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.O,
          orientation: HandOrientation.LEFT,
          movement: {
            x: 1,
            y: -1,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.O,
          orientation: HandOrientation.LEFT,
          movement: {
            x: -1,
            y: -1,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.O,
          orientation: HandOrientation.LEFT,
          movement: {
            x: -1,
            y: 1,
          },
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
        right: {
          shape: HandShape.libras.OPEN_HAND,
          orientation: HandOrientation.DOWN,
        },
      },
      {
        right: {
          shape: HandShape.libras.OPEN_HAND,
          orientation: HandOrientation.UP,
        },
      },
    ],
  },
  {
    id: "Feliz",
    index: 0,
    frame: 0,
    states: [
      {
        right: {
          shape: HandShape.libras.F,
          pointing: HandOrientation.UP,
          movement: {
            x: 1,
          },
        },
        left: {
          shape: HandShape.libras.F,
          pointing: HandOrientation.UP,
          movement: {
            x: -1,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.F,
          pointing: HandOrientation.UP,
          movement: {
            x: -1,
          },
        },
        left: {
          shape: HandShape.libras.F,
          pointing: HandOrientation.UP,
          movement: {
            x: 1,
          },
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
        right: {
          shape: HandShape.libras.Y,
          orientation: HandOrientation.BACK,
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
    index: 0,
    frame: 0,
    states: [
      {
        right: {
          shape: HandShape.libras.MIDDLE_FINGER_BENDED_FINGERS_APART,
          orientation: HandOrientation.BACK,
          pointing: HandOrientation.LEFT,
          location: [Location.TORAX_LEFT],
          options: {
            locationPivot: Location.HAND_MIDDLE_RIGHT,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.MIDDLE_FINGER_BENDED_FINGERS_APART,
          orientation: HandOrientation.BACK,
          pointing: HandOrientation.LEFT,
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
    index: 0,
    frame: 0,
    states: [
      {
        right: {
          shape: HandShape.libras.Y,
          orientation: HandOrientation.BACK,
          pointing: HandOrientation.LEFT,
          location: [Location.FACE_MOUTH],
        },
      },
    ],
  },
  {
    id: "Dia",
    index: 0,
    frame: 0,
    states: [
      {
        right: {
          shape: HandShape.libras.D,
          orientation: HandOrientation.LEFT,
          location: [Location.FACE],
          movement: {
            x: 1,
            y: 1,
          },
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
        right: {
          shape: HandShape.libras.OI,
          orientation: HandOrientation.LEFT,
          movement: {
            x: 1,
            y: 1,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.OI,
          orientation: HandOrientation.LEFT,
          movement: {
            x: 1,
            y: -1,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.OI,
          orientation: HandOrientation.LEFT,
          movement: {
            x: -1,
            y: -1,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.OI,
          orientation: HandOrientation.LEFT,
          location: [Location.TORAX],
          movement: {
            x: -1,
            y: 1,
          },
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
        right: {
          shape: HandShape.libras.O,
          orientation: HandOrientation.BACK,
          location: [Location.FACE_MOUTH],
        },
      },
      {
        right: {
          shape: HandShape.libras.OPEN_HAND_FINGERS_APART,
          orientation: HandOrientation.BACK,
        },
      },
    ],
  },
  {
    id: "Agosto",
    index: 0,
    frame: 0,
    states: [
      {
        right: {
          shape: HandShape.libras.A,
          orientation: HandOrientation.BACK,
          pointing: HandOrientation.LEFT,
          location: [Location.TORAX],
          movement: {
            y: -1,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.A,
          orientation: HandOrientation.BACK,
          pointing: HandOrientation.LEFT,
          location: [Location.TORAX],
          movement: {
            y: 1,
          },
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
        right: {
          shape: HandShape.libras.Y,
          orientation: HandOrientation.LEFT,
          pointing: HandOrientation.UP,
        },
      },
      {
        right: {
          shape: HandShape.libras.Y,
          orientation: HandOrientation.LEFT,
          pointing: HandOrientation.FRONT,
        },
      },
    ],
  },
  {
    id: "Me-Avisar",
    index: 0,
    frame: 0,
    states: [
      {
        right: {
          shape: HandShape.libras.Y,
          orientation: HandOrientation.LEFT,
          pointing: HandOrientation.FRONT,
        },
      },
      {
        right: {
          shape: HandShape.libras.Y,
          orientation: HandOrientation.LEFT,
          pointing: HandOrientation.UP,
        },
      },
    ],
  },
  {
    id: "Entender",
    index: 0,
    frame: 0,
    states: [
      {
        right: {
          shape: HandShape.libras.OPEN_HAND_THUMB_APART,
          orientation: HandOrientation.LEFT,
          location: [Location.FACE_FOREHEAD_RIGHT],
          movement: {
            wristRotate: true,
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
    index: 0,
    frame: 0,
    states: [
      {
        right: {
          shape: HandShape.libras.OPEN_HAND_FINGERS_APART,
          orientation: HandOrientation.BACK,
          movement: {
            x: 1,
            y: 1,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.OPEN_HAND_FINGERS_APART,
          orientation: HandOrientation.BACK,
          movement: {
            x: 1,
            y: -1,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.OPEN_HAND_FINGERS_APART,
          orientation: HandOrientation.BACK,
          movement: {
            x: -1,
            y: -1,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.OPEN_HAND_FINGERS_APART,
          orientation: HandOrientation.BACK,
          location: [Location.TORAX],
          movement: {
            x: -1,
            y: 1,
          },
        },
      },
    ],
  },
  {
    id: "Rápido", // Sentimento - Parecidos
    index: 0,
    frame: 0,
    states: [
      {
        right: {
          shape: HandShape.libras.CLAW,
          orientation: HandOrientation.BACK,
          pointing: HandOrientation.LEFT,
          location: [Location.TORAX],
          movement: {
            y: -1,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.CLAW,
          orientation: HandOrientation.BACK,
          pointing: HandOrientation.LEFT,
          location: [Location.TORAX],
          movement: {
            y: 1,
          },
        },
      },
    ],
  },
  {
    id: "Não",
    index: 0,
    frame: 0,
    states: [
      {
        right: {
          shape: HandShape.libras.MIDDLE_AND_INDEX_FINGER,
          orientation: HandOrientation.FRONT,
          pointing: HandOrientation.UP,
          movement: {
            x: -1,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.MIDDLE_AND_INDEX_FINGER,
          orientation: HandOrientation.FRONT,
          pointing: HandOrientation.UP,
          movement: {
            x: 1,
          },
        },
      },
    ],
  },
  {
    id: "Tchau",
    index: 0,
    frame: 0,
    states: [
      {
        right: {
          shape: HandShape.libras.OPEN_HAND_FINGERS_APART,
          orientation: HandOrientation.FRONT,
          pointing: HandOrientation.UP,
          movement: {
            x: -1,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.OPEN_HAND_FINGERS_APART,
          orientation: HandOrientation.FRONT,
          pointing: HandOrientation.UP,
          movement: {
            x: 1,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.OPEN_HAND_FINGERS_APART,
          orientation: HandOrientation.FRONT,
          pointing: HandOrientation.UP,
          movement: {
            x: -1,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.OPEN_HAND_FINGERS_APART,
          orientation: HandOrientation.FRONT,
          pointing: HandOrientation.UP,
          movement: {
            x: 1,
          },
        },
      },
    ],
  },
  {
    id: "Quente",
    index: 0,
    frame: 0,
    states: [
      {
        right: {
          shape: HandShape.libras.C,
          orientation: HandOrientation.LEFT,
          location: [Location.TORAX_RIGHT],
          movement: {
            x: -1,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.C,
          orientation: HandOrientation.LEFT,
          location: [Location.TORAX_LEFT],
          movement: {
            x: 1,
          },
        },
      },
    ],
  },
  {
    id: "Certeza",
    index: 0,
    frame: 0,
    states: [
      {
        right: {
          shape: HandShape.libras.THUMB_TOUCH_INDEX_FINGERS_OPEN,
          orientation: HandOrientation.BACK,
          location: [Location.SHOULDER],
        },
      },
      {
        right: {
          shape: HandShape.libras.THUMB_TOUCH_INDEX_FINGERS_OPEN,
          orientation: HandOrientation.BACK,
          location: [Location.TORAX],
        },
      },
    ],
  },
  {
    id: "Pessoa",
    index: 0,
    frame: 0,
    states: [
      {
        right: {
          shape: HandShape.libras.MIDDLE_FINGER_BENDED_FINGERS_APART,
          orientation: HandOrientation.BACK,
          pointing: HandOrientation.LEFT,
          location: [Location.FACE_FOREHEAD_LEFT],
          options: {
            locationPivot: Location.HAND_MIDDLE_RIGHT,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.MIDDLE_FINGER_BENDED_FINGERS_APART,
          orientation: HandOrientation.BACK,
          pointing: HandOrientation.LEFT,
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
    index: 0,
    frame: 0,
    states: [
      {
        right: {
          shape: HandShape.libras.OPEN_HAND,
          orientation: HandOrientation.BACK,
          location: [Location.FACE_FOREHEAD],
          options: {
            locationPivot: Location.HAND_INDEX_RIGHT,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.OPEN_HAND,
          orientation: HandOrientation.BACK,
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
    index: 0,
    frame: 0,
    states: [
      {
        right: {
          shape: HandShape.libras.OPEN_HAND,
          orientation: HandOrientation.FRONT,
          location: [Location.SHOULDER_RIGHT],
        },
      },
      {
        right: {
          shape: HandShape.libras.OPEN_HAND,
          orientation: HandOrientation.DOWN,
          location: [Location.TORAX_RIGHT],
        },
      },
    ],
  },
  {
    id: "Futuro",
    index: 0,
    frame: 0,
    states: [
      {
        right: {
          shape: HandShape.libras.F,
          orientation: HandOrientation.LEFT,
          pointing: HandOrientation.UP,
        },
      },
      {
        right: {
          shape: HandShape.libras.Y,
          orientation: HandOrientation.LEFT,
          pointing: HandOrientation.FRONT,
        },
      },
    ],
  },
  {
    id: "Aqui",
    index: 0,
    frame: 0,
    states: [
      {
        right: {
          shape: HandShape.libras.INDEX_FINGER,
          orientation: HandOrientation.BACK,
          pointing: HandOrientation.DOWN,
        },
      },
    ],
  },
  {
    id: "Sim",
    index: 0,
    frame: 0,
    states: [
      {
        right: {
          shape: HandShape.libras.S,
          orientation: HandOrientation.FRONT,
          movement: {
            wristFlexion: true,
          },
        },
      },
    ],
  },
  {
    id: "Ancião",
    index: 0,
    frame: 0,
    states: [
      {
        right: {
          shape: HandShape.libras.S,
          orientation: HandOrientation.FRONT,
          location: [Location.FACE_MOUTH],
          options: {
            locationPivot: Location.HAND_INDEX_RIGHT,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.S,
          orientation: HandOrientation.FRONT,
          location: [Location.TORAX],
          options: {
            locationPivot: Location.HAND_INDEX_RIGHT,
          },
        },
      },
    ],
  },
  {
    id: "Agredir",
    index: 0,
    frame: 0,
    states: [
      {
        right: {
          shape: HandShape.libras.S,
          orientation: HandOrientation.LEFT,
          pointing: HandOrientation.FRONT,
        },
      },
      {
        right: {
          shape: HandShape.libras.S,
          orientation: HandOrientation.DOWN,
          pointing: HandOrientation.FRONT,
        },
      },
    ],
  },
  {
    id: "Arrepender",
    index: 0,
    frame: 0,
    states: [
      {
        right: {
          shape: HandShape.libras.A,
          orientation: HandOrientation.UP,
          pointing: HandOrientation.FRONT,
          location: [Location.TORAX_RIGHT],
          options: {
            locationPivot: Location.HAND_MIDDLE_RIGHT,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.A,
          orientation: HandOrientation.BACK,
          pointing: HandOrientation.UP,
          location: [Location.FACE_FOREHEAD_RIGHT],
          options: {
            locationPivot: Location.HAND_MIDDLE_RIGHT,
          },
        },
      },
    ],
  },
  {
    id: "Atrás",
    index: 0,
    frame: 0,
    states: [
      {
        right: {
          shape: HandShape.libras.THUMB_FINGER,
          orientation: HandOrientation.LEFT,
          pointing: HandOrientation.FRONT,
          location: [Location.TORAX_RIGHT],
          options: {
            locationPivot: Location.HAND_MIDDLE_RIGHT,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.THUMB_FINGER,
          orientation: HandOrientation.LEFT,
          pointing: HandOrientation.UP,
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
    index: 0,
    frame: 0,
    states: [
      {
        right: {
          shape: HandShape.libras.THUMB_FINGER,
          orientation: HandOrientation.BACK,
          pointing: HandOrientation.LEFT,
          location: [Location.TORAX],
        },
      },
    ],
  },
  {
    id: "Não-Beleza",
    index: 0,
    frame: 0,
    states: [
      {
        right: {
          shape: HandShape.libras.THUMB_FINGER,
          orientation: HandOrientation.FRONT,
          pointing: HandOrientation.LEFT,
          location: [Location.TORAX],
        },
      },
    ],
  },
  {
    id: "Receber",
    index: 0,
    frame: 0,
    states: [
      {
        right: {
          shape: HandShape.libras.OPEN_HAND_FINGERS_APART,
          orientation: HandOrientation.UP,
          pointing: HandOrientation.FRONT,
        },
      },
      {
        right: {
          shape: HandShape.libras.S,
          orientation: HandOrientation.BACK,
          pointing: HandOrientation.UP,
          location: [Location.TORAX],
        },
      },
    ],
  },
  {
    id: "Mais-ou-menos",
    index: 0,
    frame: 0,
    states: [
      {
        right: {
          shape: HandShape.libras.OPEN_HAND_FINGERS_APART,
          orientation: HandOrientation.DOWN,
          location: [Location.TORAX],
          movement: {
            wristRotate: true,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.OPEN_HAND_FINGERS_APART,
          orientation: HandOrientation.BACK,
          pointing: HandOrientation.LEFT,
          location: [Location.TORAX],
          movement: {
            wristRotate: true,
          },
        },
      },
    ],
  },
  {
    id: "Palmas",
    index: 0,
    frame: 0,
    states: [
      {
        right: {
          shape: HandShape.libras.OPEN_HAND_FINGERS_APART,
          pointing: HandOrientation.UP,
          movement: {
            wristRotate: true,
          },
        },
        left: {
          shape: HandShape.libras.OPEN_HAND_FINGERS_APART,
          pointing: HandOrientation.UP,
          movement: {
            wristRotate: true,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.OPEN_HAND_FINGERS_APART,
          pointing: HandOrientation.UP,
          movement: {
            wristRotate: true,
          },
        },
        left: {
          shape: HandShape.libras.OPEN_HAND_FINGERS_APART,
          pointing: HandOrientation.UP,
          movement: {
            wristRotate: true,
          },
        },
      },
    ],
  },
  {
    id: "Saudade",
    index: 0,
    frame: 0,
    states: [
      {
        right: {
          shape: HandShape.libras.S,
          orientation: HandOrientation.BACK,
          movement: {
            x: 1,
            y: 1,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.S,
          orientation: HandOrientation.BACK,
          movement: {
            x: 1,
            y: -1,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.S,
          orientation: HandOrientation.BACK,
          movement: {
            x: -1,
            y: -1,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.S,
          orientation: HandOrientation.BACK,
          location: [Location.TORAX],
          movement: {
            x: -1,
            y: 1,
          },
        },
      },
    ],
  },
  {
    id: "Ter",
    index: 0,
    frame: 0,
    states: [
      {
        right: {
          shape: HandShape.libras.L,
          orientation: HandOrientation.DOWN,
          pointing: HandOrientation.LEFT,
          location: [Location.TORAX],
        },
      },
    ],
  },
  {
    id: "Frente",
    index: 0,
    frame: 0,
    states: [
      {
        right: {
          shape: HandShape.libras.OPEN_HAND,
          orientation: HandOrientation.LEFT,
          pointing: HandOrientation.FRONT,
          location: [Location.TORAX],
        },
      },
      {
        right: {
          shape: HandShape.libras.OPEN_HAND,
          orientation: HandOrientation.LEFT,
          pointing: HandOrientation.UP,
          location: [Location.TORAX],
        },
      },
    ],
  },
  {
    id: "Direita",
    index: 0,
    frame: 0,
    states: [
      {
        right: {
          shape: HandShape.libras.OPEN_HAND,
          orientation: HandOrientation.FRONT,
          pointing: HandOrientation.RIGHT,
          movement: {
            x: 1,
          },
        },
      },
    ],
  },
  {
    id: "Esquerda",
    index: 0,
    frame: 0,
    states: [
      {
        right: {
          shape: HandShape.libras.OPEN_HAND,
          orientation: HandOrientation.BACK,
          pointing: HandOrientation.LEFT,
          movement: {
            x: -1,
          },
        },
      },
    ],
  },
  {
    id: "A-Exceção-De",
    index: 0,
    frame: 0,
    states: [
      {
        right: {
          shape: HandShape.libras.INDEX_FINGER,
          orientation: HandOrientation.DOWN,
          pointing: HandOrientation.FRONT,
          movement: {
            y: -1,
          },
        },
        left: {
          shape: HandShape.libras.OPEN_HAND,
          orientation: HandOrientation.RIGHT,
          pointing: HandOrientation.FRONT,
        },
      },
    ],
  },
  {
    id: "A-Leste",
    index: 0,
    frame: 0,
    states: [
      {
        right: {
          shape: HandShape.libras.L,
          orientation: HandOrientation.FRONT,
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
    index: 0,
    frame: 0,
    states: [
      {
        right: {
          shape: HandShape.libras.MIDDLE_AND_INDEX_FINGER,
          orientation: HandOrientation.BACK,
          pointing: HandOrientation.DOWN,
          location: [Location.TORAX],
          movement: {
            y: 1,
          },
        },
      },
    ],
  },
  {
    id: "A-Oeste",
    index: 0,
    frame: 0,
    states: [
      {
        right: {
          shape: HandShape.libras.O,
          orientation: HandOrientation.LEFT,
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
    index: 0,
    frame: 0,
    states: [
      {
        right: {
          shape: HandShape.libras.S,
          orientation: HandOrientation.FRONT,
          movement: {
            y: -1,
          },
        },
      },
    ],
  },
  {
    id: "A-Mesma-Coisa",
    index: 0,
    frame: 0,
    states: [
      {
        right: {
          shape: HandShape.libras.INDEX_FINGER,
          orientation: HandOrientation.DOWN,
          pointing: HandOrientation.FRONT,
          movement: {
            x: -1,
          },
        },
        left: {
          shape: HandShape.libras.INDEX_FINGER,
          orientation: HandOrientation.DOWN,
          pointing: HandOrientation.FRONT,
          movement: {
            x: 1,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.INDEX_FINGER,
          orientation: HandOrientation.DOWN,
          pointing: HandOrientation.FRONT,
          movement: {
            x: 1,
          },
        },
        left: {
          shape: HandShape.libras.INDEX_FINGER,
          orientation: HandOrientation.DOWN,
          pointing: HandOrientation.FRONT,
          movement: {
            x: -1,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.INDEX_FINGER,
          orientation: HandOrientation.DOWN,
          pointing: HandOrientation.FRONT,
          movement: {
            x: -1,
          },
        },
        left: {
          shape: HandShape.libras.INDEX_FINGER,
          orientation: HandOrientation.DOWN,
          pointing: HandOrientation.FRONT,
          movement: {
            x: 1,
          },
        },
      },
    ],
  },
  {
    id: "Abaixar",
    index: 0,
    frame: 0,
    states: [
      {
        right: {
          shape: HandShape.libras.OPEN_HAND,
          orientation: HandOrientation.DOWN,
          location: [Location.TORAX],
          movement: {
            y: -1,
          },
        },
        left: {
          shape: HandShape.libras.OPEN_HAND,
          orientation: HandOrientation.DOWN,
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
    index: 0,
    frame: 0,
    states: [
      {
        right: {
          shape: HandShape.libras.L,
          orientation: HandOrientation.LEFT,
          location: [Location.FACE_MOUTH],
          movement: {
            x: -1,
          },
        },
      },
    ],
  },
  {
    id: "BÓSNIA-HERZEGOVINA",
    index: 0,
    frame: 0,
    states: [
      {
        right: {
          shape: HandShape.libras.S,
          orientation: HandOrientation.BACK,
          location: [Location.TORAX],
          movement: {
            x: 1,
          },
        },
        left: {
          shape: HandShape.libras.S,
          orientation: HandOrientation.BACK,
          location: [Location.TORAX],
          movement: {
            x: -1,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.S,
          orientation: HandOrientation.FRONT,
          location: [Location.TORAX],
        },
        left: {
          shape: HandShape.libras.S,
          orientation: HandOrientation.FRONT,
          location: [Location.TORAX],
        },
      },
    ],
  },
  {
    id: "De-Nada (1)",
    index: 0,
    frame: 0,
    states: [
      {
        right: {
          shape: HandShape.libras.OPEN_HAND,
          orientation: HandOrientation.FRONT,
          pointing: HandOrientation.UP,
          movement: {
            x: -1,
          },
        },
      },
      {
        right: {
          shape: HandShape.libras.OPEN_HAND,
          orientation: HandOrientation.FRONT,
          pointing: HandOrientation.UP,
          movement: {
            x: 1,
          },
        },
      },
    ],
  },
  {
    id: "De-Nada (3)",
    index: 0,
    frame: 0,
    states: [
      {
        right: {
          shape: HandShape.libras.MIDDLE_AND_INDEX_FINGER,
          orientation: HandOrientation.UP,
        },
      },
      {
        right: {
          shape: HandShape.libras.A,
          orientation: HandOrientation.UP,
        },
      },
      {
        right: {
          shape: HandShape.libras.D,
          orientation: HandOrientation.UP,
        },
      },
      {
        right: {
          shape: HandShape.libras.A,
          orientation: HandOrientation.UP,
        },
      },
    ],
  },
];
