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
    check(time: number): string {
        let evolCharaName = '';
        const max_key = this.getMaxParamKey();
        // ステージ1
        if (time >= 0) {
            if (this.player_data.stage == 0) {
                evolCharaName = "chana";
            }
        }

        // ステージ2　1時間
        // if (time >= 1) {
        if (time >= 60) {
            if (this.player_data.stage == 1) {
                evolCharaName = "masara";
            }
        }

        // ステージ3　14時間
        // if (time >= 2) {
        if (time >= 840) {
            if (this.player_data.stage == 2) {
                if (["music", "gag"].indexOf(max_key) >= 0) {
                    evolCharaName = "rancia";
                }
                if (["intelligence", "eros"].indexOf(max_key) >= 0) {
                    evolCharaName = "makiko";
                }
            }
        }

        // ステージ4　24時間
        if (time >= 1440) {
            if (this.player_data.stage == 3) {
                // 優先度1
                if (this.player_data.parameter[max_key] <= 25) {
                    evolCharaName = "taki";
                    return evolCharaName;
                }

                // 優先度2
                if (this.player_data.parameter.kusuri >= 100) {
                    evolCharaName = "konataro";
                    return evolCharaName;
                }
                if (this.player_data.parameter.cola >= 100) {
                    evolCharaName = "watari";
                    return evolCharaName;
                }

                // 優先度3
                if (this.player_data.parameter.music >= 30 || this.player_data.parameter.health <= 10) {
                    evolCharaName = "makoto";
                    return evolCharaName;
                }

                // 優先度4
                if (this.player_data.chara == "rancia") {
                    if (max_key == "intelligence") {
                        evolCharaName = "tanikou";
                        return evolCharaName;
                    }
                    if (max_key == "music") {
                        evolCharaName = "makoto";
                        return evolCharaName;
                    }
                    if (max_key == "eros") {
                        evolCharaName = "chachamaru";
                        return evolCharaName;
                    }
                    if (max_key == "gag") {
                        evolCharaName = "watari";
                        return evolCharaName;
                    }
                }
                
                if (this.player_data.chara == "makiko") {
                    if (max_key == "intelligence") {
                        evolCharaName = "taguchi";
                        return evolCharaName;
                    }
                    if (max_key == "music") {
                        evolCharaName = "erishia";
                        return evolCharaName;
                    }
                    if (max_key == "eros") {
                        evolCharaName = "dairi";
                        return evolCharaName;
                    }
                    if (max_key == "gag") {
                        evolCharaName = "konataro";
                        return evolCharaName;
                    }
                }
            }
        }

        // ステージ5　48時間
        if (time >= 2880) {
            if (this.player_data.stage == 4) {
                evolCharaName = "haka";
            }
        }
        return evolCharaName;
    }
    getMaxParamKey(): string {
        let max_key = "";
        for (const key in this.player_data.parameter) {
            if (["intelligence", "music", "eros", "gag"].indexOf(key) >= 0) {
                if (max_key == "" || this.player_data.parameter[max_key] < this.player_data.parameter[key]) {
                    max_key = key;
                }
            }
        }
        return max_key;
    }
}
