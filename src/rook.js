const Piece = require('./piece');
const slideable = require('./slideable');

class Rook extends Piece{
  constructor(color,pos,board) {
    super(color,pos,board);
    this.symbol = 'r';
  }

  moves() {
    return slideable(this.pos, this.board, this.deltas());
  }

  deltas() {
    return [[1,0],[-1,0],[0,1],[0,-1]];
  }
}

module.exports = Rook;