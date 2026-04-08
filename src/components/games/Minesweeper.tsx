"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import HowToPlay from "./HowToPlay";

const ROWS = 10;
const COLS = 10;
const MINES = 15;

interface Cell {
    mine: boolean;
    revealed: boolean;
    flagged: boolean;
    adjacent: number;
}

type Board = Cell[][];

function createBoard(firstR?: number, firstC?: number): Board {
    const board: Board = Array.from({ length: ROWS }, () =>
        Array.from({ length: COLS }, () => ({
            mine: false,
            revealed: false,
            flagged: false,
            adjacent: 0,
        }))
    );

    // Place mines avoiding first click area
    let placed = 0;
    while (placed < MINES) {
        const r = Math.floor(Math.random() * ROWS);
        const c = Math.floor(Math.random() * COLS);
        if (board[r][c].mine) continue;
        if (firstR !== undefined && firstC !== undefined && Math.abs(r - firstR) <= 1 && Math.abs(c - firstC) <= 1) continue;
        board[r][c].mine = true;
        placed++;
    }

    // Calculate adjacents
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            if (board[r][c].mine) continue;
            let count = 0;
            for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                    const nr = r + dr, nc = c + dc;
                    if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && board[nr][nc].mine) count++;
                }
            }
            board[r][c].adjacent = count;
        }
    }

    return board;
}

function revealCell(board: Board, r: number, c: number): Board {
    const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));

    function flood(r: number, c: number) {
        if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return;
        if (newBoard[r][c].revealed || newBoard[r][c].flagged) return;
        newBoard[r][c].revealed = true;
        if (newBoard[r][c].adjacent === 0 && !newBoard[r][c].mine) {
            for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                    flood(r + dr, c + dc);
                }
            }
        }
    }

    flood(r, c);
    return newBoard;
}

const ADJ_COLORS: Record<number, string> = {
    1: "text-blue-400",
    2: "text-green-400",
    3: "text-red-400",
    4: "text-purple-400",
    5: "text-orange-400",
    6: "text-cyan-400",
    7: "text-pink-400",
    8: "text-gray-400",
};

export default function Minesweeper() {
    const [board, setBoard] = useState<Board | null>(null);
    const [gameOver, setGameOver] = useState(false);
    const [won, setWon] = useState(false);
    const [started, setStarted] = useState(false);
    const [flagCount, setFlagCount] = useState(0);

    const reset = useCallback(() => {
        setBoard(null);
        setGameOver(false);
        setWon(false);
        setStarted(false);
        setFlagCount(0);
    }, []);

    const checkWin = useCallback((b: Board) => {
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (!b[r][c].mine && !b[r][c].revealed) return false;
            }
        }
        return true;
    }, []);

    const handleClick = useCallback(
        (r: number, c: number) => {
            if (gameOver || won) return;

            let currentBoard = board;

            // First click — generate board
            if (!started || !currentBoard) {
                currentBoard = createBoard(r, c);
                setStarted(true);
            }

            const cell = currentBoard[r][c];
            if (cell.revealed || cell.flagged) return;

            if (cell.mine) {
                // Game over — reveal all
                const revealed = currentBoard.map((row) =>
                    row.map((cell) => ({ ...cell, revealed: true }))
                );
                setBoard(revealed);
                setGameOver(true);
                return;
            }

            const newBoard = revealCell(currentBoard, r, c);
            setBoard(newBoard);

            if (checkWin(newBoard)) {
                setWon(true);
            }
        },
        [board, gameOver, won, started, checkWin]
    );

    const handleRightClick = useCallback(
        (e: React.MouseEvent, r: number, c: number) => {
            e.preventDefault();
            if (gameOver || won || !board) return;
            const cell = board[r][c];
            if (cell.revealed) return;

            const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
            newBoard[r][c].flagged = !newBoard[r][c].flagged;
            setBoard(newBoard);
            setFlagCount((f) => (newBoard[r][c].flagged ? f + 1 : f - 1));
        },
        [board, gameOver, won]
    );

    // Long press for mobile flagging
    const handleLongPress = useCallback(
        (r: number, c: number) => {
            if (gameOver || won || !board) return;
            const cell = board[r][c];
            if (cell.revealed) return;
            const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
            newBoard[r][c].flagged = !newBoard[r][c].flagged;
            setBoard(newBoard);
            setFlagCount((f) => (newBoard[r][c].flagged ? f + 1 : f - 1));
        },
        [board, gameOver, won]
    );

    const displayBoard = board || createBoard();
    const cellSize = 32;

    return (
        <div className="max-w-lg mx-auto">
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold gradient-text-static mb-2">Minesweeper</h2>
                <p className="text-[10px] font-mono text-[#469D89]/50 tracking-widest uppercase">
                    {ROWS}x{COLS} · {MINES} mines · Right-click to flag
                </p>
            </div>

            {/* Info */}
            <div className="flex justify-center gap-8 mb-4">
                <div className="text-center">
                    <div className="text-2xl font-bold font-mono text-red-400">{MINES - flagCount}</div>
                    <div className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">Mines</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold font-mono text-[#469D89]">{flagCount}</div>
                    <div className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">Flags</div>
                </div>
            </div>

            {/* Status */}
            {(gameOver || won) && (
                <div className="text-center mb-4">
                    <span className="text-sm font-mono tracking-widest text-[#469D89]">
                        {won ? "You cleared the field!" : "Boom! Game over."}
                    </span>
                </div>
            )}

            {/* Board */}
            <div className="flex justify-center mb-6 overflow-x-auto">
                <div
                    className="border border-[#469D89]/20 rounded-xl overflow-hidden inline-block"
                    onContextMenu={(e) => e.preventDefault()}
                >
                    {displayBoard.map((row, r) => (
                        <div key={r} className="flex">
                            {row.map((cell, c) => {
                                let content = "";
                                let cellClass = "bg-[#1a2e29] hover:bg-[#1a2e29]/80 cursor-pointer";

                                if (!started && !board) {
                                    cellClass = "bg-[#1a2e29] hover:bg-[#1a2e29]/80 cursor-pointer";
                                } else if (cell.revealed) {
                                    cellClass = "bg-[#0a1612]";
                                    if (cell.mine) {
                                        content = "💣";
                                    } else if (cell.adjacent > 0) {
                                        content = String(cell.adjacent);
                                    }
                                } else if (cell.flagged) {
                                    content = "🚩";
                                }

                                return (
                                    <div
                                        key={c}
                                        onClick={() => handleClick(r, c)}
                                        onContextMenu={(e) => handleRightClick(e, r, c)}
                                        onTouchStart={() => {
                                            const timeout = setTimeout(() => handleLongPress(r, c), 500);
                                            (window as unknown as Record<string, ReturnType<typeof setTimeout>>).__mineTimer = timeout;
                                        }}
                                        onTouchEnd={() => {
                                            clearTimeout((window as unknown as Record<string, ReturnType<typeof setTimeout>>).__mineTimer);
                                        }}
                                        className={`flex items-center justify-center border border-[#469D89]/10 text-[13px] font-bold font-mono select-none ${cellClass} ${
                                            cell.adjacent > 0 && cell.revealed ? ADJ_COLORS[cell.adjacent] || "text-white" : ""
                                        }`}
                                        style={{ width: cellSize, height: cellSize }}
                                    >
                                        {content}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
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
                        <li>Click a cell to reveal it — first click is always safe</li>
                        <li>Numbers show how many mines are adjacent</li>
                        <li>Right-click (or long-press on mobile) to flag a mine</li>
                        <li>Reveal all non-mine cells to win</li>
                        <li>Hit a mine and it&apos;s game over!</li>
                    </ul>
                </HowToPlay>
            </div>
        </div>
    );
}
