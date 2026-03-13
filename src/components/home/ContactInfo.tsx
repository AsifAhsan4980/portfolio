"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export function ContactInfo() {
    return (
        <aside className="max-md:w-full max-md:ml-0 max-md:flex max-md:flex-col max-md:items-center">
            <motion.div
                className="relative flex z-10 flex-col mt-5 w-full max-md:mt-10 items-center rounded-2xl overflow-hidden"
                initial={{ opacity: 0, y: 40, filter: "blur(10px)", scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
                {/* Animated rotating conic border */}
                <motion.div
                    className="absolute -inset-px rounded-2xl"
                    style={{
                        background: "conic-gradient(from 0deg, transparent 60%, #469D89 75%, #5fb8a3 80%, transparent 95%)",
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                />
                {/* Inner background to mask the rotating border */}
                <div className="absolute inset-[1px] rounded-[calc(1rem-1px)] bg-background" />

                {/* Content */}
                <div className="relative z-10 w-full flex flex-col items-center p-8 lg:p-10">
                    {/* Corner brackets */}
                    <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#469D89]/45 pointer-events-none" />
                    <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[#469D89]/45 pointer-events-none" />
                    <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-[#469D89]/45 pointer-events-none" />
                    <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-[#469D89]/45 pointer-events-none" />

                    {/* BG glow */}
                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#469D89]/5 rounded-full blur-3xl pointer-events-none" />

                    {/* Section label */}
                    <div className="flex items-center gap-3 self-start mb-6">
                        <div className="w-1 h-6 bg-gradient-to-b from-[#469D89] to-[#2d6b5f] rounded-full" />
                        <span className="text-[10px] font-mono text-[#469D89]/60 tracking-[0.25em] uppercase">Contact</span>
                    </div>

                    <motion.h2
                        className="text-4xl lg:text-5xl font-bold tracking-wide leading-[1.2] text-center"
                        initial={{ opacity: 0, y: 15, filter: "blur(6px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.65, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        Drop your question<br />
                        <span className="gradient-text">or Your Message</span>
                    </motion.h2>

                    <motion.p
                        className="mt-5 text-base leading-7 text-muted-foreground text-center max-w-xs"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.25 }}
                    >
                        Ready to bring your ideas to life. Let&apos;s build something extraordinary together.
                    </motion.p>

                    <Link href="/hire-me">
                        <motion.div
                            className="mt-10 flex gap-3 items-center group cursor-pointer"
                            whileHover={{ scale: 1.04 }}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.35 }}
                        >
                            <span className="text-base lg:text-lg font-mono text-[#469D89] group-hover:text-[#5fb8a3] transition-colors underline underline-offset-4 decoration-[#469D89]/40 group-hover:decoration-[#5fb8a3]">
                                asifahsan727@gmail.com
                            </span>
                            <motion.span
                                className="text-[#469D89] text-xl"
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            >
                                →
                            </motion.span>
                        </motion.div>
                    </Link>

                    {/* Neon underline */}
                    <motion.div
                        className="mt-3 h-px bg-gradient-to-r from-transparent via-[#469D89]/50 to-transparent"
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                    />
                </div>
            </motion.div>
        </aside>
    );
}
