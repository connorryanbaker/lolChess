const King = require('./king');

class Display {
  constructor(board, game) {
    this.board = board;
    this.game = game;
    this.selected = undefined;
    this.currentMove = undefined;
  }

  handleClick(e) {
    const sq = e.currentTarget;
    const pos = sq.dataset.pos.split(",").map(e => parseInt(e));
    if (this.selected) {
      this.currentMove(pos);
      this.currentMove = undefined;
      this.game.switchPlayers();
      this.board.movePiece(this.selected, pos);
      this.selected = undefined;
      this.render();
    } else {
      if (this.board.grid[pos[0]][pos[1]].color === this.board.players[0]) {
        this.selected = pos;
        this.currentMove = this.game.players[0].makeMove();
        this.currentMove(pos);
        e.currentTarget.classList.add('selected');
      }
    }
  }

  handleMouseDown(e) {
    e.stopPropagation();
    const sq = e.currentTarget;
    const pos = sq.parentNode.dataset.pos.split(",").map(e => parseInt(e));
    if (this.board.grid[pos[0]][pos[1]].color === this.board.players[0]) {
      this.selected = pos;
      e.currentTarget.classList.add('selected');
    }
  }

  handleMouseUp(e) {
    e.stopPropagation();
    let li = document.elementsFromPoint(e.x,e.y)[0];
    li = li.dataset.pos === undefined ? li.parentNode : li; 
    const pos = li.dataset.pos.split(",").map(e => parseInt(e));
    this.board.movePiece(this.selected, pos);
    this.selected = undefined;
    this.render();
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
    li.setAttribute('draggable', false);
    li.addEventListener('click', this.handleClick.bind(this));

    if (piece.color) {
      let icon = document.createElement('i');
      icon.classList.add(colorSym);
      icon.classList.add('icon');
      icon.setAttribute('draggable', true);
      icon.addEventListener('drag', this.handleMouseDown.bind(this));
      icon.addEventListener('dragend', this.handleMouseUp.bind(this));
      li.appendChild(icon);
      if (piece instanceof King) {
        if (this.board.inCheck(piece.color)) {
          this.board.checkmate(piece.color) ? li.classList.add('checkmate') : li.classList.add('inCheck');
        } 
      }
    }

    
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
    const toMove = document.getElementById('toMove');
    const color = this.board.players[0] === 'w' ? 'whiteToMove' : 'blackToMove';
    const colorToRemove = color === 'whiteToMove' ? 'blackToMove' : 'whiteToMove';
    toMove.classList.remove(colorToRemove);
    toMove.classList.add(color);
    if (this.board.checkmate('b') || this.board.checkmate('w')) {
      console.log('checkmate');
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