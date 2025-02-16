import React from "react";

interface ProjectCardProps {
    title: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ title }) => {
    return (
        <article className="overflow-hidden relative bg-red-400 rounded-xl aspect-[1.2]">
            <h3 className="absolute inset-x-0 bottom-0 p-5 text-base font-semibold ">
                {title}
            </h3>
        </article>
    );
};
