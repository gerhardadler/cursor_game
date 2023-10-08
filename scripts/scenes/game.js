import * as PIXI from "pixi.js";
import { Button } from "@pixi/ui";
import orjam from "/images/ørjam.jpg";
import { World } from "/scripts/classes/world.js";
import { Vector2D } from "/scripts/classes/vector.js";

export default class WorldScene {
  WORLD;
  constructor(coordinator) {
    this.app = coordinator.app;
    this.coordinator = coordinator;

    this.app.view.addEventListener("mousedown", (e) => {
      this.app.view.requestPointerLock({
        unadjustedMovement: true,
      });
    });
  }

  async onStart(container) {
    this.WORLD = new World(this.app, container, new Vector2D(600, 900));
    await this.app.view.requestPointerLock({
      unadjustedMovement: true,
    });
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

  getIsLocked() {
    return document.pointerLockElement === this.app.view;
  }
}
