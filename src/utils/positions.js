// To see landmarks body model
// https://github.com/google/mediapipe/blob/master/docs/solutions/pose.md
export function getBodyRegionCoordinates(type, landmarks) {
  if (type === "torax") {
    return getMiddlePoint(
      landmarks[12],
      landmarks[11],
      landmarks[24],
      landmarks[23]
    );
  }
}

function getMiddlePoint(coords) {
  let totalX = 0;
  let totalY = 0;
  const len = coords.length;

  for (let i = 0; i < len; i++) {
    totalX += coords[i].x;
    totalY += coords[i].y;
  }

  const midX = totalX / len;
  const midY = totalY / len;

  return { x: midX, y: midY };
}
