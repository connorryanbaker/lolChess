const Board = require('./board');
const Display = require('./vanillaDisplay');

class ChessGame {
  constructor() {
    this.board = new Board();
    this.display = new Display(this.board);
  }
  
  gameOver() {
    return this.board.checkmate('b') || this.board.checkmate('w');
  }

  play() {
    while (!this.gameOver()) {
      this.display.render();
    }
  }
}

module.exports = ChessGame;