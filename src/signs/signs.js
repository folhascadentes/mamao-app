export const handshapeImages = {
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
  thumbs_up_cm: [
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

export const signs = [
  {
    language: "libras",
    token: "Oi",
    signSteps: {
      startPosition: {
        dominantHand: {
          bodyRegion: "torax",
          handConfiguration: "oi_cm",
          palmDirection: { x: -1, y: 0, z: 0 },
        },
        nonDominantHand: {},
      },
      movements: {
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
          bodyRegion: "torax",
          handConfiguration: "oi_cm",
          palmDirection: { x: -1, y: 0, z: 0 },
        },
        nonDominantHand: {},
      },
    },
  },
  {
    language: "libras",
    token: "Bom",
    signSteps: {
      startPosition: {
        dominantHand: {
          bodyRegion: "chin",
          handConfiguration: "o_cm",
          palmDirection: { z: -1, x: 0, y: 0 },
        },
        nonDominantHand: {},
      },
      movements: {
        dominantHand: [{ y: -1 }],
        nonDominantHand: [],
      },
      endPosition: {
        dominantHand: {
          bodyRegion: "torax_upper",
          handConfiguration: "open_hand_finger_apart_cm",
          palmDirection: { y: 1, x: 0, z: 0 },
        },
        nonDominantHand: {},
      },
    },
  },
  {
    language: "libras",
    token: "Beleza",
    signSteps: {
      startPosition: {
        dominantHand: {
          bodyRegion: "torax",
          handConfiguration: "thumbs_up_cm",
          palmDirection: { z: -1, x: 0, y: 0 },
        },
        nonDominantHand: {},
      },
      movements: {
        dominantHand: [],
        nonDominantHand: [],
      },
      endPosition: {
        dominantHand: {
          bodyRegion: "torax",
          handConfiguration: "thumbs_up_cm",
          palmDirection: { z: -1, x: 0, y: 0 },
        },
        nonDominantHand: {},
      },
    },
  },
  {
    language: "libras",
    token: "Nome",
    signSteps: {
      startPosition: {
        dominantHand: {
          bodyRegion: "torax_left",
          handConfiguration: "middle_index_finger_cm",
          palmDirection: { z: 1, x: 0, y: 0 },
        },
        nonDominantHand: {},
      },
      movements: {
        dominantHand: [{ x: 1 }],
        nonDominantHand: [],
      },
      endPosition: {
        dominantHand: {
          bodyRegion: "torax_right",
          handConfiguration: "middle_index_finger_cm",
          palmDirection: { z: 1, x: 0, y: 0 },
        },
        nonDominantHand: {},
      },
    },
  },
  {
    language: "libras",
    token: "Meu nome",
    signSteps: {
      startPosition: {
        dominantHand: {
          bodyRegion: "torax_left",
          handConfiguration: "middle_index_finger_cm",
          palmDirection: { z: -1, x: 0, y: 0 },
        },
        nonDominantHand: {},
      },
      movements: {
        dominantHand: [{ x: 1 }],
        nonDominantHand: [],
      },
      endPosition: {
        dominantHand: {
          bodyRegion: "torax_right",
          handConfiguration: "middle_index_finger_cm",
          palmDirection: { z: -1, x: 0, y: 0 },
        },
        nonDominantHand: {},
      },
    },
  },
  {
    language: "libras",
    token: "Eu",
    signSteps: {
      startPosition: {
        dominantHand: {
          bodyRegion: "torax",
          handConfiguration: "index_finger_cm",
          pontingDirection: { x: 0, y: 0, z: -1 },
        },
        nonDominantHand: {},
      },
      movements: {
        dominantHand: [{ z: -1 }],
        nonDominantHand: [],
      },
      endPosition: {
        dominantHand: {
          bodyRegion: "torax",
          handConfiguration: "index_finger_cm",
          pontingDirection: { x: 0, y: 0, z: -1 },
        },
        nonDominantHand: {},
      },
    },
  },
  {
    language: "libras",
    token: "Você",
    signSteps: {
      startPosition: {
        dominantHand: {
          bodyRegion: "torax",
          handConfiguration: "index_finger_cm",
          pontingDirection: { x: 0, y: 0, z: 1 },
        },
        nonDominantHand: {},
      },
      movements: {
        dominantHand: [{ z: 1 }],
        nonDominantHand: [],
      },
      endPosition: {
        dominantHand: {
          bodyRegion: "torax",
          handConfiguration: "index_finger_cm",
          pontingDirection: { x: 0, y: 0, z: 1 },
        },
        nonDominantHand: {},
      },
    },
  },
  {
    language: "libras",
    token: "Agosto",
    signSteps: {
      startPosition: {
        dominantHand: {
          bodyRegion: "torax_upper",
          handConfiguration: "a_cm",
          palmDirection: { x: 0, y: 0, z: -1 },
        },
        nonDominantHand: {},
      },
      movements: {
        dominantHand: [{ y: -1 }, { y: 1 }, { y: -1 }, { y: 1 }],
        nonDominantHand: [],
      },
      endPosition: {
        dominantHand: {
          bodyRegion: "torax_upper",
          handConfiguration: "a_cm",
          palmDirection: { x: 0, y: 0, z: -1 },
        },
        nonDominantHand: {},
      },
    },
  },
  {
    language: "libras",
    token: "Avisar",
    signSteps: {
      startPosition: {
        dominantHand: {
          bodyRegion: "torax_upper",
          handConfiguration: "y_cm",
          palmDirection: { x: -1, y: 0, z: 0 },
          pointingDirection: { x: 0, y: 1, z: 0 },
        },
        nonDominantHand: {},
      },
      movements: {
        dominantHand: [{ z: 1 }],
        nonDominantHand: [],
      },
      endPosition: {
        dominantHand: {
          bodyRegion: "torax_upper",
          handConfiguration: "y_cm",
          palmDirection: { x: -1, y: 0, z: 0 },
          pointingDirection: { x: 0, y: 1, z: 1 },
        },
        nonDominantHand: {},
      },
    },
  },
  {
    language: "libras",
    token: "Me Avisar",
    signSteps: {
      startPosition: {
        dominantHand: {
          bodyRegion: "torax_upper",
          handConfiguration: "y_cm",
          palmDirection: { x: -1, y: 0, z: 0 },
          pointingDirection: { x: 0, y: 1, z: 1 },
        },
        nonDominantHand: {},
      },
      movements: {
        dominantHand: [{ z: -1 }],
        nonDominantHand: [],
      },
      endPosition: {
        dominantHand: {
          bodyRegion: "torax_upper",
          handConfiguration: "y_cm",
          palmDirection: { x: -1, y: 0, z: 0 },
          pointingDirection: { x: 0, y: 1, z: 0 },
        },
        nonDominantHand: {},
      },
    },
  },
  {
    language: "libras",
    token: "Branco",
    signSteps: {
      startPosition: {
        dominantHand: {
          bodyRegion: "arm_upper",
          handConfiguration: "open_hand_fingers_apart_cm",
          palmDirection: { x: 0, y: 1, z: 0 },
        },
        nonDominantHand: {
          bodyRegion: "arm_extended",
          handConfiguration: "s_cm",
          palmDirection: { x: 0, y: -1, z: 0 },
        },
      },
      movements: {
        dominantHand: [{ z: 1 }],
        nonDominantHand: [],
      },
      endPosition: {
        dominantHand: {
          bodyRegion: "wrist",
          handConfiguration: "open_hand_fingers_apart_cm",
          palmDirection: { x: 0, y: 1, z: 0 },
        },
        nonDominantHand: {
          bodyRegion: "arm_extended",
          handConfiguration: "s_cm",
          palmDirection: { x: 0, y: -1, z: 0 },
        },
      },
    },
  },
  {
    language: "libras",
    token: "Branco",
    signSteps: {
      startPosition: {
        dominantHand: {
          bodyRegion: "arm_upper",
          handConfiguration: "open_hand_fingers_apart_cm",
          palmDirection: { x: 0, y: 1, z: 0 },
        },
        nonDominantHand: {
          bodyRegion: "arm_extended",
          handConfiguration: "l_cm",
          palmDirection: { x: 0, y: -1, z: 0 },
        },
      },
      movements: {
        dominantHand: [{ z: 1 }],
        nonDominantHand: [],
      },
      endPosition: {
        dominantHand: {
          bodyRegion: "wrist",
          handConfiguration: "open_hand_fingers_apart_cm",
          palmDirection: { x: 0, y: 1, z: 0 },
        },
        nonDominantHand: {
          bodyRegion: "arm_extended",
          handConfiguration: "l_cm",
          palmDirection: { x: 0, y: -1, z: 0 },
        },
      },
    },
  },
];
