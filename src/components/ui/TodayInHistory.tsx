"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiClock } from "react-icons/fi";
import { useFocusMode } from "@/context/FocusMode";

interface HistoryEvent {
    year: string;
    text: string;
}

export default function TodayInHistory() {
    const { isFocused } = useFocusMode();
    const [event, setEvent] = useState<HistoryEvent | null>(null);
    const [visible, setVisible] = useState(false);
    const [dismissed, setDismissed] = useState(false);

    useEffect(() => {
        // Only show once per session
        if (sessionStorage.getItem("history-popup-seen")) {
            setDismissed(true);
            return;
        }

        const controller = new AbortController();

        fetch("/api/today-in-history", { signal: controller.signal })
            .then((res) => res.json())
            .then((data: { events: HistoryEvent[] }) => {
                if (data.events && data.events.length > 0) {
                    // Pick a random interesting event (from the last 500 years for relevance)
                    const recent = data.events.filter((e) => {
                        const year = parseInt(e.year, 10);
                        return !isNaN(year) && year >= 1500;
                    });
                    const pool = recent.length > 0 ? recent : data.events;
                    const picked = pool[Math.floor(Math.random() * pool.length)];
                    setEvent(picked);

                    // Delay popup appearance for 2s after page load
                    setTimeout(() => setVisible(true), 2000);
                }
            })
            .catch(() => {});

        return () => controller.abort();
    }, []);

    const handleDismiss = () => {
        setVisible(false);
        setDismissed(true);
        sessionStorage.setItem("history-popup-seen", "1");
    };

    // Auto-dismiss after 12 seconds
    useEffect(() => {
        if (!visible) return;
        const timer = setTimeout(handleDismiss, 12000);
        return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible]);

    if (dismissed || isFocused || !event) return null;

    const today = new Date();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dateLabel = `${monthNames[today.getMonth()]} ${today.getDate()}`;

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className="fixed bottom-6 left-6 z-[85] w-[calc(100vw-3rem)] sm:w-[360px] rounded-xl overflow-hidden border border-[#469D89]/20 bg-background/85 backdrop-blur-xl shadow-[0_0_30px_rgba(70,157,137,0.1)]"
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#469D89]/10 bg-[#469D89]/5">
                        <div className="flex items-center gap-2">
                            <FiClock size={13} className="text-[#469D89]" />
                            <span className="text-[11px] font-mono font-semibold text-foreground tracking-wide">
                                On This Day — {dateLabel}
                            </span>
                        </div>
                        <button
                            onClick={handleDismiss}
                            className="w-6 h-6 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-[#469D89]/10 transition-colors"
                            aria-label="Dismiss"
                        >
                            <FiX size={14} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="px-4 py-3">
                        <p className="text-[12px] font-mono leading-relaxed text-foreground/90">
                            <span className="text-[#469D89] font-bold">{event.year}</span>
                            <span className="text-muted-foreground mx-1.5">—</span>
                            {event.text}
                        </p>
                    </div>

                    {/* Progress bar for auto-dismiss */}
                    <div className="h-[2px] bg-[#469D89]/10">
                        <motion.div
                            className="h-full bg-[#469D89]/40"
                            initial={{ width: "100%" }}
                            animate={{ width: "0%" }}
                            transition={{ duration: 12, ease: "linear" }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
