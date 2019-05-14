describe("Bishop", () => {
  const Bishop = require('../src/bishop');
  const Board = require('../src/board');
  const Piece = require('../src/piece');
  let board;
  let bishop;

  beforeEach(() => {
    board = new Board();
    bishop = board.grid[0][2];
  });

  describe('constructor', () => {
    it('has a color', () => {
      expect(bishop.color).toEqual('b');
    });

    it('has a position', () => {
      expect(bishop.pos).toEqual([0,2]);
    });

    it('has a reference to the board', () => {
      expect(bishop.board instanceof Board).toBe(true);
    });

    it('is an instanceof Bishop', () => {
      expect(bishop instanceof Bishop).toBe(true);
    });
  });

  describe('moves', () => {
    it('has no moves from start square', () => {
      const arr = bishop.moves();
      expect(arr.length).toEqual(0);
    });

    it('has 5 legal moves with the d pawn removed', () => {
      board.grid[1][3] = new Piece(undefined);
      let arr = bishop.moves();
      expect(arr.length).toEqual(5);
    });

    it('has 8 moves from d4', () => {
      board.grid[4][3] = new Bishop('b',[4,3],board);
      const arr = board.grid[4][3].moves();
      expect(arr.length).toEqual(8);
    });
  });
});