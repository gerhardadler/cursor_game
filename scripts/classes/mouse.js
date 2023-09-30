import { Vector2D } from "./vector.js";
import { Bullet } from "./bullet.js";

export class Mouse {
  bullets = [];
  #startPosition;

  constructor(world) {
    this.world = world;
    this.sprite = PIXI.Sprite.from("images/ørjam.jpg");
    this.sprite.anchor.set(0.5);
    this.sprite.width = 20;
    this.sprite.height = 20;
    this.world.app.stage.addChild(this.sprite);

    this.position = this.world.size.divide(2);
    this.#startPosition = this.position.copy();

    this.world.app.view.addEventListener("mousemove", (e) => {
      this.position.x += e.movementX;
      this.position.y += e.movementY;
    });

    this.world.app.view.addEventListener("mousedown", async (e) => {
      this.onClick();
    });
    this.world.app.view.addEventListener("mouseup", (e) => {
      this.onRelease();
    });
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
    const speed = distance / 20;
    if (speed < 2) {
      return;
    }
    this.bullets.push(
      new Bullet(this.world, this.position, shootVector, speed)
    );
  }

  getIsLocked() {
    return document.pointerLockElement === this.world.app.view;
  }

  tick(delta) {
    this.sprite.x = this.position.x;
    this.sprite.y = this.position.y;

    for (const bullet of this.bullets) {
      bullet.tick(delta);
    }
  }
}
