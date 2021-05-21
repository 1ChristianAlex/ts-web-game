import { IGame } from '../../classes/IGame';
import Game from '../GameGod';
import PlayerPoints from './PlayerPoints';

class PlayerLife implements IGame {
  constructor(protected gameGod: Game) {}

  public lifeBarWidth = this.gameGod.GAME_WIDTH * 0.25;
  public lifeBarHeight = this.gameGod.GAME_HEIGHT * 0.05;

  public positionY = this.gameGod.GAME_HEIGHT * 0.97 - this.lifeBarHeight;
  public positionX = this.gameGod.GAME_WIDTH * 0.03;

  public spaceShipLife = 100;

  draw(context?: CanvasRenderingContext2D): void {
    const damagePercente = (this.lifeBarWidth / 100) * this.spaceShipLife;

    context.beginPath();
    context.rect(
      this.positionX,
      this.positionY,
      this.lifeBarWidth,
      this.lifeBarHeight
    );

    context.fillStyle = 'green';
    context.fill();

    context.beginPath();
    context.rect(
      this.positionX,
      this.positionY,
      this.lifeBarWidth - damagePercente,
      this.lifeBarHeight
    );

    context.fillStyle = 'red';
    context.fill();

    context.fillStyle = 'green';
    context.font = '30px Comic Sans MS';
    context.fillText('Life Bar', this.positionX, this.positionY - 10);
  }

  update(deltaTime: number): void {
    if (this.spaceShipLife <= 0) {
      const point = this.gameGod.gameObjects.getItem<PlayerPoints>(
        PlayerPoints.name
      );
      this.gameGod.isGamePause = true;
      alert(`Seu total de pontos é: ${point.pointCounter}`);
      location.reload();
    }
  }
}

export default PlayerLife;
