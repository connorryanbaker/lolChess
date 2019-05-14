class Piece {
  constructor(color, pos) {
    this.color = color;
    this.pos = pos;
  }

  isNull() {
    return this.color === undefined;
  }
}

module.exports = Piece;