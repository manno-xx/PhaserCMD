window.onload = function() {
  
    var game = new Phaser.Game(800, 600, Phaser.AUTO, "", {
    preload: preload,
    create: create,
    update: update,
    render: render,
  });

  var bgMusic;
  var explosion, sword, blaster;

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
   * - add audio files (3fx, 1 background music)
   * - instantiate keyboard input for
   *   - volume changes
   *   - 'sound board' functionality
   * - have some (fairly useless) functionality to show the audio level in the console after it is being set
   */
  function create() {

    game.add.text(100, 100, "press 1, 2, 3 or W", {color: "0xFFFFFF"});

    explosion = game.add.audio("explosion");
    sword = game.add.audio("sword");
    blaster = game.add.audio("blaster");

    bg = game.add.audio("bg", 1, true);
    bg.play();

    var louder = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    louder.onDown.add(increaseVolume, this);
    var softer = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    softer.onDown.add(decreaseVolume, this);

    var one = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    one.onDown.add(playExplosion, this);

    var two = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
    two.onDown.add(playSword, this);

    var three = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
    three.onDown.add(playBlaster, this);

    game.sound.onVolumeChange.add(volumeChanged, this);
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
};
