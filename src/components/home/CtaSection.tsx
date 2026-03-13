"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const CtaSection: React.FC = () => {
    return (
        <section className="relative container py-20">
            <motion.div
                className="relative rounded-2xl overflow-hidden border border-[#469D89]/20"
                initial={{ opacity: 0, y: 50, filter: "blur(12px)", scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
                {/* Rotating conic border */}
                <motion.div
                    className="absolute -inset-px rounded-2xl"
                    style={{
                        background: "conic-gradient(from 0deg, transparent 60%, #469D89 75%, #5fb8a3 80%, transparent 95%)",
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute inset-[1px] rounded-[calc(1rem-1px)] bg-background" />

                {/* Content */}
                <div className="relative z-10 px-8 py-16 lg:py-20 flex flex-col lg:flex-row items-center justify-between gap-10">
                    {/* Corner brackets */}
                    <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-[#469D89]/40 pointer-events-none" />
                    <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-[#469D89]/40 pointer-events-none" />
                    <div className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-[#469D89]/40 pointer-events-none" />
                    <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-[#469D89]/40 pointer-events-none" />

                    {/* Glow */}
                    <div className="absolute top-0 left-1/4 w-80 h-40 bg-[#469D89]/6 rounded-full blur-3xl pointer-events-none" />

                    {/* Left text */}
                    <div className="text-center lg:text-left">
                        <div className="flex items-center gap-2 justify-center lg:justify-start mb-4">
                            <motion.span
                                className="w-2 h-2 rounded-full bg-[#469D89]"
                                animate={{ opacity: [1, 0.3, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                            <span className="text-[10px] font-mono text-[#469D89]/60 tracking-[0.25em] uppercase">
                                Open to opportunities
                            </span>
                        </div>
                        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                            Have a project <br />
                            <span className="gradient-text">in mind?</span>
                        </h2>
                        <p className="mt-4 text-sm font-mono text-muted-foreground max-w-md">
                            <span className="text-[#469D89]/50">{'>'}</span> Let&apos;s turn your idea into a
                            scalable, high-performance product. I&apos;m currently available for freelance
                            and full-time roles.
                        </p>
                    </div>

                    {/* Right CTAs */}
                    <div className="flex flex-col sm:flex-row lg:flex-col gap-4 shrink-0">
                        <Link href="/hire-me">
                            <motion.button
                                className="btn-ripple px-8 py-3.5 w-full sm:w-auto lg:w-full text-sm font-mono tracking-widest text-background bg-[#469D89] rounded-xl hover:bg-[#5fb8a3] hover:shadow-[0_0_24px_rgba(70,157,137,0.5)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#469D89] focus:ring-offset-2"
                                whileHover={{ scale: 1.04, y: -2 }}
                                whileTap={{ scale: 0.96 }}
                            >
                                Hire Me →
                            </motion.button>
                        </Link>
                        <Link href="/projects">
                            <motion.button
                                className="btn-ripple px-8 py-3.5 w-full sm:w-auto lg:w-full text-sm font-mono tracking-widest text-[#469D89] border border-[#469D89]/50 rounded-xl hover:border-[#469D89] hover:bg-[#469D89]/8 hover:shadow-[0_0_18px_rgba(70,157,137,0.25)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#469D89] focus:ring-offset-2"
                                whileHover={{ scale: 1.04, y: -2 }}
                                whileTap={{ scale: 0.96 }}
                            >
                                View Projects
                            </motion.button>
                        </Link>
                        <a href="/resume.pdf" download="Asif_Ahsan_Resume.pdf">
                            <motion.button
                                className="btn-ripple px-8 py-3.5 w-full sm:w-auto lg:w-full text-sm font-mono tracking-widest text-muted-foreground border border-border/50 rounded-xl hover:border-[#469D89]/40 hover:text-[#469D89] hover:bg-[#469D89]/5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#469D89] focus:ring-offset-2 flex items-center justify-center gap-2"
                                whileHover={{ scale: 1.04, y: -2 }}
                                whileTap={{ scale: 0.96 }}
                            >
                                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="shrink-0">
                                    <path d="M6.5 1v8M3 6.5l3.5 3.5 3.5-3.5M1 12h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                Download CV
                            </motion.button>
                        </a>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default CtaSection;
