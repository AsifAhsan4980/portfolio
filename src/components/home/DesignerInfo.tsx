"use client";
import React from "react";
import { motion } from "framer-motion";
import ImageGallery from "./ImageGallery";

export function DesignerInfo() {
    return (
        <article className="max-md:w-full max-md:ml-0 max-md:flex max-md:flex-col max-md:items-center">
            <div className="flex flex-col items-start w-full max-md:mt-10 max-md:max-w-full max-md:items-center">

                {/* Section label */}
                <motion.div
                    className="flex items-center gap-3 mb-5"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="w-1 h-6 bg-gradient-to-b from-[#469D89] to-[#2d6b5f] rounded-full" />
                    <span className="text-[10px] font-mono text-[#469D89]/60 tracking-[0.25em] uppercase">About</span>
                </motion.div>

                <motion.h1
                    className="text-4xl lg:text-5xl font-bold tracking-wide leading-[1.2] text-center lg:text-left"
                    initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    Detail Oriented &<br />
                    <span className="gradient-text">Passionate</span> Software Engineer
                </motion.h1>

                <motion.p
                    className="self-stretch mt-5 text-base leading-7 text-muted-foreground text-center lg:text-left"
                    initial={{ opacity: 0, y: 15, filter: "blur(5px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    Highly skilled full-stack developer with{" "}
                    <span className="text-[#469D89] font-semibold">6+ years</span>{" "}
                    designing and building dynamic, high-performance web applications.
                    Specialized in writing clean, well-documented code with a strong
                    focus on user-friendly interfaces and seamless functionality —
                    delivering scalable, maintainable solutions that drive real results.
                </motion.p>

                <ImageGallery />
            </div>
        </article>
    );
}
