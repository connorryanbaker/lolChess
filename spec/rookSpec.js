describe("Rook", () => {
  const Rook = require('../src/rook');

  describe('rook constructor', () => {
    const rook = new Rook('b',[0,0]);
    it('has a color', () => {
      expect(rook.color).toEqual('b');
    });

    it('has a position', () => {
      expect(rook.pos).toEqual([0,0]);
    })
  });

})