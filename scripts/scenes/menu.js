import * as PIXI from "pixi.js";
import { Button } from "@pixi/ui";
import orjam from "/images/ørjam.jpg"; // Adjust the path to your image

export default class Menu {
  constructor(coordinator) {
    this.app = coordinator.app;
    this.coordinator = coordinator;
  }

  async onStart(container) {
    // Game title text
    const titleText = new PIXI.Text("Hilow", {
      fontFamily: "Roboto Mono",
      fill: 0x000000,
      fontSize: 62,
    });
    titleText.x = 35;
    titleText.y = 90;

    const button = new Button(PIXI.Sprite.from(orjam));
    button.view.x = 35;
    button.view.y = 150;

    button.onPress.connect(() => console.log("onPress"));

    // Finally we add these elements to the new
    // container provided by the coordinator
    container.addChild(titleText);
    container.addChild(button.view);
  }

  // The menu is static so there's not
  // any need for changes on update
  onUpdate(delta) {}

  // There isn't anything to teardown
  // when the menu exits
  onFinish() {}
}
