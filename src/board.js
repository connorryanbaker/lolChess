const Piece = require('./piece');
const Rook = require('./rook');
const Bishop = require('./bishop');
const Queen = require('./queen');
const Knight = require('./knight');
const King = require('./king');
const Pawn = require('./pawn');

class Board {
  constructor() {
    this.grid = this.setupBoard();
  }

  setupBoard() {
    const grid = [];
    for (let i = 0; i < 8; i++) {
      switch(i) {
        case 0:
          grid.push(this.backRow('b'));
          break;
        case 1:
          grid.push(this.pawnRow('b'));
          break;
        case 6:
          grid.push(this.pawnRow('w'));
          break;
        case 7:
          grid.push(this.backRow('w'));
          break;
        default:
          grid.push(this.nullRow());
          break;
      }
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

  backRow(color) {
    const ri = color === 'b' ? 0 : 7;
    return [new Rook(color, [ri, 0], this), new Knight(color, [ri, 1], this), new Bishop(color, [ri, 2], this),
            new Queen(color, [ri, 3], this), new King(color, [ri, 4], this), new Bishop(color,[ri,5], this), 
            new Knight(color,[ri,6],this), new Rook(color,[ri,7],this)];
  }

  pawnRow(color) {
    const row = [];
    const ri = color === 'b' ? 1 : 6;
    for (let i = 0; i < 8; i++) {
      row.push(new Pawn(color, [ri,i], this));
    }
    return row;
  }

  nullRow() {
    const row = [];
    for (let i = 0; i < 8; i++) {
      row.push(new Piece(undefined));
    }
    return row;
  }
}

module.exports = Board;