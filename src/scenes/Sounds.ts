import Phaser from "phaser";
import Game from "./Game";
import Ui from "./Ui";
import SoundButton from "../ui/SoundButton";

export default class Sounds extends Phaser.Scene {
    game: Game;
    ui: Ui;
    bgm: Phaser.Sound.WebAudioSound;
    isMute: boolean;
    SoundButton: SoundButton;
    constructor(game: Game, ui: Ui) {
        super("Sounds");
        Phaser.Scene.call(this, { key: "Sounds", active: true });
        this.isMute = true;
        this.game = game;
        this.ui = ui;
    }
    preload() {
        this.load.image("sound_on", "assets/img/ui/sound_on.png");
        this.load.image("sound_off", "assets/img/ui/sound_off.png");
        this.load.audio("bgm", ["assets/sound/bgm.mp3"]);
    }
    create() {
        this.SoundButton = new SoundButton(this, this.scale.width - 20, 20);

        this.bgm = this.sound.add("bgm");
        this.events.on("changeMute", () => {
            if(this.sound.locked) {
                this.sound.unlock();
            }
            this.isMute = !this.isMute;
            this.bgm.setMute(this.isMute);
        });
        this.bgm.setMute(this.isMute);

        if (!this.sound.locked) {
            this.bgm.play({ loop: true, volume: 0.1 });
        } else {
            this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
                this.bgm.play({ loop: true, volume: 0.1 });
            });
        }
    }
}
