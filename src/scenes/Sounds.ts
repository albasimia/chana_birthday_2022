import Phaser from "phaser";
import Game from "./Game";
import Ui from "./Ui";
import SoundButton from "../ui/SoundButton";

export default class Sounds extends Phaser.Scene {
    game: Game;
    ui: Ui;
    bgm: Phaser.Sound.WebAudioSound;
    isMute: boolean;
    SoundButton : SoundButton;
    constructor(game: Game, ui: Ui) {
        super("Sounds");
        Phaser.Scene.call(this, { key: "Sounds", active: true });
        this.isMute = true;
        this.game = game;
        this.ui = ui;
        // this.SoundButton = new SoundButton(this, this.scale.width - 20, 20);
    }
    preload() {
        this.load.audio("bgm", ["assets/sound/bgm.mp3"]);
    }
    create() {
        // this.ui.events.on("changeMute", () => {
        //     this.isMute = !this.isMute;
        //     this.bgm.setMute(this.isMute);
        // });
        this.SoundButton = new SoundButton(this, this.scale.width - 20, 20);

        this.events.on("changeMute", () => {
            this.isMute = !this.isMute;
            this.bgm.setMute(this.isMute);
        });
        this.bgm = this.sound.add("bgm");
        this.bgm.setMute(this.isMute);
        this.bgm.play({ loop: true, volume: 0.2 });
    }
}
