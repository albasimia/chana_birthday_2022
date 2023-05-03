import Phaser from "phaser";
import Character from "../chara/Character";
import chara_setting from "../chara/chara_setting.json";
import foods_setting from "../settings/foods_setting";
export default class Game extends Phaser.Scene {
    isAnime: boolean;
    charaTween?: Phaser.Tweens.Tween;
    public player?: Character;

    charaName: string;

    sceneW: number;
    wCenter: number;
    sceneH: number;
    hCenter: number;
    public foods: [];
    constructor() {
        super("GameScene");
        this.isAnime = false;
        this.charaName = "chana";
        // this.player = new Character(this, 32, 100, this.charaName);
        this.sceneW = 0;
        this.wCenter = 0;
        this.sceneH = 0;
        this.hCenter = 0;

        this.foods = [];
    }

    preload() {
        this.load.image("sky", "assets/img/sky.png");
        this.load.image("kusamura", "assets/img/bg/kusamura.png");
        this.load.image("machi", "assets/img/bg/machi.png");
        this.load.image("umi", "assets/img/bg/umi.png");
        this.load.image("ground", "assets/img/ground.png");
        for (const name in chara_setting) {
            if (Object.prototype.hasOwnProperty.call(chara_setting, name)) {
                const element = chara_setting[name];
                this.load.spritesheet(name, element.path, {
                    frameWidth: element.frameW,
                    frameHeight: element.frameH,
                });
            }
        }
        for (const food in foods_setting) {
            if (Object.prototype.hasOwnProperty.call(foods_setting, food)) {
                const food_element = foods_setting[food];
                for (let i = 0; i < food_element.images.length; i++) {
                    this.load.image(food_element.images[i].image_name, food_element.images[i].path);
                }
            }
        }
    }

    create() {
        this.sceneW = this.scale.width;
        this.wCenter = this.sceneW / 2;
        this.sceneH = this.scale.height;
        this.hCenter = this.sceneH / 2;

        const background = this.add.image(this.wCenter, this.hCenter, "kusamura");
        const ground = this.add.rectangle(0, this.hCenter - 32, this.sceneW, this.hCenter);
        background.scale = 2;
        ground.setDisplayOrigin();

        this.player = new Character(this, this.wCenter, this.sceneH - 70, this.charaName);
        this.player.setCollideWorldBounds(true);

        // this.player.setBounce(0.5);
        // this.player.setVelocityY(Phaser.Math.Between(-20, 20));
        // this.player.setVelocityX(Phaser.Math.Between(-20, 20));

        // sky.setInteractive();
        ground.setInteractive();
        ground.setOrigin(0, 0);
        ground.on(
            "pointerup",
            (p: Phaser.Input.Pointer) => {
                // console.log(p.upX, p.upY);
                this.player?.move(p.upX, p.upY);
            },
            this
        );
    }

    update() {}
}
