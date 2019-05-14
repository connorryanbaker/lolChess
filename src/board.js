const Piece = require('./piece');

class Board {
  constructor() {
    this.grid = this.setupBoard();
  }

  setupBoard() {
    const grid = [];
    for (let i = 0; i < 8; i++) {
      let row = [];
      let color;
      if (i < 2) {
        color = 'b';
      } else if (i > 5) {
        color = 'w';
      } else {
        color = undefined;
      }

      for (let j = 0; j < 8; j++) {
        row.push(new Piece(color, [i,j]));
      }
      grid.push(row);
    }
    return grid;
  }

  flat() {
    let flat = [];
    for (let i = 0; i < 8; i++) {
      flat = flat.concat(this.grid[i]);
    }
    return flat;
  }

  movePiece(from,to) {
    if (!this.validPos(from) || !this.validPos(to)) return false;
    if (this.pieceAt(from).color === this.pieceAt(to).color) return false;
    if (!this.pieceAt(from).color) return false;

    const [toRow, toCol] = to;
    const [fromRow, fromCol] = from;

    this.grid[toRow][toCol] = this.grid[fromRow][fromCol];
    this.grid[fromRow][fromCol] = new Piece(undefined);
    this.pieceAt(to).pos = to;
    return true;
  }

  pieceAt(pos) {
    let [row, col] = pos;
    return this.grid[row][col];
  }

  validPos(pos) {
    return (pos[0] >= 0 && pos[0] < 8) && (pos[1] >= 0 && pos[1] < 8);
  }
}

module.exports = Board;