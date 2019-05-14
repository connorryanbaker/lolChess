const stepable = (pos, board, deltas) => {
  const res = [];
  for (let i = 0; i < deltas.length; i++) {
    let currentPos = [pos[0] + deltas[i][0], pos[1] + deltas[i][1]];
    if (!board.validPos(currentPos)) continue;

    let [row,col] = currentPos;
    if (board.grid[row][col].color !== board.grid[pos[0]][pos[1]].color) res.push(currentPos);
  }

  return res;
};

module.exports = stepable;