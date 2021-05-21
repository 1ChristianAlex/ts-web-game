import { IGame } from '../../classes/IGame';
import Game from '../GameGod';
import PlayerLife from './PlayerLife';
import PlayerPoints from './PlayerPoints';

class GameInterface implements IGame {
  constructor(private gameGod: Game) {
    this.gameGod.gameObjects.addHead(
      PlayerLife.name,
      new PlayerLife(this.gameGod)
    );

    this.gameGod.gameObjects.addHead(
      PlayerPoints.name,
      new PlayerPoints(this.gameGod)
    );
  }

  draw(context?: CanvasRenderingContext2D): void {
    // throw new Error('Method not implemented.');
  }
  update(deltaTime: number): void {
    // throw new Error('Method not implemented.');
  }
  positionX?: number;
  positionY?: number;
}

export default GameInterface;
