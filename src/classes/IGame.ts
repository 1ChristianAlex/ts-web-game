export interface IGame {
  draw(context?: CanvasRenderingContext2D): void;
  update(deltaTime: number): void;

  positionX?: number | null;
  positionY?: number | null;
}
