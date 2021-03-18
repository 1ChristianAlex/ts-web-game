import { GAME_HEIGHT, GAME_WIDTH } from './constants';

const createCanvas = () => {
  const canvas = document.createElement('canvas');
  const style = document.createElement('style');

  style.innerHTML = `body {
    margin: 0;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
  }`;

  canvas.width = GAME_WIDTH;
  canvas.height = GAME_HEIGHT;

  document.body.appendChild(style);
  document.body.appendChild(canvas);

  const context = canvas.getContext('2d');

  return context;
};

export default createCanvas;
