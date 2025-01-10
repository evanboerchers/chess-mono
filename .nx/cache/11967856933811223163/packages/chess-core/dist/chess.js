"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGameOutcome = exports.insufficentMaterial = exports.colourHasInsiffucientMaterial = exports.isKingInCheckmate = exports.getAllPotentialLegalMoves = exports.getPotentialLegalMoves = exports.doesMoveCheckOwnKing = exports.addMoveToHistory = exports.castle = exports.movePiece = exports.makeMove = exports.isKingInCheck = exports.getAttackZones = exports.getAttackZone = exports.changeTurn = exports.getPieceRecord = exports.findPiece = exports.getBoardSquare = exports.copyGameState = void 0;
const chess_types_1 = require("./chess.types");
const movement_1 = require("./movement");
const copyGameState = (gameState) => {
    return Object.assign(Object.assign({}, gameState), { board: gameState.board.map(row => row.slice()), castlePrivileges: {
            [chess_types_1.PieceColour.WHITE]: Object.assign({}, gameState.castlePrivileges[chess_types_1.PieceColour.WHITE]),
            [chess_types_1.PieceColour.BLACK]: Object.assign({}, gameState.castlePrivileges[chess_types_1.PieceColour.BLACK])
        }, moveHistory: [...gameState.moveHistory] });
};
exports.copyGameState = copyGameState;
const getBoardSquare = (gameState, position) => {
    return gameState.board[position.row][position.col];
};
exports.getBoardSquare = getBoardSquare;
const findPiece = (gameState, piece) => {
    const positions = [];
    gameState.board.forEach((row, i) => {
        row.forEach((current, j) => {
            if (current && current.colour === piece.colour && current.type === piece.type) {
                positions.push({ row: i, col: j });
            }
        });
    });
    return positions;
};
exports.findPiece = findPiece;
const getPieceRecord = (gameState) => {
    const record = {
        [chess_types_1.PieceColour.WHITE]: {},
        [chess_types_1.PieceColour.BLACK]: {}
    };
    gameState.board.forEach((row, i) => {
        row.forEach((current, j) => {
            if (current) {
                const count = record[current.colour][current.type] || 0;
                record[current.colour][current.type] = count + 1;
            }
        });
    });
    return record;
};
exports.getPieceRecord = getPieceRecord;
const changeTurn = (gameState) => {
    gameState.currentTurn = gameState.currentTurn === chess_types_1.PieceColour.WHITE ? chess_types_1.PieceColour.BLACK : chess_types_1.PieceColour.WHITE;
    return gameState;
};
exports.changeTurn = changeTurn;
const getAttackZone = (gameState, position) => {
    const piece = (0, exports.getBoardSquare)(gameState, position);
    if (!piece)
        return [];
    const positions = movement_1.attackZoneStrategyMap[piece.type](gameState, position);
    return positions;
};
exports.getAttackZone = getAttackZone;
const getAttackZones = (gameState, colour) => {
    const positionsSet = new Set(); // Use Set with a unique key for each position
    gameState.board.forEach((row, i) => {
        row.forEach((piece, j) => {
            if (piece && piece.colour === colour) {
                const attackZones = (0, exports.getAttackZone)(gameState, { row: i, col: j });
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
exports.getAttackZones = getAttackZones;
const isKingInCheck = (gameState, colour) => {
    const kingPosition = (0, exports.findPiece)(gameState, { type: chess_types_1.PieceType.KING, colour })[0];
    const opponentColour = colour === chess_types_1.PieceColour.WHITE ? chess_types_1.PieceColour.BLACK : chess_types_1.PieceColour.WHITE;
    const attackPositions = (0, exports.getAttackZones)(gameState, opponentColour);
    return attackPositions.some((position) => (position.row === kingPosition.row && position.col === kingPosition.col));
};
exports.isKingInCheck = isKingInCheck;
const makeMove = (gameState, move) => {
    if (move.castle) {
        gameState = (0, exports.castle)(gameState, move);
        gameState = (0, exports.changeTurn)(gameState);
        gameState = (0, exports.addMoveToHistory)(gameState, move);
        return gameState;
    }
    gameState = (0, exports.movePiece)(gameState, move.from, move.to, move.promotionType);
    gameState = (0, exports.changeTurn)(gameState);
    gameState = (0, exports.addMoveToHistory)(gameState, move);
    return gameState;
};
exports.makeMove = makeMove;
const movePiece = (gameState, from, to, promotionType) => {
    const piece = (0, exports.getBoardSquare)(gameState, from);
    gameState.board[from.row][from.col] = null;
    gameState.board[to.row][to.col] = piece || promotionType;
    return gameState;
};
exports.movePiece = movePiece;
const castle = (gameState, move) => {
    if (!move.castle) {
        throw Error("Not a castle move");
    }
    const king = move.piece;
    if (move.to.col === 2) {
        const rookPosition = { row: move.from.row, col: 0 };
        const rook = (0, exports.getBoardSquare)(gameState, rookPosition);
        gameState.board[move.from.row][move.from.col] = null;
        gameState.board[move.to.row][move.to.col] = king;
        gameState.board[move.from.row][0] = null;
        gameState.board[move.to.row][3] = rook;
    }
    else if (move.to.col === 6) {
        const rookPosition = { row: move.from.row, col: 7 };
        const rook = (0, exports.getBoardSquare)(gameState, rookPosition);
        gameState.board[move.from.row][move.from.col] = null;
        gameState.board[move.to.row][move.to.col] = king;
        gameState.board[move.from.row][7] = null;
        gameState.board[move.to.row][5] = rook;
    }
    return gameState;
};
exports.castle = castle;
const addMoveToHistory = (gameState, move) => {
    gameState.moveHistory.push(move);
    return gameState;
};
exports.addMoveToHistory = addMoveToHistory;
const doesMoveCheckOwnKing = (gameState, move) => {
    const futureGameState = (0, exports.makeMove)((0, exports.copyGameState)(gameState), move);
    return (0, exports.isKingInCheck)(futureGameState, move.piece.colour);
};
exports.doesMoveCheckOwnKing = doesMoveCheckOwnKing;
const getPotentialLegalMoves = (gameState, position) => {
    const piece = (0, exports.getBoardSquare)(gameState, position);
    if (!piece)
        return [];
    const moves = movement_1.movementStrategyMap[piece.type](gameState, position);
    return moves.filter(move => !(0, exports.doesMoveCheckOwnKing)(gameState, move));
};
exports.getPotentialLegalMoves = getPotentialLegalMoves;
const getAllPotentialLegalMoves = (gameState, colour) => {
    let moves = [];
    gameState.board.forEach((row, i) => {
        row.forEach((piece, j) => {
            if (piece && piece.colour === colour) {
                moves = moves.concat((0, exports.getPotentialLegalMoves)(gameState, { row: i, col: j }));
            }
        });
    });
    return moves;
};
exports.getAllPotentialLegalMoves = getAllPotentialLegalMoves;
const isKingInCheckmate = (gameState, colour) => {
    if (!(0, exports.isKingInCheck)(gameState, colour)) {
        return false;
    }
    const moves = (0, exports.getAllPotentialLegalMoves)(gameState, colour);
    if (moves.length > 0) {
        return false;
    }
    return true;
};
exports.isKingInCheckmate = isKingInCheckmate;
const colourHasInsiffucientMaterial = (record, colour) => {
    const pieces = record[colour];
    const hasQueen = pieces[chess_types_1.PieceType.QUEEN] > 0;
    const hasRook = pieces[chess_types_1.PieceType.ROOK] > 0;
    const hasPawn = pieces[chess_types_1.PieceType.PAWN] > 0;
    const hasBishop = pieces[chess_types_1.PieceType.BISHOP] > 0;
    const hasBishops = pieces[chess_types_1.PieceType.BISHOP] > 1;
    const hasKnight = pieces[chess_types_1.PieceType.KNIGHT] > 0;
    const hasKnights = pieces[chess_types_1.PieceType.KNIGHT] > 1;
    if (!hasQueen && !hasRook && !hasBishops && !hasKnight && !hasPawn) {
        return true;
    }
    if (!hasQueen && !hasRook && !hasBishop && !hasKnights && !hasPawn) {
        return true;
    }
    return false;
};
exports.colourHasInsiffucientMaterial = colourHasInsiffucientMaterial;
const insufficentMaterial = (gameState) => {
    const record = (0, exports.getPieceRecord)(gameState);
    const white = (0, exports.colourHasInsiffucientMaterial)(record, chess_types_1.PieceColour.WHITE);
    const black = (0, exports.colourHasInsiffucientMaterial)(record, chess_types_1.PieceColour.BLACK);
    return white && black;
};
exports.insufficentMaterial = insufficentMaterial;
const getGameOutcome = (gameState) => {
    if ((0, exports.isKingInCheckmate)(gameState, chess_types_1.PieceColour.BLACK)) {
        return chess_types_1.GameOutcome.WHITE;
    }
    if ((0, exports.isKingInCheckmate)(gameState, chess_types_1.PieceColour.WHITE)) {
        return chess_types_1.GameOutcome.BLACK;
    }
    if ((0, exports.getAllPotentialLegalMoves)(gameState, gameState.currentTurn).length <= 0 || (0, exports.insufficentMaterial)(gameState)) {
        return chess_types_1.GameOutcome.DRAW;
    }
    return null;
};
exports.getGameOutcome = getGameOutcome;
//# sourceMappingURL=chess.js.map