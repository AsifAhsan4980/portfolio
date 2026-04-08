"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HowToPlayProps {
    children: React.ReactNode;
}

export default function HowToPlay({ children }: HowToPlayProps) {
    const [open, setOpen] = useState(false);

    return (
        <div className="max-w-sm mx-auto">
            <button
                onClick={() => setOpen((o) => !o)}
                className="w-full flex items-center justify-between gap-2 px-4 py-2.5 border border-[#469D89]/15 rounded-xl hover:border-[#469D89]/30 transition-all duration-200 group"
            >
                <span className="text-[10px] font-mono text-[#469D89]/60 tracking-[0.3em] uppercase group-hover:text-[#469D89]/80 transition-colors">
                    How to Play
                </span>
                <motion.span
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-[#469D89]/40 text-xs"
                >
                    ▼
                </motion.span>
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="pt-2 px-4 pb-4 border border-t-0 border-[#469D89]/15 rounded-b-xl -mt-2 text-left">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
