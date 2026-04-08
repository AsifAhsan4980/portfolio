"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import Link from "next/link";

const GlitchName = ({ text }: { text: string }) => (
    <span className="relative inline-block">
        <span className="relative z-10">{text}</span>
        <span className="absolute inset-0 glitch-layer-1 text-[#469D89]" aria-hidden="true">{text}</span>
        <span className="absolute inset-0 glitch-layer-2 text-[#5fb8a3]" aria-hidden="true">{text}</span>
    </span>
);

interface ContactInfo {
    email: string;
    phone: { number: string; isWhatsApp: boolean }[];
    address: string;
    socialLinks: {
        platform: string;
        url: string;
        icon: React.JSX.Element;
    }[];
}

const ProfileHeader = () => {
    const contactInfo: ContactInfo = {
        email: "asifahsan727@gmail.com",
        phone: [
            { number: "+8801795870994", isWhatsApp: false },
            { number: "+8801685436578", isWhatsApp: true },
        ],
        address: "35/c Shah Alibag, Mirpur 1, Dhaka, Bangladesh",
        socialLinks: [
            {
                platform: "Facebook",
                url: "https://www.facebook.com/asif.ahsan727/",
                icon: <FaFacebook size={18} color="#469D89" aria-hidden="true" />,
            },
            {
                platform: "Instagram",
                url: "https://www.instagram.com/aragorn_isildurr/",
                icon: <FaInstagram size={18} color="#469D89" aria-hidden="true" />,
            },
            {
                platform: "LinkedIn",
                url: "https://www.linkedin.com/in/asif-ahsan-27832012b/",
                icon: <FaLinkedin size={18} color="#469D89" aria-hidden="true" />,
            },
            {
                platform: "GitHub",
                url: "https://github.com/AsifAhsan4980",
                icon: <FaGithub size={18} color="#469D89" aria-hidden="true" />,
            },
        ],
    };

    return (
        <section className="w-full flex flex-col items-center gap-5">
            {/* AVAILABLE FOR HIRE badge */}
            <motion.div
                className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#469D89]/40 bg-[#469D89]/8 text-[10px] text-[#469D89] font-mono tracking-[0.2em] uppercase"
                initial={{ opacity: 0, y: -15, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
            >
                <motion.span
                    className="w-1.5 h-1.5 rounded-full bg-[#469D89]"
                    animate={{ opacity: [1, 0.25, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
                Available for Hire
            </motion.div>

            {/* Glitch name */}
            <motion.h1
                className="text-7xl xl:text-8xl font-bold tracking-wide leading-tight text-center neon-text-pulse"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.7, ease: "easeOut" }}
            >
                <GlitchName text="Asif" />
                <br />
                <GlitchName text="Ahsan" />
            </motion.h1>

            {/* Social links */}
            <motion.div
                className="flex gap-4 mt-6 justify-center"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
            >
                {contactInfo.socialLinks.map((link, i) => (
                    <motion.div
                        key={link.url}
                        whileHover={{ scale: 1.18, y: -3 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.0 + i * 0.1 }}
                    >
                        <Link
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Visit ${link.platform} profile`}
                            className="focus:outline-none focus:ring-2 focus:ring-[#469D89] focus:ring-offset-2 rounded-full"
                        >
                            <div className="w-11 h-11 flex items-center justify-center border border-[#469D89]/40 rounded-full transition-all duration-300 hover:border-[#469D89] hover:bg-[#469D89]/10 hover:shadow-[0_0_18px_rgba(70,157,137,0.45)]">
                                {link.icon}
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default ProfileHeader;
