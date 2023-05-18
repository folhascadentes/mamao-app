import { DetectorData, DetectorStates, CIRCLE_RADIUS } from "./detector";
import { Sign } from "../signs";
import { SubjectData } from "./subject";

export class Instructor {
  private ctx: CanvasRenderingContext2D;
  private sign: Sign;
  private angle: number;
  private orientation: number;
  private dominantLocation: Coordinate;
  private nonDominantLocation: Coordinate;

  constructor(ctx: CanvasRenderingContext2D, sign: Sign) {
    this.ctx = ctx;
    this.sign = sign;
    this.angle = 0;
    this.orientation = Math.random() > 0.5 ? 1 : -1;
    this.dominantLocation = { x: 0, y: 0, z: 0 };
    this.nonDominantLocation = { x: 0, y: 0, z: 0 };
  }

  public setSign(sign: Sign): void {
    this.sign = sign;
  }

  public instruct(subject: SubjectData, response: DetectorData): void {
    if (!response.valid) {
      if (response.state === DetectorStates.INITIAL_LOCATION) {
        this.instructPosition(
          response.memory.dominantCoordinate,
          response.memory.nonDominantCoordinate
        );
        this.angle = 0;
        this.orientation = Math.random() > 0.5 ? 1 : -1;
      } else if (response.state === DetectorStates.MOVEMENT) {
        this.instructPosition(
          response.memory.dominantEndCoordinate,
          response.memory.nonDominantEndCoordinate
        );
        this.instructMovement(this.sign.steps.movement.dominant.metadata.type);
      } else if (response.state === DetectorStates.FINAL_LOCATION) {
        this.instructPosition(
          response.memory.dominantEndCoordinate,
          response.memory.nonDominantEndCoordinate
        );
      }
    }
  }

  private instructPosition(
    dominantLocation: Coordinate,
    nonDominantLocation: Coordinate
  ): void {
    if (dominantLocation.x !== -1) {
      this.drawCircle(
        dominantLocation.x,
        dominantLocation.y,
        CIRCLE_RADIUS,
        "rgb(229, 123, 69, 0.8)"
      );

      this.dominantLocation = dominantLocation;
    }

    if (nonDominantLocation.x !== -1) {
      this.drawCircle(
        nonDominantLocation.x,
        nonDominantLocation.y,
        CIRCLE_RADIUS,
        "rgb(69, 104, 229, 0.8)"
      );

      this.nonDominantLocation = nonDominantLocation;
    }
  }

  private instructMovement(category: string): void {
    if (category === "CIRCULAR_MOTION") {
      this.drawCirculateMotion(
        360 - (this.angle % 360),
        this.dominantLocation.x,
        this.dominantLocation.y,
        85
      );
      if (this.orientation > 0) {
        this.angle += 20;
      } else {
        this.angle -= 20;
      }
    }
  }

  private drawCircle(
    x: number,
    y: number,
    radius: number,
    color: string
  ): void {
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = color;
    this.ctx.fill();
  }

  private drawCirculateMotion(
    angle: number,
    x: number,
    y: number,
    radius: number
  ): void {
    // Convert degree to radians
    const radians = (angle * Math.PI) / 180;

    // Calculate position using polar coordinates
    const pointX = x + radius * Math.cos(radians);
    const pointY = y + radius * Math.sin(radians);

    // Draw the point on canvas
    this.ctx.beginPath();
    this.ctx.arc(pointX, pointY, 12, 0, 2 * Math.PI);
    this.ctx.fillStyle = "rgb(229, 123, 69, 0.9)";
    this.ctx.fill();
  }
}

export function drawHand(
  ctx: CanvasRenderingContext2D,
  landmarks: Coordinate[],
  isDominant: boolean,
  isPalmDirectionFront: boolean
) {
  drawHandConnectors(ctx, landmarks, isDominant, isPalmDirectionFront);
}

function drawHandConnectors(
  ctx: CanvasRenderingContext2D,
  landmarks: Coordinate[],
  isDominant: boolean,
  isPalmDirectionFront: boolean
) {
  if (!landmarks.length) {
    return;
  }

  const palm = [
    landmarks[0],
    landmarks[1],
    landmarks[5],
    landmarks[9],
    landmarks[13],
    landmarks[17],
    landmarks[0],
  ];

  if (isPalmDirectionFront) {
    drawPolygon(ctx, palm, isDominant);
  }

  const strokes = [
    [landmarks[1], landmarks[2]],
    [landmarks[2], landmarks[3]],
    [landmarks[3], landmarks[4]],
    [landmarks[5], landmarks[6]],
    [landmarks[6], landmarks[7]],
    [landmarks[7], landmarks[8]],
    [landmarks[9], landmarks[10]],
    [landmarks[10], landmarks[11]],
    [landmarks[11], landmarks[12]],
    [landmarks[13], landmarks[14]],
    [landmarks[14], landmarks[15]],
    [landmarks[15], landmarks[16]],
    [landmarks[17], landmarks[18]],
    [landmarks[18], landmarks[19]],
    [landmarks[19], landmarks[20]],
  ];

  strokes.sort((a, b) => {
    if (a[1].z < b[1].z) {
      return 1;
    }
    if (a[1].z > b[1].z) {
      return -1;
    }
    return 0;
  });

  strokes.forEach((stroke) => {
    drawStroke(ctx, stroke[0], stroke[1], isDominant);
  });

  if (!isPalmDirectionFront) {
    drawPolygon(ctx, palm, isDominant);
  }
}

function drawStroke(
  ctx: CanvasRenderingContext2D,
  p1: Coordinate,
  p2: Coordinate,
  isDominant: boolean
) {
  const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
  gradient.addColorStop(0, isDominant ? "#ffc685" : "#8985ff");
  gradient.addColorStop(1, isDominant ? "#ff8c08" : "#4d47ff");
  ctx.strokeStyle = gradient;
  ctx.lineCap = "round";
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.stroke();
}

function drawPolygon(
  ctx: CanvasRenderingContext2D,
  landmarks: Coordinate[],
  isDominant: boolean
) {
  const gradient = ctx.createLinearGradient(0, 0, 720, 720);
  gradient.addColorStop(0, isDominant ? "#ffdeb8" : "#bab8ff");
  gradient.addColorStop(1, isDominant ? "#ff8c08" : "#4d47ff");

  ctx.beginPath();
  ctx.moveTo(landmarks[0].x, landmarks[0].y);
  for (let i = 1; i < landmarks.length; i++) {
    ctx.lineTo(landmarks[i].x, landmarks[i].y);
  }
  ctx.closePath();

  ctx.fillStyle = gradient;
  ctx.strokeStyle = gradient;

  ctx.lineJoin = "round";
  ctx.miterLimit = 6;

  ctx.fill();
  ctx.stroke();
}
