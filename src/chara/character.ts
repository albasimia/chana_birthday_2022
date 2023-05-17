import Phaser from "phaser";
import chara_setting from "../settings/chara_setting";
// import CustomPipeline from "../shader/CustomPipeline";
export default class Character extends Phaser.GameObjects.Container {
    sprite: Phaser.GameObjects.Sprite;
    charaTween?: Phaser.Tweens.Tween;
    isMove: boolean;
    isEvolution: boolean;
    name: string;
    move_anime?: false | Phaser.Animations.Animation;
    idle_anime?: false | Phaser.Animations.Animation;
    // private customPipeline!: Phaser.Renderer.WebGL.WebGLPipeline;
    // private time = 0;
    sprite: Phaser.GameObjects.Sprite;
    state_sprite: Phaser.GameObjects.Sprite;
    constructor(scene: Phaser.Scene, x: number, y: number, name: string) {
        super(scene, x, y);

        this.scene = scene;
        // this.scene.physics.add.existing(this);

        this.isMove = false;
        this.isEvolution = false;
        this.name = name;

        // this.setScale(setting[name].scale);
        this.sprite = this.scene.add.sprite(0, 0, this.name);

        this.state_sprite = this.scene.add.sprite(0, 0, "haraheri");
        this.state_sprite.setScale(2);
        this.state_sprite.setVisible(false);

        // this.state_sprite.setTexture('dokuro')

        this.add([this.sprite, this.state_sprite]);

        this.scene.physics.add.existing(this.sprite);
        this.scene.add.existing(this);

        this.changeChara(name);

        this.setAnime(name, chara_setting[name].frameStart, chara_setting[name].frameEnd);
        // this.sprite.setDisplayOrigin(0.5);

        // this.sprite.setInteractive();
        // this.sprite.body.setInteractive();
        this.sprite.on("pointerup", (p: Phaser.Input.Pointer) => {
            console.log(this.name);
        });
        return this;
    }
    move(x: number, y: number, callBack?: any) {
        // たまごと墓は動かない。
        if (!chara_setting[this.name].move) {
            if (callBack) {
                callBack();
            }
            return;
        }
        if (this.charaTween) {
            this.charaTween.stop();
            this.charaTween.remove();
        }
        this.isMove = true;
        let isFlip = false;
        // const target = {
        //   x: x - chara_setting[this.name].frameW / 2,
        //   y: y - chara_setting[this.name].frameH / 2
        // };
        // const target = {
        //   x: x - chara_setting[this.name].frameW,
        //   y: y - chara_setting[this.name].frameH
        // };
        const target = {
            x: x,
            y: y,
        };

        if (this.x < target.x) {
            isFlip = true;
        }

        this.sprite.flipX = isFlip;

        this.charaTween = this.scene.tweens.add({
            targets: this,
            // targets: this.sprite,
            props: {
                x: { value: target.x, duration: Math.abs(target.x - this.x) * 20 },
                y: { value: target.y, duration: Math.abs(target.y - this.y) * 20 },
            },
            ease: "Sine.easeInOut",
            callbackScope: this,
            onComplete: () => {
                this.sprite.anims.stop();
                this.isMove = false;
                this.sprite.setFrame(0);
                if (callBack) {
                    callBack();
                }
            },
        });
    }
    changeChara(name: string) {
        this.name = name;
        this.sprite.setTexture(name);
        this.sprite.setScale(chara_setting[name].scale);
        this.sprite.body.setSize(chara_setting[name].bodySize.w, chara_setting[name].bodySize.h);

        this.setAnime(name, chara_setting[name].frameStart, chara_setting[name].frameEnd);

        this.state_sprite.setPosition(chara_setting[name].bodySize.w * chara_setting[name].scale, -chara_setting[name].bodySize.h);
    }
    evolution(evolCharaName: string) {
        if (!this.isEvolution) {
            this.isEvolution = true;
            this.scene.save_data.data.player.stage++;
            this.scene.save_data.data.player.chara = evolCharaName;
            this.scene.save();

            // その他のUI非表示
            this.state_sprite.setVisible(false);

            this.sprite.anims.pause();
            // this.move(96, 160, async () => {
            this.move(this.scene.wCenter, this.scene.sceneH - 100, async () => {
                this.scene.tweens.addCounter({
                    from: 255,
                    to: 0,
                    duration: 2000,
                    onUpdate: (tween) => {
                        const value = Math.floor(tween.getValue());
                        this.sprite.setTint(Phaser.Display.Color.GetColor(value, value, value));
                    },
                    onComplete: () => {
                        if (evolCharaName == "haka") {
                            this.changeChara(evolCharaName);
                            this.sprite.clearTint();
                            this.isEvolution = false;
                            return;
                        }
                        // img change
                        this.scene.tweens.addCounter({
                            from: 0,
                            to: 255,
                            duration: 3000,
                            onUpdate: (tween) => {
                                const value = Math.floor(tween.getValue());
                                this.sprite.setTintFill(Phaser.Display.Color.GetColor(value, value, value / 1.2));
                            },
                            onComplete: () => {
                                const correntChara = this.name;
                                let nextNum = 10000;
                                let numToDivide = 1.1;
                                this.scene.tweens.addCounter({
                                    from: 10000,
                                    to: 0,
                                    duration: 10000,
                                    onUpdate: (tween) => {
                                        if (tween.getValue() <= nextNum) {
                                            if (this.name == correntChara) {
                                                this.changeChara(evolCharaName);
                                            } else {
                                                this.changeChara(correntChara);
                                            }
                                            nextNum = nextNum / numToDivide;
                                            // numToDivide -= 0.01
                                        }
                                    },
                                    onComplete: () => {
                                        this.changeChara(evolCharaName);
                                        this.sprite.clearTint();
                                        this.isEvolution = false;
                                    },
                                });
                            },
                        });
                    },
                });
            });
        }
    }
    changeStatus(state: string) {
        if (["tamago", "haka"].indexOf(this.name) != -1) {
            this.state_sprite.setTexture("hutsuu");
            this.state_sprite.setVisible(false);
            this.scene.save_data.data.player.status = state;
            this.scene.save();
            return;
        }
        this.scene.save_data.data.player.status = state;
        this.scene.save();
        if (state == "hutsuu") {
            this.state_sprite.setVisible(false);
        } else {
            this.state_sprite.setTexture(state);
            if(this.isEvolution == false) {
                this.state_sprite.setVisible(true);
            }
        }
    }
    setAnime(chara: string = this.name, start: number = 0, end: number = 3) {
        this.move_anime = this.scene.anims.create({
            key: chara + "_move",
            frames: this.sprite.anims.generateFrameNumbers(chara, { start: start, end: end }),
            frameRate: 10,
        });
        this.idle_anime = this.scene.anims.create({
            key: chara + "_idle",
            frames: this.sprite.anims.generateFrameNumbers(chara, { start: 0, end: 1 }),
            frameRate: 2,
            repeat: -1,
        });
    }
    preUpdate(time: number, delta: number) {
        // super.preUpdate(time, delta);
        // this.sprite.preUpdate(time, delta);
        if (this.isMove) {
            this.sprite.anims.play(this.name + "_move", true);
        } else {
            this.sprite.anims.play(this.name + "_idle", true);
        }
    }
}
