export function getPerpendicularVector(v1: Coordinate, v2: Coordinate) {
  // Calcula o vetor diretor V entre P1 e P2
  var V = { x: v2.x - v1.x, y: v2.y - v1.y, z: v2.z - v1.z };

  // Define um vetor W no eixo Z
  var W = { x: 0, y: 1, z: 0 };

  // Calcula o vetor perpendicular N usando o produto vetorial entre V e W
  var Nx = V.y * W.z - V.z * W.y;
  var Ny = V.z * W.x - V.x * W.z;
  var Nz = V.x * W.y - V.y * W.x;
  var N = { x: Nx, y: Ny, z: Nz };

  // Retorna o vetor perpendicular
  return N;
}

export function getAngleWithXAxis(v: Coordinate) {
  // Calcula o ângulo entre o vetor v e o eixo x
  var angle = Math.atan2(v.z, v.x);

  // Converte o ângulo de radianos para graus
  angle = (angle * 180) / Math.PI;

  // Retorna o ângulo
  return angle;
}

export function findPerpendicularVector(v1: Coordinate, v2: Coordinate, v3: Coordinate) {
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

function normalizeVector(v: Coordinate) {
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

export function angleBetweenTwoVectors(v1: Coordinate, v2: Coordinate) {
  const dotProductValue = dotProduct(v1, v2);
  const magnitudeValue = magnitude(v1) * magnitude(v2);
  return (Math.acos(dotProductValue / magnitudeValue) * 180) / Math.PI;
}

function dotProduct(v1: Coordinate, v2: Coordinate) {
  return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
}

function magnitude(v: Coordinate) {
  return Math.sqrt(v.x ** 2 + v.y ** 2 + v.z ** 2);
}
