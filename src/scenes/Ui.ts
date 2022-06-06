import Phaser from "phaser";
import Button from "../ui/button";
import Game from "../scenes/Game";
import chara_setting from "../chara/chara_setting.json";

export default class Ui extends Phaser.Scene {
  // button?: Button;
  // sprite:
  // game: Phaser.Scene;
  game: Game;
  constructor() {
    super("UIScene");
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
    this.game = this.scene.get("GameScene");

    const button1 = new Button(this, 32, 300, {
      // color: 0x999999,
      color: 0xff0000,
      text: "ごはん",
      onClick: () => {
        console.log("gohan");
      },
    });
    const button2 = new Button(this, 96, 300, {
      color: 0xffff00,
      text: "うんどう",
      onClick: () => {
        console.log("undou");
      },
    });
    const button3 = new Button(this, 160, 300, {
      color: 0x0099ff,
      text: "トイレ",
      onClick: () => {
        console.log("toire");
      },
    });
    const button4 = new Button(this, 32, 20, {
      text: "しんか",
      onClick: () => {
        console.log("shinka");
        if (this.game.player?.name == "chana") {
          this.game.player?.evolution("masara");
        } else if (this.game.player?.name == "masara") {
          this.game.player?.evolution(Phaser.Utils.Array.GetRandom(["makiko", "rancia"]));
        } else {
          this.game.player?.evolution(Phaser.Utils.Array.GetRandom(Object.keys(chara_setting)));
        }
      },
    });
    const button5 = new Button(this, 160, 20, {
      text: "リセット",
      onClick: () => {
        console.log("reset");
        this.game.player?.changeChara("chana");
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
