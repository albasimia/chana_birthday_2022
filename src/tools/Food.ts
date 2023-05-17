import Phaser, { GameObjects, Math } from "phaser";
import foods_setting from "../settings/foods_setting";
import parameter_setting from "../settings/parameter_setting";

export default class Food extends Phaser.GameObjects.Container {
    sprite: Phaser.GameObjects.Sprite;
    foodTween?: Phaser.Tweens.Tween;
    food_data: Object;
    constructor(scene: Phaser.Scene, x: number, y: number, index: number) {
        super(scene, x, -20);

        this.scene = scene;
        this.food_data = foods_setting[index];

        const target_image = Phaser.Utils.Array.GetRandom(this.food_data.images);
        this.sprite = scene.add.sprite(0, 0, target_image.image_name);
        this.width = this.sprite.width;
        this.height = this.sprite.height;

        this.add([this.sprite]);
        this.scene.add.existing(this);
        this.setDepth(2)

        const rdg = new Math.RandomDataGenerator();
        const target_x = rdg.between(20, 172);
        const target_y = rdg.between(150, 250);
        this.setX(target_x);
        this.fall(target_x, target_y);
    }
    fall(x: number, y: number, callBack?: any) {
        const target = { x: x, y: y };
        this.foodTween = this.scene.tweens.add({
            targets: this,
            props: {
                y: { value: target.y, duration: 1500 },
            },
            ease: "Sine.easeIn",
            callbackScope: this,
            onComplete: () => {
                this.scene.physics.add.existing(this);
                this.scene.physics.add.collider(this.scene.player.sprite, this, this.onColide);
            },
        });
    }
    onColide = (obj1, obj2) => {
        // console.log(obj1)
        this.food_data.effect.forEach((effect) => {
            const pram_val = eval(this.scene.save_data.data.player.parameter[effect.target] + effect.operation + effect.value)
            if(effect.operation == "+") {
                if(parameter_setting[effect.target].max >= pram_val) {
                    this.scene.save_data.data.player.parameter[effect.target] = pram_val;
                }
            }
            if(effect.operation == "-") {
                if(parameter_setting[effect.target].min <= pram_val) {
                    this.scene.save_data.data.player.parameter[effect.target] = pram_val;
                }
            }
        });
        this.scene.save_data.data.time.last_meal = Date.now();
        this.destroy();
    };
}
