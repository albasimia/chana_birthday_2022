import Phaser from "phaser";
class Character extends Phaser.Physics.Arcade.Sprite {
  speed: number;
  points: any;
  target: any;
  targetIndex: number;
  isSeeking: boolean;
  constructor(scene: Phaser.Scene, x: number, y: number, points: any) {
    super(scene, x, y, "ship", 2);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setScale(2);
    this.play("thrust");

    this.speed = 150;
    this.points = points;

    this.target;
    this.targetIndex = -1;

    this.isSeeking = true;

    this.seek();
  }

  seek() {
    //  Pick a random target point
    var entry = Phaser.Utils.Array.GetRandom(this.points);

    this.target = entry;

    this.isSeeking = false;

    this.scene.tweens.add({
      targets: this.body.velocity,
      x: 0,
      y: 0,
      ease: "Linear",
      duration: 500,
      onComplete: function (tween, targets, ship) {
        ship.isSeeking = true;
        ship.scene.tweens.add({
          targets: ship,
          speed: 150,
          delay: 500,
          ease: "Sine.easeOut",
          duration: 1000,
        });
      },
      onCompleteParams: [this],
    });
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);

    //  Is the ship within the radius of the target?
    if (this.target.contains(this.x, this.y)) {
      this.seek();
    } else if (this.isSeeking) {
      var angle = Math.atan2(this.target.y - this.y, this.target.x - this.x);

      this.scene.physics.velocityFromRotation(angle, this.speed, this.body.velocity);
    }
  }
}
