import Phaser from "phaser";
import Game from "../scenes/Game";
import chara_setting from "../settings/chara_setting";
export default class EvolutionManage {
    scene: Game;
    player_data: Object;
    constructor(scene: Game) {
        this.scene = scene;
    }
    check(time: number): string {
        let evolCharaName = '';
        const max_key = this.getMaxParamKey();
        // ステージ1
        if (time >= 0) {
            if (this.scene.save_data.data.player.stage == 0) {
                evolCharaName = "chana";
            }
        }

        // ステージ2　1時間
        // if (time >= 1) {
        if (time >= 60) {
            if (this.scene.save_data.data.player.stage == 1) {
                evolCharaName = "masara";
            }
        }

        // ステージ3　14時間
        // if (time >= 2) {
        if (time >= 840) {
            if (this.scene.save_data.data.player.stage == 2) {
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
            if (this.scene.save_data.data.player.stage == 3) {
                // 優先度1
                if (this.scene.save_data.data.player.parameter[max_key] <= 25) {
                    evolCharaName = "taki";
                    return evolCharaName;
                }

                // 優先度2
                if (this.scene.save_data.data.player.parameter.kusuri >= 100) {
                    evolCharaName = "konataro";
                    return evolCharaName;
                }
                if (this.scene.save_data.data.player.parameter.cola >= 100) {
                    evolCharaName = "watari";
                    return evolCharaName;
                }

                // 優先度3
                if (this.scene.save_data.data.player.parameter.music >= 30 || this.scene.save_data.data.player.parameter.health <= 10) {
                    evolCharaName = "makoto";
                    return evolCharaName;
                }

                // 優先度4
                if (this.scene.save_data.data.player.chara == "rancia") {
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
                
                if (this.scene.save_data.data.player.chara == "makiko") {
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
            if (this.scene.save_data.data.player.stage == 4) {
                evolCharaName = "haka";
            }
        }
        return evolCharaName;
    }
    getMaxParamKey(): string {
        let max_key = "";
        for (const key in this.scene.save_data.data.player.parameter) {
            if (["intelligence", "music", "eros", "gag"].indexOf(key) >= 0) {
                if (max_key == "" || this.scene.save_data.data.player.parameter[max_key] < this.scene.save_data.data.player.parameter[key]) {
                    max_key = key;
                }
            }
        }
        return max_key;
    }
}
