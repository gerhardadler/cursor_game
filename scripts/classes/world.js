import { EnemySpawner } from "./enemy.js";
import { Mouse } from "./mouse.js";

export class World {
  constructor(app) {
    this.app = app;
    this.mouse = new Mouse(this);
    this.enemySpawner = new EnemySpawner(this);
  }
  tick(delta) {
    this.mouse.tick(delta);
    this.enemySpawner.tick(delta);
  }
}
