describe("Knight", () => {
  const Board = require('../src/board');
  const Knight = require('../src/knight');
  const Piece = require('../src/piece');

  let board;
  let knight;

  beforeEach(() => {
    board = new Board();
    knight = board.grid[0][1];
  });

  describe('constructor', () => {
    it('has a color', () => {
      expect(knight.color).toEqual('b');
    });

    it('has a position', () => {
      expect(knight.pos).toEqual([0, 1]);
    });

    it('is a knight', () => {
      expect(knight instanceof Knight).toEqual(true);
    });

    it('has a reference to the board', () => {
      expect(knight.board instanceof Board).toEqual(true);
    });
  });

  describe('moves', () => {
    it('has 2 moves from the starting square', () => {
      let arr = knight.moves();
      expect(arr.length).toEqual(2);
    });

    it('has 3 moves with d pawn removed', () => {
      board.grid[1][3] = new Piece(undefined);
      let arr = knight.moves();
      expect(arr.length).toEqual(3);
    });

    it('has 8 moves from e4', () => {
      board.grid[4][4] = new Knight('b',[4,4],board);
      let arr = board.grid[4][4].moves();
      expect(arr.length).toEqual(8);
    });
  });

});