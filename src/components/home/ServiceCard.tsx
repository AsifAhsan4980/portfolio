"use client";
import * as React from "react";

interface ServiceCardProps {
    icon: string;
    title: string[];
    description: string;
    className?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
                                                     icon,
                                                     title,
                                                     description,
                                                     className = "",
                                                 }) => {
    return (
        <article
            className={`flex flex-col flex-1 px-8 pt-44 pb-14 text-white rounded-lg max-sm:px-5 max-sm:pt-24 max-sm:pb-14 ${className}`}
        >
            <i
                className={`ti ti-${icon} absolute top-8 left-8 text-2xl text-white`}
            />
            <h2 className="mb-5 text-3xl font-bold tracking-wide leading-10 text-white max-sm:text-3xl max-sm:leading-9">
                {title.map((line, index) => (
                    <React.Fragment key={index}>
                        {line}
                        {index < title.length - 1 && <br />}
                    </React.Fragment>
                ))}
            </h2>
            <p className="text-base leading-7 text-white max-sm:text-base max-sm:leading-7">
                {description}
            </p>
        </article>
    );
};

export default ServiceCard;
