import Phaser from "phaser";
import Button from "../ui/button";
export default class Ui extends Phaser.Scene {
  score: number;
  // button?: Button;
  // sprite:
  constructor() {
    super("UIScene");
    this.score = 0;
    Phaser.Scene.call(this, { key: "UIScene", active: true });
  }
  preload() {
    this.load.spritesheet("btn", "assets/img/btn_gray2.png", {
      frameWidth: 30,
      frameHeight: 18,
    });
    this.load.spritesheet("btn_frame", "assets/img/btn_gray_frame.png", {
      frameWidth: 30,
      frameHeight: 18,
    });
  }
  create() {
    new Button(this, 32, 300, {
      color: 0xff0000,
      text: "ごはん",
      onClick: () => {
        console.log(1);
      },
    });
    new Button(this, 96, 300, {
      color: 0xffff00,
      text: "うんどう",
      onClick: () => {
        console.log(2);
      },
    });
    new Button(this, 160, 300, {
      color: 0x0099ff,
      text: "トイレ",
      onClick: () => {
        console.log(3);
      },
    });

    //  Our Text object to display the Score
    // var info = this.add.text(10, 10, "Score: 0", { font: "24px Arial", fill: "#000000" });

    // //  Grab a reference to the Game Scene
    // var ourGame = this.scene.get("GameScene");

    // //  Listen for events from it
    // ourGame.events.on(
    //   "addScore",
    //    () => {
    //     this.score += 10;

    //     info.setText("Score: " + this.score);
    //   },
    //   this
    // );
  }
}
