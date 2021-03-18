import { IGame } from '../../classes/IGame';
import Game from '../GameGod';
import imageStarPath from '../../asset/stars.png';

class StarSpace implements IGame {
  public imageStart: HTMLImageElement;
  public startSize = this.gameGod.GAME_HEIGHT * 0.05;

  constructor(protected gameGod: Game) {
    this.imageStart = new Image();
    this.imageStart.src = imageStarPath;
  }

  getRandomY() {
    return Math.random() * this.gameGod.GAME_HEIGHT - this.startSize;
  }

  getRandomX() {
    return Math.random() * this.gameGod.GAME_WIDTH - this.startSize;
  }

  draw(context: CanvasRenderingContext2D): void {
    context.drawImage(
      this.imageStart,
      this.getRandomX(),
      this.getRandomY(),
      this.startSize,
      this.startSize
    );
  }

  update(): void {}
}

export default StarSpace;
