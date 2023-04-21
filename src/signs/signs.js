export const signs = [
  {
    language: "libras",
    token: "Oi",
    signSteps: {
      startPosition: {
        dominantHand: {
          bodyRegion: "torax",
          handConfiguration: "oi_cm",
          palmDirection: { x: -1, y: [-0.5, 0.5] },
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
          palmDirection: { x: -1, y: [-0.5, 0.5] },
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
          palmDirection: { z: -1 },
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
          palmDirection: { y: 1 },
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
          palmDirection: { z: -1 },
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
          palmDirection: { z: -1 },
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
          palmDirection: { z: 1 },
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
          palmDirection: { z: 1 },
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
          palmDirection: "user",
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
          palmDirection: "user",
        },
        nonDominantHand: {},
      },
    },
  },
];
