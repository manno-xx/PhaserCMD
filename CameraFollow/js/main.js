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
  var avatar;
  var cursors;

  /**
   * load the assets needed to display the map
   */
  function preload() {
    game.load.image("tileset", "assets/kenneyrpgpack/Spritesheet/RPGpack_sheet.png");
    game.load.spritesheet("male", "assets/BODY_male.png", 64, 64);
    
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
    avatar = game.add.sprite(200, 200, "male", 0);
    avatar.animations.add("up", [1, 2, 3, 4, 5, 6, 7, 8], 14, true);
    avatar.animations.add("left", [10, 11, 12, 13, 14, 15, 16, 17], 14, true);
    avatar.animations.add("down", [19, 20, 21, 22, 23, 24, 25, 26], 14, true);
    avatar.animations.add("right", [28, 29, 30, 31, 32, 33, 34, 35], 14, true);
    avatar.animations.add("idle", [18], 14, false);
    avatar.play("right");

    // 'activate' the cursor keys
    cursors = game.input.keyboard.createCursorKeys();

    // set the camera to follow mode
    // it follows the phaser dude sprite
    // using a setting with a dead zone (moving within the central part of the view does not move the camera)
    game.camera.follow(avatar, Phaser.Camera.FOLLOW_TOPDOWN);
  }

  /**
   * Move the Phaser dude using the cursor keys.
   * The camera moves along with it according to the follow setting applied in the create function
   * 
   */
  function update(){
    var direction = new Phaser.Point(0, 0);

    if(cursors.right.isDown){
        direction.x++;
    }
    if(cursors.left.isDown){
        direction.x--;
    }
    if(cursors.down.isDown){
        direction.y++;
    }
    if(cursors.up.isDown){
        direction.y--;
    }

    if(direction.getMagnitude() === 0){
        avatar.play("idle");
    }
    else if(direction.x < 0){
        avatar.play("left");
    }
    else if(direction.x > 0){
        avatar.play("right");
    }
    else if(direction.y < 0){
        avatar.play("up");
    }
    else if(direction.y > 0){
        avatar.play("down");
    }

    avatar.x += direction.x;
    avatar.y += direction.y;

  }

  /**
   * Show the debug info of the camera
   */
  function render(){
    game.debug.cameraInfo(game.camera, 32, 32);
  }
};
