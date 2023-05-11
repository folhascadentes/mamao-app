export const HandshapeImages = {
  a_cm: [
    {
      label: "Visão frontal",
      path: "/handshapes/a_front.png",
    },
    {
      label: "Visão lateral",
      path: "/handshapes/a_side.png",
    },
  ],
  index_finger_cm: [
    {
      label: "Visão frontal",
      path: "/handshapes/index_finger_front.png",
    },
    {
      label: "Visão lateral",
      path: "/handshapes/index_finger_side.png",
    },
  ],
  l_cm: [
    {
      label: "Visão frontal",
      path: "/handshapes/l_front.png",
    },
    {
      label: "Visão lateral",
      path: "/handshapes/l_side.png",
    },
  ],
  middle_index_finger_cm: [
    {
      label: "Visão frontal",
      path: "/handshapes/middle_index_finger_front.png",
    },
    {
      label: "Visão lateral",
      path: "/handshapes/middle_index_finger_side.png",
    },
  ],
  o_cm: [
    {
      label: "Visão frontal",
      path: "/handshapes/o_front.png",
    },
    {
      label: "Visão lateral",
      path: "/handshapes/o_side.png",
    },
  ],
  oi_cm: [
    {
      label: "Visão frontal",
      path: "/handshapes/oi_front.png",
    },
    {
      label: "Visão lateral",
      path: "/handshapes/oi_side.png",
    },
  ],
  open_hand_fingers_apart_cm: [
    {
      label: "Visão frontal",
      path: "/handshapes/open_hand_fingers_apart_front.png",
    },
    {
      label: "Visão lateral",
      path: "/handshapes/open_hand_fingers_apart_side.png",
    },
  ],
  s_cm: [
    {
      label: "Visão frontal",
      path: "/handshapes/s_front.png",
    },
    {
      label: "Visão lateral",
      path: "/handshapes/s_side.png",
    },
  ],
  thumb_finger_cm: [
    {
      label: "Visão frontal",
      path: "/handshapes/thumbs_up_front.png",
    },
  ],
  y_cm: [
    {
      label: "Visão frontal",
      path: "/handshapes/y_front.png",
    },
    {
      label: "Visão lateral",
      path: "/handshapes/y_side.png",
    },
  ],
};

const PalmDirection = {
  OPPOSITE: { x: -1, y: 0, z: 0 },
  RIGHT: { x: 1, y: 0, z: 0 },
  FRONT: { x: 0, y: 0, z: 1 },
  BACK: { x: 0, y: 0, z: -1 },
  UP: { x: 0, y: 1, z: 0 },
  DOWN: { x: 0, y: -1, z: 0 },
};

export const PalmDirectionCategoryDescription = {
  OPPOSITE: "esquerda",
  RIGHT: "direita",
  FRONT: "frente",
  BACK: "si mesmo",
  UP: "cima",
  DOWN: "baixo",
};

export const signs = [
  {
    language: "Libras",
    token: "Oi",
    signSteps: {
      startPosition: {
        dominantHand: {
          bodyRegion: "torax",
          bodyOffsetRadius: 100,
          handConfiguration: "oi_cm",
          palmDirection: PalmDirection.OPPOSITE,
          palmDirectionCategory: "OPPOSITE",
        },
        nonDominantHand: {},
      },
      movements: {
        dominantHandCategory: "CIRCULAR_MOTION",
        dominanHandDescription: "faça um movimento circular em sentido horário",
        dominantHand: [
          { y: 1, x: 1 },
          { y: -1, x: 1 },
          { y: -1, x: -1 },
          { y: 1, x: -1 },
        ],
        nonDominantHand: [],
      },
      endPosition: {
        dominantHand: {
          bodyRegion: "same",
          handConfiguration: "oi_cm",
          palmDirection: PalmDirection.OPPOSITE,
          palmDirectionCategory: "OPPOSITE",
        },
        nonDominantHand: {},
      },
    },
  },
  {
    language: "Libras",
    token: "Bom",
    signSteps: {
      startPosition: {
        dominantHand: {
          bodyRegion: "chin",
          handConfiguration: "o_cm",
          palmDirection: PalmDirection.BACK,
          palmDirectionCategory: "BACK",
        },
        nonDominantHand: {},
      },
      movements: {
        dominantHandCategory: "PARABOLIC_MOTION",
        dominanHandDescription:
          "mova a mão até a outra bola laranja em um movimento parabólico e abrindo a mão",
        dominantHand: [{ y: -1, z: 1 }, { y: -1 }],
        nonDominantHand: [],
      },
      endPosition: {
        dominantHand: {
          bodyRegion: "torax_upper",
          bodyOffsetRadius: 65,
          handConfiguration: "open_hand_fingers_apart_cm",
          palmDirection: PalmDirection.UP,
          palmDirectionCategory: "UP",
        },
        nonDominantHand: {},
      },
    },
  },
  {
    language: "Libras",
    token: "Educado",
    signSteps: {
      startPosition: {
        dominantHand: {
          bodyRegion: "arm_upper",
          handConfiguration: "l_cm",
          palmDirection: PalmDirection.DOWN,
          palmDirectionCategory: "DOWN",
        },
        nonDominantHand: {
          bodyRegion: "torax_right_lower",
          handConfiguration: "a_cm",
          palmDirection: PalmDirection.DOWN,
          palmDirectionCategory: "DOWN",
        },
      },
      movements: {
        dominantHand: [{ z: 1 }],
        nonDominantHand: [],
      },
      endPosition: {
        dominantHand: {
          bodyRegion: "wrist",
          handConfiguration: "l_cm",
          palmDirection: PalmDirection.DOWN,
          palmDirectionCategory: "DOWN",
        },
        nonDominantHand: {
          bodyRegion: "same",
          handConfiguration: "a_cm",
          palmDirection: PalmDirection.DOWN,
          palmDirectionCategory: "DOWN",
        },
      },
    },
  },
  {
    language: "Libras",
    token: "Branco",
    signSteps: {
      startPosition: {
        dominantHand: {
          bodyRegion: "arm_upper",
          handConfiguration: "open_hand_fingers_apart_cm",
          palmDirection: PalmDirection.UP,
          palmDirectionCategory: "UP",
        },
        nonDominantHand: {
          bodyRegion: "torax_right_lower",
          bodyOffsetRadius: 30,
          handConfiguration: "s_cm",
          palmDirection: PalmDirection.DOWN,
          palmDirectionCategory: "DOWN",
        },
      },
      movements: {
        dominantHand: [{ x: 1 }, { x: 1 }],
        nonDominantHand: [],
      },
      endPosition: {
        dominantHand: {
          bodyRegion: "wrist",
          handConfiguration: "open_hand_fingers_apart_cm",
          palmDirection: PalmDirection.UP,
          palmDirectionCategory: "UP",
        },
        nonDominantHand: {
          bodyRegion: "same",
          handConfiguration: "s_cm",
          palmDirection: PalmDirection.DOWN,
          palmDirectionCategory: "DOWN",
        },
      },
    },
  },
  {
    language: "Libras",
    token: "Beleza",
    signSteps: {
      startPosition: {
        dominantHand: {
          bodyRegion: "torax",
          bodyOffsetRadius: 125,
          handConfiguration: "thumb_finger_cm",
          palmDirection: PalmDirection.BACK,
          palmDirectionCategory: "BACK",
        },
        nonDominantHand: {},
      },
      movements: {
        dominantHand: [],
        nonDominantHand: [],
      },
      endPosition: {
        dominantHand: {
          bodyRegion: "same",
          handConfiguration: "thumb_finger_cm",
          palmDirection: PalmDirection.BACK,
          palmDirectionCategory: "BACK",
        },
        nonDominantHand: {},
      },
    },
  },

  {
    language: "Libras",
    token: "Nome",
    signSteps: {
      startPosition: {
        dominantHand: {
          bodyRegion: "torax_left",
          bodyOffsetRadius: 75,
          handConfiguration: "middle_index_finger_cm",
          palmDirection: PalmDirection.FRONT,
          palmDirectionCategory: "FRONT",
        },
        nonDominantHand: {},
      },
      movements: {
        dominantHandCategory: "LINEAR_MOTION",
        dominanHandDescription: "mova a mão até a outra bola laranja",
        dominantHand: [{ x: 1 }, { x: 1 }, { x: 1 }],
        nonDominantHand: [],
      },
      endPosition: {
        dominantHand: {
          bodyRegion: "torax_right",
          bodyOffsetRadius: 75,
          handConfiguration: "middle_index_finger_cm",
          palmDirection: PalmDirection.FRONT,
          palmDirectionCategory: "FRONT",
        },
        nonDominantHand: {},
      },
    },
  },
  {
    language: "Libras",
    token: "Meu-nome",
    signSteps: {
      startPosition: {
        dominantHand: {
          bodyRegion: "torax_left",
          bodyOffsetRadius: 75,
          handConfiguration: "middle_index_finger_cm",
          palmDirection: PalmDirection.BACK,
          palmDirectionCategory: "BACK",
        },
        nonDominantHand: {},
      },
      movements: {
        dominantHandCategory: "LINEAR_MOTION",
        dominanHandDescription: "mova a mão até a outra bola laranja",
        dominantHand: [{ x: 1 }, { x: 1 }, { x: 1 }],
        nonDominantHand: [],
      },
      endPosition: {
        dominantHand: {
          bodyRegion: "torax_right",
          bodyOffsetRadius: 75,
          handConfiguration: "middle_index_finger_cm",
          palmDirection: PalmDirection.BACK,
          palmDirectionCategory: "BACK",
        },
        nonDominantHand: {},
      },
    },
  },
  {
    language: "Libras",
    token: "Você",
    signSteps: {
      startPosition: {
        dominantHand: {
          bodyRegion: "torax",
          bodyOffsetRadius: 75,
          handConfiguration: "index_finger_cm",
          palmDirection: PalmDirection.DOWN,
          palmDirectionCategory: "DOWN",
          pontingDirection: { x: 0, y: 0, z: 1 },
        },
        nonDominantHand: {},
      },
      movements: {
        dominantHandCategory: "LINEAR_MOTION",
        dominanHandDescription:
          "mova em direção oposta ao seu corpo e após isso volte a posição inicial",
        dominantHand: [{ z: 1 }, { z: -1 }],
        nonDominantHand: [],
      },
      endPosition: {
        dominantHand: {
          bodyRegion: "torax",
          bodyOffsetRadius: 75,
          handConfiguration: "index_finger_cm",
          palmDirection: PalmDirection.DOWN,
          palmDirectionCategory: "DOWN",
          pontingDirection: { x: 0, y: 0, z: 1 },
        },
        nonDominantHand: {},
      },
    },
  },
  {
    language: "Libras",
    token: "Eu",
    signSteps: {
      startPosition: {
        dominantHand: {
          bodyRegion: "torax",
          bodyOffsetRadius: 75,
          handConfiguration: "index_finger_cm",
          palmDirection: PalmDirection.RIGHT,
          palmDirectionCategory: "RIGHT",
          pontingDirection: { x: 0, y: 0, z: -1 },
        },
        nonDominantHand: {},
      },
      movements: {
        dominantHandCategory: "LINEAR_MOTION",
        dominanHandDescription:
          "mova em sua direção e após isso volte a posição inicial",
        dominantHand: [{ z: -1 }, { z: 1 }],
        nonDominantHand: [],
      },
      endPosition: {
        dominantHand: {
          bodyRegion: "torax",
          bodyOffsetRadius: 75,
          handConfiguration: "index_finger_cm",
          pontingDirection: { x: 0, y: 0, z: -1 },
        },
        nonDominantHand: {},
      },
    },
  },
  {
    language: "Libras",
    token: "Agosto",
    signSteps: {
      startPosition: {
        dominantHand: {
          bodyRegion: "torax_upper",
          bodyOffsetRadius: 75,
          handConfiguration: "a_cm",
          palmDirection: PalmDirection.BACK,
          palmDirectionCategory: "BACK",
        },
        nonDominantHand: {},
      },
      movements: {
        dominantHandCategory: "ZIG_ZAG_MOTION",
        dominanHandDescription: "mova a mão para baixo e para cima duas vezes",
        dominantHand: [{ y: -1 }, { y: 1 }, { y: -1 }, { y: 1 }],
        nonDominantHand: [],
      },
      endPosition: {
        dominantHand: {
          bodyRegion: "same",
          handConfiguration: "a_cm",
          palmDirection: PalmDirection.BACK,
          palmDirectionCategory: "BACK",
        },
        nonDominantHand: {},
      },
    },
  },
  {
    language: "Libras",
    token: "Avisar",
    signSteps: {
      startPosition: {
        dominantHand: {
          bodyRegion: "torax_upper",
          bodyOffsetRadius: 75,
          handConfiguration: "y_cm",
          palmDirection: PalmDirection.OPPOSITE,
          palmDirectionCategory: "OPPOSITE",
          pointingDirection: { x: 0, y: 1, z: 0 },
        },
        nonDominantHand: {},
      },
      movements: {
        dominantHandCategory: "PARABOLIC_MOTION",
        dominanHandDescription:
          "mova a mão até a outra bola laranja em um movimento parabólico para frente",
        dominantHand: [{ z: 1 }, { y: -1, z: 1 }],
        nonDominantHand: [],
      },
      endPosition: {
        dominantHand: {
          bodyRegion: "torax_lower",
          bodyOffsetRadius: 75,
          handConfiguration: "y_cm",
          palmDirection: PalmDirection.OPPOSITE,
          palmDirectionCategory: "OPPOSITE",
          pointingDirection: { x: 0, y: 1, z: 1 },
        },
        nonDominantHand: {},
      },
    },
  },
  {
    language: "Libras",
    token: "Me-avisar",
    signSteps: {
      startPosition: {
        dominantHand: {
          bodyRegion: "torax",
          bodyOffsetRadius: 75,
          handConfiguration: "y_cm",
          palmDirection: PalmDirection.OPPOSITE,
          palmDirectionCategory: "OPPOSITE",
          pointingDirection: { x: 0, y: 1, z: 1 },
        },
        nonDominantHand: {},
      },
      movements: {
        dominantHandCategory: "PARABOLIC_MOTION",
        dominanHandDescription:
          "mova a mão até a outra bola laranja em um movimento parabólico em sua direação",
        dominantHand: [{ y: 1, z: -1 }, { z: -1 }],
        nonDominantHand: [],
      },
      endPosition: {
        dominantHand: {
          bodyRegion: "torax_upper",
          bodyOffsetRadius: 75,
          handConfiguration: "y_cm",
          palmDirection: PalmDirection.OPPOSITE,
          palmDirectionCategory: "OPPOSITE",
          pointingDirection: { x: 0, y: 1, z: 0 },
        },
        nonDominantHand: {},
      },
    },
  },
  {
    language: "Libras",
    token: "Ainda",
    signSteps: {
      startPosition: {
        dominantHand: {
          bodyRegion: "chin",
          bodyOffsetRadius: 50,
          handConfiguration: "thumb_touch_index_fingers_closed_cm",
          palmDirection: PalmDirection.OPPOSITE,
          palmDirectionCategory: "OPPOSITE",
        },
        nonDominantHand: {},
      },
      movements: {
        dominantHandCategory: "LINAR_MOTION",
        dominanHandDescription:
          "mova a mão até o queixo tocando ele duas vezes",
        dominantHand: [{ z: -1 }, { z: 1 }, { z: -1 }],
        nonDominantHand: [],
      },
      endPosition: {
        dominantHand: {
          bodyRegion: "chin",
          handConfiguration: "thumb_touch_index_fingers_closed_cm",
          palmDirection: PalmDirection.OPPOSITE,
          palmDirectionCategory: "OPPOSITE",
        },
        nonDominantHand: {},
      },
    },
  },
  {
    language: "Libras",
    token: "Futuro",
    signSteps: {
      startPosition: {
        dominantHand: {
          bodyRegion: "torax_upper",
          bodyOffsetRadius: 50,
          handConfiguration: "f_cm",
          palmDirection: PalmDirection.OPPOSITE,
          palmDirectionCategory: "OPPOSITE",
        },
        nonDominantHand: {},
      },
      movements: {
        dominantHandCategory: "PARABOLIC_MOTION",
        dominanHandDescription:
          "mova a mão até a outra bola laranja em um movimento parabólico para frente",
        dominantHand: [{ z: -1 }, { z: 1 }, { z: -1 }],
        nonDominantHand: [],
      },
      endPosition: {
        dominantHand: {
          bodyRegion: "torax",
          bodyOffsetRadius: 50,
          handConfiguration: "f_cm",
          palmDirection: PalmDirection.OPPOSITE,
          palmDirectionCategory: "OPPOSITE",
        },
        nonDominantHand: {},
      },
    },
  },
];
