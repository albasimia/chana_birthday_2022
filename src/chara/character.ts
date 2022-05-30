import Phaser from "phaser";
import setting from "./chara_setting.json";
export default class Character extends Phaser.Physics.Arcade.Sprite {
  charaTween?: Phaser.Tweens.Tween;
  isMove: boolean;
  name: string;
  move_anime?: false | Phaser.Animations.Animation;
  idle_anime?: false | Phaser.Animations.Animation;
  constructor(scene: Phaser.Scene, x: number, y: number, name: string) {
    super(scene, x, y, name);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.isMove = false;
    this.name = name;

    // this.setScale(setting[name].scale);
    this.changeChara(name);

    this.setAnime(name, setting[name].frameStart, setting[name].frameEnd);
    return this;
  }
  move(x: number, y: number) {
    if (this.charaTween) {
      this.charaTween.stop();
      this.charaTween.remove();
    }
    this.isMove = true;
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
        this.isMove = false;
        this.setFrame(0);
      },
    });
  }
  changeChara(name: string) {
    this.name = name;
    this.setTexture(name);
    this.setScale(setting[name].scale);
    this.body.setSize(setting[name].bodySize.w, setting[name].bodySize.h); // コライダーのサイズ
    this.anims.remove("move");
    this.setAnime(name, setting[name].frameStart, setting[name].frameEnd);
  }
  setAnime(chara: string = this.name, start: number = 0, end: number = 3) {
    this.move_anime = this.scene.anims.create({
      key: chara + "_move",
      frames: this.anims.generateFrameNumbers(chara, { start: start, end: end }),
      frameRate: 10,
    });
    this.idle_anime = this.scene.anims.create({
      key: chara + "_idle",
      frames: this.anims.generateFrameNumbers(chara, { start: 0, end: 1 }),
      frameRate: 2,
      repeat: -1,
    });
  }
  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);
    if (this.isMove) {
      this.anims.play(this.name + "_move", true);
    } else {
      this.anims.play(this.name + "_idle", true);
    }
  }
}
