import { getGameOutcome, getPotentialLegalMoves, isKingInCheck, isKingInCheckmate, makeMove } from "./chess";
import { Board, GameOutcome, GameState, Move, PieceColour, Position } from "./chess.types";
import { initial } from "./data/gameState";

export default class ChessGame {
    private _gameState: GameState 

    constructor(initalState: GameState = initial() ) {
        this._gameState = initalState  
    }

    public potentialMoves(position: Position): Move[] {
        return getPotentialLegalMoves(this._gameState, position)
    }

    public makeMove(move: Move): GameState {
        return makeMove(this._gameState, move);
    } 

    public isKingInCheck(colour: PieceColour): boolean {
        return isKingInCheck(this._gameState, colour)
    }

    public isKingInCheckmate(colour: PieceColour): boolean {
        return isKingInCheckmate(this._gameState, colour)
    }

    public gameOutcome(): GameOutcome | null {
        return getGameOutcome(this._gameState);
    }

    public get gameState(): GameState {
        return this._gameState
    }

    public get currentTurn(): PieceColour {
        return this._gameState.currentTurn
    }

    public get  board(): Board {
        return this._gameState.board
    }

    public get moveHistory(): Move[] {
        return this._gameState.moveHistory
    }
}