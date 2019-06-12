/**
 * Demo of the health system in Phaser.
 * All Phaser sprites have a health property
 * You can set it to any number
 * If it reaches 0 (zero) or less, the sprite sends out a signal that it is killed
 * You can have any function be called when the onKilled signal is sent (signals are similar to event handlers)
 * You can change a sprite's health by calling the damage() and heal() functions of the sprite
 *
 * The character in this demo has a health of 3
 * Each time you click the character, 1 point of damage is done
 * When health reaches 0 (or less), the onKilled signal is sent
 * The function that executes as a result logs the bad news to the console
 *
 */

var game;
var player;

window.onload = function() {
  game = new Phaser.Game(800, 600, Phaser.AUTO, "", {
    preload: preload,
    create: create,
  });
};

function preload() {
  // https://opengameart.org/content/lpc-muscular-hurt-animation
  game.load.spritesheet("character", "assets/Hurt, body.png", 64, 64);
}

/**
 * Initializes the sprite and sets the signals responders
 */
function create() {
  player = game.add.sprite(100, 100, "character", 0);
  player.health = 3;

  player.events.onKilled.addOnce(spriteKilled);

  player.inputEnabled = true;
  player.events.onInputDown.add(doDamage);

  game.add
    .text(
      game.world.centerX,
      game.world.centerY,
      "Click the character to hurt it (aawwwww)",
      {
        font: "bold 32px Arial",
        fill: "#666",
        align: "center",
      }
    )
    .anchor.set(0.5, 0.5);
}

/**
 * Called by the onInputDown signal of the player character.
 * Does one (1) damage to the character that was clicked.
 * 
 * @param {Sprite} sprite   The Sprite that was clicked.
 */
function doDamage(sprite) {
  sprite.damage(1);
}

/**
 * Called by the onKilled signal of the player character.
 * Logs a message to the console.
 *
 * @param {Sprite} sprite   The sprite that was killed.
 */
function spriteKilled(sprite) {
  console.log("The sprite is dead :( ", sprite);
}
