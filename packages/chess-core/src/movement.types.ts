import { Position, Move, PieceType, GameState } from "./chess.types";

export type MovementStrategy<T> = (gameState: GameState, position: Position ) => T[];

export type MovementStrategyMap<T> = {
  [key in PieceType]: MovementStrategy<T>;
};