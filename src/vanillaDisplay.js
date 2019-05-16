class Display {
  constructor(board) {
    this.board = board;
    this.selected = undefined;
  }

  handleClick(e) {
    const sq = e.currentTarget;
    const pos = sq.dataset.pos.split(",").map(e => parseInt(e));
    if (this.selected) {
      this.board.movePiece(this.selected, pos);
      this.selected = undefined;
      this.render();
    } else {
      if (this.board.grid[pos[0]][pos[1]].color === this.board.players[0]) {
        this.selected = pos;
        e.currentTarget.classList.add('selected');
      }
    }
  }

  makeSquare(i, j) {
    let piece = this.board.grid[i][j];
    let sym = piece.symbol === ' ' ? 'e' : piece.symbol;
    let colorSym = piece.color === undefined ? sym : piece.color.concat(sym);
    let li = document.createElement('li');
    let color = (i + j) % 2 === 0 ? 'light' : 'dark';
    li.classList.add('square');
    li.classList.add(color);
    li.dataset.pos = [i, j];
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
        let li = this.makeSquare(i, j);
        ul.appendChild(li);
      }
      board.appendChild(ul);
    }
  }

  clearBoard() {
    const board = document.getElementById('board');
    while (board.children.length > 0) {
      let i = 0;
      board.removeChild(board.children[i]);
    }
  }
}
module.exports = Display;