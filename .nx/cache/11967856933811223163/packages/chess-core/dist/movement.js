"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attackZoneStrategyMap = exports.movementStrategyMap = exports.kingCastle = exports.kingAttackZone = exports.kingMovement = exports.pawnAttackZone = exports.pawnEnPassant = exports.pawnCapture = exports.pawnMovement = exports.knightAttackZone = exports.knightMovement = exports.linearAttackZone = exports.linearMovement = exports.diagonalAttackZone = exports.diagonalMovement = exports.mergeMovementStrategies = void 0;
const chess_types_1 = require("./chess.types");
const mergeMovementStrategies = (strategies) => {
    return (position, board) => {
        const moves = [];
        strategies.forEach((strategy) => {
            const newMoves = strategy(position, board);
            moves.push(...newMoves);
        });
        return moves;
    };
};
exports.mergeMovementStrategies = mergeMovementStrategies;
const diagonalMovement = (gameState, position) => {
    const board = gameState.board;
    const { row, col } = position;
    const current = board[row][col];
    const moves = [];
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
exports.diagonalMovement = diagonalMovement;
const diagonalAttackZone = (gameState, position) => {
    const board = gameState.board;
    const { row, col } = position;
    const current = board[row][col];
    const positions = [];
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
exports.diagonalAttackZone = diagonalAttackZone;
const linearMovement = (gameState, position) => {
    const board = gameState.board;
    const { row, col } = position;
    const current = board[row][col];
    const moves = [];
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
exports.linearMovement = linearMovement;
const linearAttackZone = (gameState, position) => {
    const board = gameState.board;
    const { row, col } = position;
    const current = board[row][col];
    const positions = [];
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
exports.linearAttackZone = linearAttackZone;
const knightMovement = (gameState, position) => {
    const board = gameState.board;
    const { row, col } = position;
    const moves = [];
    const current = board[row][col];
    if (!current)
        return [];
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
            }
            else {
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
exports.knightMovement = knightMovement;
const knightAttackZone = (gameState, position) => {
    const board = gameState.board;
    const { row, col } = position;
    const positions = [];
    const current = board[row][col];
    if (!current)
        return [];
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
exports.knightAttackZone = knightAttackZone;
const pawnMovement = (gameState, position) => {
    const board = gameState.board;
    const { row, col } = position;
    const current = board[row][col];
    const moves = [];
    if (!current)
        return [];
    const direction = current.colour === chess_types_1.PieceColour.WHITE ? -1 : 1;
    let newRow = row + direction;
    const target = board[newRow][col];
    if (newRow >= 0 && newRow < 8 && !target) {
        const move = {
            piece: current,
            from: { row: row, col: col },
            to: { row: newRow, col: col },
        };
        if (current.colour === chess_types_1.PieceColour.WHITE && newRow === 0) {
            moves.push(Object.assign(Object.assign({}, move), { promotionType: { colour: current.colour, type: chess_types_1.PieceType.BISHOP } }));
            moves.push(Object.assign(Object.assign({}, move), { promotionType: { colour: current.colour, type: chess_types_1.PieceType.KNIGHT } }));
            moves.push(Object.assign(Object.assign({}, move), { promotionType: { colour: current.colour, type: chess_types_1.PieceType.ROOK } }));
            moves.push(Object.assign(Object.assign({}, move), { promotionType: { colour: current.colour, type: chess_types_1.PieceType.QUEEN } }));
        }
        else if (current.colour === chess_types_1.PieceColour.BLACK && newRow === 7) {
            moves.push(Object.assign(Object.assign({}, move), { promotionType: { colour: current.colour, type: chess_types_1.PieceType.BISHOP } }));
            moves.push(Object.assign(Object.assign({}, move), { promotionType: { colour: current.colour, type: chess_types_1.PieceType.KNIGHT } }));
            moves.push(Object.assign(Object.assign({}, move), { promotionType: { colour: current.colour, type: chess_types_1.PieceType.ROOK } }));
            moves.push(Object.assign(Object.assign({}, move), { promotionType: { colour: current.colour, type: chess_types_1.PieceType.QUEEN } }));
        }
        else {
            moves.push(move);
        }
    }
    if ((row === 6 && current.colour === chess_types_1.PieceColour.WHITE) ||
        (row === 1 && current.colour === chess_types_1.PieceColour.BLACK)) {
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
exports.pawnMovement = pawnMovement;
const pawnCapture = (gameState, position) => {
    const board = gameState.board;
    const { row, col } = position;
    const moves = [];
    const current = board[row][col];
    if (!current)
        return [];
    const direction = current.colour === chess_types_1.PieceColour.WHITE ? -1 : 1;
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
                const move = {
                    piece: current,
                    from: { row: row, col: col },
                    to: { row: newRow, col: newCol },
                    capturedPiece: target,
                };
                if (current.colour === chess_types_1.PieceColour.WHITE && newRow === 0) {
                    moves.push(Object.assign(Object.assign({}, move), { promotionType: { colour: current.colour, type: chess_types_1.PieceType.BISHOP } }));
                    moves.push(Object.assign(Object.assign({}, move), { promotionType: { colour: current.colour, type: chess_types_1.PieceType.KNIGHT } }));
                    moves.push(Object.assign(Object.assign({}, move), { promotionType: { colour: current.colour, type: chess_types_1.PieceType.ROOK } }));
                    moves.push(Object.assign(Object.assign({}, move), { promotionType: { colour: current.colour, type: chess_types_1.PieceType.QUEEN } }));
                }
                else if (current.colour === chess_types_1.PieceColour.BLACK && newRow === 7) {
                    moves.push(Object.assign(Object.assign({}, move), { promotionType: { colour: current.colour, type: chess_types_1.PieceType.BISHOP } }));
                    moves.push(Object.assign(Object.assign({}, move), { promotionType: { colour: current.colour, type: chess_types_1.PieceType.KNIGHT } }));
                    moves.push(Object.assign(Object.assign({}, move), { promotionType: { colour: current.colour, type: chess_types_1.PieceType.ROOK } }));
                    moves.push(Object.assign(Object.assign({}, move), { promotionType: { colour: current.colour, type: chess_types_1.PieceType.QUEEN } }));
                }
                else {
                    moves.push(move);
                }
            }
        }
    });
    return moves;
};
exports.pawnCapture = pawnCapture;
const pawnEnPassant = (gameState, position) => {
    const board = gameState.board;
    const { row, col } = position;
    const current = board[row][col];
    const moves = [];
    const lastMove = gameState.moveHistory.at(-1);
    if (!lastMove) {
        return moves;
    }
    const isOppPawn = lastMove.piece.colour !== current.colour && lastMove.piece.type === chess_types_1.PieceType.PAWN;
    const isDoubleStartMove = lastMove.from.row === (lastMove.piece.colour === chess_types_1.PieceColour.WHITE ? 6 : 1) &&
        lastMove.to.row === (lastMove.piece.colour === chess_types_1.PieceColour.WHITE ? 4 : 3);
    const isAdjacent = lastMove.to.row === row && (lastMove.to.col + 1 === col || lastMove.to.col - 1 === col);
    if (isOppPawn && isDoubleStartMove && isAdjacent) {
        moves.push({
            piece: current,
            from: position,
            to: { row: row + (current.colour === chess_types_1.PieceColour.WHITE ? -1 : 1), col: lastMove.to.col },
            capturedPiece: lastMove.piece
        });
    }
    return moves;
};
exports.pawnEnPassant = pawnEnPassant;
const pawnAttackZone = (gameState, position) => {
    const board = gameState.board;
    const { row, col } = position;
    const positions = [];
    const current = board[row][col];
    if (!current)
        return [];
    const direction = current.colour === chess_types_1.PieceColour.WHITE ? -1 : 1;
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
            }
            else {
                positions.push({ row: newRow, col: newCol });
            }
        }
    });
    return positions;
};
exports.pawnAttackZone = pawnAttackZone;
const kingMovement = (gameState, coordingate) => {
    const board = gameState.board;
    const { row, col } = coordingate;
    const current = board[row][col];
    const moves = [];
    if (!current)
        return [];
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
            }
            else {
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
exports.kingMovement = kingMovement;
const kingAttackZone = (gameState, coordingate) => {
    const board = gameState.board;
    const { row, col } = coordingate;
    const current = board[row][col];
    const positions = [];
    if (!current)
        return [];
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
exports.kingAttackZone = kingAttackZone;
const kingCastle = (gameState, position) => {
    const board = gameState.board;
    const { row, col } = position;
    const current = board[row][col];
    const moves = [];
    if (!current)
        return [];
    const kingSideRook = board[row][7];
    const queenSideRook = board[row][0];
    const kingPriviledge = gameState.castlePrivileges[current.colour].kingSide;
    const queenPriviledge = gameState.castlePrivileges[current.colour].queenSide;
    if (kingSideRook &&
        current.colour === kingSideRook.colour &&
        kingPriviledge &&
        !board[row][5] &&
        !board[row][6]) {
        moves.push({
            piece: current,
            from: position,
            to: { row, col: 6 },
            castle: true,
        });
    }
    if (queenSideRook &&
        current.colour === queenSideRook.colour &&
        queenPriviledge &&
        !board[row][1] &&
        !board[row][2] &&
        !board[row][3]) {
        moves.push({
            piece: current,
            from: position,
            to: { row, col: 2 },
            castle: true,
        });
    }
    return moves;
};
exports.kingCastle = kingCastle;
exports.movementStrategyMap = {
    [chess_types_1.PieceType.PAWN]: (0, exports.mergeMovementStrategies)([exports.pawnMovement, exports.pawnCapture]),
    [chess_types_1.PieceType.ROOK]: exports.linearMovement,
    [chess_types_1.PieceType.KNIGHT]: exports.knightMovement,
    [chess_types_1.PieceType.BISHOP]: exports.diagonalMovement,
    [chess_types_1.PieceType.KING]: (0, exports.mergeMovementStrategies)([exports.kingMovement, exports.kingCastle]),
    [chess_types_1.PieceType.QUEEN]: (0, exports.mergeMovementStrategies)([
        exports.linearMovement,
        exports.diagonalMovement,
    ]),
};
exports.attackZoneStrategyMap = {
    [chess_types_1.PieceType.PAWN]: exports.pawnAttackZone,
    [chess_types_1.PieceType.ROOK]: exports.linearAttackZone,
    [chess_types_1.PieceType.KNIGHT]: exports.knightAttackZone,
    [chess_types_1.PieceType.BISHOP]: exports.diagonalAttackZone,
    [chess_types_1.PieceType.KING]: exports.kingAttackZone,
    [chess_types_1.PieceType.QUEEN]: (0, exports.mergeMovementStrategies)([
        exports.linearAttackZone,
        exports.diagonalAttackZone,
    ]),
};
//# sourceMappingURL=movement.js.map