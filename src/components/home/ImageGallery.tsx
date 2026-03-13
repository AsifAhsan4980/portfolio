"use client";
import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaClock, FaUsers, FaProjectDiagram, FaRocket, FaStar } from 'react-icons/fa';

interface StatItem {
    number: number;
    suffix: string;
    text: string;
    icon: React.ReactNode;
    size: 'normal' | 'large' | 'wide' | 'tall';
}

const stats: StatItem[] = [
    { number: 5,  suffix: '+', text: 'Years of Experience',  icon: <FaClock className="w-7 h-7" />,          size: 'large'  },
    { number: 20, suffix: '+', text: 'Satisfied Customers',  icon: <FaUsers className="w-5 h-5" />,          size: 'normal' },
    { number: 10, suffix: '+', text: 'Delivered Projects',   icon: <FaProjectDiagram className="w-5 h-5" />, size: 'normal' },
    { number: 12, suffix: '+', text: 'Projects are Live',    icon: <FaRocket className="w-5 h-5" />,         size: 'wide'   },
    { number: 15, suffix: '+', text: 'Success on Fiverr',    icon: <FaStar className="w-5 h-5" />,           size: 'normal' },
];

const sizeClasses: Record<string, string> = {
    normal: '',
    large:  'col-span-2 row-span-2',
    wide:   'col-span-2',
    tall:   'row-span-2',
};

function useCountUp(target: number, duration: number = 1200, active: boolean = false) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!active) return;
        let current = 0;
        const steps = 50;
        const increment = target / steps;
        const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
                setCount(target);
                clearInterval(interval);
            } else {
                setCount(Math.floor(current));
            }
        }, duration / steps);
        return () => clearInterval(interval);
    }, [active, target, duration]);
    return count;
}

const StatCard = ({ stat, index }: { stat: StatItem; index: number }) => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-40px" });
    const count = useCountUp(stat.number, 1000, inView);

    return (
        <motion.div
            ref={ref}
            className={`
                relative p-5 lg:p-6 flex flex-col justify-center items-center text-center
                border border-[#469D89]/20 rounded-2xl overflow-hidden
                bg-background/50 backdrop-blur-sm cursor-default
                transition-all duration-400
                hover:border-[#469D89]/50 hover:shadow-[0_0_25px_rgba(70,157,137,0.14)]
                ${sizeClasses[stat.size]}
            `}
            initial={{ opacity: 0, y: 30, scale: 0.92, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            whileHover={{ scale: 1.03, y: -4 }}
        >
            {/* Holographic shimmer on hover */}
            <div className="absolute inset-0 holographic-card opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Large card corner decorations */}
            {stat.size === 'large' && (
                <>
                    <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[#469D89]/35" />
                    <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[#469D89]/35" />
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[#469D89]/35" />
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[#469D89]/35" />
                    <div className="absolute top-0 right-0 w-28 h-28 bg-[#469D89]/8 rounded-full blur-2xl pointer-events-none" />
                </>
            )}

            {/* Icon */}
            <motion.div
                className="text-[#469D89] mb-3 relative z-10"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.08 + 0.2, type: "spring", stiffness: 200 }}
            >
                {stat.icon}
            </motion.div>

            {/* Animated number */}
            <div
                className={`font-bold relative z-10 ${
                    stat.size === 'large'
                        ? 'text-5xl md:text-6xl lg:text-7xl'
                        : 'text-3xl md:text-4xl'
                }`}
            >
                <span className="gradient-text-static">{count}</span>
                <span className="text-[#469D89]">{stat.suffix}</span>
            </div>

            {/* Label */}
            <p
                className={`mt-2 text-muted-foreground relative z-10 font-mono ${
                    stat.size === 'large' ? 'text-xs md:text-sm' : 'text-[10px] md:text-xs'
                }`}
            >
                {stat.text}
            </p>
        </motion.div>
    );
};

const ImageGallery: React.FC = () => {
    return (
        <div className="mt-10 w-full">
            <div
                className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-2xl lg:max-w-4xl mx-auto"
                style={{ gridAutoRows: 'minmax(110px, auto)' }}
            >
                {stats.map((stat, index) => (
                    <StatCard key={index} stat={stat} index={index} />
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;
