const Piece = require('./piece');
const Rook = require('./rook');
const Bishop = require('./bishop');
const Queen = require('./queen');
const Knight = require('./knight');
const King = require('./king');
const Pawn = require('./pawn');

class Board {
  constructor() {
    this.grid = this.setupBoard();
    this.players = ['w','b'];
    this.movelist = [];
  }

  setupBoard() {
    const grid = [];
    for (let i = 0; i < 8; i++) {
      switch(i) {
        case 0:
          grid.push(this.backRow('b'));
          break;
        case 1:
          grid.push(this.pawnRow('b'));
          break;
        case 6:
          grid.push(this.pawnRow('w'));
          break;
        case 7:
          grid.push(this.backRow('w'));
          break;
        default:
          grid.push(this.nullRow());
          break;
      }
    }
    return grid;
  }

  flat() {
    let flat = [];
    for (let i = 0; i < 8; i++) {
      flat = flat.concat(this.grid[i]);
    }
    return flat;
  }

  movePiece(from,to) {
    if (!this.validMove(from,to)) return false;

    const [toRow, toCol] = to;
    const [fromRow, fromCol] = from;

    this.grid[toRow][toCol] = this.grid[fromRow][fromCol];
    this.grid[fromRow][fromCol] = new Piece(undefined);
    this.pieceAt(to).pos = to;
    this.players.push(this.players.shift());
    this.movelist.push({[from]: to});
    return true;
  }
  
  validMove(from,to) {
    if (!this.validPos(from) || !this.validPos(to)) return false;
    let piece = this.pieceAt(from);
    if (piece.color === this.pieceAt(to).color) return false;
    if (!piece.color) return false;
    if (this.movesIntoCheck(from,to)) return false;

    return this.posIncluded(piece.moves(), to);
  } 

  movesIntoCheck(from,to) {
    const dup = this.dup();
    const color = this.grid[from[0]][from[1]].color;
    dup.dangerousMovePiece(from,to);
    return dup.inCheck(color);
  }

  dangerousMovePiece(from,to) {
    const [toRow, toCol] = to;
    const [fromRow, fromCol] = from;

    this.grid[toRow][toCol] = this.grid[fromRow][fromCol];
    this.grid[fromRow][fromCol] = new Piece(undefined);
    this.pieceAt(to).pos = to;
  }

  inCheck(color) {
    const enemyColor = color === 'w' ? 'b' : 'w';
    const enemyPieces = this.pieces(enemyColor);
    const kp = this.kingPos(color);
    let moves = [];
    enemyPieces.forEach(p => {
      if (p instanceof King) {
        moves = moves.concat(p.movesWithoutCastling());
      } else {
        moves = moves.concat(p.moves());
      }
    });
    return this.posIncluded(moves,kp);
  }

  checkmate(color) {
    return this.inCheck(color) && this.validMoves(color).length === 0;
  }

  posIncluded(arr,pos) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][0] === pos[0] && arr[i][1] === pos[1]) return true;
    }
    return false;
  }

  kingPos(color) {
    const king = this.flat().filter(el => el.color === color && el.symbol === 'k')[0];
    return king.pos;
  }

  pieceAt(pos) {
    let [row, col] = pos;
    return this.grid[row][col];
  }

  pieces(color) {
    return this.flat().filter(el => el.color === color);
  }

  validPos(pos) {
    return (pos[0] >= 0 && pos[0] < 8) && (pos[1] >= 0 && pos[1] < 8);
  }

  backRow(color) {
    const ri = color === 'b' ? 0 : 7;
    return [new Rook(color, [ri, 0], this), new Knight(color, [ri, 1], this), new Bishop(color, [ri, 2], this),
            new Queen(color, [ri, 3], this), new King(color, [ri, 4], this), new Bishop(color,[ri,5], this), 
            new Knight(color,[ri,6],this), new Rook(color,[ri,7],this)];
  }

  pawnRow(color) {
    const row = [];
    const ri = color === 'b' ? 1 : 6;
    for (let i = 0; i < 8; i++) {
      row.push(new Pawn(color, [ri,i], this));
    }
    return row;
  }

  nullRow() {
    const row = [];
    for (let i = 0; i < 8; i++) {
      row.push(new Piece(undefined));
    }
    return row;
  }

  canCastleKingside(color) {
    if (this.inCheck(color)) return false;
    if (!this.sideClear(color,'k')) return false;
    if (this.sideAttacked(color, 'k')) return false;
    if (!this.castlePiecesValid(color, 'k')) return false;
    return true;
  }

  canCastleQueenside(color) {
    if (this.inCheck(color)) return false;
    if (!this.castlePiecesValid(color,'q')) return false;
    if (!this.sideClear(color, 'q')) return false;
    if (this.sideAttacked(color, 'q')) return false; 
    return true;
  }

  castlePiecesValid(color,side) {
    let rank = color === 'w' ? 7 : 0;
    let file = side === 'k' ? 7 : 0;
    let pieces = this.movelist.map(e => Object.keys(e));
    for (let i = 0; i < pieces.length; i++) {
      let pos = pieces[i].join("").split(",").map(e => parseInt(e));
      if (this.isSamePos(pos, [rank,4]) || this.isSamePos(pos, [rank,file])) return false;
    }
    return true;
  }

  sideClear(color, side) {
    let rank = color === 'w' ? 7 : 0;
    let start = side === 'k' ? 5 : 1;
    let end = side === 'k' ? 7 : 4;
    for (let i = start; i < end; i++) {
      if (this.grid[rank][i].color !== undefined) {
        return false;
      }
    }
    return true;
  }

  sideAttacked(color, side) {
    let rank = color === 'w' ? 7 : 0;
    let sqs = side === 'k' ? [5,6] : [1,2,3];
    let enemyMoves = color === 'w' ? this.moves('b') : this.moves('w');
    for (let i = 0; i < enemyMoves.length; i++) {
      if (enemyMoves[i][0] == rank) {
        for (let j = 0; j < sqs.length; j++) {
          if (this.isSamePos(enemyMoves[i],[rank,sqs[j]])) return true;
        }
      }
    }
    return false;
  }

  isSamePos(a,b) {
    return a[0] === b[0] && a[1] === b[1];
  }

  dup() {
    let dup = new Board();
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const piece = this.grid[i][j];
        const newPiece = this.dupPiece(piece.color,piece.symbol,dup,[i,j]);
        dup.grid[i][j] = newPiece;
      }
    }
    return dup;
  }

  dupPiece(color,symbol,board,pos) {
    switch(symbol) {
      case 'k':
        return new King(color,pos,board);
      case 'q':
        return new Queen(color,pos,board);
      case 'r':
        return new Rook(color,pos,board);
      case 'n':
        return new Knight(color,pos,board);
      case 'b':
        return new Bishop(color,pos,board);
      case 'p':
        return new Pawn(color,pos,board);
      default:
        return new Piece(undefined); 
    }
  }

  moves(color) {
    const pieces = this.pieces(color);
    let moves = [];
    pieces.forEach(piece => {
      const pms = piece.moves();
      moves = moves.concat(pms);
    });
    return moves;
  }

  validMoves(color) {
    const pieces = this.pieces(color);
    let moves = [];
    pieces.forEach(piece => {
      const pieceMoves = piece.moves();
      const validPieceMoves = pieceMoves.filter(move => {
        return !this.movesIntoCheck(piece.pos, move);
      });
      moves = moves.concat(validPieceMoves);
    });
    return moves;
  }

  render() {
    console.log("");
    this.grid.forEach(row => {
      let str = row.map(e => e.symbol).join(" ");
      console.log(str);
    });
  }
}

module.exports = Board;