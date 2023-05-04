import Phaser from "phaser";
import config from "../config";

export default class TimeManage{
    scene: Phaser.Scene;
    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }
    getTimeDiff(start: number, end: number) {
        const diff_time = end - start;
        return Math.floor(diff_time / 60000);
    }
}
