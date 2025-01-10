import { Move, Position } from "./chess.types";
import { MovementStrategy, MovementStrategyMap } from "./movement.types";
export declare const mergeMovementStrategies: <T>(strategies: MovementStrategy<T>[]) => MovementStrategy<T>;
export declare const diagonalMovement: MovementStrategy<Move>;
export declare const diagonalAttackZone: MovementStrategy<Position>;
export declare const linearMovement: MovementStrategy<Move>;
export declare const linearAttackZone: MovementStrategy<Position>;
export declare const knightMovement: MovementStrategy<Move>;
export declare const knightAttackZone: MovementStrategy<Position>;
export declare const pawnMovement: MovementStrategy<Move>;
export declare const pawnCapture: MovementStrategy<Move>;
export declare const pawnEnPassant: MovementStrategy<Move>;
export declare const pawnAttackZone: MovementStrategy<Position>;
export declare const kingMovement: MovementStrategy<Move>;
export declare const kingAttackZone: MovementStrategy<Position>;
export declare const kingCastle: MovementStrategy<Move>;
export declare const movementStrategyMap: MovementStrategyMap<Move>;
export declare const attackZoneStrategyMap: MovementStrategyMap<Position>;
//# sourceMappingURL=movement.d.ts.map