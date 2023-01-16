// Наш герой.
const Boomerang = require('./Boomerang');

class Hero {
  constructor({ position, boomerang }) {
    this.skin = '🦔';
    this.position = position;
    this.boomerang = boomerang;
  }

  moveLeft() {
    this.position -= 1;
  }

  moveRight() {
    this.position += 1;
  }

  attack() {
    if (!this.boomerang.position) {
      this.boomerang.position = this.position + 1;
    }
  }

  dieHero() {
    this.skin = '💀';
    console.log('YOU ARE DEAD!💀');
    // process.exit();
  }
}

module.exports = Hero;
