export type BoardSquare = Piece | null;
export type Board = BoardSquare[][];
export declare enum PieceColour {
    WHITE = "white",
    BLACK = "black"
}
export declare enum PieceType {
    KING = "king",
    QUEEN = "queen",
    ROOK = "rook",
    BISHOP = "bishop",
    KNIGHT = "knight",
    PAWN = "pawn"
}
export interface Piece {
    colour: PieceColour;
    type: PieceType;
}
export type PieceRecord = {
    [color in PieceColour]: Partial<{
        [piece in PieceType]: number;
    }>;
};
export interface Position {
    row: number;
    col: number;
}
export interface Move {
    piece: Piece;
    from: Position;
    to: Position;
    capturedPiece?: Piece;
    promotionType?: Piece;
    castle?: boolean;
}
export interface ColourState {
    kingSide: boolean;
    queenSide: boolean;
}
export declare enum GameOutcome {
    WHITE = "white",
    BLACK = "black",
    DRAW = "draw"
}
export interface GameState {
    board: Board;
    currentTurn: PieceColour;
    castlePrivileges: {
        [PieceColour.WHITE]: ColourState;
        [PieceColour.BLACK]: ColourState;
    };
    moveHistory: Move[];
}
//# sourceMappingURL=chess.types.d.ts.map