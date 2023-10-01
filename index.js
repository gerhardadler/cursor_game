// import { Mouse } from "./classes/mouse.js";
// import { EnemySpawner } from "./classes/enemy.js";
// import { World } from "./classes/world.js";
// import { Vector2D } from "./classes/vector.js";

import Coordinator from "./scripts/coordinator.js";

// const app = new PIXI.Application({
//   width: 600,
//   height: 900,
//   antialiasing: true,
// });
// document.body.appendChild(app.view);

// const world = new World(app, new Vector2D(600, 900));

// app.ticker.add((delta) => {
//   world.tick(delta);
// });

const coordinator = new Coordinator(document, document.body);
