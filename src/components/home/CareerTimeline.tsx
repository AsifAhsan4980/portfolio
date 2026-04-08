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
    activities?: { title: string; period: string }[];
}

const entries: TimelineEntry[] = [
    {
        year: "2016–2020",
        role: "BSc in Computer Science",
        company: "BRAC University · Dhaka",
        description: "Four years of computer science alongside active involvement in campus clubs — leading IT operations, competitive chess, and the university's tech community.",
        tags: ["Algorithms", "Data Structures", "OOP", "Web Dev"],
        activities: [
            { title: "BizBee Business Club — Assistant Director of IT", period: "2016–2020" },
            { title: "Chess Club — Director", period: "2017–2020" },
            { title: "Computer Club — Senior Executive", period: "2017–2018" },
        ],
        highlight: false,
    },
    {
        year: "2021",
        role: "Frontend Engineer Intern",
        company: "Gononet Online Solution · Karwan Bazar, Dhaka",
        description: "First professional role — developed and maintained frontend systems, learned production-grade development workflow, and shipped features used by real users.",
        tags: ["HTML", "CSS", "JavaScript", "React"],
        highlight: false,
    },
    {
        year: "2021",
        role: "Junior Full Stack Developer",
        company: "Bengal Software · Bashundhara RA, Dhaka",
        description: "Built REST APIs for global prayer time calculations, developed admin dashboard and notification system. Achieved 98% notification delivery rate.",
        tags: ["Node.js", "Express", "MongoDB", "React", "AWS Lambda"],
        highlight: false,
    },
    {
        year: "2021–2022",
        role: "Software Engineer",
        company: "Tech Hack Canada · Banani, Dhaka",
        description: "Built web applications following international standards and workflows for a Canadian-based software firm.",
        tags: ["React", "TypeScript", "Node.js", "REST APIs"],
        highlight: false,
    },
    {
        year: "2022–2025",
        role: "Software Engineer → Senior Software Engineer",
        company: "Doodle Technologies Ltd. · Mirpur DOHS, Dhaka",
        description: "Promoted to SSE — developed backend systems for Tribel (US social media platform), led Wozaif recruitment platform as team lead, architected Ticket Tomorrow's ticketing system with bKash/SSLCommerz integration, and built multilingual portfolio sites with Lighthouse 95+ scores.",
        tags: ["Next.js", "React", "AWS Lambda", "GraphQL", "MongoDB", "i18n"],
        highlight: true,
    },
    {
        year: "2025–Present",
        role: "Senior Software Engineer",
        company: "Right Tracks IT · Mohakhali DOHS, Dhaka",
        description: "Current role — built ZodoLive's admin dashboard from scratch with real-time statistics, RBAC, and Agora SDK integration. Developed Creator AI platform powering Paint and Vida apps with Gemini Nano and Banana AI pipelines. Also building personal projects: Gunti, Nexus RTC, and Nagorik.",
        tags: ["Next.js", "AWS Lambda", "AppSync", "Agora SDK", "AI", "TypeScript"],
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
                                    {entry.activities && (
                                        <div className="mb-4 space-y-1.5">
                                            <p className="text-[9px] font-mono text-[#469D89]/50 tracking-[0.2em] uppercase mb-2">Co-Curricular</p>
                                            {entry.activities.map((a, j) => (
                                                <div key={j} className="flex items-center justify-between gap-3 px-3 py-1.5 rounded-lg border border-[#469D89]/15 bg-[#469D89]/4">
                                                    <span className="text-[11px] text-foreground/80">{a.title}</span>
                                                    <span className="text-[9px] font-mono text-[#469D89]/50 shrink-0">{a.period}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
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
