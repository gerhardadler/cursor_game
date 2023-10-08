import * as PIXI from "pixi.js";
import orjam from "/src/images/ørjam.jpg";

export class Bullet {
  #lifetime = 0;
  constructor(world, position, directionVector, speed) {
    this.world = world;

    this.sprite = PIXI.Sprite.from(orjam);
    this.sprite.anchor.set(0.5);
    this.sprite.width = 10;
    this.sprite.height = 10;
    this.world.container.addChild(this.sprite);

    this.position = position;
    this.directionVector = directionVector;
    this.speed = speed;
  }

  tick(delta) {
    this.#lifetime += delta;
    if (this.#lifetime > 7000) {
      this.kill();
      return;
    }
    this.position = this.position.add(
      this.directionVector.multiply(this.speed * delta)
    );

    this.sprite.x = this.position.x;
    this.sprite.y = this.position.y;
  }

  getIndex() {
    return this.world.mouse.bullets.indexOf(this);
  }

  kill() {
    this.world.container.removeChild(this.sprite);
    this.sprite.destroy();
    this.world.mouse.bullets.splice(this.getIndex(), 1);
  }
}
