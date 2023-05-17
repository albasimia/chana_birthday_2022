import Phaser, { GameObjects } from "phaser";
import Button from "../ui/Button";
import FoodsMenu from "../ui/FoodsMenu";
import Sound from "../ui/SoundButton";
import Game from "../scenes/Game";
import chara_setting from "../settings/chara_setting";
import EvolutionManage from "../tools/EvolutionManage";
import TimeManage from "../tools/TimeManage";
import Toilet from "../tools/Toilet";
import save_data_template from "../settings/save_data_template";

export default class Ui extends Phaser.Scene {
    // button?: Button;
    // sprite:
    // game: Phaser.Scene;
    // menu = Phaser.GameObjects.Container;
    game: Game;
    em: EvolutionManage;
    tm: TimeManage;
    gohan_btn: Button;
    toilet_btn: Button;
    reset_btn: Button;
    foods_menu: FoodsMenu;
    alive_buttons: GameObjects.Group;
    constructor(game: Game) {
        super("UIScene");
        Phaser.Scene.call(this, { key: "UIScene", active: true });
        this.game = game;
        this.em = new EvolutionManage(game);
        this.tm = new TimeManage(game);
    }
    preload() {
        this.load.spritesheet("btn", "assets/img/ui/btn_gray2.png", {
            frameWidth: 30,
            frameHeight: 18,
        });
        this.load.spritesheet("btn_frame", "assets/img/ui/btn_gray_frame.png", {
            frameWidth: 30,
            frameHeight: 18,
        });
        this.load.image("sound_on", "assets/img/ui/sound_on.png");
        this.load.image("sound_off", "assets/img/ui/sound_off.png");
    }
    create() {
        //   this.events.on('changeMute', ()=>{
        //     console.log('test')
        // })
        this.game = this.scene.get("GameScene");

        this.gohan_btn = new Button(this, 32, 300, {
            color: 0xff0066,
            text: "ごはん",
            onClick: () => {
                this.foods_menu.setVisible(!this.foods_menu.visible);
            },
        });
        this.gohan_btn.setVisible(false);
        // const button2 = new Button(this, 96, 300, {
        //     color: 0xffff00,
        //     text: "うんどう",
        //     onClick: () => {
        //         console.log("undou");
        //     },
        // });
        this.toilet_btn = new Button(this, 160, 300, {
            color: 0x0099ff,
            text: "トイレ",
            onClick: () => {
                new Toilet(this.game, this.game.sceneW + 8, this.game.sceneH - 8 * 10);
            },
        });
        this.toilet_btn.setVisible(false);

        this.alive_buttons = new GameObjects.Group(this, [this.gohan_btn, this.toilet_btn]);

        const button4 = new Button(this, 32, 20, {
            text: "しんか",
            onClick: () => {
                console.log("shinka");

                // this.game.player?.evolution('tamago');
                // return;

                if (this.game.charaName == "haka") {
                    this.game.save_data.data.player.stage = 0;
                    this.game.save_data.data.player.chara = "tamago";
                    this.game.save_data.data.time.start = Date.now();
                    this.game.player?.changeChara("tamago");
                } else {
                    let time_diff = 2880;
                    const evolCharaName = this.em.check(time_diff);
                    if (evolCharaName != "") {
                        this.game.player?.evolution(evolCharaName);
                    }
                }
            },
        });

        this.reset_btn = new Button(this, 96, 300, {
          text: "リセット",
          onClick: () => {
            this.game.save_data = JSON.parse(JSON.stringify(save_data_template));
            this.game.save_data.data.time.start = Date.now();
            this.game.save_data.data.player.stage = 0;
            this.game.player?.changeChara("tamago");
          },
        });
        this.reset_btn.setVisible(false);

        this.foods_menu = new FoodsMenu(this, this.game, 0, 0, 2);
    }
    update(time: number, delta: number): void {
        if (this.game.player?.isEvolution || this.game.player?.name == 'tamago') {
            this.scene.setVisible(false);
        } else {
            this.scene.setVisible(true);
        }

        if(this.game.player?.name == 'haka') {
            this.alive_buttons.setVisible(false)
            this.reset_btn.setVisible(true);
        } else {
            this.alive_buttons.setVisible(true);
            this.reset_btn.setVisible(false);
        }
    }
}
