describe('Board', () => {
  const Board = require('../src/board');
  const board = new Board();

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

    it('returns false when trying to move off the board', () => {
      expect(board.movePiece([1,0],[8,0])).toEqual(false);
    });

    it('returns false when trying to move a null piece', () => {
      expect(board.movePiece([4,0],[7,0])).toEqual(false);
    });

    it('returns false when trying to capture a piece of the same color', () => {
      expect(board.movePiece([0,0],[1,0])).toEqual(false);
    });
  })
})