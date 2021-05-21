import { IGame } from './IGame';

interface IGameProps {
  positionX: number;
  positionY: number;
  commonHeigh?: number;
  commonWidth?: number;
}

abstract class HitableObject {
  protected verifyHitObject<T = IGame>(
    hitableGameObjects: IGame[],
    objectProps: IGameProps
  ): T {
    const hitBlaster = hitableGameObjects.find((gameObj) => {
      const hitX =
        Math.round(gameObj.positionX) >= Math.round(objectProps.positionX) &&
        Math.round(gameObj.positionX) <=
          Math.round(objectProps.positionX + objectProps.commonWidth);

      const hitY =
        Math.round(gameObj.positionY) >= Math.round(objectProps.positionY) &&
        Math.round(gameObj.positionY) <=
          Math.round(objectProps.positionY + objectProps.commonHeigh);

      return hitX && hitY;
    });

    return hitBlaster as unknown as T;
  }
}

export default HitableObject;
