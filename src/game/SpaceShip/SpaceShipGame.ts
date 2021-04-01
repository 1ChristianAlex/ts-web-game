import { IGame } from '../../classes/IGame';
import Game from '../GameGod';
import imageSpaceShipPath from '../../asset/spaceships/red.png';
import { KEYBOARD_CODE } from '../../constants';
import BlasterShoot from './BlasterShoot';
import SpaceShipLife from './SpaceShipLife';
import CommonEnemies from '../Enemies/CommonEnemies';

class SpaceShip implements IGame {
  private imageSpaceShip: HTMLImageElement;
  public spaceShipWidth = this.gameGod.GAME_WIDTH * 0.1;
  public spaceShipHeigh = this.gameGod.GAME_HEIGHT * 0.25;

  public positionX = this.gameGod.GAME_WIDTH / 2 - this.spaceShipWidth / 2;
  public positionY = this.gameGod.GAME_HEIGHT * 0.97 - this.spaceShipHeigh;

  private spaceShipLife = new SpaceShipLife(this.gameGod);

  private readonly moveFactorX = 0.01;
  private readonly moveFactorY = 0.02;

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
          this.positionX - this.gameGod.GAME_WIDTH * this.moveFactorX;

        if (this.positionX < 0) {
          this.positionX = 0;
        }
        break;
      case KEYBOARD_CODE.ARROW_RIGHT:
        this.positionX =
          this.positionX + this.gameGod.GAME_WIDTH * this.moveFactorX;

        if (this.positionX > this.gameGod.GAME_WIDTH - this.spaceShipWidth) {
          this.positionX = this.gameGod.GAME_WIDTH - this.spaceShipWidth;
        }
        break;
      case KEYBOARD_CODE.ARROW_UP:
        this.positionY =
          this.positionY - this.gameGod.GAME_HEIGHT * this.moveFactorY;

        if (this.positionY < 0) {
          this.positionY = 0;
        }

        break;
      case KEYBOARD_CODE.ARROW_DOWN:
        this.positionY =
          this.positionY + this.gameGod.GAME_HEIGHT * this.moveFactorY;

        if (this.positionY > this.gameGod.GAME_HEIGHT - this.spaceShipHeigh) {
          this.positionY = this.gameGod.GAME_HEIGHT - this.spaceShipHeigh;
        }
        break;
    }
  }

  shootBlaster(key: string) {
    if (key === KEYBOARD_CODE.SPACE) {
      this.gameGod.gameObjects.addTail(
        `${BlasterShoot.name}-${Date.now()}`,
        new BlasterShoot(
          this.gameGod,
          this.positionX + this.spaceShipWidth / 2,
          this.positionY - this.spaceShipHeigh * 0.01,
          `${BlasterShoot.name}-${Date.now()}`
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

    const shotsBlaster = this.gameGod.gameObjects.getAllOfType<CommonEnemies>(
      CommonEnemies
    );

    const hitEnemie = shotsBlaster.find((enemies) => {
      const hitX =
        Math.round(enemies.positionX) >= Math.round(this.positionX) &&
        Math.round(enemies.positionX) <=
          Math.round(this.positionX + this.spaceShipWidth);

      const hitY =
        Math.round(enemies.positionY) >= Math.round(this.positionY) &&
        Math.round(enemies.positionY) <=
          Math.round(this.positionY + this.spaceShipHeigh);

      return hitX && hitY;
    });

    if (hitEnemie) {
      this.spaceShipLife.spaceShipLife =
        this.spaceShipLife.spaceShipLife + hitEnemie.enemieDamage;

      hitEnemie.enemieLife = 0;
      hitEnemie.enemieDamage = 0;
    }
  }
}

export default SpaceShip;
