import Phaser from "phaser";

export default class Toilet extends Phaser.GameObjects.Container {
    scene: Phaser.Scene;
    sprites: [];
    toiletTween?: Phaser.Tweens.Tween;
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);
        this.scene = scene;
        this.sprites = [];

        // console.log(this.scene.textures.get('ryusui').source[0].width)
        const ryusui_tex = this.scene.textures.get("ryusui");
        const ryusui_count = 13;
        for (let index = 0; index < ryusui_count; index++) {
            let sprite = this.scene.add.sprite(0, ryusui_tex.source[0].height * index, "ryusui");
            // let sprite = this.scene.add.sprite(0, 0, "ryusui");
            sprite.setOrigin(0.5, ryusui_count / 2);
            this.sprites.push(sprite);
            this.add(this.sprites);
        }
        this.width = ryusui_tex.source[0].width;
        this.height = ryusui_tex.source[0].height * ryusui_count;

        this.setDepth(2);

        this.scene.add.existing(this);

        this.scene.physics.add.existing(this);
        this.scene.physics.add.collider(this.scene.food_group, this, this.onColide);
        this.scene.physics.add.collider(this.scene.unko_group, this, this.onColide);

        this.clean();
    }
    clean() {
        this.scene.save_data.data.unko = [];
        this.scene.save_data.data.time.last_clean = Date.now();
        this.scene.save();
        const target = { x: -8, y: this.y };
        this.toiletTween = this.scene.tweens.add({
            targets: this,
            props: {
                x: { value: target.x, duration: 1500 },
            },
            ease: "Sine.easeIn",
            callbackScope: this,
            onComplete: () => {
                this.destroy();
            },
        });
    }
    onColide = (obj1) => {
        obj1.destroy();
    };
}
