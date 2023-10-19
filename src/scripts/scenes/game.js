import { World } from "/src/scripts/classes/world.js";
import { Vector2D } from "/src/scripts/classes/vector.js";
import DeathScreenScene from "./deathScreen";

export class GameScene {
  WORLD;
  container;
  constructor(coordinator) {
    this.app = coordinator.app;
    this.coordinator = coordinator;

    this.dieCallback = this.dieCallback.bind(this);

    this.app.view.addEventListener("mousedown", (e) => this.lockPointer);
  }

  lockPointer() {
    this.app.view.requestPointerLock({
      unadjustedMovement: true,
    });
  }

  async onStart(container) {
    this.container = container;
    this.createWorld();
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

  createWorld() {
    if (this.container === undefined) {
      throw Error("Container can't be undefined");
    }
    this.WORLD = new World(
      this.app,
      this.container,
      new Vector2D(600, 900),
      this.dieCallback
    );
  }

  getIsLocked() {
    return document.pointerLockElement === this.app.view;
  }

  dieCallback() {
    document.exitPointerLock();
    this.app.view.removeEventListener("mousedown", this.lockPointer);
    this.coordinator.gotoScene(
      new DeathScreenScene(this.coordinator, this.WORLD.points)
    );
  }
}
