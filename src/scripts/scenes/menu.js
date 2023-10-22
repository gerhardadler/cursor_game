import * as PIXI from "pixi.js";
import { Button } from "@pixi/ui";
import orjam from "/src/images/ørjam.jpg";
import dodgleHome from "/src/images/home.png";
import startButton from "/src/images/start_button.png";
import { GameScene } from "./game.js";

export default class MenuScene {
  constructor(coordinator) {
    this.app = coordinator.app;
    this.coordinator = coordinator;
  }

  async onStart(container) {
    const background = PIXI.Sprite.from(dodgleHome);

    const buttonSprite = PIXI.Sprite.from(startButton);
    buttonSprite.anchor.set(0.5, 0.5);
    const button = new Button(buttonSprite);
    button.view.x = 300;
    button.view.y = 530;

    button.onPress.connect(() =>
      this.coordinator.gotoScene(new GameScene(this.coordinator))
    );
    button.hover = () => (buttonSprite.tint = "dddddd");
    button.out = () => (buttonSprite.tint = "ffffff");

    container.addChild(background);
    container.addChild(button.view);
  }

  // The menu is static so there's not
  // any need for changes on update
  onUpdate(delta) {}

  // There isn't anything to teardown
  // when the menu exits
  onFinish() {}
}
