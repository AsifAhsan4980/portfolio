"use client";
import React, { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

interface PageTransitionProps {
    children: ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
    const pathName = usePathname();

    return (
        <AnimatePresence mode="wait">
            {/* Background layer (transition effect) */}
            <motion.div
                key={pathName}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-screen h-screen top-0 left-0 pointer-events-none" // Background layer with no interaction
            >
                {/* Child wrapper (allows interaction with navbar and other elements) */}
                <motion.div
                    className="w-full h-full"
                    style={{ pointerEvents: 'auto' }} // Ensures the children are interactive
                >
                    {children}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default PageTransition;
