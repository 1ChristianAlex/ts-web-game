import { IGame } from '../../classes/IGame';
import Game from '../GameGod';
import imageSpaceShipPath from '../../asset/spaceships/red.png';
import { KEYBOARD_CODE } from '../../constants';

class SpaceShip implements IGame {
  public imageSpaceShip: HTMLImageElement;
  public spaceShipHeigh = this.gameGod.GAME_WIDTH * 0.1;
  public spaceShipWidth = this.gameGod.GAME_HEIGHT * 0.2;

  public positionX = this.gameGod.GAME_WIDTH / 2 - this.spaceShipWidth / 2;
  public positionY = this.gameGod.GAME_HEIGHT * 0.97 - this.spaceShipHeigh;

  private readonly moveFactor = 0.03;

  constructor(protected gameGod: Game) {
    this.move();
    this.imageSpaceShip = new Image();
    this.imageSpaceShip.src = imageSpaceShipPath;
  }

  private move() {
    document.addEventListener('keydown', (event) => {
      switch (event.key) {
        case KEYBOARD_CODE.ARROW_LEFT:
          this.positionX =
            this.positionX - this.gameGod.GAME_WIDTH * this.moveFactor;

          if (this.positionX < 0) {
            this.positionX = 0;
          }
          break;
        case KEYBOARD_CODE.ARROW_RIGHT:
          this.positionX =
            this.positionX + this.gameGod.GAME_WIDTH * this.moveFactor;
          console.log(this.positionX, this.gameGod.GAME_WIDTH);

          if (this.positionX > this.gameGod.GAME_WIDTH - this.spaceShipWidth) {
            this.positionX = this.gameGod.GAME_WIDTH - this.spaceShipWidth;
          }
          break;
        case KEYBOARD_CODE.ARROW_UP:
          this.positionY =
            this.positionY - this.gameGod.GAME_HEIGHT * this.moveFactor;

          if (this.positionY < 0) {
            this.positionY = 0;
          }
          break;
        case KEYBOARD_CODE.ARROW_DOWN:
          this.positionY =
            this.positionY + this.gameGod.GAME_HEIGHT * this.moveFactor;

          if (this.positionY > this.gameGod.GAME_HEIGHT - this.spaceShipHeigh) {
            this.positionY = this.gameGod.GAME_HEIGHT - this.spaceShipHeigh;
          }
          break;
      }
    });
  }

  draw(context: CanvasRenderingContext2D): void {
    context.drawImage(
      this.imageSpaceShip,
      this.positionX,
      this.positionY,
      this.spaceShipWidth,
      this.spaceShipHeigh
    );
  }

  update(): void {}
}

export default SpaceShip;
