import { IGame } from '../../classes/IGame';

class GameObjects {
  public gameList = new Map<string, IGame>();

  public toList(): [string, IGame][] {
    return Array.from(this.gameList.entries());
  }

  public addHead(id: string, gameObject: IGame) {
    this.gameList.set(id, gameObject);
  }

  public addTail(id: string, gameObject: IGame) {
    const currentEntries = this.toList();

    const gameMapPivo = new Map<string, IGame>([
      ...currentEntries,
      [id, gameObject],
    ]);

    this.gameList = gameMapPivo;
  }

  public getItem<T = IGame>(id: string): T {
    return (this.gameList.get(id) as unknown) as T;
  }

  public getAllOfType<T = IGame>(instance: any): T[] {
    const instanceTypes = Array.from(this.gameList.values()).filter(
      (itemGame) => itemGame instanceof instance
    );

    return (instanceTypes as unknown) as T[];
  }

  public deleteItem(id: string) {
    this.gameList.delete(id);
  }

  get size() {
    return this.gameList.size;
  }
}

export default GameObjects;
