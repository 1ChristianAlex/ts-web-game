import createCanvas from './canvas';
import GameGod from './game/GameGod';
import MusicPlayer from './game/MusicPlayer';

const main = async () => {
  const context = createCanvas();
  const game = new GameGod(context);

  requestAnimationFrame(game.loop.bind(game));
};

main();
