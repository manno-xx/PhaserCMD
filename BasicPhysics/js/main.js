/**
 * Demo of basic physics
 *
 * In this demo there are no loaded graphics.
 * Instead of a sprite, a graphics object is used. Graphics objects can be drawn onto.
 *
 * This
 */

window.onload = function() {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, "", {
    create: create,
    update: update,
    render: render,
  });

  var ball;
  var floor;

  /**
   * Create the graphic objects and initialise physics
   * 
   * Becuase the anchor point of the objects are not in the top-left, 
   *    the bodies for the objects need to be offset manually (here using setCircle() and setSize())
   */
  function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 100;

    // create a graphics object and draw a circle
    ball = game.add.graphics(game.world.centerX, 100);
    ball.beginFill(0xff0000);
    ball.drawCircle(0, 0, 50);
    ball.endFill();

    // enable physics for the ball and set some physics properties
    game.physics.enable(ball, Phaser.Physics.ARCADE);
    ball.body.collideWorldBounds = true;
    ball.body.setCircle(25, -25, -25);
    ball.body.bounce.y = 0.6;

    // create a graphics object and draw a rectangle
    floor = game.add.graphics(game.world.centerX, game.world.height);
    floor.beginFill(0x0000ff);
    floor.drawRect(-200, -20, 400, 40);

    // enable physics for the floor and set some physics properties
    game.physics.enable(floor, Phaser.Physics.ARCADE);
    floor.body.allowGravity = false;
    floor.body.immovable = true;
    floor.body.setSize(400, 40, -200, -20);
  }

  /**
   * Let Phaser do the collision check between ball and floor
   * Phser deals with the collision according to physics laws and setting set (like gravity and bouncyness)
   */
  function update() {
    game.physics.arcade.collide(ball, floor);
  }

  /**
   * if the LMB is pressed, visualise the physics bodies of the objects
   * otherwise, clear the debug rendering
   */
  function render() {
    if (game.input.activePointer.leftButton.isDown) {
      game.debug.body(ball);
      game.debug.body(floor);
    } else {
      game.debug.reset();
    }
  }
};
