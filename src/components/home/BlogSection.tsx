"use client";
import * as React from "react";
import BlogCard from "./BlogCard";

const BlogSection = () => {
    return (
        <section className="flex flex-col">
            <div className="flex flex-col justify-center items-center px-20 py-24 w-full  max-md:px-10 max-md:py-16 max-sm:px-5 max-sm:py-10">
                <div className="flex flex-col w-full max-w-[1139px]">
                    <header className="flex flex-wrap gap-5 justify-between">
                        <h1 className="text-4xl font-bold tracking-wide leading-none  max-sm:text-3xl">
                            Get an Insight by Read
                        </h1>
                        <p className="text-base leading-7  max-w-[500px]">
                            You can check my latest article that maybe can inspire you.
                            <br />
                            You can swipe to see more. And save when you want to read later
                        </p>
                    </header>

                    <div className="flex gap-5 mt-12 max-md:flex-wrap max-sm:flex-col">
                        <BlogCard
                            color="bg-rose-500"
                            date="30 July 2020"
                            category="Design"
                            title="Get The Boot A Birds Eye Look Into Mcse Boot"
                        />
                        <BlogCard
                            color="bg-cyan-500"
                            date="30 July 2020"
                            category="Design"
                            title="Get The Boot A Birds Eye Look Into Mcse Boot"
                        />
                        <BlogCard
                            color="bg-amber-500"
                            date="30 July 2020"
                            category="Design"
                            title="Home Business Design Ideas by Angelo P"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
