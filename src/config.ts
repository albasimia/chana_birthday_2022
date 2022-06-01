import Phaser from "phaser";

export default {
  // type: Phaser.AUTO,
  // type: Phaser.CANVAS,
  type: Phaser.WEBGL,
  parent: "game",
  backgroundColor: "#33A5E7",
  scale: {
    // width: 96,
    // height: 160,
    width: 96 * 2,
    height: 160 * 2,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  // physics: {
  //   default: "matter",
  //   matter: {
  //     gravity: {
  //       x: 0,
  //       y: 0,
  //     },
  //   },
  // },
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        x: 0,
        y: 0,
      },
      // debug: true,
    },
  },
  fps: 10,
  antialias: false,
  // antialiasGL :false,
  // render: {
  //   pixelArt: true,
  // },
  // dom: {
  //   createContainer: true,
  // },
};
