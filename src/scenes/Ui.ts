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
    this.load.spritesheet("btn", "assets/img/btn.png", {
      frameWidth: 30,
      frameHeight: 18,
    });
  }
  create() {
    new Button(this, 40, 250, "ごはん", {
      width: 30,
      height: 18,
      onClick: () => {
        console.log("Click!!");
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
