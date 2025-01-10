"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initial = void 0;
const initial_json_1 = __importDefault(require("@data/game-states/initial.json"));
const chess_1 = require("../chess");
const initial = () => {
    const gameState = initial_json_1.default;
    return (0, chess_1.copyGameState)(gameState);
};
exports.initial = initial;
//# sourceMappingURL=gameState.js.map