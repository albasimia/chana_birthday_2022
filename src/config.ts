import Phaser from "phaser";
import CustomPipeline from "./shader/CustomPipeline";
// import AwayTimePlugin from "phaser3-rex-plugins/plugins/awaytime.js";

export default {
    // type: Phaser.AUTO,
    // type: Phaser.CANVAS,
    type: Phaser.WEBGL,
    parent: "game",
    backgroundColor: "#33A5E7",
    scale: {
        // width: 96,
        // height: 160,
        width: 96 * 2,
        height: 160 * 2,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    // physics: {
    //   default: "matter",
    //   matter: {
    //     gravity: {
    //       x: 0,
    //       y: 0,
    //     },
    //   },
    // },
    physics: {
        default: "arcade",
        arcade: {
            gravity: {
                x: 0,
                y: 0,
            },
            // debug: true,
        },
    },
    fps: 10,
    antialias: false,
    // antialiasGL :false,
    render: {
        pixelArt: true,
    },
    audio: {
        disableWebAudio: true
    },
    // pipeline: { CustomPipeline: CustomPipeline },
    // dom: {
    //   createContainer: true,
    // },
    // plugins: {
    //     global: [
    //         {
    //             key: "rexAwayTime",
    //             plugin: AwayTimePlugin,
    //             start: true,
    //         },
    //     ],
    // },
};
