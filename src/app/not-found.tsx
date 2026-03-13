"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import { useRouter } from "next/navigation";
import Link from "next/link";
import animationData from "@/assets/animation/Animation - 1732218926437.json";
import { motion } from "framer-motion";

const NotFoundPage: React.FC = () => {
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-8 overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#469D89]/6 rounded-full blur-[120px] pointer-events-none" />

            {/* HUD corner brackets */}
            <div className="absolute top-6 left-6 w-7 h-7 border-t-2 border-l-2 border-[#469D89]/35 pointer-events-none" />
            <div className="absolute top-6 right-6 w-7 h-7 border-t-2 border-r-2 border-[#469D89]/35 pointer-events-none" />
            <div className="absolute bottom-6 left-6 w-7 h-7 border-b-2 border-l-2 border-[#469D89]/35 pointer-events-none" />
            <div className="absolute bottom-6 right-6 w-7 h-7 border-b-2 border-r-2 border-[#469D89]/35 pointer-events-none" />

            {/* Status bar */}
            <motion.div
                className="absolute top-0 left-0 right-0 flex justify-between items-center px-6 py-2.5 border-b border-[#469D89]/15 text-[10px] font-mono text-[#469D89]/40 tracking-widest"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <span>ERR://404_NOT_FOUND</span>
                <span className="flex items-center gap-2">
                    <motion.span
                        className="w-1.5 h-1.5 rounded-full bg-red-400"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                    />
                    PAGE_OFFLINE
                </span>
                <span>SYS://PORTFOLIO.EXE</span>
            </motion.div>

            {/* Lottie Animation */}
            <motion.div
                className="mb-6 w-full max-w-sm"
                aria-hidden="true"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
            >
                <Lottie animationData={animationData} loop={true} />
            </motion.div>

            {/* 404 Message */}
            <motion.div
                className="text-center relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#469D89]/40" />
                    <span className="text-[10px] font-mono text-[#469D89]/50 tracking-[0.3em] uppercase">Error 404</span>
                    <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#469D89]/40" />
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold neon-text-pulse mb-3">
                    Page <span className="gradient-text">Not Found</span>
                </h1>
                <p className="text-sm font-mono text-muted-foreground mb-8 max-w-sm">
                    <span className="text-[#469D89]/50">{'>'}</span> The page you&apos;re looking for might have been moved or doesn&apos;t exist.
                </p>

                {/* Go Home button */}
                <motion.button
                    onClick={() => router.push("/")}
                    className="px-7 py-3 text-sm font-mono tracking-widest text-[#469D89] border border-[#469D89]/50 rounded-xl transition-all duration-300 hover:border-[#469D89] hover:shadow-[0_0_20px_rgba(70,157,137,0.3)] hover:bg-[#469D89]/10 focus:outline-none focus:ring-2 focus:ring-[#469D89] focus:ring-offset-2 mb-8"
                    aria-label="Navigate back to homepage"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                >
                    ← Return to Base
                </motion.button>

                {/* Quick nav links */}
                <nav className="flex gap-6 justify-center" aria-label="Quick navigation">
                    {[
                        { href: "/", label: "Home" },
                        { href: "/projects", label: "Projects" },
                        { href: "/contacts", label: "Contact" },
                    ].map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-xs font-mono text-[#469D89]/60 hover:text-[#469D89] transition-colors underline underline-offset-4 decoration-[#469D89]/30 focus:outline-none focus:ring-2 focus:ring-[#469D89] rounded"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </motion.div>
        </div>
    );
};

export default NotFoundPage;
