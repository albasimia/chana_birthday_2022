import Phaser from "phaser";
import Character from "../chara/character";
import DataController from "../data/DataController";
import chara_setting from "../chara/chara_setting.json";

export default class Game extends Phaser.Scene {
  isAnime: boolean;
  charaTween?: Phaser.Tweens.Tween;
  public player?: Character;
  DataController : DataController;
  charaName: string;
  constructor() {
    super("GameScene");
    this.isAnime = false;
    this.DataController = new DataController;
    this.charaName = this.DataController.data.param.chara;
  }

  preload() {
    this.load.image("sky", "assets/img/sky.png");
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
  }

  create() {
    window.addEventListener('blur', this.DataController.getDateNow, false);
    const sceneW = this.scale.width;
    const wCenter = sceneW / 2;
    const sceneH = this.scale.height;
    const hCenter = sceneH / 2;
    const sky = this.add.image(wCenter, hCenter, "sky");
    const ground = this.add.image(wCenter, sceneH - 32, "ground");
    sky.scale = 2;
    ground.scale = 2;

    this.player = new Character(this, 32, 100, this.charaName);
    // this.player.flipX = true;
    this.player.setCollideWorldBounds(true);

    // this.player.setBounce(0.5);
    // this.player.setVelocityY(Phaser.Math.Between(-20, 20));
    // this.player.setVelocityX(Phaser.Math.Between(-20, 20));

    sky.setInteractive();
    sky.on(
      "pointerup",
      (p: Phaser.Input.Pointer) => {
        this.player?.move(p.upX, p.upY);
      },
      this
    );

    this.time.addEvent({
      // delay: 600000, // 1分ごとにチェック。
      delay: 1000, // 1秒ごとにチェック。
      callback: () => {
        this.DataController.checkTime();
      },
      loop: true,
    });
  }

  update() {
    // this.DataController.checkTime();
  }
}
