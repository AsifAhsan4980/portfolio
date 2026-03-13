"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaBookmark } from "react-icons/fa";

interface BlogCardProps {
    gradient: string;
    date: string;
    category: string;
    title: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
    gradient,
    date,
    category,
    title,
}) => {
    return (
        <motion.article
            className={`
                relative flex flex-col flex-1 p-6 rounded-2xl overflow-hidden
                min-h-[220px] cursor-pointer
                max-md:min-w-[calc(50%_-_20px)] max-sm:w-full
            `}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.3 }}
        >
            {/* Gradient background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />

            {/* Glass overlay on hover */}
            <motion.div
                className="absolute inset-0 backdrop-blur-0 bg-black/0"
                whileHover={{ backdropFilter: "blur(4px)", backgroundColor: "rgba(0, 0, 0, 0.1)" }}
                transition={{ duration: 0.3 }}
            />

            {/* Corner glow effect */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-2xl" />

            {/* Bookmark icon */}
            <motion.button
                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full text-white"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                aria-label="Bookmark article"
            >
                <FaBookmark className="w-4 h-4" />
            </motion.button>

            {/* Category & Date */}
            <div className="relative z-10 flex items-center gap-2 mb-4">
                <span className="px-3 py-1 text-xs font-semibold bg-white/20 backdrop-blur-sm rounded-full text-white">
                    {category}
                </span>
                <span className="text-sm text-white/80">{date}</span>
            </div>

            {/* Title */}
            <h3 className="relative z-10 text-xl font-bold tracking-wide leading-tight text-white max-sm:text-lg flex-1">
                {title}
            </h3>

            {/* Arrow indicator */}
            <motion.div
                className="relative z-10 flex items-center gap-2 mt-4 text-white/70 text-sm"
                whileHover={{ x: 5, color: "rgba(255, 255, 255, 1)" }}
            >
                Read more
                <motion.div
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                >
                    <FaArrowRight className="w-3 h-3" />
                </motion.div>
            </motion.div>
        </motion.article>
    );
};

export default BlogCard;
