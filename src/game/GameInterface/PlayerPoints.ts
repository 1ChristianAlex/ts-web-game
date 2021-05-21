import { IGame } from '../../classes/IGame';
import Game from '../GameGod';

class PlayerPoints implements IGame {
  public positionY = this.gameGod.GAME_HEIGHT * 0.97;
  public positionX = this.gameGod.GAME_WIDTH * 0.89;
  public pointCounter = 0;

  constructor(private gameGod: Game) {}

  draw(context?: CanvasRenderingContext2D): void {
    context.beginPath();

    context.fillStyle = 'green';
    context.font = '30px Comic Sans MS';
    context.fillText(
      `Points: ${this.pointCounter}`,
      this.positionX,
      this.positionY - 10
    );
  }

  update(deltaTime: number): void {}

  public addPoints(extraPoint: number = 0) {
    this.pointCounter++;

    if (extraPoint) {
      this.pointCounter = extraPoint + this.pointCounter;
    }
  }
}

export default PlayerPoints;
