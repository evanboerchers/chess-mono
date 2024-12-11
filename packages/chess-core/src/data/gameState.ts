import initialData from "@data/game-states/initial.json";
import { GameState } from "../chess.types";
import { copyGameState } from "../chess";

export const initial = (): GameState  => {
    const gameState= initialData as GameState;
    return copyGameState(gameState)
}
