const Board = require('./board');

class ChessGame {
  constructor() {
    this.board = new Board();
  }
  
  gameOver() {
    return this.board.checkmate('b') || this.board.checkmate('w');
  }

  play() {
    while (!this.gameOver()) {
      this.render();
    }
  }

  render() {
    const board = document.getElementById('board');
    for (let i = 0; i < 8; i++) {
      const ul = document.createElement('ul');
      for (let j = 0; j < 8; j++) {
        let piece = this.board.grid[i][j];
        let sym = piece.symbol === ' ' ? 'e' : piece.symbol;
        let colorSym = piece.color === undefined ? sym : piece.color.concat(sym);
        let li = document.createElement('li');
        let color = (i + j) % 2 === 0 ? 'light' : 'dark';
        li.classList.add('square');
        li.classList.add(color);
        li.dataset.pos = [i,j];
        if (piece.color) {
          let icon = document.createElement('i');
          icon.classList.add(colorSym);
          icon.classList.add('icon');
          li.appendChild(icon);
        }
        ul.appendChild(li);
      }
      board.appendChild(ul);
    }
  }
}

module.exports = ChessGame;