"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface Stat {
    value: number;
    suffix: string;
    label: string;
    sub: string;
}

const stats: Stat[] = [
    { value: 8,   suffix: "+", label: "Years Experience",    sub: "Since 2017" },
    { value: 14,  suffix: "+", label: "Projects Shipped",    sub: "Across 5+ countries" },
    { value: 20,  suffix: "+", label: "Clients Served",      sub: "Startups to enterprises" },
    { value: 100, suffix: "K+",label: "Users Impacted",      sub: "Across all platforms" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    useEffect(() => {
        if (!inView) return;
        const duration = 1800;
        const start = performance.now();
        const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * value));
            if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }, [inView, value]);

    return (
        <span ref={ref} className="tabular-nums">
            {count}{suffix}
        </span>
    );
}

const StatsSection: React.FC = () => {
    return (
        <section className="relative container py-16">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#469D89]/3 via-[#469D89]/6 to-[#469D89]/3 rounded-3xl pointer-events-none" />

            <motion.div
                className="relative grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#469D89]/10 rounded-2xl overflow-hidden border border-[#469D89]/15"
                initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        className="relative bg-background/90 backdrop-blur-sm px-6 py-8 flex flex-col items-center text-center group"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        whileHover={{ backgroundColor: "rgba(70,157,137,0.04)" }}
                    >
                        {/* Hover glow */}
                        <div className="absolute inset-0 bg-gradient-to-b from-[#469D89]/0 to-[#469D89]/4 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-10 text-4xl lg:text-5xl font-bold gradient-text-static mb-2 tracking-tight">
                            <Counter value={stat.value} suffix={stat.suffix} />
                        </div>
                        <div className="relative z-10 text-sm font-mono font-semibold text-foreground/80 mb-1">
                            {stat.label}
                        </div>
                        <div className="relative z-10 text-[10px] font-mono text-[#469D89]/50 tracking-widest uppercase">
                            {stat.sub}
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default StatsSection;
