"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import HowToPlay from "./HowToPlay";

/*
 * Moksha Patam — Ancient Indian Snakes & Ladders
 * 10x10 board (1-100). More snakes than ladders.
 * Snakes represent vices, ladders represent virtues.
 */

interface SnakeOrLadder {
    from: number;
    to: number;
    label: string;
    type: "snake" | "ladder";
}

const BOARD: SnakeOrLadder[] = [
    // Ladders (virtues)
    { from: 4, to: 25, label: "Faith", type: "ladder" },
    { from: 13, to: 46, label: "Generosity", type: "ladder" },
    { from: 27, to: 53, label: "Knowledge", type: "ladder" },
    { from: 42, to: 63, label: "Devotion", type: "ladder" },
    { from: 50, to: 69, label: "Compassion", type: "ladder" },
    { from: 62, to: 81, label: "Patience", type: "ladder" },
    { from: 74, to: 92, label: "Humility", type: "ladder" },
    // Snakes (vices) — more snakes than ladders
    { from: 99, to: 41, label: "Pride", type: "snake" },
    { from: 95, to: 24, label: "Greed", type: "snake" },
    { from: 89, to: 48, label: "Rage", type: "snake" },
    { from: 76, to: 38, label: "Envy", type: "snake" },
    { from: 66, to: 15, label: "Lust", type: "snake" },
    { from: 54, to: 19, label: "Deceit", type: "snake" },
    { from: 47, to: 9, label: "Ignorance", type: "snake" },
    { from: 37, to: 3, label: "Vanity", type: "snake" },
    { from: 30, to: 7, label: "Sloth", type: "snake" },
];

function rollDie(): number {
    return Math.floor(Math.random() * 6) + 1;
}

function getRowCol(num: number): [number, number] {
    // Board numbered 1-100, bottom-left is 1
    const n = num - 1;
    const row = 9 - Math.floor(n / 10);
    const col = Math.floor(n / 10) % 2 === 0 ? n % 10 : 9 - (n % 10);
    return [row, col];
}

interface State {
    positions: [number, number]; // player 1, player 2
    turn: 0 | 1;
    lastRoll: number;
    message: string;
    gameOver: boolean;
    winner: number | null;
    rolling: boolean;
}

export default function MokshaPatam() {
    const [state, setState] = useState<State>({
        positions: [0, 0],
        turn: 0,
        lastRoll: 0,
        message: "Player 1 (Teal): Roll the die!",
        gameOver: false,
        winner: null,
        rolling: false,
    });

    const reset = useCallback(() => {
        setState({
            positions: [0, 0],
            turn: 0,
            lastRoll: 0,
            message: "Player 1 (Teal): Roll the die!",
            gameOver: false,
            winner: null,
            rolling: false,
        });
    }, []);

    const roll = useCallback(() => {
        if (state.gameOver || state.rolling) return;

        setState((s) => ({ ...s, rolling: true }));

        // Animate dice roll
        setTimeout(() => {
            const die = rollDie();
            const { positions, turn } = state;
            const newPositions: [number, number] = [...positions];
            let newPos = positions[turn] + die;
            let msg = "";

            if (newPos > 100) {
                // Can't move
                const next = turn === 0 ? 1 : 0;
                setState({
                    ...state,
                    lastRoll: die,
                    turn: next as 0 | 1,
                    message: `Rolled ${die} — too high! Player ${next + 1}'s turn.`,
                    rolling: false,
                });
                return;
            }

            if (newPos === 100) {
                newPositions[turn] = 100;
                setState({
                    ...state,
                    positions: newPositions,
                    lastRoll: die,
                    message: `Player ${turn + 1} reached Moksha (100)!`,
                    gameOver: true,
                    winner: turn,
                    rolling: false,
                });
                return;
            }

            // Check snakes/ladders
            const event = BOARD.find((b) => b.from === newPos);
            if (event) {
                const emoji = event.type === "snake" ? "🐍" : "🪜";
                msg = `Rolled ${die} → ${newPos} ${emoji} ${event.label}! → ${event.to}`;
                newPos = event.to;
            } else {
                msg = `Rolled ${die} → ${newPos}`;
            }

            newPositions[turn] = newPos;
            const next = turn === 0 ? 1 : 0;

            setState({
                positions: newPositions,
                turn: next as 0 | 1,
                lastRoll: die,
                message: msg + ` · Player ${next + 1}'s turn`,
                gameOver: false,
                winner: null,
                rolling: false,
            });
        }, 400);
    }, [state]);

    const cellSize = 36;
    const boardPx = cellSize * 10;

    const dieFaces = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

    return (
        <div className="max-w-lg mx-auto">
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold gradient-text-static mb-2">Moksha Patam</h2>
                <p className="text-[10px] font-mono text-[#469D89]/50 tracking-widest uppercase">
                    Ancient Indian Snakes & Ladders · Virtues vs Vices
                </p>
            </div>

            {/* Player positions */}
            <div className="flex justify-center gap-8 mb-3">
                <div className="text-center">
                    <div className={`text-lg font-bold font-mono ${state.turn === 0 && !state.gameOver ? "text-[#469D89]" : "text-[#469D89]/50"}`}>
                        P1: {state.positions[0]}
                    </div>
                    <div className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">Teal</div>
                </div>
                <div className="text-center">
                    <div className="text-3xl">{state.lastRoll > 0 ? dieFaces[state.lastRoll - 1] : "🎲"}</div>
                </div>
                <div className="text-center">
                    <div className={`text-lg font-bold font-mono ${state.turn === 1 && !state.gameOver ? "text-orange-400" : "text-orange-400/50"}`}>
                        P2: {state.positions[1]}
                    </div>
                    <div className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">Orange</div>
                </div>
            </div>

            <div className="text-center mb-3">
                <span className="text-[12px] font-mono text-muted-foreground">{state.message}</span>
            </div>

            {/* Board */}
            <div className="flex justify-center mb-4 overflow-x-auto">
                <div className="border border-[#469D89]/20 rounded-xl overflow-hidden inline-block">
                    <div style={{ width: boardPx, height: boardPx }} className="relative">
                        {/* Cells */}
                        {Array.from({ length: 100 }, (_, i) => {
                            const num = 100 - i; // top-left is 100
                            const [row, col] = getRowCol(num);
                            const event = BOARD.find((b) => b.from === num);
                            const isP1 = state.positions[0] === num;
                            const isP2 = state.positions[1] === num;

                            return (
                                <div
                                    key={num}
                                    className={`absolute flex flex-col items-center justify-center text-[9px] font-mono ${
                                        event?.type === "snake"
                                            ? "bg-red-900/20"
                                            : event?.type === "ladder"
                                            ? "bg-green-900/20"
                                            : (row + col) % 2 === 0
                                            ? "bg-[#1a2e29]/30"
                                            : "bg-[#0a1612]/30"
                                    } border border-[#469D89]/5`}
                                    style={{
                                        width: cellSize,
                                        height: cellSize,
                                        left: col * cellSize,
                                        top: row * cellSize,
                                    }}
                                >
                                    <span className="text-[8px] text-[#469D89]/30 leading-none">{num}</span>
                                    {event && (
                                        <span className="text-[7px] text-muted-foreground/50 leading-none truncate max-w-full px-0.5">
                                            {event.type === "snake" ? "🐍" : "🪜"}
                                        </span>
                                    )}
                                    <div className="flex gap-0.5">
                                        {isP1 && <div className="w-2.5 h-2.5 rounded-full bg-[#469D89] shadow-[0_0_6px_rgba(70,157,137,0.6)]" />}
                                        {isP2 && <div className="w-2.5 h-2.5 rounded-full bg-orange-400 shadow-[0_0_6px_rgba(251,146,60,0.6)]" />}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Roll button */}
            <div className="text-center space-y-3">
                {!state.gameOver ? (
                    <motion.button
                        onClick={roll}
                        disabled={state.rolling}
                        className={`px-8 py-3 text-sm font-mono tracking-widest uppercase rounded-xl border transition-all duration-200 ${
                            state.rolling
                                ? "border-[#469D89]/20 text-muted-foreground cursor-not-allowed"
                                : "border-[#469D89]/50 text-[#469D89] hover:bg-[#469D89]/10 hover:border-[#469D89] hover:shadow-[0_0_18px_rgba(70,157,137,0.25)]"
                        }`}
                        whileHover={!state.rolling ? { scale: 1.03 } : {}}
                        whileTap={!state.rolling ? { scale: 0.97 } : {}}
                    >
                        {state.rolling ? "Rolling..." : "🎲 Roll Die"}
                    </motion.button>
                ) : (
                    <motion.button onClick={reset} className="px-8 py-3 text-sm font-mono tracking-widest uppercase text-[#469D89] border border-[#469D89]/40 rounded-xl hover:bg-[#469D89]/10 hover:border-[#469D89] transition-all duration-200" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                        Play Again
                    </motion.button>
                )}
                <HowToPlay>
                    <ul className="space-y-1.5 text-[12px] font-mono text-muted-foreground/70 leading-5">
                        <li>Roll the die and advance your piece</li>
                        <li>Land on a ladder (virtue) to climb up</li>
                        <li>Land on a snake (vice) to slide down</li>
                        <li>Must roll exact number to reach 100 (Moksha)</li>
                        <li>More snakes than ladders — the path to enlightenment is hard!</li>
                    </ul>
                </HowToPlay>
            </div>
        </div>
    );
}
