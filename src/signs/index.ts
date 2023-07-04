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
  // {
  //   language: "Libras",
  //   token: "Meu",
  //   steps: {
  //     start: {
  //       dominant: {
  //         location: Location.TORAX,
  //         handShape: HandShape.libras.OPEN_HAND_FINGERS_APART,
  //         palmOrientation: PalmOrientation.BACK,
  //         options: {
  //           location: {
  //             detectionRadius: 80,
  //             radiusOffset: 100,
  //           },
  //         },
  //       },
  //     },
  //     movement: {
  //       dominant: {
  //         detect: [{ z: -1 }, { z: 1 }],
  //         metadata: {
  //           description:
  //             "mova em sua direção e após isso volte a posição inicial",
  //           type: MovementType.LINEAR_MOTION,
  //         },
  //       },
  //     },
  //     end: {
  //       dominant: {
  //         location: Location.TORAX,
  //         handShape: HandShape.libras.OPEN_HAND_FINGERS_APART,
  //         palmOrientation: PalmOrientation.BACK,
  //         options: {
  //           location: {
  //             detectionRadius: 80,
  //             same: true,
  //           },
  //         },
  //       },
  //     },
  //   },
  // },
  // {
  //   language: "Libras",
  //   token: "Sentimento",
  //   steps: {
  //     start: {
  //       dominant: {
  //         location: Location.TORAX,
  //         handShape: HandShape.libras.CLAW,
  //         palmOrientation: PalmOrientation.BACK,
  //         options: {
  //           location: {
  //             detectionRadius: 80,
  //             radiusOffset: 100,
  //           },
  //         },
  //       },
  //     },
  //     movement: {
  //       dominant: {
  //         detect: [{ z: -1 }, { z: 1 }, { z: -1 }],
  //         metadata: {
  //           description: "bata no peito duas vezes",
  //           type: MovementType.LINEAR_MOTION,
  //         },
  //       },
  //     },
  //     end: {
  //       dominant: {
  //         location: Location.TORAX,
  //         handShape: HandShape.libras.CLAW,
  //         palmOrientation: PalmOrientation.BACK,
  //         options: {
  //           location: {
  //             detectionRadius: 80,
  //             same: true,
  //           },
  //         },
  //       },
  //     },
  //   },
  // },
  // {
  //   language: "Libras",
  //   token: "Ter",
  //   steps: {
  //     start: {
  //       dominant: {
  //         location: Location.TORAX,
  //         handShape: HandShape.libras.L,
  //         palmOrientation: PalmOrientation.LEFT,
  //         options: {
  //           location: {
  //             detectionRadius: 80,
  //             radiusOffset: 100,
  //           },
  //         },
  //       },
  //     },
  //     movement: {
  //       dominant: {
  //         detect: [{ z: -1 }, { z: 1 }, { z: -1 }],
  //         metadata: {
  //           description: "bata no peito duas vezes",
  //           type: MovementType.LINEAR_MOTION,
  //         },
  //       },
  //     },
  //     end: {
  //       dominant: {
  //         location: Location.TORAX,
  //         handShape: HandShape.libras.L,
  //         palmOrientation: PalmOrientation.LEFT,
  //         options: {
  //           location: {
  //             detectionRadius: 80,
  //             same: true,
  //           },
  //         },
  //       },
  //     },
  //   },
  // },
  // {
  //   language: "Libras",
  //   token: "Ainda",
  //   steps: {
  //     start: {
  //       dominant: {
  //         location: Location.CHIN,
  //         handShape: HandShape.libras.THUMB_TOUCH_INDEX_FINGERS_CLOSED,
  //         palmOrientation: PalmOrientation.LEFT,
  //         options: {
  //           location: {
  //             detectionRadius: 45,
  //             radiusOffset: 50,
  //           },
  //         },
  //       },
  //     },
  //     movement: {
  //       dominant: {
  //         detect: [{ z: -1 }, { z: 1 }, { z: -1 }],
  //         metadata: {
  //           description: "mova a mão até o queixo tocando ele duas vezes",
  //           type: MovementType.LINEAR_MOTION,
  //         },
  //       },
  //     },
  //     end: {
  //       dominant: {
  //         location: Location.CHIN,
  //         handShape: HandShape.libras.THUMB_TOUCH_INDEX_FINGERS_CLOSED,
  //         palmOrientation: PalmOrientation.LEFT,
  //         options: {
  //           location: {
  //             detectionRadius: 45,
  //             radiusOffset: 15,
  //           },
  //         },
  //       },
  //     },
  //   },
  // },
  {
    language: "Libras",
    token: "Saúde",
    steps: {
      start: {
        dominant: {
          location: Location.TORAX_UPPER_LEFT,
          handShape: HandShape.libras.MIDDLE_FINGER_BENDED_FINGERS_APART,
          palmOrientation: PalmOrientation.BACK,
          handOrientation: HandOrientation.LEFT,
          options: {
            location: {
              detectionRadius: 60,
              track: true,
              radiusOffset: {
                value: 95,
                leftLimitValue: 0,
              },
              handLocation: HandLocation.MIDDLE_FINGER_TIP,
            },
          },
        },
      },
      movement: {
        dominant: {
          detect: [{ x: 1 }, { x: 1 }, { x: 1 }],
          forbidden: [
            { x: -1 },
            { x: -1, y: 1 },
            { x: -1, y: -1 },
            { wristRotate: true },
          ],
          metadata: {
            description:
              "faça o movimento com dedo colad ao corpo, em seguida saido para frente e voltando para o corpo até a outra bola laranja  ",
            type: MovementType.LINEAR_MOTION,
          },
        },
      },
      end: {
        dominant: {
          location: Location.TORAX_UPPER_RIGHT,
          handShape: HandShape.libras.MIDDLE_FINGER_BENDED_FINGERS_APART,
          palmOrientation: PalmOrientation.BACK,
          handOrientation: HandOrientation.LEFT,
          options: {
            location: {
              detectionRadius: 45,
              track: true,
              radiusOffset: {
                value: 95,
                rightLimitValue: 0,
              },
              sameY: true,
              handLocation: HandLocation.MIDDLE_FINGER_TIP,
            },
          },
        },
      },
    },
  },
  {
    language: "Libras",
    token: "Telefone",
    steps: {
      start: {
        dominant: {
          location: Location.TORAX_UPPER,
          handShape: HandShape.libras.Y,
          palmOrientation: PalmOrientation.BACK,
          options: {
            location: {
              track: true,
              detectionRadius: 50,
              radiusOffset: {
                value: 125,
                downLimitValue: 50,
              },
              handLocation: HandLocation.MIDDLE_FINGER_MCP,
            },
          },
        },
      },
      movement: {
        dominant: {
          detect: [{ y: 1 }, { y: 1 }, { y: 1 }],
          metadata: {
            description:
              "mova a mão até a região da bochecha em direção a outra bola laranja",
            type: MovementType.LINEAR_MOTION,
          },
        },
      },
      end: {
        dominant: {
          location: Location.CHEEK_RIGHT,
          handShape: HandShape.libras.Y,
          palmOrientation: PalmOrientation.BACK,
          options: {
            location: {
              track: true,
              detectionRadius: 40,
              radiusOffset: {
                value: 40,
                leftLimitValue: 0,
              },
              handLocation: HandLocation.MIDDLE_FINGER_MCP,
            },
          },
        },
      },
    },
  },
  {
    language: "Libras",
    token: "Dia",
    steps: {
      start: {
        dominant: {
          location: Location.FOREHEAD_RIGHT,
          handShape: HandShape.libras.D,
          palmOrientation: PalmOrientation.LEFT,
          handOrientation: HandOrientation.UP,
          options: {
            location: {
              track: true,
              detectionRadius: 30,
              radiusOffset: {
                value: 30,
                leftLimitValue: 10,
              },
              handLocation: HandLocation.INDEX_FINGER_TIP,
            },
          },
        },
      },
      movement: {
        dominant: {
          detect: [{ x: 1 }, { x: 1 }],
          metadata: {
            description:
              "faça o movimento em diagonal para direita até a outra bola laranja",
            type: MovementType.LINEAR_MOTION,
          },
        },
      },
      end: {
        dominant: {
          location: Location.FOREHEAD_RIGHT,
          handShape: HandShape.libras.D,
          palmOrientation: PalmOrientation.LEFT,
          handOrientation: HandOrientation.UP,
          options: {
            location: {
              track: true,
              detectionRadius: 45,
              radiusOffset: {
                value: 200,
                leftLimitValue: 100,
                rightLimitValue: 200,
                downLimitValue: -35,
                upLimitValue: 35,
              },
              handLocation: HandLocation.INDEX_FINGER_TIP,
            },
          },
        },
      },
    },
  },
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
                value: 95,
                leftLimitValue: 0,
              },
            },
          },
        },
      },
      movement: {
        dominant: {
          detect: [{ x: 1 }, { x: 1 }, { x: 1 }],
          forbidden: [
            { x: -1 },
            { x: -1, y: 1 },
            { x: -1, y: -1 },
            { wristRotate: true },
          ],
          metadata: {
            description:
              "faça o movimento com a mão em direção a outra bola laranja",
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
                value: 95,
                rightLimitValue: 0,
              },
              sameY: true,
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
                value: 95,
                leftLimitValue: 0,
              },
            },
          },
        },
      },
      movement: {
        dominant: {
          detect: [{ x: 1 }, { x: 1 }, { x: 1 }],
          forbidden: [
            { x: -1 },
            { x: -1, y: 1 },
            { x: -1, y: -1 },
            { wristRotate: true },
          ],
          metadata: {
            description:
              "faça o movimento com a mão em direção a outra bola laranja",
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
                value: 95,
                rightLimitValue: 0,
              },
              sameY: true,
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
          handOrientation: HandOrientation.UP,
        },
      },
      movement: {
        dominant: {
          detect: [{ y: -1, z: 1 }, { y: -1 }],
          metadata: {
            description:
              "vá abrindo a mão e movendo ela para frente descendo em direção a outra bola laranja",
            type: MovementType.PARABOLIC_MOTION,
          },
        },
      },
      end: {
        dominant: {
          location: Location.TORAX_UPPER,
          handShape: HandShape.libras.OPEN_HAND_FINGERS_APART,
          palmOrientation: PalmOrientation.UP,
          handOrientation: HandOrientation.FRONT,
          options: {
            location: {
              detectionRadius: 70,
              radiusOffset: {
                value: 100,
                upLimitValue: 0,
                leftLimitValue: -80,
                rightLimitValue: 80,
              },
              handLocation: HandLocation.MIDDLE_FINGER_TIP,
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
          location: Location.TORAX,
          handShape: HandShape.libras.A,
          palmOrientation: PalmOrientation.BACK,
          handOrientation: HandOrientation.LEFT,
          options: {
            location: {
              detectionRadius: 60,
              radiusOffset: 65,
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
          location: Location.TORAX,
          handShape: HandShape.libras.A,
          palmOrientation: PalmOrientation.BACK,
          handOrientation: HandOrientation.LEFT,
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
              radiusOffset: 65,
            },
          },
        },
      },
      movement: {
        dominant: {
          detect: [{ z: 1 }, { y: -1, z: 1 }],
          metadata: {
            description:
              "mova a mão para frente e para baixo em direção a outra bola laranja",
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
              radiusOffset: {
                value: 100,
                upLimitValue: 0,
                leftLimitValue: -80,
                rightLimitValue: 80,
              },
              handLocation: HandLocation.MIDDLE_FINGER_MCP,
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
              radiusOffset: 45,
            },
          },
        },
      },
      movement: {
        dominant: {
          detect: [{ y: 1, z: -1 }, { z: -1 }],
          metadata: {
            description:
              "mova mão para cima e para sua direção até a outra bola laranja",
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
              radiusOffset: {
                value: 100,
                upLimitValue: 0,
                leftLimitValue: -80,
                rightLimitValue: 80,
              },
              handLocation: HandLocation.MIDDLE_FINGER_MCP,
            },
          },
        },
      },
    },
  },
  {
    language: "Libras",
    token: "Entender",
    steps: {
      start: {
        dominant: {
          location: Location.FOREHEAD_RIGHT,
          handShape: HandShape.libras.OPEN_HAND_THUMB_APART,
          palmOrientation: PalmOrientation.LEFT,
          options: {
            location: {
              detectionRadius: 35,
              radiusOffset: {
                value: 50,
                leftLimitValue: -10,
                rightLimitValue: 10,
              },
              handLocation: HandLocation.INDEX_FINGER_TIP,
            },
          },
        },
      },
      movement: {
        dominant: {
          detect: [
            { wristRotate: true },
            { wristRotate: true },
            { wristRotate: true },
          ],
          metadata: {
            description: "gire o pulso da duas vezes",
            type: MovementType.WRIST_ROTATE,
          },
        },
      },
      end: {
        dominant: {
          location: Location.FOREHEAD_RIGHT,
          handShape: HandShape.libras.OPEN_HAND_THUMB_APART,
          palmOrientation: PalmOrientation.LEFT,
          options: {
            location: {
              detectionRadius: 35,
              same: true,
              handLocation: HandLocation.INDEX_FINGER_TIP,
            },
          },
        },
      },
    },
  },
  {
    language: "Libras",
    token: "Gostar",
    steps: {
      start: {
        dominant: {
          location: Location.TORAX,
          handShape: HandShape.libras.OPEN_HAND_FINGERS_APART,
          palmOrientation: PalmOrientation.BACK,
          handOrientation: HandOrientation.LEFT,
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
            description: "faça um movimento circular com a mão dominante",
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
          handShape: HandShape.libras.OPEN_HAND_FINGERS_APART,
          palmOrientation: PalmOrientation.BACK,
          handOrientation: HandOrientation.LEFT,
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
    token: "Rapido",
    steps: {
      start: {
        dominant: {
          location: Location.TORAX,
          handShape: HandShape.libras.CLAW,
          palmOrientation: PalmOrientation.BACK,
          handOrientation: HandOrientation.LEFT,
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
          detect: [{ y: -1 }, { y: 1 }, { y: -1 }, { y: 1 }],
          metadata: {
            description:
              "mova a mão para cima e para baixo duas vezes",
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
          location: Location.TORAX,
          handShape: HandShape.libras.CLAW,
          palmOrientation: PalmOrientation.BACK,
          handOrientation: HandOrientation.LEFT,
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
    token: "Não",
    steps: {
      start: {
        dominant: {
          location: Location.TORAX_RIGHT,
          handShape: HandShape.libras.INDEX_FINGER,
          palmOrientation: PalmOrientation.FRONT,
          handOrientation: HandOrientation.UP,
          options: {
            location: {
              detectionRadius: 60,
              radiusOffset: 85,
            },
          },
        },
      },
      movement: {
        dominant: {
          detect: [{ x: -1 }, { x: 1 }, { x: -1 }, { x: 1 }],
          metadata: {
            description:
              "mova a mão lateralmente para dentro e para fora duas vezes",
            type: MovementType.LINEAR_MOTION,
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
          location: Location.TORAX_RIGHT,
          handShape: HandShape.libras.INDEX_FINGER,
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
  {
    language: "Libras",
    token: "Tchau",
    steps: {
      start: {
        dominant: {
          location: Location.TORAX_RIGHT,
          handShape: HandShape.libras.OPEN_HAND_FINGERS_APART,
          palmOrientation: PalmOrientation.FRONT,
          handOrientation: HandOrientation.UP,
          options: {
            location: {
              detectionRadius: 60,
              radiusOffset: 85,
            },
          },
        },
      },
      movement: {
        dominant: {
          detect: [{ x: -1 }, { x: 1 }, { x: -1 }, { x: 1 }],
          metadata: {
            description:
              "mova a mão lateralmente para dentro e para fora duas vezes",
            type: MovementType.LINEAR_MOTION,
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
          location: Location.TORAX_RIGHT,
          handShape: HandShape.libras.OPEN_HAND_FINGERS_APART,
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
  {
    language: "Libras",
    token: "Quente",
    steps: {
      start: {
        dominant: {
          location: Location.TORAX_RIGHT,
          handShape: HandShape.libras.C,
          palmOrientation: PalmOrientation.LEFT,
          handOrientation: HandOrientation.UP_LEFT,
          options: {
            location: {
              detectionRadius: 60,
              radiusOffset: {
                value: 75,
                rightLimitValue: 0,
              },
            },
          },
        },
      },
      movement: {
        dominant: {
          detect: [{ x: -1 }, { x: -1 }, { x: -1 }],
          metadata: {
            description: "mova a mão da direita para esquerda",
            type: MovementType.LINEAR_MOTION,
          },
        },
      },
      end: {
        dominant: {
          location: Location.TORAX_LEFT,
          handShape: HandShape.libras.C,
          palmOrientation: PalmOrientation.LEFT,
          handOrientation: HandOrientation.UP_LEFT,
          options: {
            location: {
              detectionRadius: 60,
              radiusOffset: {
                value: 75,
                leftLimitValue: 0,
              },
              sameY: true,
            },
          },
        },
      },
    },
  },
  {
    language: "Libras",
    token: "Certeza",
    steps: {
      start: {
        dominant: {
          location: Location.TORAX_UPPER,
          handShape: HandShape.libras.THUMB_TOUCH_INDEX_FINGERS_OPEN,
          palmOrientation: PalmOrientation.BACK,
          handOrientation: HandOrientation.LEFT,
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
          detect: [{ y: -1 }, { y: -1 }, { y: -1 }, { y: -1 }],
          metadata: {
            description: "mova a mão para baixo",
            type: MovementType.LINEAR_MOTION,
          },
        },
      },
      end: {
        dominant: {
          location: Location.TORAX_LOWER,
          handShape: HandShape.libras.THUMB_TOUCH_INDEX_FINGERS_OPEN,
          palmOrientation: PalmOrientation.BACK,
          handOrientation: HandOrientation.LEFT,
          options: {
            location: {
              detectionRadius: 60,
              sameX: true,
            },
          },
        },
      },
    },
  },
  {
    language: "Libras",
    token: "Pessoa",
    steps: {
      start: {
        dominant: {
          location: Location.FOREHEAD_LEFT,
          handShape: HandShape.libras.MIDDLE_FINGER_BENDED_FINGERS_APART,
          palmOrientation: PalmOrientation.BACK,
          handOrientation: HandOrientation.LEFT,
          options: {
            location: {
              detectionRadius: 40,
              radiusOffset: 30,
              handLocation: HandLocation.MIDDLE_FINGER_TIP,
            },
          },
        },
      },
      movement: {
        dominant: {
          detect: [{ x: 1 }, { x: 1 }, { x: 1 }],
          metadata: {
            description: "mova a mão da esquerda para direita",
            type: MovementType.LINEAR_MOTION,
          },
        },
      },
      end: {
        dominant: {
          location: Location.FOREHEAD_RIGHT,
          handShape: HandShape.libras.MIDDLE_FINGER_BENDED_FINGERS_APART,
          palmOrientation: PalmOrientation.BACK,
          handOrientation: HandOrientation.LEFT,
          options: {
            location: {
              detectionRadius: 40,
              radiusOffset: 30,
              handLocation: HandLocation.MIDDLE_FINGER_TIP,
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
          handOrientation: HandOrientation.UP,
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
          detect: [
            { wristFlexion: true },
            { wristExtension: true },
            { wristFlexion: true },
          ],
          metadata: {
            description:
              "com o pulso mova a mão para frente e para atrás duas vezes",
            type: MovementType.WRIST_FLEXION_EXTENSION,
          },
        },
      },
      end: {
        dominant: {
          location: Location.TORAX_RIGHT,
          handShape: HandShape.libras.S,
          palmOrientation: PalmOrientation.FRONT,
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
    token: "Obrigado",
    steps: {
      start: {
        dominant: {
          location: Location.FOREHEAD,
          handShape: HandShape.libras.OPEN_HAND,
          palmOrientation: PalmOrientation.BACK,
          handOrientation: HandOrientation.UP,
          options: {
            location: {
              track: true,
              detectionRadius: 60,
              radiusOffset: 25,
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
          location: Location.TORAX_UPPER,
          handShape: HandShape.libras.OPEN_HAND,
          palmOrientation: PalmOrientation.UP,
          handOrientation: HandOrientation.FRONT,
          options: {
            location: {
              track: true,
              detectionRadius: 60,
              radiusOffset: 80,
            },
          },
        },
      },
    },
  },
  {
    language: "Libras",
    token: "Tarde",
    steps: {
      start: {
        dominant: {
          location: Location.TORAX_UPPER_RIGHT,
          handShape: HandShape.libras.OPEN_HAND,
          palmOrientation: PalmOrientation.FRONT,
          handOrientation: HandOrientation.UP,
          options: {
            location: {
              detectionRadius: 60,
              track: true,
              radiusOffset: {
                value: 150,
                leftLimitValue: 50,
                downLimitValue: 75,
              },
            },
          },
        },
      },
      movement: {
        dominant: {
          detect: [{ y: -1 }, { y: -1 }],
          metadata: {
            description:
              "mova a mão até a outra bola laranja em um movimento parabólico para frente",
            type: MovementType.PARABOLIC_MOTION,
          },
        },
      },
      end: {
        dominant: {
          location: Location.TORAX_LOWER_RIGHT,
          handShape: HandShape.libras.OPEN_HAND,
          palmOrientation: PalmOrientation.DOWN,
          handOrientation: HandOrientation.FRONT,
          options: {
            location: {
              detectionRadius: 60,
              track: true,
              radiusOffset: {
                value: 100,
                downLimitValue: 0,
              },
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
          handOrientation: HandOrientation.UP,
          options: {
            location: {
              detectionRadius: 60,
              radiusOffset: 45,
            },
          },
        },
      },
      movement: {
        dominant: {
          detect: [{ z: 1 }, { y: -1, z: 1 }],
          metadata: {
            description:
              "mova a mão para baixo e frente em direção a outra bola laranja",
            type: MovementType.PARABOLIC_MOTION,
          },
        },
      },
      end: {
        dominant: {
          location: Location.TORAX_LOWER,
          handShape: HandShape.libras.F,
          palmOrientation: PalmOrientation.LEFT,
          handOrientation: HandOrientation.FRONT,
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
    token: "Aqui",
    steps: {
      start: {
        dominant: {
          location: Location.TORAX_RIGHT,
          handShape: HandShape.libras.INDEX_FINGER,
          palmOrientation: PalmOrientation.DOWN_BACK,
          options: {
            location: {
              track: true,
              detectionRadius: 80,
              radiusOffset: 100,
            },
          },
        },
      },
      movement: {
        dominant: {
          detect: [{ y: -1 }, { y: 1 }, { y: -1 }, { y: 1 }],
          metadata: {
            description:
              "com o dedo apontando para baixo, mova para baixo e para cima duas vezes",
            type: MovementType.LINEAR_MOTION,
          },
        },
      },
      end: {
        dominant: {
          location: Location.TORAX,
          handShape: HandShape.libras.INDEX_FINGER,
          palmOrientation: PalmOrientation.DOWN_BACK,
          options: {
            location: {
              track: true,
              detectionRadius: 80,
              same: true,
            },
          },
        },
      },
    },
  },
  // {
  //   language: "Libras",
  //   token: "Amigo",
  //   steps: {
  //     start: {
  //       dominant: {
  //         location: Location.TORAX,
  //         handShape: HandShape.libras.OPEN_HAND_THUMB_APART,
  //         palmOrientation: PalmOrientation.RIGHT,
  //         options: {
  //           location: {
  //             track: true,
  //             detectionRadius: 60,
  //             radiusOffset: 100,
  //           },
  //         },
  //       },
  //     },
  //     movement: {
  //       dominant: {
  //         detect: [{ z: -1 }, { z: 1 }, { z: -1 }, { z: 1 }],
  //         metadata: {
  //           description: "bata no peito duas vezes",
  //           type: MovementType.LINEAR_MOTION,
  //         },
  //       },
  //     },
  //     end: {
  //       dominant: {
  //         location: Location.TORAX,
  //         handShape: HandShape.libras.OPEN_HAND_THUMB_APART,
  //         palmOrientation: PalmOrientation.RIGHT,
  //         options: {
  //           location: {
  //             track: true,
  //             detectionRadius: 60,
  //             same: true,
  //           },
  //         },
  //       },
  //     },
  //   },
  // },
  // {
  //   language: "Libras",
  //   token: "Você",
  //   steps: {
  //     start: {
  //       dominant: {
  //         location: Location.TORAX,
  //         handShape: HandShape.libras.INDEX_FINGER,
  //         palmOrientation: PalmOrientation.DOWN,
  //         options: {
  //           location: {
  //             detectionRadius: 50,
  //             radiusOffset: 30,
  //           },
  //         },
  //       },
  //     },
  //     movement: {
  //       dominant: {
  //         detect: [{ z: 1 }, { z: -1 }],
  //         metadata: {
  //           description:
  //             "mova em direção oposta ao seu corpo e após isso volte a posição inicial",
  //           type: MovementType.LINEAR_MOTION,
  //         },
  //       },
  //     },
  //     end: {
  //       dominant: {
  //         location: Location.TORAX,
  //         handShape: HandShape.libras.INDEX_FINGER,
  //         palmOrientation: PalmOrientation.DOWN,
  //         options: {
  //           location: {
  //             detectionRadius: 60,
  //             radiusOffset: 90,
  //           },
  //         },
  //       },
  //     },
  //   },
  // },
  // {
  //   language: "Libras",
  //   token: "Eu",
  //   steps: {
  //     start: {
  //       dominant: {
  //         location: Location.TORAX,
  //         handShape: HandShape.libras.INDEX_FINGER,
  //         palmOrientation: PalmOrientation.RIGHT,
  //         handOrientation: HandOrientation.BACK,
  //         options: {
  //           location: {
  //             detectionRadius: 50,
  //             radiusOffset: 30,
  //           },
  //         },
  //       },
  //     },
  //     movement: {
  //       dominant: {
  //         detect: [{ z: -1 }, { z: 1 }],
  //         metadata: {
  //           description:
  //             "mova em sua direção e após isso volte a posição inicial",
  //           type: MovementType.LINEAR_MOTION,
  //         },
  //       },
  //     },
  //     end: {
  //       dominant: {
  //         location: Location.TORAX,
  //         handShape: HandShape.libras.INDEX_FINGER,
  //         palmOrientation: PalmOrientation.RIGHT,
  //         handOrientation: HandOrientation.BACK,
  //         options: {
  //           location: {
  //             detectionRadius: 60,
  //             radiusOffset: 90,
  //           },
  //         },
  //       },
  //     },
  //   },
  // },
  // {
  //   language: "Libras",
  //   token: "Beleza",
  //   steps: {
  //     start: {
  //       dominant: {
  //         location: Location.TORAX,
  //         handShape: HandShape.libras.THUMB_FINGER,
  //         palmOrientation: PalmOrientation.BACK,
  //         options: {
  //           location: {
  //             detectionRadius: 60,
  //             radiusOffset: 125,
  //           },
  //         },
  //       },
  //     },
  //     movement: {
  //       dominant: {
  //         metadata: {
  //           description: "permanceça com a mão na posição",
  //           type: MovementType.STATIC,
  //         },
  //       },
  //     },
  //     end: {
  //       dominant: {
  //         location: Location.TORAX,
  //         handShape: HandShape.libras.THUMB_FINGER,
  //         palmOrientation: PalmOrientation.BACK,
  //         options: {
  //           location: {
  //             same: true,
  //             detectionRadius: 60,
  //           },
  //         },
  //       },
  //     },
  //   },
  // },
  // {
  //   language: "Libras",
  //   token: "Educado",
  //   steps: {
  //     start: {
  //       dominant: {
  //         location: Location.ELBOW_LEFT,
  //         handShape: HandShape.libras.L,
  //         palmOrientation: PalmOrientation.DOWN,
  //         options: {
  //           location: {
  //             detectionRadius: 60,
  //             radiusOffset: {
  //               value: 60,
  //               downLimitValue: 0,
  //             },
  //             track: true,
  //             handLocation: HandLocation.INDEX_FINGER_TIP,
  //           },
  //         },
  //       },
  //       nonDominant: {
  //         location: Location.TORAX_LOWER_RIGHT,
  //         handShape: HandShape.libras.S,
  //         palmOrientation: PalmOrientation.DOWN,
  //         options: {
  //           location: {
  //             detectionRadius: 60,
  //             radiusOffset: 85,
  //             handLocation: HandLocation.WRIST,
  //           },
  //         },
  //       },
  //     },
  //     movement: {
  //       dominant: {
  //         detect: [{ x: 1 }],
  //         metadata: {
  //           description:
  //             "mova a mão dominante colada ao braço até o pulso da mão não dominante",
  //           type: MovementType.LINEAR_MOTION,
  //         },
  //       },
  //     },
  //     end: {
  //       dominant: {
  //         location: Location.WRIST_LEFT,
  //         handShape: HandShape.libras.L,
  //         palmOrientation: PalmOrientation.DOWN,
  //         options: {
  //           location: {
  //             detectionRadius: 60,
  //             radiusOffset: 60,
  //             track: true,
  //             handLocation: HandLocation.INDEX_FINGER_TIP,
  //           },
  //         },
  //       },
  //     },
  //   },
  // },
  // {
  //   language: "Libras",
  //   token: "Favorito",
  //   steps: {
  //     start: {
  //       dominant: {
  //         location: Location.TORAX_UPPER,
  //         handShape: HandShape.libras.MIDDLE_FINGER_BENDED_FINGERS_APART,
  //         palmOrientation: PalmOrientation.BACK,
  //         options: {
  //           location: {
  //             handLocation: HandLocation.MIDDLE_FINGER_TIP,
  //             track: true,
  //             detectionRadius: 40,
  //             radiusOffset: 60,
  //           },
  //         },
  //       },
  //     },
  //     movement: {
  //       dominant: {
  //         detect: [{ z: -1 }, { z: 1 }, { z: -1 }],
  //         metadata: {
  //           description: "mova a mão até o queixo tocando ele duas vezes",
  //           type: MovementType.LINEAR_MOTION,
  //         },
  //       },
  //     },
  //     end: {
  //       dominant: {
  //         location: Location.CHIN,
  //         handShape: HandShape.libras.MIDDLE_FINGER_BENDED_FINGERS_APART,
  //         palmOrientation: PalmOrientation.BACK,
  //         options: {
  //           location: {
  //             handLocation: HandLocation.MIDDLE_FINGER_TIP,
  //             track: true,
  //             detectionRadius: 40,
  //             radiusOffset: 15,
  //           },
  //         },
  //       },
  //     },
  //   },
  // },
  // {
  //   language: "Libras",
  //   token: "Porque",
  //   steps: {
  //     start: {
  //       dominant: {
  //         location: Location.TORAX_UPPER,
  //         handShape: HandShape.libras.INDEX_FINGER,
  //         palmOrientation: PalmOrientation.BACK,
  //         options: {
  //           location: {
  //             detectionRadius: 60,
  //             radiusOffset: 50,
  //           },
  //         },
  //       },
  //       nonDominant: {
  //         location: Location.TORAX,
  //         handShape: HandShape.libras.INDEX_FINGER,
  //         palmOrientation: PalmOrientation.BACK,
  //         options: {
  //           location: {
  //             detectionRadius: 60,
  //             radiusOffset: 50,
  //           },
  //         },
  //       },
  //     },
  //     movement: {
  //       dominant: {
  //         detect: [{ y: -1 }, { y: 1 }, { y: -1 }],
  //         metadata: {
  //           description:
  //             "Bata no dedo indicador da mão não dominante com a mão dominante duas vezes",
  //           type: MovementType.LINEAR_MOTION,
  //         },
  //       },
  //     },
  //     end: {
  //       dominant: {
  //         location: Location.INDEX_LEFT,
  //         handShape: HandShape.libras.INDEX_FINGER,
  //         palmOrientation: PalmOrientation.BACK,
  //         options: {
  //           location: {
  //             detectionRadius: 25,
  //             track: true,
  //             handLocation: HandLocation.INDEX_FINGER_DIP,
  //           },
  //         },
  //       },
  //       nonDominant: {
  //         location: Location.TORAX,
  //         handShape: HandShape.libras.INDEX_FINGER,
  //         palmOrientation: PalmOrientation.BACK,
  //         options: {
  //           location: {
  //             detectionRadius: 60,
  //             same: true,
  //           },
  //         },
  //       },
  //     },
  //   },
  // },
  // {
  //   language: "Libras",
  //   token: "Hoje",
  //   steps: {
  //     start: {
  //       dominant: {
  //         location: Location.TORAX_LOWER_RIGHT,
  //         handShape: HandShape.libras.OPEN_HAND,
  //         palmOrientation: PalmOrientation.UP,
  //         options: {
  //           location: {
  //             detectionRadius: 60,
  //             radiusOffset: {
  //               value: 60,
  //               upLimitValue: 0,
  //               rightLimitValue: 0,
  //             },
  //           },
  //         },
  //       },
  //       nonDominant: {
  //         location: Location.TORAX_LOWER_LEFT,
  //         handShape: HandShape.libras.OPEN_HAND,
  //         palmOrientation: PalmOrientation.UP,
  //         options: {
  //           location: {
  //             detectionRadius: 60,
  //             radiusOffset: {
  //               value: 60,
  //               upLimitValue: 0,
  //               leftLimitValue: 0,
  //             },
  //             side: true,
  //           },
  //         },
  //       },
  //     },
  //     movement: {
  //       dominant: {
  //         detect: [{ x: -1 }, { x: 1 }, { x: -1 }],
  //         metadata: {
  //           description:
  //             "Mova a mão lateralmente para dentro e para fora duas vezes",
  //           type: MovementType.LINEAR_MOTION,
  //         },
  //       },
  //       nonDominant: {
  //         detect: [{ x: 1 }, { x: -1 }, { x: 1 }],
  //         metadata: {
  //           description:
  //             "Mova a mão lateralmente para dentro e para fora duas vezes",
  //           type: MovementType.LINEAR_MOTION,
  //         },
  //       },
  //     },
  //     end: {
  //       dominant: {
  //         location: Location.TORAX_LOWER_RIGHT,
  //         handShape: HandShape.libras.OPEN_HAND,
  //         palmOrientation: PalmOrientation.UP,
  //         options: {
  //           location: {
  //             detectionRadius: 60,
  //             same: true,
  //           },
  //         },
  //       },
  //       nonDominant: {
  //         location: Location.TORAX_LOWER_LEFT,
  //         handShape: HandShape.libras.OPEN_HAND,
  //         palmOrientation: PalmOrientation.UP,
  //         options: {
  //           location: {
  //             detectionRadius: 60,
  //             same: true,
  //           },
  //         },
  //       },
  //     },
  //   },
  // },
  // {
  //   language: "Libras",
  //   token: "Branco",
  //   steps: {
  //     start: {
  //       dominant: {
  //         location: Location.ELBOW_LEFT,
  //         handShape: HandShape.libras.OPEN_HAND,
  //         palmOrientation: PalmOrientation.UP,
  //         options: {
  //           location: {
  //             detectionRadius: 60,
  //             radiusOffset: {
  //               value: 60,
  //               downLimitValue: 0,
  //             },
  //             track: true,
  //             handLocation: HandLocation.INDEX_FINGER_TIP,
  //           },
  //         },
  //       },
  //       nonDominant: {
  //         location: Location.TORAX_LOWER_RIGHT,
  //         handShape: HandShape.libras.S,
  //         palmOrientation: PalmOrientation.DOWN,
  //         options: {
  //           location: {
  //             detectionRadius: 60,
  //             radiusOffset: 85,
  //             handLocation: HandLocation.WRIST,
  //           },
  //         },
  //       },
  //     },
  //     movement: {
  //       dominant: {
  //         detect: [{ x: 1 }],
  //         metadata: {
  //           description:
  //             "mova a mão dominante colada ao braço até o pulso da mão não dominante",
  //           type: MovementType.LINEAR_MOTION,
  //         },
  //       },
  //     },
  //     end: {
  //       dominant: {
  //         location: Location.WRIST_LEFT,
  //         handShape: HandShape.libras.OPEN_HAND,
  //         palmOrientation: PalmOrientation.UP,
  //         options: {
  //           location: {
  //             detectionRadius: 60,
  //             radiusOffset: 60,
  //             track: true,
  //             handLocation: HandLocation.INDEX_FINGER_TIP,
  //           },
  //         },
  //       },
  //     },
  //   },
  // },
  // { *
  //   language: "Libras",
  //   token: "Casa",
  //   steps: {
  //     start: {
  //       dominant: {},
  //       nonDominant: {},
  //     },
  //     movement: {
  //       dominant: {},
  //       nonDominant: {},
  //     },
  //     end: {
  //       dominant: {},
  //       nonDominant: {},
  //     },
  //   },
  // },
  // {
  //   language: "Libras",
  //   token: "Estuda",
  // },
  // {
  //   language: "Libras",
  //   token: "Idade",
  // },
  // {
  //   language: "Libras",
  //   token: "Local",
  // },
  // {
  //   language: "Libras",
  //   token: "Noite",
  // },

  // { *
  //   language: "Libras",
  //   token: "Trabalhar",
  // },
  // {
  //   language: "Libras",
  //   token: "Assistir",
  // },
  // {
  //   language: "Libras",
  //   token: "Familia",
  // },
  // {
  //   language: "Libras",
  //   token: "Ler",
  // },
  // {
  //   language: "Libras",
  //   token: "Nos",
  // },
  // { *
  //   language: "Libras",
  //   token: "TV",
  // },
  // {
  //   language: "Libras",
  //   token: "Passear",
  // },
  // {
  //   language: "Libras",
  //   token: "Como",
  // },
  // {
  //   language: "Libras",
  //   token: "Duvida",
  // },
  // {
  //   language: "Libras",
  //   token: "Faculdade",
  // },
  // {
  //   language: "Libras",
  //   token: "Passado",
  // },
  // {
  //   language: "Libras",
  //   token: "Vontade",
  // },
  // {
  //   language: "Libras",
  //   token: "Tudo",
  // },
  // {
  //   language: "Libras",
  //   token: "Novo",
  // },
  // {
  //   language: "Libras",
  //   token: "Prazer",
  // },
  // {
  //   language: "Libras",
  //   token: "Conhecer",
  // },
  // {
  //   language: "Libras",
  //   token: "Mulher",
  // },
  // {
  //   language: "Libras",
  //   token: "Homem",
  // },
  // {
  //   language: "Libras",
  //   token: "De nada",
  // },
  // {
  //   language: "Libras",
  //   token: "Onde",
  // },
  // {
  //   language: "Libras",
  //   token: "Quem",
  // },
  // {
  //   language: "Libras",
  //   token: "Desculpa",
  // },
  // {
  //   language: "Libras",
  //   token: "Ajuda",
  // },
  // {
  //   language: "Libras",
  //   token: "Comida",
  // },
  // {
  //   language: "Libras",
  //   token: "Bebida",
  // },
  // {
  //   language: "Libras",
  //   token: "Banheiro",
  // },
  // {
  //   language: "Libras",
  //   token: "Escola",
  // },
  // {
  //   language: "Libras",
  //   token: "Dinheiro",
  // },
  // {
  //   language: "Libras",
  //   token: "Tempo",
  // },
  // {
  //   language: "Libras",
  //   token: "Medico",
  // },
];

export * from "./instruction";
export * from "./types";
