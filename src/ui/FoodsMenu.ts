import Menu from "./Menu";
import foods_data from "../settings/foods_setting";
import Food from "../tools/Food";

export default class FoodsMenu extends Menu {
    game: Phaser.Scene;
    constructor(scene: Phaser.Scene, game: Phaser.Scene, x: number, y: number, itemsPerRow: number) {
        super(scene, x, y, 2);

        this.scene = scene;
        this.scene.add.existing(this);
        this.visible = false;
        this.items = foods_data;

        this.game = game;

        this.buttons = [];

        this.itemsPerRow = itemsPerRow;
        this.initMenu();
    }
    onClick(i:number) {
        this.game.meal_group.push( new Food(this.game, 0, -20, i, true));
        // new Food(this.game, 60, 60, i);
        // this.setVisible(false);
    }
}