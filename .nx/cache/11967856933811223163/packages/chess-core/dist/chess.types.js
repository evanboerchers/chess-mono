"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameOutcome = exports.PieceType = exports.PieceColour = void 0;
var PieceColour;
(function (PieceColour) {
    PieceColour["WHITE"] = "white";
    PieceColour["BLACK"] = "black";
})(PieceColour || (exports.PieceColour = PieceColour = {}));
var PieceType;
(function (PieceType) {
    PieceType["KING"] = "king";
    PieceType["QUEEN"] = "queen";
    PieceType["ROOK"] = "rook";
    PieceType["BISHOP"] = "bishop";
    PieceType["KNIGHT"] = "knight";
    PieceType["PAWN"] = "pawn";
})(PieceType || (exports.PieceType = PieceType = {}));
var GameOutcome;
(function (GameOutcome) {
    GameOutcome["WHITE"] = "white";
    GameOutcome["BLACK"] = "black";
    GameOutcome["DRAW"] = "draw";
})(GameOutcome || (exports.GameOutcome = GameOutcome = {}));
//# sourceMappingURL=chess.types.js.map