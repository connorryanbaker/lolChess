describe("King", () => {
  const Board = require('../src/board');
  const King = require('../src/king');
  const Piece = require('../src/piece');

  let board;
  let king;

  beforeEach(() => {
    board = new Board();
    king = board.grid[0][4];
  });

  describe('constructor', () => {
    it('has a color', () => {
      expect(king.color).toEqual('b');
    });

    it('has a position', () => {
      expect(king.pos).toEqual([0, 4]);
    });

    it('is a king', () => {
      expect(king instanceof King).toEqual(true);
    });

    it('has a reference to the board', () => {
      expect(king.board instanceof Board).toEqual(true);
    });
  });

  describe('moves', () => {
    it('has 0 moves from start pos', () => {
      let arr = king.moves();
      expect(arr.length).toEqual(0);
    });

    it ('has one move with e pawn removed', () => {
      board.grid[1][4] = new Piece(undefined);
      let arr = king.moves();
      expect(arr.length).toEqual(1);
    });

    it('has two moves with d & e pawns removed', () => {
      board.grid[1][4] = new Piece(undefined);
      board.grid[1][3] = new Piece(undefined);
      let arr = king.moves();
      expect(arr.length).toEqual(2);
    });

    it('has three moves with d,e & f pawns removed', () => {
      board.grid[1][4] = new Piece(undefined);
      board.grid[1][3] = new Piece(undefined);
      board.grid[1][5] = new Piece(undefined);
      let arr = king.moves();
      expect(arr.length).toEqual(3);
    });

    it ('has 8 moves from e4', () => {
      board.grid[4][4] = new King('b',[4,4],board);
      let arr = board.grid[4][4].moves();
      expect(arr.length).toEqual(8);
    });
  });
});