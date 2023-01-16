const Hero = require("./game-models/Hero");
const Enemy = require("./game-models/Enemy");
const Boomerang = require("./game-models/Boomerang");
const View = require("./View");
const runInteractiveConsole = require("./keyboard");
const { UserScore } = require("../db/models");

class Game {
  constructor({ trackLength, name }) {
    this.trackLength = trackLength;
    this.hero = new Hero({ position: 0, boomerang: new Boomerang() });
    this.enemy = new Enemy(this.trackLength);
    this.track = [];
    this.view = new View();
    this.regenerateTrack();
    this.count = 0;
    this.timer = 0;
    this.name = name;
  }

  regenerateTrack() {
    this.track = new Array(this.trackLength).fill(" ");
    this.track[this.enemy.position] = this.enemy.moveLeft();
    this.track[this.hero.boomerang.position] = this.hero.boomerang.skin;
    this.track[this.hero.position] = this.hero.skin;
    this.track[this.enemy.position] = this.enemy.skin;
  }

  async givi() {
    try {
      const user = await UserScore.create({
        user_name: this.name,
        score: this.count,
      });
      console.clear();
    } catch (error) {
      console.log(error);
    }
  }

  async addResult() {
    try {
      const result = await UserScore.findAll();
      const filter = result.filter((el) => el.user_name === this.name);
      if (filter.length > 0) {
        const scores = await UserScore.findOne({
          where: {
            user_name: this.name,
          },
        });
        scores.score = this.count;
        await scores.save();
        console.clear();
        console.log("Nickname: ", scores.user_name);
        console.log("scores: ", scores.score);
      } else {
        await this.givi();
        const finalResult = await UserScore.findOne({
          where: {
            user_name: this.name,
          },
        });
        console.clear();
        console.log("Nickname: ", finalResult.user_name);
        console.log("scores: ", finalResult.score);
        console.log("try again!");
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
      this.hero.boomerang.direction = "right";
    }
    if (this.hero.position === this.enemy.position) {
      this.hero.dieHero();
      console.clear();
      await this.addResult();
      process.exit();
    }
    if (this.hero.boomerang.position >= this.enemy.position) {
      this.enemy.dieEnemy();
      this.count += 1;
      this.hero.boomerang.direction = "left";
      this.enemy = new Enemy(this.trackLength);
    }
    if (this.hero.boomerang.position === this.trackLength - 1) {
      this.hero.boomerang.direction = "left";
    }
    if (this.count >= 5) {
      this.hero.boomerang.skin = "🥜";
      this.hero.skin = "🦉";
    }
    if (this.count >= 10) {
      this.hero.skin = "🐝";
      this.hero.boomerang.skin = "🕸";
    }
  }

  play() {
    runInteractiveConsole(this.hero);
    setInterval(() => {
      // Let's play!
      // this.hero.boomerang.fly();
      this.timer += 0.1;
      this.check();
      this.regenerateTrack();
      this.view.render(this.track, this.count, this.timer);
    }, 100);
  }
}

module.exports = Game;

