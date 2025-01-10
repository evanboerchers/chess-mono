"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chess_1 = require("./chess");
const chess_types_1 = require("./chess.types");
const gameState_1 = require("./data/gameState");
describe("chess tests", () => {
    describe("copyGameState", () => {
        it("should not share a reference", () => {
            const gameState = (0, gameState_1.initial)();
            const copy = (0, chess_1.copyGameState)(gameState);
            gameState.currentTurn = chess_types_1.PieceColour.BLACK;
            copy.currentTurn = chess_types_1.PieceColour.WHITE;
            expect(copy.currentTurn).not.toBe(gameState.currentTurn);
        });
    });
    describe("getBoardSquare", () => {
        it("should get piece", () => {
            const gameState = (0, gameState_1.initial)();
            const expected = { colour: chess_types_1.PieceColour.BLACK, type: chess_types_1.PieceType.KING };
            const actual = (0, chess_1.getBoardSquare)(gameState, { row: 0, col: 4 });
            expect(actual).toEqual(expected);
        });
        it("should get null", () => {
            const gameState = (0, gameState_1.initial)();
            const actual = (0, chess_1.getBoardSquare)(gameState, { row: 4, col: 4 });
            expect(actual).toEqual(null);
        });
    });
    describe("findPiece", () => {
        it("should return all white pawn positions", () => {
            const gameState = (0, gameState_1.initial)();
            const piece = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.PAWN };
            const expected = [
                { row: 6, col: 0 },
                { row: 6, col: 1 },
                { row: 6, col: 2 },
                { row: 6, col: 3 },
                { row: 6, col: 4 },
                { row: 6, col: 5 },
                { row: 6, col: 6 },
                { row: 6, col: 7 },
            ];
            const actual = (0, chess_1.findPiece)(gameState, piece);
            expect(actual).toHaveLength(expected.length);
            expect(actual).toEqual(expect.arrayContaining(expected));
        });
        it("should return the black king position", () => {
            const gameState = (0, gameState_1.initial)();
            const piece = { colour: chess_types_1.PieceColour.BLACK, type: chess_types_1.PieceType.KING };
            const expected = [
                { row: 0, col: 4 },
            ];
            const actual = (0, chess_1.findPiece)(gameState, piece);
            expect(actual).toHaveLength(expected.length);
            expect(actual).toEqual(expect.arrayContaining(expected));
        });
        it("should return nothing", () => {
            const gameState = (0, gameState_1.initial)();
            gameState.board[0][4] = null;
            const piece = { colour: chess_types_1.PieceColour.BLACK, type: chess_types_1.PieceType.KING };
            const expected = [];
            const actual = (0, chess_1.findPiece)(gameState, piece);
            expect(actual).toHaveLength(expected.length);
        });
    });
    describe("getPieceRecord", () => {
        test("should have all initial peices", () => {
            const gameState = (0, gameState_1.initial)();
            const actual = (0, chess_1.getPieceRecord)(gameState);
            const expected = {
                [chess_types_1.PieceColour.WHITE]: {
                    [chess_types_1.PieceType.PAWN]: 8,
                    [chess_types_1.PieceType.KNIGHT]: 2,
                    [chess_types_1.PieceType.BISHOP]: 2,
                    [chess_types_1.PieceType.ROOK]: 2,
                    [chess_types_1.PieceType.QUEEN]: 1,
                    [chess_types_1.PieceType.KING]: 1,
                },
                [chess_types_1.PieceColour.BLACK]: {
                    [chess_types_1.PieceType.PAWN]: 8,
                    [chess_types_1.PieceType.KNIGHT]: 2,
                    [chess_types_1.PieceType.BISHOP]: 2,
                    [chess_types_1.PieceType.ROOK]: 2,
                    [chess_types_1.PieceType.QUEEN]: 1,
                    [chess_types_1.PieceType.KING]: 1,
                }
            };
            expect(actual).toEqual(expected);
        });
    });
    describe("getAttackZone", () => {
        it("should get relevant attack zones for queen", () => {
            const gameState = (0, gameState_1.initial)();
            const piece = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.QUEEN };
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
                { row: 7, col: 1 },
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
            const actual = (0, chess_1.getAttackZone)(gameState, position);
            expect(actual).toHaveLength(expected.length);
            expect(actual).toEqual(expect.arrayContaining(expected));
        });
        it("should relevant attack zone for rook", () => {
            const gameState = (0, gameState_1.initial)();
            const piece = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.ROOK };
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
            const expected = [
                { row: 3, col: 0 },
                { row: 3, col: 1 },
                { row: 3, col: 2 },
                { row: 3, col: 3 },
                { row: 3, col: 5 },
                { row: 3, col: 6 },
                { row: 3, col: 7 },
                { row: 0, col: 4 },
                { row: 1, col: 4 },
                { row: 2, col: 4 },
                { row: 4, col: 4 },
                { row: 5, col: 4 },
                { row: 6, col: 4 },
                { row: 7, col: 4 },
            ];
            const position = { row: 3, col: 4 };
            const actual = (0, chess_1.getAttackZone)(gameState, position);
            expect(actual).toHaveLength(expected.length);
            expect(actual).toEqual(expect.arrayContaining(expected));
        });
    });
    describe("getAttackZones", () => {
        it("should give white starting position attack positions", () => {
            const gameState = (0, gameState_1.initial)();
            const expected = [
                { row: 5, col: 0 },
                { row: 5, col: 1 },
                { row: 5, col: 2 },
                { row: 5, col: 3 },
                { row: 5, col: 4 },
                { row: 5, col: 5 },
                { row: 5, col: 6 },
                { row: 5, col: 7 },
                { row: 6, col: 0 },
                { row: 6, col: 1 },
                { row: 6, col: 2 },
                { row: 6, col: 3 },
                { row: 6, col: 4 },
                { row: 6, col: 5 },
                { row: 6, col: 6 },
                { row: 6, col: 7 },
                { row: 7, col: 1 },
                { row: 7, col: 2 },
                { row: 7, col: 3 },
                { row: 7, col: 4 },
                { row: 7, col: 5 },
                { row: 7, col: 6 },
            ];
            const actual = (0, chess_1.getAttackZones)(gameState, chess_types_1.PieceColour.WHITE);
            expect(actual).toHaveLength(expected.length);
            expect(actual).toEqual(expect.arrayContaining(expected));
        });
        it("should give black starting position attack positions", () => {
            const gameState = (0, gameState_1.initial)();
            const expected = [
                { row: 0, col: 1 },
                { row: 0, col: 2 },
                { row: 0, col: 3 },
                { row: 0, col: 4 },
                { row: 0, col: 5 },
                { row: 0, col: 6 },
                { row: 1, col: 0 },
                { row: 1, col: 1 },
                { row: 1, col: 2 },
                { row: 1, col: 3 },
                { row: 1, col: 4 },
                { row: 1, col: 5 },
                { row: 1, col: 6 },
                { row: 1, col: 7 },
                { row: 2, col: 0 },
                { row: 2, col: 1 },
                { row: 2, col: 2 },
                { row: 2, col: 3 },
                { row: 2, col: 4 },
                { row: 2, col: 5 },
                { row: 2, col: 6 },
                { row: 2, col: 7 },
            ];
            const actual = (0, chess_1.getAttackZones)(gameState, chess_types_1.PieceColour.BLACK);
            expect(actual).toHaveLength(expected.length);
            expect(actual).toEqual(expect.arrayContaining(expected));
        });
        it("should have rook attack zones stopping at and including king", () => {
            const gameState = (0, gameState_1.initial)();
            const king = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.KING };
            const rook = { colour: chess_types_1.PieceColour.BLACK, type: chess_types_1.PieceType.ROOK };
            gameState.board = [
                [null, null, null, null, rook, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, king, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
            ];
            const expected = [
                { row: 0, col: 0 },
                { row: 0, col: 1 },
                { row: 0, col: 2 },
                { row: 0, col: 3 },
                { row: 0, col: 5 },
                { row: 0, col: 6 },
                { row: 0, col: 7 },
                { row: 1, col: 4 },
                { row: 2, col: 4 },
                { row: 3, col: 4 },
                { row: 4, col: 4 },
            ];
            const actual = (0, chess_1.getAttackZones)(gameState, chess_types_1.PieceColour.BLACK);
            expect(actual).toHaveLength(expected.length);
            expect(actual).toEqual(expect.arrayContaining(expected));
        });
    });
    describe("isKingInCheck", () => {
        it("should not be in check on empty board", () => {
            const gameState = (0, gameState_1.initial)();
            const king = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.QUEEN };
            gameState.board = [
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, king, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
            ];
            const actual = (0, chess_1.isKingInCheck)(gameState, chess_types_1.PieceColour.WHITE);
            expect(actual).toBe(false);
        });
        it("should not be in check from own rook", () => {
            const gameState = (0, gameState_1.initial)();
            const king = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.KING };
            const rook = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.ROOK };
            gameState.board = [
                [null, null, null, null, rook, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, king, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
            ];
            const actual = (0, chess_1.isKingInCheck)(gameState, chess_types_1.PieceColour.WHITE);
            expect(actual).toBe(false);
        });
        it("should not be in check from opponent rook", () => {
            const gameState = (0, gameState_1.initial)();
            const king = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.KING };
            const rook = { colour: chess_types_1.PieceColour.BLACK, type: chess_types_1.PieceType.ROOK };
            gameState.board = [
                [null, null, null, null, rook, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, king, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
            ];
            const actual = (0, chess_1.isKingInCheck)(gameState, chess_types_1.PieceColour.WHITE);
            expect(actual).toBe(true);
        });
        it("black should not be in check from opponent rook", () => {
            const gameState = (0, gameState_1.initial)();
            const king = { colour: chess_types_1.PieceColour.BLACK, type: chess_types_1.PieceType.KING };
            const rook = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.ROOK };
            gameState.board = [
                [null, null, null, null, rook, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, king, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
            ];
            const actual = (0, chess_1.isKingInCheck)(gameState, chess_types_1.PieceColour.BLACK);
            expect(actual).toBe(true);
        });
        it("should not be in check since pawn blocks", () => {
            const gameState = (0, gameState_1.initial)();
            const king = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.KING };
            const pawn = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.PAWN };
            const bQueen = { colour: chess_types_1.PieceColour.BLACK, type: chess_types_1.PieceType.QUEEN };
            const bBishop = { colour: chess_types_1.PieceColour.BLACK, type: chess_types_1.PieceType.BISHOP };
            gameState.board = [
                [null, bQueen, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, bBishop, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [pawn, pawn, pawn, null, null, null, null, null],
                [null, king, null, null, null, null, null, null],
            ];
            const actual = (0, chess_1.isKingInCheck)(gameState, chess_types_1.PieceColour.WHITE);
            expect(actual).toBe(false);
        });
        it("should not be in check from knight attack", () => {
            const gameState = (0, gameState_1.initial)();
            const king = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.KING };
            const pawn = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.PAWN };
            const bQueen = { colour: chess_types_1.PieceColour.BLACK, type: chess_types_1.PieceType.QUEEN };
            const bBishop = { colour: chess_types_1.PieceColour.BLACK, type: chess_types_1.PieceType.BISHOP };
            const bKnight = { colour: chess_types_1.PieceColour.BLACK, type: chess_types_1.PieceType.KNIGHT };
            gameState.board = [
                [null, bQueen, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, bBishop, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, bKnight, null, null, null, null, null],
                [pawn, pawn, pawn, null, null, null, null, null],
                [null, king, null, null, null, null, null, null],
            ];
            const actual = (0, chess_1.isKingInCheck)(gameState, chess_types_1.PieceColour.WHITE);
            expect(actual).toBe(true);
        });
    });
    describe("makeMove", () => {
        it("should move king", () => {
            const gameState = (0, gameState_1.initial)();
            const piece = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.KING };
            const from = { row: 4, col: 4 };
            const to = { row: 4, col: 5 };
            const move = {
                piece: piece,
                from: from,
                to: to,
            };
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
            const expected = [
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, piece, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
            ];
            const actual = (0, chess_1.makeMove)(gameState, move).board;
            expect(expected).toEqual(actual);
        });
        it("should capture pawn", () => {
            const gameState = (0, gameState_1.initial)();
            const piece = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.KING };
            const pawn = { colour: chess_types_1.PieceColour.BLACK, type: chess_types_1.PieceType.PAWN };
            const from = { row: 4, col: 4 };
            const to = { row: 4, col: 5 };
            const move = {
                piece: piece,
                from: from,
                to: to,
                capturedPiece: pawn,
            };
            gameState.board = [
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, piece, pawn, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
            ];
            const expected = [
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, piece, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
            ];
            const actual = (0, chess_1.makeMove)(gameState, move).board;
            expect(expected).toEqual(actual);
        });
        it("should promote pawn", () => {
            const gameState = (0, gameState_1.initial)();
            const pawn = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.PAWN };
            const queen = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.PAWN };
            const from = { row: 1, col: 4 };
            const to = { row: 0, col: 4 };
            const move = {
                piece: pawn,
                from: from,
                to: to,
                promotionType: queen
            };
            gameState.board = [
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, pawn, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
            ];
            const expected = [
                [null, null, null, null, queen, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
            ];
            const actual = (0, chess_1.makeMove)(gameState, move).board;
            expect(expected).toEqual(actual);
        });
        it("should castle queen side", () => {
            const gameState = (0, gameState_1.initial)();
            const king = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.KING };
            const rook = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.ROOK };
            const from = { row: 7, col: 4 };
            const to = { row: 7, col: 2 };
            const move = {
                piece: king,
                from: from,
                to: to,
                castle: true
            };
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
            const expected = [
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, king, rook, null, null, null, rook],
            ];
            const actual = (0, chess_1.makeMove)(gameState, move).board;
            expect(expected).toEqual(actual);
        });
        it("should castle king side", () => {
            const gameState = (0, gameState_1.initial)();
            const king = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.KING };
            const rook = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.ROOK };
            const from = { row: 7, col: 4 };
            const to = { row: 7, col: 6 };
            const move = {
                piece: king,
                from: from,
                to: to,
                castle: true
            };
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
            const expected = [
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [rook, null, null, null, null, rook, king, null],
            ];
            const actual = (0, chess_1.makeMove)(gameState, move).board;
            expect(expected).toEqual(actual);
        });
        it("should add move to history", () => {
            const gameState = (0, gameState_1.initial)();
            const piece = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.KING };
            const from = { row: 4, col: 4 };
            const to = { row: 4, col: 5 };
            const move = {
                piece: piece,
                from: from,
                to: to,
            };
            gameState.moveHistory = [{
                    piece: piece,
                    from: { row: 5, col: 4 },
                    to: { row: 4, col: 4 },
                }];
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
            const actual = [{
                    piece: piece,
                    from: { row: 5, col: 4 },
                    to: { row: 4, col: 4 },
                },
                move
            ];
            const expected = (0, chess_1.makeMove)(gameState, move).moveHistory;
            expect(actual).toHaveLength(expected.length);
            expect(actual).toEqual(expect.arrayContaining(expected));
        });
        it("should change turn", () => {
            const gameState = (0, gameState_1.initial)();
            const piece = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.KING };
            const from = { row: 4, col: 4 };
            const to = { row: 4, col: 5 };
            const move = {
                piece: piece,
                from: from,
                to: to,
            };
            gameState.currentTurn = chess_types_1.PieceColour.WHITE;
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
            const expected = chess_types_1.PieceColour.BLACK;
            const actual = (0, chess_1.makeMove)(gameState, move).currentTurn;
            expect(actual).toEqual(expected);
        });
    });
    describe("doesMoveCheckOwnKing", () => {
        it("should not modify gamestate", () => {
            const gameState = (0, gameState_1.initial)();
            const gameState2 = (0, gameState_1.initial)();
            const move = {
                piece: { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.PAWN },
                to: { row: 0, col: 4 },
                from: { row: 0, col: 6 },
            };
            (0, chess_1.doesMoveCheckOwnKing)(gameState, move);
            expect(gameState).toEqual(gameState2);
        });
        it("should not modify gamestate", () => {
            const gameState = (0, gameState_1.initial)();
            const gameState2 = (0, gameState_1.initial)();
            const move = {
                piece: { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.PAWN },
                to: { row: 0, col: 4 },
                from: { row: 0, col: 6 },
            };
            (0, chess_1.doesMoveCheckOwnKing)(gameState, move);
            expect(gameState).toEqual(gameState2);
        });
        it("should not modify gamestate", () => {
            const gameState = (0, gameState_1.initial)();
            const gameState2 = (0, gameState_1.initial)();
            const move = {
                piece: { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.PAWN },
                to: { row: 0, col: 4 },
                from: { row: 0, col: 6 },
            };
            (0, chess_1.doesMoveCheckOwnKing)(gameState, move);
            expect(gameState).toEqual(gameState2);
        });
        it("should be false, move doesnt change anything", () => {
            const gameState = (0, gameState_1.initial)();
            const gameState2 = (0, gameState_1.initial)();
            const move = {
                piece: { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.PAWN },
                to: { row: 0, col: 4 },
                from: { row: 0, col: 6 },
            };
            (0, chess_1.doesMoveCheckOwnKing)(gameState, move);
            expect(gameState).toEqual(gameState2);
        });
        it("should be true, move doesnt change anything", () => {
            const gameState = (0, gameState_1.initial)();
            const gameState2 = (0, gameState_1.initial)();
            const move = {
                piece: { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.PAWN },
                to: { row: 0, col: 4 },
                from: { row: 0, col: 6 },
            };
            (0, chess_1.doesMoveCheckOwnKing)(gameState, move);
            expect(gameState).toEqual(gameState2);
        });
    });
    describe("getPotentialLegalMoves", () => {
        it("Should gets all king moves", () => {
            const gameState = (0, gameState_1.initial)();
            const king = { type: chess_types_1.PieceType.KING, colour: chess_types_1.PieceColour.WHITE };
            const from = { row: 4, col: 4 };
            gameState.board = [
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, king, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
            ];
            const actual = (0, chess_1.getPotentialLegalMoves)(gameState, from);
            const expected = [
                { piece: king, to: { row: 3, col: 3 }, from: from },
                { piece: king, to: { row: 3, col: 4 }, from: from },
                { piece: king, to: { row: 3, col: 5 }, from: from },
                { piece: king, to: { row: 4, col: 3 }, from: from },
                { piece: king, to: { row: 4, col: 5 }, from: from },
                { piece: king, to: { row: 5, col: 3 }, from: from },
                { piece: king, to: { row: 5, col: 4 }, from: from },
                { piece: king, to: { row: 5, col: 5 }, from: from },
            ];
            expect(actual).toHaveLength(expected.length);
            expect(actual).toEqual(expect.arrayContaining(expected));
        });
        it("Should get king moves that dont put it into check", () => {
            const gameState = (0, gameState_1.initial)();
            const king = { type: chess_types_1.PieceType.KING, colour: chess_types_1.PieceColour.WHITE };
            const bRook = { type: chess_types_1.PieceType.ROOK, colour: chess_types_1.PieceColour.BLACK };
            const from = { row: 4, col: 4 };
            gameState.board = [
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, bRook, null, null, null, null, null],
                [null, null, null, null, king, null, null, null],
                [null, null, bRook, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
            ];
            const actual = (0, chess_1.getPotentialLegalMoves)(gameState, from);
            const expected = [
                { piece: king, to: { row: 4, col: 3 }, from: from },
                { piece: king, to: { row: 4, col: 5 }, from: from },
            ];
            expect(actual).toHaveLength(expected.length);
            expect(actual).toEqual(expect.arrayContaining(expected));
        });
        it("Should get king moves including capturing attacking queen", () => {
            const gameState = (0, gameState_1.initial)();
            const king = { type: chess_types_1.PieceType.KING, colour: chess_types_1.PieceColour.WHITE };
            const bQueen = { type: chess_types_1.PieceType.QUEEN, colour: chess_types_1.PieceColour.BLACK };
            const from = { row: 4, col: 4 };
            gameState.board = [
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, bQueen, null, null, null],
                [null, null, null, null, king, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
            ];
            const actual = (0, chess_1.getPotentialLegalMoves)(gameState, from);
            const expected = [
                { piece: king, to: { row: 3, col: 4 }, from: from, capturedPiece: bQueen },
                { piece: king, to: { row: 5, col: 3 }, from: from },
                { piece: king, to: { row: 5, col: 5 }, from: from },
            ];
            expect(actual).toHaveLength(expected.length);
            expect(actual).toEqual(expect.arrayContaining(expected));
        });
        it("Gets king moves out of check, exlcude queen capture because it is guarded", () => {
            const gameState = (0, gameState_1.initial)();
            const king = { type: chess_types_1.PieceType.KING, colour: chess_types_1.PieceColour.WHITE };
            const bQueen = { type: chess_types_1.PieceType.QUEEN, colour: chess_types_1.PieceColour.BLACK };
            const bPawn = { type: chess_types_1.PieceType.PAWN, colour: chess_types_1.PieceColour.BLACK };
            const from = { row: 4, col: 4 };
            gameState.board = [
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, bPawn, null, null, null, null],
                [null, null, null, null, bQueen, null, null, null],
                [null, null, null, null, king, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
            ];
            const actual = (0, chess_1.getPotentialLegalMoves)(gameState, from);
            const expected = [
                { piece: king, to: { row: 5, col: 3 }, from: from },
                { piece: king, to: { row: 5, col: 5 }, from: from },
            ];
            expect(actual).toHaveLength(expected.length);
            expect(actual).toEqual(expect.arrayContaining(expected));
        });
        it("Should get no no king moves since king it is in checkmate", () => {
            const gameState = (0, gameState_1.initial)();
            const king = { type: chess_types_1.PieceType.KING, colour: chess_types_1.PieceColour.WHITE };
            const bQueen = { type: chess_types_1.PieceType.QUEEN, colour: chess_types_1.PieceColour.BLACK };
            const bPawn = { type: chess_types_1.PieceType.PAWN, colour: chess_types_1.PieceColour.BLACK };
            const from = { row: 4, col: 4 };
            gameState.board = [
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, bPawn, null, null, null, null],
                [null, null, null, null, bQueen, null, null, null],
                [null, null, null, null, king, null, null, null],
                [null, null, null, null, bQueen, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
            ];
            const actual = (0, chess_1.getPotentialLegalMoves)(gameState, from);
            const expected = [];
            expect(actual).toHaveLength(expected.length);
            expect(actual).toEqual(expect.arrayContaining(expected));
        });
        it("Should not give pawn moves since it is blocking the king", () => {
            const gameState = (0, gameState_1.initial)();
            const king = { type: chess_types_1.PieceType.KING, colour: chess_types_1.PieceColour.WHITE };
            const bQueen = { type: chess_types_1.PieceType.QUEEN, colour: chess_types_1.PieceColour.BLACK };
            const pawn = { type: chess_types_1.PieceType.PAWN, colour: chess_types_1.PieceColour.WHITE };
            const from = { row: 2, col: 6 };
            gameState.board = [
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, bQueen, null, null, null],
                [null, null, null, null, null, null, null, null],
                [pawn, pawn, pawn, null, null, null, null, null],
                [null, king, null, null, null, null, null, null],
            ];
            const actual = (0, chess_1.getPotentialLegalMoves)(gameState, from);
            const expected = [];
            expect(actual).toHaveLength(expected.length);
            expect(actual).toEqual(expect.arrayContaining(expected));
        });
        it("Should a single rook move to block king", () => {
            const gameState = (0, gameState_1.initial)();
            const king = { type: chess_types_1.PieceType.KING, colour: chess_types_1.PieceColour.WHITE };
            const pawn = { type: chess_types_1.PieceType.PAWN, colour: chess_types_1.PieceColour.WHITE };
            const rook = { type: chess_types_1.PieceType.ROOK, colour: chess_types_1.PieceColour.WHITE };
            const bQueen = { type: chess_types_1.PieceType.QUEEN, colour: chess_types_1.PieceColour.BLACK };
            const from = { row: 2, col: 2 };
            gameState.board = [
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, rook, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, bQueen, null, null, null],
                [null, null, null, null, null, null, null, null],
                [pawn, pawn, null, null, null, null, null, null],
                [null, king, null, null, null, null, null, null],
            ];
            const actual = (0, chess_1.getPotentialLegalMoves)(gameState, from);
            const expected = [
                { piece: rook, to: { row: 6, col: 2 }, from }
            ];
            expect(actual).toHaveLength(expected.length);
            expect(actual).toEqual(expect.arrayContaining(expected));
        });
        it("Should a single rook move to capture attacking queen", () => {
            const gameState = (0, gameState_1.initial)();
            const king = { type: chess_types_1.PieceType.KING, colour: chess_types_1.PieceColour.WHITE };
            const pawn = { type: chess_types_1.PieceType.PAWN, colour: chess_types_1.PieceColour.WHITE };
            const rook = { type: chess_types_1.PieceType.ROOK, colour: chess_types_1.PieceColour.WHITE };
            const bQueen = { type: chess_types_1.PieceType.QUEEN, colour: chess_types_1.PieceColour.BLACK };
            const from = { row: 2, col: 4 };
            gameState.board = [
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, rook, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, bQueen, null, null, null],
                [null, null, null, null, null, null, null, null],
                [pawn, pawn, null, null, null, null, null, null],
                [null, king, null, null, null, null, null, null],
            ];
            const actual = (0, chess_1.getPotentialLegalMoves)(gameState, from);
            const expected = [
                { piece: rook, to: { row: 4, col: 4 }, from, capturedPiece: bQueen }
            ];
            expect(actual).toHaveLength(expected.length);
            expect(actual).toEqual(expect.arrayContaining(expected));
        });
        test("Should get no moves since black is in checkmate", () => {
            const gameState = (0, gameState_1.initial)();
            const bKing = { type: chess_types_1.PieceType.KING, colour: chess_types_1.PieceColour.BLACK };
            const wKing = { type: chess_types_1.PieceType.KING, colour: chess_types_1.PieceColour.WHITE };
            const wRook = { type: chess_types_1.PieceType.ROOK, colour: chess_types_1.PieceColour.WHITE };
            gameState.board = [
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, wKing, null, null, null],
                [null, null, null, null, null, null, null, null],
                [wRook, null, null, null, bKing, null, null, null],
            ];
            const actual = (0, chess_1.getPotentialLegalMoves)(gameState, { row: 4, col: 7 });
            const expected = [];
            expect(actual).toHaveLength(expected.length);
            expect(actual).toEqual(expect.arrayContaining(expected));
        });
    });
    describe("getAllPotentialLegalMoves", () => {
        test("Should get white king moves", () => {
            const gameState = (0, gameState_1.initial)();
            const king = { type: chess_types_1.PieceType.KING, colour: chess_types_1.PieceColour.WHITE };
            const from = { row: 4, col: 4 };
            gameState.board = [
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, king, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
            ];
            const actual = (0, chess_1.getAllPotentialLegalMoves)(gameState, chess_types_1.PieceColour.WHITE);
            const expected = [
                { piece: king, to: { row: 3, col: 3 }, from: from },
                { piece: king, to: { row: 3, col: 4 }, from: from },
                { piece: king, to: { row: 3, col: 5 }, from: from },
                { piece: king, to: { row: 4, col: 3 }, from: from },
                { piece: king, to: { row: 4, col: 5 }, from: from },
                { piece: king, to: { row: 5, col: 3 }, from: from },
                { piece: king, to: { row: 5, col: 4 }, from: from },
                { piece: king, to: { row: 5, col: 5 }, from: from },
            ];
            expect(actual).toHaveLength(expected.length);
            expect(actual).toEqual(expect.arrayContaining(expected));
        });
        test("Should get all white moves", () => {
            const gameState = (0, gameState_1.initial)();
            const king = { type: chess_types_1.PieceType.KING, colour: chess_types_1.PieceColour.WHITE };
            const rook = { type: chess_types_1.PieceType.ROOK, colour: chess_types_1.PieceColour.WHITE };
            const fromKing = { row: 4, col: 4 };
            const fromRook = { row: 0, col: 0 };
            gameState.board = [
                [rook, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, king, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
            ];
            const actual = (0, chess_1.getAllPotentialLegalMoves)(gameState, chess_types_1.PieceColour.WHITE);
            const expected = [
                { piece: king, to: { row: 3, col: 3 }, from: fromKing },
                { piece: king, to: { row: 3, col: 4 }, from: fromKing },
                { piece: king, to: { row: 3, col: 5 }, from: fromKing },
                { piece: king, to: { row: 4, col: 3 }, from: fromKing },
                { piece: king, to: { row: 4, col: 5 }, from: fromKing },
                { piece: king, to: { row: 5, col: 3 }, from: fromKing },
                { piece: king, to: { row: 5, col: 4 }, from: fromKing },
                { piece: king, to: { row: 5, col: 5 }, from: fromKing },
                { piece: rook, to: { row: 1, col: 0 }, from: fromRook },
                { piece: rook, to: { row: 2, col: 0 }, from: fromRook },
                { piece: rook, to: { row: 3, col: 0 }, from: fromRook },
                { piece: rook, to: { row: 4, col: 0 }, from: fromRook },
                { piece: rook, to: { row: 5, col: 0 }, from: fromRook },
                { piece: rook, to: { row: 6, col: 0 }, from: fromRook },
                { piece: rook, to: { row: 7, col: 0 }, from: fromRook },
                { piece: rook, to: { row: 0, col: 1 }, from: fromRook },
                { piece: rook, to: { row: 0, col: 2 }, from: fromRook },
                { piece: rook, to: { row: 0, col: 3 }, from: fromRook },
                { piece: rook, to: { row: 0, col: 4 }, from: fromRook },
                { piece: rook, to: { row: 0, col: 5 }, from: fromRook },
                { piece: rook, to: { row: 0, col: 6 }, from: fromRook },
                { piece: rook, to: { row: 0, col: 7 }, from: fromRook },
            ];
            expect(actual).toHaveLength(expected.length);
            expect(actual).toEqual(expect.arrayContaining(expected));
        });
        test("Should get all white moves excluding blocked movement", () => {
            const gameState = (0, gameState_1.initial)();
            const king = { type: chess_types_1.PieceType.KING, colour: chess_types_1.PieceColour.WHITE };
            const rook = { type: chess_types_1.PieceType.ROOK, colour: chess_types_1.PieceColour.WHITE };
            const fromKing = { row: 4, col: 4 };
            const fromRook = { row: 0, col: 4 };
            gameState.board = [
                [null, null, null, null, rook, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, king, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
            ];
            const actual = (0, chess_1.getAllPotentialLegalMoves)(gameState, chess_types_1.PieceColour.WHITE);
            const expected = [
                { piece: king, to: { row: 3, col: 3 }, from: fromKing },
                { piece: king, to: { row: 3, col: 4 }, from: fromKing },
                { piece: king, to: { row: 3, col: 5 }, from: fromKing },
                { piece: king, to: { row: 4, col: 3 }, from: fromKing },
                { piece: king, to: { row: 4, col: 5 }, from: fromKing },
                { piece: king, to: { row: 5, col: 3 }, from: fromKing },
                { piece: king, to: { row: 5, col: 4 }, from: fromKing },
                { piece: king, to: { row: 5, col: 5 }, from: fromKing },
                { piece: rook, to: { row: 1, col: 4 }, from: fromRook },
                { piece: rook, to: { row: 2, col: 4 }, from: fromRook },
                { piece: rook, to: { row: 3, col: 4 }, from: fromRook },
                { piece: rook, to: { row: 0, col: 0 }, from: fromRook },
                { piece: rook, to: { row: 0, col: 1 }, from: fromRook },
                { piece: rook, to: { row: 0, col: 2 }, from: fromRook },
                { piece: rook, to: { row: 0, col: 3 }, from: fromRook },
                { piece: rook, to: { row: 0, col: 5 }, from: fromRook },
                { piece: rook, to: { row: 0, col: 6 }, from: fromRook },
                { piece: rook, to: { row: 0, col: 7 }, from: fromRook },
            ];
            expect(actual).toHaveLength(expected.length);
            expect(actual).toEqual(expect.arrayContaining(expected));
        });
        test("Should get all white moves excluding blocked movement", () => {
            const gameState = (0, gameState_1.initial)();
            const king = { type: chess_types_1.PieceType.KING, colour: chess_types_1.PieceColour.WHITE };
            const rook = { type: chess_types_1.PieceType.ROOK, colour: chess_types_1.PieceColour.WHITE };
            const fromKing = { row: 4, col: 4 };
            const fromRook = { row: 0, col: 4 };
            gameState.board = [
                [null, null, null, null, rook, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, king, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
            ];
            const actual = (0, chess_1.getAllPotentialLegalMoves)(gameState, chess_types_1.PieceColour.WHITE);
            const expected = [
                { piece: king, to: { row: 3, col: 3 }, from: fromKing },
                { piece: king, to: { row: 3, col: 4 }, from: fromKing },
                { piece: king, to: { row: 3, col: 5 }, from: fromKing },
                { piece: king, to: { row: 4, col: 3 }, from: fromKing },
                { piece: king, to: { row: 4, col: 5 }, from: fromKing },
                { piece: king, to: { row: 5, col: 3 }, from: fromKing },
                { piece: king, to: { row: 5, col: 4 }, from: fromKing },
                { piece: king, to: { row: 5, col: 5 }, from: fromKing },
                { piece: rook, to: { row: 1, col: 4 }, from: fromRook },
                { piece: rook, to: { row: 2, col: 4 }, from: fromRook },
                { piece: rook, to: { row: 3, col: 4 }, from: fromRook },
                { piece: rook, to: { row: 0, col: 0 }, from: fromRook },
                { piece: rook, to: { row: 0, col: 1 }, from: fromRook },
                { piece: rook, to: { row: 0, col: 2 }, from: fromRook },
                { piece: rook, to: { row: 0, col: 3 }, from: fromRook },
                { piece: rook, to: { row: 0, col: 5 }, from: fromRook },
                { piece: rook, to: { row: 0, col: 6 }, from: fromRook },
                { piece: rook, to: { row: 0, col: 7 }, from: fromRook },
            ];
            expect(actual).toHaveLength(expected.length);
            expect(actual).toEqual(expect.arrayContaining(expected));
        });
        test("Should get white king moves out of check", () => {
            const gameState = (0, gameState_1.initial)();
            const king = { type: chess_types_1.PieceType.KING, colour: chess_types_1.PieceColour.WHITE };
            const bRook = { type: chess_types_1.PieceType.ROOK, colour: chess_types_1.PieceColour.BLACK };
            const rook = { type: chess_types_1.PieceType.ROOK, colour: chess_types_1.PieceColour.WHITE };
            const fromKing = { row: 4, col: 4 };
            const fromRook = { row: 0, col: 0 };
            gameState.board = [
                [rook, null, null, null, null, null, null, null],
                [null, null, null, null, bRook, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, king, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
            ];
            const actual = (0, chess_1.getAllPotentialLegalMoves)(gameState, chess_types_1.PieceColour.WHITE);
            const expected = [
                { piece: king, to: { row: 3, col: 3 }, from: fromKing },
                { piece: king, to: { row: 3, col: 5 }, from: fromKing },
                { piece: king, to: { row: 4, col: 3 }, from: fromKing },
                { piece: king, to: { row: 4, col: 5 }, from: fromKing },
                { piece: king, to: { row: 5, col: 3 }, from: fromKing },
                { piece: king, to: { row: 5, col: 5 }, from: fromKing },
            ];
            expect(actual).toHaveLength(expected.length);
            expect(actual).toEqual(expect.arrayContaining(expected));
        });
        test("Should get white king moves out of check, and capture", () => {
            const gameState = (0, gameState_1.initial)();
            const king = { type: chess_types_1.PieceType.KING, colour: chess_types_1.PieceColour.WHITE };
            const bRook = { type: chess_types_1.PieceType.ROOK, colour: chess_types_1.PieceColour.BLACK };
            const rook = { type: chess_types_1.PieceType.ROOK, colour: chess_types_1.PieceColour.WHITE };
            const fromKing = { row: 4, col: 4 };
            const fromRook = { row: 0, col: 0 };
            gameState.board = [
                [rook, null, null, null, bRook, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, king, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
            ];
            const actual = (0, chess_1.getAllPotentialLegalMoves)(gameState, chess_types_1.PieceColour.WHITE);
            const expected = [
                { piece: king, to: { row: 3, col: 3 }, from: fromKing },
                { piece: king, to: { row: 3, col: 5 }, from: fromKing },
                { piece: king, to: { row: 4, col: 3 }, from: fromKing },
                { piece: king, to: { row: 4, col: 5 }, from: fromKing },
                { piece: king, to: { row: 5, col: 3 }, from: fromKing },
                { piece: king, to: { row: 5, col: 5 }, from: fromKing },
                { piece: rook, to: { row: 0, col: 4 }, from: fromRook, capturedPiece: bRook },
            ];
            expect(actual).toHaveLength(expected.length);
            expect(actual).toEqual(expect.arrayContaining(expected));
        });
        test("Should get white blocking moves", () => {
            const gameState = (0, gameState_1.initial)();
            const king = { type: chess_types_1.PieceType.KING, colour: chess_types_1.PieceColour.WHITE };
            const bRook = { type: chess_types_1.PieceType.ROOK, colour: chess_types_1.PieceColour.BLACK };
            const bishop = { type: chess_types_1.PieceType.BISHOP, colour: chess_types_1.PieceColour.WHITE };
            const pawn = { type: chess_types_1.PieceType.PAWN, colour: chess_types_1.PieceColour.WHITE };
            const rook = { type: chess_types_1.PieceType.ROOK, colour: chess_types_1.PieceColour.WHITE };
            gameState.board = [
                [null, null, null, null, bRook, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, bishop, null, null, null, null],
                [null, null, null, null, null, bishop, null, null],
                [null, null, null, pawn, null, pawn, null, null],
                [null, null, null, rook, king, rook, null, null],
            ];
            const actual = (0, chess_1.getAllPotentialLegalMoves)(gameState, chess_types_1.PieceColour.WHITE);
            const expected = [
                { piece: bishop, from: { row: 4, col: 3 }, to: { row: 3, col: 4 } },
                { piece: bishop, from: { row: 4, col: 3 }, to: { row: 5, col: 4 } },
                { piece: bishop, from: { row: 5, col: 5 }, to: { row: 4, col: 4 } },
                { piece: bishop, from: { row: 5, col: 5 }, to: { row: 6, col: 4 } },
            ];
            expect(actual).toHaveLength(expected.length);
            expect(actual).toEqual(expect.arrayContaining(expected));
        });
        test("Should get no moves since white is in checkmate", () => {
            const gameState = (0, gameState_1.initial)();
            const king = { type: chess_types_1.PieceType.KING, colour: chess_types_1.PieceColour.WHITE };
            const bRook = { type: chess_types_1.PieceType.ROOK, colour: chess_types_1.PieceColour.BLACK };
            const pawn = { type: chess_types_1.PieceType.PAWN, colour: chess_types_1.PieceColour.WHITE };
            const rook = { type: chess_types_1.PieceType.ROOK, colour: chess_types_1.PieceColour.WHITE };
            gameState.board = [
                [null, null, null, null, bRook, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, pawn, null, pawn, null, null],
                [null, null, null, rook, king, rook, null, null],
            ];
            const actual = (0, chess_1.getAllPotentialLegalMoves)(gameState, chess_types_1.PieceColour.WHITE);
            const expected = [];
            expect(actual).toHaveLength(expected.length);
            expect(actual).toEqual(expect.arrayContaining(expected));
        });
        test("Should get no moves since black is in checkmate", () => {
            const gameState = (0, gameState_1.initial)();
            const bKing = { type: chess_types_1.PieceType.KING, colour: chess_types_1.PieceColour.BLACK };
            const wKing = { type: chess_types_1.PieceType.KING, colour: chess_types_1.PieceColour.WHITE };
            const wRook = { type: chess_types_1.PieceType.ROOK, colour: chess_types_1.PieceColour.WHITE };
            gameState.board = [
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, wKing, null, null, null],
                [null, null, null, null, null, null, null, null],
                [wRook, null, null, null, bKing, null, null, null],
            ];
            const actual = (0, chess_1.getAllPotentialLegalMoves)(gameState, chess_types_1.PieceColour.BLACK);
            const expected = [];
            expect(actual).toHaveLength(expected.length);
            expect(actual).toEqual(expect.arrayContaining(expected));
        });
    });
    describe("isKingInCheckmate", () => {
        test("should not be checkmate", () => {
            const gameState = (0, gameState_1.initial)();
            const actual = (0, chess_1.isKingInCheckmate)(gameState, chess_types_1.PieceColour.WHITE);
            expect(actual).toBe(false);
        });
        test("should be in check but not checkmate", () => {
            const gameState = (0, gameState_1.initial)();
            const king = { type: chess_types_1.PieceType.KING, colour: chess_types_1.PieceColour.WHITE };
            const bRook = { type: chess_types_1.PieceType.ROOK, colour: chess_types_1.PieceColour.BLACK };
            gameState.board = [
                [null, null, null, null, bRook, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, king, null, null, null],
            ];
            const actual = (0, chess_1.isKingInCheckmate)(gameState, chess_types_1.PieceColour.WHITE);
            expect(actual).toBe(false);
        });
        test("should be in checkmate", () => {
            const gameState = (0, gameState_1.initial)();
            const king = { type: chess_types_1.PieceType.KING, colour: chess_types_1.PieceColour.WHITE };
            const bRook = { type: chess_types_1.PieceType.ROOK, colour: chess_types_1.PieceColour.BLACK };
            const bQueen = { type: chess_types_1.PieceType.QUEEN, colour: chess_types_1.PieceColour.BLACK };
            gameState.board = [
                [null, null, null, null, bRook, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, bQueen, null, null, null],
                [null, null, null, null, king, null, null, null],
            ];
            const actual = (0, chess_1.isKingInCheckmate)(gameState, chess_types_1.PieceColour.WHITE);
            expect(actual).toBe(true);
        });
    });
    describe("getGameOutcome", () => {
        test("should be active game, returning null", () => {
            const gameState = (0, gameState_1.initial)();
            const actual = (0, chess_1.getGameOutcome)(gameState);
            expect(actual).toBe(null);
        });
        test("should be active game despite king in check", () => {
            const gameState = (0, gameState_1.initial)();
            const wKing = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.KING };
            const bKing = { colour: chess_types_1.PieceColour.BLACK, type: chess_types_1.PieceType.KING };
            const bRook = { colour: chess_types_1.PieceColour.BLACK, type: chess_types_1.PieceType.ROOK };
            gameState.board = [
                [null, null, null, bKing, bRook, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, wKing, null, null, null],
            ];
            const actual = (0, chess_1.getGameOutcome)(gameState);
            expect(actual).toBe(null);
        });
        test("should be a black win from checkmate", () => {
            const gameState = (0, gameState_1.initial)();
            const wKing = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.KING };
            const bKing = { colour: chess_types_1.PieceColour.BLACK, type: chess_types_1.PieceType.KING };
            const bRook = { colour: chess_types_1.PieceColour.BLACK, type: chess_types_1.PieceType.ROOK };
            gameState.board = [
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, bKing, null, null, null],
                [null, null, null, null, null, null, null, null],
                [bRook, null, null, null, wKing, null, null, null],
            ];
            const actual = (0, chess_1.getGameOutcome)(gameState);
            expect(actual).toBe(chess_types_1.GameOutcome.BLACK);
        });
        test("should be a white win from checkmate", () => {
            const gameState = (0, gameState_1.initial)();
            const wKing = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.KING };
            const bKing = { colour: chess_types_1.PieceColour.BLACK, type: chess_types_1.PieceType.KING };
            const wRook = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.ROOK };
            gameState.board = [
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, wKing, null, null, null],
                [null, null, null, null, null, null, null, null],
                [wRook, null, null, null, bKing, null, null, null],
            ];
            const actual = (0, chess_1.getGameOutcome)(gameState);
            expect(actual).toBe(chess_types_1.GameOutcome.WHITE);
        });
        test("should be a draw from no moves", () => {
            const gameState = (0, gameState_1.initial)();
            const wKing = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.KING };
            const bKing = { colour: chess_types_1.PieceColour.BLACK, type: chess_types_1.PieceType.KING };
            const wRook = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.ROOK };
            gameState.currentTurn = chess_types_1.PieceColour.BLACK;
            gameState.board = [
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, wRook, wKing, wRook, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, bKing, null, null, null],
            ];
            const actual = (0, chess_1.getGameOutcome)(gameState);
            expect(actual).toBe(chess_types_1.GameOutcome.DRAW);
        });
        test("should be a draw from insufficient material. Only kings", () => {
            const gameState = (0, gameState_1.initial)();
            const wKing = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.KING };
            const bKing = { colour: chess_types_1.PieceColour.BLACK, type: chess_types_1.PieceType.KING };
            gameState.board = [
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, wKing, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, bKing, null, null, null],
            ];
            const actual = (0, chess_1.getGameOutcome)(gameState);
            expect(actual).toBe(chess_types_1.GameOutcome.DRAW);
        });
        test("should be a draw from insufficient material. Lone white bishop", () => {
            const gameState = (0, gameState_1.initial)();
            const wKing = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.KING };
            const bKing = { colour: chess_types_1.PieceColour.BLACK, type: chess_types_1.PieceType.KING };
            const wBishop = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.BISHOP };
            gameState.board = [
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, wKing, null, wBishop, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, bKing, null, null, null],
            ];
            const actual = (0, chess_1.getGameOutcome)(gameState);
            expect(actual).toBe(chess_types_1.GameOutcome.DRAW);
        });
        test("should not be a draw from insufficient material. Dual white bishops", () => {
            const gameState = (0, gameState_1.initial)();
            const wKing = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.KING };
            const bKing = { colour: chess_types_1.PieceColour.BLACK, type: chess_types_1.PieceType.KING };
            const wBishop = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.BISHOP };
            gameState.board = [
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, wKing, null, wBishop, null],
                [null, null, null, null, null, null, wBishop, null],
                [null, null, null, null, bKing, null, null, null],
            ];
            const actual = (0, chess_1.getGameOutcome)(gameState);
            expect(actual).toBe(null);
        });
        test("should be a draw from insufficient material. Lone black bishop", () => {
            const gameState = (0, gameState_1.initial)();
            const wKing = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.KING };
            const bKing = { colour: chess_types_1.PieceColour.BLACK, type: chess_types_1.PieceType.KING };
            const bBishop = { colour: chess_types_1.PieceColour.BLACK, type: chess_types_1.PieceType.BISHOP };
            gameState.board = [
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, wKing, null, bBishop, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, bKing, null, null, null],
            ];
            const actual = (0, chess_1.getGameOutcome)(gameState);
            expect(actual).toBe(chess_types_1.GameOutcome.DRAW);
        });
        test("should be a draw from insufficient material. Lone white knight", () => {
            const gameState = (0, gameState_1.initial)();
            const wKing = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.KING };
            const bKing = { colour: chess_types_1.PieceColour.BLACK, type: chess_types_1.PieceType.KING };
            const wKnight = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.KNIGHT };
            gameState.board = [
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, wKing, null, wKnight, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, bKing, null, null, null],
            ];
            const actual = (0, chess_1.getGameOutcome)(gameState);
            expect(actual).toBe(chess_types_1.GameOutcome.DRAW);
        });
        test("should not be draw from insufficient material. Dual white knights", () => {
            const gameState = (0, gameState_1.initial)();
            const wKing = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.KING };
            const bKing = { colour: chess_types_1.PieceColour.BLACK, type: chess_types_1.PieceType.KING };
            const wKnight = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.KNIGHT };
            gameState.board = [
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, wKing, null, wKnight, null],
                [null, null, null, null, null, null, wKnight, null],
                [null, null, null, null, bKing, null, null, null],
            ];
            const actual = (0, chess_1.getGameOutcome)(gameState);
            expect(actual).toBe(null);
        });
        test("should not be draw from insufficient material. Lone pawn", () => {
            const gameState = (0, gameState_1.initial)();
            const wKing = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.KING };
            const bKing = { colour: chess_types_1.PieceColour.BLACK, type: chess_types_1.PieceType.KING };
            const wPawn = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.PAWN };
            gameState.board = [
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, wKing, null, wPawn, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, bKing, null, null, null],
            ];
            const actual = (0, chess_1.getGameOutcome)(gameState);
            expect(actual).toBe(null);
        });
        test("should not be draw from insufficient material. Lone rook", () => {
            const gameState = (0, gameState_1.initial)();
            const wKing = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.KING };
            const bKing = { colour: chess_types_1.PieceColour.BLACK, type: chess_types_1.PieceType.KING };
            const wRook = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.ROOK };
            gameState.board = [
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, wKing, null, wRook, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, bKing, null, null, null],
            ];
            const actual = (0, chess_1.getGameOutcome)(gameState);
            expect(actual).toBe(null);
        });
        test("should not be draw from insufficient material. Lone queen", () => {
            const gameState = (0, gameState_1.initial)();
            const wKing = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.KING };
            const bKing = { colour: chess_types_1.PieceColour.BLACK, type: chess_types_1.PieceType.KING };
            const wQueen = { colour: chess_types_1.PieceColour.WHITE, type: chess_types_1.PieceType.QUEEN };
            gameState.board = [
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, wKing, null, wQueen, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, bKing, null, null, null],
            ];
            const actual = (0, chess_1.getGameOutcome)(gameState);
            expect(actual).toBe(null);
        });
    });
});
//# sourceMappingURL=chess.test.js.map