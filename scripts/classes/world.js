import * as PIXI from "pixi.js";
import { EnemySpawner } from "./enemy.js";
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

  constructor(app, container, size) {
    this.app = app;
    this.container = container;
    this.size = size;
    this.mouse = new Mouse(this);
    this.enemies = [];
    this.enemySpawner = new EnemySpawner(this);
    this.level = Level.fromPoints(this.#points);

    this.pointsText = new PIXI.Text("0", {
      fontFamily: "Roboto Mono",
      fill: 0x000000,
      fontSize: 62,
    });
    this.pointsText.x = 20;
    this.pointsText.y = 20;

    this.container.addChild(this.pointsText);
  }

  tick(delta) {
    this.mouse.tick(delta);
    this.enemySpawner.tick(delta);
  }

  onPointsChange() {
    this.level = Level.fromPoints(this.#points);
    this.pointsText.text = this.#points.toString();
    this.pointsText.updateText(false);
  }
}
