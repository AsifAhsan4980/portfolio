"use client";
import React, { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const PageTransition: React.FC<{ children: ReactNode }> = ({ children }) => {
    const pathName = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathName}
                initial={{ clipPath: "inset(0 0 100% 0)" }}
                animate={{ clipPath: "inset(0 0 0% 0)" }}
                exit={{ opacity: 0, transition: { duration: 0.15, ease: "easeIn" } }}
                transition={{
                    clipPath: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
                }}
                style={{ pointerEvents: "auto" }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

export default PageTransition;
