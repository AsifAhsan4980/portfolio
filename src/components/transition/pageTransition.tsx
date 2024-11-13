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
            <motion.div
                key={pathName}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className={"w-screen h-screen fixed top-0 pointer-events-none"} >

                {children}
            </motion.div>
        </AnimatePresence>
    );
};

export default PageTransition;
