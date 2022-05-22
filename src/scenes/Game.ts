import Phaser from "phaser";
export default class Demo extends Phaser.Scene {
  isAnime: boolean = false;
  charaTween?: Phaser.Tweens.Tween;
  // private player?: Phaser.GameObjects.Sprite;
  player?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  // player?: Phaser.Types.Physics.Matter.MatterBody;

  // private player?: any
  constructor() {
    super("GameScene");
  }

  preload() {
    this.load.image("sky", "assets/img/sky.png");
    this.load.image("ground", "assets/img/ground.png");
    // this.load.spritesheet("tanikou", "docs/assets/img/tanikou_kari.png", {
    //   frameWidth: 28,
    //   frameHeight: 32,
    // });
    this.load.spritesheet("tanikou", "assets/img/chara_ss.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    let angle = 0;
    const sceneW = this.scale.width;
    const wCenter = sceneW / 2;
    const sceneH = this.scale.height;
    const hCenter = sceneH / 2;
    this.add.image(wCenter, hCenter, "sky");
    this.add.image(wCenter, sceneH - 32, "ground");

    this.player = this.physics.add.sprite(32, 100, "tanikou");
    this.player.flipX = true;
    this.player.setCollideWorldBounds(true);

    // this.player.setBounce(0.5);
    // this.player.setVelocityY(Phaser.Math.Between(-20, 20));
    // this.player.setVelocityX(Phaser.Math.Between(-20, 20));

    this.input.on(
      "pointerup",
      function (p: Phaser.Input.Pointer) {
        // this.player.anims.play("move", true);
        if(this.isAnime) {
          this.charaTween.stop();
        }
        this.isAnime = true;
        let isFlip = false;
        const target = {x: p.upX, y: p.upY}
        
        if (this.player.x < target.x) {
          isFlip = true;
        }

        this.player.flipX = isFlip;

        this.charaTween = this.tweens.add({
          targets: this.player,
          props: {
            // x: { value: target.x, duration: Math.abs(target.x - this.player.x) * 50 },
            // y: { value: target.y, duration: Math.abs(target.y - this.player.y) * 50 },
            x: { value: target.x, duration: Math.abs(target.x - this.player.x) * 50 },
            y: { value: target.y, duration: Math.abs(target.y - this.player.y) * 50 },
          },
          ease: "Sine.easeInOut",
          callbackScope: this,
          onComplete: function () {
            this.player.anims.stop();
            this.isAnime = false;
            this.player.setFrame(0);
          },
        });
      },
      this
    );

    this.anims.create({
      key: "move",
      frames: this.anims.generateFrameNumbers("tanikou", { start: 0, end: 4 }),
      frameRate: 10,
    });
  }

  update() {
    if (this.isAnime) {
      this.player?.anims.play("move", true);
    }
  }
}
