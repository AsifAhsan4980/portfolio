"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import HowToPlay from "./HowToPlay";

const GRID_SIZE = 20;
const CELL_SIZE = 16;
const INITIAL_SPEED = 150;

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type Position = { x: number; y: number };

function randomFood(snake: Position[]): Position {
    let food: Position;
    do {
        food = {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE),
        };
    } while (snake.some((s) => s.x === food.x && s.y === food.y));
    return food;
}

export default function Snake() {
    const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
    const [food, setFood] = useState<Position>({ x: 5, y: 5 });
    const [direction, setDirection] = useState<Direction>("RIGHT");
    const [isRunning, setIsRunning] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const dirRef = useRef<Direction>("RIGHT");
    const gameRef = useRef<HTMLDivElement>(null);

    const reset = useCallback(() => {
        const initial = [{ x: 10, y: 10 }];
        setSnake(initial);
        setFood(randomFood(initial));
        setDirection("RIGHT");
        dirRef.current = "RIGHT";
        setGameOver(false);
        setScore(0);
        setIsRunning(false);
    }, []);

    const startGame = useCallback(() => {
        if (gameOver) reset();
        setIsRunning(true);
        gameRef.current?.focus();
    }, [gameOver, reset]);

    // Keyboard controls
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "a", "s", "d"].includes(e.key)) {
                e.preventDefault();
            }

            const dir = dirRef.current;
            if ((e.key === "ArrowUp" || e.key === "w") && dir !== "DOWN") {
                dirRef.current = "UP";
                setDirection("UP");
            } else if ((e.key === "ArrowDown" || e.key === "s") && dir !== "UP") {
                dirRef.current = "DOWN";
                setDirection("DOWN");
            } else if ((e.key === "ArrowLeft" || e.key === "a") && dir !== "RIGHT") {
                dirRef.current = "LEFT";
                setDirection("LEFT");
            } else if ((e.key === "ArrowRight" || e.key === "d") && dir !== "LEFT") {
                dirRef.current = "RIGHT";
                setDirection("RIGHT");
            }

            if (e.key === " ") {
                e.preventDefault();
                if (!isRunning) startGame();
            }
        };

        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [isRunning, startGame]);

    // Game loop
    useEffect(() => {
        if (!isRunning || gameOver) return;

        const interval = setInterval(() => {
            setSnake((prev) => {
                const head = { ...prev[0] };
                const dir = dirRef.current;

                if (dir === "UP") head.y -= 1;
                else if (dir === "DOWN") head.y += 1;
                else if (dir === "LEFT") head.x -= 1;
                else if (dir === "RIGHT") head.x += 1;

                // Wall collision
                if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
                    setGameOver(true);
                    setIsRunning(false);
                    setHighScore((hs) => Math.max(hs, score));
                    return prev;
                }

                // Self collision
                if (prev.some((s) => s.x === head.x && s.y === head.y)) {
                    setGameOver(true);
                    setIsRunning(false);
                    setHighScore((hs) => Math.max(hs, score));
                    return prev;
                }

                const newSnake = [head, ...prev];

                // Food collision
                if (head.x === food.x && head.y === food.y) {
                    setScore((s) => s + 1);
                    setFood(randomFood(newSnake));
                } else {
                    newSnake.pop();
                }

                return newSnake;
            });
        }, Math.max(60, INITIAL_SPEED - score * 3));

        return () => clearInterval(interval);
    }, [isRunning, gameOver, food, score]);

    // Touch controls
    const touchStart = useRef<{ x: number; y: number } | null>(null);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (!touchStart.current) return;
        const dx = e.changedTouches[0].clientX - touchStart.current.x;
        const dy = e.changedTouches[0].clientY - touchStart.current.y;
        const dir = dirRef.current;

        if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > 20 && dir !== "LEFT") { dirRef.current = "RIGHT"; setDirection("RIGHT"); }
            else if (dx < -20 && dir !== "RIGHT") { dirRef.current = "LEFT"; setDirection("LEFT"); }
        } else {
            if (dy > 20 && dir !== "UP") { dirRef.current = "DOWN"; setDirection("DOWN"); }
            else if (dy < -20 && dir !== "DOWN") { dirRef.current = "UP"; setDirection("UP"); }
        }
        touchStart.current = null;
    };

    const boardPx = GRID_SIZE * CELL_SIZE;

    return (
        <div className="max-w-lg mx-auto">
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold gradient-text-static mb-2">Snake</h2>
                <p className="text-[10px] font-mono text-[#469D89]/50 tracking-widest uppercase">
                    Arrow keys or WASD · Swipe on mobile
                </p>
            </div>

            {/* Scores */}
            <div className="flex justify-center gap-8 mb-4">
                <div className="text-center">
                    <div className="text-2xl font-bold font-mono text-[#469D89]">{score}</div>
                    <div className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">Score</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold font-mono text-[#469D89]/50">{highScore}</div>
                    <div className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">Best</div>
                </div>
            </div>

            {/* Board */}
            <div
                ref={gameRef}
                className="flex justify-center mb-6"
                tabIndex={0}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <div
                    className="relative border border-[#469D89]/20 rounded-xl overflow-hidden bg-[#060a09]"
                    style={{ width: boardPx, height: boardPx }}
                >
                    {/* Food */}
                    <div
                        className="absolute rounded-sm bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.6)]"
                        style={{
                            width: CELL_SIZE - 2,
                            height: CELL_SIZE - 2,
                            left: food.x * CELL_SIZE + 1,
                            top: food.y * CELL_SIZE + 1,
                        }}
                    />

                    {/* Snake */}
                    {snake.map((s, i) => (
                        <div
                            key={i}
                            className={`absolute rounded-sm ${
                                i === 0
                                    ? "bg-[#469D89] shadow-[0_0_8px_rgba(70,157,137,0.6)]"
                                    : "bg-[#469D89]/60"
                            }`}
                            style={{
                                width: CELL_SIZE - 2,
                                height: CELL_SIZE - 2,
                                left: s.x * CELL_SIZE + 1,
                                top: s.y * CELL_SIZE + 1,
                            }}
                        />
                    ))}

                    {/* Overlay */}
                    {(!isRunning || gameOver) && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
                            <div className="text-lg font-bold font-mono text-[#469D89] mb-2">
                                {gameOver ? "Game Over!" : "Snake"}
                            </div>
                            <button
                                onClick={startGame}
                                className="px-5 py-2 text-[11px] font-mono tracking-widest uppercase text-[#469D89] border border-[#469D89]/40 rounded-lg hover:bg-[#469D89]/10 transition-all"
                            >
                                {gameOver ? "Try Again" : "Start"}
                            </button>
                            <span className="mt-2 text-[10px] font-mono text-[#469D89]/40">
                                or press Space
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile D-pad */}
            <div className="flex justify-center mb-4 sm:hidden">
                <div className="grid grid-cols-3 gap-1 w-32">
                    <div />
                    <button onClick={() => { if (dirRef.current !== "DOWN") { dirRef.current = "UP"; setDirection("UP"); } }}
                        className="h-10 rounded-lg border border-[#469D89]/30 bg-[#469D89]/5 text-[#469D89] flex items-center justify-center">↑</button>
                    <div />
                    <button onClick={() => { if (dirRef.current !== "RIGHT") { dirRef.current = "LEFT"; setDirection("LEFT"); } }}
                        className="h-10 rounded-lg border border-[#469D89]/30 bg-[#469D89]/5 text-[#469D89] flex items-center justify-center">←</button>
                    <button onClick={() => { if (dirRef.current !== "UP") { dirRef.current = "DOWN"; setDirection("DOWN"); } }}
                        className="h-10 rounded-lg border border-[#469D89]/30 bg-[#469D89]/5 text-[#469D89] flex items-center justify-center">↓</button>
                    <button onClick={() => { if (dirRef.current !== "LEFT") { dirRef.current = "RIGHT"; setDirection("RIGHT"); } }}
                        className="h-10 rounded-lg border border-[#469D89]/30 bg-[#469D89]/5 text-[#469D89] flex items-center justify-center">→</button>
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
                    Reset
                </motion.button>
                <HowToPlay>
                    <ul className="space-y-1.5 text-[12px] font-mono text-muted-foreground/70 leading-5">
                        <li>Use arrow keys or WASD to steer the snake</li>
                        <li>On mobile, use the D-pad or swipe to turn</li>
                        <li>Eat food to grow longer and score points</li>
                        <li>Speed increases as you eat more</li>
                        <li>Don&apos;t hit the walls or your own tail!</li>
                    </ul>
                </HowToPlay>
            </div>
        </div>
    );
}
