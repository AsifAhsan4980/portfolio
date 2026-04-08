"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import HowToPlay from "./HowToPlay";

const SIZE = 4;

type Board = number[][];

function createEmpty(): Board {
    return Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
}

function addRandom(board: Board): Board {
    const empty: [number, number][] = [];
    for (let r = 0; r < SIZE; r++) {
        for (let c = 0; c < SIZE; c++) {
            if (board[r][c] === 0) empty.push([r, c]);
        }
    }
    if (empty.length === 0) return board;
    const [r, c] = empty[Math.floor(Math.random() * empty.length)];
    const newBoard = board.map((row) => [...row]);
    newBoard[r][c] = Math.random() < 0.9 ? 2 : 4;
    return newBoard;
}

function initBoard(): Board {
    return addRandom(addRandom(createEmpty()));
}

function slideRow(row: number[]): { result: number[]; score: number } {
    const filtered = row.filter((v) => v !== 0);
    const result: number[] = [];
    let score = 0;
    let i = 0;
    while (i < filtered.length) {
        if (i + 1 < filtered.length && filtered[i] === filtered[i + 1]) {
            const merged = filtered[i] * 2;
            result.push(merged);
            score += merged;
            i += 2;
        } else {
            result.push(filtered[i]);
            i++;
        }
    }
    while (result.length < SIZE) result.push(0);
    return { result, score };
}

function rotateBoard(board: Board): Board {
    const n = board.length;
    const rotated = createEmpty();
    for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
            rotated[c][n - 1 - r] = board[r][c];
        }
    }
    return rotated;
}

function move(board: Board, direction: "left" | "right" | "up" | "down"): { board: Board; score: number; moved: boolean } {
    let rotated = board.map((row) => [...row]);
    const rotations = { left: 0, down: 1, right: 2, up: 3 };
    for (let i = 0; i < rotations[direction]; i++) rotated = rotateBoard(rotated);

    let totalScore = 0;
    const newBoard = createEmpty();
    for (let r = 0; r < SIZE; r++) {
        const { result, score } = slideRow(rotated[r]);
        newBoard[r] = result;
        totalScore += score;
    }

    // Rotate back
    let final = newBoard;
    for (let i = 0; i < (4 - rotations[direction]) % 4; i++) final = rotateBoard(final);

    const moved = JSON.stringify(board) !== JSON.stringify(final);
    return { board: final, score: totalScore, moved };
}

function canMove(board: Board): boolean {
    for (let r = 0; r < SIZE; r++) {
        for (let c = 0; c < SIZE; c++) {
            if (board[r][c] === 0) return true;
            if (c + 1 < SIZE && board[r][c] === board[r][c + 1]) return true;
            if (r + 1 < SIZE && board[r][c] === board[r + 1][c]) return true;
        }
    }
    return false;
}

function hasWon(board: Board): boolean {
    return board.some((row) => row.some((v) => v >= 2048));
}

const TILE_COLORS: Record<number, string> = {
    2: "bg-[#469D89]/15 text-[#469D89] border-[#469D89]/30",
    4: "bg-[#469D89]/25 text-[#469D89] border-[#469D89]/40",
    8: "bg-[#469D89]/35 text-white border-[#469D89]/50",
    16: "bg-[#469D89]/50 text-white border-[#469D89]/60",
    32: "bg-[#469D89]/65 text-white border-[#469D89]/70",
    64: "bg-[#469D89]/80 text-white border-[#469D89]/80",
    128: "bg-orange-500/40 text-orange-200 border-orange-400/50",
    256: "bg-orange-500/55 text-white border-orange-400/60",
    512: "bg-orange-500/70 text-white border-orange-400/70",
    1024: "bg-red-500/50 text-white border-red-400/60",
    2048: "bg-yellow-400/60 text-white border-yellow-300/70 shadow-[0_0_20px_rgba(250,204,21,0.4)]",
};

export default function Game2048() {
    const [board, setBoard] = useState<Board>(initBoard);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [won, setWon] = useState(false);

    const touchStart = useRef<{ x: number; y: number } | null>(null);

    const doMove = useCallback((direction: "left" | "right" | "up" | "down") => {
        if (gameOver) return;

        setBoard((prev) => {
            const result = move(prev, direction);
            if (!result.moved) return prev;

            const newBoard = addRandom(result.board);
            const newScore = score + result.score;
            setScore(newScore);
            setBestScore((b) => Math.max(b, newScore));

            if (hasWon(newBoard) && !won) setWon(true);
            if (!canMove(newBoard)) setGameOver(true);

            return newBoard;
        });
    }, [gameOver, score, won]);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
                e.preventDefault();
            }
            if (e.key === "ArrowLeft") doMove("left");
            else if (e.key === "ArrowRight") doMove("right");
            else if (e.key === "ArrowUp") doMove("up");
            else if (e.key === "ArrowDown") doMove("down");
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [doMove]);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (!touchStart.current) return;
        const dx = e.changedTouches[0].clientX - touchStart.current.x;
        const dy = e.changedTouches[0].clientY - touchStart.current.y;
        if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > 30) doMove("right");
            else if (dx < -30) doMove("left");
        } else {
            if (dy > 30) doMove("down");
            else if (dy < -30) doMove("up");
        }
        touchStart.current = null;
    };

    const reset = useCallback(() => {
        setBoard(initBoard());
        setScore(0);
        setGameOver(false);
        setWon(false);
    }, []);

    return (
        <div className="max-w-md mx-auto">
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold gradient-text-static mb-2">2048</h2>
                <p className="text-[10px] font-mono text-[#469D89]/50 tracking-widest uppercase">
                    Arrow keys · Swipe on mobile
                </p>
            </div>

            {/* Scores */}
            <div className="flex justify-center gap-8 mb-5">
                <div className="text-center">
                    <div className="text-2xl font-bold font-mono text-[#469D89]">{score}</div>
                    <div className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">Score</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold font-mono text-[#469D89]/50">{bestScore}</div>
                    <div className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">Best</div>
                </div>
            </div>

            {/* Board */}
            <div
                className="flex justify-center mb-6"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <div className="relative border border-[#469D89]/20 rounded-xl p-2 bg-[#0a1612]">
                    <div className="grid grid-cols-4 gap-2">
                        {board.flat().map((val, i) => {
                            const colorClass = val > 0 ? (TILE_COLORS[val] || "bg-[#469D89] text-white border-[#469D89]") : "bg-[#1a2e29]/50 border-transparent";
                            return (
                                <div
                                    key={i}
                                    className={`w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-lg border flex items-center justify-center font-bold font-mono transition-all duration-100 ${colorClass}`}
                                    style={{ fontSize: val >= 1024 ? "14px" : val >= 128 ? "18px" : "22px" }}
                                >
                                    {val > 0 && (
                                        <motion.span
                                            key={`${i}-${val}`}
                                            initial={{ scale: 0.5 }}
                                            animate={{ scale: 1 }}
                                            transition={{ duration: 0.1 }}
                                        >
                                            {val}
                                        </motion.span>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Overlay */}
                    {(gameOver || won) && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm rounded-xl">
                            <div className="text-xl font-bold font-mono text-[#469D89] mb-3">
                                {won ? "You reached 2048!" : "Game Over!"}
                            </div>
                            <button
                                onClick={reset}
                                className="px-5 py-2 text-[11px] font-mono tracking-widest uppercase text-[#469D89] border border-[#469D89]/40 rounded-lg hover:bg-[#469D89]/10 transition-all"
                            >
                                Play Again
                            </button>
                        </div>
                    )}
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
                        <li>Use arrow keys or swipe to slide all tiles</li>
                        <li>Matching tiles merge into one with double the value</li>
                        <li>A new tile (2 or 4) appears after each move</li>
                        <li>Reach the 2048 tile to win — keep going for a higher score!</li>
                        <li>Game over when no moves are left</li>
                    </ul>
                </HowToPlay>
            </div>
        </div>
    );
}
