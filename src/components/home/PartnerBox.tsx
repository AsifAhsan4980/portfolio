"use client";
import * as React from "react";
import { motion } from "framer-motion";

// "dark"  = dark/black logo — visible in light mode, inverted to white in dark mode
// "light" = white/light logo — darkened in light mode, visible as-is in dark mode
// "color" = full-color logo — shown as-is in both modes
type LogoTheme = "dark" | "light" | "color";

interface PartnerBoxProps {
    logoSrc: string;
    altText?: string;
    logoTheme?: LogoTheme;
}

const logoThemeClass: Record<LogoTheme, string> = {
    dark:  "dark:brightness-0 dark:invert dark:opacity-90",
    light: "brightness-0 opacity-80 dark:brightness-100 dark:invert-0 dark:opacity-100",
    color: "opacity-90 dark:opacity-80",
};

const PartnerBox: React.FC<PartnerBoxProps> = ({ logoSrc, altText = "Partner logo", logoTheme = "dark" }) => {
    return (
        <motion.article
            className="relative flex items-center justify-center p-3 rounded-xl h-[60px] w-[200px] max-md:w-[260px] max-md:h-[60px] overflow-hidden border border-[#469D89]/20 bg-background/60 backdrop-blur-sm group"
            role="img"
            aria-label={altText}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{
                scale: 1.05,
                borderColor: "rgba(70,157,137,0.55)",
                boxShadow: "0 0 22px rgba(70,157,137,0.22)",
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
        >
            {/* Holographic shimmer on hover */}
            <div className="absolute inset-0 holographic-card opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <img
                src={logoSrc}
                alt={altText}
                className={`max-w-full max-h-full object-contain relative z-10 transition-all duration-300 ${logoThemeClass[logoTheme]}`}
            />
        </motion.article>
    );
};

function Partners() {
    return (
        <motion.section
            className="flex flex-col px-5 py-12 mx-auto w-full max-w-[1140px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
        >
            {/* Section label */}
            <motion.div
                className="flex items-center justify-center gap-4 mb-10"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#469D89]/35" />
                <span className="text-[10px] font-mono text-[#469D89]/55 tracking-[0.3em] uppercase whitespace-nowrap">
                    Trusted Clients
                </span>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#469D89]/35" />
            </motion.div>

            <motion.div
                className="grid grid-cols-1 xl:grid-cols-5 gap-5 place-items-center"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                        opacity: 1,
                        y: 0,
                        transition: { staggerChildren: 0.12 },
                    },
                }}
            >
                <PartnerBox logoSrc="https://www.tickettomorrow.com.bd/_next/static/media/Logo.585c4ecc.svg" altText="Ticket Tomorrow" logoTheme="color" />
                <PartnerBox logoSrc="/assets/svg/tribel.png" altText="Tribel" logoTheme="dark" />
                <PartnerBox logoSrc="https://www.wozaif.com/_next/static/media/navbarLogo.7695c96c.svg" altText="Wozaif" logoTheme="dark" />
                <PartnerBox logoSrc="/assets/svg/doodle.png" altText="Doodle" logoTheme="light" />
                <PartnerBox logoSrc="https://www.pipobazar.com/logo.png" altText="Pipobazar" logoTheme="color" />
            </motion.div>
        </motion.section>
    );
}

export default Partners;
