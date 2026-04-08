"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import GameCard from "@/components/games/GameCard";
import { useFocusMode } from "@/context/FocusMode";

const TicTacToe = dynamic(() => import("@/components/games/TicTacToe"), { ssr: false });
const SholoGuti = dynamic(() => import("@/components/games/SholoGuti"), { ssr: false });
const Checkers = dynamic(() => import("@/components/games/Checkers"), { ssr: false });
const Snake = dynamic(() => import("@/components/games/Snake"), { ssr: false });
const Game2048 = dynamic(() => import("@/components/games/Game2048"), { ssr: false });
const MemoryMatch = dynamic(() => import("@/components/games/MemoryMatch"), { ssr: false });
const Minesweeper = dynamic(() => import("@/components/games/Minesweeper"), { ssr: false });
const BaghChal = dynamic(() => import("@/components/games/BaghChal"), { ssr: false });
const BaroGuti = dynamic(() => import("@/components/games/BaroGuti"), { ssr: false });
const MokshaPatam = dynamic(() => import("@/components/games/MokshaPatam"), { ssr: false });
const Pallanguzhi = dynamic(() => import("@/components/games/Pallanguzhi"), { ssr: false });
const Ludo = dynamic(() => import("@/components/games/Ludo"), { ssr: false });

type GameView = "menu" | "tictactoe" | "shologuti" | "checkers" | "snake" | "game2048" | "memory" | "minesweeper" | "baghchal" | "baroguti" | "moksha" | "pallanguzhi" | "ludo";

const gamesList: { id: GameView; title: string; description: string; icon: string }[] = [
    { id: "shologuti", title: "Sholo Guti", description: "Traditional Bangladeshi board game. 16 Guti vs 1 Tiger — a strategic battle of wits.", icon: "🐅" },
    { id: "baghchal", title: "Bagh-Chal", description: "Tiger & Goats — Nepali/Bengali classic. 4 tigers hunt 20 goats; goats try to trap all tigers.", icon: "🐅🐐" },
    { id: "baroguti", title: "Baro Guti", description: "12 Guti — traditional Bangladeshi capture game. Jump over opponents to capture them.", icon: "⬡" },
    { id: "moksha", title: "Moksha Patam", description: "Ancient Indian Snakes & Ladders. Virtues lift you up, vices pull you down. Reach Moksha!", icon: "🐍🪜" },
    { id: "pallanguzhi", title: "Pallanguzhi", description: "South Indian Mancala. Sow seeds counter-clockwise, capture pits with exactly 4 seeds.", icon: "🫘" },
    { id: "ludo", title: "Ludo", description: "The desi classic! Roll a 6 to enter, race all 4 tokens home. Land on opponents to send them back.", icon: "🎲" },
    { id: "tictactoe", title: "Tic-Tac-Toe", description: "Classic 3x3 grid game. Play against an AI opponent powered by the minimax algorithm.", icon: "❌⭕" },
    { id: "checkers", title: "Checkers", description: "Classic draughts on an 8x8 board. Capture all opponent pieces with mandatory jumps.", icon: "🔴⚫" },
    { id: "snake", title: "Snake", description: "Guide the snake to eat food and grow. Don't hit the walls or yourself!", icon: "🐍" },
    { id: "game2048", title: "2048", description: "Slide tiles to combine matching numbers. Can you reach the 2048 tile?", icon: "🔢" },
    { id: "memory", title: "Memory Match", description: "Flip cards to find matching pairs. Test your memory with 8 pairs of emojis.", icon: "🧠" },
    { id: "minesweeper", title: "Minesweeper", description: "Clear the minefield without detonating any mines. Flag suspected mines.", icon: "💣" },
];

export default function GamesPage() {
    const [view, setView] = useState<GameView>("menu");
    const [mounted, setMounted] = useState(false);
    const { isFocused, enterFocus, exitFocus } = useFocusMode();

    useEffect(() => setMounted(true), []);

    // Exit focus mode when returning to menu
    useEffect(() => {
        if (view === "menu" && isFocused) {
            exitFocus();
        }
    }, [view, isFocused, exitFocus]);

    // Cleanup on unmount
    useEffect(() => {
        return () => exitFocus();
    }, [exitFocus]);

    const openGame = (id: GameView) => {
        setView(id);
    };

    const backToMenu = () => {
        exitFocus();
        setView("menu");
    };

    // ESC key exits focus mode
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === "Escape" && isFocused) {
            exitFocus();
        }
    }, [isFocused, exitFocus]);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    const gameContent = (
        <>
            {view === "tictactoe" && <TicTacToe />}
            {view === "shologuti" && <SholoGuti />}
            {view === "checkers" && <Checkers />}
            {view === "snake" && <Snake />}
            {view === "game2048" && <Game2048 />}
            {view === "memory" && <MemoryMatch />}
            {view === "minesweeper" && <Minesweeper />}
            {view === "baghchal" && <BaghChal />}
            {view === "baroguti" && <BaroGuti />}
            {view === "moksha" && <MokshaPatam />}
            {view === "pallanguzhi" && <Pallanguzhi />}
            {view === "ludo" && <Ludo />}
        </>
    );

    // Focus overlay rendered via portal to escape PageTransition's clip-path
    const focusOverlay = mounted && isFocused && view !== "menu" ? createPortal(
        <AnimatePresence>
            <motion.div
                key="focus-overlay"
                className="fixed inset-0 z-[100] bg-black/95 overflow-y-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                {/* Vignette edges */}
                <div className="pointer-events-none fixed inset-0 z-[101]" style={{
                    background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)",
                }} />

                {/* Ambient glow behind game */}
                <div className="pointer-events-none fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#469D89]/4 rounded-full blur-[150px]" />

                {/* Floating minimal controls */}
                <motion.div
                    className="fixed top-0 left-0 right-0 z-[102] flex items-center justify-between px-4 py-3"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                >
                    <button
                        onClick={backToMenu}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono text-white/30 hover:text-white/70 transition-colors tracking-widest uppercase rounded-full hover:bg-white/5"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 12H5" /><path d="m12 19-7-7 7-7" />
                        </svg>
                        Back
                    </button>

                    <div className="flex items-center gap-3">
                        <span className="text-[9px] font-mono text-white/20 tracking-widest uppercase hidden sm:block">ESC to exit</span>
                        <button
                            onClick={exitFocus}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono text-white/30 hover:text-white/70 transition-colors tracking-widest uppercase rounded-full hover:bg-white/5"
                        >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M8 3H5a2 2 0 0 0-2 2v3" />
                                <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
                                <path d="M3 16v3a2 2 0 0 0 2 2h3" />
                                <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
                            </svg>
                            Exit
                        </button>
                    </div>
                </motion.div>

                {/* Centered game area */}
                <div className="relative z-[101] flex items-start justify-center pt-16 pb-12 min-h-screen">
                    <motion.div
                        className="w-full max-w-xl px-4 [&>div]:max-w-lg [&>div]:mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        {gameContent}
                    </motion.div>
                </div>
            </motion.div>
        </AnimatePresence>,
        document.body
    ) : null;

    return (
        <>
            {focusOverlay}

            {/* Normal page */}
            <div className={`relative container py-12 ${view === "menu" ? "min-h-screen" : ""}`}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-[#469D89]/6 rounded-full blur-[100px] pointer-events-none" />
                {!isFocused && (
                    <>
                        <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-[#469D89]/30 pointer-events-none" />
                        <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-[#469D89]/30 pointer-events-none" />
                    </>
                )}

                {view === "menu" && (
                    <>
                        <motion.div
                            className="text-center mb-12 relative z-10"
                            initial={{ opacity: 0, y: -30, filter: "blur(10px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
                        >
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#469D89]/50" />
                                <span className="text-[10px] font-mono text-[#469D89]/60 tracking-[0.3em] uppercase">Arcade</span>
                                <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#469D89]/50" />
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-bold neon-text-pulse">
                                Mini <span className="gradient-text">Games</span>
                            </h1>
                            <p className="mt-3 text-sm font-mono text-muted-foreground">
                                <span className="text-[#469D89]/50">{'>'}</span> {gamesList.length} games · take a break and have some fun
                            </p>
                        </motion.div>

                        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
                            {gamesList.map((game, i) => (
                                <div key={game.id} onClick={() => openGame(game.id)}>
                                    <GameCard
                                        title={game.title}
                                        description={game.description}
                                        icon={game.icon}
                                        href="#"
                                        delay={0.05 + i * 0.06}
                                    />
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {view !== "menu" && !isFocused && (
                    <div className="relative z-10">
                        {/* Top bar */}
                        <div className="flex items-center justify-between mb-6">
                            <button
                                onClick={backToMenu}
                                className="inline-flex items-center gap-2 text-[11px] font-mono text-[#469D89]/60 hover:text-[#469D89] transition-colors tracking-widest uppercase"
                            >
                                ← Back to Games
                            </button>

                            <button
                                onClick={enterFocus}
                                className="flex items-center gap-2 px-3 py-1.5 text-[10px] font-mono tracking-widest uppercase rounded-full border border-[#469D89]/25 text-muted-foreground hover:border-[#469D89]/50 hover:text-[#469D89] transition-all duration-200"
                            >
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M8 3v3a2 2 0 0 1-2 2H3" />
                                    <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
                                    <path d="M3 16h3a2 2 0 0 1 2 2v3" />
                                    <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
                                </svg>
                                Focus Mode
                            </button>
                        </div>

                        {gameContent}
                    </div>
                )}
            </div>
        </>
    );
}
