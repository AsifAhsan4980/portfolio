"use client";
import React, { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring, useScroll } from "framer-motion";
import ProfileHeader from "./ProfileHeader";
import ProfileIntro from "./ProfileIntro";
import Image from "next/image";
import img from "@/assets/images/Untitled-1.png";

const DataPoint = ({ x, y, delay }: { x: string; y: string; delay: number }) => (
    <motion.div
        className="absolute pointer-events-none"
        style={{ left: x, top: y }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2.5, delay, repeat: Infinity, ease: "easeInOut" }}
    >
        <div className="w-1 h-1 bg-[#469D89] rounded-full shadow-[0_0_6px_#469D89]" />
    </motion.div>
);

const PortfolioHeader = () => {
    const headerRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Scroll-linked parallax: image drifts up, text drifts at different rate
    const { scrollYProgress } = useScroll({
        target: headerRef,
        offset: ["start start", "end start"],
    });
    const imageParallaxY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -60]), {
        stiffness: 80, damping: 30,
    });
    const textParallaxY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -30]), {
        stiffness: 80, damping: 30,
    });
    const headerOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    const rotateX = useSpring(useTransform(mouseY, [-300, 300], [12, -12]), {
        stiffness: 200,
        damping: 25,
    });
    const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-12, 12]), {
        stiffness: 200,
        damping: 25,
    });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!imageRef.current) return;
        const rect = imageRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left - rect.width / 2);
        mouseY.set(e.clientY - rect.top - rect.height / 2);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    const dataPoints = [
        { x: "8%",  y: "15%" }, { x: "92%", y: "8%"  }, { x: "15%", y: "75%" },
        { x: "85%", y: "65%" }, { x: "45%", y: "5%"  }, { x: "62%", y: "90%" },
        { x: "30%", y: "48%" }, { x: "78%", y: "32%" }, { x: "5%",  y: "52%" },
        { x: "95%", y: "78%" }, { x: "52%", y: "58%" }, { x: "22%", y: "22%" },
        { x: "70%", y: "18%" }, { x: "38%", y: "88%" }, { x: "88%", y: "45%" },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
    };

    return (
        <header ref={headerRef} className="relative flex flex-col w-full overflow-hidden">
            {/* Cyber grid background */}
            <div className="absolute inset-0 bg-cyber-grid" />

            {/* Animated horizontal scan line */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#469D89]/25 to-transparent"
                    animate={{ y: ["0vh", "100vh"] }}
                    transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
                />
            </div>

            {/* Scanlines texture */}
            <div className="absolute inset-0 scanlines pointer-events-none" />

            {/* Ambient glow orbs */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#469D89]/6 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-[#2d6b5f]/6 rounded-full blur-[100px] pointer-events-none" />

            {/* Data point particles */}
            {dataPoints.map((p, i) => (
                <DataPoint key={i} x={p.x} y={p.y} delay={i * 0.3} />
            ))}

            {/* HUD corner brackets */}
            <div className="absolute top-[52px] left-4 w-6 h-6 border-t-2 border-l-2 border-[#469D89]/40 pointer-events-none" />
            <div className="absolute top-[52px] right-4 w-6 h-6 border-t-2 border-r-2 border-[#469D89]/40 pointer-events-none" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#469D89]/40 pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#469D89]/40 pointer-events-none" />

            {/* HUD status bar */}
            <motion.div
                className="relative z-10 flex justify-between items-center px-6 lg:px-10 py-2.5 border-b border-[#469D89]/15 text-[10px] font-mono text-[#469D89]/50 tracking-widest"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
            >
                <span>SYS://PORTFOLIO.EXE</span>
                <span className="flex items-center gap-2">
                    <motion.span
                        className="w-1.5 h-1.5 rounded-full bg-[#469D89]"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    ONLINE
                </span>
                <span>v2.0.26</span>
            </motion.div>

            {/* Main content */}
            <motion.div
                className="relative z-10 flex flex-col items-center px-4 lg:px-20 w-full py-8 lg:py-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="flex flex-col w-full max-w-[1487px]">
                    <main className="flex flex-col lg:flex-row gap-8 w-full items-center">

                        {/* ProfileHeader */}
                        <motion.div className="w-full lg:w-1/3 mx-auto" variants={itemVariants} style={{ y: textParallaxY, opacity: headerOpacity }}>
                            <ProfileHeader />
                        </motion.div>

                        {/* 3D Tilt Image */}
                        <motion.section
                            className="w-full lg:w-1/3 flex justify-center"
                            variants={itemVariants}
                            style={{ y: imageParallaxY }}
                        >
                            <div
                                ref={imageRef}
                                className="perspective-1000"
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                            >
                                <motion.div
                                    className="w-full h-auto aspect-[0.67] max-w-[380px] relative"
                                    style={{
                                        rotateX,
                                        rotateY,
                                        transformStyle: "preserve-3d",
                                    }}
                                >
                                    {/* Outer orbital ring */}
                                    <motion.div
                                        className="absolute -inset-8 rounded-full border border-dashed border-[#469D89]/15"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                    />
                                    {/* Inner orbital ring */}
                                    <motion.div
                                        className="absolute -inset-4 rounded-full border border-dashed border-[#469D89]/25"
                                        animate={{ rotate: -360 }}
                                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                    />

                                    {/* Glow halo */}
                                    <div className="absolute -inset-4 bg-gradient-to-r from-[#469D89]/20 via-[#5fb8a3]/10 to-[#469D89]/20 rounded-3xl blur-2xl" />

                                    {/* Neon frame border */}
                                    <div className="absolute inset-0 rounded-xl border border-[#469D89]/30 shadow-[0_0_40px_rgba(70,157,137,0.2),inset_0_0_40px_rgba(70,157,137,0.05)]" />

                                    {/* Corner HUD indicator dots */}
                                    {["top-1.5 left-1.5", "top-1.5 right-1.5", "bottom-1.5 left-1.5", "bottom-1.5 right-1.5"].map((pos, i) => (
                                        <motion.div
                                            key={i}
                                            className={`absolute ${pos} w-2 h-2 bg-[#469D89] rounded-full z-30`}
                                            animate={{ opacity: [1, 0.3, 1] }}
                                            transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
                                        />
                                    ))}

                                    {/* Profile image */}
                                    <Image
                                        src={img}
                                        alt="Asif Ahsan - Senior Software Engineer"
                                        height={612}
                                        width={410}
                                        className="w-full h-auto relative z-10 rounded-xl"
                                        priority
                                    />

                                    {/* Holographic overlay */}
                                    <div className="absolute inset-0 z-20 holographic-card rounded-xl pointer-events-none opacity-50" />
                                </motion.div>
                            </div>
                        </motion.section>

                        {/* ProfileIntro */}
                        <motion.div className="w-full lg:w-1/3 mx-auto" variants={itemVariants} style={{ y: textParallaxY, opacity: headerOpacity }}>
                            <ProfileIntro />
                        </motion.div>

                    </main>
                </div>
            </motion.div>
        </header>
    );
};

export default PortfolioHeader;
