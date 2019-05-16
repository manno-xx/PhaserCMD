/**
 * Demo of basic physics
 * 
 * One ball is given a velocity with a random direction and speed/magnitude of 200 (px/s)
 * Bouncyness of the balls is set so no energy is lost in the collision. therefor everything keeps moving.
 * https://photonstorm.github.io/phaser-ce/Phaser.Physics.Arcade.Body.html
 * https://photonstorm.github.io/phaser-ce/Phaser.Physics.Arcade.Body.html#bounce
 * https://photonstorm.github.io/phaser-ce/Phaser.Physics.Arcade.Body.html#velocity
 * 
 * 
 * Just for the heck of it, some custom data is added to each ball (using sprite.data). In this case identifying them.
 * https://photonstorm.github.io/phaser-ce/Phaser.Sprite.html#data
 * 
 * In this demo there are no loaded graphics.
 * Instead of a sprite, a graphics object is used. Graphics objects can be drawn onto (in this case a circle and a rectangle).
 * https://photonstorm.github.io/phaser-ce/Phaser.Graphics.html
 */

window.onload = function() {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, "", {
    create: create,
    update: update,
    render: render,
  });

  var balls;
  var redBall;
  var blueBall;
  var greenBall;

  /**
   * Create the graphic objects and initialise physics
   * 
   * Because the anchor point of the objects are not in the top-left, 
   *    the bodies for the objects need to be offset manually (here using setCircle())
   */
  function create() {

    // get the physics system going
    // (Phaser has three systems, ARCADE is the simplest)
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Create a Phaser Group to combine objects for easier collision detection
    balls = game.add.group();

    // create a graphics objects and draw a circles
    redBall = createBall(game.world.centerX -200, 300, 0xff0000);
    redBall.data.description = "the red one";
    greenBall = createBall(game.world.centerX, 300, 0x00ff00);
    greenBall.data.description = "the green one";
    blueBall = createBall(game.world.centerX + 200, 300, 0x0000ff);
    blueBall.data.description = "the blue one";

    // determine a random angle as a direction to move in at a 200px/s speed
    var angle = game.rnd.angle();
    greenBall.body.velocity.set( Math.cos(game.math.degToRad(angle)), Math.sin(game.math.degToRad(angle)) );
    greenBall.body.velocity.setMagnitude(200);

    // add all balls to a Phaser Group
    balls.add(redBall);
    balls.add(greenBall);
    balls.add(blueBall);
  }

  /**
   * just the 'normal' check for collisions.
   * If there is a collision, pPhaser will deal with the 'normal' response.
   * Added to that a custom function will be called (see the function further down this file).
   */
  function update() {
    game.physics.arcade.collide(balls, undefined, collisionDealer);
  }

  /**
   * Show the physics information on the green ball
   */
  function render() {
    game.debug.bodyInfo(greenBall, 10, 10);
  }

  /**
   * The function that is executed when two balls collide (see update() function above)
   * @param {Sprite} one The one object in the collision
   * @param {Sprite} two The other object in the collision
   */
  function collisionDealer(one, two){
      console.log(one.data.description + " hit " + two.data.description);
  }

  /**
   * Creates a Graphic object and draws a filled circle onto it
   * 
   * @param {number} xPos The x position of the ball to be
   * @param {number} yPos The y position of the ball to be
   * @param {number} color The color of the ball to be
   */
  function createBall(xPos, yPos, color){
    var ball = game.add.graphics(xPos, yPos);
    ball.beginFill(color);
    ball.drawCircle(0, 0, 50);
    ball.endFill();

    // enable physics for the ball and set some physics properties
    game.physics.enable(ball, Phaser.Physics.ARCADE);
    ball.body.setCircle(25, -25, -25);
    ball.body.collideWorldBounds = true;
    ball.body.bounce.set(1, 1);

    return ball;
  }
};
