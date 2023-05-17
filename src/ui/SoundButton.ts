import Phaser from "phaser";
// import config from "../config";

export default class Sound extends Phaser.GameObjects.Container {
    scene: Phaser.Scene;
    sprite: Phaser.GameObjects.Sprite;
    isMute: boolean;
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);
        this.scene = scene;

        this.sprite = scene.add.sprite(0, 0, "sound_off");
        // this.sprite.setScale(0.8);
        this.width = this.sprite.width;
        this.height = this.sprite.height;
        this.setSize(this.width, this.height).setInteractive();

        this.isMute = true;

        this.add([this.sprite]);
        this.scene.add.existing(this);

        this.on("pointerup", (p: Phaser.Input.Pointer) => {
            this.onClick()
        });
    }
    onClick = () => {
        this.isMute = !this.isMute;
        const tex_name = this.isMute?'sound_off':'sound_on';
        this.sprite.setTexture(tex_name);
        this.scene.events.emit('changeMute');
    };
}
