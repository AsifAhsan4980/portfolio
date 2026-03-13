"use client";
import React from "react";
import { motion } from "framer-motion";

const row1 = [
    { name: "React.js",     color: "#61DAFB" },
    { name: "Next.js",      color: "#ffffff" },
    { name: "TypeScript",   color: "#3178C6" },
    { name: "Node.js",      color: "#339933" },
    { name: "GraphQL",      color: "#E10098" },
    { name: "AWS Lambda",   color: "#FF9900" },
    { name: "DynamoDB",     color: "#4053D6" },
    { name: "Angular",      color: "#DD0031" },
    { name: "PostgreSQL",   color: "#4169E1" },
    { name: "MongoDB",      color: "#47A248" },
    { name: "Tailwind CSS", color: "#06B6D4" },
    { name: "Redux",        color: "#764ABC" },
];

const row3 = [
    { name: "Unity",          color: "#ffffff" },
    { name: "C#",             color: "#9B4F9B" },
    { name: "Kotlin",         color: "#7F52FF" },
    { name: "Swift",          color: "#F05138" },
    { name: "WebRTC",         color: "#469D89" },
    { name: "ClickHouse",     color: "#FFCC00" },
    { name: "Kubernetes",     color: "#326CE5" },
    { name: "Terraform",      color: "#7B42BC" },
    { name: "Prisma",         color: "#5A67D8" },
    { name: "Docker",         color: "#2496ED" },
];

const row2 = [
    { name: "AWS AppSync",   color: "#FF9900" },
    { name: "AWS Cognito",   color: "#FF9900" },
    { name: "AWS S3",        color: "#FF9900" },
    { name: "Express.js",    color: "#ffffff" },
    { name: "Firebase",      color: "#FFCA28" },
    { name: "React Native",  color: "#61DAFB" },
    { name: "Shadcn UI",     color: "#ffffff" },
    { name: "Material UI",   color: "#007FFF" },
    { name: "Ant Design",    color: "#0170FE" },
    { name: "EC2",           color: "#FF9900" },
    { name: "DigitalOcean",  color: "#0080FF" },
    { name: "Vercel",        color: "#ffffff" },
];

const Chip = ({ name, color }: { name: string; color: string }) => (
    <div className="flex items-center gap-2 mx-3 px-4 py-2 border border-[#469D89]/15 rounded-full bg-background/40 backdrop-blur-sm whitespace-nowrap hover:border-[#469D89]/40 hover:bg-[#469D89]/5 transition-all duration-200 group cursor-default">
        <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}60` }}
        />
        <span className="text-xs font-mono text-muted-foreground group-hover:text-foreground transition-colors tracking-wide">
            {name}
        </span>
    </div>
);

const TechStack: React.FC = () => {
    return (
        <section className="relative py-16 overflow-hidden">
            {/* Fade masks on left/right */}
            <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
                style={{ background: "linear-gradient(to right, hsl(var(--background)), transparent)" }} />
            <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
                style={{ background: "linear-gradient(to left, hsl(var(--background)), transparent)" }} />

            {/* Section label */}
            <motion.div
                className="flex items-center justify-center gap-3 mb-10"
                initial={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#469D89]/40" />
                <span className="text-[10px] font-mono text-[#469D89]/60 tracking-[0.3em] uppercase">Tech Stack</span>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#469D89]/40" />
            </motion.div>

            {/* Row 1 — scrolls left */}
            <div className="overflow-hidden mb-3">
                <div className="marquee-track">
                    {[...row1, ...row1].map((tech, i) => (
                        <Chip key={i} name={tech.name} color={tech.color} />
                    ))}
                </div>
            </div>

            {/* Row 2 — scrolls right */}
            <div className="overflow-hidden mb-3">
                <div className="marquee-track-reverse">
                    {[...row2, ...row2].map((tech, i) => (
                        <Chip key={i} name={tech.name} color={tech.color} />
                    ))}
                </div>
            </div>

            {/* Row 3 — scrolls left, exploring label */}
            <div className="overflow-hidden mb-6">
                <div className="marquee-track">
                    {[...row3, ...row3].map((tech, i) => (
                        <Chip key={i} name={tech.name} color={tech.color} />
                    ))}
                </div>
            </div>

            <motion.div
                className="flex items-center justify-center gap-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <span className="w-1.5 h-1.5 rounded-full bg-[#469D89]/40" />
                <span className="text-[9px] font-mono text-[#469D89]/40 tracking-[0.3em] uppercase">
                    Currently exploring: Unity · C#
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#469D89]/40" />
            </motion.div>
        </section>
    );
};

export default TechStack;
