const Piece = require('./piece');
const slideable = require('./slideable');

class Queen extends Piece {
  constructor(color,pos,board) {
    super(color, pos, board);
  }

  moves() {
    return slideable(this.pos,this.board,this.deltas());
  }

  deltas() {
    return [[1,1],[1,-1],[-1,1],[-1,-1],
            [1,0],[0,1],[-1,0],[0,-1]];
  }
} 
module.exports = Queen;