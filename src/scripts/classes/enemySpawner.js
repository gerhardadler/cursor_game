import { Vector2D } from "./vector.js";
import { Enemy } from "./enemy.js";

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
  spawnWait = 0;
  spawnFunctionWait = 0;

  constructor(world) {
    this.world = world;
    this.randomSpawn = new RandomSpawn(this.world.size);
  }

  tick(delta) {
    this.spawnWait -= delta;
    this.spawnFunctionWait -= delta;

    if (this.spawnFunctionWait < 0) {
      this.randomSpawn.randomSpawnFunction();
      this.newSpawnFunctionWait();
    }
    if (this.spawnWait < 0) {
      this.world.enemies.push(
        new Enemy(
          this.world,
          this.randomSpawn.getRandomSpawn(),
          this.world.level.enemySpeed
        )
      );
      this.newSpawnWait();
    }

    for (const enemy of this.world.enemies) {
      enemy.tick(delta);
    }
  }

  newSpawnWait() {
    this.spawnWait =
      this.world.level.minEnemySpawnDelay +
      Math.random() *
        (this.world.level.maxEnemySpawnDelay -
          this.world.level.minEnemySpawnDelay);
  }

  newSpawnFunctionWait() {
    this.spawnFunctionWait =
      this.world.level.minEnemySpawnDelay * 20 +
      Math.random() *
        (this.world.level.maxEnemySpawnDelay * 20 -
          this.world.level.minEnemySpawnDelay * 20);
  }
}
