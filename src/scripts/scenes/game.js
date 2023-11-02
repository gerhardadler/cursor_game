import * as PIXI from "pixi.js";
import { World } from "/src/scripts/classes/world.js";
import { Vector2D } from "/src/scripts/classes/vector.js";
import { DeathScreenScene } from "./deathScreen";
import gameBackground from "/src/images/game.png";

export class GameScene {
  WORLD;
  #container;
  #pointsText;
  #killsText;
  constructor(coordinator) {
    this.app = coordinator.app;
    this.coordinator = coordinator;

    this.die = this.die.bind(this);
    this.updatePointsText = this.updatePointsText.bind(this);
    this.updateKillsText = this.updateKillsText.bind(this);

    this.app.view.addEventListener("mousedown", (e) => this.lockPointer);
  }

  lockPointer() {
    this.app.view.requestPointerLock();
  }

  async onStart(container) {
    this.#container = container;

    const background = PIXI.Sprite.from(gameBackground);

    this.#pointsText = new PIXI.Text("P: 0", {
      fontFamily: "Roboto Mono",
      fill: 0x000000,
      fontSize: 62,
    });
    this.#pointsText.x = 20;
    this.#pointsText.y = 20;

    this.#killsText = new PIXI.Text("K: 0", {
      fontFamily: "Roboto Mono",
      fill: 0x000000,
      fontSize: 62,
    });
    this.#killsText.x = 20;
    this.#killsText.y = 80;

    this.#container.addChild(background);
    this.#container.addChild(this.#pointsText);
    this.#container.addChild(this.#killsText);

    this.createWorld();
    this.lockPointer();
  }

  onUpdate(delta) {
    if (!this.getIsLocked()) {
      return;
    }
    if (this.WORLD === undefined) {
      return;
    }
    this.WORLD.tick(delta);
  }

  onFinish() {}

  createWorld() {
    if (this.#container === undefined) {
      throw Error("Container can't be undefined");
    }
    this.WORLD = new World(
      this.app,
      this.#container,
      new Vector2D(600, 900),
      this.updatePointsText,
      this.updateKillsText,
      this.die
    );
  }

  getIsLocked() {
    return document.pointerLockElement === this.app.view;
  }

  updatePointsText(newPoints) {
    this.#pointsText.text = "P: " + newPoints.toString();
    this.#pointsText.updateText(false);
  }

  updateKillsText(newKills) {
    this.#killsText.text = "K: " + newKills.toString();
    this.#killsText.updateText(false);
  }

  die() {
    document.exitPointerLock();
    this.app.view.removeEventListener("mousedown", this.lockPointer);
    this.coordinator.gotoScene(
      new DeathScreenScene(this.coordinator, this.WORLD.points)
    );
  }
}
