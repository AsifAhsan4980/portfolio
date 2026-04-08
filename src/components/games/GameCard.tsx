"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface GameCardProps {
    title: string;
    description: string;
    icon: string;
    href: string;
    delay?: number;
}

export default function GameCard({ title, description, icon, href, delay = 0 }: GameCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            <Link href={href}>
                <div className="relative border border-[#469D89]/20 rounded-2xl p-8 bg-background/50 backdrop-blur-sm group cursor-pointer transition-all duration-300 hover:border-[#469D89]/55 hover:shadow-[0_8px_40px_rgba(70,157,137,0.12)]">
                    <div className="text-5xl mb-5">{icon}</div>
                    <h3 className="text-xl font-bold gradient-text-static mb-2">{title}</h3>
                    <p className="text-sm text-muted-foreground leading-6">{description}</p>
                    <div className="mt-4 flex items-center gap-2 text-[11px] font-mono text-[#469D89] tracking-widest uppercase">
                        <span>Play Now</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
