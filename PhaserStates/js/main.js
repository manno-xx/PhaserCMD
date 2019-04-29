/**
 * Demo on the divide and conquer that game states offer
 *
 * Larger games can be split up into logical chunks representing a certain state of the game:
 * - menu
 * - game
 * - game over
 * - credits
 * - etc.
 *
 * This splitting up eventually make code easier to manage.
 * Less if ... else statements checking if the game is running and if so moving a character, otherwise show the menu etc.
 *
 * Phaser does this by letting you define an object per game state.
 * Each object has
 * - its own preload, create, update etc. functions
 * - properties (the variables within objects)
 *
 * You can then tell phaser what game state should be active
 *
 */

window.onload = function() {
  game = new Phaser.Game(800, 600, Phaser.AUTO, "");
  game.state.add("menu", menuState);
  game.state.add("game", gameState);
  game.state.start("menu");
};

var game;

/**
 * The object that contains all variables and functions
 *  (or in object terminology: properties and methods)
 *  that define the game state 'menu'
 * The menu state creates a button that, when clicked, loads another game state.
 */
var menuState = {
  button: "",
  upKey: "",
  downKey: "",
  preload: function() {
    game.load.image("logo", "assets/phaser.png");
    game.load.image("myButton", "assets/button.png");
  },
  create: function() {
    // https://photonstorm.github.io/phaser-ce/Phaser.GameObjectFactory.html#button
    button = game.add.button(
      game.world.centerX,
      400,
      "myButton",
      this.clickButton,
      this,
      2,
      1,
      0
    );

    button.anchor.setTo(0.5, 0.5);
  },
  clickButton: function() {
    game.state.start("game");
  },
};

/**
 * The object that contains all variables and functions of the game state 'game'
 */
var gameState = {
  create: function() {
    var logo = game.add.sprite(
      game.world.centerX,
      game.world.centerY + 100,
      "logo"
    );

    logo.anchor.setTo(0.5, 0.5);

    game.add
      .tween(logo)
      .to(
        { y: game.world.centerY - 100 },
        4000,
        Phaser.Easing.Sinusoidal.InOut,
        true,
        0,
        -1,
        true
      );

    game.camera.flash(0xffffff, 300);
  },
};
