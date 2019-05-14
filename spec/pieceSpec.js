describe("Piece", () => {
  const Piece = require('../src/piece');
  const Board = require('../src/board');
  const board = new Board();
  const piece = board.grid[1][1];

  describe("constructor", () => {
    it('has a color', () => {
      expect(piece.color).toEqual('b');
    });

    it('has a position', () => {
      expect(piece.pos).toEqual([1,1]);
    });

    it('has a reference to the board', () => {
      expect(piece.board).toEqual(board);
    });
  });

  describe("isNull", () => {
    it('returns false for pieces with colors', () => {
      expect(piece.isNull()).toEqual(false);
      expect(new Piece('w',[7,7]).isNull()).toEqual(false);
    });

    it('returns true for pieces without a color', () => {
      expect(new Piece(undefined, [0,0]).isNull()).toEqual(true);
    });
  });
});