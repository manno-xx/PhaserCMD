/**
 * Demo of parallax background.
 * Uses TileSprites
 * https://photonstorm.github.io/phaser-ce/Phaser.TileSprite.html
 * 
 * TileSprites show an image but allow it to be tiled or wrapped around the edges.
 * You can set the offset of the image(s) and ass such make it scrolling.
 *
 * As an addition:
 * The speed (of the background) is in pixels per second.
 * Therefor we need to know how much time has passed since the last update
 * https://photonstorm.github.io/phaser-ce/Phaser.Time.html
 *
 * The speed is set to zero initially but set to non-zero value when the right cursor key is pressed
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

  // the three tile sprites that create the parallax effect
  var layer1, layer2, layer3;

  var rightKey;
  var speed = 0;
  var maxSpeed = 40;

  /**
   * Load the three images that will make up the parallax background
   */
  function preload() {
    game.load.image("layer3", "assets/layer_3.png");
    game.load.image("layer2", "assets/layer_2.png");
    game.load.image("layer1", "assets/layer_1.png");
  }

  /**
   * Creates and positions the three tileSprites.
   * Position is dependent on the height of the image the tilesprite uses
   * The size of the tilesprite is dependent on the site of the image the tilesprite uses
   *
   * 'activates' the right cursor key
   */
  function create() {
    layer3 = game.add.tileSprite(
      0,
      game.height - game.cache.getImage("layer3").height,
      game.width,
      game.cache.getImage("layer3").height,
      "layer3"
    );

    layer2 = game.add.tileSprite(
      0,
      game.height - game.cache.getImage("layer2").height,
      game.width,
      game.cache.getImage("layer2").height,
      "layer2"
    );

    layer1 = game.add.tileSprite(
      0,
      game.height - game.cache.getImage("layer1").height,
      game.width,
      game.cache.getImage("layer1").height,
      "layer1"
    );

    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
  }

  /**
   * updates the x component of the tilePosition for each tileSprite
   *
   * Updates only happen if the speed is positive (when right cursor key is pressed)
   */
  function update() {
    if (rightKey.isDown) {
      speed = maxSpeed;
    } else {
      speed = 0;
    }

    // calculate how much time has passed
    // (game.time.elapsed is unreliable as it _may_ include time passed in paused state)
    var timePassed = game.time.elapsedMS / 1000;
    
    // each layer has a different fraction to multiply the speed by.
    layer1.tilePosition.x -= 1 * speed * timePassed;
    layer2.tilePosition.x -= 0.5 * speed * timePassed;
    layer3.tilePosition.x -= 0.1 * speed * timePassed;
  }

  /**
   * Show the speed on screen
   */
  function render() {
    if (speed > 0) {
      game.debug.text("Speed: " + speed, 10, 20);
    } else {
      game.debug.text("press right cursor key", 10, 20);
    }
  }
};
