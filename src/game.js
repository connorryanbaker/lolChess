const Board = require('./board');
const Display = require('./vanillaDisplay');
const Player = require('./player');

class ChessGame {
  constructor() {
    this.board = new Board();
    this.display = new Display(this.board, this);
    this.players = [new Player('w', this), new Player('b',this)];
  }
  
  gameOver() {
    return this.board.checkmate('b') || this.board.checkmate('w');
  }

  play() {
    this.display.render();
  }

  switchPlayers() {
    this.players.push(this.players.shift());
  }

  takeTurn() {
    
  }
}

module.exports = ChessGame;