import * as PIXI from "pixi.js";
import { Vector2D } from "./vector.js";
import { Bullet } from "./bullet.js";
import orjam from "/images/ørjam.jpg";

export class Mouse {
  bullets = [];
  #startPosition;

  constructor(world) {
    this.world = world;
    this.sprite = PIXI.Sprite.from(orjam);
    this.sprite.anchor.set(0.5);
    this.sprite.width = 20;
    this.sprite.height = 20;
    this.world.container.addChild(this.sprite);

    this.position = this.world.size.divide(2);
    this.#startPosition = this.position.copy();

    this.world.app.view.addEventListener("mousemove", (e) => {
      this.move(new Vector2D(e.movementX, e.movementY));
    });

    this.world.app.view.addEventListener("mousedown", async (e) => {
      this.onClick();
    });
    this.world.app.view.addEventListener("mouseup", (e) => {
      this.onRelease();
    });
  }

  move(changeVector) {
    this.position = this.position.add(changeVector);
    this.position = this.position.clamp(new Vector2D(0, 0), this.world.size);
  }

  onClick() {
    this.#startPosition = this.position.copy();
  }

  onRelease() {
    const shootVector = this.#startPosition.subtract(this.position).normalize();
    const distance = this.#startPosition.distance(this.position);
    const speed = distance / 20;
    if (speed < 2) {
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
