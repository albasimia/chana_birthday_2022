import Phaser from "phaser";
import config from "../config";

export default class Unko extends Phaser.GameObjects.Container {
    scene: Phaser.Scene;
    sprite: Phaser.GameObjects.Sprite;
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);
        this.scene = scene;

        this.sprite = scene.add.sprite(0, 0, "unko");
        this.width = this.sprite.width;
        this.height = this.sprite.height;
        this.setDepth(1)

        this.add([this.sprite]);
        this.scene.add.existing(this);

        this.scene.physics.add.existing(this);
        // this.scene.physics.add.collider(this.scene.player, this, this.onColide);
    }
    onColide = ()=>{
        // this.destroy();
    }
}
