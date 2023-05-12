import Phaser from "phaser";
import Game from "./Game";
import Ui from "./Ui";

export default class Sounds extends Phaser.Scene {
    game: Game;
    ui: Ui;
    bgm: Phaser.Sound.WebAudioSound;
    isMute: boolean;
    constructor(game: Game, ui: Ui) {
        super("Sounds");
        Phaser.Scene.call(this, { key: "Sounds", active: true });
        this.isMute = true;
        this.game = game;
        this.ui = ui;
    }
    preload() {
        this.load.audio("bgm", ["assets/sound/bgm.mp3"]);
    }
    create() {
        this.ui.events.on("changeMute", () => {
            this.isMute = !this.isMute;
            this.bgm.setMute(this.isMute);
        });
        this.bgm = this.sound.add("bgm");
        this.bgm.setMute(this.isMute);
        this.bgm.play({ loop: true, volume: 0.2 });
    }
}
