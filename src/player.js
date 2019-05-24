class Player {
  constructor(color, game) {
    this.color = color;
    this.game = game;
  }

  makeMove() {
    let moves = [];
    const nextMove = (pos) => {
      moves.push(pos);
      if (moves.length === 2) {
        if (this.game.board.movePiece(moves[0],moves[1])) {
          console.log(this.color + ' moves to' + moves);
          moves = [];
          return true;
        } else {
          moves = [];
          return false;
        }
      }
    };
    return nextMove;
  }
}

module.exports = Player;