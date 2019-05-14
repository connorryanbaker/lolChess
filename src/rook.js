const Piece = require('./piece');
class Rook extends Piece{
  constructor(color,pos) {
    super(color,pos);
  }
}

module.exports = Rook;