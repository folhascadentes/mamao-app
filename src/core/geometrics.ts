export function getPerpendicularVector(v1: Coordinate, v2: Coordinate) {
  // Calculate the direction vector V between P1 and P2
  var V = { x: v2.x - v1.x, y: v2.y - v1.y, z: v2.z - v1.z };

  // Define a vector W on the Z axis
  var W = { x: 0, y: 1, z: 0 };

  // Calculate the perpendicular vector N using the cross product between V and W
  var Nx = V.y * W.z - V.z * W.y;
  var Ny = V.z * W.x - V.x * W.z;
  var Nz = V.x * W.y - V.y * W.x;
  var N = { x: Nx, y: Ny, z: Nz };

  // Return the perpendicular vector
  return N;
}

export function getAngleWithXAxis(v: Coordinate) {
  // Calculate the angle between vector v and the x-axis
  var angle = Math.atan2(v.z, v.x);

  // Convert the angle from radians to degrees
  angle = (angle * 180) / Math.PI;

  // Return the angle
  return angle;
}

export function findPerpendicularVector(
  v1: Coordinate,
  v2: Coordinate,
  v3: Coordinate
) {
  // Step 1: Find two vectors that lie on the plane
  const u = { x: v1.x - v2.x, y: v1.y - v2.y, z: v1.z - v2.z };
  const v = { x: v1.x - v3.x, y: v1.y - v3.y, z: v1.z - v3.z };

  // Step 2: Take the cross product of the two vectors
  const perpendicularVector = {
    x: u.y * v.z - u.z * v.y,
    y: u.z * v.x - u.x * v.z,
    z: u.x * v.y - u.y * v.x,
  };

  return normalizeVector(perpendicularVector);
}

export function normalizeVector(v: Coordinate) {
  // Calculate the length of the vector
  const length = Math.sqrt(v.x ** 2 + v.y ** 2 + v.z ** 2);

  // Divide each component of the vector by the length to obtain a unit vector
  const unitVector = {
    x: v.x / length,
    y: v.y / length,
    z: v.z / length,
  };

  // Scale the unit vector by a factor of 2 and subtract 1 from each component
  const normalizedVector = {
    x: unitVector.x,
    y: unitVector.y,
    z: unitVector.z,
  };

  return normalizedVector;
}

export function pointDifference(v1: Coordinate, v2: Coordinate) {
  return {
    x: v2.x - v1.x,
    y: v2.y - v1.y,
    z: v2.z - v1.z,
  };
}

export function angleBetweenTwoVectors(v1: Vector, v2: Vector) {
  const dotProductValue = dotProduct(v1, v2);
  const magnitudeValue = magnitude(v1) * magnitude(v2);
  return (Math.acos(dotProductValue / magnitudeValue) * 180) / Math.PI;
}

export function directionBetweenTwoVectors(v1: Vector, v2: Vector): Vector {
  const v = pointDifference(v1, v2);
  const magnitudeValue = magnitude(v);
  return {
    x: v.x / magnitudeValue,
    y: v.y / magnitudeValue,
    z: v.z / magnitudeValue,
  };
}

function dotProduct(v1: Coordinate, v2: Coordinate) {
  return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
}

function magnitude(v: Coordinate) {
  // Calculate the magnitude (length) of the vector
  return Math.sqrt(v.x ** 2 + v.y ** 2 + v.z ** 2);
}

export function crossProduct(v1: Vector, v2: Vector): Vector {
  return {
    x: v1.y * v2.z - v1.z * v2.y,
    y: v1.z * v2.x - v1.x * v2.z,
    z: v1.x * v2.y - v1.y * v2.x,
  };
}

export function getMiddlePoint(
  coordinates: Coordinate[],
  offset = { x: 0, y: 0 }
): Coordinate {
  let totalX = 0;
  let totalY = 0;
  const len = coordinates.length;

  for (let i = 0; i < len; i++) {
    totalX += coordinates[i].x;
    totalY += coordinates[i].y;
  }

  const midX = totalX / len;
  const midY = totalY / len;

  return { x: midX + offset.x, y: midY + offset.y, z: 0 };
}

export function getDistance(v1: Coordinate, v2: Coordinate) {
  const x = v2.x - v1.x;
  const y = v2.y - v1.y;
  return Math.sqrt(x * x + y * y);
}
