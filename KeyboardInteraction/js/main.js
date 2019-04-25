/**
 * Demo of implementing a one-shot key event
 *
 * If you want to listen for key down events, usually the event gets triggered n-times per second. (like pressing and holding a key in a word processor)
 *
 * This demo uses the so called signal of a key.
 * Signals are much like events, you can listen for them and have a function called as a result.
 */

window.onload = function() {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, "", {
    create: create,
  });

  var fire;

  /**
   * Set up the space bar and the function to be called as a result of its press
   * 
   */
  function create() {
    fire = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    fire.onDown.add(shoot);
  }

  /**
   * Handler for the space bar press.
   * Logs a message and changes the background color
   */
  function shoot() {
    console.log("Shot Fired!");

    // just to have something to see...
    var color = Phaser.Color.RGBtoString(game.rnd.integerInRange(0, 256), game.rnd.integerInRange(0, 256), game.rnd.integerInRange(0, 256), "#");
    game.stage.backgroundColor = color;
  }
};
