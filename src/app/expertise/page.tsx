"use client"
import React from "react";
import { motion } from "framer-motion";
import ExpertiseCard from "@/components/expertise/ExpertiseCard";

const expertiseData = [
    { title: "Frontend",          skills: ["React.js", "Next.js", "Angular", "Redux Toolkit", "next-intl"] },
    { title: "Backend",           skills: ["Node.js", "Express", "AWS AppSync", "AWS Amplify", "GraphQL", "Microservices"] },
    { title: "Mobile",            skills: ["Kotlin", "Jetpack Compose", "Swift", "SwiftUI", "Flutter", "React Native"] },
    { title: "AI Integration",    skills: ["Claude AI (Haiku)", "Anthropic API", "Prompt Engineering", "AI Image Generation", "AI Video Generation", "LLM Workflows"] },
    { title: "WebRTC & Realtime", skills: ["WebRTC", "LiveKit SFU", "WebSocket", "MediaSoup", "ClickHouse", "Signal Server"] },
    { title: "CSS Frameworks",    skills: ["Material UI", "Ant Design", "Bootstrap", "Tailwind", "Shadcn"] },
    { title: "Databases",         skills: ["DynamoDB", "PostgreSQL", "MongoDB", "MySQL", "Firebase", "Redis"] },
    { title: "Languages",         skills: ["TypeScript", "JavaScript", "Kotlin", "Swift", "C++", "Java"] },
    { title: "Infrastructure",    skills: ["Docker", "Kubernetes", "Helm", "Terraform", "Redis", "DigitalOcean", "CI/CD"] },
    {
        title: "AWS",
        skills: ["Lambda", "Cognito", "OpenSearch", "AppSync", "API Gateway", "GraphQL", "Cloud9", "EC2", "DynamoDB", "Amplify", "S3", "AWS Glue", "AWS MediaConvert", "Route53"],
    },
];

const Expertise: React.FC = () => {
    return (
        <div className="relative container py-12 min-h-screen">
            {/* Ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-[#469D89]/6 rounded-full blur-[100px] pointer-events-none" />

            {/* HUD corners */}
            <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-[#469D89]/30 pointer-events-none" />
            <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-[#469D89]/30 pointer-events-none" />

            {/* Header */}
            <motion.div
                className="text-center mb-14 relative z-10"
                initial={{ opacity: 0, y: -30, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
                <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#469D89]/50" />
                    <span className="text-[10px] font-mono text-[#469D89]/60 tracking-[0.3em] uppercase">Tech Stack</span>
                    <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#469D89]/50" />
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold neon-text-pulse">
                    My <span className="gradient-text">Expertise</span>
                </h1>
                <p className="mt-3 text-sm font-mono text-muted-foreground">
                    <span className="text-[#469D89]/50">{'>'}</span> Technologies I specialize in
                </p>
            </motion.div>

            {/* Cards grid */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {expertiseData.map((category, index) => (
                    <ExpertiseCard
                        key={index}
                        title={category.title}
                        skills={category.skills}
                        index={index}
                    />
                ))}
            </div>
        </div>
    );
};

export default Expertise;
