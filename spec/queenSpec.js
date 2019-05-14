describe("Queen", () => {
  const Board = require('../src/board');
  const Queen = require('../src/queen');
  const Piece = require('../src/piece');
  let board;
  let queen;

  beforeEach(() => {
    board = new Board();
    queen = board.grid[0][3];
  });

  describe('constructor', () => {
    it('has a color', () => {
      expect(queen.color).toEqual('b');
    });

    it('has a position', () => {
      expect(queen.pos).toEqual([0,3]);
    });

    it('has a reference to the board', () => {
      expect(queen.board instanceof Board).toBe(true);
    });
  });

  describe('moves', () => {
    it('has no moves from start pos', () => {
      let arr = queen.moves();
      expect(arr.length).toEqual(0);
    });

    it('has 6 moves with the d pawn removed', () => {
      board.grid[1][3] = new Piece(undefined);
      let arr = queen.moves();
      expect(arr.length).toEqual(6);
    });

    it('has 9 moves with the c & d pawns removed', () => {
      board.grid[1][3] = new Piece(undefined);
      board.grid[1][2] = new Piece(undefined);
      let arr = queen.moves();
      expect(arr.length).toEqual(9);
    });

    it('has 13 moves with the c, d & e pawns removed', () => {
      board.grid[1][4] = new Piece(undefined);
      board.grid[1][3] = new Piece(undefined);
      board.grid[1][2] = new Piece(undefined);
      let arr = queen.moves();
      expect(arr.length).toEqual(13);
    });

    it('has 19 moves from f4', () => {
      board.grid[4][5] = new Queen('b',[4,5],board);
      let arr = board.grid[4][5].moves();
      expect(arr.length).toEqual(19);
    });


  });
});