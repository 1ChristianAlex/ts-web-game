import { IGame } from '../../classes/IGame';
import Game from '../GameGod';
import { KEYBOARD_CODE } from '../../constants';
import BlasterShoot from './BlasterShoot';
import CommonEnemies from '../Enemies/CommonEnemies';
import AssetsGame from '../../asset';
import HitableObject from '../../classes/HitableObject';
import PlayerLife from '../GameInterface/PlayerLife';

class SpaceShip extends HitableObject implements IGame {
  private imageSpaceShip: HTMLImageElement;
  public spaceShipWidth = this.gameGod.GAME_WIDTH * 0.1;
  public spaceShipHeigh = this.gameGod.GAME_HEIGHT * 0.25;

  public positionX = this.gameGod.GAME_WIDTH / 2 - this.spaceShipWidth / 2;
  public positionY = this.gameGod.GAME_HEIGHT * 0.97 - this.spaceShipHeigh;

  private readonly moveFactorX = 0.01;
  private readonly moveFactorY = 0.02;

  private playerLife: PlayerLife;

  constructor(protected gameGod: Game) {
    super();
    this.initializeCommands();
    this.imageSpaceShip = new Image();
    this.imageSpaceShip.src = AssetsGame.SPACESHIP;

    this.playerLife = this.gameGod.gameObjects.getItem<PlayerLife>(
      PlayerLife.name
    );
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

      this.gameGod.emmitSound(AssetsGame.SHOOT_SOUND);
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

    this.playerLife.draw(context);
  }

  update(): void {
    if (this.playerLife.spaceShipLife < 0) {
      this.playerLife.spaceShipLife = 0;
    }

    if (this.playerLife.spaceShipLife > 100) {
      this.playerLife.spaceShipLife = 99;
    }

    const shotsBlaster =
      this.gameGod.gameObjects.getAllOfType<CommonEnemies>(CommonEnemies);

    const enemieHit = this.verifyHitObject<CommonEnemies>(shotsBlaster, {
      positionX: this.positionX,
      positionY: this.positionY,
      commonHeigh: this.spaceShipHeigh,
      commonWidth: this.spaceShipWidth,
    });

    if (Boolean(enemieHit)) {
      this.gameGod.emmitSound(AssetsGame.DAMAGE_HIT_SOUND);

      this.playerLife.spaceShipLife =
        this.playerLife.spaceShipLife - enemieHit.enemieDamage;

      enemieHit.enemieLife = 0;
      enemieHit.enemieDamage = 0;
    }
  }
}

export default SpaceShip;
