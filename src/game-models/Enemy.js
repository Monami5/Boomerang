// Враг.

class Enemy {
  constructor(trackLength) {
    this.skins = this.generateSkin();
    this.position = trackLength - 1;
  }

  generateSkin() {
    const skins = ['🐺', '🦊', '🐻', '🐂', '🐗', '🦄', '🦌', '🐎', '🐖', '🦇'];
    this.skin = skins[Math.floor(Math.random() * skins.length)];
  }

  moveLeft() {
    // Идём влево.
    this.position -= 1;
  }

  dieEnemy() {
    this.position = '?';
    console.log('Enemy is dead!');
    this.skins = '💀';
  }
}

module.exports = Enemy;
