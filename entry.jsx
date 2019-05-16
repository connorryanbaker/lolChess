const ChessGame = require('./src/game');

document.addEventListener("DOMContentLoaded", () => {
  const game = new ChessGame();
  game.render();
});