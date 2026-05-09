"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useFocusMode } from "@/context/FocusMode";

const gameComponents: Record<string, ReturnType<typeof dynamic>> = {
    TicTacToe: dynamic(() => import("@/components/games/TicTacToe"), { ssr: false }),
    SholoGuti: dynamic(() => import("@/components/games/SholoGuti"), { ssr: false }),
    Checkers: dynamic(() => import("@/components/games/Checkers"), { ssr: false }),
    Snake: dynamic(() => import("@/components/games/Snake"), { ssr: false }),
    Game2048: dynamic(() => import("@/components/games/Game2048"), { ssr: false }),
    MemoryMatch: dynamic(() => import("@/components/games/MemoryMatch"), { ssr: false }),
    Minesweeper: dynamic(() => import("@/components/games/Minesweeper"), { ssr: false }),
    BaghChal: dynamic(() => import("@/components/games/BaghChal"), { ssr: false }),
    BaroGuti: dynamic(() => import("@/components/games/BaroGuti"), { ssr: false }),
    MokshaPatam: dynamic(() => import("@/components/games/MokshaPatam"), { ssr: false }),
    Pallanguzhi: dynamic(() => import("@/components/games/Pallanguzhi"), { ssr: false }),
    Ludo: dynamic(() => import("@/components/games/Ludo"), { ssr: false }),
};

interface GamePlayerProps {
    componentName: string;
}

export default function GamePlayer({ componentName }: GamePlayerProps) {
    const [mounted, setMounted] = useState(false);
    const { isFocused, enterFocus, exitFocus } = useFocusMode();

    useEffect(() => setMounted(true), []);

    // Cleanup on unmount
    useEffect(() => {
        return () => exitFocus();
    }, [exitFocus]);

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

    const GameComponent = gameComponents[componentName];
    if (!GameComponent) return null;

    const gameContent = <GameComponent />;

    // Focus overlay rendered via portal to escape PageTransition's clip-path
    const focusOverlay = mounted && isFocused ? createPortal(
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
                    <Link
                        href="/games"
                        onClick={() => exitFocus()}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono text-white/30 hover:text-white/70 transition-colors tracking-widest uppercase rounded-full hover:bg-white/5"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 12H5" /><path d="m12 19-7-7 7-7" />
                        </svg>
                        Back
                    </Link>

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

            <div className="relative container py-12">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-[#469D89]/6 rounded-full blur-[100px] pointer-events-none" />

                {!isFocused && (
                    <div className="relative z-10">
                        {/* Top bar */}
                        <div className="flex items-center justify-between mb-6">
                            <Link
                                href="/games"
                                className="inline-flex items-center gap-2 text-[11px] font-mono text-[#469D89]/60 hover:text-[#469D89] transition-colors tracking-widest uppercase"
                            >
                                ← Back to Games
                            </Link>

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
