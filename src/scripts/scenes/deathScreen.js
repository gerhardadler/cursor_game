import * as PIXI from "pixi.js";
import { Button } from "@pixi/ui";
import MenuScene from "./menu.js";
import { orjamAsset } from "../assets.js";

export class DeathScreenScene {
  constructor(coordinator, points) {
    this.app = coordinator.app;
    this.coordinator = coordinator;
    this.points = points;
  }

  async onStart(container) {
    const titleText = new PIXI.Text({
      text: "Dead",
      style: {
        fontFamily: "Roboto Mono",
        fill: 0x000000,
        fontSize: 62,
      },
    });
    titleText.x = 35;
    titleText.y = 90;

    const pointsText = new PIXI.Text({
      text: this.points,
      style: {
        fontFamily: "Roboto Mono",
        fill: 0x000000,
        fontSize: 62,
      },
    });
    pointsText.x = 35;
    pointsText.y = 150;

    const button = new Button(PIXI.Sprite.from(orjamAsset));
    button.view.x = 35;
    button.view.y = 200;

    button.onPress.connect(() =>
      this.coordinator.gotoScene(new MenuScene(this.coordinator))
    );

    container.addChild(titleText);
    container.addChild(pointsText);
    container.addChild(button.view);
  }

  // The menu is static so there's not
  // any need for changes on update
  onUpdate(delta) {}

  // There isn't anything to teardown
  // when the menu exits
  onFinish() {}
}
