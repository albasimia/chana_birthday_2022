import Phaser from "phaser";
import setting from "./chara_setting.json";
export default class Character extends Phaser.Physics.Arcade.Sprite {
  charaTween?: Phaser.Tweens.Tween;
  isAnime: boolean;
  name: string;
  anime?: false | Phaser.Animations.Animation;
  constructor(scene: Phaser.Scene, x: number, y: number, name: string) {
    super(scene, x, y, name);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.isAnime = false;
    this.name = name;

    this.setScale(setting[name].scale);

    this.setAnime();
    return this;
  }
  move(x: number, y: number) {
    if (this.isAnime && this.charaTween) {
      this.charaTween.stop();
    }
    this.isAnime = true;
    let isFlip = false;
    const target = { x: x, y: y };

    if (this.x < target.x) {
      isFlip = true;
    }

    this.flipX = isFlip;

    this.charaTween = this.scene.tweens.add({
      targets: this,
      props: {
        x: { value: target.x, duration: Math.abs(target.x - this.x) * 20 },
        y: { value: target.y, duration: Math.abs(target.y - this.y) * 20 },
      },
      ease: "Sine.easeInOut",
      callbackScope: this,
      onComplete: () => {
        this.anims.stop();
        this.isAnime = false;
        this.setFrame(0);
      },
    });
  }
  changeChara(name: string) {
    this.name = name;
    this.setTexture(name);
    this.setScale(setting[name].scale);
    this.body.setSize(20, 32); // コライダーのサイズ
    this.anims.remove("move");
    this.setAnime(name);
  }
  setAnime(chara: string = this.name, start: number = 0, end: number = 3) {
    this.anime = this.scene.anims.create({
      key: chara,
      frames: this.anims.generateFrameNumbers(chara, { start: start, end: end }),
      frameRate: 10,
    });
  }
  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);
    if (this.isAnime) {
      this.anims.play(this.name, true);
    }
  }
}
