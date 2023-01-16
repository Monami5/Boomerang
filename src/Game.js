// Импортируем всё необходимое.
// Или можно не импортировать,
// а передавать все нужные объекты прямо из run.js при инициализации new Game().

const Hero = require("./game-models/Hero");
const Enemy = require("./game-models/Enemy");
const { User} = require(../db/models);
const Boomerang = require('./game-models/Boomerang');
const View = require("./View");
const Keyboard = require("./keyboard");



// Основной класс игры.
// Тут будут все настройки, проверки, запуск.

class Game {
  constructor({ trackLength, name }) {
    this.trackLength = trackLength;
    this.hero = new Hero({ position: 0, boomerang: new Boomerang() }); // Герою можно аргументом передать бумеранг.
    this.enemy = new Enemy(this.trackLength);
    this.view = new View();
    this.name = name;
    this.track = [];
    this.regenerateTrack();
  }

  regenerateTrack() {
    // Сборка всего необходимого (герой, враг(и), оружие)
    // в единую структуру данных
    this.track = new Array(this.trackLength).fill(" ");
    this.track[this.hero.boomerang.position] = this.hero.skin;
    this.track[this.enemy.position] = this.enemy.moveLeft();
    this.track[this.hero.boomerang.position] = this.hero.boomerang.skin;
    this.
    track[this.enemy.position] = this.enemy.skin;
  }

  async begin() {
    try {
      const user = await User.create({ nick: this.name, scores: this.enemies });
      console.clear();
    } catch (error) {
      console.log(error);
    }
  }

  async gameResult() {
    try {
      const result = await User.findAll();
      const filter = result.filter((el) => el.nick === this.name);
      if (filter.length > 0) {
        const scores = await User.findOne({
          where: {
            nick: this.name,
          },
        });
        scores.enemies = this.count;
        await scores.save();
        console.clear();
        console.log('Nick: ', scores.nick);
        console.log('scores: ', scores.enemies);
      } else {
        await this.begin();
        const final = await User.findOne({
          where: {
            nick: this.name,
          },
        });
        console.clear();
        console.log('Nick: ', final.nick);
        console.log('scores: ', final.scores);
        console.log('try again!');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async check() {
    if (this.hero.position !== this.hero.boomerang.position) {
      this.hero.boomerang.fly();
    }
    if (this.hero.boomerang.position <= this.hero.position) {
      this.hero.boomerang.position = undefined;
      this.hero.boomerang.pathOfTheMush = 'goright';
    }

    if (this.hero.position === this.enemy.position) {
      this.hero.die();
      console.clear();
      await this.gameResult();
      process.exit();
    }

    if (this.hero.boomerang.position >= this.enemy.position) {
      this.enemy.dieEnemy();
      this.count += 1;
      this.hero.boomerang.pathOfTheMush = 'goleft';
      this.enemy = new Enemy(this.trackLength);
    }
    if (this.hero.boomerang.position === this.trackLength - 1) {
      this.hero.boomerang.pathOfTheMush = 'goleft';
    }
    // if (this.count >= 5) {
    //   this.hero.boomerang.skin = '🌪';
    //   this.hero.skin = '🕺';
    // }
    // if (this.count >= 10) {
    //   this.hero.skin = '💃';
    //   this.hero.boomerang.skin = '💋';
    // }
  }


  play() {
    Keyboard(this.hero);
    setInterval(() => {
      // Let's play!
      this.check();
      this.regenerateTrack();
      this.view.render(this.track, this.enemies, this.time);
    }, 100);
  }
}

module.exports = Game;
