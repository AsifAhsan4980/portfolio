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
        year: "2021",
        role: "Frontend Engineer Intern",
        company: "Gononet Online Solution · Carwan Bazar, Dhaka",
        description: "First professional role — built and maintained frontend interfaces, learned production-grade development workflow, and shipped features used by real users.",
        tags: ["HTML", "CSS", "JavaScript", "React"],
        highlight: false,
    },
    {
        year: "2021",
        role: "Junior Full Stack Developer",
        company: "Bengal Software · Bashundhara RA, Dhaka",
        description: "Stepped up to full-stack responsibilities — built REST APIs, designed database schemas, and delivered end-to-end features across web applications.",
        tags: ["React", "Node.js", "MongoDB", "Express"],
        highlight: false,
    },
    {
        year: "2022",
        role: "Software Engineer",
        company: "Tech Hack Canada · Banani, Dhaka",
        description: "Worked on client projects for a Canadian-based software firm, building web applications and gaining experience with international product standards and workflows.",
        tags: ["React", "TypeScript", "Node.js", "REST APIs"],
        highlight: false,
    },
    {
        year: "2022",
        role: "Senior Software Engineer",
        company: "Doodle Inc · Mirpur DOHS, Dhaka",
        description: "Promoted to SSE — led frontend architecture for company portfolio sites and client products. Built multilingual Next.js apps with i18n, AWS Amplify deployments, and Lighthouse 95+ scores.",
        tags: ["Next.js", "i18n", "AWS Amplify", "TypeScript"],
        highlight: false,
    },
    {
        year: "2023",
        role: "Full-Stack Engineer",
        company: "Ticket Tomorrow · Tribel",
        description: "Architected Ticket Tomorrow's serverless ticketing platform on AWS (Lambda + DynamoDB + AppSync). Simultaneously contributed to Tribel, a US-based social media platform serving hundreds of thousands of users.",
        tags: ["Next.js", "AWS Lambda", "GraphQL", "DynamoDB"],
        highlight: false,
    },
    {
        year: "2024",
        role: "Senior Software Engineer",
        company: "ZodoLive · Wozaif · Creator AI",
        description: "Scaled multiple live products — a global live streaming platform with real-time gifting, a multilingual job board across Asia with full RTL support, and an AI image/video generation platform powered by Claude AI.",
        tags: ["WebRTC", "AI Integration", "i18n", "Scalability"],
        highlight: true,
    },
    {
        year: "2025",
        role: "Senior Software Engineer",
        company: "Right Tracks IT · Mohakhali DOHS, Dhaka",
        description: "Current role — delivering custom software solutions across web, mobile, and cloud. Building production systems for clients in fintech, healthcare, and e-commerce alongside personal projects Gunti, Nexus RTC, and Nagorik.",
        tags: ["React", "Next.js", "AWS", "React Native"],
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
