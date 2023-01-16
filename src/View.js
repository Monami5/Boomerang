// Сделаем отдельный класс для отображения игры в консоли.

class View {
  render(track, enemies, time) {
    const yourTeamName = 'Elbrus';

    // Тут всё рисуем.
    console.clear();
    console.log(track.join(' '));
    console.log('\n\n');
    console.log(`Created by "${yourTeamName}" with love`);
    console.log('You killed: ', enemies);
    console.log('Your time: ', time.toFixed(1));
  }
}

module.exports = View;
