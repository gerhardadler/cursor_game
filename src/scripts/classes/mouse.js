import * as PIXI from "pixi.js";
import { Vector2D } from "./vector.js";
import { Bullet } from "./bullet.js";
import { mouseAsset } from "../assets.js";

export class Mouse {
  bullets = [];
  #startPosition;

  constructor(world) {
    this.world = world;
    this.sprite = PIXI.Sprite.from(mouseAsset);
    this.sprite.anchor.set(0.5);
    this.world.container.addChild(this.sprite);

    this.position = this.world.size.divide(2);
    this.resetStartPosition();

    this.world.app.canvas.addEventListener("mousemove", (e) => {
      if (this.world.paused) return;
      this.move(new Vector2D(e.movementX, e.movementY));
    });

    this.world.app.canvas.addEventListener("mousedown", async (e) => {
      if (this.world.paused) return;
      this.onClick();
    });
    this.world.app.canvas.addEventListener("mouseup", (e) => {
      if (this.world.paused) return;
      this.onRelease();
    });
  }

  move(changeVector) {
    this.position = this.position.add(changeVector);
    this.position = this.position.clamp(new Vector2D(0, 0), this.world.size);
  }

  resetStartPosition() {
    this.#startPosition = this.position.copy();
  }

  onClick() {
    this.resetStartPosition();
  }

  onRelease() {
    const shootVector = this.#startPosition.subtract(this.position).normalize();
    const distance = this.#startPosition.distance(this.position);
    const speed = distance / 200;
    if (speed < 0.2) {
      return;
    }
    this.bullets.push(
      new Bullet(this.world, this.position, shootVector, speed)
    );
  }

  tick(delta) {
    this.sprite.x = this.position.x;
    this.sprite.y = this.position.y;

    for (const bullet of this.bullets) {
      bullet.tick(delta);
    }
  }
}
