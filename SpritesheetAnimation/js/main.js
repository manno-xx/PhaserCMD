/**
 * Demo of sprite sheets
 * Very basic sprite sheet animation code
 * Two sprite sheets are loaded. One of a rotating coin, another of a male character walking in four directions
 *
 * Graphics from:
 * https://opengameart.org/content/character-animations-clothes-armor-weapons-skeleton-enemy-combat-dummy
 * https://opengameart.org/content/rotating-coin-0
 */

window.onload = function() {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, "", {
    preload: preload,
    create: create,
  });

  /**
   * Load all assets. Setting the frame sizes of the frames in the spritesheets
   */
  function preload() {
    game.load.spritesheet("male", "assets/BODY_male.png", 64, 64);
    game.load.spritesheet("coin", "assets/coin_rot_anim.png", 32, 32);
  }

  /**
   * Create sprites and their animations
   * When the sprite is created/added folowing parameters are set:
   * - position is set in x- and y-location 
   * - the key of the asset to use is indicated
   * - the initial frame to show is set
   * https://photonstorm.github.io/phaser-ce/Phaser.GameObjectFactory.html#sprite
   * 
   * Subsequently animations are added to the sprite. Setting the following properties:
   * - The key for the animation
   * - The frames of the animation
   * - The framerate of the animation
   * - Whether or not the animation loops
   * https://photonstorm.github.io/phaser-ce/Phaser.AnimationManager.html#add
   */
  function create() {
    var avatar = game.add.sprite(100, 100, "male", 0);
    avatar.animations.add("right", [28, 29, 30, 31, 32, 33, 34, 35], 14, true);
    avatar.play("right");

    var coin = game.add.sprite(200, 200, "coin");
    coin.animations.add("rot", [0, 1, 2, 3, 4, 5], 6, true);
    coin.play("rot");
  }
};
