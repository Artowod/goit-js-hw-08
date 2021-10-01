/* 
Ознакомься с документацией библиотеки Vimeo плеера.
Добавь библиотеку как зависимость проекта через npm.
Инициализируй плеер в файле скрипта как это описано в секции pre-existing player, 
но учти что у тебя плеер добавлен как npm пакет, а не через CDN.
Разбери документацию метода on() и начни отслеживать событие timeupdate - 
обновление времени воспроизведения.
Сохраняй время воспроизведения в локальное хранилище. Пусть ключом для хранилища 
будет строка "videoplayer-current-time".
При перезагрузке страницы воспользуйся методом setCurrentTime() для того чтобы 
возобновить воспроизведение с сохраненной позиции.
Добавь в проект бибилотеку lodash.throttle и сделай так, чтобы время 
воспроизведения обновлялось в хранилище не чаще чем раз в секунду. */

import Player from '@vimeo/player';
import _ from 'lodash';

const iframe = document.querySelector('iframe');
const player = new Player('vimeo-player', iframe);

const currentTime =
  localStorage.getItem('videoplayer-current-time') === 'null'
    ? 0
    : localStorage.getItem('videoplayer-current-time');

player.setCurrentTime(currentTime).then(seconds => {
  console.log(seconds, 'sec');
});

player.on(
  'timeupdate',
  _.throttle(() => {
    player.getCurrentTime().then(function (seconds) {
      localStorage.setItem('videoplayer-current-time', seconds);
    });
  }, 1000),
);
