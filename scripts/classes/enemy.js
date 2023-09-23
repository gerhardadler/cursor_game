import { Vector2D } from "./vector.js";

class Enemy {
  constructor(world, position, speed) {
    this.world = world;
    this.sprite = PIXI.Sprite.from("images/ørjam.jpg");
    this.sprite.anchor.set(0.5);
    this.sprite.width = 20;
    this.sprite.height = 20;
    this.world.app.stage.addChild(this.sprite);

    this.position = position;
    this.speed = speed;
    this.separationDistance = 40;
  }

  tick(delta) {
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
    const combinedVector = mouseVector.add(separationVector).normalize();

    this.position = this.position.add(
      combinedVector.multiply(this.speed * delta)
    );

    this.sprite.x = this.position.x;
    this.sprite.y = this.position.y;
  }

  getIndex() {
    return this.world.enemies.indexOf(this);
  }

  kill() {
    this.world.app.stage.removeChild(this.sprite);
    this.sprite.destroy();
    this.world.enemies.splice(this.getIndex(), 1);
  }
}

export class EnemySpawner {
  timePassed = 0;
  minSpawnDelay = 100;
  maxSpawnDelay = 300;
  spawnDelay = 0;

  constructor(world) {
    this.world = world;
  }

  tick(delta) {
    this.timePassed += delta;
    if (this.timePassed > this.spawnDelay) {
      this.world.enemies.push(new Enemy(this.world, new Vector2D(100, 20), 1));
      this.timePassed = 0;
      this.newSpawnDelay();
    }
    for (const enemy of this.world.enemies) {
      enemy.tick(delta);
    }
  }

  newSpawnDelay() {
    this.spawnDelay =
      this.minSpawnDelay +
      Math.random() * (this.maxSpawnDelay - this.minSpawnDelay);
  }
}
