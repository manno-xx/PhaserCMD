/**
 * Demo of classes in JavaScript
 *
 * The class structure is sort of a divide and conquer strategy.
 * It makes it possible to write code that is very specific to a (type of) game object in a seperate file
 *  (for instance its initialisation and/or autonomous behaviour)
 * This makes it so that the update loop of the main script stays more clean.
 * That main update loop then only needs to concern it self with the overview
 *  and less with the nitty gritty details of particular game objects.
 *
 * Officially this setup is not yet supported in all browsers. 
 * Your mileage may vary: https://caniuse.com/#feat=es6-module-dynamic-import
 * Works in Safari and Chrome
 * _should_ work in Firefox (depending on version) when you set javascript.options.dynamicImport to true in about:config
 * Does not work in Microsoft browsers (apparently, on a mac myself)
 *
 * It is however where things are going with JavaScript...
 * 
 * 
 * In this demo there is quite a lot going on in the Rocket.js file.
 * Main point is that it is in _that_ file and not _this_ file.
 * This makes it:
 * - portable (easy to reuse in another project)
 * - easier to maintain (less clutter in this file)
 * - ...
 * 
 */

// The script Rocket.js defines the initialisation and behaviour of rockets.
// 'Rocket' is the name of the type (or class) of game object defined in that file
import Rocket from "./Rocket.js";

var game = new Phaser.Game(800, 600, Phaser.AUTO, "", {
  preload: preload,
  create: create,
  update: update,
});

// the array to store all active rockets in
var rockets;

/**
 * create an empty array for the bullets
 * load the required gfx
 */
function preload() {
  rockets = [];
  // from kenney.nl
  game.load.image("bullet", "assets/tank_bullet3.png");
  // my own (yeah!)
  game.load.image("particle", "assets/particle.png");
}

/**
 * Create the instruction text
 * initialise the LMB to fire a rocket
 * initialise the space bar to destroy the oldest rocket
 */
function create() {
  game.add
    .text(
      game.world.centerX,
      game.world.centerY,
      "Click to FIRE!\nPress SPACE to Destroy",
      {
        font: "bold 32px Arial",
        fill: "#666",
        align: "center",
      }
    )
    .anchor.set(0.5, 0.5);

  game.input.onDown.add(fire);

  var space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  space.onDown.add(destroy);
}

/**
 * Nothing happening here
 */
function update() {}

/**
 * reponds to LMB, fires a rocket.
 */
function fire() {
  console.log("fire");

  rockets.push(new Rocket(game, "bullet"));
}

/**
 * Responds to space bar press, destroys the oldest rocket.
 */
function destroy() {
  console.log("kill");

  if (rockets.length > 0) {
    rockets.shift().destroy();
  }
}
