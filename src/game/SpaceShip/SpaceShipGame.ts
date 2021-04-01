import { IGame } from '../../classes/IGame';
import Game from '../GameGod';
import imageSpaceShipPath from '../../asset/spaceships/red.png';
import { KEYBOARD_CODE } from '../../constants';
import BlasterShoot from './BlasterShoot';
import SpaceShipLife from './SpaceShipLife';

class SpaceShip implements IGame {
  public imageSpaceShip: HTMLImageElement;
  public spaceShipWidth = this.gameGod.GAME_WIDTH * 0.1;
  public spaceShipHeigh = this.gameGod.GAME_HEIGHT * 0.25;

  public positionX = this.gameGod.GAME_WIDTH / 2 - this.spaceShipWidth / 2;
  public positionY = this.gameGod.GAME_HEIGHT * 0.97 - this.spaceShipHeigh;

  private spaceShipLife = new SpaceShipLife(this.gameGod);

  private readonly moveFactor = 0.01;

  constructor(protected gameGod: Game) {
    this.initializeCommands();
    this.imageSpaceShip = new Image();
    this.imageSpaceShip.src = imageSpaceShipPath;
  }

  private async initializeCommands() {
    document.addEventListener('keydown', async (event) => {
      this.move(event.key);
      this.shootBlaster(event.key);
    });
  }

  private move(key: string) {
    switch (key) {
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
  }

  shootBlaster(key: string) {
    if (key === KEYBOARD_CODE.SPACE) {
      this.gameGod.gameObjects.addTail(
        `${BlasterShoot.objectName}-${Date.now()}`,
        new BlasterShoot(
          this.gameGod,
          this.positionX + this.spaceShipWidth / 2,
          this.positionY - this.spaceShipHeigh * 0.01
        )
      );
    }
  }

  draw(context: CanvasRenderingContext2D): void {
    context.drawImage(
      this.imageSpaceShip,
      this.positionX,
      this.positionY,
      this.spaceShipWidth,
      this.spaceShipHeigh
    );

    this.spaceShipLife.draw(context);
  }

  update(): void {
    if (this.spaceShipLife.spaceShipLife < 0) {
      this.spaceShipLife.spaceShipLife = 0;
    }

    if (this.spaceShipLife.spaceShipLife > 100) {
      this.spaceShipLife.spaceShipLife = 99;
    }
  }
}

export default SpaceShip;
