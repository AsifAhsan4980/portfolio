"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import HowToPlay from "./HowToPlay";

/*
 * Baro Guti (12 Guti) — Traditional Bangladeshi Capture Board Game
 * Triangular board with 3 rows of 6 points + 1 apex = simplified to a
 * diamond/rhombus grid: we use a standard 5-point-wide board
 * Each player has 6 pieces. Capture by jumping. Win by eliminating all opponent pieces.
 *
 * Board layout: We use a simpler version on a rectangular grid with diagonals:
 *   Row 0: 5 points
 *   Row 1: 5 points
 *   Row 2: 5 points (center row)
 * Total: 15 points on a 3x5 grid with orthogonal + diagonal connections
 * Player 1 (Red): positions 0-5 (top row + first of middle)
 * Player 2 (Blue): positions 9-14 (last of middle + bottom row)
 */

type Piece = "red" | "blue" | null;

const ROWS = 3;
const COLS = 5;
const TOTAL = ROWS * COLS;

function buildAdj(): number[][] {
    const adj: number[][] = Array.from({ length: TOTAL }, () => []);
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            const i = r * COLS + c;
            // orthogonal
            if (r > 0) adj[i].push((r - 1) * COLS + c);
            if (r < ROWS - 1) adj[i].push((r + 1) * COLS + c);
            if (c > 0) adj[i].push(r * COLS + (c - 1));
            if (c < COLS - 1) adj[i].push(r * COLS + (c + 1));
            // diagonals where parity matches
            if ((r + c) % 2 === 0) {
                if (r > 0 && c > 0) adj[i].push((r - 1) * COLS + (c - 1));
                if (r > 0 && c < COLS - 1) adj[i].push((r - 1) * COLS + (c + 1));
                if (r < ROWS - 1 && c > 0) adj[i].push((r + 1) * COLS + (c - 1));
                if (r < ROWS - 1 && c < COLS - 1) adj[i].push((r + 1) * COLS + (c + 1));
            }
        }
    }
    return adj;
}

const ADJ = buildAdj();

function getCaptures(board: Piece[], pos: number, side: Piece): { to: number; captured: number }[] {
    const moves: { to: number; captured: number }[] = [];
    const r = Math.floor(pos / COLS), c = pos % COLS;
    const opponent = side === "red" ? "blue" : "red";

    for (const nb of ADJ[pos]) {
        if (board[nb] !== opponent) continue;
        const nr = Math.floor(nb / COLS), nc = nb % COLS;
        const lr = nr + (nr - r), lc = nc + (nc - c);
        if (lr < 0 || lr >= ROWS || lc < 0 || lc >= COLS) continue;
        const land = lr * COLS + lc;
        if (board[land] === null) moves.push({ to: land, captured: nb });
    }
    return moves;
}

function getValidMoves(board: Piece[], pos: number, side: Piece): number[] {
    const moves: number[] = [];
    // Simple moves
    for (const nb of ADJ[pos]) {
        if (board[nb] === null) moves.push(nb);
    }
    // Captures
    for (const cap of getCaptures(board, pos, side)) {
        if (!moves.includes(cap.to)) moves.push(cap.to);
    }
    return moves;
}

function hasAnyMoves(board: Piece[], side: Piece): boolean {
    for (let i = 0; i < TOTAL; i++) {
        if (board[i] === side && getValidMoves(board, i, side).length > 0) return true;
    }
    return false;
}

function hasMandatoryCapture(board: Piece[], side: Piece): boolean {
    for (let i = 0; i < TOTAL; i++) {
        if (board[i] === side && getCaptures(board, i, side).length > 0) return true;
    }
    return false;
}

function initBoard(): Piece[] {
    const board: Piece[] = Array(TOTAL).fill(null);
    // Red: top row (0-4) + first of middle (5)
    for (let i = 0; i < 6; i++) board[i] = "red";
    // Blue: last of middle (9) + bottom row (10-14)
    for (let i = 9; i < 15; i++) board[i] = "blue";
    return board;
}

interface State {
    board: Piece[];
    turn: "red" | "blue";
    selected: number | null;
    validMoves: number[];
    scores: { red: number; blue: number };
    gameOver: boolean;
    winner: string | null;
}

function buildLines(): [number, number][] {
    const lines: [number, number][] = [];
    const set = new Set<string>();
    for (let i = 0; i < TOTAL; i++) {
        for (const j of ADJ[i]) {
            const key = `${Math.min(i, j)}-${Math.max(i, j)}`;
            if (!set.has(key)) { set.add(key); lines.push([i, j]); }
        }
    }
    return lines;
}
const LINES = buildLines();

export default function BaroGuti() {
    const [state, setState] = useState<State>({
        board: initBoard(),
        turn: "red",
        selected: null,
        validMoves: [],
        scores: { red: 0, blue: 0 },
        gameOver: false,
        winner: null,
    });

    const reset = useCallback(() => {
        setState({
            board: initBoard(),
            turn: "red",
            selected: null,
            validMoves: [],
            scores: { red: 0, blue: 0 },
            gameOver: false,
            winner: null,
        });
    }, []);

    const handleClick = useCallback((pos: number) => {
        if (state.gameOver) return;
        const { board, turn, selected, validMoves, scores } = state;

        // Move to valid destination
        if (selected !== null && validMoves.includes(pos)) {
            const newBoard = [...board];
            newBoard[pos] = newBoard[selected];
            newBoard[selected] = null;

            const newScores = { ...scores };
            const cap = getCaptures(board, selected, turn).find((c) => c.to === pos);
            if (cap) {
                newBoard[cap.captured] = null;
                if (turn === "red") newScores.red++;
                else newScores.blue++;
            }

            const nextTurn = turn === "red" ? "blue" : "red";
            const opponentPieces = newBoard.filter((p) => p === nextTurn).length;

            let gameOver = false;
            let winner: string | null = null;

            if (opponentPieces === 0) {
                gameOver = true;
                winner = turn === "red" ? "Red" : "Blue";
            } else if (!hasAnyMoves(newBoard, nextTurn)) {
                gameOver = true;
                winner = turn === "red" ? "Red" : "Blue";
            }

            setState({ board: newBoard, turn: nextTurn, selected: null, validMoves: [], scores: newScores, gameOver, winner });
            return;
        }

        // Select own piece
        if (board[pos] === turn) {
            const mustCapture = hasMandatoryCapture(board, turn);
            let moves: number[];
            if (mustCapture) {
                // Only show capture moves for pieces that can capture
                const caps = getCaptures(board, pos, turn);
                moves = caps.map((c) => c.to);
            } else {
                moves = getValidMoves(board, pos, turn);
            }
            setState({ ...state, selected: pos, validMoves: moves });
            return;
        }

        setState({ ...state, selected: null, validMoves: [] });
    }, [state]);

    const size = 340;
    const padX = 40, padY = 60;
    const spX = (size - 2 * padX) / (COLS - 1);
    const spY = (size - 2 * padY) / (ROWS - 1);
    const getXY = (i: number): [number, number] => [padX + (i % COLS) * spX, padY + Math.floor(i / COLS) * spY];

    return (
        <div className="max-w-md mx-auto">
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold gradient-text-static mb-2">Baro Guti</h2>
                <p className="text-[10px] font-mono text-[#469D89]/50 tracking-widest uppercase">
                    12 Guti — Bangladeshi Capture Game · 2 Player
                </p>
            </div>

            <div className="flex justify-center gap-8 mb-4">
                <div className="text-center">
                    <div className="text-2xl font-bold font-mono text-red-400">{state.scores.red}</div>
                    <div className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">Red</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold font-mono text-blue-400">{state.scores.blue}</div>
                    <div className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">Blue</div>
                </div>
            </div>

            <div className="text-center mb-4">
                <span className={`text-sm font-mono tracking-widest ${state.gameOver ? "text-[#469D89]" : "text-muted-foreground"}`}>
                    {state.gameOver ? `${state.winner} wins!` : `${state.turn === "red" ? "Red" : "Blue"}'s turn`}
                </span>
            </div>

            <div className="flex justify-center mb-6">
                <div className="border border-[#469D89]/20 rounded-2xl p-3 bg-background/50 backdrop-blur-sm">
                    <svg width={size} height={size * 0.65} viewBox={`0 0 ${size} ${size * 0.65}`}>
                        {LINES.map(([a, b], i) => {
                            const [x1, y1] = getXY(a);
                            const [x2, y2] = getXY(b);
                            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(70,157,137,0.2)" strokeWidth="1.5" />;
                        })}

                        {state.board.map((piece, i) => {
                            const [x, y] = getXY(i);
                            const isSel = state.selected === i;
                            const isValid = state.validMoves.includes(i);

                            return (
                                <g key={i} onClick={() => handleClick(i)} style={{ cursor: "pointer" }}>
                                    <circle cx={x} cy={y} r={18} fill="transparent" />
                                    {isValid && !piece && <circle cx={x} cy={y} r={10} fill="rgba(70,157,137,0.15)" stroke="rgba(70,157,137,0.5)" strokeWidth="1.5" strokeDasharray="3 2" />}
                                    {!piece && !isValid && <circle cx={x} cy={y} r={4} fill="rgba(70,157,137,0.25)" />}
                                    {piece === "red" && (
                                        <>
                                            {isSel && <circle cx={x} cy={y} r={17} fill="none" stroke="rgba(248,113,113,0.5)" strokeWidth="2" />}
                                            <circle cx={x} cy={y} r={12} fill="rgba(248,113,113,0.25)" stroke="rgb(248,113,113)" strokeWidth="2" />
                                        </>
                                    )}
                                    {piece === "blue" && (
                                        <>
                                            {isSel && <circle cx={x} cy={y} r={17} fill="none" stroke="rgba(96,165,250,0.5)" strokeWidth="2" />}
                                            <circle cx={x} cy={y} r={12} fill="rgba(96,165,250,0.25)" stroke="rgb(96,165,250)" strokeWidth="2" />
                                        </>
                                    )}
                                </g>
                            );
                        })}
                    </svg>
                </div>
            </div>

            <div className="text-center space-y-3">
                <motion.button onClick={reset} className="px-6 py-2.5 text-[11px] font-mono tracking-widest uppercase text-[#469D89] border border-[#469D89]/40 rounded-lg hover:bg-[#469D89]/10 hover:border-[#469D89] transition-all duration-200" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    New Game
                </motion.button>
                <HowToPlay>
                    <ul className="space-y-1.5 text-[12px] font-mono text-muted-foreground/70 leading-5">
                        <li>Each player has 6 pieces (12 total)</li>
                        <li>Move one step along a line to an empty point</li>
                        <li>Capture by jumping over opponent pieces</li>
                        <li>Captures are mandatory when available</li>
                        <li>Win by capturing all opponent pieces</li>
                    </ul>
                </HowToPlay>
            </div>
        </div>
    );
}
