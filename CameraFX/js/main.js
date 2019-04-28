/**
 * Demo of three camera efects:
 * - Fade in when game loads
 * - either flash or shake when tank fires
 *
 * On the side also loosely demonstrates the weapon object in Phaser
 * 
 * Oh, and the emitter to mimic explosions
 */

window.onload = function() {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, "", {
    preload: preload,
    create: create,
    update: update,
    render: render,
  });

  var fireButton;
  var weapon;
  var emitter;

  function preload() {
    game.load.image("rocket", "assets/tank_bullet3.png");
    game.load.image("tank", "assets/tanks_tankDesert5.png");
    game.load.image("explosion", "assets/tank_explosion5.png");
  }

  /**
   * Creates Tank sprite
   * 
   * Creates weapon of tank
   * 
   * Creates emitter for explosions of bullets of tank
   */
  function create() {
    var tank = game.add.sprite(200, 200, "tank");

    // https://photonstorm.github.io/phaser-ce/Phaser.Weapon.html#toc-1
    weapon = game.add.weapon(10, "rocket");
    weapon.trackSprite(tank, 90, 10, true);
    weapon.fireRate = 1000;
    weapon.bulletSpeed = 500;
    weapon.onFire.add(fireEffect);
    weapon.onKill.add(explodeEffect);

    fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

    // https://photonstorm.github.io/phaser-ce/Phaser.Particles.Arcade.Emitter.html#toc-1
    emitter = game.add.emitter(0, 0, 10);
    emitter.setAlpha(1, 0, 1000, Phaser.Easing.Circular.Out);
    emitter.makeParticles('explosion');

    // actually not a flash but a fade in
    // flash fills the screen and then reveals it in the set amount of milliseconds (here 2000)
    game.camera.flash(0x000000, 2000, true, 1);
  }

  /**
   * If player is pressing FIRE button, call weapon's fire() function.
   * Weapon itself does the cooldown check
   */
  function update() {
    if (fireButton.isDown) {
      weapon.fire();
    }
  }

  /**
   * When the weapon fires, the camera's flash effect is run
   */
  function fireEffect() {
    // https://photonstorm.github.io/phaser-ce/Phaser.Camera.html#flash
    game.camera.flash(0xffffff, 200, true, 1);
  }

  /**
   * When the weapon fires, the camera's shake effect is run.
   * 
   * @param {sprite} bullet The sprite of the bullet that just was 'killed' 
   */
  function explodeEffect(bullet) {
    
    // https://photonstorm.github.io/phaser-ce/Phaser.Camera.html#shake
    game.camera.shake(0.05, 200, true, Phaser.Camera.SHAKE_HORIZONTAL, true);

    emitter.emitX = bullet.position.x; 
    emitter.emitY = bullet.position.y;
    emitter.start(true, 1000, null, 10);
  }

  function render() {}
};
