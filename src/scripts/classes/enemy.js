import * as PIXI from "pixi.js";
import { Vector2D } from "./vector.js";
import { isColliding } from "../functions/colliding.js";
import enemy1 from "/src/images/enemy1.png";

class Enemy {
  #prevMovement = new Vector2D(0.5, 0.5);
  #lerpFactor = 0.1;
  constructor(world, position, speed) {
    this.world = world;
    this.sprite = PIXI.Sprite.from(enemy1);
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

class RandomSpawn {
  #spawnFunctions;
  #spawnFunction;
  constructor(size) {
    this.size = size;

    this.#spawnFunctions = [
      () => new Vector2D(Math.random() * this.size.x, -40),
      () => new Vector2D(Math.random() * this.size.x, this.size.x + 40),
      () => new Vector2D(-40, Math.random() * this.size.y),
      () => new Vector2D(this.size.y + 40, Math.random() * this.size.y),
    ];
    this.randomSpawnFunction();
  }

  randomSpawnFunction() {
    const randomIndex = Math.floor(Math.random() * this.#spawnFunctions.length);
    this.#spawnFunction = this.#spawnFunctions[randomIndex];
  }

  getRandomSpawn() {
    return this.#spawnFunction();
  }
}

export class EnemySpawner {
  timePassed = 0;
  spawnDelay = 0;

  constructor(world) {
    this.world = world;
    this.randomSpawn = new RandomSpawn(this.world.size);
  }

  tick(delta) {
    this.timePassed += delta;
    if (this.timePassed > this.spawnDelay) {
      this.world.enemies.push(
        new Enemy(
          this.world,
          this.randomSpawn.getRandomSpawn(),
          this.world.level.enemySpeed
        )
      );
      this.timePassed = 0;
      this.newSpawnDelay();
    }
    for (const enemy of this.world.enemies) {
      enemy.tick(delta);
    }
  }

  newSpawnDelay() {
    this.spawnDelay =
      this.world.level.minEnemySpawnDelay +
      Math.random() *
        (this.world.level.maxEnemySpawnDelay -
          this.world.level.minEnemySpawnDelay);
  }
}
