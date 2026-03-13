"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { FaBox, FaPencilAlt, FaCode } from "react-icons/fa";

interface ServiceCardProps {
    icon: string;
    title: string[];
    description: string;
    gradient?: string;
    featured?: boolean;
}

const iconMap: Record<string, React.ReactNode> = {
    box: <FaBox className="w-6 h-6" />,
    pencil: <FaPencilAlt className="w-6 h-6" />,
    code: <FaCode className="w-6 h-6" />,
};

const ServiceCard: React.FC<ServiceCardProps> = ({
    icon,
    title,
    description,
    gradient = "from-[#469D89] to-[#2d6b5f]",
    featured = false,
}) => {
    return (
        <motion.article
            className={`
                relative flex flex-col flex-1 px-8 pt-16 pb-10 text-white rounded-2xl overflow-hidden
                ${featured ? 'min-h-[320px]' : 'min-h-[280px]'}
                max-sm:px-6 max-sm:pt-14 max-sm:pb-8
            `}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.3 }}
        >
            {/* Gradient background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />

            {/* Glass overlay effect on hover */}
            <motion.div
                className="absolute inset-0 bg-white/0 transition-colors duration-300"
                whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
            />

            {/* Corner glow */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />

            {/* Icon container */}
            <motion.div
                className="relative z-10 w-14 h-14 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-xl mb-6"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
            >
                {iconMap[icon] || <FaBox className="w-6 h-6" />}
            </motion.div>

            {/* Title */}
            <h2 className={`relative z-10 mb-4 font-bold tracking-wide leading-tight text-white ${
                featured ? 'text-3xl max-sm:text-2xl' : 'text-2xl max-sm:text-xl'
            }`}>
                {title.map((line, index) => (
                    <React.Fragment key={index}>
                        {line}
                        {index < title.length - 1 && <br />}
                    </React.Fragment>
                ))}
            </h2>

            {/* Description */}
            <p className="relative z-10 text-base leading-7 text-white/80 max-sm:text-sm max-sm:leading-6">
                {description}
            </p>

            {/* Arrow indicator */}
            <motion.div
                className="relative z-10 mt-auto pt-4 flex items-center gap-2 text-white/60 text-sm cursor-pointer"
                whileHover={{ x: 5, color: "rgba(255, 255, 255, 1)" }}
                transition={{ duration: 0.2 }}
            >
                Learn more
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </motion.div>
        </motion.article>
    );
};

export default ServiceCard;
