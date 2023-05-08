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
        if (time >= 0) { // ステージ1
            if (this.player_data.stage == 0) {
                evolCharaName = "chana";
            }
        }
        // if (time >= 1) {
        if (time >= 60) { // ステージ2　1時間
            if (this.player_data.stage == 1) {
                evolCharaName = "masara";
            }
        }
        // if (time >= 2) {
        if (time >= 840) { // ステージ3　14時間
            if (this.player_data.stage == 2) {
                let max_key = '';
                for (const key in this.player_data.parameter) {
                    if(['intelligence','music', 'eros', 'gag'].indexOf(key) >= 0) {
                        if(max_key == '' || this.player_data.parameter[max_key] < this.player_data.parameter[key]) {
                            max_key = key;
                        }
                    }
                }
                if(['music', 'gag'].indexOf(max_key) >= 0){
                    evolCharaName = 'rancia';
                }
                if(['intelligence', 'eros'].indexOf(max_key) >= 0){
                    evolCharaName = 'makiko';
                }
            }
        }
        if (time >= 1440) { // ステージ4　24時間
            if (this.player_data.stage == 3) {
                evolCharaName = Phaser.Utils.Array.GetRandom(Object.keys(chara_setting));
            }
        }
        if (time >= 2880) { // ステージ5　48時間
            if (this.player_data.stage == 4) {
                evolCharaName = "haka";
            }
        }
        return evolCharaName;
    }
}
