import { getBodyRegionCoordinates, getMiddlePoint } from "./positions";

export class Detector {
  CIRCLE_RADIUS = 40;

  constructor(sign, ctx) {
    this.sign = JSON.parse(JSON.stringify(sign));
    this.currentSign = sign.sign[0];
    this.ctx = ctx;
    this.state = "configuration"; // "initialPosition" | "moviment" | "finalPosition"
  }

  run(subject, results) {
    if (this.state === "configuration") {
      if (
        subject.hand.dominantHand.configuration ===
          this.currentSign.start.configuration &&
        subject.hand.dominantHand.palm.x === this.currentSign.start.palm
      ) {
        this.state = "initialPosition";
        this.offset = this.getRandomXY(25);
      }
    } else if (this.state === "initialPosition") {
      this.initialPosition(subject, results);
      this.moviment = JSON.parse(JSON.stringify(this.currentSign.moviment));
    } else if (this.state === "moviment") {
      if (this.moviment === undefined || this.moviment.length === 0) {
        this.state = "finalPosition";
      } else if (this.moviment[0]) {
        const moviment = this.moviment[0];
        const correctMoviment = Object.keys(moviment).every((key) => {
          return subject.hand.dominantHand.moviment[key] === moviment[key];
        });
        if (correctMoviment) {
          this.moviment.shift();
        }
      }
    } else if (this.state === "finalPosition") {
      if (
        subject.hand.dominantHand.configuration ===
          this.currentSign.start.configuration &&
        subject.hand.dominantHand.palm.x === this.currentSign.start.palm
      ) {
        console.log("Uhaa");
        this.state = "configuration";
        return true;
      }
    }
  }

  initialPosition(subject, results) {
    if (subject && results.poseLandmarks.length) {
      const coordinate = getBodyRegionCoordinates(
        this.currentSign.start.region,
        results.poseLandmarks
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

      if (results.dominantHandLandmarks.length) {
        const middle = getMiddlePoint(...results.dominantHandLandmarks);
        const distance = Math.sqrt(
          Math.pow(middle.x - coordinate.x, 2) +
            Math.pow(middle.y - coordinate.y, 2)
        );

        if (distance < this.CIRCLE_RADIUS * 2) {
          this.state = "moviment";
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
