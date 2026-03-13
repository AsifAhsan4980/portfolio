"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TypingText = ({ text, className }: { text: string; className?: string }) => {
    const [displayText, setDisplayText] = useState("");
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        let currentIndex = 0;
        const timer = setTimeout(() => {
            const interval = setInterval(() => {
                if (currentIndex <= text.length) {
                    setDisplayText(text.slice(0, currentIndex));
                    currentIndex++;
                } else {
                    setIsComplete(true);
                    clearInterval(interval);
                }
            }, 75);
            return () => clearInterval(interval);
        }, 900);
        return () => clearTimeout(timer);
    }, [text]);

    return (
        <span className={className}>
            {displayText}
            <span
                className={`inline-block w-[2px] h-[1em] bg-[#469D89] ml-1 align-middle ${
                    isComplete ? "terminal-cursor" : ""
                }`}
            />
        </span>
    );
};

const ProfileIntro = () => {
    return (
        <section className="w-full">
            {/* Terminal window */}
            <motion.div
                className="border border-[#469D89]/30 rounded-xl overflow-hidden bg-background/60 backdrop-blur-md shadow-[0_0_30px_rgba(70,157,137,0.08)]"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
            >
                {/* Terminal title bar */}
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#469D89]/20 bg-[#469D89]/5">
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#469D89]/70" />
                    </div>
                    <span className="text-[10px] text-[#469D89]/50 font-mono tracking-widest">profile.sh</span>
                    <div className="w-14" />
                </div>

                {/* Terminal body */}
                <div className="p-5 lg:p-6 font-mono">
                    {/* Command line */}
                    <motion.div
                        className="flex gap-2 items-center text-xs mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                    >
                        <span className="text-[#469D89]/40">$</span>
                        <span className="text-[#469D89]/70">whoami</span>
                    </motion.div>

                    {/* Role */}
                    <motion.h2
                        className="text-xl lg:text-2xl font-bold leading-8"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.85 }}
                    >
                        <TypingText text="Senior Software Developer" className="block text-[#469D89]" />
                        <span className="block mt-1 text-muted-foreground text-sm">
                            <span className="text-[#469D89]/40">@</span> Dhaka, Bangladesh
                        </span>
                    </motion.h2>

                    {/* Description */}
                    <motion.div
                        className="mt-4 flex gap-2 text-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.0 }}
                    >
                        <span className="text-[#469D89]/40 mt-0.5">{'>'}</span>
                        <p className="text-muted-foreground text-sm leading-6">
                            Hi, I&apos;m{" "}
                            <span className="text-[#469D89] font-semibold">Asif Ahsan</span>.{" "}
                            Senior Software Engineer with{" "}
                            <span className="text-[#469D89] font-semibold">5+ years</span>{" "}
                            building scalable, high-performance web applications.
                        </p>
                    </motion.div>

                    {/* System specs */}
                    <motion.div
                        className="mt-5 pt-4 border-t border-[#469D89]/15 grid grid-cols-2 gap-x-4 gap-y-1.5 text-[10px] text-[#469D89]/45 tracking-wide"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                    >
                        <div>
                            STACK<span className="text-[#469D89]/25 mx-1">::</span>React / Next.js
                        </div>
                        <div>
                            EXP<span className="text-[#469D89]/25 mx-1">::</span>5+ years
                        </div>
                        <div>
                            REGION<span className="text-[#469D89]/25 mx-1">::</span>BD / Remote
                        </div>
                        <div>
                            STATUS<span className="text-[#469D89]/25 mx-1">::</span>
                            <span className="text-[#469D89]">ONLINE</span>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default ProfileIntro;
