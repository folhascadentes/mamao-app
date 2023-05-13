// To see landmarks body model
// https://github.com/google/mediapipe/blob/master/docs/solutions/pose.md
export function getBodyRegionCoordinates(
  type,
  landmarks,
  rightDominantHand = true
) {
  if (type === "chin") {
    return getMiddlePoint([
      landmarks[4],
      landmarks[1],
      landmarks[11],
      landmarks[12],
    ]);
  } else if (type === "torax") {
    return getMiddlePoint([
      landmarks[9],
      landmarks[10],
      landmarks[11],
      landmarks[12],
      landmarks[24],
      landmarks[23],
    ]);
  } else if (type === "torax_upper") {
    return getMiddlePoint([
      getMiddlePoint([
        landmarks[24],
        landmarks[23],
        landmarks[4],
        landmarks[1],
      ]),
      landmarks[12],
      landmarks[11],
    ]);
  } else if (type === "torax_lower") {
    return getMiddlePoint([
      getMiddlePoint([
        landmarks[24],
        landmarks[23],
        landmarks[4],
        landmarks[1],
      ]),
      landmarks[0],
      landmarks[24],
      landmarks[23],
    ]);
  } else if (type === "torax_left") {
    return getMiddlePoint([landmarks[11], landmarks[23], landmarks[9]]);
  } else if (type === "torax_right") {
    return getMiddlePoint([landmarks[12], landmarks[24], landmarks[10]]);
  } else if (type === "torax_right_lower") {
    return getMiddlePoint([
      getMiddlePoint([landmarks[24], landmarks[4], landmarks[1]]),
      landmarks[24],
    ]);
  } else if (type === "arm_upper") {
    return rightDominantHand
      ? getMiddlePoint([landmarks[13]], {
          x: 0,
          y: -200,
        })
      : getMiddlePoint([landmarks[14]]);
  } else if (type === "arm_extended") {
    return rightDominantHand
      ? getMiddlePoint([landmarks[11], landmarks[23]])
      : getMiddlePoint([landmarks[12], landmarks[24]]);
  } else if (type === "wrist") {
    return rightDominantHand
      ? getMiddlePoint([landmarks[19]], {
          x: 0,
          y: -100,
        })
      : getMiddlePoint([landmarks[20]], {
          x: 0,
          y: -100,
        });
  } else if (type === "shoulder_left") {
    return getMiddlePoint([landmarks[11]]);
  } else if (type === "elbow_left") {
    return getMiddlePoint([landmarks[13]]);
  }
}

export function getMiddlePoint(coords, offset = { x: 0, y: 0 }) {
  let totalX = 0;
  let totalY = 0;
  const len = coords.length;

  for (let i = 0; i < len; i++) {
    totalX += coords[i].x;
    totalY += coords[i].y;
  }

  const midX = totalX / len;
  const midY = totalY / len;

  return { x: midX + offset.x, y: midY + offset.y };
}
