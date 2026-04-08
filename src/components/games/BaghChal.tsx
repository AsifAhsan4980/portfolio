"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import HowToPlay from "./HowToPlay";

/*
 * Bagh-Chal (Tiger & Goats)
 * 5x5 grid with diagonal lines at even-parity intersections
 * 4 Tigers vs 20 Goats
 * Phase 1: Goat player places goats one per turn
 * Phase 2: Goats move along lines
 * Tigers move or capture by jumping
 * Tigers win by capturing 5 goats, Goats win by immobilizing all tigers
 */

type Piece = "tiger" | "goat" | null;

// Build adjacency for 5x5 grid (same as Sholo Guti)
function buildAdj(): number[][] {
    const adj: number[][] = Array.from({ length: 25 }, () => []);
    for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 5; c++) {
            const i = r * 5 + c;
            if (r > 0) adj[i].push((r - 1) * 5 + c);
            if (r < 4) adj[i].push((r + 1) * 5 + c);
            if (c > 0) adj[i].push(r * 5 + (c - 1));
            if (c < 4) adj[i].push(r * 5 + (c + 1));
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

const ADJ = buildAdj();

function getTigerCaptures(board: Piece[], pos: number): { to: number; captured: number }[] {
    const moves: { to: number; captured: number }[] = [];
    const r = Math.floor(pos / 5), c = pos % 5;
    for (const nb of ADJ[pos]) {
        if (board[nb] !== "goat") continue;
        const nr = Math.floor(nb / 5), nc = nb % 5;
        const lr = nr + (nr - r), lc = nc + (nc - c);
        if (lr < 0 || lr > 4 || lc < 0 || lc > 4) continue;
        const land = lr * 5 + lc;
        if (board[land] === null) moves.push({ to: land, captured: nb });
    }
    return moves;
}

function canTigersMove(board: Piece[]): boolean {
    for (let i = 0; i < 25; i++) {
        if (board[i] !== "tiger") continue;
        for (const nb of ADJ[i]) {
            if (board[nb] === null) return true;
        }
        if (getTigerCaptures(board, i).length > 0) return true;
    }
    return false;
}

interface State {
    board: Piece[];
    turn: "tiger" | "goat";
    phase: "placement" | "movement";
    goatsPlaced: number;
    goatsCaptured: number;
    selected: number | null;
    validMoves: number[];
    gameOver: boolean;
    winner: string | null;
}

function initState(): State {
    const board: Piece[] = Array(25).fill(null);
    board[0] = "tiger"; board[4] = "tiger";
    board[20] = "tiger"; board[24] = "tiger";
    return {
        board, turn: "goat", phase: "placement",
        goatsPlaced: 0, goatsCaptured: 0,
        selected: null, validMoves: [],
        gameOver: false, winner: null,
    };
}

// Build lines for rendering
function buildLines(): [number, number][] {
    const lines: [number, number][] = [];
    const set = new Set<string>();
    for (let i = 0; i < 25; i++) {
        for (const j of ADJ[i]) {
            const key = `${Math.min(i, j)}-${Math.max(i, j)}`;
            if (!set.has(key)) { set.add(key); lines.push([i, j]); }
        }
    }
    return lines;
}
const LINES = buildLines();

export default function BaghChal() {
    const [state, setState] = useState<State>(initState);

    const reset = useCallback(() => setState(initState()), []);

    const handleClick = useCallback((pos: number) => {
        if (state.gameOver) return;
        const { board, turn, phase, selected, validMoves, goatsPlaced, goatsCaptured } = state;

        // GOAT PLACEMENT PHASE
        if (turn === "goat" && phase === "placement") {
            if (board[pos] !== null) return;
            const newBoard = [...board];
            newBoard[pos] = "goat";
            const newPlaced = goatsPlaced + 1;
            const newPhase = newPlaced >= 20 ? "movement" : "placement";

            // Check if tigers can still move
            if (!canTigersMove(newBoard)) {
                setState({ ...state, board: newBoard, goatsPlaced: newPlaced, phase: newPhase, gameOver: true, winner: "Goats" });
                return;
            }

            setState({ ...state, board: newBoard, turn: "tiger", goatsPlaced: newPlaced, phase: newPhase, selected: null, validMoves: [] });
            return;
        }

        // If selected and clicking on valid move
        if (selected !== null && validMoves.includes(pos)) {
            const newBoard = [...board];
            newBoard[pos] = newBoard[selected];
            newBoard[selected] = null;

            let newCaptured = goatsCaptured;
            if (turn === "tiger") {
                const cap = getTigerCaptures(board, selected).find((c) => c.to === pos);
                if (cap) { newBoard[cap.captured] = null; newCaptured++; }
            }

            // Check win
            if (newCaptured >= 5) {
                setState({ ...state, board: newBoard, goatsCaptured: newCaptured, gameOver: true, winner: "Tigers", selected: null, validMoves: [] });
                return;
            }

            const nextTurn = turn === "tiger" ? "goat" : "tiger";

            // Check if tigers trapped
            if (nextTurn === "tiger" && !canTigersMove(newBoard)) {
                setState({ ...state, board: newBoard, goatsCaptured: newCaptured, gameOver: true, winner: "Goats", selected: null, validMoves: [] });
                return;
            }

            setState({ ...state, board: newBoard, turn: nextTurn, goatsCaptured: newCaptured, selected: null, validMoves: [] });
            return;
        }

        // Select a piece
        if (board[pos] === turn) {
            const moves: number[] = [];
            for (const nb of ADJ[pos]) {
                if (board[nb] === null) moves.push(nb);
            }
            if (turn === "tiger") {
                for (const cap of getTigerCaptures(board, pos)) {
                    if (!moves.includes(cap.to)) moves.push(cap.to);
                }
            }
            setState({ ...state, selected: pos, validMoves: moves });
            return;
        }

        setState({ ...state, selected: null, validMoves: [] });
    }, [state]);

    const size = 320;
    const pad = 40;
    const sp = (size - 2 * pad) / 4;
    const getXY = (i: number): [number, number] => [pad + (i % 5) * sp, pad + Math.floor(i / 5) * sp];

    return (
        <div className="max-w-md mx-auto">
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold gradient-text-static mb-2">Bagh-Chal</h2>
                <p className="text-[10px] font-mono text-[#469D89]/50 tracking-widest uppercase">
                    Tiger & Goats — Nepal/Bengal Traditional · 2 Player
                </p>
            </div>

            <div className="flex justify-center gap-6 mb-4">
                <div className="text-center">
                    <div className="text-lg font-bold font-mono text-orange-400">{state.goatsCaptured}/5</div>
                    <div className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">Captured</div>
                </div>
                <div className="text-center">
                    <div className="text-lg font-bold font-mono text-[#469D89]">{state.goatsPlaced}/20</div>
                    <div className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">Placed</div>
                </div>
            </div>

            <div className="text-center mb-4">
                <span className={`text-sm font-mono tracking-widest ${state.gameOver ? "text-[#469D89]" : "text-muted-foreground"}`}>
                    {state.gameOver
                        ? `${state.winner} win!`
                        : state.turn === "goat" && state.phase === "placement"
                        ? "Goat: tap an empty point to place"
                        : `${state.turn === "tiger" ? "Tiger" : "Goat"}: select & move`}
                </span>
            </div>

            <div className="flex justify-center mb-6">
                <div className="border border-[#469D89]/20 rounded-2xl p-3 bg-background/50 backdrop-blur-sm">
                    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
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

                                    {isValid && !piece && (
                                        <circle cx={x} cy={y} r={10} fill="rgba(70,157,137,0.15)" stroke="rgba(70,157,137,0.5)" strokeWidth="1.5" strokeDasharray="3 2" />
                                    )}

                                    {!piece && !isValid && (
                                        <circle cx={x} cy={y} r={4} fill="rgba(70,157,137,0.25)" />
                                    )}

                                    {piece === "tiger" && (
                                        <>
                                            {isSel && <circle cx={x} cy={y} r={17} fill="none" stroke="rgba(251,146,60,0.5)" strokeWidth="2" />}
                                            <circle cx={x} cy={y} r={13} fill="rgba(251,146,60,0.2)" stroke="rgb(251,146,60)" strokeWidth="2" />
                                            <text x={x} y={y + 1} textAnchor="middle" dominantBaseline="central" fontSize="12" fontWeight="bold" fill="rgb(251,146,60)">T</text>
                                        </>
                                    )}

                                    {piece === "goat" && (
                                        <>
                                            {isSel && <circle cx={x} cy={y} r={17} fill="none" stroke="rgba(70,157,137,0.5)" strokeWidth="2" />}
                                            <circle cx={x} cy={y} r={11} fill="rgba(70,157,137,0.2)" stroke="rgb(70,157,137)" strokeWidth="2" />
                                            <text x={x} y={y + 1} textAnchor="middle" dominantBaseline="central" fontSize="10" fontWeight="bold" fill="rgb(70,157,137)">G</text>
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
                        <li><span className="text-orange-400 mr-1.5">T</span> 4 Tigers start at corners</li>
                        <li><span className="text-[#469D89] mr-1.5">G</span> 20 Goats placed one per turn</li>
                        <li><span className="text-[#469D89] mr-1.5">G</span> After all placed, goats move along lines</li>
                        <li><span className="text-orange-400 mr-1.5">T</span> Tigers capture by jumping over goats</li>
                        <li><span className="text-orange-400 mr-1.5">T</span> Tigers win by capturing 5 goats</li>
                        <li><span className="text-[#469D89] mr-1.5">G</span> Goats win by trapping all tigers</li>
                    </ul>
                </HowToPlay>
            </div>
        </div>
    );
}
