"use client";
import * as React from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

interface PartnerBoxProps {
    logoSrc: string;
    altText?: string;
    isWhiteLogo?: boolean;
}

const PartnerBox: React.FC<PartnerBoxProps> = ({ logoSrc, altText = "Partner logo", isWhiteLogo = false }) => {
    const { theme } = useTheme();

    // Background logic: Special treatment for white logos
    const bgColor = isWhiteLogo
        ? theme === "dark"
            ? "bg-[#469d89]"  // Green in dark mode for white logos
            : "bg-[#469d89]"  // Dark in light mode
        : theme === "dark"
            ? "bg-[#EAEAEA]"  // Light gray for other logos in dark mode
            : "bg-[#F4F1EB]";  // Default light mode background

    return (
        <motion.article
            className={`flex items-center justify-center p-2 rounded-xl transition-transform duration-300 ease-in-out
                        h-[60px] w-[200px] max-md:w-[160px] max-md:h-[50px] max-sm:h-[45px] max-sm:w-[140px] 
                        ${bgColor} border border-[#469d89] dark:border-gray-700 shadow-lg`}
            role="img"
            aria-label={altText}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05, boxShadow: "0px 4px 10px rgba(0,0,0,0.2)" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            <img
                src={logoSrc}
                alt={altText}
                className="max-w-full max-h-full object-contain"
            />
        </motion.article>
    );
};

function Partners() {
    return (
        <motion.section
            className="flex flex-col px-5 py-10 mx-auto w-full max-w-[1140px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
        >
            <motion.h2
                className="text-3xl font-semibold text-center text-[#183b56] dark:text-white mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                My Trusted Clients
            </motion.h2>

            <motion.div
                className="grid grid-cols-3 gap-6 place-items-center max-md:grid-cols-2 max-lg:grid-cols-3 max-sm:grid-cols-1"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } }
                }}
            >
                <PartnerBox logoSrc="https://www.tickettomorrow.com/_next/static/media/Logo.585c4ecc.svg" />
                <PartnerBox logoSrc="/assets/svg/tribel.png" />
                <PartnerBox logoSrc="https://www.wozaif.com/_next/static/media/navbarLogo.7695c96c.svg" />
                <PartnerBox logoSrc="/assets/svg/doodle.png" isWhiteLogo /> {/* Doodle gets special background */}
                <PartnerBox logoSrc="https://www.pipobazar.com/logo.png" />
            </motion.div>
        </motion.section>
    );
}

export default Partners;
