import * as PIXI from "pixi.js";
import { Vector2D } from "./vector.js";
import { isColliding } from "../functions/colliding.js";
import { enemy1Asset } from "../assets.js";

export class Enemy {
  #prevMovement = new Vector2D(0.5, 0.5);
  #lerpFactor = 0.1;
  constructor(world, position, speed) {
    this.world = world;
    this.sprite = PIXI.Sprite.from(enemy1Asset);
    this.sprite.anchor.set(0.5);
    this.world.container.addChild(this.sprite);

    this.position = position;
    this.speed = speed;
    this.separationDistance = 80;
    this.followStrength = 50;
  }

  tick(delta) {
    const targetDirection = this.getFollowDirection();

    const interpolatedMovement = this.#prevMovement.lerp(
      targetDirection,
      this.#lerpFactor
    );
    this.position = this.position.add(
      interpolatedMovement.multiply(this.speed * delta)
    );

    this.sprite.x = this.position.x;
    this.sprite.y = this.position.y;

    for (const bullet of this.world.mouse.bullets) {
      if (isColliding(this.sprite, bullet.sprite)) {
        bullet.addKill();
        this.kill();
        return;
      }
    }

    if (isColliding(this.sprite, this.world.mouse.sprite)) {
      this.world.dieCallback();
    }

    this.#prevMovement = interpolatedMovement;
  }

  getFollowDirection() {
    const mouseVector = this.world.mouse.position
      .subtract(this.position)
      .normalize();

    // Calculate separation vector from other enemies
    let separationVector = new Vector2D(0, 0); // Create a Vector class to represent vectors
    for (const enemy of this.world.enemies) {
      if (enemy !== this) {
        const distance = this.position.distance(enemy.position);
        if (distance < this.separationDistance) {
          // Calculate a separation force away from the nearby enemy
          const awayVector = this.position
            .subtract(enemy.position)
            .normalize()
            .multiply(this.separationDistance - distance);
          separationVector = separationVector.add(awayVector);
        }
      }
    }

    // Combine the mouse-following and separation vectors
    return mouseVector
      .add(separationVector.divide(this.followStrength))
      .normalize();
  }

  getIndex() {
    return this.world.enemies.indexOf(this);
  }

  kill() {
    this.world.container.removeChild(this.sprite);
    this.sprite.destroy();
    this.world.enemies.splice(this.getIndex(), 1);
  }
}
