/**
 * Very basic demo of creating a map based on:
 * - a tile set (png file with tiles)
 * - a tile map (JSON created using Tiled (https://www.mapeditor.org))
 * 
 * The tile set was created using TexturePacker (https://www.codeandweb.com/texturepacker)
 *
 * No fancy features used of either application or Phaser itself
 */

 /**
  * When the page is loaded, get things goind
  */
window.onload = function() {
  var game = new Phaser.Game(1024, 512, Phaser.AUTO, "", {
    preload: preload,
    create: create
  });

  /**
   * load the assets needed to display the map
   */
  function preload() {
    game.load.image("tileset", "assets/tileset.png");

    // https://photonstorm.github.io/phaser-ce/Phaser.Loader.html#tilemap
    game.load.tilemap(
      "map",
      "assets/examplemap.json",
      null,
      Phaser.Tilemap.TILED_JSON
    );
  }

  /**
   * - create the map, 
   * - assign the image to use for building the map
   * - and have the map build the layer contained within
   */
  function create() {
    // parameters are: key, tilewidth, tileHeight, mapWidth, mapHeight
    // https://photonstorm.github.io/phaser-ce/Phaser.GameObjectFactory.html#tilemap
    var map = game.add.tilemap("map", 64, 64, 16, 8);
    map.addTilesetImage("tileset");

    // creating the layer can be done by index or by name
    // the var should not be local if you want to use it for collision checks or other stuff in update()
    // https://photonstorm.github.io/phaser-ce/Phaser.Tilemap.html#createLayer
    var layer = map.createLayer(0);
  }
};
