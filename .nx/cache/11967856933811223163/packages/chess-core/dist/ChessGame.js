"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chess_1 = require("./chess");
const gameState_1 = require("./data/gameState");
class ChessGame {
    constructor(initalState = (0, gameState_1.initial)()) {
        this._gameState = initalState;
    }
    potentialMoves(position) {
        return (0, chess_1.getPotentialLegalMoves)(this._gameState, position);
    }
    makeMove(move) {
        return (0, chess_1.makeMove)(this._gameState, move);
    }
    isKingInCheck(colour) {
        return (0, chess_1.isKingInCheck)(this._gameState, colour);
    }
    isKingInCheckmate(colour) {
        return (0, chess_1.isKingInCheckmate)(this._gameState, colour);
    }
    gameOutcome() {
        return (0, chess_1.getGameOutcome)(this._gameState);
    }
    get gameState() {
        return this._gameState;
    }
    get currentTurn() {
        return this._gameState.currentTurn;
    }
    get board() {
        return this._gameState.board;
    }
    get moveHistory() {
        return this._gameState.moveHistory;
    }
}
exports.default = ChessGame;
//# sourceMappingURL=ChessGame.js.map