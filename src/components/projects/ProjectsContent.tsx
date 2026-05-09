"use client"
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import React, { useRef, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { projects, statusConfig } from "@/data/projects";
import type { Project } from "@/data/projects";

const statusFilters = ["All", "Live", "Ongoing", "Active", "Finished"] as const;
type StatusFilter = typeof statusFilters[number];
const ownerFilters = ["all", "professional", "personal"] as const;
type OwnerFilter = typeof ownerFilters[number];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
    const status = statusConfig[project.status] || statusConfig.Finished;

    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), {
        stiffness: 160, damping: 22,
    });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), {
        stiffness: 160, damping: 22,
    });
    const glowX = useTransform(mouseX, [-0.5, 0.5], [0, 100]);
    const glowY = useTransform(mouseY, [-0.5, 0.5], [0, 100]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            className="relative"
            initial={{ opacity: 0, y: 40, filter: "blur(8px)", scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: index * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                perspective: 1000,
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <Link href={`/projects/${project.id}`}>
                <div className="relative border border-[#469D89]/20 rounded-2xl overflow-hidden bg-background/50 backdrop-blur-sm group cursor-pointer transition-all duration-300 hover:border-[#469D89]/55 hover:shadow-[0_8px_40px_rgba(70,157,137,0.12)]">
                    {/* Dynamic spotlight following mouse */}
                    <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none z-10 transition-opacity duration-300"
                        style={{
                            background: useTransform(
                                [glowX, glowY],
                                ([x, y]) =>
                                    `radial-gradient(circle at ${x}% ${y}%, rgba(70,157,137,0.08) 0%, transparent 60%)`
                            ),
                        }}
                    />

                    {/* Holographic shimmer */}
                    <div className="absolute inset-0 holographic-card opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none z-10" />

                    {/* Image */}
                    <div className="relative overflow-hidden h-44">
                        <Image
                            src={project.image}
                            alt={project.name}
                            width={800}
                            height={450}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            onError={(e) => {
                                const el = e.currentTarget;
                                el.style.display = "none";
                                const fallback = el.nextElementSibling as HTMLElement | null;
                                if (fallback) fallback.style.display = "flex";
                            }}
                        />
                        {/* Fallback placeholder (hidden by default) */}
                        <div
                            className="absolute inset-0 items-center justify-center bg-[#469D89]/5 border-b border-[#469D89]/10"
                            style={{ display: "none" }}
                        >
                            <div className="text-center">
                                <div className="text-3xl font-bold text-[#469D89]/30 mb-1">
                                    {project.name.charAt(0)}
                                </div>
                                <div className="text-[10px] font-mono text-[#469D89]/25 tracking-widest uppercase">
                                    {project.type}
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />

                        {/* Status badge */}
                        <div className={`absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-mono tracking-widest ${status.color}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${status.glow} ${project.status !== "Finished" ? "animate-pulse" : ""}`} />
                            {status.label}
                        </div>

                        {/* Personal badge */}
                        {project.personal && (
                            <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-0.5 rounded-full border border-purple-400/40 bg-purple-400/10 text-purple-300 text-[10px] font-mono tracking-widest">
                                ✦ Personal
                            </div>
                        )}

                        {/* Project type */}
                        <div className="absolute bottom-3 left-3">
                            <span className="text-[10px] font-mono text-white/60 bg-black/40 px-2 py-0.5 rounded tracking-widest uppercase backdrop-blur-sm">
                                {project.type}
                            </span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 relative z-10">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-bold gradient-text-static">{project.name}</h3>
                            <span className="text-[#469D89] text-sm opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                        </div>
                        <p className="text-[10px] font-mono text-[#469D89]/50 mb-3 tracking-widest">{project.timeLine}</p>
                        <p className="text-sm text-muted-foreground leading-6 line-clamp-3 mb-4">{project.description}</p>

                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-1.5">
                            {project.technologies.slice(0, 5).map((tech, i) => (
                                <span key={i} className="px-2 py-0.5 text-[10px] font-mono text-[#469D89] border border-[#469D89]/20 rounded-full bg-[#469D89]/5">
                                    {tech}
                                </span>
                            ))}
                            {project.technologies.length > 5 && (
                                <span className="px-2 py-0.5 text-[10px] font-mono text-[#469D89]/50 border border-[#469D89]/15 rounded-full">
                                    +{project.technologies.length - 5}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default function ProjectsContent() {
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
    const [ownerFilter, setOwnerFilter] = useState<OwnerFilter>("all");

    const filteredProjects = useMemo(() => {
        return projects.filter((p) => {
            if (statusFilter !== "All" && p.status !== statusFilter) return false;
            if (ownerFilter === "personal" && !p.personal) return false;
            if (ownerFilter === "professional" && p.personal) return false;
            return true;
        });
    }, [statusFilter, ownerFilter]);

    return (
        <div className="relative container py-12 min-h-screen">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-[#469D89]/6 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-[#469D89]/30 pointer-events-none" />
            <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-[#469D89]/30 pointer-events-none" />

            <motion.div
                className="text-center mb-8 relative z-10"
                initial={{ opacity: 0, y: -30, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
                <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#469D89]/50" />
                    <span className="text-[10px] font-mono text-[#469D89]/60 tracking-[0.3em] uppercase">Portfolio</span>
                    <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#469D89]/50" />
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold neon-text-pulse">
                    My <span className="gradient-text">Projects</span>
                </h1>
                <p className="mt-3 text-sm font-mono text-muted-foreground">
                    <span className="text-[#469D89]/50">{'>'}</span> {filteredProjects.length} of {projects.length} projects · click any card for case study
                </p>
            </motion.div>

            {/* Filter bar */}
            <motion.div
                className="relative z-10 mb-8 flex flex-col sm:flex-row items-center justify-center gap-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                {/* Status filters */}
                <div className="flex flex-wrap justify-center gap-2">
                    {statusFilters.map((s) => (
                        <button
                            key={s}
                            onClick={() => setStatusFilter(s)}
                            className={`px-3 py-1.5 text-[10px] font-mono tracking-widest uppercase rounded-full border transition-all duration-200 ${
                                statusFilter === s
                                    ? "border-[#469D89] bg-[#469D89]/15 text-[#469D89] shadow-[0_0_12px_rgba(70,157,137,0.2)]"
                                    : "border-[#469D89]/20 text-muted-foreground hover:border-[#469D89]/40 hover:text-[#469D89]"
                            }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>

                <div className="w-px h-5 bg-[#469D89]/20 hidden sm:block" />

                {/* Owner filters */}
                <div className="flex gap-2">
                    {ownerFilters.map((o) => (
                        <button
                            key={o}
                            onClick={() => setOwnerFilter(o)}
                            className={`px-3 py-1.5 text-[10px] font-mono tracking-widest uppercase rounded-full border transition-all duration-200 ${
                                ownerFilter === o
                                    ? "border-[#469D89] bg-[#469D89]/15 text-[#469D89] shadow-[0_0_12px_rgba(70,157,137,0.2)]"
                                    : "border-[#469D89]/20 text-muted-foreground hover:border-[#469D89]/40 hover:text-[#469D89]"
                            }`}
                        >
                            {o}
                        </button>
                    ))}
                </div>
            </motion.div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-5 mb-12">
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((item, index) => (
                        <ProjectCard key={item.id} project={item} index={index} />
                    ))}
                </AnimatePresence>
                {filteredProjects.length === 0 && (
                    <div className="col-span-full text-center py-16">
                        <div className="text-2xl font-mono text-[#469D89]/30 mb-2">No projects found</div>
                        <p className="text-sm font-mono text-muted-foreground">
                            Try adjusting the filters above
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
