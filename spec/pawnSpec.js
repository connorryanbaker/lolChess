describe("Pawn", () => {
  const Pawn = require('../src/pawn');
  const Board = require('../src/board');
  const Knight = require('../src/knight');
  let board;
  let whitePawn;
  let blackPawn;

  beforeEach(() => {
    board = new Board();
    whitePawn = board.grid[6][4];
    blackPawn = board.grid[1][4];
  });

  describe('constructor', () => {
    it('has a color', () => {
      expect(whitePawn.color).toEqual('w');
    });

    it('has a position', () => {
      expect(whitePawn.pos).toEqual([6, 4]);
    });

    it('is a pawn', () => {
      expect(whitePawn instanceof Pawn).toEqual(true);
    });

    it('has a reference to the board', () => {
      expect(whitePawn.board instanceof Board).toEqual(true);
    });
  });

  describe('moves', () => {
    it('has two valid moves when on start row with no possible captures', () => {
      let wpMoves = whitePawn.moves();
      let bpMoves = blackPawn.moves();


      expect(wpMoves.length).toEqual(2);
      expect(bpMoves.length).toEqual(2);
    });

    it('has one valid move when off start row with no possible captures', () => {
      board.movePiece(whitePawn.pos,[4,4]);
      let wpMoves = whitePawn.moves();
      expect(wpMoves.length).toEqual(1);
    });

    it('adds a move to possible moves if a legal capture is possible on white side', () => {
      board.grid[5][5] = new Knight('b',[5,5],board);
      let wpMoves = whitePawn.moves();
      expect(wpMoves.length).toEqual(3);
    });
    
    it('adds a move to possible moves if a legal capture is possible on black side', () => {
      board.grid[2][5] = new Knight('w',[2,5],board);
      let bpMoves = blackPawn.moves();
      expect(bpMoves.length).toEqual(3);
    });

    it('adds two moves to possible moves if two legal captures are possible on white side', () => {
      board.grid[5][5] = new Knight('b', [5, 5], board);
      board.grid[5][3] = new Knight('b', [5, 3], board);
      let wpMoves = whitePawn.moves();
      expect(wpMoves.length).toEqual(4);

    });
    
    it('adds two moves to possible moves if two legal captures are possible on black side', () => {
      board.grid[2][5] = new Knight('w', [2, 5], board);
      board.grid[2][3] = new Knight('w', [2, 3], board);
      let bpMoves = blackPawn.moves();
      expect(bpMoves.length).toEqual(4);
    });
  });
});