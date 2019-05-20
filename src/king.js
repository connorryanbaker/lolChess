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
    let moves = stepable(this.pos,this.board,this.deltas());
    // if (this.board.canCastleKingside(this.color)) {
    //   let move = this.color === 'w' ? [7,6] : [0,6];
    //   moves.push(move);
    // } else if (this.board.canCastleQueenside(this.color)) {
    //   let move = this.color === 'w' ? [7,2] : [0,2];
    //   moves.push(move);
    // }
    return moves;
  }
}

module.exports = King;