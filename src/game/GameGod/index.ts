import { IGame } from '../../classes/IGame';
import { GAME_HEIGHT, GAME_WIDTH, KEYBOARD_CODE } from '../../constants';
import SpaceShip from '../SpaceShip/SpaceShipGame';
import StarSpace from '../StarSpace/StarSpaceGame';

class Game implements IGame {
  public gameObjects = new Map<string, IGame>();

  public readonly GAME_WIDTH = GAME_WIDTH;
  public readonly GAME_HEIGHT = GAME_HEIGHT;
  public isGamePause = false;

  constructor(public context: CanvasRenderingContext2D) {
    this.loadGameObjects();
    this.draw();
    this.pauseGame();
  }

  private loadGameObjects(): void {
    const spaceShip = new SpaceShip(this);

    const startNumber = 50;

    for (let starIndex = 0; starIndex < startNumber; starIndex++) {
      this.gameObjects.set(`start-${starIndex}`, new StarSpace(this));
    }

    this.gameObjects.set('space-ship', spaceShip);
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
      this.gameObjects.forEach(async (gameItem) => gameItem.draw(this.context));
    }
  }

  update(deltaTime: number): void {
    if (this.gameObjects?.size > 0) {
      this.gameObjects.forEach((gameItem) => gameItem.update(deltaTime));
    }
  }

  loop(delta: number) {
    if (!this.isGamePause) {
      this.draw();
      this.update(delta);
    }
    // console.log(60 / (Date.now() - delta));

    requestAnimationFrame(this.loop.bind(this));
  }
}

export default Game;
