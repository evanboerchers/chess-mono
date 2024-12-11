import { BoardSquare, GameOutcome, GameState, Move, Piece, PieceColour, PieceRecord, PieceType, Position } from "./chess.types"
import { attackZoneStrategyMap, movementStrategyMap } from "./movement"

export const copyGameState = (gameState: GameState): GameState => {
    return {
      ...gameState,
      board: gameState.board.map(row => row.slice()), 
      castlePrivileges: {                             
        [PieceColour.WHITE]: { ...gameState.castlePrivileges[PieceColour.WHITE] },
        [PieceColour.BLACK]: { ...gameState.castlePrivileges[PieceColour.BLACK] }
      },
      moveHistory: [...gameState.moveHistory]                 
    };
};

export const getBoardSquare = (gameState: GameState, position: Position): BoardSquare => {
    return gameState.board[position.row][position.col]
}

export const findPiece = (gameState: GameState, piece: Piece): Position[] => {
    const positions: Position[] = []
    gameState.board.forEach((row,i) => {
        row.forEach((current, j) => {
            if (current && current.colour === piece.colour && current.type === piece.type ) {
                positions.push({row: i, col: j})
            }
        })
    })
    return positions
}

export const getPieceRecord = (gameState: GameState): PieceRecord => {
    const record: PieceRecord = {
        [PieceColour.WHITE]: {},
        [PieceColour.BLACK]: {}
    }
    gameState.board.forEach((row,i) => {
        row.forEach((current, j) => {
            if (current) {
                const count = record[current.colour][current.type] || 0
                record[current.colour][current.type] = count + 1
            }
        })
    })
    return record
}

export const changeTurn = (gameState: GameState): GameState => {
    gameState.currentTurn = gameState.currentTurn === PieceColour.WHITE ? PieceColour.BLACK : PieceColour.WHITE  
    return gameState
}

export const getAttackZone = (gameState: GameState, position: Position): Position[] => {
    const piece = getBoardSquare(gameState, position)
    if (!piece) return [];
    const positions = attackZoneStrategyMap[piece.type](gameState, position)    
    return positions
}

export const getAttackZones = (gameState: GameState, colour: PieceColour): Position[] => {
    const positionsSet = new Set<string>(); // Use Set with a unique key for each position
    gameState.board.forEach((row, i) => {
        row.forEach((piece, j) => {
            if (piece && piece.colour === colour) {
                const attackZones = getAttackZone(gameState, { row: i, col: j });
                attackZones.forEach((pos) => {
                    positionsSet.add(`${pos.row},${pos.col}`); // Add unique key to Set
                });
            }
        });
    });
    return Array.from(positionsSet).map((key) => {
        const [row, col] = key.split(',').map(Number);
        return { row, col };
    });
};

export const isKingInCheck = (gameState: GameState, colour: PieceColour): boolean => {
    const kingPosition = findPiece(gameState, { type: PieceType.KING, colour})[0]
    const opponentColour = colour === PieceColour.WHITE ? PieceColour.BLACK : PieceColour.WHITE
    const attackPositions = getAttackZones(gameState, opponentColour)
    return attackPositions.some((position) => (position.row === kingPosition.row && position.col === kingPosition.col))
}

export const makeMove = (gameState: GameState, move: Move): GameState => {
    if (move.castle) { 
        gameState = castle(gameState, move)
        gameState = changeTurn(gameState)
        gameState = addMoveToHistory(gameState, move)
        return gameState
    }
    gameState = movePiece(gameState, move.from, move.to, move.promotionType)
    gameState = changeTurn(gameState)
    gameState = addMoveToHistory(gameState, move)
    return gameState
}

export const movePiece = (gameState: GameState, from: Position, to: Position, promotionType?: Piece) => {
    const piece =  getBoardSquare(gameState, from);
    gameState.board[from.row][from.col] = null;
    gameState.board[to.row][to.col] = piece || promotionType 
    return gameState
}

export const castle = (gameState: GameState, move: Move): GameState => {
    if (!move.castle) {
        throw Error("Not a castle move")
    }
    const king = move.piece
    if (move.to.col === 2) {
        const rookPosition = {row: move.from.row, col: 0}
        const rook = getBoardSquare(gameState, rookPosition)
        gameState.board[move.from.row][move.from.col] = null
        gameState.board[move.to.row][move.to.col] = king
        gameState.board[move.from.row][0] = null
        gameState.board[move.to.row][3] = rook
    } else if (move.to.col === 6) {
        const rookPosition = {row: move.from.row, col: 7}
        const rook = getBoardSquare(gameState, rookPosition)
        gameState.board[move.from.row][move.from.col] = null
        gameState.board[move.to.row][move.to.col] = king
        gameState.board[move.from.row][7] = null
        gameState.board[move.to.row][5] = rook
    }
    return gameState
}

export const addMoveToHistory = (gameState: GameState, move: Move): GameState => {
    gameState.moveHistory.push(move);
    return gameState
}
  
export const doesMoveCheckOwnKing = (gameState: GameState, move: Move): boolean => {
    const futureGameState = makeMove(copyGameState(gameState), move);
    return isKingInCheck(futureGameState, move.piece.colour);
} 

export const getPotentialLegalMoves = (gameState: GameState, position: Position): Move[] => {
    const piece = getBoardSquare(gameState, position)
    if (!piece) return [];
    const moves =  movementStrategyMap[piece.type](gameState, position)    
    return moves.filter(move => !doesMoveCheckOwnKing(gameState, move))
}

export const getAllPotentialLegalMoves = (gameState: GameState, colour: PieceColour): Move[] => {
    let moves: Move[] = []
    gameState.board.forEach((row, i) => {
        row.forEach((piece, j) => {
            if (piece && piece.colour === colour){
                moves = moves.concat(getPotentialLegalMoves(gameState, {row: i, col: j}))
            }
        })
    })
    return moves;
}

export const isKingInCheckmate = (gameState: GameState, colour: PieceColour): boolean => {
    if (!isKingInCheck(gameState, colour)) {
        return false
    }
    const moves = getAllPotentialLegalMoves(gameState, colour)
    if (moves.length > 0) {
        return false
    }
    return true
}

export const colourHasInsiffucientMaterial = (record: PieceRecord, colour: PieceColour): boolean => {
    const pieces = record[colour]
    const hasQueen = pieces[PieceType.QUEEN] > 0
    const hasRook = pieces[PieceType.ROOK] > 0
    const hasPawn = pieces[PieceType.PAWN] > 0
    const hasBishop = pieces[PieceType.BISHOP] > 0
    const hasBishops = pieces[PieceType.BISHOP] > 1
    const hasKnight = pieces[PieceType.KNIGHT] > 0
    const hasKnights = pieces[PieceType.KNIGHT] > 1
    if (!hasQueen && !hasRook && !hasBishops && !hasKnight && !hasPawn){
        return true
    }
    if (!hasQueen && !hasRook && !hasBishop && !hasKnights && !hasPawn){
        return true
    }
    return false
}

export const insufficentMaterial = (gameState: GameState): boolean => {
    const record  = getPieceRecord(gameState)
    const white = colourHasInsiffucientMaterial(record, PieceColour.WHITE);
    const black = colourHasInsiffucientMaterial(record, PieceColour.BLACK);
    return white && black
}

export const getGameOutcome = (gameState: GameState): GameOutcome | null => {
    if(isKingInCheckmate(gameState, PieceColour.BLACK)) {
        return GameOutcome.WHITE
    }
    if(isKingInCheckmate(gameState, PieceColour.WHITE)) {
        return GameOutcome.BLACK
    }
    if(getAllPotentialLegalMoves(gameState, gameState.currentTurn).length <= 0 || insufficentMaterial(gameState)) {
        return GameOutcome.DRAW
    }
    return null
}