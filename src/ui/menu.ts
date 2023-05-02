import Phaser, { GameObjects } from "phaser";

export default class Menu extends Phaser.GameObjects.Container {
    buttons: Phaser.GameObjects.Text[];
    items: [];
    itemsPerRow: number;
    constructor(scene: Phaser.Scene, x: number, y: number, itemsPerRow: number) {
        super(scene, x, y);

        this.scene = scene;
        this.scene.add.existing(this);
        this.visible = false;
        this.items = [];

        this.buttons = [];

        this.itemsPerRow = itemsPerRow;
        this.initMenu();
    }
    initMenu() {
        for (let i = 0; i < this.items.length; i++) {
            const button = this.scene.add.text(20 + (i % this.itemsPerRow) * 100, 20 + Math.floor(i / this.itemsPerRow) * 30, this.items[i].text, {
                font: "12px misaki",
                color: "#ffffff",
            });
            button.alpha = 1;
            button.setInteractive();
            button.on("pointerup", () => {
                this.onClick(i);
            });
            this.buttons[i] = button;
        }

        // 閉じるボタン
        const close_button = this.scene.add.text(20 + (this.items.length % this.itemsPerRow) * 100, 20 + Math.floor(this.items.length / this.itemsPerRow) * 30, "とじる", {
            font: "12px misaki",
            color: "#ffffff",
        });
        close_button.alpha = 1;
        close_button.setInteractive();
        close_button.on("pointerup", () => {
            this.setVisible(false);
        });

        // 背景
        const bg = this.scene.add.rectangle(0, 0, this.scene.scale.width, (this.items.length / this.itemsPerRow) * 30 + 40, 0x000000, 0.5);
        bg.setOrigin(0, 0);
        bg.setInteractive();
        this.add(bg);

        this.buttons.push(close_button);
        this.add(this.buttons);
    }
    onClick(i: number) {
        console.log(this.items[i]);
        this.setVisible(false);
    }
}
