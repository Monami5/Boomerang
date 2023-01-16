class Boomerang {
  constructor() {
    this.skin = '🌀';
    this.position = undefined;
    this.direction = 'right';
  }

  fly() {
    if ((this.pathOfTheMush = 'goright')) {
      this.moveRight();
    } else {
      this.moveLeft();
    }
    // this.moveRight();
    // this.moveLeft();
  }

  moveLeft() {
    // Идём влево.
    this.position -= 1;
  }

  moveRight() {
    // Идём вправо.
    this.position += 1;
  }
}

module.exports = Boomerang;
