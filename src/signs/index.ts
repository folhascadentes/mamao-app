import {
  Location,
  HandShape,
  HandOrientation,
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
          location: Location.TORAX_LEFT,
          handShape: HandShape.libras.middleAndIndexFinger,
          palmOrientation: PalmOrientation.FRONT,
          handOrientation: HandOrientation.UP,
          options: {
            location: {
              radiusOffset: 75,
            },
          },
        },
      },
      movement: {
        dominant: {
          detect: [{ x: 1 }, { x: 1 }, { x: 1 }],
          forbidden: [{ x: -1 }],
          metadata: {
            description: "mova a mão até a outra bola laranja",
            type: "LIENAR_MOTION",
          },
        },
      },
      end: {
        dominant: {
          location: Location.TORAX_RIGHT,
          handShape: HandShape.libras.middleAndIndexFinger,
          palmOrientation: PalmOrientation.FRONT,
          options: {
            location: {
              radiusOffset: 75,
            },
          },
        },
      },
    },
  },
  // {
  //   language: "Libras",
  //   token: "Meu-nome",
  //   signSteps: {
  //     startPosition: {
  //       dominantHand: {
  //         bodyRegion: "torax_left",
  //         bodyOffsetRadius: 75,
  //         handConfiguration: "middle_index_finger_cm",
  //         palmDirection: PalmDirection.BACK,
  //         palmDirectionCategory: "BACK",
  //       },
  //       nonDominantHand: {},
  //     },
  //     movements: {
  //       dominantHandCategory: "LINEAR_MOTION",
  //       dominanHandDescription: "mova a mão até a outra bola laranja",
  //       dominantHand: [{ x: 1 }, { x: 1 }, { x: 1 }],
  //       nonDominantHand: [],
  //     },
  //     endPosition: {
  //       dominantHand: {
  //         bodyRegion: "torax_right",
  //         bodyOffsetRadius: 75,
  //         handConfiguration: "middle_index_finger_cm",
  //         palmDirection: PalmDirection.BACK,
  //         palmDirectionCategory: "BACK",
  //       },
  //       nonDominantHand: {},
  //     },
  //   },
  // },
  // {
  //   language: "Libras",
  //   token: "Oi",
  //   signSteps: {
  //     startPosition: {
  //       dominantHand: {
  //         bodyRegion: "torax",
  //         bodyOffsetRadius: 100,
  //         handConfiguration: "oi_cm",
  //         palmDirection: PalmDirection.OPPOSITE,
  //         palmDirectionCategory: "OPPOSITE",
  //       },
  //       nonDominantHand: {},
  //     },
  //     movements: {
  //       dominantHandCategory: "CIRCULAR_MOTION",
  //       dominanHandDescription: "faça um movimento circular",
  //       dominantHand: [
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
  //       dominantHandPolicy: "CIRCULAR", // Posso começar o movimento de qualquer ponto do array
  //       nonDominantHand: [],
  //     },
  //     endPosition: {
  //       dominantHand: {
  //         bodyRegion: "same",
  //         handConfiguration: "oi_cm",
  //         palmDirection: PalmDirection.OPPOSITE,
  //         palmDirectionCategory: "OPPOSITE",
  //       },
  //       nonDominantHand: {},
  //     },
  //   },
  // },
  // {
  //   language: "Libras",
  //   token: "Bom",
  //   signSteps: {
  //     startPosition: {
  //       dominantHand: {
  //         bodyRegion: "chin",
  //         handConfiguration: "o_cm",
  //         palmDirection: PalmDirection.BACK,
  //         palmDirectionCategory: "BACK",
  //       },
  //       nonDominantHand: {},
  //     },
  //     movements: {
  //       dominantHandCategory: "PARABOLIC_MOTION",
  //       dominanHandDescription:
  //         "mova a mão até a outra bola laranja em um movimento parabólico e abrindo a mão",
  //       dominantHand: [{ y: -1, z: 1 }, { y: -1 }],
  //       nonDominantHand: [],
  //     },
  //     endPosition: {
  //       dominantHand: {
  //         bodyRegion: "torax_upper",
  //         bodyOffsetRadius: 65,
  //         handConfiguration: "open_hand_fingers_apart_cm",
  //         palmDirection: PalmDirection.UP,
  //         palmDirectionCategory: "UP",
  //       },
  //       nonDominantHand: {},
  //     },
  //   },
  // },
  // {
  //   language: "Libras",
  //   token: "Você",
  //   signSteps: {
  //     startPosition: {
  //       dominantHand: {
  //         bodyRegion: "torax",
  //         bodyOffsetRadius: 30,
  //         handConfiguration: "index_finger_cm",
  //         palmDirection: PalmDirection.DOWN,
  //         palmDirectionCategory: "DOWN",
  //         pontingDirection: { x: 0, y: 0, z: 1 },
  //       },
  //       nonDominantHand: {},
  //     },
  //     movements: {
  //       dominantHandCategory: "LINEAR_MOTION",
  //       dominanHandDescription:
  //         "mova em direção oposta ao seu corpo e após isso volte a posição inicial",
  //       dominantHand: [{ z: 1 }, { z: -1 }],
  //       nonDominantHand: [],
  //     },
  //     endPosition: {
  //       dominantHand: {
  //         bodyRegion: "torax",
  //         bodyOffsetRadius: 90,
  //         handConfiguration: "index_finger_cm",
  //         palmDirection: PalmDirection.DOWN,
  //         palmDirectionCategory: "DOWN",
  //         pontingDirection: { x: 0, y: 0, z: 1 },
  //       },
  //       nonDominantHand: {},
  //     },
  //   },
  // },
  // {
  //   language: "Libras",
  //   token: "Eu",
  //   signSteps: {
  //     startPosition: {
  //       dominantHand: {
  //         bodyRegion: "torax",
  //         bodyOffsetRadius: 30,
  //         handConfiguration: "index_finger_cm",
  //         palmDirection: PalmDirection.RIGHT,
  //         palmDirectionCategory: "RIGHT",
  //         pontingDirection: { x: 0, y: 0, z: -1 },
  //       },
  //       nonDominantHand: {},
  //     },
  //     movements: {
  //       dominantHandCategory: "LINEAR_MOTION",
  //       dominanHandDescription:
  //         "mova em sua direção e após isso volte a posição inicial",
  //       dominantHand: [{ z: -1 }, { z: 1 }],
  //       nonDominantHand: [],
  //     },
  //     endPosition: {
  //       dominantHand: {
  //         bodyRegion: "torax",
  //         bodyOffsetRadius: 90,
  //         handConfiguration: "index_finger_cm",
  //         pontingDirection: { x: 0, y: 0, z: -1 },
  //       },
  //       nonDominantHand: {},
  //     },
  //   },
  // },
  // {
  //   language: "Libras",
  //   token: "Agosto",
  //   signSteps: {
  //     startPosition: {
  //       dominantHand: {
  //         bodyRegion: "torax_upper",
  //         bodyOffsetRadius: 75,
  //         handConfiguration: "a_cm",
  //         palmDirection: PalmDirection.BACK,
  //         palmDirectionCategory: "BACK",
  //       },
  //       nonDominantHand: {},
  //     },
  //     movements: {
  //       dominantHandCategory: "ZIG_ZAG_MOTION",
  //       dominanHandDescription: "mova a mão para baixo e para cima duas vezes",
  //       dominantHand: [{ y: -1 }, { y: 1 }, { y: -1 }, { y: 1 }],
  //       dominantHandPolicy: "CIRCULAR", // Posso começar o movimento de qualquer ponto do array
  //       nonDominantHand: [],
  //     },
  //     endPosition: {
  //       dominantHand: {
  //         bodyRegion: "same",
  //         handConfiguration: "a_cm",
  //         palmDirection: PalmDirection.BACK,
  //         palmDirectionCategory: "BACK",
  //       },
  //       nonDominantHand: {},
  //     },
  //   },
  // },
  // {
  //   language: "Libras",
  //   token: "Avisar",
  //   signSteps: {
  //     startPosition: {
  //       dominantHand: {
  //         bodyRegion: "torax_upper",
  //         bodyOffsetRadius: 50,
  //         handConfiguration: "y_cm",
  //         palmDirection: PalmDirection.OPPOSITE,
  //         palmDirectionCategory: "OPPOSITE",
  //         pointingDirection: { x: 0, y: 1, z: 0 },
  //       },
  //       nonDominantHand: {},
  //     },
  //     movements: {
  //       dominantHandCategory: "PARABOLIC_MOTION",
  //       dominanHandDescription:
  //         "mova a mão até a outra bola laranja em um movimento parabólico para frente",
  //       dominantHand: [{ z: 1 }, { y: -1, z: 1 }],
  //       nonDominantHand: [],
  //     },
  //     endPosition: {
  //       dominantHand: {
  //         bodyRegion: "torax_lower",
  //         bodyOffsetRadius: 75,
  //         handConfiguration: "y_cm",
  //         palmDirection: PalmDirection.OPPOSITE,
  //         palmDirectionCategory: "OPPOSITE",
  //         pointingDirection: { x: 0, y: 1, z: 1 },
  //       },
  //       nonDominantHand: {},
  //     },
  //   },
  // },
  // {
  //   language: "Libras",
  //   token: "Me-avisar",
  //   signSteps: {
  //     startPosition: {
  //       dominantHand: {
  //         bodyRegion: "torax",
  //         bodyOffsetRadius: 50,
  //         handConfiguration: "y_cm",
  //         palmDirection: PalmDirection.OPPOSITE,
  //         palmDirectionCategory: "OPPOSITE",
  //         pointingDirection: { x: 0, y: 1, z: 1 },
  //       },
  //       nonDominantHand: {},
  //     },
  //     movements: {
  //       dominantHandCategory: "PARABOLIC_MOTION",
  //       dominanHandDescription:
  //         "mova a mão até a outra bola laranja em um movimento parabólico em sua direação",
  //       dominantHand: [{ y: 1, z: -1 }, { z: -1 }],
  //       nonDominantHand: [],
  //     },
  //     endPosition: {
  //       dominantHand: {
  //         bodyRegion: "torax_upper",
  //         bodyOffsetRadius: 75,
  //         handConfiguration: "y_cm",
  //         palmDirection: PalmDirection.OPPOSITE,
  //         palmDirectionCategory: "OPPOSITE",
  //         pointingDirection: { x: 0, y: 1, z: 0 },
  //       },
  //       nonDominantHand: {},
  //     },
  //   },
  // },
  // {
  //   language: "Libras",
  //   token: "Beleza",
  //   signSteps: {
  //     startPosition: {
  //       dominantHand: {
  //         bodyRegion: "torax",
  //         bodyOffsetRadius: 125,
  //         handConfiguration: "thumb_finger_cm",
  //         palmDirection: PalmDirection.BACK,
  //         palmDirectionCategory: "BACK",
  //       },
  //       nonDominantHand: {},
  //     },
  //     movements: {
  //       dominantHand: [],
  //       nonDominantHand: [],
  //     },
  //     endPosition: {
  //       dominantHand: {
  //         bodyRegion: "same",
  //         handConfiguration: "thumb_finger_cm",
  //         palmDirection: PalmDirection.BACK,
  //         palmDirectionCategory: "BACK",
  //       },
  //       nonDominantHand: {},
  //     },
  //   },
  // },
  // {
  //   language: "Libras",
  //   token: "Educado",
  //   signSteps: {
  //     startPosition: {
  //       dominantHand: {
  //         bodyRegion: ["shoulder", "elbow"],
  //         bodyRegionTrack: true,
  //         handConfiguration: "l_cm",
  //         palmDirection: PalmDirection.DOWN,
  //         palmDirectionCategory: "DOWN",
  //       },
  //       nonDominantHand: {
  //         bodyRegion: "torax_right_lower",
  //         handConfiguration: ["a_cm", "s_cm"],
  //         palmDirection: PalmDirection.DOWN,
  //         palmDirectionCategory: "DOWN",
  //       },
  //     },
  //     movements: {
  //       dominantHandCategory: "LINEAR_MOTION",
  //       dominanHandDescription:
  //         "Mova a mão dominante colada ao braço até o pulso da mão não dominante",
  //       dominantHand: [],
  //       nonDominantHand: [],
  //     },
  //     endPosition: {
  //       dominantHand: {
  //         bodyRegion: "wrist",
  //         handConfiguration: "l_cm",
  //         palmDirection: PalmDirection.DOWN,
  //         palmDirectionCategory: "DOWN",
  //       },
  //       nonDominantHand: {
  //         bodyRegion: "same",
  //         handConfiguration: ["a_cm", "s_cm"],
  //         palmDirection: PalmDirection.DOWN,
  //         palmDirectionCategory: "DOWN",
  //       },
  //     },
  //   },
  // },
  // {
  //   language: "Libras",
  //   token: "Branco",
  //   signSteps: {
  //     startPosition: {
  //       dominantHand: {
  //         bodyRegion: ["shoulder", "elbow"],
  //         bodyRegionTrack: true,
  //         handConfiguration: [
  //           "open_hand_cm",
  //           "open_hand_thumb_apart_cm",
  //           "open_hand_fingers_apart_cm",
  //         ],
  //         palmDirection: PalmDirection.UP,
  //         palmDirectionCategory: "UP",
  //       },
  //       nonDominantHand: {
  //         bodyRegion: "torax_right_lower",
  //         bodyOffsetRadius: 30,
  //         handConfiguration: ["a_cm", "s_cm"],
  //         palmDirection: PalmDirection.DOWN,
  //         palmDirectionCategory: "DOWN",
  //       },
  //     },
  //     movements: {
  //       dominantHandCategory: "LINEAR_MOTION",
  //       dominanHandDescription:
  //         "Mova a mão dominante colada ao braço até o pulso da mão não dominante",
  //       dominantHand: [],
  //       nonDominantHand: [],
  //     },
  //     endPosition: {
  //       dominantHand: {
  //         bodyRegion: "wrist",
  //         handConfiguration: [
  //           "open_hand_cm",
  //           "open_hand_thumb_apart_cm",
  //           "open_hand_fingers_apart_cm",
  //         ],
  //         palmDirection: PalmDirection.UP,
  //         palmDirectionCategory: "UP",
  //       },
  //       nonDominantHand: {
  //         bodyRegion: "same",
  //         handConfiguration: ["a_cm", "s_cm"],
  //         palmDirection: PalmDirection.DOWN,
  //         palmDirectionCategory: "DOWN",
  //       },
  //     },
  //   },
  // },
  // {
  //   language: "Libras",
  //   token: "Ainda",
  //   signSteps: {
  //     startPosition: {
  //       dominantHand: {
  //         bodyRegion: "chin",
  //         bodyOffsetRadius: 50,
  //         handConfiguration: "thumb_touch_index_fingers_closed_cm",
  //         palmDirection: PalmDirection.OPPOSITE,
  //         palmDirectionCategory: "OPPOSITE",
  //       },
  //       nonDominantHand: {},
  //     },
  //     movements: {
  //       dominantHandCategory: "LINAR_MOTION",
  //       dominanHandDescription:
  //         "mova a mão até o queixo tocando ele duas vezes",
  //       dominantHand: [{ z: -1 }, { z: 1 }, { z: -1 }],
  //       nonDominantHand: [],
  //     },
  //     endPosition: {
  //       dominantHand: {
  //         bodyRegion: "chin",
  //         handConfiguration: "thumb_touch_index_fingers_closed_cm",
  //         palmDirection: PalmDirection.OPPOSITE,
  //         palmDirectionCategory: "OPPOSITE",
  //       },
  //       nonDominantHand: {},
  //     },
  //   },
  // },
  // {
  //   language: "Libras",
  //   token: "Futuro",
  //   signSteps: {
  //     startPosition: {
  //       dominantHand: {
  //         bodyRegion: "torax_upper",
  //         bodyOffsetRadius: 30,
  //         handConfiguration: "f_cm",
  //         palmDirection: PalmDirection.OPPOSITE,
  //         palmDirectionCategory: "OPPOSITE",
  //       },
  //       nonDominantHand: {},
  //     },
  //     movements: {
  //       dominantHandCategory: "PARABOLIC_MOTION",
  //       dominanHandDescription:
  //         "mova a mão até a outra bola laranja em um movimento parabólico para frente",
  //       dominantHand: [{ z: -1 }, { z: 1 }, { z: -1 }],
  //       nonDominantHand: [],
  //     },
  //     endPosition: {
  //       dominantHand: {
  //         bodyRegion: "torax_lower",
  //         bodyOffsetRadius: 90,
  //         handConfiguration: "f_cm",
  //         palmDirection: PalmDirection.OPPOSITE,
  //         palmDirectionCategory: "OPPOSITE",
  //       },
  //       nonDominantHand: {},
  //     },
  //   },
  // },
  // {
  //   language: "Libras",
  //   token: "Hoje",
  //   signSteps: {
  //     startPosition: {
  //       dominantHand: {
  //         bodyRegion: "torax",
  //         bodyOffsetVertical: 50,
  //         handConfiguration: "open_hand_cm",
  //         palmDirection: PalmDirection.UP,
  //         palmDirectionCategory: "UP",
  //       },
  //       nonDominantHand: {
  //         bodyRegion: "side",
  //         handConfiguration: "open_hand_cm",
  //         palmDirection: PalmDirection.UP,
  //         palmDirectionCategory: "UP",
  //       },
  //     },
  //     movements: {
  //       dominantHandCategory: "ZIG_ZAG_MOTION",
  //       nonDominantHandCategory: "ZIG_ZAG_MOTION",
  //       dominanHandDescription:
  //         "Mova a mão lateralmente para dentro e para fora duas vezes",
  //       nonDominanHandDescription:
  //         "Mova a mão lateralmente para dentro e para fora duas vezes",
  //       dominantHand: [{ x: -1 }, { x: 1 }, { x: -1 }],
  //       nonDominantHand: [{ x: 1 }, { x: -1 }, { x: 1 }],
  //     },
  //     endPosition: {
  //       dominantHand: {
  //         bodyRegion: "same",
  //         handConfiguration: "open_hand_cm",
  //         palmDirection: PalmDirection.UP,
  //         palmDirectionCategory: "UP",
  //       },
  //       nonDominantHand: {
  //         bodyRegion: "same",
  //         handConfiguration: "open_hand_cm",
  //         palmDirection: PalmDirection.UP,
  //         palmDirectionCategory: "UP",
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
  //   token: "Sim",
  //   signSteps: {
  //     startPosition: {
  //       dominantHand: {
  //         bodyRegion: "torax_left",
  //         bodyOffsetRadius: 50,
  //         handConfiguration: "s_cm",
  //         palmDirection: PalmDirection.FRONT,
  //         palmDirectionCategory: "FRONT",
  //       },
  //       nonDominantHand: {},
  //     },
  //     movements: {
  //       dominantHandCategory: "WRIST_MOTION",
  //       dominanHandDescription: "",
  //       dominantHand: [],
  //       nonDominantHand: [],
  //     },
  //     endPosition: {
  //       dominantHand: {
  //         bodyRegion: "same",
  //         handConfiguration: "s_cm",
  //         palmDirection: PalmDirection.FRONT,
  //         palmDirectionCategory: "FRONT",
  //       },
  //       nonDominantHand: {},
  //     },
  //   },
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
  //   token: "Gostar",
  //   signSteps: {
  //     startPosition: {
  //       dominantHand: {
  //         bodyRegion: "torax",
  //         bodyOffsetRadius: 100,
  //         handConfiguration: "open_hand_thumb_apart_cm",
  //         palmDirection: PalmDirection.BACK,
  //         palmDirectionCategory: "BACK",
  //       },
  //       nonDominantHand: {},
  //     },
  //     movements: {
  //       dominantHandCategory: "CIRCULAR_MOTION",
  //       dominanHandDescription:
  //         "faça um movimento circular com a mão colada ao seu corpo",
  //       dominantHand: [
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
  //       dominantHandPolicy: "CIRCULAR", // Posso começar o movimento de qualquer ponto do array
  //       nonDominantHand: [],
  //     },
  //     endPosition: {
  //       dominantHand: {
  //         bodyRegion: "same",
  //         handConfiguration: "open_hand_thumb_apart_cm",
  //         palmDirection: PalmDirection.BACK,
  //         palmDirectionCategory: "BACK",
  //       },
  //       nonDominantHand: {},
  //     },
  //   },
  // },
  // {
  //   language: "Libras",
  //   token: "Meu",
  //   signSteps: {
  //     startPosition: {
  //       dominantHand: {
  //         bodyRegion: "torax",
  //         bodyOffsetRadius: 30,
  //         handConfiguration: "open_hand_thumb_apart_cm",
  //         palmDirection: PalmDirection.BACK,
  //         palmDirectionCategory: "BACK",
  //       },
  //       nonDominantHand: {},
  //     },
  //     movements: {
  //       dominantHandCategory: "LINEAR_MOTION",
  //       dominanHandDescription:
  //         "mova em sua direção e após isso volte a posição inicial",
  //       dominantHand: [{ z: -1 }, { z: 1 }],
  //       nonDominantHand: [],
  //     },
  //     endPosition: {
  //       dominantHand: {
  //         bodyRegion: "same",
  //         handConfiguration: "open_hand_thumb_apart_cm",
  //         palmDirection: PalmDirection.BACK,
  //         palmDirectionCategory: "BACK",
  //       },
  //       nonDominantHand: {},
  //     },
  //   },
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
  //   token: "Rapido",
  //   signSteps: {
  //     startPosition: {
  //       dominantHand: {
  //         bodyRegion: "torax_upper",
  //         bodyOffsetRadius: 75,
  //         handConfiguration: "claw_cm",
  //         palmDirection: PalmDirection.BACK,
  //         palmDirectionCategory: "BACK",
  //       },
  //       nonDominantHand: {},
  //     },
  //     movements: {
  //       dominantHandCategory: "ZIG_ZAG_MOTION",
  //       dominanHandDescription: "mova a mão para baixo e para cima duas vezes",
  //       dominantHand: [{ y: -1 }, { y: 1 }, { y: -1 }, { y: 1 }],
  //       dominantHandPolicy: "CIRCULAR", // Posso começar o movimento de qualquer ponto do array
  //       nonDominantHand: [],
  //     },
  //     endPosition: {
  //       dominantHand: {
  //         bodyRegion: "same",
  //         handConfiguration: "claw_cm",
  //         palmDirection: PalmDirection.BACK,
  //         palmDirectionCategory: "BACK",
  //       },
  //       nonDominantHand: {},
  //     },
  //   },
  // },
  // {
  //   language: "Libras",
  //   token: "Certeza",
  // },
];

export * from "./instruction";
export * from "./types";
