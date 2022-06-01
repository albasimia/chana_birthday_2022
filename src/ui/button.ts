import Phaser, { GameObjects } from "phaser";

interface Props {
  width?: number;
  height?: number;
  color?: number;
  text?: string;
  onClick?: Function;
}
export default class Button extends Phaser.GameObjects.Container {
  seKey: string = "";
  text: Phaser.GameObjects.Text;
  sprite: Phaser.GameObjects.Sprite;
  frame: Phaser.GameObjects.Sprite;
  fill: number = 0x000000;
  stroke: number = 0xffffff;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    props: Props
  ) {
    super(scene, x, y);

    const { color, text = "", onClick } = props;
    this.scene = scene;
    this.scene.add.existing(this);

    this.sprite = scene.add.sprite(0, 0, "btn", 1);

    this.setSize(60, 36).setInteractive();
    this.sprite.setTint(color);
    this.sprite.setScale(2);

    this.frame = scene.add.sprite(0, 0, "btn_frame", 1);
    this.frame.setScale(2);
    this.text = scene.add.text(0, 0, text, {
      fontSize: "12px",
      align: "center",
      color: "#ffffff",
      // color: "#000000",
      fontFamily: "misaki",
    });
    this.text.setAlpha(.9);
    this.text.setOrigin(0.5, 0.9);

    this.add([this.sprite, this.frame, this.text]);

    this.setAnime();
    this.on("pointerup", (p: Phaser.Input.Pointer) => {
      onClick && onClick(p);
      this.sprite.anims.play("btn", true);
      this.frame.anims.play("btn_frame", true);
    });
  }

  setSeKey(key: string) {
    this.seKey = key;
    return this;
  }
  setText(text: string) {
    this.text.setText(text);
    return this;
  }
  setAnime() {
    this.scene.anims.create({
      key: "btn",
      frames: this.sprite.anims.generateFrameNumbers("btn", { frames: [1, 0, 1] }),
      frameRate: 15,
    });
    this.scene.anims.create({
      key: "btn_frame",
      frames: this.frame.anims.generateFrameNumbers("btn_frame", { frames: [1, 0, 1] }),
      frameRate: 15,
    });
  }
}
