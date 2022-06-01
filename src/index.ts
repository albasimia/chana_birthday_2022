import Phaser from "phaser";
import config from "./config";
import GameScene from "./scenes/Game";
import UIScene from "./scenes/Ui";


// const canvas = document.createElement("canvas");
// canvas.id = "canvas";
// document.body.appendChild(canvas);
// // const contextCreationConfig = {
// //   imageSmoothingEnabled: false
// // };
// const context = canvas.getContext("2d");
// context.imageSmoothingEnabled = false;

// config.canvas = canvas;
// config.context = context;
new Phaser.Game(
  Object.assign(config, {
    scene: [GameScene, UIScene],
  })
);
