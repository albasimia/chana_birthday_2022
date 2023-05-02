import Menu from "./menu";
import foods_data from "../settings/foods_data";

export default class FoodsMenu extends Menu {
    constructor(scene: Phaser.Scene, x: number, y: number, itemsPerRow: number) {
        super(scene, x, y, 2);

        this.scene = scene;
        this.scene.add.existing(this);
        this.visible = false;
        this.items = foods_data;

        this.buttons = [];

        this.itemsPerRow = itemsPerRow;
        this.initMenu();
    }
    onClick(i:number) {
        console.log(this.items[i].text);
        this.setVisible(false);
    }
}