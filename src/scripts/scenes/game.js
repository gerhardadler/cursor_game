import * as PIXI from "pixi.js";
import { World } from "/src/scripts/classes/world.js";
import { Vector2D } from "/src/scripts/classes/vector.js";
import { DeathScreenScene } from "./deathScreen";
import { gameBackgroundAsset } from "../assets.js";

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
    this.lockPointer = this.lockPointer.bind(this);
    this.lockChange = this.lockChange.bind(this);
    this.updatePointsText = this.updatePointsText.bind(this);
    this.updateKillsText = this.updateKillsText.bind(this);
    this.updateLevelsText = this.updateLevelsText.bind(this);

    this.app.canvas.addEventListener("mousedown", this.lockPointer);
    document.addEventListener("pointerlockchange", this.lockChange);
  }

  lockPointer() {
    this.app.canvas.requestPointerLock();
  }
  lockChange() {
    if (document.pointerLockElement === this.app.canvas) {
      this.WORLD.paused = false;
    } else {
      this.WORLD.paused = true;
    }
  }

  async onStart(container) {
    this.#container = container;

    const background = PIXI.Sprite.from(gameBackgroundAsset);

    this.#pointsText = new PIXI.Text({
      text: "0",
      style: {
        fontFamily: "sans-serif",
        fill: 0x4f4f4f,
        fontSize: 24,
      },
    });
    this.#pointsText.x = 90;
    this.#pointsText.y = 46;

    this.#killsText = new PIXI.Text({
      text: "0",
      style: {
        fontFamily: "sans-serif",
        fill: 0x4f4f4f,
        fontSize: 24,
      },
    });
    this.#killsText.x = 228;
    this.#killsText.y = 46;

    this.#levelsText = new PIXI.Text({
      text: "1",
      style: {
        fontFamily: "sans-serif",
        fill: 0x575757,
        fontSize: 24,
        fontStyle: "bold",
      },
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

  updatePointsText(newPoints) {
    this.#pointsText.text = newPoints.toString();
    // this.#pointsText.updateText(false);
  }

  updateKillsText(newKills) {
    this.#killsText.text = newKills.toString();
    // this.#killsText.updateText(false);
  }

  updateLevelsText(newLevels) {
    this.#levelsText.text = newLevels.toString();
    // this.#levelsText.updateText(false);
  }

  die() {
    document.exitPointerLock();
    this.app.canvas.removeEventListener("mousedown", this.lockPointer);
    this.coordinator.gotoScene(
      new DeathScreenScene(this.coordinator, this.WORLD.points)
    );
  }
}
