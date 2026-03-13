"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FilterButton } from "./FilterButton";
import { ProjectCard } from "./ProjectCard";

const filterCategories = [
    "All",
    "UI/UX Designer",
    "Branding & Logo",
    "Developed Project",
    "Illustration",
];

interface Project {
    title: string;
    category: string;
    size: 'normal' | 'large' | 'wide' | 'tall';
}

const projectData: Project[] = [
    { title: "Empty State Illustration Pack", category: "Illustration", size: "large" },
    { title: "[NEWEST] Senja v2 - Icon Pack", category: "UI/UX Designer", size: "normal" },
    { title: "SociaPlan - Dashboard UI Kit", category: "Developed Project", size: "wide" },
    { title: "Square Dashboard UI Kit", category: "UI/UX Designer", size: "normal" },
];

const sizeClasses: Record<string, string> = {
    normal: '',
    large: 'md:col-span-2 md:row-span-2',
    wide: 'md:col-span-2',
    tall: 'md:row-span-2',
};

export const FeaturedWork: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState("All");

    const filteredProjects = activeFilter === "All"
        ? projectData
        : projectData.filter(project => project.category === activeFilter);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.4,
                ease: "easeOut",
            },
        },
        exit: {
            opacity: 0,
            scale: 0.95,
            transition: {
                duration: 0.2,
            },
        },
    };

    return (
        <section className="relative flex flex-col items-center px-5 py-20 mx-auto my-0 max-w-[1140px] overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#469D89]/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#2d6b5f]/5 rounded-full blur-3xl" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative z-10"
            >
                <h2 className="text-5xl font-bold tracking-wide leading-none text-center max-md:text-4xl max-sm:text-3xl">
                    My <span className="gradient-text">Featured Work</span>
                </h2>

                <p className="mt-7 text-lg leading-8 text-center text-muted-foreground max-sm:text-base max-sm:leading-normal">
                    See my best work here. For details click the button below
                </p>
            </motion.div>

            {/* Filter buttons */}
            <motion.div
                className="flex flex-wrap gap-3 justify-center mt-14 w-full max-w-[930px] max-md:gap-3 max-md:mt-10 max-sm:flex-col max-sm:items-center relative z-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                {filterCategories.map((category) => (
                    <FilterButton
                        key={category}
                        label={category}
                        isActive={activeFilter === category}
                        onClick={() => setActiveFilter(category)}
                    />
                ))}
            </motion.div>

            {/* Projects grid */}
            <motion.div
                className="grid gap-5 mt-16 w-full grid-cols-1 md:grid-cols-4 max-w-[1140px] relative z-10"
                style={{ gridAutoRows: 'minmax(200px, auto)' }}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                layout
            >
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project) => (
                        <motion.div
                            key={project.title}
                            className={sizeClasses[project.size]}
                            variants={itemVariants}
                            layout
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <ProjectCard title={project.title} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </section>
    );
};

export default FeaturedWork;
