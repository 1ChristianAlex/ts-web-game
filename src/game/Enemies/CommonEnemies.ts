import { IGame } from '../../classes/IGame';
import Game from '../GameGod';
import SpaceShip from '../SpaceShip/SpaceShipGame';
import BlasterShoot from '../SpaceShip/BlasterShoot';
import AssetsGame from '../../asset';
import HitableObject from '../../classes/HitableObject';
import PlayerPoints from '../GameInterface/PlayerPoints';

class CommonEnemies extends HitableObject implements IGame {
  private imageCommonEnemie: HTMLImageElement;

  constructor(
    protected gameGod: Game,
    public enemyId: number,
    private enemyComplexity: number
  ) {
    super();
    this.imageCommonEnemie = new Image();
    this.imageCommonEnemie.src = AssetsGame.ENEMIE;

    this.positionY = this.getRandomY();
    this.positionX = this.getRandomX();
  }

  public commonEnemieWidth = this.gameGod.GAME_WIDTH * 0.05;
  public commonEnemieHeigh = this.gameGod.GAME_HEIGHT * 0.13;
  public positionX = 0;
  public positionY = 0;
  public enemieLife = Math.round(50 + this.enemyComplexity / 0.6);
  public enemieDamage = Math.round(15 + this.enemyComplexity / 0.6);

  private addPoints(extraPoint: number = 0) {
    const point = this.gameGod.gameObjects.getItem<PlayerPoints>(
      PlayerPoints.name
    );
    point.addPoints(extraPoint);
  }

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

    const shotsBlaster =
      this.gameGod.gameObjects.getAllOfType<BlasterShoot>(BlasterShoot);

    const blasterHit = this.verifyHitObject<BlasterShoot>(shotsBlaster, {
      positionX: this.positionX,
      positionY: this.positionY,
      commonHeigh: this.commonEnemieHeigh,
      commonWidth: this.commonEnemieWidth,
    });

    if (Boolean(blasterHit)) {
      this.addPoints();
      this.enemieLife = this.enemieLife - blasterHit.damage;

      this.gameGod.gameObjects.deleteItem(blasterHit.objectId);
    }

    if (this.enemieLife <= 0) {
      this.addPoints(10);

      const deadIndex = Math.round(
        Math.random() * AssetsGame.DEAD_SOUND.length - 1
      );

      this.gameGod.emmitSound(AssetsGame.DEAD_SOUND[deadIndex]);

      this.gameGod.gameObjects.deleteItem(
        `${CommonEnemies.name}-${this.enemyId}`
      );
    }
  }
}

export default CommonEnemies;
