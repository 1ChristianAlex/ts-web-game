import { IGame } from '../../classes/IGame';
import Game from '../GameGod';
import cthulhinho from '../../asset/cthulhinho.png';
import SpaceShip from '../SpaceShip/SpaceShipGame';
import BlasterShoot from '../SpaceShip/BlasterShoot';

class CommonEnemies implements IGame {
  private imageCommonEnemie: HTMLImageElement;

  constructor(protected gameGod: Game, public enemyId: number) {
    this.imageCommonEnemie = new Image();
    this.imageCommonEnemie.src = cthulhinho;

    this.positionY = this.getRandomY();
    this.positionX = this.getRandomX();
  }

  public commonEnemieWidth = this.gameGod.GAME_WIDTH * 0.05;
  public commonEnemieHeigh = this.gameGod.GAME_HEIGHT * 0.13;

  public positionX = 0;
  public positionY = 0;

  public enemieLife = 100;

  public enemieDamage = 45;

  getRandomY() {
    return (
      Math.random() * (this.gameGod.GAME_HEIGHT / 2 - this.commonEnemieHeigh)
    );
  }

  getRandomX() {
    return Math.random() * (this.gameGod.GAME_WIDTH - this.commonEnemieWidth);
  }

  draw(context: CanvasRenderingContext2D): void {
    context.drawImage(
      this.imageCommonEnemie,
      this.positionX,
      this.positionY,
      this.commonEnemieWidth,
      this.commonEnemieHeigh
    );
  }

  update(): void {
    const spaceShipItem = this.gameGod.gameObjects.getItem<SpaceShip>(
      SpaceShip.name
    );
    const moveFactor = 0.1;

    if (this.positionX > spaceShipItem.positionX) {
      this.positionX = this.positionX - moveFactor;
    }

    if (this.positionX < spaceShipItem.positionX) {
      this.positionX = this.positionX + moveFactor;
    }

    if (this.positionY > spaceShipItem.positionY) {
      this.positionY = this.positionY - moveFactor;
    }

    if (this.positionY < spaceShipItem.positionY) {
      this.positionY = this.positionY + moveFactor;
    }

    const shotsBlaster = this.gameGod.gameObjects.getAllOfType<BlasterShoot>(
      BlasterShoot
    );

    const hitBlaster = shotsBlaster.find((blaster) => {
      const hitX =
        Math.round(blaster.positionX) >= Math.round(this.positionX) &&
        Math.round(blaster.positionX) <=
          Math.round(this.positionX + this.commonEnemieWidth);

      const hitY =
        Math.round(blaster.positionY) >= Math.round(this.positionY) &&
        Math.round(blaster.positionY) <=
          Math.round(this.positionY + this.commonEnemieHeigh);

      return hitX && hitY;
    });

    if (Boolean(hitBlaster)) {
      this.enemieLife = this.enemieLife - hitBlaster.damage;

      this.gameGod.gameObjects.deleteItem(hitBlaster.objectId);
    }

    if (this.enemieLife <= 0) {
      this.gameGod.gameObjects.deleteItem(
        `${CommonEnemies.name}-${this.enemyId}`
      );
    }
  }
}

export default CommonEnemies;
