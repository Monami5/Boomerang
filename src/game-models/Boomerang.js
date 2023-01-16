class Boomerang {
  constructor() {
    this.skin = '🌀';
    this.position = undefined;
    this.direction = 'right';
  }

  fly() {
    if (this.direction === 'right') {
      this.moveRight();
    } else {
      this.moveLeft();
    }
  }

  moveLeft() {
    this.position -= 1;
  }

  moveRight() {
    this.position += 1;
  }
}

module.exports = Boomerang;
