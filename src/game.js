const Board = require('./board');

class ChessGame {
  constructor() {
    this.board = new Board();
    this.selected = undefined;
  }
  
  clearBoard() {
    const board = document.getElementById('board');
    while (board.children.length > 0) {
      let i = 0;
      board.removeChild(board.children[i]);
    }
  }

  gameOver() {
    return this.board.checkmate('b') || this.board.checkmate('w');
  }

  handleClick(e) {
    const sq = e.currentTarget;
    const pos = sq.dataset.pos.split(",").map(e => parseInt(e));
    if (this.selected) {
      this.board.movePiece(this.selected, pos);
      this.selected = undefined;
      this.render();
    } else {
      this.selected = pos;
    }
  }

  play() {
    while (!this.gameOver()) {
      this.render();
    }
  }

  makeSquare(i,j) {
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
    li.addEventListener('click', this.handleClick.bind(this));
    return li;
  }

  render() {
    this.clearBoard();
    const board = document.getElementById('board');
    for (let i = 0; i < 8; i++) {
      const ul = document.createElement('ul');
      for (let j = 0; j < 8; j++) {
        let li = this.makeSquare(i,j);
        ul.appendChild(li);
      }
      board.appendChild(ul);
    }
  }
}

module.exports = ChessGame;