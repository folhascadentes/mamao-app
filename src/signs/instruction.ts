import { HandShapeType } from "./types";

export const HandshapeImages: {
  [key: HandShapeType]: { label: string; path: string; alt?: string }[];
} = {
  a: [
    {
      label: "Visão frontal",
      path: "/handshapes/a_front.png",
    },
    {
      label: "Visão lateral",
      path: "/handshapes/a_side.png",
    },
  ],
  l: [
    {
      label: "Visão frontal",
      path: "/handshapes/l_front.png",
    },
    {
      label: "Visão lateral",
      path: "/handshapes/l_side.png",
    },
  ],
  o: [
    {
      label: "Visão frontal",
      path: "/handshapes/o_front.png",
    },
    {
      label: "Visão lateral",
      path: "/handshapes/o_side.png",
    },
  ],
  s: [
    {
      label: "Visão frontal",
      path: "/handshapes/s_front.png",
    },
    {
      label: "Visão lateral",
      path: "/handshapes/s_side.png",
    },
  ],
  y: [
    {
      label: "Visão frontal",
      path: "/handshapes/y_front.png",
    },
    {
      label: "Visão lateral",
      path: "/handshapes/y_side.png",
    },
  ],
  oi: [
    {
      label: "Visão frontal",
      path: "/handshapes/oi_front.png",
    },
    {
      label: "Visão lateral",
      path: "/handshapes/oi_side.png",
    },
  ],
  indexFinger: [
    {
      label: "Visão frontal",
      path: "/handshapes/index_finger_front.png",
    },
    {
      label: "Visão lateral",
      path: "/handshapes/index_finger_side.png",
    },
  ],
  middleAndIndexFinger: [
    {
      label: "Visão frontal",
      path: "/handshapes/middle_index_finger_front.png",
    },
    {
      label: "Visão lateral",
      path: "/handshapes/middle_index_finger_side.png",
    },
  ],
  openHandFingersApart: [
    {
      label: "Visão frontal",
      path: "/handshapes/open_hand_fingers_apart_front.png",
    },
    {
      label: "Visão lateral",
      path: "/handshapes/open_hand_fingers_apart_side.png",
    },
  ],
  thumbFinger: [
    {
      label: "Visão frontal",
      path: "/handshapes/thumbs_up_front.png",
    },
  ],
};
