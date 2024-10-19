interface Game {
  id: string;
  whitePlayer: string;
  blackPlayer: string;
  moves: string[];
}

export class GameManager {
  games: Game[] = [];
  private static instance: GameManager;
  private constructor() {
    this.games = [];
  } 
  static getInstance() {
    if (GameManager.instance) {
      return GameManager.instance;
    }

    GameManager.instance = new GameManager();
    return GameManager.instance;
  }

  public addGame(game: Game) {
    this.games.push(game);
  }

  public getGames() {
    return this.games;
  }

  // e5e7
  public addMove(gameId: string, move: string) {
    const game = this.games.find((game) => game.id === gameId);
    if (game) {
      game.moves.push(move);
    }
  }
}
