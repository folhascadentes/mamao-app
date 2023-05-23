import { HandLocation } from "./types";
import {
  HandOrientation,
  HandShape,
  Location,
  MovementType,
  PalmOrientation,
  Sign,
} from "./types";

export const signs: Sign[] = [
  {
    language: "Libras",
    token: "Nome",
    steps: {
      start: {
        dominant: {
          location: Location.TORAX_UPPER_LEFT,
          handShape: HandShape.libras.MIDDLE_AND_INDEX_FINGER,
          palmOrientation: PalmOrientation.FRONT,
          handOrientation: HandOrientation.UP,
          options: {
            location: {
              detectionRadius: 60,
              radiusOffset: {
                value: 85,
                leftLimitValue: 0,
              },
            },
          },
        },
      },
      movement: {
        dominant: {
          forbidden: [
            { x: -1 },
            { x: -1, y: 1 },
            { x: -1, y: -1 },
            { wristRotate: true },
          ],
          metadata: {
            description: "mova a mão até a outra bola laranja",
            type: MovementType.LINEAR_MOTION,
          },
        },
      },
      end: {
        dominant: {
          location: Location.TORAX_UPPER_RIGHT,
          handShape: HandShape.libras.MIDDLE_AND_INDEX_FINGER,
          palmOrientation: PalmOrientation.FRONT,
          handOrientation: HandOrientation.UP,
          options: {
            location: {
              detectionRadius: 60,
              radiusOffset: {
                value: 85,
                rightLimitValue: 0,
              },
            },
          },
        },
      },
    },
  },
  {
    language: "Libras",
    token: "Meu-nome",
    steps: {
      start: {
        dominant: {
          location: Location.TORAX_UPPER_LEFT,
          handShape: HandShape.libras.MIDDLE_AND_INDEX_FINGER,
          palmOrientation: PalmOrientation.BACK,
          handOrientation: HandOrientation.UP,
          options: {
            location: {
              detectionRadius: 60,
              radiusOffset: {
                value: 85,
                leftLimitValue: 0,
              },
            },
          },
        },
      },
      movement: {
        dominant: {
          forbidden: [
            { x: -1 },
            { x: -1, y: 1 },
            { x: -1, y: -1 },
            { wristRotate: true },
          ],
          metadata: {
            description: "mova a mão até a outra bola laranja",
            type: MovementType.LINEAR_MOTION,
          },
        },
      },
      end: {
        dominant: {
          location: Location.TORAX_UPPER_RIGHT,
          handShape: HandShape.libras.MIDDLE_AND_INDEX_FINGER,
          palmOrientation: PalmOrientation.BACK,
          handOrientation: HandOrientation.UP,
          options: {
            location: {
              detectionRadius: 60,
              radiusOffset: {
                value: 85,
                rightLimitValue: 0,
              },
            },
          },
        },
      },
    },
  },
  {
    language: "Libras",
    token: "Oi",
    steps: {
      start: {
        dominant: {
          location: Location.TORAX,
          handShape: HandShape.libras.OI,
          palmOrientation: PalmOrientation.LEFT,
          handOrientation: HandOrientation.UP,
          options: {
            location: {
              detectionRadius: 60,
              radiusOffset: 100,
            },
          },
        },
      },
      movement: {
        dominant: {
          detect: [
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
            ],
          ],
          metadata: {
            description: "faça um movimento circular",
            type: MovementType.CIRCULAR_MOTION,
          },
          options: {
            detect: {
              circular: true,
            },
          },
        },
      },
      end: {
        dominant: {
          location: Location.TORAX,
          handShape: HandShape.libras.OI,
          palmOrientation: PalmOrientation.LEFT,
          handOrientation: HandOrientation.UP,
          options: {
            location: {
              detectionRadius: 60,
              same: true,
            },
          },
        },
      },
    },
  },
  {
    language: "Libras",
    token: "Bom",
    steps: {
      start: {
        dominant: {
          location: Location.CHIN,
          handShape: HandShape.libras.O,
          palmOrientation: PalmOrientation.BACK,
        },
      },
      movement: {
        dominant: {
          detect: [{ y: -1, z: 1 }, { y: -1 }],
          metadata: {
            description:
              "mova a mão até a outra bola laranja em um movimento parabólico e abrindo a mão",
            type: MovementType.PARABOLIC_MOTION,
          },
        },
      },
      end: {
        dominant: {
          location: Location.TORAX,
          handShape: HandShape.libras.OPEN_HAND_FINGERS_APART,
          palmOrientation: PalmOrientation.UP,
          options: {
            location: {
              detectionRadius: 60,
              radiusOffset: 65,
            },
          },
        },
      },
    },
  },
  {
    language: "Libras",
    token: "Você",
    steps: {
      start: {
        dominant: {
          location: Location.TORAX,
          handShape: HandShape.libras.INDEX_FINGER,
          palmOrientation: PalmOrientation.DOWN,
          options: {
            location: {
              detectionRadius: 60,
              radiusOffset: 30,
            },
          },
        },
      },
      movement: {
        dominant: {
          detect: [{ z: 1 }, { z: -1 }],
          metadata: {
            description:
              "mova em direção oposta ao seu corpo e após isso volte a posição inicial",
            type: MovementType.LINEAR_MOTION,
          },
        },
      },
      end: {
        dominant: {
          location: Location.TORAX,
          handShape: HandShape.libras.INDEX_FINGER,
          palmOrientation: PalmOrientation.DOWN,
          options: {
            location: {
              detectionRadius: 60,
              radiusOffset: 90,
            },
          },
        },
      },
    },
  },
  {
    language: "Libras",
    token: "Eu",
    steps: {
      start: {
        dominant: {
          location: Location.TORAX,
          handShape: HandShape.libras.INDEX_FINGER,
          palmOrientation: PalmOrientation.RIGHT,
          handOrientation: HandOrientation.BACK,
          options: {
            location: {
              detectionRadius: 60,
              radiusOffset: 30,
            },
          },
        },
      },
      movement: {
        dominant: {
          detect: [{ z: -1 }, { z: 1 }],
          metadata: {
            description:
              "mova em sua direção e após isso volte a posição inicial",
            type: MovementType.LINEAR_MOTION,
          },
        },
      },
      end: {
        dominant: {
          location: Location.TORAX,
          handShape: HandShape.libras.INDEX_FINGER,
          palmOrientation: PalmOrientation.RIGHT,
          handOrientation: HandOrientation.BACK,
          options: {
            location: {
              detectionRadius: 60,
              radiusOffset: 90,
            },
          },
        },
      },
    },
  },
  {
    language: "Libras",
    token: "Agosto",
    steps: {
      start: {
        dominant: {
          location: Location.TORAX_UPPER,
          handShape: HandShape.libras.A,
          palmOrientation: PalmOrientation.BACK,
          options: {
            location: {
              detectionRadius: 60,
              radiusOffset: 75,
            },
          },
        },
      },
      movement: {
        dominant: {
          detect: [{ y: -1 }, { y: 1 }, { y: -1 }, { y: 1 }],
          metadata: {
            description: "mova a mão para baixo e para cima duas vezes",
            type: MovementType.SHAKE_MOTION,
          },
          options: {
            detect: {
              circular: true,
            },
          },
        },
      },
      end: {
        dominant: {
          location: Location.TORAX_UPPER,
          handShape: HandShape.libras.A,
          palmOrientation: PalmOrientation.BACK,
          options: {
            location: {
              same: true,
              detectionRadius: 60,
            },
          },
        },
      },
    },
  },
  {
    language: "Libras",
    token: "Avisar",
    steps: {
      start: {
        dominant: {
          location: Location.TORAX_UPPER,
          handShape: HandShape.libras.Y,
          palmOrientation: PalmOrientation.LEFT,
          handOrientation: HandOrientation.UP,
          options: {
            location: {
              detectionRadius: 60,
              radiusOffset: 50,
            },
          },
        },
      },
      movement: {
        dominant: {
          detect: [{ z: 1 }, { y: -1, z: 1 }],
          metadata: {
            description:
              "mova a mão até a outra bola laranja em um movimento parabólico para frente",
            type: MovementType.PARABOLIC_MOTION,
          },
        },
      },
      end: {
        dominant: {
          location: Location.TORAX_LOWER,
          handShape: HandShape.libras.Y,
          palmOrientation: PalmOrientation.LEFT,
          handOrientation: HandOrientation.FRONT,
          options: {
            location: {
              detectionRadius: 60,
              radiusOffset: 75,
            },
          },
        },
      },
    },
  },
  {
    language: "Libras",
    token: "Me-avisar",
    steps: {
      start: {
        dominant: {
          location: Location.TORAX_LOWER,
          handShape: HandShape.libras.Y,
          palmOrientation: PalmOrientation.LEFT,
          handOrientation: HandOrientation.FRONT,
          options: {
            location: {
              detectionRadius: 60,
              radiusOffset: 50,
            },
          },
        },
      },
      movement: {
        dominant: {
          detect: [{ y: 1, z: -1 }, { z: -1 }],
          metadata: {
            description:
              "mova a mão até a outra bola laranja em um movimento parabólico para trás",
            type: MovementType.PARABOLIC_MOTION,
          },
        },
      },
      end: {
        dominant: {
          location: Location.TORAX_UPPER,
          handShape: HandShape.libras.Y,
          palmOrientation: PalmOrientation.LEFT,
          handOrientation: HandOrientation.UP,
          options: {
            location: {
              detectionRadius: 60,
              radiusOffset: 75,
            },
          },
        },
      },
    },
  },
  {
    language: "Libras",
    token: "Beleza",
    steps: {
      start: {
        dominant: {
          location: Location.TORAX,
          handShape: HandShape.libras.THUMB_FINGER,
          palmOrientation: PalmOrientation.BACK,
          options: {
            location: {
              detectionRadius: 60,
              radiusOffset: 125,
            },
          },
        },
      },
      movement: {
        dominant: {
          metadata: {
            description: "Permanceça com a mão na posição",
            type: MovementType.STATIC,
          },
        },
      },
      end: {
        dominant: {
          location: Location.TORAX,
          handShape: HandShape.libras.THUMB_FINGER,
          palmOrientation: PalmOrientation.BACK,
          options: {
            location: {
              same: true,
              detectionRadius: 60,
            },
          },
        },
      },
    },
  },
  {
    language: "Libras",
    token: "Educado",
    steps: {
      start: {
        dominant: {
          location: Location.ELBOW_LEFT,
          handShape: HandShape.libras.L,
          palmOrientation: PalmOrientation.DOWN,
          options: {
            location: {
              detectionRadius: 60,
              radiusOffset: {
                value: 60,
                downLimitValue: 0,
              },
              track: true,
              handLocation: HandLocation.INDEX_FINGER_TIP,
            },
          },
        },
        nonDominant: {
          location: Location.TORAX_LOWER_RIGHT,
          handShape: HandShape.libras.A, // HandShape.libras.S
          palmOrientation: PalmOrientation.DOWN,
          options: {
            location: {
              detectionRadius: 60,
              radiusOffset: 85,
              handLocation: HandLocation.WRIST,
            },
          },
        },
      },
      movement: {
        dominant: {
          metadata: {
            description:
              "Mova a mão dominante colada ao braço até o pulso da mão não dominante",
            type: MovementType.LINEAR_MOTION,
          },
        },
      },
      end: {
        dominant: {
          location: Location.WRIST_LEFT,
          handShape: HandShape.libras.L,
          palmOrientation: PalmOrientation.DOWN,
          options: {
            location: {
              detectionRadius: 60,
              radiusOffset: 60,
              track: true,
              handLocation: HandLocation.INDEX_FINGER_TIP,
            },
          },
        },
      },
    },
  },
  {
    language: "Libras",
    token: "Branco",
    steps: {
      start: {
        dominant: {
          location: Location.SHOULDER_LEFT, // Location.ELBOW_LEFT
          handShape: HandShape.libras.OPEN_HAND,
          palmOrientation: PalmOrientation.UP,
          options: {
            location: {
              detectionRadius: 60,
              radiusOffset: {
                value: 60,
                downLimitValue: 0,
              },
              track: true,
              handLocation: HandLocation.INDEX_FINGER_TIP,
            },
          },
        },
        nonDominant: {
          location: Location.TORAX_LOWER_RIGHT,
          handShape: HandShape.libras.A, // HandShape.libras.S
          palmOrientation: PalmOrientation.DOWN,
          options: {
            location: {
              detectionRadius: 60,
              radiusOffset: 85,
              handLocation: HandLocation.WRIST,
            },
          },
        },
      },
      movement: {
        dominant: {
          metadata: {
            description:
              "Mova a mão dominante colada ao braço até o pulso da mão não dominante",
            type: MovementType.LINEAR_MOTION,
          },
        },
      },
      end: {
        dominant: {
          location: Location.WRIST_LEFT,
          handShape: HandShape.libras.OPEN_HAND,
          palmOrientation: PalmOrientation.UP,
          options: {
            location: {
              detectionRadius: 60,
              radiusOffset: 60,
              track: true,
              handLocation: HandLocation.INDEX_FINGER_TIP,
            },
          },
        },
      },
    },
  },
  {
    language: "Libras",
    token: "Ainda",
    steps: {
      start: {
        dominant: {
          location: Location.CHIN,
          handShape: HandShape.libras.THUMB_TOUCH_INDEX_FINGERS_CLOSED,
          palmOrientation: PalmOrientation.LEFT,
          options: {
            location: {
              detectionRadius: 60,
              radiusOffset: 60,
            },
          },
        },
      },
      movement: {
        dominant: {
          detect: [{ z: -1 }, { z: 1 }, { z: -1 }],
          metadata: {
            description: "Mova a mão até o queixo tocando ele duas vezes",
            type: MovementType.LINEAR_MOTION,
          },
        },
      },
      end: {
        dominant: {
          location: Location.CHIN,
          handShape: HandShape.libras.THUMB_TOUCH_INDEX_FINGERS_CLOSED,
          palmOrientation: PalmOrientation.LEFT,
          options: {
            location: {
              detectionRadius: 60,
              radiusOffset: 15,
            },
          },
        },
      },
    },
  },
  {
    language: "Libras",
    token: "Futuro",
    steps: {
      start: {
        dominant: {
          location: Location.TORAX_UPPER,
          handShape: HandShape.libras.F,
          palmOrientation: PalmOrientation.LEFT,
          options: {
            location: {
              detectionRadius: 60,
              radiusOffset: 60,
            },
          },
        },
      },
      movement: {
        dominant: {
          detect: [{ z: 1 }, { y: -1, z: 1 }],
          metadata: {
            description:
              "mova a mão até a outra bola laranja em um movimento parabólico para frente",
            type: MovementType.PARABOLIC_MOTION,
          },
        },
      },
      end: {
        dominant: {
          location: Location.TORAX_LOWER,
          handShape: HandShape.libras.F,
          palmOrientation: PalmOrientation.LEFT,
          options: {
            location: {
              detectionRadius: 60,
              radiusOffset: 90,
            },
          },
        },
      },
    },
  },
  {
    language: "Libras",
    token: "Meu",
    steps: {
      start: {
        dominant: {
          location: Location.TORAX,
          handShape: HandShape.libras.OPEN_HAND_FINGERS_APART,
          palmOrientation: PalmOrientation.BACK,
          options: {
            location: {
              detectionRadius: 60,
              radiusOffset: 100,
            },
          },
        },
      },
      movement: {
        dominant: {
          detect: [{ z: -1 }, { z: 1 }],
          metadata: {
            description:
              "mova em sua direção e após isso volte a posição inicial",
            type: MovementType.LINEAR_MOTION,
          },
        },
      },
      end: {
        dominant: {
          location: Location.TORAX,
          handShape: HandShape.libras.OPEN_HAND_FINGERS_APART,
          palmOrientation: PalmOrientation.BACK,
          options: {
            location: {
              detectionRadius: 60,
              same: true,
            },
          },
        },
      },
    },
  },
  {
    language: "Libras",
    token: "Sim",
    steps: {
      start: {
        dominant: {
          location: Location.TORAX_RIGHT,
          handShape: HandShape.libras.S,
          palmOrientation: PalmOrientation.FRONT,
          options: {
            location: {
              detectionRadius: 60,
              radiusOffset: 60,
            },
          },
        },
      },
      movement: {
        dominant: {
          detect: [{ wristFlexion: true }, { wristExtension: true }],
          metadata: {
            description: "Flexione e extenda o pulso da mão dominante",
            type: MovementType.WRIST_FLEXION_EXTENSION,
          },
        },
      },
      end: {
        dominant: {
          location: Location.TORAX_RIGHT,
          handShape: HandShape.libras.S,
          palmOrientation: PalmOrientation.FRONT,
          options: {
            location: {
              detectionRadius: 60,
              same: true,
            },
          },
        },
      },
    },
  },
  // {
  //   language: "Libras",
  //   token: "Hoje",
  //   steps: {
  //     start: {
  //       dominant: {
  //         location: "torax",
  //         bodyOffsetVertical: 50,
  //         handShape: "open_hand_cm",
  //         palmOrientation: PalmOrientation.UP,
  //       },
  //       nondominant: {
  //         location: "side",
  //         handShape: "open_hand_cm",
  //         palmOrientation: PalmOrientation.UP,
  //       },
  //     },
  //     movement: {
  //       dominantCategory: "ZIG_ZAG_MOTION",
  //       nondominantCategory: "ZIG_ZAG_MOTION",
  //       dominanHandDescription:
  //         "Mova a mão lateralmente para dentro e para fora duas vezes",
  //       nonDominanHandDescription:
  //         "Mova a mão lateralmente para dentro e para fora duas vezes",
  //       dominant: [{ x: -1 }, { x: 1 }, { x: -1 }],
  //       nondominant: [{ x: 1 }, { x: -1 }, { x: 1 }],
  //     },
  //     end: {
  //       dominant: {
  //         location: "same",
  //         handShape: "open_hand_cm",
  //         palmOrientation: PalmOrientation.UP,
  //       },
  //       nondominant: {
  //         location: "same",
  //         handShape: "open_hand_cm",
  //         palmOrientation: PalmOrientation.UP,
  //       },
  //     },
  //   },
  // },
  // {
  //   language: "Libras",
  //   token: "Gostar",
  //   steps: {
  //     start: {
  //       dominant: {
  //         location: "torax",
  //         bodyOffsetRadius: 100,
  //         handShape: "open_hand_thumb_apart_cm",
  //         palmOrientation: PalmOrientation.BACK,
  //       },
  //     },
  //     movement: {
  //       dominantCategory: "CIRCULAR_MOTION",
  //       dominanHandDescription:
  //         "faça um movimento circular com a mão colada ao seu corpo",
  //       dominant: [
  //         [
  //           { y: 1, x: 1 },
  //           { y: -1, x: 1 },
  //           { y: -1, x: -1 },
  //           { y: 1, x: -1 },
  //         ],
  //         [
  //           { y: 1, x: -1 },
  //           { y: -1, x: -1 },
  //           { y: -1, x: 1 },
  //           { y: 1, x: 1 },
  //         ],
  //       ],
  //       dominantPolicy: "CIRCULAR", // Posso começar o movimento de qualquer ponto do array
  //       nondominant: [],
  //     },
  //     end: {
  //       dominant: {
  //         location: "same",
  //         handShape: "open_hand_thumb_apart_cm",
  //         palmOrientation: PalmOrientation.BACK,
  //       },
  //     },
  //   },
  // },
  // {
  //   language: "Libras",
  //   token: "Rapido",
  //   steps: {
  //     start: {
  //       dominant: {
  //         location: "torax_upper",
  //         bodyOffsetRadius: 75,
  //         handShape: "claw_cm",
  //         palmOrientation: PalmOrientation.BACK,
  //       },
  //     },
  //     movement: {
  //       dominantCategory: "ZIG_ZAG_MOTION",
  //       dominanHandDescription: "mova a mão para baixo e para cima duas vezes",
  //       dominant: [{ y: -1 }, { y: 1 }, { y: -1 }, { y: 1 }],
  //       dominantPolicy: "CIRCULAR", // Posso começar o movimento de qualquer ponto do array
  //       nondominant: [],
  //     },
  //     end: {
  //       dominant: {
  //         location: "same",
  //         handShape: "claw_cm",
  //         palmOrientation: PalmOrientation.BACK,
  //       },
  //     },
  //   },
  // },
  // {
  //   language: "Libras",
  //   token: "Porque",
  // },
  // {
  //   language: "Libras",
  //   token: "Não",
  // },
  // {
  //   language: "Libras",
  //   token: "Tchau",
  // },
  // {
  //   language: "Libras",
  //   token: "Ter",
  // },
  // {
  //   language: "Libras",
  //   token: "Dia",
  // },
  // {
  //   language: "Libras",
  //   token: "Certeza",
  // },
];

export * from "./instruction";
export * from "./types";
