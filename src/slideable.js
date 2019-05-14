const slideable = (pos, board, deltas) => {
  const res = [];
  for (let i = 0; i < deltas.length; i++) {
    let currentPos = [pos[0] + deltas[i][0], pos[1] + deltas[i][1]];
    
    while (board.validPos(currentPos)) {
      let [row,col] = currentPos;

      if (board.grid[row][col].color !== board.grid[pos[0]][pos[1]].color) {
        res.push(currentPos);
        if (board.grid[row][col].color === board.grid[pos[0]][pos[1]].enemyColor()) break;
      } else {
        break;
      }

      currentPos = [row + deltas[i][0], col + deltas[i][1]];
    }
  }
  return res;
};

module.exports = slideable;