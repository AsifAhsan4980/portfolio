"use client";
import React, { useState } from "react";
import { FilterButton } from "./FilterButton";
import { ProjectCard } from "./ProjectCard";

const filterCategories = [
    "All",
    "UI/UX Designer",
    "Branding & Logo",
    "Developed Project",
    "Illustration",
];

const projectData = [
    { title: "Empty State Illustration Pack" },
    { title: "[NEWEST] Senja v2 - Icon Pack" },
    { title: "SociaPlan - Dashboard UI Kit" },
    { title: "Square Dashboard UI Kit" },
];

export const FeaturedWork: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState("All");

    return (
        <section className="flex flex-col items-center px-5 py-10 mx-auto my-0 max-w-[1140px]">
            <link
                href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;700&family=Open+Sans:wght@400;600&display=swap"
                rel="stylesheet"
            />

            <h1 className="text-5xl font-bold tracking-wide leading-none text-center  max-md:text-4xl max-sm:text-3xl">
                My Featured Work
            </h1>

            <p className="mt-7 text-lg leading-8 text-center  max-sm:text-base max-sm:leading-normal">
                See my best work here. For details click the button below
            </p>

            <div className="flex flex-wrap gap-5 justify-center mt-14 w-full max-w-[930px] max-md:gap-4 max-md:mt-10 max-sm:flex-col">
                {filterCategories.map((category) => (
                    <FilterButton
                        key={category}
                        label={category}
                        isActive={activeFilter === category}
                        onClick={() => setActiveFilter(category)}
                    />
                ))}
            </div>

            <div className="grid gap-5 mt-20 w-full grid-cols-[repeat(2,1fr)] max-w-[1140px] max-md:gap-4 max-md:mt-16 max-sm:gap-5 max-sm:mt-10 max-sm:grid-cols-[1fr]">
                {projectData.map((project, index) => (
                    <ProjectCard key={index} title={project.title} />
                ))}
            </div>
        </section>
    );
};

export default FeaturedWork;
