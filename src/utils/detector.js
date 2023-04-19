import { getBodyRegionCoordinates, getMiddlePoint } from "./positions";

export class Detector {
  CIRCLE_RADIUS = 40;

  constructor(sign, ctx) {
    this.sign = JSON.parse(JSON.stringify(sign));
    this.currentSign = sign.signSteps[0];
    this.ctx = ctx;
    this.state = "configuration"; // "initialPosition" | "movement" | "finalPosition"
  }

  run(subject) {
    if (this.state === "configuration") {
      if (
        subject.hand.dominantHand.configuration ===
          this.currentSign.startPosition.dominantHand.handConfiguration &&
        Object.keys(
          this.currentSign.startPosition.dominantHand.palmDirection
        ).every(
          (key) =>
            subject.hand.dominantHand.palm[key] ===
            this.currentSign.startPosition.dominantHand.palmDirection[key]
        )
      ) {
        this.state = "initialPosition";
        this.offset = this.getRandomXY(75);
      }
    } else if (this.state === "initialPosition") {
      this.initialPosition(subject);
      this.movements = JSON.parse(
        JSON.stringify(this.currentSign.movements.dominantHand)
      );
    } else if (this.state === "movement") {
      if (this.movements === undefined || this.movements.length === 0) {
        this.state = "finalPosition";
      } else if (this.movements[0]) {
        const movement = this.movements[0];
        const correctMovement = Object.keys(movement).every((key) => {
          return subject.hand.dominantHand.movement[key] === movement[key];
        });
        if (correctMovement) {
          this.movements.shift();
        }
      }
    } else if (this.state === "finalPosition") {
      if (
        subject.hand.dominantHand.configuration ===
          this.currentSign.endPosition.dominantHand.handConfiguration &&
        Object.keys(
          this.currentSign.endPosition.dominantHand.palmDirection
        ).every(
          (key) =>
            subject.hand.dominantHand.palm[key] ===
            this.currentSign.endPosition.dominantHand.palmDirection[key]
        )
      ) {
        console.log("Uhaa");
        this.state = "configuration";
        return true;
      }
    }
  }

  initialPosition(subject) {
    if (subject && subject.poseLandmarks.length) {
      const coordinate = getBodyRegionCoordinates(
        this.currentSign.startPosition.dominantHand.bodyRegion,
        subject.poseLandmarks
      );

      const oldCoordinate = this.lastCoordinate ?? coordinate;
      const smoothCoordinate = getMiddlePoint(
        oldCoordinate,
        oldCoordinate,
        oldCoordinate,
        coordinate
      );
      this.lastCoordinate = coordinate;

      this.drawCircle({
        x:
          smoothCoordinate.x +
          this.offset.x +
          Math.floor(subject.body.angle / 10) * 10 * 2.9,
        y: smoothCoordinate.y + this.offset.y,
      });

      if (subject.dominantHandLandmarks.length) {
        const middle = getMiddlePoint(...subject.dominantHandLandmarks);
        const distance = Math.sqrt(
          Math.pow(middle.x - coordinate.x, 2) +
            Math.pow(middle.y - coordinate.y, 2)
        );

        if (distance < this.CIRCLE_RADIUS * 1.6) {
          this.state = "movement";
        }
      }
    }
  }

  drawCircle(landmark, color = "rgb(229, 123, 69, 0.8)") {
    this.ctx.beginPath();
    this.ctx.arc(
      landmark.x,
      landmark.y,
      this.CIRCLE_RADIUS,
      0,
      2 * Math.PI,
      false
    );
    this.ctx.fillStyle = color;
    this.ctx.fill();
  }

  getRandomXY(V) {
    const x = Math.random() * (2 * V) - V;
    const y = Math.random() * (2 * V) - V;
    return { x, y };
  }
}
