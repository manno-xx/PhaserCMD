/**
 * Demo of a tween based movment.
 * The movement is on the y-axis.
 * 
 * Uses tweens:
 * https://photonstorm.github.io/phaser-ce/Phaser.Tween.html
 * 
 * Uses easing:
 * https://photonstorm.github.io/phaser-ce/Phaser.Easing.Sinusoidal.html
 */

/**
 * When the page is loaded, 
 */
window.onload = function() {
  
  var game = new Phaser.Game(800, 600, Phaser.AUTO, "", {
    preload: preload,
    update: update,
    create: create,
    render: render,
  });

  var logo;

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

    game.add.tween(logo).to({y: 100}, 4000, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
  }

  /**
   * The update function.
   */
  function update() {
    // nothing happening here. The tween started in create runs forever
  }

  /**
   * The render function.
   * Showsthe y-position of the logo on the screen.
   * Using the debug.text method is easier than clogging up the browser's console
   */
  function render() {
    game.debug.text(logo.y, 10, 10);
  }
};
