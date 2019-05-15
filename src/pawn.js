const Piece = require('./piece');

class Pawn extends Piece {
  constructor(color,pos,board) {
    super(color,pos,board);
  }

  moves() {
    const deltas = this.onStartRow() ? this.moveDeltas().reverse() : this.moveDeltas().slice(1);
    const res = [];
    for (let i = 0; i < deltas.length; i++) {
      let [row,col] = [this.pos[0] + deltas[i][0], this.pos[1] + deltas[i][1]];
      if (this.board.grid[row][col].color === undefined) {
        res.push([row,col]);
      } else {
        break;
      }
    }
    const attacks = this.attackDeltas();
    for (let i = 0; i < attacks.length; i++) {
      let pos = [this.pos[0] + attacks[i][0], this.pos[1] + attacks[i][1]];
      if (this.validAttack(pos)) res.push(pos);
    }

    return res;
  }

  startRow() {
    return this.color === 'w' ? 6 : 1;
  }

  moveDeltas() {
    return this.color === 'w' ? [[-2,0],[-1,0]] : [[2,0],[1,0]];
  }

  attackDeltas() {
    return this.color === 'w' ? [[-1,-1],[-1,1]] : [[1,-1],[1,1]];
  }

  onStartRow() {
    return this.pos[0] === this.startRow();
  }

  validAttack(pos) {
    if (this.board.validPos(pos)) {
      const color = this.board.grid[pos[0]][pos[1]].color;
      return color === this.enemyColor();
    } 
    return false;
  }
}

module.exports = Pawn;