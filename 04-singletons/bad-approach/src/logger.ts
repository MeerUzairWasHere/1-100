import { GameManager } from "./gameStore";

const gameManager = new GameManager();

export function startLogger() {
  setInterval(() => {
    gameManager.getGames()
  }, 4000);
}
