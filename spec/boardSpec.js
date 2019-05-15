describe('Board', () => {
  const Board = require('../src/board');
  let board;

  beforeEach(() => {
    board = new Board();
  });

  describe('constructor', () => {
    it('has an 8x8 grid', () => {
      expect(board.grid.length).toEqual(8);
      board.grid.forEach(row => expect(row.length).toEqual(8));
    });

    it('has 16 black pieces and 16 white pieces', () => {
      const blackPieces = board.flat().filter(piece => piece.color === 'b');
      const whitePieces = board.flat().filter(piece => piece.color === 'w');
      expect(blackPieces.length).toEqual(16);
      expect(whitePieces.length).toEqual(16);
    });
  });

  describe('movePiece', () => {
    it('performs a legal move and returns true', () => {
      expect(board.movePiece([1,0],[3,0])).toEqual(true);
      expect(board.grid[3][0].color).toEqual('b');
    });

    it('updates the position of the moved piece', () => {
      board.movePiece([1,0],[3,0]);
      expect(board.grid[3][0].pos).toEqual([3,0]);
    });

    it('returns false when trying to move off the board', () => {
      expect(board.movePiece([1,0],[8,0])).toEqual(false);
    });

    it('returns false when trying to move a null piece', () => {
      expect(board.movePiece([4,0],[7,0])).toEqual(false);
    });

    it('returns false when trying to capture a piece of the same color', () => {
      expect(board.movePiece([0,0],[1,0])).toEqual(false);
    });
  });

  describe('kingPos', () => {
    it('returns [7,4] for white king at start', () => {
      let wkp = board.kingPos('w');
      expect(wkp[0] === 7).toBe(true);
      expect(wkp[1] === 4).toBe(true);
    });

    it('returns [0,4] for black king from start position', () => {
      let bkp = board.kingPos('b');
      expect(bkp[0] === 0).toBe(true);
      expect(bkp[1] === 4).toBe(true);
    });
  });

  describe('pieces', () => {
    it('returns an array of length 16 from start position', () => {
      let wpieces = board.pieces('w');
      let bpieces = board.pieces('b');
      expect(wpieces.length).toEqual(16);
      expect(bpieces.length).toEqual(16);
    });
  });

  describe('inCheck', () => {
    it('returns false from start position', () => {
      expect(board.inCheck('w')).toBe(false);
      expect(board.inCheck('b')).toBe(false);
    }); 

    it('returns true when white king in check', () => {
      board.movePiece([6,5],[4,5]);
      board.movePiece([1,4],[3,4]);
      board.movePiece([0,3],[4,7]);
      expect(board.inCheck('w')).toBe(true);
    });

    it('returns true when black king is in check', () => {
      board.movePiece([1,5],[3,5]);
      board.movePiece([6,4],[4,4]);
      board.movePiece([7,3],[3,7]);
      expect(board.inCheck('b')).toBe(true);
    });
  });
});