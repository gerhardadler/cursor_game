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
  #levelsText;
  constructor(coordinator) {
    this.app = coordinator.app;
    this.coordinator = coordinator;

    this.die = this.die.bind(this);
    this.updatePointsText = this.updatePointsText.bind(this);
    this.updateKillsText = this.updateKillsText.bind(this);
    this.updateLevelsText = this.updateLevelsText.bind(this);

    this.app.view.addEventListener("mousedown", (e) => this.lockPointer);
  }

  lockPointer() {
    this.app.view.requestPointerLock();
  }

  async onStart(container) {
    this.#container = container;

    const background = PIXI.Sprite.from(gameBackground);

    this.#pointsText = new PIXI.Text("0", {
      fontFamily: "sans-serif",
      fill: 0x4f4f4f,
      fontSize: 24,
    });
    this.#pointsText.x = 90;
    this.#pointsText.y = 46;

    this.#killsText = new PIXI.Text("0", {
      fontFamily: "sans-serif",
      fill: 0x4f4f4f,
      fontSize: 24,
    });
    this.#killsText.x = 228;
    this.#killsText.y = 46;

    this.#levelsText = new PIXI.Text("1", {
      fontFamily: "sans-serif",
      fill: 0x575757,
      fontSize: 24,
      fontStyle: "bold",
    });
    this.#levelsText.x = 743;
    this.#levelsText.y = 46;

    this.#container.addChild(background);
    this.#container.addChild(this.#pointsText);
    this.#container.addChild(this.#killsText);
    this.#container.addChild(this.#levelsText);

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
      new Vector2D(900, 900),
      this.updatePointsText,
      this.updateKillsText,
      this.updateLevelsText,
      this.die
    );
  }

  getIsLocked() {
    return document.pointerLockElement === this.app.view;
  }

  updatePointsText(newPoints) {
    this.#pointsText.text = newPoints.toString();
    this.#pointsText.updateText(false);
  }

  updateKillsText(newKills) {
    this.#killsText.text = newKills.toString();
    this.#killsText.updateText(false);
  }

  updateLevelsText(newLevels) {
    this.#levelsText.text = newLevels.toString();
    this.#levelsText.updateText(false);
  }

  die() {
    document.exitPointerLock();
    this.app.view.removeEventListener("mousedown", this.lockPointer);
    this.coordinator.gotoScene(
      new DeathScreenScene(this.coordinator, this.WORLD.points)
    );
  }
}
