"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import HowToPlay from "./HowToPlay";

/*
 * Sholo Guti (16 Guti) — Traditional Bangladeshi Board Game
 * Board: 5x5 grid with diagonal connections
 * Pieces: 16 Guti (goats) vs 1 Tiger
 * Tiger captures by jumping over a guti. Tiger wins if it captures enough guti.
 * Guti win if they trap the tiger so it can't move.
 */

// Board positions: 5x5 = 25 points (0-24)
// row = Math.floor(i/5), col = i%5
type Piece = "tiger" | "guti" | null;

interface GameState {
    board: Piece[];
    turn: "tiger" | "guti";
    selected: number | null;
    validMoves: number[];
    capturedGuti: number;
    gameOver: boolean;
    winner: string | null;
}

// Adjacency map: each position -> list of neighbors
// Includes orthogonal + diagonal connections (for positions where row+col is even, diagonals apply)
function buildAdjacency(): number[][] {
    const adj: number[][] = Array.from({ length: 25 }, () => []);
    for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 5; c++) {
            const i = r * 5 + c;
            // orthogonal
            if (r > 0) adj[i].push((r - 1) * 5 + c);
            if (r < 4) adj[i].push((r + 1) * 5 + c);
            if (c > 0) adj[i].push(r * 5 + (c - 1));
            if (c < 4) adj[i].push(r * 5 + (c + 1));
            // diagonals (only when both row and col have same parity)
            if ((r + c) % 2 === 0) {
                if (r > 0 && c > 0) adj[i].push((r - 1) * 5 + (c - 1));
                if (r > 0 && c < 4) adj[i].push((r - 1) * 5 + (c + 1));
                if (r < 4 && c > 0) adj[i].push((r + 1) * 5 + (c - 1));
                if (r < 4 && c < 4) adj[i].push((r + 1) * 5 + (c + 1));
            }
        }
    }
    return adj;
}

const ADJ = buildAdjacency();

// Capture moves for tiger: jump over adjacent guti to land on empty
function getCaptureMovesForTiger(board: Piece[], pos: number): { to: number; captured: number }[] {
    const moves: { to: number; captured: number }[] = [];
    const r = Math.floor(pos / 5);
    const c = pos % 5;

    for (const neighbor of ADJ[pos]) {
        if (board[neighbor] !== "guti") continue;
        const nr = Math.floor(neighbor / 5);
        const nc = neighbor % 5;
        // Landing position is the mirror of neighbor across pos
        const lr = nr + (nr - r);
        const lc = nc + (nc - c);
        if (lr < 0 || lr > 4 || lc < 0 || lc > 4) continue;
        const landing = lr * 5 + lc;
        if (board[landing] === null) {
            moves.push({ to: landing, captured: neighbor });
        }
    }
    return moves;
}

function getValidMovesForPiece(board: Piece[], pos: number, piece: Piece): number[] {
    if (!piece) return [];
    const moves: number[] = [];

    // Simple moves to adjacent empty
    for (const neighbor of ADJ[pos]) {
        if (board[neighbor] === null) moves.push(neighbor);
    }

    // Tiger can also capture
    if (piece === "tiger") {
        for (const cap of getCaptureMovesForTiger(board, pos)) {
            if (!moves.includes(cap.to)) moves.push(cap.to);
        }
    }

    return moves;
}

function initBoard(): Piece[] {
    const board: Piece[] = Array(25).fill(null);
    // Tiger starts at center
    board[12] = "tiger";
    // 16 guti fill remaining spots in rows 0,1 (10) and some of row 2 and rows 3,4
    // Classic setup: guti on all positions except center
    const gutiPositions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 20, 21];
    for (const pos of gutiPositions) {
        board[pos] = "guti";
    }
    return board;
}

function checkGameOver(board: Piece[], capturedGuti: number): { over: boolean; winner: string | null } {
    // Tiger wins if captured 4+ guti (guti can't trap anymore)
    if (capturedGuti >= 4) {
        return { over: true, winner: "Tiger" };
    }

    // Find tiger position
    const tigerPos = board.indexOf("tiger");
    if (tigerPos === -1) return { over: true, winner: "Guti" };

    // Check if tiger has any valid moves
    const tigerMoves = getValidMovesForPiece(board, tigerPos, "tiger");
    if (tigerMoves.length === 0) {
        return { over: true, winner: "Guti" };
    }

    return { over: false, winner: null };
}

export default function SholoGuti() {
    const [state, setState] = useState<GameState>({
        board: initBoard(),
        turn: "tiger",
        selected: null,
        validMoves: [],
        capturedGuti: 0,
        gameOver: false,
        winner: null,
    });

    const reset = useCallback(() => {
        setState({
            board: initBoard(),
            turn: "tiger",
            selected: null,
            validMoves: [],
            capturedGuti: 0,
            gameOver: false,
            winner: null,
        });
    }, []);

    const handleClick = useCallback(
        (pos: number) => {
            if (state.gameOver) return;

            const { board, turn, selected } = state;

            // If a piece is selected and clicking on a valid move destination
            if (selected !== null && state.validMoves.includes(pos)) {
                const newBoard = [...board];
                const piece = newBoard[selected];
                newBoard[selected] = null;
                newBoard[pos] = piece;

                let newCaptured = state.capturedGuti;

                // Check if tiger captured
                if (piece === "tiger") {
                    const captures = getCaptureMovesForTiger(board, selected);
                    const capture = captures.find((c) => c.to === pos);
                    if (capture) {
                        newBoard[capture.captured] = null;
                        newCaptured++;
                    }
                }

                const { over, winner } = checkGameOver(newBoard, newCaptured);

                setState({
                    board: newBoard,
                    turn: turn === "tiger" ? "guti" : "tiger",
                    selected: null,
                    validMoves: [],
                    capturedGuti: newCaptured,
                    gameOver: over,
                    winner,
                });
                return;
            }

            // Select a piece
            if (board[pos] === turn) {
                const moves = getValidMovesForPiece(board, pos, turn);
                setState((s) => ({
                    ...s,
                    selected: pos,
                    validMoves: moves,
                }));
                return;
            }

            // Deselect
            setState((s) => ({ ...s, selected: null, validMoves: [] }));
        },
        [state]
    );

    // SVG board rendering
    const size = 320;
    const padding = 40;
    const spacing = (size - 2 * padding) / 4;
    const getXY = (pos: number): [number, number] => {
        const r = Math.floor(pos / 5);
        const c = pos % 5;
        return [padding + c * spacing, padding + r * spacing];
    };

    // Build lines from adjacency
    const lines: [number, number][] = [];
    const lineSet = new Set<string>();
    for (let i = 0; i < 25; i++) {
        for (const j of ADJ[i]) {
            const key = `${Math.min(i, j)}-${Math.max(i, j)}`;
            if (!lineSet.has(key)) {
                lineSet.add(key);
                lines.push([i, j]);
            }
        }
    }

    return (
        <div className="max-w-md mx-auto">
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold gradient-text-static mb-2">Sholo Guti</h2>
                <p className="text-[10px] font-mono text-[#469D89]/50 tracking-widest uppercase">
                    16 Guti vs 1 Tiger — 2 Player Local
                </p>
            </div>

            {/* Info */}
            <div className="flex justify-center gap-6 mb-4">
                <div className="text-center">
                    <div className="text-lg font-bold font-mono text-orange-400">
                        {state.capturedGuti}
                    </div>
                    <div className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">
                        Captured
                    </div>
                </div>
                <div className="text-center">
                    <div className="text-lg font-bold font-mono text-[#469D89]">
                        {16 - state.capturedGuti}
                    </div>
                    <div className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">
                        Guti Left
                    </div>
                </div>
            </div>

            {/* Status */}
            <div className="text-center mb-4">
                <span className={`text-sm font-mono tracking-widest ${state.gameOver ? "text-[#469D89]" : "text-muted-foreground"}`}>
                    {state.gameOver
                        ? `${state.winner} wins!`
                        : `${state.turn === "tiger" ? "Tiger" : "Guti"}'s turn — tap to select & move`}
                </span>
            </div>

            {/* Board */}
            <div className="flex justify-center mb-6">
                <div className="border border-[#469D89]/20 rounded-2xl p-3 bg-background/50 backdrop-blur-sm">
                    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                        {/* Lines */}
                        {lines.map(([a, b], i) => {
                            const [x1, y1] = getXY(a);
                            const [x2, y2] = getXY(b);
                            return (
                                <line
                                    key={i}
                                    x1={x1} y1={y1} x2={x2} y2={y2}
                                    stroke="rgba(70,157,137,0.2)"
                                    strokeWidth="1.5"
                                />
                            );
                        })}

                        {/* Points and pieces */}
                        {state.board.map((piece, i) => {
                            const [x, y] = getXY(i);
                            const isSelected = state.selected === i;
                            const isValid = state.validMoves.includes(i);

                            return (
                                <g key={i} onClick={() => handleClick(i)} style={{ cursor: "pointer" }}>
                                    {/* Clickable area */}
                                    <circle cx={x} cy={y} r={18} fill="transparent" />

                                    {/* Valid move indicator */}
                                    {isValid && !piece && (
                                        <circle
                                            cx={x} cy={y} r={10}
                                            fill="rgba(70,157,137,0.15)"
                                            stroke="rgba(70,157,137,0.5)"
                                            strokeWidth="1.5"
                                            strokeDasharray="3 2"
                                        />
                                    )}

                                    {/* Empty point */}
                                    {!piece && !isValid && (
                                        <circle cx={x} cy={y} r={4} fill="rgba(70,157,137,0.25)" />
                                    )}

                                    {/* Tiger */}
                                    {piece === "tiger" && (
                                        <>
                                            {isSelected && (
                                                <circle cx={x} cy={y} r={17} fill="none" stroke="rgba(251,146,60,0.5)" strokeWidth="2" />
                                            )}
                                            <circle cx={x} cy={y} r={13} fill="rgba(251,146,60,0.2)" stroke="rgb(251,146,60)" strokeWidth="2" />
                                            <text x={x} y={y + 1} textAnchor="middle" dominantBaseline="central" fontSize="14" fill="rgb(251,146,60)">
                                                T
                                            </text>
                                        </>
                                    )}

                                    {/* Guti */}
                                    {piece === "guti" && (
                                        <>
                                            {isSelected && (
                                                <circle cx={x} cy={y} r={17} fill="none" stroke="rgba(70,157,137,0.5)" strokeWidth="2" />
                                            )}
                                            <circle cx={x} cy={y} r={11} fill="rgba(70,157,137,0.2)" stroke="rgb(70,157,137)" strokeWidth="2" />
                                        </>
                                    )}
                                </g>
                            );
                        })}
                    </svg>
                </div>
            </div>

            {/* Rules + Reset */}
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
                        <li><span className="text-orange-400 mr-1.5">T</span> Tiger moves to adjacent empty points</li>
                        <li><span className="text-orange-400 mr-1.5">T</span> Tiger captures by jumping over a guti</li>
                        <li><span className="text-[#469D89] mr-1.5">●</span> Guti move to adjacent empty points</li>
                        <li><span className="text-[#469D89] mr-1.5">●</span> Guti win by trapping the tiger</li>
                        <li><span className="text-orange-400 mr-1.5">T</span> Tiger wins after capturing 4 guti</li>
                    </ul>
                </HowToPlay>
            </div>
        </div>
    );
}
