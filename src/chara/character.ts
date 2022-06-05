import Phaser from "phaser";
import setting from "./chara_setting.json";
import CustomPipeline from "../shader/CustomPipeline";
export default class Character extends Phaser.Physics.Arcade.Sprite {
  charaTween?: Phaser.Tweens.Tween;
  isMove: boolean;
  name: string;
  move_anime?: false | Phaser.Animations.Animation;
  idle_anime?: false | Phaser.Animations.Animation;
  private customPipeline!: Phaser.Renderer.WebGL.WebGLPipeline;
  constructor(scene: Phaser.Scene, x: number, y: number, name: string) {
    super(scene, x, y, name);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.isMove = false;
    this.name = name;

    // this.setScale(setting[name].scale);
    this.changeChara(name);

    this.setAnime(name, setting[name].frameStart, setting[name].frameEnd);
    this.setInteractive();
    this.setOrigin(0.5, 0.9);
    this.on("pointerup", (p: Phaser.Input.Pointer) => {
      console.log(this.name);
    });

    const renderer = this.scene.game.renderer as Phaser.Renderer.WebGL.WebGLRenderer;
    // this.customPipeline = renderer.addPipeline("Custom", new CustomPipeline(this.scene.game));
    return this;
  }
  move(x: number, y: number, callBack?: any) {
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
        if (callBack) {
          callBack();
        }
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
  evolution(name: string) {
    this.move(96, 160, async () => {
      // await this.setTintFill(0xffffff);
      this.scene.tweens.addCounter({
        from: 255,
        to: 0,
        duration: 1000,
        onUpdate: (tween) => {
          const value = Math.floor(tween.getValue());
          this.setTint(Phaser.Display.Color.GetColor(value, value, value));
        },
        onComplete: () => {
          // this.setPipeline("Custom");
          this.scene.tweens.addCounter({
            from: 0,
            to: 255,
            duration: 1000,
            onUpdate: (tween) => {
              const value = Math.floor(tween.getValue());
              this.setTintFill(Phaser.Display.Color.GetColor(value, value, value));
            },
            onComplete: () => {
              if (this.name == "chana") {
                this.changeChara("masara");
              } else if (this.name == "masara") {
                this.changeChara(Phaser.Utils.Array.GetRandom(["makiko", "rancia"]));
              } else {
                // this.changeChara("makoto");
                this.changeChara(Phaser.Utils.Array.GetRandom(Object.keys(setting)));
              }
              this.clearTint();
            },
          });
        },
      });

      // this.clearTint();
    });
    // this.changeChara(name);
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
