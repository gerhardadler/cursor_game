import * as PIXI from "pixi.js";
import enemy1 from "/src/images/enemy1.png";
import mouse from "/src/images/mouse.png";
import gameBackground from "/src/images/game.png";
import dodgleHome from "/src/images/home.png";
import startButton from "/src/images/start_button.png";
import orjam from "/src/images/ørjam.jpg";
import bullet from "/src/images/bullet.png";

export const enemy1Asset = await PIXI.Assets.load(enemy1);
export const mouseAsset = await PIXI.Assets.load(mouse);
export const gameBackgroundAsset = await PIXI.Assets.load(gameBackground);
export const dodgleHomeAsset = await PIXI.Assets.load(dodgleHome);
export const startButtonAsset = await PIXI.Assets.load(startButton);
export const orjamAsset = await PIXI.Assets.load(orjam);
export const bulletAsset = await PIXI.Assets.load(bullet);
