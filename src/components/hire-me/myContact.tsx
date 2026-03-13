"use client";
import { FC } from "react";
import { FaPhone, FaEnvelope, FaUser, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const contactItems = [
    { icon: <FaUser size={14} />,         label: "Name",     value: "Asif Ahsan",               href: undefined },
    { icon: <FaPhone size={14} />,        label: "Phone",    value: "+8801795870994",            href: "tel:+8801795870994" },
    { icon: <FaEnvelope size={14} />,     label: "Email",    value: "asifahsan727@gmail.com",    href: "mailto:asifahsan727@gmail.com" },
    { icon: <FaMapMarkerAlt size={14} />, label: "Location", value: "Dhaka, Bangladesh",         href: undefined },
];

const MyContact: FC = () => {
    return (
        <motion.div
            className="relative border border-[#469D89]/20 rounded-2xl overflow-hidden bg-background/50 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
        >
            {/* Corner decorations */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[#469D89]/30 pointer-events-none" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[#469D89]/30 pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[#469D89]/30 pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[#469D89]/30 pointer-events-none" />

            {/* Ambient glow */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#469D89]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="p-6">
                <div className="flex items-center gap-2 mb-7">
                    <div className="w-1 h-5 bg-gradient-to-b from-[#469D89] to-[#2d6b5f] rounded-full" />
                    <h2 className="text-xl font-bold gradient-text-static">Contact Information</h2>
                </div>

                <div className="space-y-4">
                    {contactItems.map((item, i) => (
                        <motion.div
                            key={i}
                            className="flex items-center gap-4 p-4 border border-[#469D89]/15 rounded-xl bg-background/30 hover:border-[#469D89]/40 hover:bg-[#469D89]/5 transition-all duration-200 group"
                            initial={{ opacity: 0, x: -15 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + i * 0.1 }}
                        >
                            <div className="w-9 h-9 flex items-center justify-center border border-[#469D89]/30 rounded-full text-[#469D89] bg-[#469D89]/8 shrink-0 group-hover:shadow-[0_0_12px_rgba(70,157,137,0.25)] transition-all">
                                {item.icon}
                            </div>
                            <div>
                                <p className="text-[10px] font-mono text-[#469D89]/50 tracking-[0.2em] uppercase mb-0.5">
                                    {item.label}
                                </p>
                                {item.href ? (
                                    <a href={item.href} className="text-sm font-mono text-foreground hover:text-[#469D89] transition-colors">
                                        {item.value}
                                    </a>
                                ) : (
                                    <p className="text-sm font-mono text-foreground">{item.value}</p>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Status indicator */}
                <motion.div
                    className="mt-6 flex items-center gap-2 p-3 border border-[#469D89]/15 rounded-xl bg-[#469D89]/5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                >
                    <motion.span
                        className="w-2 h-2 rounded-full bg-[#469D89]"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <p className="text-xs font-mono text-[#469D89]/70 tracking-widest">
                        Currently available for new projects
                    </p>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default MyContact;
