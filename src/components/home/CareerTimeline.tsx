"use client";
import React from "react";
import { motion } from "framer-motion";

interface TimelineEntry {
    year: string;
    role: string;
    company: string;
    description: string;
    tags: string[];
    highlight?: boolean;
}

const entries: TimelineEntry[] = [
    {
        year: "2017",
        role: "Founder & Lead Engineer",
        company: "Right Tracks IT",
        description: "Founded a software development agency delivering custom web, mobile, and cloud solutions. Built and shipped projects across fintech, healthcare, and e-commerce for clients in Bangladesh and internationally.",
        tags: ["React", "Node.js", "AWS", "React Native"],
        highlight: false,
    },
    {
        year: "2022",
        role: "Senior Frontend Engineer",
        company: "Tribel (US Social Platform)",
        description: "Joined the US-based social media platform as a senior engineer. Led development of core feed, post, and community features at scale for hundreds of thousands of US users.",
        tags: ["React", "MongoDB", "AWS", "Performance"],
        highlight: false,
    },
    {
        year: "2023",
        role: "Full-Stack Engineer",
        company: "Ticket Tomorrow",
        description: "Architected and built the full ticketing platform from scratch using Next.js and a serverless AWS stack. Integrated local payment gateways and handled high concurrency during major event launches.",
        tags: ["Next.js", "AWS Lambda", "DynamoDB", "GraphQL"],
        highlight: false,
    },
    {
        year: "2024",
        role: "Senior Software Engineer",
        company: "ZodoLive · Wozaif · Creator AI",
        description: "Scaled multiple products simultaneously — a global live streaming platform, a multilingual job board across Asia, and an AI image/video generation platform powered by Claude AI.",
        tags: ["WebRTC", "AI Integration", "i18n", "Scalability"],
        highlight: true,
    },
    {
        year: "2025",
        role: "Independent Builder",
        company: "Personal Projects",
        description: "Building three ambitious personal projects: Gunti (cross-platform expense manager for Bangladesh), Nexus RTC SDK (open-source Agora alternative), and Nagorik (modern e-commerce platform).",
        tags: ["WebRTC", "Kotlin", "Swift", "Open Source"],
        highlight: false,
    },
];

const CareerTimeline: React.FC = () => {
    return (
        <section className="relative container py-20">
            {/* Section header */}
            <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
                <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#469D89]/50" />
                    <span className="text-[10px] font-mono text-[#469D89]/60 tracking-[0.3em] uppercase">Journey</span>
                    <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#469D89]/50" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold">
                    Career <span className="gradient-text">Timeline</span>
                </h2>
            </motion.div>

            {/* Timeline */}
            <div className="relative max-w-3xl mx-auto">
                {/* Vertical line */}
                <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#469D89]/30 to-transparent lg:-translate-x-px" />

                {entries.map((entry, i) => {
                    const isRight = i % 2 === 0;
                    return (
                        <motion.div
                            key={i}
                            className={`relative flex gap-8 mb-12 ${
                                isRight ? "lg:flex-row" : "lg:flex-row-reverse"
                            } flex-row`}
                            initial={{ opacity: 0, x: isRight ? -30 : 30, filter: "blur(6px)" }}
                            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                        >
                            {/* Dot on the line */}
                            <div className={`absolute left-6 lg:left-1/2 lg:-translate-x-1/2 top-4 flex items-center justify-center`}>
                                <motion.div
                                    className={`w-3 h-3 rounded-full border-2 z-10 ${
                                        entry.highlight
                                            ? "bg-[#469D89] border-[#469D89] shadow-[0_0_12px_rgba(70,157,137,0.8)]"
                                            : "bg-background border-[#469D89]/50"
                                    }`}
                                    whileInView={entry.highlight ? { scale: [1, 1.3, 1] } : {}}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                />
                            </div>

                            {/* Spacer for alternating layout */}
                            <div className="hidden lg:block w-1/2" />

                            {/* Card */}
                            <div className={`ml-12 lg:ml-0 w-full lg:w-1/2 ${isRight ? "lg:pl-10" : "lg:pr-10"}`}>
                                <motion.div
                                    className={`relative p-5 rounded-xl border ${
                                        entry.highlight
                                            ? "border-[#469D89]/40 bg-[#469D89]/5"
                                            : "border-[#469D89]/15 bg-background/60"
                                    } backdrop-blur-sm`}
                                    whileHover={{ borderColor: "rgba(70,157,137,0.4)", y: -2 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-[10px] font-mono text-[#469D89] tracking-widest border border-[#469D89]/30 px-2 py-0.5 rounded-full">
                                            {entry.year}
                                        </span>
                                        {entry.highlight && (
                                            <span className="text-[9px] font-mono text-[#469D89]/70 tracking-widest">
                                                ✦ KEY MILESTONE
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="font-bold text-sm text-foreground mb-0.5">{entry.role}</h3>
                                    <p className="text-[11px] font-mono text-[#469D89]/60 mb-3 tracking-wide">{entry.company}</p>
                                    <p className="text-xs text-muted-foreground leading-5 mb-4">{entry.description}</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {entry.tags.map((tag, j) => (
                                            <span key={j} className="px-2 py-0.5 text-[9px] font-mono text-[#469D89] border border-[#469D89]/20 rounded-full bg-[#469D89]/5">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
};

export default CareerTimeline;
