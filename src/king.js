const Piece = require('./piece');
const stepable = require('./stepable');

class King extends Piece {
  constructor(color,pos,board) {
    super(color,pos,board);
    this.symbol = 'k';
  }

  deltas() {
    return [[1,0],
            [-1,0],
            [0,1],
            [0,-1],
            [1,1],
            [-1,1],
            [1,-1],
            [-1,-1]];
  }

  moves() {
    return stepable(this.pos,this.board,this.deltas());
  }
}

module.exports = King;