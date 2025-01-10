import { Position, PieceType, GameState } from "./chess.types";
export type MovementStrategy<T> = (gameState: GameState, position: Position) => T[];
export type MovementStrategyMap<T> = {
    [key in PieceType]: MovementStrategy<T>;
};
//# sourceMappingURL=movement.types.d.ts.map