const Piece = require('./piece');
const stepable = require('./stepable');

class Knight extends Piece {
  constructor(color,pos,board) {
    super(color,pos,board);
  }

  deltas() {
    return [[2,1],
            [2,-1],
            [-2,1],
            [-2,-1],
            [1,2],
            [-1,2],
            [-1,-2],
            [1,-2]];
  }

  moves() {
    return stepable(this.pos,this.board,this.deltas());
  }
}

module.exports = Knight;