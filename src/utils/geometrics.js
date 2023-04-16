export function getPerpendicularVector(p1, p2) {
  // Calcula o vetor diretor V entre P1 e P2
  var V = { x: p2.x - p1.x, y: p2.y - p1.y, z: p2.z - p1.z };

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

export function getAngleWithXAxis(v) {
  // Calcula o ângulo entre o vetor v e o eixo x
  var angle = Math.atan2(v.z, v.x);

  // Converte o ângulo de radianos para graus
  angle = (angle * 180) / Math.PI;

  // Retorna o ângulo
  return angle;
}

export function findPerpendicularVector(x, y, z) {
  // Step 1: Find two vectors that lie on the plane
  const u = { x: x.x - y.x, y: x.y - y.y, z: x.z - y.z };
  const v = { x: x.x - z.x, y: x.y - z.y, z: x.z - z.z };

  // Step 2: Take the cross product of the two vectors
  const perpendicularVector = {
    x: u.y * v.z - u.z * v.y,
    y: u.z * v.x - u.x * v.z,
    z: u.x * v.y - u.y * v.x,
  };

  return perpendicularVector;
}
