export class Bullet {
  constructor(app, position, directionVector, speed) {
    this.app = app;

    this.sprite = PIXI.Sprite.from("images/ørjam.jpg");
    this.sprite.anchor.set(0.5);
    this.sprite.width = 10;
    this.sprite.height = 10;
    this.app.stage.addChild(this.sprite);

    this.position = position;
    this.directionVector = directionVector;
    this.speed = speed;
  }

  tick(delta) {
    this.position = this.position.add(
      this.directionVector.multiply(this.speed * delta)
    );
    this.sprite.x = this.position.x;
    this.sprite.y = this.position.y;
  }
}
