import Phaser from "phaser";
import Game from "../scenes/Game";
import chara_setting from "../settings/chara_setting";
export default class EvolutionManage {
    scene: Game;
    player_data: Object;
    constructor(scene: Game) {
        this.scene = scene;
        this.player_data = scene.save_data.data.player;
    }
    check(time: number): null | string {
        let evolCharaName = null;
        if (time >= 0) {
            if (this.player_data.stage == 0) {
                evolCharaName = "chana";
            }
        }
        // if (time >= 1) {
        if (time >= 60) { // 1時間
            if (this.player_data.stage == 1) {
                evolCharaName = "masara";
            }
        }
        // if (time >= 2) {
        if (time >= 840) { // 14時間
            if (this.player_data.stage == 2) {
                evolCharaName = Phaser.Utils.Array.GetRandom(["makiko", "rancia"]);
            }
        }
        if (time >= 1440) { // 24時間
            if (this.player_data.stage == 3) {
                evolCharaName = Phaser.Utils.Array.GetRandom(Object.keys(chara_setting));
            }
        }
        if (time >= 2880) { // 48時間
            if (this.player_data.stage == 4) {
                evolCharaName = "haka";
            }
        }
        return evolCharaName;
    }
}
