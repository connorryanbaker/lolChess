class Piece {
  constructor(color, pos, board) {
    this.color = color;
    this.pos = pos;
    this.board = board;
    this.symbol = ' ';
  }

  isNull() {
    return this.color === undefined;
  }

  enemyColor() {
    return this.color === 'w' ? 'b' : 'w';
  }
}

module.exports = Piece;