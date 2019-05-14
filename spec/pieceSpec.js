describe("Piece", () => {
  const Piece = require('../src/piece');
  const piece = new Piece('b', [1,1]);

  describe("constructor", () => {
    it('has a color', () => {
      expect(piece.color).toEqual('b');
    });

    it('has a position', () => {
      expect(piece.pos).toEqual([1,1]);
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