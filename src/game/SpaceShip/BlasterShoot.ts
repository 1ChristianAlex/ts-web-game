import { IGame } from '../../classes/IGame';
import Game from '../GameGod';

class BlasterShoot implements IGame {
  constructor(
    protected gameGod: Game,
    public spaceShipX: number,
    public spaceShipY: number
  ) {}

  static objectName = 'blaster';

  public readonly shotWidth = this.gameGod.GAME_WIDTH * 0.01;

  public positionX = this.spaceShipX;
  public positionY = this.spaceShipY - this.shotWidth;

  draw(context: CanvasRenderingContext2D): void {
    context.beginPath();
    context.arc(
      this.positionX,
      this.positionY,
      this.shotWidth,
      0,
      Math.PI * 2,
      false
    );
    context.fillStyle = 'red';
    context.fill();
    context.strokeStyle = 'blue';
    context.stroke();
  }

  update(): void {
    this.positionY = this.positionY - 10;
  }
}

export default BlasterShoot;
