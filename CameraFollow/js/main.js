/**
 * Very basic demo of moving across a larger tile map. Tile map is based on:
 * - a tile set (png file with tiles)
 * - a tile map (JSON created using Tiled (https://www.mapeditor.org))
 * 
 * The tile set was created using TexturePacker (https://www.codeandweb.com/texturepacker)
 *
 * The tile map consists of multiple layers (could be used for sorting or collision stuff)
 * 
 * As the character moves across the screen (using cursor keys), the virtual camera follows along
 */

 /**
  * When the page is loaded, get things goind
  */
window.onload = function() {
  var game = new Phaser.Game(1024, 512, Phaser.AUTO, "", {
    preload: preload,
    create: create,
    update: update,
    render: render
  });

  // the sprite of the phaser dude
  var dude;
  var cursors;

  /**
   * load the assets needed to display the map
   */
  function preload() {
    game.load.image("tileset", "assets/kenneyrpgpack/Spritesheet/RPGpack_sheet.png");
    game.load.image("dude", "assets/phaser-dude.png");
    
    // https://photonstorm.github.io/phaser-ce/Phaser.Loader.html#tilemap
    game.load.tilemap(
      "map",
      "assets/Map.json",
      null,
      Phaser.Tilemap.TILED_JSON
    );
  }

  /**
   * - create the map
   * - set the world size (needed for camera movement)
   * - add something to move so the camera can follow it
   */
  function create() {
    // parameters are: key, tilewidth, tileHeight, mapWidth, mapHeight
    // https://photonstorm.github.io/phaser-ce/Phaser.GameObjectFactory.html#tilemap
    var map = game.add.tilemap("map", 64, 64, 32, 32);

    // 1st parameter is the name of the tileset as used in Tiled
    // 2nd parameter id the key of that tileset as loaded in the preload() function
    map.addTilesetImage("RPGpack_sheet", "tileset");

    // creating the layer can be done by index or by name 
    // (here the names of the layers are used as defined in Tiled)
    // https://photonstorm.github.io/phaser-ce/Phaser.Tilemap.html#createLayer
    var ground = map.createLayer("Ground");
    var shrub = map.createLayer("shrubbery");
    var layer = map.createLayer("Trees");

    // Let Phaser know the size of the world so the camera can move within it
    ground.resizeWorld();
    
    // place a controllable sprite in the game
    dude = game.add.sprite(100, 100, "dude");

    // 'activate' the cursor keys
    cursors = game.input.keyboard.createCursorKeys();

    // set the camera to follow mode
    // it follows the phaser dude sprite
    // using a setting with a dead zone (moving within the central part of the view does not move the camera)
    game.camera.follow(dude, Phaser.Camera.FOLLOW_TOPDOWN);
  }

  /**
   * Move the Phaser dude using the cursor keys.
   * The camera moves along with it according to the follow setting
   * 
   */
  function update(){
    if(cursors.right.isDown){
        dude.x++;
    }
    if(cursors.left.isDown){
        dude.x--;
    }
    if(cursors.down.isDown){
        dude.y++;
    }
    if(cursors.up.isDown){
        dude.y--;
    }
  }

  /**
   * Show the debug info of the camera
   */
  function render(){
    game.debug.cameraInfo(game.camera, 32, 32);
  }
};
