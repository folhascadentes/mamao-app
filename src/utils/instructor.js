import { DetectorStates } from "./detector";
import { getMiddlePoint } from "./positions";

export class Instructor {
  constructor(ctx, sign) {
    this.ctx = ctx;
    this.sign = sign;
    this.angle = 0;
    this.dominantHandPosition = { x: 0, y: 0 };
    this.nonDominantHandPosition = { x: 0, y: 0 };
  }

  setSign(sign) {
    this.sign = sign;
  }

  instruct(subject, response) {
    if (subject.dominantHandLandmarks.length && !response.valid) {
      if (
        response.state === DetectorStates.PALM_DIRECTION ||
        response.state === DetectorStates.FINAL_PALM_DIRECTION
      ) {
        // - experimental -
        // this.instructPalmState(subject);
      } else if (response.state === DetectorStates.INITIAL_POSITION) {
        this.instructPosition(
          response.memory.dominantHandCoordinate,
          response.memory.nonDominantHandCoordinate
        );
        this.angle = 0;
      } else if (response.state === DetectorStates.MOVEMENT) {
        this.instructPosition(
          response.memory.dominantHandEndCoordinate,
          response.memory.nonDominantHandEndCoordinate
        );
        this.instructMovement();
      } else if (response.state === DetectorStates.FINAL_POSITION) {
        this.instructPosition(
          response.memory.dominantHandEndCoordinate,
          response.memory.nonDominantHandEndCoordinate
        );
      }
    }
  }

  instructPalmState(subject) {
    const vector = subject.hand.dominantHand.palm;
    const coordinate = getMiddlePoint(
      subject.dominantHandLandmarks[0],
      subject.dominantHandLandmarks[5],
      subject.dominantHandLandmarks[17]
    );
    const palmDirection =
      this.sign.signSteps.startPosition.dominantHand.palmDirection;
    const pivoVector = {
      x: -palmDirection.x * 100,
      y: palmDirection.y * 100,
      z: palmDirection.z * 100,
    };
    const offsetX = rotateVectorY(pivoVector, subject.body.angle).x;

    // Where
    this.ctx.lineWidth = 3;
    this.ctx.strokeStyle = "#ed5b51";
    this.ctx.beginPath();
    // x-axis
    this.ctx.moveTo(coordinate.x, coordinate.y);
    this.ctx.lineTo(coordinate.x + offsetX, coordinate.y);
    this.ctx.stroke();
    // y-axis
    this.ctx.moveTo(coordinate.x, coordinate.y);
    this.ctx.lineTo(coordinate.x, coordinate.y - pivoVector.y);
    this.ctx.stroke();

    // Current
    const angleXY = (Math.atan2(vector.y, vector.x) * 180) / Math.PI;
    const angleXZ = (Math.atan2(vector.z, vector.x) * 180) / Math.PI;

    this.ctx.strokeStyle = "#51ed7d";
    this.ctx.beginPath();
    // x-axis
    this.ctx.moveTo(coordinate.x, coordinate.y);
    this.ctx.lineTo(
      coordinate.x - rotateVectorY(pivoVector, angleXZ - subject.body.angle).x,
      coordinate.y
    );
    this.ctx.stroke();
    // y-axis
    this.ctx.moveTo(coordinate.x, coordinate.y);
    this.ctx.lineTo(
      coordinate.x,
      coordinate.y + rotateVectorX(pivoVector, angleXY).y
    );
    this.ctx.stroke();
  }

  instructPosition(dominantHandCoordinate, nonDominantHandCoordinate) {
    if (dominantHandCoordinate) {
      drawCircle(
        this.ctx,
        dominantHandCoordinate.x,
        dominantHandCoordinate.y,
        45,
        "rgb(229, 123, 69, 0.8)"
      );
    }

    if (nonDominantHandCoordinate) {
      drawCircle(
        this.ctx,
        nonDominantHandCoordinate.x,
        nonDominantHandCoordinate.y,
        45,
        "rgb(69, 104, 229, 0.8)"
      );
    }
    this.dominantHandPosition = dominantHandCoordinate;
    this.nonDominantHandPosition = nonDominantHandCoordinate;
  }

  instructMovement() {
    drawCirculateMotion(
      this.ctx,
      360 - (this.angle % 360),
      this.dominantHandPosition.x,
      this.dominantHandPosition.y,
      85
    );
    this.angle += 20;
  }
}

function rotateVectorY(vector, theta) {
  // Convert angle to radians
  const thetaRad = (theta * Math.PI) / 180;

  // Calculate the cosine and sine of the angle
  const cosTheta = Math.cos(thetaRad);
  const sinTheta = Math.sin(thetaRad);

  // Calculate the rotated vector
  const rotatedVector = {
    x: cosTheta * vector.x + sinTheta * vector.z,
    y: vector.y,
    z: -sinTheta * vector.x + cosTheta * vector.z,
  };

  return rotatedVector;
}

function rotateVectorX(vector, degrees) {
  // Convert degrees to radians
  const radians = (degrees * Math.PI) / 180;

  // Apply rotation matrix for rotation around x-axis
  const x = vector.x;
  const y = vector.y * Math.cos(radians) - vector.z * Math.sin(radians);
  const z = vector.y * Math.sin(radians) + vector.z * Math.cos(radians);

  return { x, y, z };
}

function drawCircle(ctx, centerX, centerY, radius, color) {
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawCirculateMotion(ctx, angle, centerX, centerY, radius) {
  // Converta o ângulo de graus para radianos
  const radians = (angle * Math.PI) / 180;

  // Calcule a posição do ponto usando coordenadas polares
  const pointX = centerX + radius * Math.cos(radians);
  const pointY = centerY + radius * Math.sin(radians);

  // Desenhe o ponto no canvas
  ctx.beginPath();
  ctx.arc(pointX, pointY, 12, 0, 2 * Math.PI);
  ctx.fillStyle = "rgb(229, 123, 69, 0.9)";
  ctx.fill();
}
