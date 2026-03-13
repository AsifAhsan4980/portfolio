"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaCode, FaCloud, FaMobile } from "react-icons/fa";
import { SiGraphql } from "react-icons/si";

const services = [
    {
        icon: <FaCode className="w-6 h-6" />,
        title: "Full-Stack Web Development",
        description: "End-to-end web applications using React, Next.js, Angular, and Node.js — from pixel-perfect UIs to robust server-side logic.",
        tags: ["React", "Next.js", "Angular", "Node.js", "TypeScript"],
        featured: true,
    },
    {
        icon: <FaCloud className="w-6 h-6" />,
        title: "AWS Cloud Architecture",
        description: "Serverless, scalable, and cost-efficient cloud solutions built on Lambda, AppSync, DynamoDB, S3, Cognito, and more.",
        tags: ["Lambda", "DynamoDB", "S3", "Cognito", "AppSync"],
        featured: false,
    },
    {
        icon: <SiGraphql className="w-6 h-6" />,
        title: "API & Backend Engineering",
        description: "Designed and built GraphQL and REST APIs with real-time capabilities, robust authentication, and clean architecture.",
        tags: ["GraphQL", "REST", "Express", "PostgreSQL", "MongoDB"],
        featured: false,
    },
    {
        icon: <FaMobile className="w-6 h-6" />,
        title: "Cross-Platform Mobile Apps",
        description: "React Native mobile applications that deliver a native experience on both iOS and Android from a single codebase.",
        tags: ["React Native", "Expo", "TypeScript", "Firebase"],
        featured: false,
    },
];

const ServiceCard = ({
    service,
    index,
}: {
    service: typeof services[0];
    index: number;
}) => (
    <motion.div
        className={`relative border border-[#469D89]/20 rounded-2xl overflow-hidden bg-background/50 backdrop-blur-sm group ${
            service.featured ? "lg:row-span-2" : ""
        }`}
        initial={{ opacity: 0, y: 40, filter: "blur(8px)", scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.65, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
        whileHover={{ scale: 1.02, borderColor: "rgba(70,157,137,0.55)", y: -5 }}
    >
        {/* Holographic shimmer */}
        <div className="absolute inset-0 holographic-card opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Corner decorations */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[#469D89]/30 pointer-events-none" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[#469D89]/30 pointer-events-none" />

        {/* Ambient glow for featured */}
        {service.featured && (
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#469D89]/8 rounded-full blur-3xl pointer-events-none" />
        )}

        <div className="relative z-10 p-7 flex flex-col h-full">
            {/* Icon */}
            <motion.div
                className="w-12 h-12 flex items-center justify-center border border-[#469D89]/30 rounded-xl text-[#469D89] bg-[#469D89]/8 mb-5 group-hover:shadow-[0_0_16px_rgba(70,157,137,0.3)] transition-all duration-300"
                whileHover={{ scale: 1.08, rotate: 3 }}
            >
                {service.icon}
            </motion.div>

            {/* Title */}
            <h3 className={`font-bold gradient-text-static mb-3 ${service.featured ? "text-2xl" : "text-xl"}`}>
                {service.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-6 mb-5 flex-1">
                {service.description}
            </p>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-2 mt-auto">
                {service.tags.map((tag, i) => (
                    <span
                        key={i}
                        className="px-2.5 py-1 text-[10px] font-mono text-[#469D89] border border-[#469D89]/20 rounded-full bg-[#469D89]/5"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    </motion.div>
);

const ServicesSection: React.FC = () => {
    return (
        <section className="relative container py-16">
            {/* Ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-[#469D89]/5 rounded-full blur-[100px] pointer-events-none" />

            {/* Section header */}
            <motion.div
                className="text-center mb-12 relative z-10"
                initial={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
                <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#469D89]/50" />
                    <span className="text-[10px] font-mono text-[#469D89]/60 tracking-[0.3em] uppercase">What I Do</span>
                    <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#469D89]/50" />
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold">
                    My <span className="gradient-text">Services</span>
                </h2>
                <p className="mt-3 text-sm font-mono text-muted-foreground">
                    <span className="text-[#469D89]/50">{'>'}</span> End-to-end engineering — from idea to production
                </p>
            </motion.div>

            {/* Services grid */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-auto">
                {services.map((service, index) => (
                    <ServiceCard key={index} service={service} index={index} />
                ))}
            </div>
        </section>
    );
};

export default ServicesSection;
