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
        <AnimatePresence mode="wait" key={pathName}>
            <motion.div
                key={pathName}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 4, ease: "easeInOut" }}
                className=" inset-0  pointer-events-none z-50"
            >
                {/* Child wrapper (allows interaction with navbar and other elements) */}
                <motion.div
                    className="w-full h-full"
                    style={{ pointerEvents: "auto" }}
                >
                    {children}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default PageTransition;
