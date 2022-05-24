import Phaser from "phaser";
import Character from "../chara/character"
export default class Demo extends Phaser.Scene {
  isAnime: boolean;
  charaTween?: Phaser.Tweens.Tween;
  // private player?: Phaser.GameObjects.Sprite;
  // player?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  player?: Character;
  // player?: Phaser.Types.Physics.Matter.MatterBody;

  // private player?: any
  charaName: string;
  constructor() {
    super("GameScene");
    this.isAnime = false;
    this.charaName = 'taki';
  }

  preload() {
    this.load.image("sky", "assets/img/sky.png");
    this.load.image("ground", "assets/img/ground.png");
    this.load.spritesheet("makoto", "assets/img/makoto_ss.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("tanikou", "assets/img/tanikou_kari.png", {
      frameWidth: 28,
      frameHeight: 32,
    });
    this.load.spritesheet("taki", "assets/img/taki_ss.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    // this.load.spritesheet("tanikou", "assets/img/chara_ss.png", {
    //   frameWidth: 32,
    //   frameHeight: 32,
    // });
  }

  create() {
    let angle = 0;
    const sceneW = this.scale.width;
    const wCenter = sceneW / 2;
    const sceneH = this.scale.height;
    const hCenter = sceneH / 2;
    const sky = this.add.image(wCenter, hCenter, "sky");
    const ground = this.add.image(wCenter, sceneH - 32, "ground");
    // const makoto = this.add.image(wCenter, sceneH - 32, "makoto");
    // makoto.scale = .5;
    sky.scale = 2;
    ground.scale = 2;

    // this.player = this.physics.add.sprite(32, 100, "tanikou");
    // this.player = this.physics.add.sprite(32, 100, this.charaName);
    this.player = new Character(this, 32, 100, this.charaName);
    this.player.flipX = true;
    this.player.setCollideWorldBounds(true);

    // this.player.setBounce(0.5);
    // this.player.setVelocityY(Phaser.Math.Between(-20, 20));
    // this.player.setVelocityX(Phaser.Math.Between(-20, 20));

    this.input.on(
      "pointerup",
      (p: Phaser.Input.Pointer) => {
        this.player?.changeChara(Phaser.Utils.Array.GetRandom(['tanikou', 'taki', 'makoto']));
        // this.player?.setAnime();
        this.player?.move(p.upX, p.upY);
      },
      this
    );

    // this.anims.create({
    //   key: "move",
    //   frames: this.anims.generateFrameNumbers(this.charaName, { start: 0, end: 4 }),
    //   frameRate: 10,
    // });
  }

  update() {
    // if (this.isAnime) {
    //   this.player?.anims.play("move", true);
    // }
  }
}
