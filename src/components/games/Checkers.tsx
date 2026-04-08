"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import HowToPlay from "./HowToPlay";

/*
 * Checkers (Draughts) — 8x8 board
 * Red (player 1) starts at bottom, Black (player 2) at top
 * Kings can move/capture backward
 * Mandatory captures enforced
 */

type PieceType = "red" | "red-king" | "black" | "black-king" | null;

interface CheckerState {
    board: PieceType[];
    turn: "red" | "black";
    selected: number | null;
    validMoves: { to: number; captures: number[] }[];
    scores: { red: number; black: number };
    gameOver: boolean;
    winner: string | null;
}

const BOARD_SIZE = 8;

function idx(r: number, c: number) { return r * BOARD_SIZE + c; }
function rowCol(i: number): [number, number] { return [Math.floor(i / BOARD_SIZE), i % BOARD_SIZE]; }

function isRed(p: PieceType) { return p === "red" || p === "red-king"; }
function isBlack(p: PieceType) { return p === "black" || p === "black-king"; }
function isKing(p: PieceType) { return p === "red-king" || p === "black-king"; }
function belongsTo(p: PieceType, side: "red" | "black") { return side === "red" ? isRed(p) : isBlack(p); }
function isOpponent(p: PieceType, side: "red" | "black") { return side === "red" ? isBlack(p) : isRed(p); }

function initBoard(): PieceType[] {
    const board: PieceType[] = Array(64).fill(null);
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 8; c++) {
            if ((r + c) % 2 === 1) board[idx(r, c)] = "black";
        }
    }
    for (let r = 5; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            if ((r + c) % 2 === 1) board[idx(r, c)] = "red";
        }
    }
    return board;
}

function getDirections(piece: PieceType): [number, number][] {
    if (piece === "red") return [[-1, -1], [-1, 1]];
    if (piece === "black") return [[1, -1], [1, 1]];
    // kings move all 4 diagonals
    return [[-1, -1], [-1, 1], [1, -1], [1, 1]];
}

function getSimpleMoves(board: PieceType[], pos: number, piece: PieceType): { to: number; captures: number[] }[] {
    const [r, c] = rowCol(pos);
    const moves: { to: number; captures: number[] }[] = [];
    for (const [dr, dc] of getDirections(piece)) {
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8 && board[idx(nr, nc)] === null) {
            moves.push({ to: idx(nr, nc), captures: [] });
        }
    }
    return moves;
}

function getCaptureMoves(board: PieceType[], pos: number, piece: PieceType, side: "red" | "black"): { to: number; captures: number[] }[] {
    const results: { to: number; captures: number[] }[] = [];

    function dfs(currentPos: number, currentBoard: PieceType[], captured: number[]) {
        const [r, c] = rowCol(currentPos);
        let foundCapture = false;

        for (const [dr, dc] of getDirections(piece)) {
            const mr = r + dr, mc = c + dc; // mid (captured piece)
            const lr = r + 2 * dr, lc = c + 2 * dc; // landing
            if (lr < 0 || lr >= 8 || lc < 0 || lc >= 8) continue;
            const midIdx = idx(mr, mc);
            const landIdx = idx(lr, lc);
            if (isOpponent(currentBoard[midIdx], side) && currentBoard[landIdx] === null && !captured.includes(midIdx)) {
                foundCapture = true;
                const newBoard = [...currentBoard];
                newBoard[currentPos] = null;
                newBoard[midIdx] = null;
                newBoard[landIdx] = piece;
                dfs(landIdx, newBoard, [...captured, midIdx]);
            }
        }

        if (!foundCapture && captured.length > 0) {
            results.push({ to: currentPos, captures: captured });
        }
    }

    dfs(pos, board, []);
    return results;
}

function getAllMoves(board: PieceType[], side: "red" | "black"): Map<number, { to: number; captures: number[] }[]> {
    const allMoves = new Map<number, { to: number; captures: number[] }[]>();
    let hasCaptures = false;

    // First check for captures (mandatory)
    for (let i = 0; i < 64; i++) {
        if (belongsTo(board[i], side)) {
            const captures = getCaptureMoves(board, i, board[i]!, side);
            if (captures.length > 0) {
                hasCaptures = true;
                allMoves.set(i, captures);
            }
        }
    }

    if (hasCaptures) return allMoves;

    // Simple moves
    for (let i = 0; i < 64; i++) {
        if (belongsTo(board[i], side)) {
            const moves = getSimpleMoves(board, i, board[i]!);
            if (moves.length > 0) allMoves.set(i, moves);
        }
    }

    return allMoves;
}

function promoteKings(board: PieceType[]): PieceType[] {
    const newBoard = [...board];
    for (let c = 0; c < 8; c++) {
        if (newBoard[idx(0, c)] === "red") newBoard[idx(0, c)] = "red-king";
        if (newBoard[idx(7, c)] === "black") newBoard[idx(7, c)] = "black-king";
    }
    return newBoard;
}

export default function Checkers() {
    const [state, setState] = useState<CheckerState>(() => {
        const board = initBoard();
        return {
            board,
            turn: "red",
            selected: null,
            validMoves: [],
            scores: { red: 0, black: 0 },
            gameOver: false,
            winner: null,
        };
    });

    const allAvailableMoves = getAllMoves(state.board, state.turn);

    const reset = useCallback(() => {
        setState({
            board: initBoard(),
            turn: "red",
            selected: null,
            validMoves: [],
            scores: { red: 0, black: 0 },
            gameOver: false,
            winner: null,
        });
    }, []);

    const handleClick = useCallback((pos: number) => {
        if (state.gameOver) return;

        const { board, turn, selected, validMoves, scores } = state;

        // Clicking on valid move
        if (selected !== null) {
            const move = validMoves.find((m) => m.to === pos);
            if (move) {
                const newBoard = [...board];
                newBoard[pos] = newBoard[selected];
                newBoard[selected] = null;
                for (const cap of move.captures) {
                    newBoard[cap] = null;
                }

                const promoted = promoteKings(newBoard);
                const newScores = {
                    red: scores.red + (turn === "red" ? move.captures.length : 0),
                    black: scores.black + (turn === "black" ? move.captures.length : 0),
                };

                const nextTurn = turn === "red" ? "black" : "red";
                const nextMoves = getAllMoves(promoted, nextTurn);

                let gameOver = false;
                let winner: string | null = null;
                if (nextMoves.size === 0) {
                    gameOver = true;
                    winner = turn === "red" ? "Red" : "Black";
                }

                setState({
                    board: promoted,
                    turn: nextTurn,
                    selected: null,
                    validMoves: [],
                    scores: newScores,
                    gameOver,
                    winner,
                });
                return;
            }
        }

        // Select own piece (only if it has moves)
        if (belongsTo(board[pos], turn) && allAvailableMoves.has(pos)) {
            setState((s) => ({
                ...s,
                selected: pos,
                validMoves: allAvailableMoves.get(pos) || [],
            }));
            return;
        }

        // Deselect
        setState((s) => ({ ...s, selected: null, validMoves: [] }));
    }, [state, allAvailableMoves]);

    const cellSize = 40;
    const boardPx = cellSize * 8;

    return (
        <div className="max-w-lg mx-auto">
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold gradient-text-static mb-2">Checkers</h2>
                <p className="text-[10px] font-mono text-[#469D89]/50 tracking-widest uppercase">
                    Red vs Black — 2 Player Local
                </p>
            </div>

            {/* Scoreboard */}
            <div className="flex justify-center gap-8 mb-4">
                <div className="text-center">
                    <div className="text-2xl font-bold font-mono text-red-400">{state.scores.red}</div>
                    <div className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">Red</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold font-mono text-gray-300">{state.scores.black}</div>
                    <div className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">Black</div>
                </div>
            </div>

            {/* Status */}
            <div className="text-center mb-4">
                <span className={`text-sm font-mono tracking-widest ${state.gameOver ? "text-[#469D89]" : "text-muted-foreground"}`}>
                    {state.gameOver
                        ? `${state.winner} wins!`
                        : `${state.turn === "red" ? "Red" : "Black"}'s turn`}
                </span>
            </div>

            {/* Board */}
            <div className="flex justify-center mb-6">
                <div className="border border-[#469D89]/20 rounded-xl overflow-hidden" style={{ width: boardPx, height: boardPx }}>
                    <div className="grid grid-cols-8" style={{ width: boardPx, height: boardPx }}>
                        {Array.from({ length: 64 }, (_, i) => {
                            const [r, c] = rowCol(i);
                            const isDark = (r + c) % 2 === 1;
                            const piece = state.board[i];
                            const isSelected = state.selected === i;
                            const isValidTarget = state.validMoves.some((m) => m.to === i);
                            const hasAvailableMoves = belongsTo(piece, state.turn) && allAvailableMoves.has(i);

                            return (
                                <div
                                    key={i}
                                    onClick={() => handleClick(i)}
                                    className={`relative flex items-center justify-center transition-all ${
                                        isDark ? "bg-[#1a2e29]" : "bg-[#0a1612]"
                                    } ${hasAvailableMoves && !state.gameOver ? "cursor-pointer" : ""} ${
                                        isValidTarget ? "cursor-pointer" : ""
                                    }`}
                                    style={{ width: cellSize, height: cellSize }}
                                >
                                    {isSelected && (
                                        <div className="absolute inset-0.5 rounded-sm border-2 border-[#469D89]/60" />
                                    )}

                                    {isValidTarget && !piece && (
                                        <div className="w-3 h-3 rounded-full bg-[#469D89]/30 border border-[#469D89]/50" />
                                    )}

                                    {piece && (
                                        <motion.div
                                            className={`w-[30px] h-[30px] rounded-full border-2 flex items-center justify-center text-[10px] font-bold ${
                                                isRed(piece)
                                                    ? "bg-red-500/30 border-red-400 text-red-300"
                                                    : "bg-gray-500/30 border-gray-300 text-gray-200"
                                            } ${isValidTarget ? "ring-2 ring-[#469D89]/50" : ""}`}
                                            whileHover={hasAvailableMoves ? { scale: 1.15 } : {}}
                                        >
                                            {isKing(piece) ? "K" : ""}
                                        </motion.div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Reset */}
            <div className="text-center space-y-3">
                <motion.button
                    onClick={reset}
                    className="px-6 py-2.5 text-[11px] font-mono tracking-widest uppercase text-[#469D89] border border-[#469D89]/40 rounded-lg hover:bg-[#469D89]/10 hover:border-[#469D89] transition-all duration-200"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                >
                    New Game
                </motion.button>
                <HowToPlay>
                    <ul className="space-y-1.5 text-[12px] font-mono text-muted-foreground/70 leading-5">
                        <li>Red moves first — tap a piece, then tap a destination</li>
                        <li>Pieces move diagonally forward on dark squares</li>
                        <li>Capture by jumping over opponent pieces</li>
                        <li>Captures are mandatory — multi-jumps when available</li>
                        <li>Reach the opposite end to become a King (moves backward too)</li>
                        <li>Win by capturing all opponent pieces</li>
                    </ul>
                </HowToPlay>
            </div>
        </div>
    );
}
