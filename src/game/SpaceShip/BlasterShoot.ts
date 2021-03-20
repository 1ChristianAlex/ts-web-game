import { IGame } from '../../classes/IGame';
import Game from '../GameGod';

class BlasterShoot implements IGame {
  constructor(protected gameGod: Game) {}

  draw(context: CanvasRenderingContext2D): void {
    context.fillStyle = 'red';
    context.fillRect(500, 500, 500, 500);
  }

  update(): void {}
}

export default BlasterShoot;
