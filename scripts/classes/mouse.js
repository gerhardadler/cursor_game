import { Vector2D } from "./vector.js";
import { Bullet } from "./bullet.js";

export class Mouse {
  position = new Vector2D(0, 0);
  #startPosition = new Vector2D(0, 0);
  #bullets = [];

  constructor(app) {
    this.app = app;
  }

  updateMousePosition(newMousePosition) {
    this.position = newMousePosition;
  }

  onClick() {
    this.#startPosition = this.position.copy();
  }

  onRelease() {
    const shootVector = this.#startPosition.subtract(this.position).normalize();
    const distance = this.#startPosition.distance(this.position);
    console.log(this.#startPosition);
    console.log(this.position);
    console.log(shootVector);
    this.#bullets.push(
      new Bullet(this.app, this.position, shootVector, distance / 20)
    );
  }

  tick(delta) {
    for (const bullet of this.#bullets) {
      bullet.tick(delta);
    }
  }
}
