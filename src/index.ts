import createCanvas from './canvas';
import GameGod from './game/GameGod';

const main = async () => {
  const context = createCanvas();
  const game = new GameGod(context);
  console.log(game.gameObjects);

  requestAnimationFrame(game.loop.bind(game));
};

main();
