import { GameManager } from "./gameStore";
import { startLogger } from "./logger";

const gameManager = GameManager.getInstance();

startLogger();

setInterval(() => {
  gameManager.addGame({
    id: Math.random().toString(),
    whitePlayer: "harkirat",
    blackPlayer: "jaskirat",
    moves: [],
  });
}, 5000);
