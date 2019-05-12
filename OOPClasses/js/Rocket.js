/**
 * Class defining a Rocket
 * The Rocket moves by velocity and has a particle emitter as an exhaust
 * When the rocket is removed from the game, it gets signalled and the emitter is destroyed too.
 *
 */

export default class Rocket extends Phaser.Sprite {
  /**
   * Initialises the Rocket:
   * Image of sprite, Physics, emitter as exhaust.
   * Also makes sure a function is called when the sprite is destroyed.
   *
   * @param {Game} game The game as initiaised in the main file
   * @param {String} image The key of a loaded image.
   */
  constructor(game, image) {
    // to make this work like any other sprite
    super(game, game.world.centerX, game.world.centerY, image);
    this.game.stage.addChild(this);

    this.anchor.set(0.5, 0.5);

    // some physics stuff to make it move and bounce against the screen edges
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.gravity.setTo(0, 200);
    this.body.bounce.setTo(1, 1);
    this.body.collideWorldBounds = true;

    // pick a random angle as a direction to move in
    // movement is done by velocity
    var angle = game.rnd.angle();
    this.body.velocity.setTo(
      Math.cos(game.math.degToRad(angle)),
      Math.sin(game.math.degToRad(angle))
    );
    this.body.velocity.setMagnitude(300);

    // the exhaust animation (just because we can)
    this.emitter = game.add.emitter(0, 0, 400);
    this.emitter.makeParticles(["particle"]);
    this.emitter.setAlpha(1, 0, 350);
    this.emitter.start(false, 300, 50);

    // When this sprite is destroyed, the emitter should as well be.
    // With the line below we add an eventhandler for the destroy event.
    this.events.onDestroy.add(this.onDestroy, this);
  }

  /**
   * eventhandler of when this is destroyed
   */
  onDestroy() {
    this.emitter.destroy();
  }

  /**
   * Makes sure that:
   * - the rocket points in the direction it is heading.
   * - the emitter emits its particles in the opposite direction of where the rocket's heading
   * - the positions of the emitter is at the position of the rocket (a little crude, yes).
   */
  update() {
    this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);

    this.emitter.setAngle(
      this.game.math.radToDeg(this.rotation - Math.PI),
      this.game.math.radToDeg(this.rotation - Math.PI),
      10,
      200
    );

    this.emitter.emitX = this.x;
    this.emitter.emitY = this.y;
  }
}
