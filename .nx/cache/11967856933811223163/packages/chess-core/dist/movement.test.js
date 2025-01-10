"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chess_types_1 = require("./chess.types");
const movement_1 = require("./movement");
const gameState_1 = require("./data/gameState");
describe("movement tests", () => {
    describe("diagonal", () => {
        describe("diagonalMovement", () => {
            test("should give all moves on lines", () => {
                const gameState = (0, gameState_1.initial)();
                const piece = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.BISHOP };
                gameState.board = [
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, piece, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                ];
                const position = { row: 4, col: 4 };
                const expected = [
                    { piece, from: position, to: { row: 3, col: 3 } },
                    { piece, from: position, to: { row: 2, col: 2 } },
                    { piece, from: position, to: { row: 1, col: 1 } },
                    { piece, from: position, to: { row: 0, col: 0 } },
                    { piece, from: position, to: { row: 5, col: 5 } },
                    { piece, from: position, to: { row: 6, col: 6 } },
                    { piece, from: position, to: { row: 7, col: 7 } },
                    { piece, from: position, to: { row: 3, col: 5 } },
                    { piece, from: position, to: { row: 2, col: 6 } },
                    { piece, from: position, to: { row: 1, col: 7 } },
                    { piece, from: position, to: { row: 5, col: 3 } },
                    { piece, from: position, to: { row: 6, col: 2 } },
                    { piece, from: position, to: { row: 7, col: 1 } }
                ];
                const actual = (0, movement_1.diagonalMovement)(gameState, position);
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            });
            test("should give piece captures on lines ", () => {
                const gameState = (0, gameState_1.initial)();
                const piece = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.BISHOP };
                const oppPiece = { colour: chess_types_1.PieceColour.BLACK, type: chess_types_1.PieceType.KNIGHT };
                gameState.board = [
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, oppPiece, null, null, null, oppPiece, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, piece, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, oppPiece, null, null, null, oppPiece, null],
                    [null, null, null, null, null, null, null, null],
                ];
                const position = { row: 4, col: 4 };
                const expected = [
                    { piece, from: position, to: { row: 2, col: 2 }, capturedPiece: oppPiece },
                    { piece, from: position, to: { row: 3, col: 3 } },
                    { piece, from: position, to: { row: 5, col: 5 } },
                    { piece, from: position, to: { row: 6, col: 6 }, capturedPiece: oppPiece },
                    { piece, from: position, to: { row: 3, col: 5 } },
                    { piece, from: position, to: { row: 2, col: 6 }, capturedPiece: oppPiece },
                    { piece, from: position, to: { row: 5, col: 3 } },
                    { piece, from: position, to: { row: 6, col: 2 }, capturedPiece: oppPiece }
                ];
                const actual = (0, movement_1.diagonalMovement)(gameState, position);
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            });
            test("should give moves until blocked by own pieces ", () => {
                const gameState = (0, gameState_1.initial)();
                const piece = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.BISHOP };
                gameState.board = [
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, piece, null, null, null, piece, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, piece, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, piece, null, null, null, piece, null],
                    [null, null, null, null, null, null, null, null],
                ];
                const position = { row: 4, col: 4 };
                const expected = [
                    { piece, from: position, to: { row: 3, col: 3 } },
                    { piece, from: position, to: { row: 5, col: 5 } },
                    { piece, from: position, to: { row: 3, col: 5 } },
                    { piece, from: position, to: { row: 5, col: 3 } },
                ];
                const actual = (0, movement_1.diagonalMovement)(gameState, position);
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            });
        });
        describe("diagonalAttackZone", () => {
            test("should give all positions on lines", () => {
                const gameState = (0, gameState_1.initial)();
                const piece = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.BISHOP };
                gameState.board = [
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, piece, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                ];
                const position = { row: 4, col: 4 };
                const expected = [
                    { row: 3, col: 3 },
                    { row: 2, col: 2 },
                    { row: 1, col: 1 },
                    { row: 0, col: 0 },
                    { row: 5, col: 5 },
                    { row: 6, col: 6 },
                    { row: 7, col: 7 },
                    { row: 3, col: 5 },
                    { row: 2, col: 6 },
                    { row: 1, col: 7 },
                    { row: 5, col: 3 },
                    { row: 6, col: 2 },
                    { row: 7, col: 1 }
                ];
                const actual = (0, movement_1.diagonalAttackZone)(gameState, position);
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            });
            test("should give position on lines up to and including captures", () => {
                const gameState = (0, gameState_1.initial)();
                const piece = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.BISHOP };
                const oppPiece = { colour: chess_types_1.PieceColour.BLACK, type: chess_types_1.PieceType.KNIGHT };
                gameState.board = [
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, oppPiece, null, null, null, oppPiece, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, piece, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, oppPiece, null, null, null, oppPiece, null],
                    [null, null, null, null, null, null, null, null],
                ];
                const position = { row: 4, col: 4 };
                const expected = [
                    { row: 2, col: 2 },
                    { row: 3, col: 3 },
                    { row: 5, col: 5 },
                    { row: 6, col: 6 },
                    { row: 3, col: 5 },
                    { row: 2, col: 6 },
                    { row: 5, col: 3 },
                    { row: 6, col: 2 }
                ];
                const actual = (0, movement_1.diagonalAttackZone)(gameState, position);
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            });
            test("should give moves on lines up to and including guarded pieces ", () => {
                const gameState = (0, gameState_1.initial)();
                const piece = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.BISHOP };
                gameState.board = [
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, piece, null, null, null, piece, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, piece, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, piece, null, null, null, piece, null],
                    [null, null, null, null, null, null, null, null],
                ];
                const position = { row: 4, col: 4 };
                const expected = [
                    { row: 2, col: 2 },
                    { row: 3, col: 3 },
                    { row: 5, col: 5 },
                    { row: 6, col: 6 },
                    { row: 3, col: 5 },
                    { row: 2, col: 6 },
                    { row: 5, col: 3 },
                    { row: 6, col: 2 }
                ];
                const actual = (0, movement_1.diagonalAttackZone)(gameState, position);
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            });
        });
    });
    describe("linear", () => {
        describe("linearMovement", () => {
            test("should give all moves on lines", () => {
                const gameState = (0, gameState_1.initial)();
                const piece = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.BISHOP };
                gameState.board = [
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, piece, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                ];
                const position = { row: 4, col: 4 };
                const expected = [
                    { piece, from: position, to: { row: 4, col: 0 } },
                    { piece, from: position, to: { row: 4, col: 1 } },
                    { piece, from: position, to: { row: 4, col: 2 } },
                    { piece, from: position, to: { row: 4, col: 3 } },
                    { piece, from: position, to: { row: 4, col: 5 } },
                    { piece, from: position, to: { row: 4, col: 6 } },
                    { piece, from: position, to: { row: 4, col: 7 } },
                    { piece, from: position, to: { row: 0, col: 4 } },
                    { piece, from: position, to: { row: 1, col: 4 } },
                    { piece, from: position, to: { row: 2, col: 4 } },
                    { piece, from: position, to: { row: 3, col: 4 } },
                    { piece, from: position, to: { row: 5, col: 4 } },
                    { piece, from: position, to: { row: 6, col: 4 } },
                    { piece, from: position, to: { row: 7, col: 4 } },
                ];
                const actual = (0, movement_1.linearMovement)(gameState, position);
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            });
            test("should give piece captures on lines ", () => {
                const gameState = (0, gameState_1.initial)();
                const piece = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.BISHOP };
                const oppPiece = { colour: chess_types_1.PieceColour.BLACK, type: chess_types_1.PieceType.KNIGHT };
                gameState.board = [
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, oppPiece, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, oppPiece, null, piece, null, oppPiece, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, oppPiece, null, null, null],
                    [null, null, null, null, null, null, null, null],
                ];
                const position = { row: 4, col: 4 };
                const expected = [
                    { piece, from: position, to: { row: 4, col: 2 }, capturedPiece: oppPiece },
                    { piece, from: position, to: { row: 4, col: 3 } },
                    { piece, from: position, to: { row: 4, col: 5 } },
                    { piece, from: position, to: { row: 4, col: 6 }, capturedPiece: oppPiece },
                    { piece, from: position, to: { row: 2, col: 4 }, capturedPiece: oppPiece },
                    { piece, from: position, to: { row: 3, col: 4 } },
                    { piece, from: position, to: { row: 5, col: 4 } },
                    { piece, from: position, to: { row: 6, col: 4 }, capturedPiece: oppPiece },
                ];
                const actual = (0, movement_1.linearMovement)(gameState, position);
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            });
            test("should give moves until blocked by own pieces ", () => {
                const gameState = (0, gameState_1.initial)();
                const piece = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.BISHOP };
                gameState.board = [
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, piece, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, piece, null, piece, null, piece, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, piece, null, null, null],
                    [null, null, null, null, null, null, null, null],
                ];
                const position = { row: 4, col: 4 };
                const expected = [
                    { piece, from: position, to: { row: 3, col: 4 } },
                    { piece, from: position, to: { row: 5, col: 4 } },
                    { piece, from: position, to: { row: 4, col: 5 } },
                    { piece, from: position, to: { row: 4, col: 3 } },
                ];
                const actual = (0, movement_1.linearMovement)(gameState, position);
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            });
        });
        describe("linearAttackZone", () => {
            test("should give all positions on lines", () => {
                const gameState = (0, gameState_1.initial)();
                const piece = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.BISHOP };
                gameState.board = [
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, piece, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                ];
                const position = { row: 4, col: 4 };
                const expected = [
                    { row: 4, col: 0 },
                    { row: 4, col: 1 },
                    { row: 4, col: 2 },
                    { row: 4, col: 3 },
                    { row: 4, col: 5 },
                    { row: 4, col: 6 },
                    { row: 4, col: 7 },
                    { row: 0, col: 4 },
                    { row: 1, col: 4 },
                    { row: 2, col: 4 },
                    { row: 3, col: 4 },
                    { row: 5, col: 4 },
                    { row: 6, col: 4 },
                    { row: 7, col: 4 },
                ];
                const actual = (0, movement_1.linearAttackZone)(gameState, position);
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            });
            test("should give piece position upto an including opponent pieces ", () => {
                const gameState = (0, gameState_1.initial)();
                const piece = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.BISHOP };
                const oppPiece = { colour: chess_types_1.PieceColour.BLACK, type: chess_types_1.PieceType.KNIGHT };
                gameState.board = [
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, oppPiece, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, oppPiece, null, piece, null, oppPiece, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, oppPiece, null, null, null],
                    [null, null, null, null, null, null, null, null],
                ];
                const position = { row: 4, col: 4 };
                const expected = [
                    { row: 4, col: 2 },
                    { row: 4, col: 3 },
                    { row: 4, col: 5 },
                    { row: 4, col: 6 },
                    { row: 2, col: 4 },
                    { row: 3, col: 4 },
                    { row: 5, col: 4 },
                    { row: 6, col: 4 },
                ];
                const actual = (0, movement_1.linearAttackZone)(gameState, position);
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            });
            test("should give moves until blocked by own pieces ", () => {
                const gameState = (0, gameState_1.initial)();
                const piece = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.BISHOP };
                gameState.board = [
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, piece, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, piece, null, piece, null, piece, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, piece, null, null, null],
                    [null, null, null, null, null, null, null, null],
                ];
                const position = { row: 4, col: 4 };
                const expected = [
                    { row: 2, col: 4 },
                    { row: 3, col: 4 },
                    { row: 5, col: 4 },
                    { row: 6, col: 4 },
                    { row: 4, col: 6 },
                    { row: 4, col: 5 },
                    { row: 4, col: 3 },
                    { row: 4, col: 2 },
                ];
                const actual = (0, movement_1.linearAttackZone)(gameState, position);
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            });
        });
    });
    describe("knight", () => {
        describe("knightMovement", () => {
            test("should give all moves", () => {
                const gameState = (0, gameState_1.initial)();
                const piece = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.KNIGHT };
                gameState.board = [
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, piece, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                ];
                const position = { row: 4, col: 4 };
                const expected = [
                    { piece, from: position, to: { row: 2, col: 3 } },
                    { piece, from: position, to: { row: 2, col: 5 } },
                    { piece, from: position, to: { row: 3, col: 2 } },
                    { piece, from: position, to: { row: 5, col: 2 } },
                    { piece, from: position, to: { row: 6, col: 3 } },
                    { piece, from: position, to: { row: 6, col: 5 } },
                    { piece, from: position, to: { row: 3, col: 6 } },
                    { piece, from: position, to: { row: 5, col: 6 } },
                ];
                const actual = (0, movement_1.knightMovement)(gameState, position);
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            });
            test("should give all piece captures ", () => {
                const gameState = (0, gameState_1.initial)();
                const piece = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.KNIGHT };
                const oppPiece = { colour: chess_types_1.PieceColour.BLACK, type: chess_types_1.PieceType.KNIGHT };
                gameState.board = [
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, oppPiece, null, oppPiece, null, null],
                    [null, null, oppPiece, null, null, null, oppPiece, null],
                    [null, null, null, null, piece, null, null, null],
                    [null, null, oppPiece, null, null, null, oppPiece, null],
                    [null, null, null, oppPiece, null, oppPiece, null, null],
                    [null, null, null, null, null, null, null, null],
                ];
                const position = { row: 4, col: 4 };
                const expected = [
                    { piece, from: position, to: { row: 2, col: 3 }, capturedPiece: oppPiece },
                    { piece, from: position, to: { row: 2, col: 5 }, capturedPiece: oppPiece },
                    { piece, from: position, to: { row: 3, col: 2 }, capturedPiece: oppPiece },
                    { piece, from: position, to: { row: 5, col: 2 }, capturedPiece: oppPiece },
                    { piece, from: position, to: { row: 6, col: 3 }, capturedPiece: oppPiece },
                    { piece, from: position, to: { row: 6, col: 5 }, capturedPiece: oppPiece },
                    { piece, from: position, to: { row: 3, col: 6 }, capturedPiece: oppPiece },
                    { piece, from: position, to: { row: 5, col: 6 }, capturedPiece: oppPiece },
                ];
                const actual = (0, movement_1.knightMovement)(gameState, position);
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            });
            test("should give moves until blocked by own pieces ", () => {
                const gameState = (0, gameState_1.initial)();
                const piece = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.KNIGHT };
                gameState.board = [
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, piece, null, piece, null, null],
                    [null, null, piece, null, null, null, piece, null],
                    [null, null, null, null, piece, null, null, null],
                    [null, null, piece, null, null, null, piece, null],
                    [null, null, null, piece, null, piece, null, null],
                    [null, null, null, null, null, null, null, null],
                ];
                const position = { row: 4, col: 4 };
                const expected = [];
                const actual = (0, movement_1.knightMovement)(gameState, position);
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            });
        });
        describe("kinghtAttackZone", () => {
            test("should give all positions", () => {
                const gameState = (0, gameState_1.initial)();
                const piece = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.BISHOP };
                gameState.board = [
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, piece, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                ];
                const position = { row: 4, col: 4 };
                const expected = [
                    { row: 2, col: 3 },
                    { row: 2, col: 5 },
                    { row: 3, col: 2 },
                    { row: 5, col: 2 },
                    { row: 6, col: 3 },
                    { row: 6, col: 5 },
                    { row: 3, col: 6 },
                    { row: 5, col: 6 },
                ];
                const actual = (0, movement_1.knightAttackZone)(gameState, position);
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            });
            test("should give all positions including those with opponent pieces ", () => {
                const gameState = (0, gameState_1.initial)();
                const piece = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.KNIGHT };
                const oppPiece = { colour: chess_types_1.PieceColour.BLACK, type: chess_types_1.PieceType.KNIGHT };
                gameState.board = [
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, oppPiece, null, oppPiece, null, null],
                    [null, null, oppPiece, null, null, null, oppPiece, null],
                    [null, null, null, null, piece, null, null, null],
                    [null, null, oppPiece, null, null, null, oppPiece, null],
                    [null, null, null, oppPiece, null, oppPiece, null, null],
                    [null, null, null, null, null, null, null, null],
                ];
                const position = { row: 4, col: 4 };
                const expected = [
                    { row: 2, col: 3 },
                    { row: 2, col: 5 },
                    { row: 3, col: 2 },
                    { row: 5, col: 2 },
                    { row: 6, col: 3 },
                    { row: 6, col: 5 },
                    { row: 3, col: 6 },
                    { row: 5, col: 6 },
                ];
                const actual = (0, movement_1.knightAttackZone)(gameState, position);
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            });
            test("should give moves until blocked by own pieces ", () => {
                const gameState = (0, gameState_1.initial)();
                const piece = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.KNIGHT };
                gameState.board = [
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, piece, null, piece, null, null],
                    [null, null, piece, null, null, null, piece, null],
                    [null, null, null, null, piece, null, null, null],
                    [null, null, piece, null, null, null, piece, null],
                    [null, null, null, piece, null, piece, null, null],
                    [null, null, null, null, null, null, null, null],
                ];
                const position = { row: 4, col: 4 };
                const expected = [
                    { row: 2, col: 3 },
                    { row: 2, col: 5 },
                    { row: 3, col: 2 },
                    { row: 5, col: 2 },
                    { row: 6, col: 3 },
                    { row: 6, col: 5 },
                    { row: 3, col: 6 },
                    { row: 5, col: 6 },
                ];
                const actual = (0, movement_1.knightAttackZone)(gameState, position);
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            });
        });
    });
    describe("pawn", () => {
        describe("pawnMovement", () => {
            test("should give a white forward move up the board", () => {
                const gameState = (0, gameState_1.initial)();
                const piece = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.PAWN };
                gameState.board = [
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, piece, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                ];
                const position = { row: 4, col: 4 };
                const expected = [
                    { piece, from: position, to: { row: 3, col: 4 } },
                ];
                const actual = (0, movement_1.pawnMovement)(gameState, position);
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            });
            test("should give a white starting double forward move up the board", () => {
                const gameState = (0, gameState_1.initial)();
                const piece = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.PAWN };
                gameState.board = [
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, piece, null, null, null],
                    [null, null, null, null, null, null, null, null],
                ];
                const position = { row: 6, col: 4 };
                const expected = [
                    { piece, from: position, to: { row: 4, col: 4 } },
                    { piece, from: position, to: { row: 5, col: 4 } },
                ];
                const actual = (0, movement_1.pawnMovement)(gameState, position);
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            });
            test("should give a black forward move down the board", () => {
                const gameState = (0, gameState_1.initial)();
                const piece = { colour: chess_types_1.PieceColour.BLACK, type: chess_types_1.PieceType.PAWN };
                gameState.board = [
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, piece, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                ];
                const position = { row: 4, col: 4 };
                const expected = [
                    { piece, from: position, to: { row: 5, col: 4 } },
                ];
                const actual = (0, movement_1.pawnMovement)(gameState, position);
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            });
            test("should give a black starting double forward move up the board", () => {
                const gameState = (0, gameState_1.initial)();
                const piece = { colour: chess_types_1.PieceColour.BLACK, type: chess_types_1.PieceType.PAWN };
                gameState.board = [
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, piece, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                ];
                const position = { row: 1, col: 4 };
                const expected = [
                    { piece, from: position, to: { row: 2, col: 4 } },
                    { piece, from: position, to: { row: 3, col: 4 } },
                ];
                const actual = (0, movement_1.pawnMovement)(gameState, position);
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            });
            test("should be blocked by friendly piece", () => {
                const gameState = (0, gameState_1.initial)();
                const piece = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.PAWN };
                gameState.board = [
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, piece, null, null, null],
                    [null, null, null, null, piece, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                ];
                const position = { row: 4, col: 4 };
                const expected = [];
                const actual = (0, movement_1.pawnMovement)(gameState, position);
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            });
            test("should be blocked by opponent piece", () => {
                const gameState = (0, gameState_1.initial)();
                const piece = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.PAWN };
                const oppPiece = { colour: chess_types_1.PieceColour.BLACK, type: chess_types_1.PieceType.PAWN };
                gameState.board = [
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, oppPiece, null, null, null],
                    [null, null, null, null, piece, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                ];
                const position = { row: 4, col: 4 };
                const expected = [];
                const actual = (0, movement_1.pawnMovement)(gameState, position);
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            });
            test("should have white promotions", () => {
                const gameState = (0, gameState_1.initial)();
                const piece = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.PAWN };
                gameState.board = [
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, piece, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                ];
                const position = { row: 1, col: 4 };
                const expected = [
                    { piece, from: position, to: { row: 0, col: 4 }, promotionType: { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.BISHOP } },
                    { piece, from: position, to: { row: 0, col: 4 }, promotionType: { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.KNIGHT } },
                    { piece, from: position, to: { row: 0, col: 4 }, promotionType: { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.QUEEN } },
                    { piece, from: position, to: { row: 0, col: 4 }, promotionType: { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.ROOK } },
                ];
                const actual = (0, movement_1.pawnMovement)(gameState, position);
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            });
            test("should have black promotions", () => {
                const gameState = (0, gameState_1.initial)();
                const piece = { colour: chess_types_1.PieceColour.BLACK, type: chess_types_1.PieceType.PAWN };
                gameState.board = [
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, piece, null, null, null],
                    [null, null, null, null, null, null, null, null],
                ];
                const position = { row: 6, col: 4 };
                const expected = [
                    { piece, from: position, to: { row: 7, col: 4 }, promotionType: { colour: chess_types_1.PieceColour.BLACK, type: chess_types_1.PieceType.BISHOP } },
                    { piece, from: position, to: { row: 7, col: 4 }, promotionType: { colour: chess_types_1.PieceColour.BLACK, type: chess_types_1.PieceType.KNIGHT } },
                    { piece, from: position, to: { row: 7, col: 4 }, promotionType: { colour: chess_types_1.PieceColour.BLACK, type: chess_types_1.PieceType.QUEEN } },
                    { piece, from: position, to: { row: 7, col: 4 }, promotionType: { colour: chess_types_1.PieceColour.BLACK, type: chess_types_1.PieceType.ROOK } },
                ];
                const actual = (0, movement_1.pawnMovement)(gameState, position);
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            });
        });
        describe("pawnCapture", () => {
            test("should give no captures", () => {
                const gameState = (0, gameState_1.initial)();
                const piece = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.PAWN };
                gameState.board = [
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, piece, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                ];
                const position = { row: 4, col: 4 };
                const expected = [];
                const actual = (0, movement_1.pawnCapture)(gameState, position);
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            });
            test("should not capture own pieces", () => {
                const gameState = (0, gameState_1.initial)();
                const piece = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.PAWN };
                gameState.board = [
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, piece, null, piece, null, null],
                    [null, null, null, null, piece, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                ];
                const position = { row: 4, col: 4 };
                const expected = [];
                const actual = (0, movement_1.pawnCapture)(gameState, position);
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            });
            test("should capture black opponent pieces", () => {
                const gameState = (0, gameState_1.initial)();
                const piece = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.PAWN };
                const oppPiece = { colour: chess_types_1.PieceColour.BLACK, type: chess_types_1.PieceType.PAWN };
                gameState.board = [
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, oppPiece, oppPiece, oppPiece, null, null],
                    [null, null, null, null, piece, null, null, null],
                    [null, null, null, oppPiece, null, oppPiece, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                ];
                const position = { row: 4, col: 4 };
                const expected = [
                    { piece, from: position, to: { row: 3, col: 5 }, capturedPiece: oppPiece },
                    { piece, from: position, to: { row: 3, col: 3 }, capturedPiece: oppPiece },
                ];
                const actual = (0, movement_1.pawnCapture)(gameState, position);
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            });
            test("should capture white opponent pieces", () => {
                const gameState = (0, gameState_1.initial)();
                const piece = { colour: chess_types_1.PieceColour.BLACK, type: chess_types_1.PieceType.PAWN };
                const oppPiece = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.PAWN };
                gameState.board = [
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, oppPiece, null, oppPiece, null, null],
                    [null, null, null, null, piece, null, null, null],
                    [null, null, null, oppPiece, oppPiece, oppPiece, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                ];
                const position = { row: 4, col: 4 };
                const expected = [
                    { piece, from: position, to: { row: 5, col: 5 }, capturedPiece: oppPiece },
                    { piece, from: position, to: { row: 5, col: 3 }, capturedPiece: oppPiece },
                ];
                const actual = (0, movement_1.pawnCapture)(gameState, position);
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            });
            test("should capture black and promote white", () => {
                const gameState = (0, gameState_1.initial)();
                const piece = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.PAWN };
                const oppPiece = { colour: chess_types_1.PieceColour.BLACK, type: chess_types_1.PieceType.PAWN };
                gameState.board = [
                    [null, null, null, oppPiece, null, oppPiece, null, null],
                    [null, null, null, null, piece, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                ];
                const position = { row: 1, col: 4 };
                const expected = [
                    { piece, from: position, to: { row: 0, col: 5 }, capturedPiece: oppPiece, promotionType: { colour: piece.colour, type: chess_types_1.PieceType.QUEEN } },
                    { piece, from: position, to: { row: 0, col: 5 }, capturedPiece: oppPiece, promotionType: { colour: piece.colour, type: chess_types_1.PieceType.ROOK } },
                    { piece, from: position, to: { row: 0, col: 5 }, capturedPiece: oppPiece, promotionType: { colour: piece.colour, type: chess_types_1.PieceType.BISHOP } },
                    { piece, from: position, to: { row: 0, col: 5 }, capturedPiece: oppPiece, promotionType: { colour: piece.colour, type: chess_types_1.PieceType.KNIGHT } },
                    { piece, from: position, to: { row: 0, col: 3 }, capturedPiece: oppPiece, promotionType: { colour: piece.colour, type: chess_types_1.PieceType.QUEEN } },
                    { piece, from: position, to: { row: 0, col: 3 }, capturedPiece: oppPiece, promotionType: { colour: piece.colour, type: chess_types_1.PieceType.ROOK } },
                    { piece, from: position, to: { row: 0, col: 3 }, capturedPiece: oppPiece, promotionType: { colour: piece.colour, type: chess_types_1.PieceType.BISHOP } },
                    { piece, from: position, to: { row: 0, col: 3 }, capturedPiece: oppPiece, promotionType: { colour: piece.colour, type: chess_types_1.PieceType.KNIGHT } },
                ];
                const actual = (0, movement_1.pawnCapture)(gameState, position);
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            });
            test("should capture white and promote black", () => {
                const gameState = (0, gameState_1.initial)();
                const piece = { colour: chess_types_1.PieceColour.BLACK, type: chess_types_1.PieceType.PAWN };
                const oppPiece = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.PAWN };
                gameState.board = [
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, piece, null, null, null],
                    [null, null, null, oppPiece, null, oppPiece, null, null],
                ];
                const position = { row: 6, col: 4 };
                const expected = [
                    { piece, from: position, to: { row: 7, col: 5 }, capturedPiece: oppPiece, promotionType: { colour: piece.colour, type: chess_types_1.PieceType.QUEEN } },
                    { piece, from: position, to: { row: 7, col: 5 }, capturedPiece: oppPiece, promotionType: { colour: piece.colour, type: chess_types_1.PieceType.ROOK } },
                    { piece, from: position, to: { row: 7, col: 5 }, capturedPiece: oppPiece, promotionType: { colour: piece.colour, type: chess_types_1.PieceType.BISHOP } },
                    { piece, from: position, to: { row: 7, col: 5 }, capturedPiece: oppPiece, promotionType: { colour: piece.colour, type: chess_types_1.PieceType.KNIGHT } },
                    { piece, from: position, to: { row: 7, col: 3 }, capturedPiece: oppPiece, promotionType: { colour: piece.colour, type: chess_types_1.PieceType.QUEEN } },
                    { piece, from: position, to: { row: 7, col: 3 }, capturedPiece: oppPiece, promotionType: { colour: piece.colour, type: chess_types_1.PieceType.ROOK } },
                    { piece, from: position, to: { row: 7, col: 3 }, capturedPiece: oppPiece, promotionType: { colour: piece.colour, type: chess_types_1.PieceType.BISHOP } },
                    { piece, from: position, to: { row: 7, col: 3 }, capturedPiece: oppPiece, promotionType: { colour: piece.colour, type: chess_types_1.PieceType.KNIGHT } },
                ];
                const actual = (0, movement_1.pawnCapture)(gameState, position);
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            });
        });
        describe("pawnEnPassant", () => {
            test("should have no captures", () => {
                const gameState = (0, gameState_1.initial)();
                const piece = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.PAWN };
                gameState.board = [
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, piece, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                ];
                const position = { row: 3, col: 4 };
                const expected = [];
                const actual = (0, movement_1.pawnEnPassant)(gameState, position);
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            });
            test("should have no captures because not last move", () => {
                const gameState = (0, gameState_1.initial)();
                const piece = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.PAWN };
                const oppPiece = { colour: chess_types_1.PieceColour.BLACK, type: chess_types_1.PieceType.PAWN };
                gameState.board = [
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, oppPiece, piece, null, null, null],
                    [null, null, null, null, null, null, piece, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                ];
                gameState.moveHistory = [
                    { piece: oppPiece, from: { row: 1, col: 3 }, to: { row: 3, col: 3 } },
                    { piece: piece, from: { row: 6, col: 6 }, to: { row: 4, col: 6 } }
                ];
                const position = { row: 3, col: 4 };
                const expected = [];
                const actual = (0, movement_1.pawnEnPassant)(gameState, position);
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            });
            test("should not have capture because freindly move", () => {
                const gameState = (0, gameState_1.initial)();
                const piece = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.PAWN };
                gameState.board = [
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null],
                    [null, null, null, piece, piece, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                ];
                gameState.moveHistory = [
                    { piece: piece, from: { row: 6, col: 3 }, to: { row: 4, col: 3 } }
                ];
                const position = { row: 4, col: 4 };
                const expected = [];
                const actual = (0, movement_1.pawnEnPassant)(gameState, position);
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            });
            test("should have en passant capture ", () => {
                const gameState = (0, gameState_1.initial)();
                const piece = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.PAWN };
                const oppPiece = { colour: chess_types_1.PieceColour.BLACK, type: chess_types_1.PieceType.PAWN };
                gameState.board = [
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, oppPiece, piece, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                ];
                gameState.moveHistory = [
                    { piece: oppPiece, from: { row: 1, col: 3 }, to: { row: 3, col: 3 } }
                ];
                const position = { row: 3, col: 4 };
                const expected = [
                    { piece, from: position, to: { row: 2, col: 3 }, capturedPiece: oppPiece },
                ];
                const actual = (0, movement_1.pawnEnPassant)(gameState, position);
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            });
            test("should give left en passant capture ", () => {
                const gameState = (0, gameState_1.initial)();
                const piece = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.PAWN };
                const oppPiece = { colour: chess_types_1.PieceColour.BLACK, type: chess_types_1.PieceType.PAWN };
                gameState.board = [
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, oppPiece, piece, oppPiece, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                ];
                gameState.moveHistory = [
                    { piece: oppPiece, from: { row: 1, col: 3 }, to: { row: 3, col: 3 } }
                ];
                const position = { row: 3, col: 4 };
                const expected = [
                    { piece, from: position, to: { row: 2, col: 3 }, capturedPiece: oppPiece },
                ];
                const actual = (0, movement_1.pawnEnPassant)(gameState, position);
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            });
            test("should give right en passant capture ", () => {
                const gameState = (0, gameState_1.initial)();
                const piece = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.PAWN };
                const oppPiece = { colour: chess_types_1.PieceColour.BLACK, type: chess_types_1.PieceType.PAWN };
                gameState.board = [
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, oppPiece, piece, oppPiece, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                ];
                gameState.moveHistory = [
                    { piece: oppPiece, from: { row: 1, col: 5 }, to: { row: 3, col: 5 } }
                ];
                const position = { row: 3, col: 4 };
                const expected = [
                    { piece, from: position, to: { row: 2, col: 5 }, capturedPiece: oppPiece },
                ];
                const actual = (0, movement_1.pawnEnPassant)(gameState, position);
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            });
            test("should have black left en passant capture ", () => {
                const gameState = (0, gameState_1.initial)();
                const piece = { colour: chess_types_1.PieceColour.BLACK, type: chess_types_1.PieceType.PAWN };
                const oppPiece = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.PAWN };
                gameState.board = [
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, oppPiece, piece, oppPiece, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                ];
                gameState.moveHistory = [
                    { piece: oppPiece, from: { row: 6, col: 3 }, to: { row: 4, col: 3 } }
                ];
                const position = { row: 4, col: 4 };
                const expected = [
                    { piece, from: position, to: { row: 5, col: 3 }, capturedPiece: oppPiece },
                ];
                const actual = (0, movement_1.pawnEnPassant)(gameState, position);
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            });
            test("should have black right en passant capture ", () => {
                const gameState = (0, gameState_1.initial)();
                const piece = { colour: chess_types_1.PieceColour.BLACK, type: chess_types_1.PieceType.PAWN };
                const oppPiece = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.PAWN };
                gameState.board = [
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, oppPiece, piece, oppPiece, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                ];
                gameState.moveHistory = [
                    { piece: oppPiece, from: { row: 6, col: 5 }, to: { row: 4, col: 5 } }
                ];
                const position = { row: 4, col: 4 };
                const expected = [
                    { piece, from: position, to: { row: 5, col: 5 }, capturedPiece: oppPiece },
                ];
                const actual = (0, movement_1.pawnEnPassant)(gameState, position);
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            });
        });
        describe("pawnAttackZone", () => {
            test("should give all white positions", () => {
                const gameState = (0, gameState_1.initial)();
                const piece = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.PAWN };
                gameState.board = [
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, piece, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                ];
                const position = { row: 4, col: 4 };
                const expected = [
                    { row: 3, col: 3 },
                    { row: 3, col: 5 },
                ];
                const actual = (0, movement_1.pawnAttackZone)(gameState, position);
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            });
            test("should give all black positions", () => {
                const gameState = (0, gameState_1.initial)();
                const piece = { colour: chess_types_1.PieceColour.BLACK, type: chess_types_1.PieceType.PAWN };
                gameState.board = [
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, piece, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                ];
                const position = { row: 4, col: 4 };
                const expected = [
                    { row: 5, col: 3 },
                    { row: 5, col: 5 },
                ];
                const actual = (0, movement_1.pawnAttackZone)(gameState, position);
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            });
            test("should give all white positions including those with opponent pieces ", () => {
                const gameState = (0, gameState_1.initial)();
                const piece = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.PAWN };
                const oppPiece = { colour: chess_types_1.PieceColour.BLACK, type: chess_types_1.PieceType.KNIGHT };
                gameState.board = [
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, oppPiece, null, oppPiece, null, null],
                    [null, null, null, null, piece, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                ];
                const position = { row: 4, col: 4 };
                const expected = [
                    { row: 3, col: 3 },
                    { row: 3, col: 5 },
                ];
                const actual = (0, movement_1.pawnAttackZone)(gameState, position);
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            });
            test("should give all black positions including those with opponent pieces ", () => {
                const gameState = (0, gameState_1.initial)();
                const piece = { colour: chess_types_1.PieceColour.BLACK, type: chess_types_1.PieceType.PAWN };
                gameState.board = [
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, piece, null, null, null],
                    [null, null, null, piece, null, piece, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                ];
                const position = { row: 4, col: 4 };
                const expected = [
                    { row: 5, col: 3 },
                    { row: 5, col: 5 },
                ];
                const actual = (0, movement_1.pawnAttackZone)(gameState, position);
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            });
        });
    });
    describe("king", () => {
        describe("kingMovement", () => {
            test("should have moves", () => {
                const gameState = (0, gameState_1.initial)();
                const piece = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.KING };
                gameState.board = [
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, piece, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                ];
                const position = { row: 4, col: 4 };
                const expected = [
                    { piece, from: position, to: { row: 3, col: 3 } },
                    { piece, from: position, to: { row: 3, col: 4 } },
                    { piece, from: position, to: { row: 3, col: 5 } },
                    { piece, from: position, to: { row: 4, col: 3 } },
                    { piece, from: position, to: { row: 4, col: 5 } },
                    { piece, from: position, to: { row: 5, col: 3 } },
                    { piece, from: position, to: { row: 5, col: 4 } },
                    { piece, from: position, to: { row: 5, col: 5 } },
                ];
                const actual = (0, movement_1.kingMovement)(gameState, position);
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            });
            test("should have no moves from blocking", () => {
                const gameState = (0, gameState_1.initial)();
                const piece = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.KING };
                gameState.board = [
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, piece, piece, piece, null, null],
                    [null, null, null, piece, piece, piece, null, null],
                    [null, null, null, piece, piece, piece, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                ];
                const position = { row: 4, col: 4 };
                const expected = [];
                const actual = (0, movement_1.kingMovement)(gameState, position);
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            });
            test("should have no moves from blocking", () => {
                const gameState = (0, gameState_1.initial)();
                const piece = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.KING };
                const oppPiece = { colour: chess_types_1.PieceColour.BLACK, type: chess_types_1.PieceType.KNIGHT };
                gameState.board = [
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, oppPiece, oppPiece, oppPiece, null, null],
                    [null, null, null, oppPiece, piece, oppPiece, null, null],
                    [null, null, null, oppPiece, oppPiece, oppPiece, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                ];
                const position = { row: 4, col: 4 };
                const expected = [
                    { piece, from: position, to: { row: 3, col: 3 }, capturedPiece: oppPiece },
                    { piece, from: position, to: { row: 3, col: 4 }, capturedPiece: oppPiece },
                    { piece, from: position, to: { row: 3, col: 5 }, capturedPiece: oppPiece },
                    { piece, from: position, to: { row: 4, col: 3 }, capturedPiece: oppPiece },
                    { piece, from: position, to: { row: 4, col: 5 }, capturedPiece: oppPiece },
                    { piece, from: position, to: { row: 5, col: 3 }, capturedPiece: oppPiece },
                    { piece, from: position, to: { row: 5, col: 4 }, capturedPiece: oppPiece },
                    { piece, from: position, to: { row: 5, col: 5 }, capturedPiece: oppPiece },
                ];
                const actual = (0, movement_1.kingMovement)(gameState, position);
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            });
            test("should have no off board moves", () => {
                const gameState = (0, gameState_1.initial)();
                const piece = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.KING };
                gameState.board = [
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [piece, null, null, null, null, null, null, null],
                ];
                const position = { row: 7, col: 0 };
                const expected = [
                    { piece, from: position, to: { row: 6, col: 0 } },
                    { piece, from: position, to: { row: 7, col: 1 } },
                    { piece, from: position, to: { row: 7, col: 1 } },
                ];
                const actual = (0, movement_1.kingMovement)(gameState, position);
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            });
        });
        describe("kingAttackZone", () => {
            test("should have all positions", () => {
                const gameState = (0, gameState_1.initial)();
                const piece = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.KING };
                gameState.board = [
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, piece, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                ];
                const position = { row: 4, col: 4 };
                const expected = [
                    { row: 3, col: 3 },
                    { row: 3, col: 4 },
                    { row: 3, col: 5 },
                    { row: 4, col: 3 },
                    { row: 4, col: 5 },
                    { row: 5, col: 3 },
                    { row: 5, col: 4 },
                    { row: 5, col: 5 },
                ];
                const actual = (0, movement_1.kingAttackZone)(gameState, position);
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            });
            test("should have no moves from blocking", () => {
                const gameState = (0, gameState_1.initial)();
                const piece = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.KING };
                gameState.board = [
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, piece, piece, piece, null, null],
                    [null, null, null, piece, piece, piece, null, null],
                    [null, null, null, piece, piece, piece, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                ];
                const position = { row: 4, col: 4 };
                const expected = [
                    { row: 3, col: 3 },
                    { row: 3, col: 4 },
                    { row: 3, col: 5 },
                    { row: 4, col: 3 },
                    { row: 4, col: 5 },
                    { row: 5, col: 3 },
                    { row: 5, col: 4 },
                    { row: 5, col: 5 },
                ];
                const actual = (0, movement_1.kingAttackZone)(gameState, position);
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            });
            test("should have no moves from blocking", () => {
                const gameState = (0, gameState_1.initial)();
                const piece = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.KING };
                const oppPiece = { colour: chess_types_1.PieceColour.BLACK, type: chess_types_1.PieceType.KNIGHT };
                gameState.board = [
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, oppPiece, oppPiece, oppPiece, null, null],
                    [null, null, null, oppPiece, piece, oppPiece, null, null],
                    [null, null, null, oppPiece, oppPiece, oppPiece, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                ];
                const position = { row: 4, col: 4 };
                const expected = [
                    { row: 3, col: 3 },
                    { row: 3, col: 4 },
                    { row: 3, col: 5 },
                    { row: 4, col: 3 },
                    { row: 4, col: 5 },
                    { row: 5, col: 3 },
                    { row: 5, col: 4 },
                    { row: 5, col: 5 },
                ];
                const actual = (0, movement_1.kingAttackZone)(gameState, position);
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            });
        });
        describe("kingCastle", () => {
            it("should have white castle both king and queen side", () => {
                const gameState = (0, gameState_1.initial)();
                const king = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.KING };
                const rook = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.ROOK };
                gameState.board = [
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [rook, null, null, null, king, null, null, rook],
                ];
                const position = { row: 7, col: 4 };
                const expected = [
                    { piece: king, from: position, to: { row: 7, col: 2 }, castle: true },
                    { piece: king, from: position, to: { row: 7, col: 6 }, castle: true },
                ];
                const actual = (0, movement_1.kingCastle)(gameState, position);
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            });
            it("should have black castle both king and queen side", () => {
                const gameState = (0, gameState_1.initial)();
                const king = { colour: chess_types_1.PieceColour.BLACK, type: chess_types_1.PieceType.KING };
                const rook = { colour: chess_types_1.PieceColour.BLACK, type: chess_types_1.PieceType.ROOK };
                gameState.board = [
                    [rook, null, null, null, king, null, null, rook],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                ];
                const position = { row: 0, col: 4 };
                const expected = [
                    { piece: king, from: position, to: { row: 0, col: 2 }, castle: true },
                    { piece: king, from: position, to: { row: 0, col: 6 }, castle: true },
                ];
                const actual = (0, movement_1.kingCastle)(gameState, position);
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            });
            it("should have no moves since rook different colour", () => {
                const gameState = (0, gameState_1.initial)();
                const king = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.KING };
                const rook = { colour: chess_types_1.PieceColour.BLACK, type: chess_types_1.PieceType.ROOK };
                gameState.board = [
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [rook, null, null, null, king, null, null, rook],
                ];
                const position = { row: 7, col: 4 };
                const expected = [];
                const actual = (0, movement_1.kingCastle)(gameState, position);
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            });
            it("should have no moves castles blocked", () => {
                const gameState = (0, gameState_1.initial)();
                const king = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.KING };
                const rook = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.ROOK };
                const knight = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.KNIGHT };
                gameState.board = [
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [rook, knight, null, null, king, null, knight, rook],
                ];
                const position = { row: 7, col: 4 };
                const expected = [];
                const actual = (0, movement_1.kingCastle)(gameState, position);
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            });
            it("should have no kingside castle since no priviledge", () => {
                const gameState = (0, gameState_1.initial)();
                const king = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.KING };
                const rook = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.ROOK };
                gameState.board = [
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [rook, null, null, null, king, null, null, rook],
                ];
                gameState.castlePrivileges[chess_types_1.PieceColour.WHITE].kingSide = false;
                const position = { row: 7, col: 4 };
                const expected = [
                    { piece: king, from: position, to: { row: 7, col: 2 }, castle: true },
                ];
                const actual = (0, movement_1.kingCastle)(gameState, position);
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            });
            it("should have no queenside castle since no priviledge", () => {
                const gameState = (0, gameState_1.initial)();
                const king = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.KING };
                const rook = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.ROOK };
                gameState.board = [
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [rook, null, null, null, king, null, null, rook],
                ];
                gameState.castlePrivileges[chess_types_1.PieceColour.WHITE].queenSide = false;
                const position = { row: 7, col: 4 };
                const expected = [
                    { piece: king, from: position, to: { row: 7, col: 6 }, castle: true },
                ];
                const actual = (0, movement_1.kingCastle)(gameState, position);
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            });
        });
    });
});
//# sourceMappingURL=movement.test.js.map