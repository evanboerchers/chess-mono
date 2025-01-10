import { Board, GameOutcome, GameState, Move, PieceColour, Position } from "./chess.types";
export default class ChessGame {
    private _gameState;
    constructor(initalState?: GameState);
    potentialMoves(position: Position): Move[];
    makeMove(move: Move): GameState;
    isKingInCheck(colour: PieceColour): boolean;
    isKingInCheckmate(colour: PieceColour): boolean;
    gameOutcome(): GameOutcome | null;
    get gameState(): GameState;
    get currentTurn(): PieceColour;
    get board(): Board;
    get moveHistory(): Move[];
}
//# sourceMappingURL=ChessGame.d.ts.map