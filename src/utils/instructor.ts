import { DetectorStates, CIRCLE_RADIUS } from "./detector";
import { Sign } from "../signs";

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

  public instruct(subject, response): void {
    if (!response.valid) {
      if (response.state === DetectorStates.INITIAL_LOCATION) {
        this.instructPosition(
          response.memory.dominantHandCoordinate,
          response.memory.nonDominantHandCoordinate
        );
        this.angle = 0;
        this.orientation = Math.random() > 0.5 ? 1 : -1;
      } else if (response.state === DetectorStates.MOVEMENT) {
        this.instructPosition(
          response.memory.dominantHandEndCoordinate,
          response.memory.nonDominantHandEndCoordinate
        );
        this.instructMovement(
          this.sign.steps.movement.dominantHandCategory
        );
      } else if (response.state === DetectorStates.FINAL_LOCATION) {
        this.instructPosition(
          response.memory.dominantHandEndCoordinate,
          response.memory.nonDominantHandEndCoordinate
        );
      }
    }
  }

  private instructPosition(
    dominantLocation: Coordinate,
    nonDominantLocation: Coordinate
  ): void {
    if (dominantLocation) {
      this.drawCircle(
        dominantLocation.x,
        dominantLocation.y,
        CIRCLE_RADIUS,
        "rgb(229, 123, 69, 0.8)"
      );

      this.dominantLocation = dominantLocation;
    }

    if (nonDominantLocation) {
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