"use client";
import { motion } from "framer-motion";
import React from "react";

interface ExpertiseCardProps {
    title: string;
    skills: string[];
    index?: number;
}

const ExpertiseCard: React.FC<ExpertiseCardProps> = ({ title, skills, index = 0 }) => {
    return (
        <motion.div
            className="relative border border-[#469D89]/20 rounded-2xl overflow-hidden bg-background/50 backdrop-blur-sm group"
            initial={{ opacity: 0, y: 36, scale: 0.95, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
            whileHover={{ scale: 1.025, y: -4, borderColor: "rgba(70,157,137,0.45)" }}
        >
            {/* Holographic shimmer on hover */}
            <div className="absolute inset-0 holographic-card opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Corner decorations */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#469D89]/30 pointer-events-none" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#469D89]/30 pointer-events-none" />

            {/* Card header */}
            <div className="px-6 pt-6 pb-4 border-b border-[#469D89]/10 relative z-10">
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-1 h-4 bg-gradient-to-b from-[#469D89] to-[#2d6b5f] rounded-full" />
                    <h2 className="text-lg font-bold gradient-text-static tracking-wide">{title}</h2>
                </div>
                <p className="text-[10px] font-mono text-[#469D89]/40 tracking-widest uppercase">
                    {skills.length} technologies
                </p>
            </div>

            {/* Skill tags */}
            <div className="px-6 py-5 flex flex-wrap gap-2 relative z-10">
                {skills.map((skill, i) => (
                    <motion.span
                        key={i}
                        className="px-3 py-1 text-xs font-mono text-[#469D89] border border-[#469D89]/25 rounded-full bg-[#469D89]/5 hover:bg-[#469D89]/15 hover:border-[#469D89]/50 hover:shadow-[0_0_10px_rgba(70,157,137,0.2)] transition-all duration-200 cursor-default"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.04 + i * 0.04, duration: 0.3 }}
                        whileHover={{ scale: 1.08 }}
                    >
                        {skill}
                    </motion.span>
                ))}
            </div>
        </motion.div>
    );
};

export default ExpertiseCard;
