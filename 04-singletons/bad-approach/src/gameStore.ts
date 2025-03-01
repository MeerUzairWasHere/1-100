interface Game {
  id: string;
  whitePlayer: string;
  blackPlayer: string;
  moves: string[];
}

export class GameManager {
  games: Game[] = [];

  constructor() {
    this.games = [];
  }
  addGame(game: Game) {
    this.games.push(game);
  }

  getGames() {
    return this.games;
  }

  // e5e7
  addMove(gameId: string, move: string) {
    const game = this.games.find((game) => game.id === gameId);
    if (game) {
      game.moves.push(move);
    }
  }
}

export const GameManager1 = new GameManager();
