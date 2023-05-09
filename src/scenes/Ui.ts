import Phaser from "phaser";
import Button from "../ui/Button";
import FoodsMenu from "../ui/FoodsMenu";
import Game from "../scenes/Game";
import chara_setting from "../settings/chara_setting";
import EvolutionManage from "../tools/EvolutionManage";
import TimeManage from "../tools/TimeManage";

export default class Ui extends Phaser.Scene {
    // button?: Button;
    // sprite:
    // game: Phaser.Scene;
    // menu = Phaser.GameObjects.Container;
    game: Game;
    em: EvolutionManage;
    tm: TimeManage;
    constructor(game: Game) {
        super("UIScene");
        Phaser.Scene.call(this, { key: "UIScene", active: true });
        this.game = game;
        this.em = new EvolutionManage(game);
        this.tm = new TimeManage(game);
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
                // console.log("gohan");
                // this.foods_menu.getVisible();
                this.foods_menu.setVisible(!this.foods_menu.visible);
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
                if (this.game.charaName == "haka") {
                    this.game.save_data.data.player.stage = 0;
                    this.game.save_data.data.player.chara = "tamago";
                    this.game.save_data.data.time.start = Date.now();
                    this.game.player?.changeChara("tamago");
                } else {
                    let time_diff = 2880;
                    const evolCharaName = this.em.check(time_diff);
                    if(evolCharaName != '') {
                      this.game.player?.evolution(evolCharaName);
                    }
                }
            },
        });
        // const button5 = new Button(this, 160, 20, {
        //   text: "リセット",
        //   onClick: () => {
        //     console.log("reset");
        //     this.game.player?.changeChara("chana");
        //   },
        // });

        // this.menu = new Menu(this, 0, 0 , foods_data);
        this.foods_menu = new FoodsMenu(this, this.game, 0, 0, 2);

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
