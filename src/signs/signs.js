// STATES
// CHECK_START -> CHECK_IF_MOVIMENT -> CHECK_MOVIMENT -> CHECK_END -> CHECK_TIME
export const signs = {
  oi: {
    language: "libras",
    token: "oi",
    sign: [
      {
        start: {
          region: "torax",
          configuration: "oi_cm",
          palm: "left",
        },
        moviment: ["UP", "RIGHT", "DOWN", "LEFT"],
        end: {
          region: "torax",
          configuration: "oi_cm",
          palm: "left",
        },
      },
    ],
  },
  bom: {
    language: "libras",
    token: "bom",
    sign: [
      {
        start: {
          region: "chin",
          configuration: "s_cm",
        },
        moviment: ["DOWN"], // LINEAR,
        end: {
          region: "upper_torax",
          configuration: "open_hand_finger_apart_cm",
          palm: "up",
        },
      },
    ],
  },
  beleza: {
    language: "libras",
    token: "beleza",
    sign: [
      {
        start: {
          region: "torax",
          configuration: "thumbs_up_cm",
          palm: "user",
        },
        end: {
          region: "torax",
          configuration: "thumbs_up_cm",
          palm: "user",
        },
      },
    ],
  },
  nome: {
    language: "libras",
    token: "nome",
    sign: [
      {
        start: {
          region: "torax_left",
          configuration: "middle_index_finger_cm",
          palm: "camera",
        },
        moviment: ["RIGHT"],
        end: {
          region: "torax_right",
          configuration: "middle_index_finger_cm",
          palm: "camera",
        },
      },
    ],
  },
  meuNome: {
    language: "libras",
    token: "meu nome",
    sign: [
      {
        start: {
          region: "torax_left",
          configuration: "middle_index_finger_cm",
          palm: "user",
        },
        moviment: ["RIGHT"],
        end: {
          region: "torax_right",
          configuration: "middle_index_finger_cm",
          palm: "user",
        },
      },
    ],
  },
};
