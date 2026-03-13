"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

interface ProjectCardProps {
    title: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ title }) => {
    return (
        <motion.article
            className="group relative overflow-hidden rounded-2xl aspect-[1.2] cursor-pointer h-full"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
        >
            {/* Background - placeholder gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#469D89]/80 via-[#2d6b5f]/70 to-[#1a4a42]/80" />

            {/* Mesh pattern overlay */}
            <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />

            {/* Glass overlay on hover */}
            <motion.div
                className="absolute inset-0 bg-black/0 backdrop-blur-0"
                initial={false}
                whileHover={{
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                    backdropFilter: "blur(4px)",
                }}
                transition={{ duration: 0.3 }}
            />

            {/* Title card at bottom */}
            <motion.div
                className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/60 via-black/30 to-transparent"
                initial={{ y: 10, opacity: 0.9 }}
                whileHover={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <div className="glass-card p-4 backdrop-blur-md">
                    <h3 className="text-base font-semibold text-white leading-tight">
                        {title}
                    </h3>
                    <motion.div
                        className="flex items-center gap-2 mt-2 text-white/70 text-sm"
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                    >
                        View project <FaArrowRight className="w-3 h-3" />
                    </motion.div>
                </div>
            </motion.div>

            {/* Hover glow effect */}
            <motion.div
                className="absolute -inset-10 opacity-0 bg-[#469D89]/30 blur-3xl"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
            />
        </motion.article>
    );
};

export default ProjectCard;
