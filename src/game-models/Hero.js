// Наш герой.
const player = require('play-sound')((opts = {}));

class Hero {
  constructor({ position = 0 }) {
    this.skin = '🦔'; // можете использовать любые emoji '💃'
    this.position = position;
  }

  moveLeft() {
    // Идём влево.
    if (this.position > 0) this.position -= 1;
  }

  moveRight() {
    // Идём вправо.
    if (this.position < 30) this.position += 1;
  }

  attack() {
    // Атакуем.
    if (!this.boomerang.position) {
      this.boomerang.position = this.position + 1;
    }
    player.play('src/sounds/game-over.wav');
    this.skin = '👼';
    console.log('RIP 👼 :(');

    process.exit();
    // this.boomerang.fly();
  }
}

module.exports = Hero;
