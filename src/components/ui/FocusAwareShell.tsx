"use client";

import { useFocusMode } from "@/context/FocusMode";
import { motion, AnimatePresence } from "framer-motion";

interface FocusAwareShellProps {
    navbar: React.ReactNode;
    footer: React.ReactNode;
    children: React.ReactNode;
}

export default function FocusAwareShell({ navbar, footer, children }: FocusAwareShellProps) {
    const { isFocused } = useFocusMode();

    return (
        <>
            <AnimatePresence>
                {!isFocused && (
                    <motion.div
                        initial={false}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -40 }}
                        transition={{ duration: 0.3 }}
                    >
                        {navbar}
                    </motion.div>
                )}
            </AnimatePresence>

            {children}

            <AnimatePresence>
                {!isFocused && (
                    <motion.div
                        initial={false}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 40 }}
                        transition={{ duration: 0.3 }}
                    >
                        {footer}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
