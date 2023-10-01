import Menu from "./scenes/menu.js";
import * as PIXI from "pixi.js";

export default class Coordinator {
  WIDTH = 600;
  HEIGHT = 900;
  constructor(window, body) {
    // Adjust the resolution for retina screens; along with
    // the autoDensity this transparently handles high resolutions
    // PIXI.settings.RESOLUTION = window.deviePixelRatio || 1;

    // The PixiJS application instance
    this.app = new PIXI.Application({
      width: this.WIDTH,
      height: this.HEIGHT,
      autoDensity: true, // Handles high DPI screens
      backgroundColor: 0x333333,
    });

    // Add application canvas to body
    body.appendChild(this.app.view);

    // Add a handler for the updates
    this.app.ticker.add((delta) => {
      this.update(delta);
    });

    // Load the menu scene initially; scenes get a reference
    // back to the coordinator so they can trigger transitions
    this.gotoScene(new Menu(this));
  }

  // Replace the current scene with the new one
  async gotoScene(newScene) {
    if (this.currentScene !== undefined) {
      await this.currentScene.onFinish();
      this.app.stage.removeChildren();
    }

    // This is the stage for the new scene
    const container = new PIXI.Container();
    container.width = this.WIDTH;
    container.height = this.HEIGHT;

    // Start the new scene and add it to the stage
    await newScene.onStart(container);
    this.app.stage.addChild(container);
    this.currentScene = newScene;
  }

  // This allows us to pass the PixiJS ticks
  // down to the currently active scene
  update(delta) {
    if (this.currentScene !== undefined) {
      this.currentScene.onUpdate(delta);
    }
  }
}
