import { EnemySpawner } from "./enemy.js";
import { Mouse } from "./mouse.js";

export class World {
  constructor(app, size) {
    this.app = app;
    this.size = size;
    this.mouse = new Mouse(this);
    this.enemies = [];
    this.enemySpawner = new EnemySpawner(this);
  }
  tick(delta) {
    this.mouse.tick(delta);
    this.enemySpawner.tick(delta);
  }
}
