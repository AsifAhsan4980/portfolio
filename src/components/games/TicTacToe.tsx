"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import HowToPlay from "./HowToPlay";

type Cell = "X" | "O" | null;
type Board = Cell[];

const WINNING_LINES = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6],             // diagonals
];

function checkWinner(board: Board): { winner: Cell; line: number[] | null } {
    for (const combo of WINNING_LINES) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return { winner: board[a], line: combo };
        }
    }
    return { winner: null, line: null };
}

function isDraw(board: Board): boolean {
    return board.every((cell) => cell !== null) && !checkWinner(board).winner;
}

function minimax(board: Board, isMaximizing: boolean): number {
    const { winner } = checkWinner(board);
    if (winner === "O") return 10;
    if (winner === "X") return -10;
    if (board.every((c) => c !== null)) return 0;

    if (isMaximizing) {
        let best = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (!board[i]) {
                board[i] = "O";
                best = Math.max(best, minimax(board, false));
                board[i] = null;
            }
        }
        return best;
    } else {
        let best = Infinity;
        for (let i = 0; i < 9; i++) {
            if (!board[i]) {
                board[i] = "X";
                best = Math.min(best, minimax(board, true));
                board[i] = null;
            }
        }
        return best;
    }
}

function getBestMove(board: Board): number {
    let bestScore = -Infinity;
    let bestMove = -1;
    for (let i = 0; i < 9; i++) {
        if (!board[i]) {
            board[i] = "O";
            const score = minimax(board, false);
            board[i] = null;
            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }
    return bestMove;
}

export default function TicTacToe() {
    const [board, setBoard] = useState<Board>(Array(9).fill(null));
    const [scores, setScores] = useState({ player: 0, ai: 0, draws: 0 });
    const [gameOver, setGameOver] = useState(false);
    const [winLine, setWinLine] = useState<number[] | null>(null);
    const [status, setStatus] = useState("Your turn (X)");

    const reset = useCallback(() => {
        setBoard(Array(9).fill(null));
        setGameOver(false);
        setWinLine(null);
        setStatus("Your turn (X)");
    }, []);

    const handleClick = useCallback(
        (index: number) => {
            if (board[index] || gameOver) return;

            const newBoard = [...board];
            newBoard[index] = "X";

            const result = checkWinner(newBoard);
            if (result.winner === "X") {
                setBoard(newBoard);
                setWinLine(result.line);
                setGameOver(true);
                setStatus("You win!");
                setScores((s) => ({ ...s, player: s.player + 1 }));
                return;
            }

            if (isDraw(newBoard)) {
                setBoard(newBoard);
                setGameOver(true);
                setStatus("Draw!");
                setScores((s) => ({ ...s, draws: s.draws + 1 }));
                return;
            }

            // AI move
            const aiMove = getBestMove(newBoard);
            if (aiMove !== -1) {
                newBoard[aiMove] = "O";
            }

            const aiResult = checkWinner(newBoard);
            if (aiResult.winner === "O") {
                setBoard(newBoard);
                setWinLine(aiResult.line);
                setGameOver(true);
                setStatus("AI wins!");
                setScores((s) => ({ ...s, ai: s.ai + 1 }));
                return;
            }

            if (isDraw(newBoard)) {
                setBoard(newBoard);
                setGameOver(true);
                setStatus("Draw!");
                setScores((s) => ({ ...s, draws: s.draws + 1 }));
                return;
            }

            setBoard(newBoard);
            setStatus("Your turn (X)");
        },
        [board, gameOver]
    );

    return (
        <div className="max-w-md mx-auto">
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold gradient-text-static mb-2">Tic-Tac-Toe</h2>
                <p className="text-[10px] font-mono text-[#469D89]/50 tracking-widest uppercase">
                    You (X) vs AI (O) — Minimax Algorithm
                </p>
            </div>

            {/* Scoreboard */}
            <div className="flex justify-center gap-6 mb-6">
                {[
                    { label: "You", value: scores.player, color: "text-[#469D89]" },
                    { label: "Draws", value: scores.draws, color: "text-muted-foreground" },
                    { label: "AI", value: scores.ai, color: "text-red-400" },
                ].map((s) => (
                    <div key={s.label} className="text-center">
                        <div className={`text-2xl font-bold font-mono ${s.color}`}>{s.value}</div>
                        <div className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Status */}
            <div className="text-center mb-5">
                <span className={`text-sm font-mono tracking-widest ${gameOver ? "text-[#469D89]" : "text-muted-foreground"}`}>
                    {status}
                </span>
            </div>

            {/* Board */}
            <div className="grid grid-cols-3 gap-2 max-w-[300px] mx-auto mb-6">
                {board.map((cell, i) => {
                    const isWinCell = winLine?.includes(i);
                    return (
                        <motion.button
                            key={i}
                            onClick={() => handleClick(i)}
                            className={`aspect-square rounded-xl border text-3xl font-bold font-mono flex items-center justify-center transition-all duration-200 ${
                                isWinCell
                                    ? "border-[#469D89] bg-[#469D89]/15 shadow-[0_0_20px_rgba(70,157,137,0.3)]"
                                    : "border-[#469D89]/20 bg-background/50 hover:border-[#469D89]/40 hover:bg-[#469D89]/5"
                            } ${!cell && !gameOver ? "cursor-pointer" : "cursor-default"}`}
                            whileTap={!cell && !gameOver ? { scale: 0.92 } : {}}
                        >
                            {cell && (
                                <motion.span
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className={cell === "X" ? "text-[#469D89]" : "text-red-400"}
                                >
                                    {cell}
                                </motion.span>
                            )}
                        </motion.button>
                    );
                })}
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
                        <li>You play as X, AI plays as O</li>
                        <li>Tap an empty cell to place your mark</li>
                        <li>Get 3 in a row (horizontal, vertical, or diagonal) to win</li>
                        <li>AI uses minimax — can you force a draw?</li>
                    </ul>
                </HowToPlay>
            </div>
        </div>
    );
}
