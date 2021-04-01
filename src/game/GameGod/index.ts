import { IGame } from '../../classes/IGame';
import { GAME_HEIGHT, GAME_WIDTH, KEYBOARD_CODE } from '../../constants';
import SpaceShip from '../SpaceShip/SpaceShipGame';
import StarSpace from '../StarSpace/StarSpaceGame';
import GameObjects from './GameObjects';
import CommonEnemies from '../Enemies/CommonEnemies';

class Game implements IGame {
  public gameObjects = new GameObjects();

  public readonly GAME_WIDTH = GAME_WIDTH;
  public readonly GAME_HEIGHT = GAME_HEIGHT;
  public isGamePause = false;

  constructor(public context: CanvasRenderingContext2D) {
    this.loadGameObjects();
    this.draw();
    this.pauseGame();
  }

  private loadGameObjects(): void {
    const startNumber = 50;
    const enemiesNumber = 10;
    for (let starIndex = 0; starIndex < startNumber; starIndex++) {
      this.gameObjects.addHead(`start-${starIndex}`, new StarSpace(this));
    }

    for (let enemie = 0; enemie < enemiesNumber; enemie++) {
      const enemieId = Date.now() + enemie;
      this.gameObjects.addTail(
        `${CommonEnemies.name}-${enemieId}`,
        new CommonEnemies(this, enemieId)
      );
    }

    this.gameObjects.addHead(SpaceShip.name, new SpaceShip(this));
  }

  pauseGame() {
    document.addEventListener('keydown', (event) => {
      if (event.key === KEYBOARD_CODE.ESCAPE) {
        this.isGamePause = !this.isGamePause;
      }
    });
  }

  async draw(): Promise<void> {
    this.context.clearRect(0, 0, this.GAME_WIDTH, this.GAME_HEIGHT);
    this.context.beginPath();

    this.context.rect(0, 0, this.GAME_WIDTH, this.GAME_HEIGHT);

    this.context.fillStyle = '#0c164f';
    this.context.fill();

    if (this.gameObjects?.size > 0) {
      this.gameObjects
        .toList()
        .forEach(async ([_, gameItem]) => gameItem.draw(this.context));
    }
  }

  update(deltaTime: number): void {
    if (this.gameObjects?.size > 0) {
      this.gameObjects.toList().forEach(([objectName, gameItem]) => {
        gameItem.update(deltaTime);

        this.deleteWhenOffScreen(gameItem, objectName);
      });
    }
  }

  private deleteWhenOffScreen(gameItem: IGame, objectName: string) {
    if (typeof gameItem.positionY === 'number' && gameItem.positionY < 0) {
      this.gameObjects.deleteItem(objectName);
    }
    if (
      typeof gameItem.positionX === 'number' &&
      gameItem.positionX > this.GAME_WIDTH
    ) {
      this.gameObjects.deleteItem(objectName);
    }
  }

  loop(delta: number) {
    if (!this.isGamePause) {
      this.draw();
      this.update(delta);
    }
    requestAnimationFrame(this.loop.bind(this));
  }
}

export default Game;
