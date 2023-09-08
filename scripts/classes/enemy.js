import { Vector2D } from "./vector.js";

class Enemy {
  constructor(app, mousePosition, position, speed, enemies) {
    this.app = app;
    this.sprite = PIXI.Sprite.from("images/ørjam.jpg");
    this.sprite.anchor.set(0.5);
    this.sprite.width = 20;
    this.sprite.height = 20;
    this.app.stage.addChild(this.sprite);

    this.mousePosition = mousePosition;
    this.position = position;
    this.speed = speed;
    this.enemies = enemies;
    this.separationDistance = 40;
  }

  tick(delta) {
    const mouseVector = this.mousePosition.subtract(this.position).normalize();

    // Calculate separation vector from other enemies
    let separationVector = new Vector2D(0, 0); // Create a Vector class to represent vectors
    for (const enemy of this.enemies) {
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
}

export class EnemySpawner {
  timePassed = 0;
  minSpawnDelay = 100;
  maxSpawnDelay = 300;
  spawnDelay = 300;

  constructor(world) {
    this.app = world.app;
    this.mousePosition = world.mouse.position;
    this.enemies = [];
  }

  tick(delta) {
    this.timePassed += delta;
    if (this.timePassed > this.spawnDelay) {
      this.enemies.push(
        new Enemy(
          this.app,
          this.mousePosition,
          new Vector2D(100, 20),
          1,
          this.enemies
        )
      );
      this.timePassed = 0;
      this.newSpawnDelay();
    }
    for (const enemy of this.enemies) {
      enemy.tick(delta);
    }
  }

  newSpawnDelay() {
    this.spawnDelay =
      this.minSpawnDelay +
      Math.random() * (this.maxSpawnDelay - this.minSpawnDelay);
  }
}
