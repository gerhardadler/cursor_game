import * as PIXI from "pixi.js";
import { EnemySpawner } from "./enemySpawner.js";
import { Mouse } from "./mouse.js";
import { Level } from "./levels.js";

export class World {
  #points = 0;
  get points() {
    return this.#points;
  }
  set points(value) {
    this.#points = value;
    this.onPointsChange();
  }

  #kills = 0;
  get kills() {
    return this.#kills;
  }
  set kills(value) {
    this.#kills = value;
    this.onKillsChange();
  }

  paused = false;

  constructor(
    app,
    container,
    size,
    pointsCallback,
    killsCallback,
    levelsCallback,
    dieCallback
  ) {
    this.app = app;
    this.container = container;
    this.size = size;
    this.mouse = new Mouse(this);
    this.enemies = [];
    this.enemySpawner = new EnemySpawner(this);
    this.level = Level.fromKills(this.#kills);
    this.pointsCallback = pointsCallback;
    this.killsCallback = killsCallback;
    this.levelsCallback = levelsCallback;
    this.dieCallback = dieCallback;
  }

  tick(delta) {
    if (this.paused) return;
    this.mouse.tick(delta);
    this.enemySpawner.tick(delta);
    this.gameDuration += delta;
  }

  onPointsChange() {
    this.pointsCallback(this.#points);
  }

  onKillsChange() {
    this.killsCallback(this.#kills);
    this.level = Level.fromKills(this.#kills);
    this.levelsCallback(this.level.level);
  }
}
