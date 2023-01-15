// Наш герой.
const player = require('play-sound')((opts = {}));

const Enemy = require("./Enemy");

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
    // this.boomerang.fly();
  }

    player.play('src/sounds/game-over.wav');
    this.skin = '👼';
    console.log('RIP 👼 :(');

    process.exit();
  }
}

module.exports = Hero;
