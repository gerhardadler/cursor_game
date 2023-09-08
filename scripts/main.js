import { Mouse } from "./classes/mouse.js";
import { EnemySpawner } from "./classes/enemy.js";

const app = new PIXI.Application({
  width: 640,
  height: 360,
  antialiasing: true,
});
document.body.appendChild(app.view);

const text = new PIXI.Text("Mouse Position: (0, 0)", {
  fill: 0xffffff,
  fontSize: 24,
});
app.stage.addChild(text);

const mouse = new Mouse(app);

app.view.addEventListener("mousemove", function (e) {
  mouse.position.x = e.clientX - app.view.getBoundingClientRect().left;
  mouse.position.y = e.clientY - app.view.getBoundingClientRect().top;
  text.text = `Mouse Position: (${mouse.position.x.toFixed(
    2
  )}, ${mouse.position.y.toFixed(2)})`;
});

app.view.addEventListener("mousedown", function (e) {
  console.log("click");
  mouse.onClick();
});
app.view.addEventListener("mouseup", function (e) {
  console.log("release");
  mouse.onRelease();
});

const enemies = [];
const enemySpawner = new EnemySpawner(app, mouse.position, enemies);

app.ticker.add((delta) => {
  for (const enemy of enemies) {
    enemy.tick(delta);
  }
  mouse.tick(delta);
  enemySpawner.tick(delta);
});
