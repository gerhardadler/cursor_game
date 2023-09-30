import { Vector2D } from "./vector.js";
import { Bullet } from "./bullet.js";

export class Mouse {
  position = new Vector2D(0, 0);
  #startPosition = new Vector2D(0, 0);
  bullets = [];

  constructor(world) {
    this.world = world;
    this.sprite = PIXI.Sprite.from("images/ørjam.jpg");
    this.sprite.anchor.set(0.5);
    this.sprite.width = 20;
    this.sprite.height = 20;
    this.world.app.stage.addChild(this.sprite);

    this.world.app.view.addEventListener("mousemove", (e) => {
      this.position.x =
        e.clientX - this.world.app.view.getBoundingClientRect().left;
      this.position.y =
        e.clientY - this.world.app.view.getBoundingClientRect().top;
    });

    this.world.app.view.addEventListener("mousedown", (e) => {
      console.log("click");
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

  tick(delta) {
    this.sprite.x = this.position.x;
    this.sprite.y = this.position.y;

    for (const bullet of this.bullets) {
      bullet.tick(delta);
    }
  }
}
