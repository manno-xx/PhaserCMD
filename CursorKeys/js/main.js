/**
 * Demo of using the createCursorKeys convenience function in Phaser
 * 
 * The createCursorKeys function allows you to capture the four cursor keys with less code.
 * 
 * https://photonstorm.github.io/phaser-ce/Phaser.Keyboard.html#createCursorKeys
 */

window.onload = function() {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, "", {
    preload: preload,
    create: create,
    update: update,
  });

  var logo;

  /**
   * Load the single asset used
   */
  function preload() {
    game.load.image("logo", "assets/phaser.png");
  }

  /**
   * places the logo onto the stage 
   * initilizes the cursor keys
   */
  function create() {
    logo = game.add.sprite(game.world.centerX, game.world.centerY, "logo");
    logo.anchor.setTo(0.5, 0.5);
    cursors = game.input.keyboard.createCursorKeys();
  }

  /**
   * Checks the state of the cursor keys and moves the logo accordingly
   */
  function update() {
    if (cursors.left.isDown) {
      logo.x--;
    }
    if (cursors.right.isDown) {
      logo.x++;
    }
    if (cursors.up.isDown) {
      logo.y--;
    }
    if (cursors.down.isDown) {
      logo.y++;
    }
  }
};
