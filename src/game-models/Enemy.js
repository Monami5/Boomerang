// Враг.

class Enemy {
  constructor(road) {
    this.skins = this.generateSkin();
    this.position = road - 1;
  }

  generateSkin() {
    const skins = ['🐺', '🦊', '🐻', '🐂', '🐗', '🦄', '🦌', '🐎', '🐖', '🦇'];
    this.skin = skins[Math.floor(Math.random() * skins.length)];
  }

  moveLeft() {
    // Идём влево.
    this.position -= 1;
  }

  die() {
    this.skins = '💀';
    this.position = '?';
    console.log('Enemy is dead!');
  }
}

module.exports = Enemy;
