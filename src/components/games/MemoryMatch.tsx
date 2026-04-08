"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import HowToPlay from "./HowToPlay";

const EMOJIS = ["🚀", "⚡", "🎯", "💎", "🔥", "🎮", "🧠", "🌊"];

interface Card {
    id: number;
    emoji: string;
    flipped: boolean;
    matched: boolean;
}

function shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function initCards(): Card[] {
    const pairs = [...EMOJIS, ...EMOJIS];
    return shuffle(pairs).map((emoji, i) => ({
        id: i,
        emoji,
        flipped: false,
        matched: false,
    }));
}

export default function MemoryMatch() {
    const [cards, setCards] = useState<Card[]>(initCards);
    const [flippedIds, setFlippedIds] = useState<number[]>([]);
    const [moves, setMoves] = useState(0);
    const [matches, setMatches] = useState(0);
    const [bestMoves, setBestMoves] = useState(0);
    const [isChecking, setIsChecking] = useState(false);
    const [timer, setTimer] = useState(0);
    const [running, setRunning] = useState(false);

    const isComplete = matches === EMOJIS.length;

    // Timer
    useEffect(() => {
        if (!running || isComplete) return;
        const interval = setInterval(() => setTimer((t) => t + 1), 1000);
        return () => clearInterval(interval);
    }, [running, isComplete]);

    const handleFlip = useCallback(
        (id: number) => {
            if (isChecking || isComplete) return;
            const card = cards.find((c) => c.id === id);
            if (!card || card.flipped || card.matched) return;

            if (!running) setRunning(true);

            const newCards = cards.map((c) =>
                c.id === id ? { ...c, flipped: true } : c
            );
            setCards(newCards);

            const newFlipped = [...flippedIds, id];
            setFlippedIds(newFlipped);

            if (newFlipped.length === 2) {
                setMoves((m) => m + 1);
                setIsChecking(true);

                const [first, second] = newFlipped;
                const c1 = newCards.find((c) => c.id === first)!;
                const c2 = newCards.find((c) => c.id === second)!;

                if (c1.emoji === c2.emoji) {
                    // Match found
                    setTimeout(() => {
                        setCards((prev) =>
                            prev.map((c) =>
                                c.id === first || c.id === second
                                    ? { ...c, matched: true }
                                    : c
                            )
                        );
                        setMatches((m) => {
                            const newM = m + 1;
                            if (newM === EMOJIS.length) {
                                setBestMoves((b) => (b === 0 ? moves + 1 : Math.min(b, moves + 1)));
                            }
                            return newM;
                        });
                        setFlippedIds([]);
                        setIsChecking(false);
                    }, 400);
                } else {
                    // No match — flip back
                    setTimeout(() => {
                        setCards((prev) =>
                            prev.map((c) =>
                                c.id === first || c.id === second
                                    ? { ...c, flipped: false }
                                    : c
                            )
                        );
                        setFlippedIds([]);
                        setIsChecking(false);
                    }, 800);
                }
            }
        },
        [cards, flippedIds, isChecking, isComplete, running, moves]
    );

    const reset = useCallback(() => {
        setCards(initCards());
        setFlippedIds([]);
        setMoves(0);
        setMatches(0);
        setIsChecking(false);
        setTimer(0);
        setRunning(false);
    }, []);

    const formatTime = (s: number) =>
        `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

    return (
        <div className="max-w-md mx-auto">
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold gradient-text-static mb-2">Memory Match</h2>
                <p className="text-[10px] font-mono text-[#469D89]/50 tracking-widest uppercase">
                    Find all 8 matching pairs
                </p>
            </div>

            {/* Stats */}
            <div className="flex justify-center gap-6 mb-5">
                <div className="text-center">
                    <div className="text-2xl font-bold font-mono text-[#469D89]">{moves}</div>
                    <div className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">Moves</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold font-mono text-[#469D89]">{matches}/{EMOJIS.length}</div>
                    <div className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">Pairs</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold font-mono text-[#469D89]/60">{formatTime(timer)}</div>
                    <div className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">Time</div>
                </div>
            </div>

            {/* Board */}
            <div className="flex justify-center mb-6">
                <div className="grid grid-cols-4 gap-2">
                    {cards.map((card) => (
                        <motion.button
                            key={card.id}
                            onClick={() => handleFlip(card.id)}
                            className={`w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-xl border text-2xl flex items-center justify-center transition-all duration-200 ${
                                card.matched
                                    ? "border-[#469D89]/40 bg-[#469D89]/10"
                                    : card.flipped
                                    ? "border-[#469D89]/40 bg-[#469D89]/15"
                                    : "border-[#469D89]/20 bg-[#0a1612] hover:border-[#469D89]/40 cursor-pointer"
                            }`}
                            whileTap={!card.flipped && !card.matched ? { scale: 0.92 } : {}}
                        >
                            {(card.flipped || card.matched) ? (
                                <motion.span
                                    initial={{ rotateY: 90 }}
                                    animate={{ rotateY: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {card.emoji}
                                </motion.span>
                            ) : (
                                <span className="text-[#469D89]/15 text-lg font-mono">?</span>
                            )}
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Win message */}
            {isComplete && (
                <motion.div
                    className="text-center mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="text-lg font-bold font-mono text-[#469D89] mb-1">
                        Completed in {moves} moves!
                    </div>
                    <div className="text-[11px] font-mono text-muted-foreground">
                        Time: {formatTime(timer)}{bestMoves > 0 ? ` · Best: ${bestMoves} moves` : ""}
                    </div>
                </motion.div>
            )}

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
                        <li>Tap a card to flip it and reveal the emoji</li>
                        <li>Flip two cards per turn — find matching pairs</li>
                        <li>Matched pairs stay revealed</li>
                        <li>Find all 8 pairs in as few moves as possible</li>
                        <li>Timer starts on your first flip</li>
                    </ul>
                </HowToPlay>
            </div>
        </div>
    );
}
