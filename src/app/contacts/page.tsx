"use client";
import { motion } from "framer-motion";
import { FaEnvelope, FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhone, FaWhatsapp } from "react-icons/fa";
import React from "react";

interface ContactInfo {
    email: string;
    phone: { number: string; isWhatsApp: boolean }[];
    address: string;
    socialLinks: { platform: string; url: string; icon: React.JSX.Element }[];
}

const contactInfo: ContactInfo = {
    email: "asifahsan727@gmail.com",
    phone: [
        { number: "+8801795870994", isWhatsApp: false },
        { number: "+8801685436578", isWhatsApp: true },
    ],
    address: "35/c Shah Alibag, Mirpur 1, Dhaka, Bangladesh",
    socialLinks: [
        { platform: "Facebook",  url: "https://www.facebook.com/asif.ahsan727/",           icon: <FaFacebook size={24} /> },
        { platform: "Instagram", url: "https://www.instagram.com/aragorn_isildurr/",        icon: <FaInstagram size={24} /> },
        { platform: "LinkedIn",  url: "https://www.linkedin.com/in/asif-ahsan-27832012b/", icon: <FaLinkedin size={24} /> },
        { platform: "GitHub",    url: "https://github.com/AsifAhsan4980",                   icon: <FaGithub size={24} /> },
    ],
};

const ContactPage: React.FC = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
    };

    return (
        <main className="relative min-h-screen px-4 py-12 flex flex-col items-center overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#469D89]/6 rounded-full blur-[100px] pointer-events-none" />

            {/* HUD corner brackets */}
            <div className="absolute top-6 left-6 w-6 h-6 border-t-2 border-l-2 border-[#469D89]/30 pointer-events-none" />
            <div className="absolute top-6 right-6 w-6 h-6 border-t-2 border-r-2 border-[#469D89]/30 pointer-events-none" />

            {/* Page Header */}
            <motion.div
                className="text-center mb-14 relative z-10"
                initial={{ opacity: 0, y: -30, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
                <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#469D89]/50" />
                    <span className="text-[10px] font-mono text-[#469D89]/60 tracking-[0.3em] uppercase">Get in touch</span>
                    <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#469D89]/50" />
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold neon-text-pulse">
                    Contact <span className="gradient-text">Me</span>
                </h1>
                <p className="mt-3 text-muted-foreground font-mono text-sm">
                    <span className="text-[#469D89]/50">{'>'}</span> Let&apos;s get connected!
                </p>
            </motion.div>

            {/* Social Links */}
            <motion.div
                className="grid gap-4 grid-cols-2 lg:grid-cols-4 w-full max-w-3xl mb-14 relative z-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {contactInfo.socialLinks.map((link, index) => (
                    <motion.a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${link.platform} profile`}
                        className="flex flex-col items-center justify-center gap-3 p-6 border border-[#469D89]/20 rounded-xl bg-background/50 backdrop-blur-sm transition-all duration-300 hover:border-[#469D89]/60 hover:shadow-[0_0_22px_rgba(70,157,137,0.18)] hover:bg-[#469D89]/5 group"
                        variants={itemVariants}
                        whileHover={{ scale: 1.04, y: -3 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <span className="text-[#469D89] group-hover:scale-110 transition-transform duration-200">
                            {link.icon}
                        </span>
                        <span className="text-xs font-mono text-muted-foreground group-hover:text-[#469D89] transition-colors tracking-widest uppercase">
                            {link.platform}
                        </span>
                    </motion.a>
                ))}
            </motion.div>

            {/* Contact Info Cards */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-3xl mb-14 relative z-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Email */}
                <motion.div
                    className="flex flex-col items-center gap-3 p-6 border border-[#469D89]/20 rounded-xl bg-background/50 backdrop-blur-sm"
                    variants={itemVariants}
                >
                    <div className="w-10 h-10 flex items-center justify-center border border-[#469D89]/40 rounded-full text-[#469D89]">
                        <FaEnvelope size={16} />
                    </div>
                    <div className="text-center">
                        <p className="text-[10px] font-mono text-[#469D89]/50 tracking-[0.2em] uppercase mb-1">Email</p>
                        <p className="text-sm font-mono text-foreground break-all">{contactInfo.email}</p>
                    </div>
                </motion.div>

                {/* Phone */}
                <motion.div
                    className="flex flex-col items-center gap-3 p-6 border border-[#469D89]/20 rounded-xl bg-background/50 backdrop-blur-sm"
                    variants={itemVariants}
                >
                    <div className="w-10 h-10 flex items-center justify-center border border-[#469D89]/40 rounded-full text-[#469D89]">
                        <FaPhone size={16} />
                    </div>
                    <div className="text-center">
                        <p className="text-[10px] font-mono text-[#469D89]/50 tracking-[0.2em] uppercase mb-1">Phone</p>
                        {contactInfo.phone.map((phone, i) => (
                            <div key={i} className="flex items-center gap-1.5 justify-center">
                                {phone.isWhatsApp && <FaWhatsapp size={12} className="text-green-500" />}
                                {phone.isWhatsApp ? (
                                    <a href={`https://wa.me/${phone.number.replace("+", "")}`} target="_blank" rel="noopener noreferrer"
                                        className="text-xs font-mono text-[#469D89] hover:underline">
                                        {phone.number}
                                    </a>
                                ) : (
                                    <p className="text-xs font-mono text-foreground">{phone.number}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Address */}
                <motion.div
                    className="flex flex-col items-center gap-3 p-6 border border-[#469D89]/20 rounded-xl bg-background/50 backdrop-blur-sm"
                    variants={itemVariants}
                >
                    <div className="w-10 h-10 flex items-center justify-center border border-[#469D89]/40 rounded-full text-[#469D89]">
                        <FaMapMarkerAlt size={16} />
                    </div>
                    <div className="text-center">
                        <p className="text-[10px] font-mono text-[#469D89]/50 tracking-[0.2em] uppercase mb-1">Location</p>
                        <p className="text-xs font-mono text-foreground">{contactInfo.address}</p>
                    </div>
                </motion.div>
            </motion.div>

            {/* Map with neon frame */}
            <motion.div
                className="w-full max-w-3xl relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
            >
                <div className="relative border border-[#469D89]/30 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(70,157,137,0.08)]">
                    <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#469D89]/50 z-10 pointer-events-none" />
                    <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#469D89]/50 z-10 pointer-events-none" />
                    <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[#469D89]/50 z-10 pointer-events-none" />
                    <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#469D89]/50 z-10 pointer-events-none" />
                    <iframe
                        width="600"
                        height="400"
                        loading="lazy"
                        className="w-full h-72 lg:h-96"
                        title="Location map"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCPpxjgXy_Z3lYdkwYsEXccmBRSARHVWvw&q=Kayenath,Dhaka+Bangladesh"
                    />
                </div>
            </motion.div>
        </main>
    );
};

export default ContactPage;
