// ΠΡΠ°Π³.

class Enemy {
  constructor(trackLength) {
    this.skins = this.generateSkin();
    this.position = trackLength - 1;
  }

  generateSkin() {
    const skins = ['πΊ', 'π¦', 'π»', 'π', 'π', 'π¦', 'π¦', 'π', 'π', 'π¦'];
    this.skin = skins[Math.floor(Math.random() * skins.length)];
  }

  moveLeft() {
    // ΠΠ΄ΡΠΌ Π²Π»Π΅Π²ΠΎ.
    this.position -= 1;
  }

  dieEnemy() {
    this.position = '?';
    console.log('Enemy is dead!');
    this.skins = 'π';
  }
}

module.exports = Enemy;
