import Phaser from "phaser";

interface Props {
  width?: number;
  height?: number;
  onClick?: Function;
}
export default class Button extends Phaser.GameObjects.Container {
  seKey: string = "";
  text: Phaser.GameObjects.Text;
  sprite: Phaser.GameObjects.Sprite;
  fill: number = 0x000000;
  stroke: number = 0xffffff;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    text: string,
    props: Props,
    { align = "center", fontSize = 15, color = "red" } = {}
  ) {
    super(scene, x, y);

    const { width = 30, height = 18, onClick } = props;

    this.scene = scene;
    this.scene.add.existing(this);

    // const alignLeft = align === "left";
    // this.text = scene.add
    //   .text(alignLeft ? -width / 2 + 0 : 0, -1, text, { align, fontSize, color })
    //   .setOrigin(alignLeft ? 0 : 0.5, 0.5)
    //   .setPadding(0, 2, 0, 0);

    this.sprite = scene.add.sprite(0, 0, "btn", 1);
    // this.sprite.displayOriginX = 0;
    // this.sprite.displayOriginY = 0;

    this.setSize(width, height).setInteractive();
    this.setScale(2);

    // this.add([this.container, this.text]);
    this.add([this.sprite]);

    this.setAnime();
    // this.on("pointerover", () => {
    //   this.setAlpha(0.7);
    // });
    // this.on("pointerout", () => {
    //   this.setAlpha(1);
    // });
    this.on("pointerup", (p: Phaser.Input.Pointer) => {
      onClick && onClick(p);
      this.sprite.anims.play("btn", true);
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
  }
}
