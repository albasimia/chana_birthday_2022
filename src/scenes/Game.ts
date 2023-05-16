import Phaser, { Time } from "phaser";
import Character from "../chara/Character";
import chara_setting from "../settings/chara_setting";
import foods_setting from "../settings/foods_setting";
import save_data_template from "../settings/save_data_template";
import AwayTime from "phaser3-rex-plugins/plugins/awaytime.js";
import TimeManage from "../tools/TimeManage";
import EvolutionManage from "../tools/EvolutionManage";
import Unko from "../tools/Unko";
// import Toilet from "../tools/Toilet";

export default class Game extends Phaser.Scene {
    isAnime: boolean;
    charaTween?: Phaser.Tweens.Tween;
    public player?: Character;

    charaName: string;

    sceneW: number;
    wCenter: number;
    sceneH: number;
    hCenter: number;

    save_data: Object;

    food_group: [];
    unko_group: [];

    tm: TimeManage;
    em: EvolutionManage;
    constructor() {
        super("GameScene");
        // this.player = new Character(this, 32, 100, this.charaName);
        this.sceneW = 0;
        this.wCenter = 0;
        this.sceneH = 0;
        this.hCenter = 0;

        this.save_data = JSON.parse(localStorage.getItem("save_data"));
        if (!this.save_data) {
            this.save_data = save_data_template;
        } else {
            if (this.save_data.format_virsion != save_data_template.format_virsion) {
                console.log(save_data_template);
                this.save_data = this.merge(save_data_template, this.save_data);
                console.log(save_data_template);
                this.save_data.format_virsion = save_data_template.format_virsion;
                this.save();
            }
        }
        // console.log(this.save_data);

        this.isAnime = false;
        // this.charaName = "chana";
        this.charaName = this.save_data.data.player.chara;

        this.tm = new TimeManage(this);
        this.em = new EvolutionManage(this);

        this.food_group = [];
        this.unko_group = [];
    }

    preload() {
        // this.load.image("sky", "assets/img/sky.png");
        this.load.image("kusamura", "assets/img/bg/kusamura.png");
        this.load.image("machi", "assets/img/bg/machi.png");
        this.load.image("umi", "assets/img/bg/umi.png");
        // this.load.image("ground", "assets/img/ground.png");
        this.load.image("unko", "assets/img/stuff/unko.png");
        this.load.image("ryusui", "assets/img/stuff/ryusui.png");
        for (const name in chara_setting) {
            if (Object.prototype.hasOwnProperty.call(chara_setting, name)) {
                const element = chara_setting[name];
                this.load.spritesheet(name, element.path, {
                    frameWidth: element.frameW,
                    frameHeight: element.frameH,
                });
            }
        }
        for (const food in foods_setting) {
            if (Object.prototype.hasOwnProperty.call(foods_setting, food)) {
                const food_element = foods_setting[food];
                for (let i = 0; i < food_element.images.length; i++) {
                    this.load.image(food_element.images[i].image_name, food_element.images[i].path);
                }
            }
        }
    }

    create() {
        if (!this.save_data.data.time.start) {
            this.save_data.data.time.start = Date.now();
        }
        // const diff_time = Date.now() - new Date(this.save_data.data.time.start).getTime();
        // const tm = new TimeManage(this);
        // console.log(tm)
        // console.log(Math.floor(diff_time / (60000)))
        // const awaytime = (new AwayTime()).awayTime;
        // console.log(awaytime)
        // console.log(new Date(awaytime).getMinutes())

        // 毎秒確認
        this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: this.tic,
        });

        this.sceneW = this.scale.width;
        this.wCenter = this.sceneW / 2;
        this.sceneH = this.scale.height;
        this.hCenter = this.sceneH / 2;

        const bg_name = Phaser.Utils.Array.GetRandom(["kusamura", "machi", "umi"]);
        const background = this.add.image(this.wCenter, this.hCenter, bg_name);
        const ground = this.add.rectangle(0, this.hCenter - 32, this.sceneW, this.hCenter);
        background.scale = 2;
        ground.setDisplayOrigin();

        this.player = new Character(this, this.wCenter, this.sceneH - 100, this.charaName);
        // this.player.setCollideWorldBounds(true);
        this.player.setDepth(99);

        // this.player.setBounce(0.5);

        ground.setInteractive();
        ground.setOrigin(0, 0);
        ground.on(
            "pointerup",
            (p: Phaser.Input.Pointer) => {
                if (!this.player?.isEvolution) {
                    this.player?.move(p.upX, p.upY);
                }
            },
            this
        );
        this.game.events.addListener(Phaser.Core.Events.BLUR, this.onBlur);
        this.game.events.addListener(Phaser.Core.Events.FOCUS, this.onFocus);

        // うんこ初期表示
        const unko_data = this.save_data.data.unko.concat();
        for (const unko of unko_data) {
            this.unko_group.push(new Unko(this, unko.x, unko.y));
            // new Unko(this, unko.x, unko.y);
        }

        // new Toilet(this, this.sceneW + 8, this.sceneH - 8 * 10)
    }

    update() {}

    onBlur = () => {
        // console.log("onBlur");
        this.save();
    };
    onFocus = () => {
        // console.log("onFocus");
    };
    save() {
        localStorage.setItem("save_data", JSON.stringify(this.save_data));
    }
    tic = () => {
        // うんこ確認
        this.checkUnko();

        // 進化確認
        const since_start = this.tm.getTimeDiff(this.save_data.data.time.start, Date.now());
        const evolCharaName = this.em.check(since_start);
        if (evolCharaName != "") {
            this.player?.evolution(evolCharaName);
        }
    };
    checkUnko() {
        if (this.save_data.data.time.last_meal) {
            const since_last_meal = this.tm.getTimeDiff(this.save_data.data.time.last_meal, Date.now());
            // 最後の食事から10分に1個追加 100個まで
            if (this.save_data.data.unko.length < Math.floor(since_last_meal / 10)) {
                const addUnkoCount = Math.floor(since_last_meal / 10) - this.save_data.data.unko.length;
                for (let index = 0; index < addUnkoCount && this.save_data.data.unko.length < 100; index++) {
                    let x = Phaser.Math.Between(20, 172);
                    let y = Phaser.Math.Between(150, 250);

                    this.unko_group.push(new Unko(this, x, y));
                    // new Unko(this, x, y);

                    const unko_data = {
                        time: Date.now(),
                        x: x,
                        y: y,
                    };
                    this.save_data.data.unko.push(unko_data);
                }
            }
        }
        // TIDO: うんこダメージ
    }

    // objectのmerge用、ここに書くべきじゃなさそう。
    merge = (a: object, b: object) => {
        let newObject = JSON.parse(JSON.stringify(a));
        for (let key in b) {
            if (b.hasOwnProperty(key)) {
                newObject[key] = key in a ? (typeof newObject[key] === "object" && typeof b[key] === "object" ? this.merge(newObject[key], b[key]) : b[key]) : b[key];
            }
        }
        return newObject;
    };
}
