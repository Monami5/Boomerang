// Основной файл.
// Запускает игру.
const Game = require('./src/Game');
const rl = require('readline');

const r = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
});

r.question('Enter ur nickname:', function (answer) {
  const game = new Game({
    trackLength: 30,
    name: answer,
  });
  console.log(answer);
  console.log('Thank you for your valuable feedback.');
  game.play();
});

// Инициализация игры с настройками.
// const game = new Game({
//   trackLength: 30,
// });

// // Запуск игры.
// game.play();
