import { Mouse } from "./classes/mouse.js";
import { EnemySpawner } from "./classes/enemy.js";
import { World } from "./classes/world.js";

const app = new PIXI.Application({
  width: 640,
  height: 360,
  antialiasing: true,
});
document.body.appendChild(app.view);

const world = new World(app);

app.ticker.add((delta) => {
  world.tick(delta);
});
