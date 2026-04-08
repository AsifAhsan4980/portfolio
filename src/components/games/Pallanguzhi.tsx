"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import HowToPlay from "./HowToPlay";

/*
 * Pallanguzhi — South Indian Mancala
 * 2 rows of 7 pits, each starting with 6 seeds
 * Pick up seeds, sow counter-clockwise
 * Capture pits with exactly 4 seeds
 * Game ends when one side is empty
 */

const PITS_PER_SIDE = 7;
const INITIAL_SEEDS = 6;

interface State {
    pits: number[]; // 0-6: player 1 (bottom), 7-13: player 2 (top, displayed right-to-left)
    turn: 0 | 1;
    scores: [number, number];
    gameOver: boolean;
    winner: string | null;
    lastSown: number | null;
    animating: boolean;
}

function initPits(): number[] {
    return Array(14).fill(INITIAL_SEEDS);
}

function playerPits(player: 0 | 1): number[] {
    return player === 0
        ? [0, 1, 2, 3, 4, 5, 6]
        : [7, 8, 9, 10, 11, 12, 13];
}

function sideEmpty(pits: number[], player: 0 | 1): boolean {
    return playerPits(player).every((i) => pits[i] === 0);
}

function sowSeeds(pits: number[], pitIndex: number): { newPits: number[]; score: number; lastPit: number } {
    const newPits = [...pits];
    let seeds = newPits[pitIndex];
    newPits[pitIndex] = 0;
    let current = pitIndex;
    let score = 0;

    while (seeds > 0) {
        current = (current + 1) % 14;
        newPits[current]++;
        seeds--;
    }

    // Capture: if last pit has exactly 4 seeds, capture it and keep checking forward
    while (newPits[current] === 4) {
        score += 4;
        newPits[current] = 0;
        current = (current + 1) % 14;
        if (newPits[current] !== 4) break;
    }

    return { newPits, score, lastPit: current };
}

export default function Pallanguzhi() {
    const [state, setState] = useState<State>({
        pits: initPits(),
        turn: 0,
        scores: [0, 0],
        gameOver: false,
        winner: null,
        lastSown: null,
        animating: false,
    });

    const reset = useCallback(() => {
        setState({
            pits: initPits(),
            turn: 0,
            scores: [0, 0],
            gameOver: false,
            winner: null,
            lastSown: null,
            animating: false,
        });
    }, []);

    const handlePitClick = useCallback((pitIndex: number) => {
        if (state.gameOver || state.animating) return;
        const { pits, turn, scores } = state;

        // Must be own pit
        const ownPits = playerPits(turn);
        if (!ownPits.includes(pitIndex)) return;
        if (pits[pitIndex] === 0) return;

        const { newPits, score, lastPit } = sowSeeds(pits, pitIndex);
        const newScores: [number, number] = [...scores];
        newScores[turn] += score;

        const nextTurn = (turn === 0 ? 1 : 0) as 0 | 1;

        // Check game over
        let gameOver = false;
        let winner: string | null = null;

        if (sideEmpty(newPits, 0) || sideEmpty(newPits, 1)) {
            // Remaining seeds go to the player whose side they're on
            for (let i = 0; i < 7; i++) {
                newScores[0] += newPits[i];
                newPits[i] = 0;
            }
            for (let i = 7; i < 14; i++) {
                newScores[1] += newPits[i];
                newPits[i] = 0;
            }
            gameOver = true;
            if (newScores[0] > newScores[1]) winner = "Player 1";
            else if (newScores[1] > newScores[0]) winner = "Player 2";
            else winner = "Draw";
        }

        // If next player has no seeds, skip turn
        let finalTurn = nextTurn;
        if (!gameOver && sideEmpty(newPits, nextTurn)) {
            finalTurn = turn;
        }

        setState({
            pits: newPits,
            turn: finalTurn,
            scores: newScores,
            gameOver,
            winner,
            lastSown: lastPit,
            animating: false,
        });
    }, [state]);

    const pitSize = 52;
    const ownPits = playerPits(state.turn);

    return (
        <div className="max-w-lg mx-auto">
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold gradient-text-static mb-2">Pallanguzhi</h2>
                <p className="text-[10px] font-mono text-[#469D89]/50 tracking-widest uppercase">
                    South Indian Mancala · Seed-Sowing Strategy · 2 Player
                </p>
            </div>

            {/* Scores */}
            <div className="flex justify-center gap-8 mb-5">
                <div className="text-center">
                    <div className={`text-2xl font-bold font-mono ${state.turn === 0 ? "text-[#469D89]" : "text-[#469D89]/50"}`}>
                        {state.scores[0]}
                    </div>
                    <div className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">Player 1</div>
                </div>
                <div className="text-center">
                    <div className={`text-2xl font-bold font-mono ${state.turn === 1 ? "text-orange-400" : "text-orange-400/50"}`}>
                        {state.scores[1]}
                    </div>
                    <div className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">Player 2</div>
                </div>
            </div>

            <div className="text-center mb-4">
                <span className={`text-sm font-mono tracking-widest ${state.gameOver ? "text-[#469D89]" : "text-muted-foreground"}`}>
                    {state.gameOver ? (state.winner === "Draw" ? "It's a draw!" : `${state.winner} wins!`) : `Player ${state.turn + 1}'s turn — pick a pit`}
                </span>
            </div>

            {/* Board */}
            <div className="flex justify-center mb-6">
                <div className="border border-[#469D89]/20 rounded-2xl p-4 bg-background/50 backdrop-blur-sm">
                    {/* Player 2 row (top, displayed 13 → 7) */}
                    <div className="flex gap-2 mb-2 justify-center">
                        {[13, 12, 11, 10, 9, 8, 7].map((i) => {
                            const isOwn = state.turn === 1;
                            const canClick = isOwn && state.pits[i] > 0 && !state.gameOver;
                            return (
                                <motion.button
                                    key={i}
                                    onClick={() => handlePitClick(i)}
                                    className={`rounded-xl border flex flex-col items-center justify-center transition-all ${
                                        canClick
                                            ? "border-orange-400/40 bg-orange-400/5 hover:border-orange-400/70 hover:bg-orange-400/10 cursor-pointer"
                                            : "border-[#469D89]/15 bg-[#0a1612]/50"
                                    } ${state.lastSown === i ? "ring-2 ring-[#469D89]/30" : ""}`}
                                    style={{ width: pitSize, height: pitSize }}
                                    whileTap={canClick ? { scale: 0.92 } : {}}
                                >
                                    <span className={`text-lg font-bold font-mono ${state.pits[i] > 0 ? "text-orange-400" : "text-orange-400/20"}`}>
                                        {state.pits[i]}
                                    </span>
                                    <span className="text-[8px] text-muted-foreground/30 font-mono">P2</span>
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-[#469D89]/15 my-2" />

                    {/* Player 1 row (bottom, 0 → 6) */}
                    <div className="flex gap-2 justify-center">
                        {[0, 1, 2, 3, 4, 5, 6].map((i) => {
                            const isOwn = state.turn === 0;
                            const canClick = isOwn && state.pits[i] > 0 && !state.gameOver;
                            return (
                                <motion.button
                                    key={i}
                                    onClick={() => handlePitClick(i)}
                                    className={`rounded-xl border flex flex-col items-center justify-center transition-all ${
                                        canClick
                                            ? "border-[#469D89]/40 bg-[#469D89]/5 hover:border-[#469D89]/70 hover:bg-[#469D89]/10 cursor-pointer"
                                            : "border-[#469D89]/15 bg-[#0a1612]/50"
                                    } ${state.lastSown === i ? "ring-2 ring-[#469D89]/30" : ""}`}
                                    style={{ width: pitSize, height: pitSize }}
                                    whileTap={canClick ? { scale: 0.92 } : {}}
                                >
                                    <span className={`text-lg font-bold font-mono ${state.pits[i] > 0 ? "text-[#469D89]" : "text-[#469D89]/20"}`}>
                                        {state.pits[i]}
                                    </span>
                                    <span className="text-[8px] text-muted-foreground/30 font-mono">P1</span>
                                </motion.button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="text-center space-y-3">
                <motion.button onClick={reset} className="px-6 py-2.5 text-[11px] font-mono tracking-widest uppercase text-[#469D89] border border-[#469D89]/40 rounded-lg hover:bg-[#469D89]/10 hover:border-[#469D89] transition-all duration-200" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    New Game
                </motion.button>
                <HowToPlay>
                    <ul className="space-y-1.5 text-[12px] font-mono text-muted-foreground/70 leading-5">
                        <li>Pick seeds from one of your 7 pits</li>
                        <li>Sow one seed per pit counter-clockwise</li>
                        <li>If last pit reaches exactly 4 seeds — capture!</li>
                        <li>Game ends when one side is empty</li>
                        <li>Player with most captured seeds wins</li>
                    </ul>
                </HowToPlay>
            </div>
        </div>
    );
}
