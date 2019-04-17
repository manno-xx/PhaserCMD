/**
 * Demo of rather basic movement.
 * The movment is on the y-axis.
 * The movement is based on the output of the sine function.
 * Using the sine function you get ease-in and ease-out at the extremities.
 * 
 * Yes, an alternative would be using a tween and the yoyo set to true
 */

/**
 * When the page is loaded, 
 */
window.onload = function() {
  
  var game = new Phaser.Game(800, 600, Phaser.AUTO, "", {
    preload: preload,
    create: create,
    update: update,
    render: render,
  });
  var logo;
  var logoY;

  /**
   * The preload function. 
   * Loads all assets needed in the game
   */
  function preload() {
    game.load.image("logo", "assets/phaser.png");
  }

  /**
   * The create function.
   * Takes care of the initialisation
   */
  function create() {
    logo = game.add.sprite(game.world.centerX, game.world.centerY, "logo");
    logo.anchor.setTo(0.5, 0.5);
    logoY = logo.y;
  }

  /**
   * The update function.
   * Makes the Phaser logo move using the sine function and the game time
   * - amplitude controls the ... amplitute (the vertical displacement)
   * - timeFactor controls the speed of the movement
   */
  function update() {
    // quick and dirty way of some sine based movement
    var amplitude = 30;
    var timeFactor = 0.9;
    var sine = Math.sin(game.time.totalElapsedSeconds() * timeFactor);
    var displacement = sine * amplitude;
    logo.y = logoY + displacement;
  }

  /**
   * The render function.
   * Shows the position of the position of the logo on the screen.
   * Using the debug.text method is easier than clogging up the browser's console
   */
  function render() {
    game.debug.text(logo.y, 10, 10);
  }
};
