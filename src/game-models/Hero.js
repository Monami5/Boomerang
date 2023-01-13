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
    this.position += 1;
  }

  attack() {
    // Атакуем.
    this.boomerang.fly();
  }

  die() {
    this.skin = '💀';
    console.log('YOU ARE DEAD!💀');
    process.exit();
  }
}

module.exports = Hero;
