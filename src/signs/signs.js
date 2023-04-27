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
          handConfiguration: "s_cm",
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
          bodyRegion: "upper_torax",
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
          bodyRegion: "torax_up",
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
          bodyRegion: "torax_up",
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
          bodyRegion: "torax_up",
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
          bodyRegion: "torax_up",
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
          bodyRegion: "torax_up",
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
          bodyRegion: "torax_up",
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
