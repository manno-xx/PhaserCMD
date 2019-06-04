/**
 * Demo of a few Audioplaying features
 */

var game;
var bgMusic;
var explosion, sword, blaster;

window.onload = function() {
  game = new Phaser.Game(800, 600, Phaser.AUTO, "", {
    preload: preload,
    create: create,
    update: update,
    render: render,
  });
};

/**
 * Load the audio
 */
function preload() {
  game.load.audio("bg", "./assets/bodenstaendig_2000_in_rock_4bit.mp3");

  game.load.audio("explosion", "./assets/explosion.mp3");
  game.load.audio("sword", "./assets/sword.mp3");
  game.load.audio("blaster", "./assets/blaster.mp3");
}

/**
 * On create:
 * - add an instructional text
 * - add audio files (3fx, 1 background music)
 * - instantiate keyboard input for
 *   - volume changes
 *   - 'sound board' functionality
 * - have some (fairly useless) functionality to show the audio level in the console after it is being set
 * - make sure audio plays after player clicks once
 */
function create() {
  game.add
    .text(
      game.world.centerX,
      game.world.centerY,
      "Press 1, 2, 3 or W\nUp and down arrows to change volume\nClick anywhere to start audio",
      {
        font: "bold 32px Arial",
        fill: "#666",
        align: "center",
      }
    )
    .anchor.set(0.5, 0.5);

  // adding the sound fx
  explosion = game.add.audio("explosion");
  sword = game.add.audio("sword");
  blaster = game.add.audio("blaster");

  // add the background music
  bg = game.add.audio("bg", 1, true);
  bg.play();

  // keys to change volume
  var louder = game.input.keyboard.addKey(Phaser.Keyboard.UP);
  louder.onDown.add(increaseVolume, this);
  var softer = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
  softer.onDown.add(decreaseVolume, this);

  game.sound.onVolumeChange.add(volumeChanged, this);

  // keys to play sound fx
  var one = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
  one.onDown.add(playExplosion, this);

  var two = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
  two.onDown.add(playSword, this);

  var three = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
  three.onDown.add(playBlaster, this);

  // once you click on the game, the audio can be heard 
  // (need to interact to prevent annoying auto-start audio)
  game.input.onDown.addOnce(() => {
    game.sound.context.resume();
  });
}

/*
 * The eventhandlers for keypresses
 */
function increaseVolume() {
  game.sound.volume += 0.1;
}
function decreaseVolume() {
  game.sound.volume -= 0.1;
}

// gets signalled when audio volume changes
function volumeChanged() {
  console.log(arguments);
}

function playExplosion() {
  explosion.play();
}
function playSword() {
  sword.play();
}
function playBlaster() {
  blaster.play();
}

/**
 * just demonstrating this is not the way to implement this
 */
function update() {
  // think why this won't work (or gives funny results)
  if (game.input.keyboard.isDown(Phaser.Keyboard.W)) {
    explosion.play();
  }
}

/**
 * Output the volume to the screen
 */
function render() {
  game.debug.text(`Volume ${game.sound.volume.toFixed(2)}`, 10, 20);
}
