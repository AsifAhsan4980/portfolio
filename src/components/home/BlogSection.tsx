"use client";
import * as React from "react";
import { motion } from "framer-motion";
import BlogCard from "./BlogCard";

const BlogSection = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut",
            },
        },
    };

    return (
        <section className="relative flex flex-col overflow-hidden">
            {/* Parallax background orbs */}
            <div className="absolute top-20 left-10 w-64 h-64 bg-[#469D89]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#2d6b5f]/10 rounded-full blur-3xl" />

            <div className="relative z-10 flex flex-col justify-center items-center px-20 py-24 w-full max-md:px-10 max-md:py-16 max-sm:px-5 max-sm:py-10">
                <div className="flex flex-col w-full max-w-[1139px]">
                    <motion.header
                        className="flex flex-wrap gap-5 justify-between items-end"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div>
                            <h2 className="text-4xl font-bold tracking-wide leading-none max-sm:text-3xl">
                                Get an <span className="gradient-text">Insight</span> by Read
                            </h2>
                        </div>
                        <p className="text-base leading-7 text-muted-foreground max-w-[500px]">
                            You can check my latest article that maybe can inspire you.
                            <br />
                            You can swipe to see more. And save when you want to read later
                        </p>
                    </motion.header>

                    <motion.div
                        className="flex gap-5 mt-12 max-md:flex-wrap max-sm:flex-col"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        <motion.div variants={itemVariants} className="flex-1 min-w-[280px]">
                            <BlogCard
                                gradient="from-rose-500 to-rose-600"
                                date="30 July 2020"
                                category="Design"
                                title="Get The Boot A Birds Eye Look Into Mcse Boot"
                            />
                        </motion.div>
                        <motion.div variants={itemVariants} className="flex-1 min-w-[280px]">
                            <BlogCard
                                gradient="from-[#469D89] to-[#2d6b5f]"
                                date="30 July 2020"
                                category="Development"
                                title="Get The Boot A Birds Eye Look Into Mcse Boot"
                            />
                        </motion.div>
                        <motion.div variants={itemVariants} className="flex-1 min-w-[280px]">
                            <BlogCard
                                gradient="from-amber-500 to-amber-600"
                                date="30 July 2020"
                                category="Business"
                                title="Home Business Design Ideas by Angelo P"
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
