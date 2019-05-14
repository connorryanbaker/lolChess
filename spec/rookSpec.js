describe("Rook", () => {
  const Rook = require('../src/rook');
  const Board = require('../src/board');
  const Piece = require('../src/piece');
  let board;
  let rook;
  
  beforeEach(() => {
    board = new Board();
    rook = board.grid[0][0];
  });
  

  describe('rook constructor', () => {
    it('has a color', () => {
      expect(rook.color).toEqual('b');
    });

    it('has a position', () => {
      expect(rook.pos).toEqual([0,0]);
    });

    it('is a rook', () => {
      expect(rook instanceof Rook).toEqual(true);
    });
  });

  describe('moves', () => {
    it('has no valid moves in the start pos', () => {
      expect(rook.moves()).toEqual([]);
    });

    it('has 5 legal moves when the a pawn is removed', () => {
      board.grid[1][0] = new Piece(undefined);
      const arr = rook.moves();
      expect(arr.length).toEqual(6);
    });

    it('has 10 moves from d4 as a black rook', () => {
      board.grid[4][3] = new Rook('b',[4,3],board);
      const arr = board.grid[4][3].moves();
      console.log(arr);
      expect(arr.length).toEqual(11);
    });
  });
});