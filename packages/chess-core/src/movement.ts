import {
  GameState,
  Move,
  PieceColour,
  PieceType,
  Position,
} from "./chess.types";
import { MovementStrategy, MovementStrategyMap } from "./movement.types";

export const mergeMovementStrategies = <T>(
  strategies: MovementStrategy<T>[],
): MovementStrategy<T> => {
  return (position, board) => {
    const moves: T[] = [];

    strategies.forEach((strategy) => {
      const newMoves = strategy(position, board);
      moves.push(...newMoves);
    });
    return moves;
  };
};

export const diagonalMovement: MovementStrategy<Move> = (
  gameState: GameState,
  position: Position,
) => {
  const board = gameState.board
  const { row, col } = position;
  const current = board[row][col];
  const moves: Move[] = [];

  if (!current) {
    return [];
  }

  const directions = [
    { row: 1, col: 1 },
    { row: 1, col: -1 },
    { row: -1, col: 1 },
    { row: -1, col: -1 },
  ];

  directions.forEach((direction) => {
    let newRow = row + direction.row;
    let newCol = col + direction.col;

    while (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
      const target = board[newRow][newCol];
      if (target) {
        if (target.colour !== current.colour) {
          moves.push({
            piece: current,
            from: { row: row, col: col },
            to: { row: newRow, col: newCol },
            capturedPiece: target,
          });
        }
        break;
      }
      moves.push({
        piece: current,
        from: { row: row, col: col },
        to: { row: newRow, col: newCol },
      });
      newRow += direction.row;
      newCol += direction.col;
    }
  });

  return moves;
};

export const diagonalAttackZone: MovementStrategy<Position> = (
  gameState: GameState,
  position: Position,
) => {
  const board = gameState.board
  const { row, col } = position;
  const current = board[row][col];
  const positions: Position[] = [];

  if (!current) {
    return [];
  }

  const directions = [
    { row: 1, col: 1 },
    { row: 1, col: -1 },
    { row: -1, col: 1 },
    { row: -1, col: -1 },
  ];

  directions.forEach((direction) => {
    let newRow = row + direction.row;
    let newCol = col + direction.col;

    while (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
      const target = board[newRow][newCol];
      if (target) {
        positions.push({ row: newRow, col: newCol });
        break;
      }
      positions.push({
        row: newRow, col: newCol
      });
      newRow += direction.row;
      newCol += direction.col;
    }
  });

  return positions;
};

export const linearMovement: MovementStrategy<Move> = (
  gameState: GameState,
  position: Position,
) => {
  const board = gameState.board
  const { row, col } = position;
  const current = board[row][col];
  const moves: Move[] = [];
  const directions = [
    { row: 1, col: 0 },
    { row: -1, col: 0 },
    { row: 0, col: 1 },
    { row: 0, col: -1 },
  ];

  if (!current) {
    return [];
  }

  directions.forEach((direction) => {
    let newRow = row + direction.row;
    let newCol = col + direction.col;

    while (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
      const target = board[newRow][newCol];
      if (target) {
        if (target.colour !== current.colour) {
          moves.push({
            piece: current,
            from: { row: row, col: col },
            to: { row: newRow, col: newCol },
            capturedPiece: target,
          });
        }
        break;
      }
      moves.push({
        piece: current,
        from: { row: row, col: col },
        to: { row: newRow, col: newCol },
      });
      newRow += direction.row;
      newCol += direction.col;
    }
  });

  return moves;
};

export const linearAttackZone: MovementStrategy<Position> = (
  gameState: GameState,
  position: Position,
) => {
  const board = gameState.board
  const { row, col } = position;
  const current = board[row][col];
  const positions: Position[] = [];
  const directions = [
    { row: 1, col: 0 },
    { row: -1, col: 0 },
    { row: 0, col: 1 },
    { row: 0, col: -1 },
  ];

  if (!current) {
    return [];
  }

  directions.forEach((direction) => {
    let newRow = row + direction.row;
    let newCol = col + direction.col;

    while (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
      const target = board[newRow][newCol];
      if (target) {
        positions.push({ row: newRow, col: newCol });
        break;
      }
      positions.push({ row: newRow, col: newCol });
      newRow += direction.row;
      newCol += direction.col;
    }
  });

  return positions;
};

export const knightMovement: MovementStrategy<Move> = (
  gameState: GameState,
  position: Position,
) => {
  const board = gameState.board
  const { row, col } = position;
  const moves: Move[] = [];
  const current = board[row][col];

  if (!current) return [];

  const directions = [
    { row: 2, col: 1 },
    { row: 2, col: -1 },
    { row: -2, col: 1 },
    { row: -2, col: -1 },
    { row: 1, col: 2 },
    { row: 1, col: -2 },
    { row: -1, col: 2 },
    { row: -1, col: -2 },
  ];

  directions.forEach((direction) => {
    const newRow = row + direction.row;
    const newCol = col + direction.col;

    if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
      const target = board[newRow][newCol];
      if (target) {
      if (target.colour !== current.colour) {
          moves.push({
            piece: current,
            from: { row: row, col: col },
            to: { row: newRow, col: newCol },
            capturedPiece: target,
          });
        }
      } else {
        moves.push({
          piece: current,
          from: { row: row, col: col },
          to: { row: newRow, col: newCol },
        });
      }
    }
  });

  return moves;
};

export const knightAttackZone: MovementStrategy<Position> = (
  gameState: GameState,
  position: Position,
) => {
  const board = gameState.board
  const { row, col } = position;
  const positions: Position[] = [];
  const current = board[row][col];

  if (!current) return [];

  const directions = [
    { row: 2, col: 1 },
    { row: 2, col: -1 },
    { row: -2, col: 1 },
    { row: -2, col: -1 },
    { row: 1, col: 2 },
    { row: 1, col: -2 },
    { row: -1, col: 2 },
    { row: -1, col: -2 },
  ];

  directions.forEach((direction) => {
    const newRow = row + direction.row;
    const newCol = col + direction.col;

    if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
      positions.push({ row: newRow, col: newCol });
    }
  });

  return positions;
};

export const pawnMovement: MovementStrategy<Move> = (
  gameState: GameState,
  position: Position,
) => {
  const board = gameState.board
  const { row, col } = position;
  const current = board[row][col];
  const moves: Move[] = [];

  if (!current) return [];

  const direction = current.colour === PieceColour.WHITE ? -1 : 1;

  let newRow = row + direction;
  const target = board[newRow][col];
  if (newRow >= 0 && newRow < 8 && !target) {
    const move: Move = {
      piece: current,
      from: { row: row, col: col },
      to: { row: newRow, col: col },
    }
    if (current.colour === PieceColour.WHITE && newRow === 0) {
      moves.push({...move, promotionType: {colour: current.colour, type: PieceType.BISHOP}})
      moves.push({...move, promotionType: {colour: current.colour, type: PieceType.KNIGHT}})
      moves.push({...move, promotionType: {colour: current.colour, type: PieceType.ROOK}})
      moves.push({...move, promotionType: {colour: current.colour, type: PieceType.QUEEN}})
    } else if (current.colour === PieceColour.BLACK && newRow === 7) {
      moves.push({...move, promotionType: {colour: current.colour, type: PieceType.BISHOP}})
      moves.push({...move, promotionType: {colour: current.colour, type: PieceType.KNIGHT}})
      moves.push({...move, promotionType: {colour: current.colour, type: PieceType.ROOK}})
      moves.push({...move, promotionType: {colour: current.colour, type: PieceType.QUEEN}})
    } else {
      moves.push(move);
    }
  }

  if (
    (row === 6 && current.colour === PieceColour.WHITE) ||
    (row === 1 && current.colour === PieceColour.BLACK)
  ) {
    newRow += direction;
    if (newRow >= 0 && newRow < 8 && !target) {
      moves.push({
        piece: current,
        from: { row: row, col: col },
        to: { row: newRow, col: col },
      });
    }
  }

  return moves;
};

export const pawnCapture: MovementStrategy<Move> = (
  gameState: GameState,
  position: Position,
) => {
  const board = gameState.board
  const { row, col } = position;
  const moves: Move[] = [];
  const current = board[row][col];

  if (!current) return [];

  const direction = current.colour === PieceColour.WHITE ? -1 : 1;

  const directions = [
    { row: direction, col: 1 },
    { row: direction, col: -1 },
  ];

  directions.forEach((direction) => {
    const newRow = row + direction.row;
    const newCol = col + direction.col;
    const target = board[newRow][newCol];
    if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
      if (target && target.colour !== current.colour) {
        const move: Move = {
          piece: current,
          from: { row: row, col: col },
          to: { row: newRow, col: newCol },
          capturedPiece: target,
        }
        if (current.colour === PieceColour.WHITE && newRow === 0) {
          moves.push({...move, promotionType: {colour: current.colour, type: PieceType.BISHOP}})
          moves.push({...move, promotionType: {colour: current.colour, type: PieceType.KNIGHT}})
          moves.push({...move, promotionType: {colour: current.colour, type: PieceType.ROOK}})
          moves.push({...move, promotionType: {colour: current.colour, type: PieceType.QUEEN}})
        } else if (current.colour === PieceColour.BLACK && newRow === 7) {
          moves.push({...move, promotionType: {colour: current.colour, type: PieceType.BISHOP}})
          moves.push({...move, promotionType: {colour: current.colour, type: PieceType.KNIGHT}})
          moves.push({...move, promotionType: {colour: current.colour, type: PieceType.ROOK}})
          moves.push({...move, promotionType: {colour: current.colour, type: PieceType.QUEEN}})
        } else {
          moves.push(move);
        }
      }
    }
  });
  return moves;
};

export const pawnEnPassant: MovementStrategy<Move> = (
  gameState: GameState,
  position: Position,
) => {
  const board = gameState.board
  const { row, col } = position;
  const current = board[row][col]
  const moves: Move[] = []
  const lastMove = gameState.moveHistory.at(-1)
  if (!lastMove) {
    return moves;
  }
  const isOppPawn = lastMove.piece.colour !== current.colour && lastMove.piece.type === PieceType.PAWN 
  const isDoubleStartMove = lastMove.from.row === (lastMove.piece.colour === PieceColour.WHITE ? 6 : 1 ) &&
  lastMove.to.row  === (lastMove.piece.colour === PieceColour.WHITE ? 4 : 3 )
  const isAdjacent = lastMove.to.row === row && (lastMove.to.col + 1 === col || lastMove.to.col - 1 === col)
  if (isOppPawn && isDoubleStartMove && isAdjacent) {
    moves.push({
      piece: current,
      from: position,
      to: { row: row + (current.colour === PieceColour.WHITE ? -1 : 1), col: lastMove.to.col},
      capturedPiece: lastMove.piece
    })
  }
  return moves
}

export const pawnAttackZone: MovementStrategy<Position> = (
  gameState: GameState,
  position: Position
) => {
  const board = gameState.board
  const { row, col } = position;
  const positions: Position[] = [];
  const current = board[row][col];

  if (!current) return [];

  const direction = current.colour === PieceColour.WHITE ? -1 : 1;

  const directions = [
    { row: direction, col: 1 },
    { row: direction, col: -1 },
  ];

  directions.forEach((direction) => {
    const newRow = row + direction.row;
    const newCol = col + direction.col;
    const target = board[newRow][newCol];
    if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
      if (target && target.colour !== target.colour) {
        positions.push({ row: newRow, col: newCol });
      } else {
        positions.push({ row: newRow, col: newCol })
      }
    }
  });

  return positions;
}

export const kingMovement: MovementStrategy<Move> = (
  gameState: GameState,
  coordingate: Position,
) => {
  const board = gameState.board
  const { row, col } = coordingate;
  const current = board[row][col];
  const moves: Move[] = [];

  if (!current) return [];

  const directions = [
    { row: 1, col: 0 },
    { row: -1, col: 0 },
    { row: 0, col: 1 },
    { row: 0, col: -1 },
    { row: 1, col: 1 },
    { row: 1, col: -1 },
    { row: -1, col: 1 },
    { row: -1, col: -1 },
  ];

  directions.forEach((direction) => {
    const newRow = row + direction.row;
    const newCol = col + direction.col;
    if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
      const target = board[newRow][newCol];
      if (target) {
        if (target.colour !== current.colour) {
          moves.push({
            piece: current,
            from: { row: row, col: col },
            to: { row: newRow, col: newCol },
            capturedPiece: target,
          });
        }
      } else {
        moves.push({
          piece: current,
          from: { row: row, col: col },
          to: { row: newRow, col: newCol },
        });
      }
    }
  });
  return moves;
};

export const kingAttackZone: MovementStrategy<Position> = (
  gameState: GameState,
  coordingate: Position,
) => {
  const board = gameState.board
  const { row, col } = coordingate;
  const current = board[row][col];
  const positions: Position[] = [];

  if (!current) return [];

  const directions = [
    { row: 1, col: 0 },
    { row: -1, col: 0 },
    { row: 0, col: 1 },
    { row: 0, col: -1 },
    { row: 1, col: 1 },
    { row: 1, col: -1 },
    { row: -1, col: 1 },
    { row: -1, col: -1 },
  ];

  directions.forEach((direction) => {
    const newRow = row + direction.row;
    const newCol = col + direction.col;
    if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
        positions.push({ row: newRow, col: newCol });
    }
  });
  return positions;
};

export const kingCastle: MovementStrategy<Move> = (
  gameState: GameState,
  position: Position,
) => {
  const board = gameState.board
  const { row, col } = position;
  const current = board[row][col];
  const moves: Move[] = [];

  if (!current) return [];

  const kingSideRook = board[row][7];
  const queenSideRook = board[row][0];

  const kingPriviledge = gameState.castlePrivileges[current.colour].kingSide
  const queenPriviledge = gameState.castlePrivileges[current.colour].queenSide

  if (
    kingSideRook &&
    current.colour === kingSideRook.colour &&
    kingPriviledge &&
    !board[row][5] &&
    !board[row][6]
  ) {
    moves.push({
      piece: current,
      from: position,
      to: { row, col: 6 },
      castle: true,
    });
  }

  if (
    queenSideRook &&
    current.colour === queenSideRook.colour &&
    queenPriviledge &&
    !board[row][1] &&
    !board[row][2] &&
    !board[row][3]
  ) {
    moves.push({
      piece: current,
      from: position,
      to: { row, col: 2 },
      castle: true,
    });
  }

  return moves;
};

export const movementStrategyMap: MovementStrategyMap<Move> = {
  [PieceType.PAWN]: mergeMovementStrategies<Move>([pawnMovement, pawnCapture]),
  [PieceType.ROOK]: linearMovement,
  [PieceType.KNIGHT]: knightMovement,
  [PieceType.BISHOP]: diagonalMovement,
  [PieceType.KING]: mergeMovementStrategies<Move>([kingMovement, kingCastle]),
  [PieceType.QUEEN]: mergeMovementStrategies<Move>([
    linearMovement,
    diagonalMovement,
  ]),
};

export const attackZoneStrategyMap: MovementStrategyMap<Position> = {
  [PieceType.PAWN]: pawnAttackZone,
  [PieceType.ROOK]: linearAttackZone,
  [PieceType.KNIGHT]: knightAttackZone,
  [PieceType.BISHOP]: diagonalAttackZone,
  [PieceType.KING]: kingAttackZone,
  [PieceType.QUEEN]: mergeMovementStrategies<Position>([
    linearAttackZone,
    diagonalAttackZone,
  ]),
}
