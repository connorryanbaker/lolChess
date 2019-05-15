const Piece = require('./piece');
const slideable = require('./slideable');

class Bishop extends Piece {
  constructor(color,pos,board) {
    super(color,pos,board);
    this.symbol = 'b';
  }

  moves() {
    return slideable(this.pos,this.board,this.deltas());
  }

  deltas() {
    return [[1,1],[1,-1],[-1,1],[-1,-1]];
  }
}

module.exports = Bishop;