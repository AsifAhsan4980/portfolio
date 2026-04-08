"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import HowToPlay from "./HowToPlay";

/*
 * Ludo — The desi classic (simplified 2-player version)
 * Each player has 4 tokens. Roll a 6 to bring a token out.
 * First to get all 4 tokens home wins.
 * Landing on opponent sends them back to base.
 */

const PATH_LENGTH = 52;
const HOME_STRETCH = 6;
const SAFE_SQUARES = [0, 8, 13, 21, 26, 34, 39, 47]; // safe positions

interface Token {
    state: "base" | "active" | "home";
    position: number; // 0-51 on main path, 52-57 on home stretch
}

interface Player {
    tokens: Token[];
    startPos: number; // where tokens enter the main path
    homeEntry: number; // position before home stretch
    color: string;
    label: string;
}

interface GameState {
    players: [Player, Player];
    turn: 0 | 1;
    dieValue: number;
    rolled: boolean;
    sixCount: number;
    gameOver: boolean;
    winner: number | null;
    message: string;
}

function createPlayer(startPos: number, homeEntry: number, color: string, label: string): Player {
    return {
        tokens: Array.from({ length: 4 }, () => ({ state: "base" as const, position: -1 })),
        startPos,
        homeEntry,
        color,
        label,
    };
}

function initState(): GameState {
    return {
        players: [
            createPlayer(0, 50, "#469D89", "Teal"),
            createPlayer(26, 24, "#fb923c", "Orange"),
        ],
        turn: 0,
        dieValue: 0,
        rolled: false,
        sixCount: 0,
        gameOver: false,
        winner: null,
        message: "Teal's turn — Roll the die!",
    };
}

function getAbsolutePos(token: Token, player: Player): number {
    if (token.state !== "active") return -1;
    return (player.startPos + token.position) % PATH_LENGTH;
}

function isOnHomeStretch(token: Token, player: Player): boolean {
    if (token.state !== "active") return false;
    // Calculate if token has passed or is at home entry
    return token.position >= PATH_LENGTH;
}

export default function Ludo() {
    const [state, setState] = useState<GameState>(initState);

    const reset = useCallback(() => setState(initState()), []);

    const rollDie = useCallback(() => {
        if (state.rolled || state.gameOver) return;
        const value = Math.floor(Math.random() * 6) + 1;
        const { players, turn } = state;
        const player = players[turn];

        // Check if any token can move
        const canMove = player.tokens.some((t) => {
            if (t.state === "home") return false;
            if (t.state === "base") return value === 6;
            // Check if move is valid (won't overshoot home)
            const newPos = t.position + value;
            return newPos <= PATH_LENGTH + HOME_STRETCH;
        });

        if (!canMove) {
            const next = (turn === 0 ? 1 : 0) as 0 | 1;
            setState({
                ...state,
                dieValue: value,
                rolled: false,
                turn: next,
                sixCount: 0,
                message: `Rolled ${value} — no valid moves. ${players[next].label}'s turn.`,
            });
            return;
        }

        setState({ ...state, dieValue: value, rolled: true, message: `Rolled ${value} — select a token to move` });
    }, [state]);

    const moveToken = useCallback((tokenIdx: number) => {
        if (!state.rolled || state.gameOver) return;
        const { players, turn, dieValue, sixCount } = state;
        const player = { ...players[turn], tokens: players[turn].tokens.map((t) => ({ ...t })) };
        const token = player.tokens[tokenIdx];

        if (token.state === "home") return;

        // Bring out from base
        if (token.state === "base") {
            if (dieValue !== 6) return;
            token.state = "active";
            token.position = 0;
        } else {
            const newPos = token.position + dieValue;
            if (newPos > PATH_LENGTH + HOME_STRETCH) return; // overshoot

            if (newPos === PATH_LENGTH + HOME_STRETCH) {
                token.state = "home";
                token.position = newPos;
            } else {
                token.position = newPos;
            }
        }

        // Check for capture (only on main path, not home stretch)
        const opponent = { ...players[turn === 0 ? 1 : 0], tokens: players[turn === 0 ? 1 : 0].tokens.map((t) => ({ ...t })) };
        if (token.state === "active" && token.position < PATH_LENGTH) {
            const absPos = (player.startPos + token.position) % PATH_LENGTH;
            if (!SAFE_SQUARES.includes(absPos)) {
                opponent.tokens.forEach((oToken) => {
                    if (oToken.state === "active" && oToken.position < PATH_LENGTH) {
                        const oAbs = (opponent.startPos + oToken.position) % PATH_LENGTH;
                        if (oAbs === absPos) {
                            oToken.state = "base";
                            oToken.position = -1;
                        }
                    }
                });
            }
        }

        const newPlayers: [Player, Player] = turn === 0 ? [player, opponent] : [opponent, player];

        // Check win
        if (player.tokens.every((t) => t.state === "home")) {
            setState({
                ...state,
                players: newPlayers,
                rolled: false,
                gameOver: true,
                winner: turn,
                message: `${player.label} wins!`,
            });
            return;
        }

        // If rolled 6, roll again (max 3)
        const newSixCount = dieValue === 6 ? sixCount + 1 : 0;
        let nextTurn = turn;
        if (dieValue !== 6 || newSixCount >= 3) {
            nextTurn = (turn === 0 ? 1 : 0) as 0 | 1;
        }

        setState({
            players: newPlayers,
            turn: nextTurn as 0 | 1,
            dieValue: dieValue === 6 && newSixCount < 3 ? 0 : state.dieValue,
            rolled: false,
            sixCount: newSixCount >= 3 ? 0 : newSixCount,
            gameOver: false,
            winner: null,
            message: dieValue === 6 && newSixCount < 3
                ? `Six! ${player.label} rolls again!`
                : `${newPlayers[nextTurn as 0 | 1].label}'s turn — Roll the die!`,
        });
    }, [state]);

    const dieFaces = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

    return (
        <div className="max-w-md mx-auto">
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold gradient-text-static mb-2">Ludo</h2>
                <p className="text-[10px] font-mono text-[#469D89]/50 tracking-widest uppercase">
                    Classic Indian Board Game · 2 Player
                </p>
            </div>

            {/* Token progress */}
            <div className="flex justify-center gap-8 mb-4">
                {state.players.map((p, pi) => (
                    <div key={pi} className="text-center">
                        <div className="flex gap-1 justify-center mb-1">
                            {p.tokens.map((t, ti) => (
                                <div
                                    key={ti}
                                    className={`w-5 h-5 rounded-full border-2 text-[8px] font-bold flex items-center justify-center ${
                                        t.state === "home"
                                            ? "bg-[#469D89]/30 border-[#469D89] text-[#469D89]"
                                            : t.state === "active"
                                            ? `border-current`
                                            : "border-current opacity-30"
                                    }`}
                                    style={{ color: p.color, borderColor: p.color }}
                                >
                                    {t.state === "home" ? "✓" : ti + 1}
                                </div>
                            ))}
                        </div>
                        <div className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">
                            {p.label}: {p.tokens.filter((t) => t.state === "home").length}/4
                        </div>
                    </div>
                ))}
            </div>

            {/* Die */}
            <div className="text-center mb-3">
                <div className="text-4xl mb-2">{state.dieValue > 0 ? dieFaces[state.dieValue - 1] : "🎲"}</div>
                <span className="text-[12px] font-mono text-muted-foreground">{state.message}</span>
            </div>

            {/* Token selection */}
            {state.rolled && !state.gameOver && (
                <div className="flex justify-center gap-3 mb-4">
                    <span className="text-[10px] font-mono text-muted-foreground self-center tracking-widest">Move:</span>
                    {state.players[state.turn].tokens.map((t, i) => {
                        const canMove = t.state === "base" ? state.dieValue === 6 : t.state === "active" && t.position + state.dieValue <= PATH_LENGTH + HOME_STRETCH;
                        return (
                            <motion.button
                                key={i}
                                onClick={() => moveToken(i)}
                                disabled={!canMove}
                                className={`w-10 h-10 rounded-xl border-2 font-bold font-mono text-sm flex items-center justify-center transition-all ${
                                    canMove
                                        ? "border-[#469D89] bg-[#469D89]/10 text-[#469D89] hover:bg-[#469D89]/20 cursor-pointer"
                                        : "border-[#469D89]/15 text-muted-foreground/30 cursor-not-allowed"
                                }`}
                                whileTap={canMove ? { scale: 0.9 } : {}}
                            >
                                {t.state === "base" ? "B" : t.state === "home" ? "H" : t.position}
                            </motion.button>
                        );
                    })}
                </div>
            )}

            {/* Roll / Reset */}
            <div className="text-center space-y-3">
                {!state.gameOver ? (
                    !state.rolled && (
                        <motion.button
                            onClick={rollDie}
                            className="px-8 py-3 text-sm font-mono tracking-widest uppercase text-[#469D89] border border-[#469D89]/50 rounded-xl hover:bg-[#469D89]/10 hover:border-[#469D89] hover:shadow-[0_0_18px_rgba(70,157,137,0.25)] transition-all duration-200"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            🎲 Roll Die
                        </motion.button>
                    )
                ) : (
                    <motion.button onClick={reset} className="px-8 py-3 text-sm font-mono tracking-widest uppercase text-[#469D89] border border-[#469D89]/40 rounded-xl hover:bg-[#469D89]/10 hover:border-[#469D89] transition-all duration-200" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                        Play Again
                    </motion.button>
                )}

                <HowToPlay>
                    <ul className="space-y-1.5 text-[12px] font-mono text-muted-foreground/70 leading-5">
                        <li>Roll a 6 to bring a token out of base</li>
                        <li>Move tokens forward by the die value</li>
                        <li>Land on opponent to send them back to base</li>
                        <li>Safe squares protect from capture</li>
                        <li>Rolling a 6 gives an extra turn (max 3)</li>
                        <li>First to get all 4 tokens home wins!</li>
                    </ul>
                </HowToPlay>
            </div>
        </div>
    );
}
