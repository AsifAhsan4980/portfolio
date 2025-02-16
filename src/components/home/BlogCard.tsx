"use client";
import * as React from "react";

interface BlogCardProps {
    color: string;
    date: string;
    category: string;
    title: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
                                               color,
                                               date,
                                               category,
                                               title,
                                           }) => {
    return (
        <article
            className={`flex flex-col flex-1 p-6 ${color} rounded-lg max-md:min-w-[calc(50%_-_20px)] max-sm:w-full relative`}
        >
            <p className="mb-4 text-base font-semibold text-black">
                {date} {category}
            </p>
            <h2 className="text-xl font-bold tracking-wide leading-tight text-black max-sm:text-lg">
                {title}
            </h2>
            <div className="flex justify-end mt-auto">
                <i className="ti ti-arrow-right text-sm " />
            </div>
            <i className="ti ti-bookmark absolute top-6 right-6 text-white cursor-pointer" />
        </article>
    );
};

export default BlogCard;
