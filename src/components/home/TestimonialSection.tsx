"use client";
import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronRight, FaChevronLeft, FaQuoteLeft } from "react-icons/fa";

interface Testimonial {
    name: string;
    role: string;
    company: string;
    quote: string;
    avatar: string;
}

const testimonials: Testimonial[] = [
    {
        name: "Deependra Bardhan",
        role: "CPO",
        company: "Ehya Enterprise",
        quote: "Angelo exceeded all our expectations in redesigning the Ehya Dashboard marketing site. Ibnu and the team understood our requirements and the aesthetic we were going for. They were able to quickly iterate on the design, keeping us involved at every step, until we had something we are very proud of.",
        avatar: "#ef4444",
    },
    {
        name: "Sarah Johnson",
        role: "CTO",
        company: "TechStart Inc",
        quote: "Working with this team was an absolute pleasure. Their attention to detail and commitment to delivering high-quality work is unmatched. I highly recommend them for any software development project.",
        avatar: "#469D89",
    },
];

const TestimonialSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const current = testimonials[currentIndex];

    return (
        <section className="relative flex flex-col mx-auto my-0 w-full max-w-[1440px] overflow-hidden">
            {/* Background gradient orbs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#469D89]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#2d6b5f]/10 rounded-full blur-3xl" />

            <article className="relative z-10 flex flex-col justify-center items-center px-20 py-24 w-full max-md:px-10 max-md:py-16 max-sm:px-5 max-sm:py-10">
                <motion.div
                    className="glass-card p-10 md:p-16 w-full max-w-[1090px]"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Quote icon */}
                    <div className="mb-8">
                        <FaQuoteLeft className="w-12 h-12 text-[#469D89]/30" />
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4 }}
                        >
                            {/* Quote */}
                            <blockquote className="text-2xl md:text-3xl tracking-wide leading-relaxed md:leading-[54px] max-w-[924px] text-foreground max-md:text-xl max-md:leading-10 max-sm:text-lg max-sm:leading-8">
                                &quot;{current.quote}&quot;
                            </blockquote>

                            {/* Author info */}
                            <div className="flex gap-5 items-center mt-10 max-sm:flex-col max-sm:gap-4 max-sm:text-center">
                                <motion.div
                                    className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold"
                                    style={{ backgroundColor: current.avatar }}
                                    whileHover={{ scale: 1.1 }}
                                >
                                    {current.name.charAt(0)}
                                </motion.div>
                                <div className="flex flex-col max-sm:items-center">
                                    <h3 className="text-xl font-bold tracking-wide leading-none">
                                        {current.name}
                                    </h3>
                                    <p className="mt-2 text-base text-muted-foreground">
                                        {current.role} at <span className="text-[#469D89]">{current.company}</span>
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation */}
                    <div className="flex gap-4 mt-10 justify-end max-sm:justify-center">
                        <motion.button
                            className="w-12 h-12 flex items-center justify-center bg-secondary rounded-full transition-colors hover:bg-[#469D89] hover:text-white"
                            onClick={prevTestimonial}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label="Previous testimonial"
                        >
                            <FaChevronLeft className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                            className="w-12 h-12 flex items-center justify-center bg-[#469D89] text-white rounded-full"
                            onClick={nextTestimonial}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label="Next testimonial"
                        >
                            <FaChevronRight className="w-4 h-4" />
                        </motion.button>
                    </div>

                    {/* Dots indicator */}
                    <div className="flex gap-2 mt-6 justify-center">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                className={`w-2 h-2 rounded-full transition-all ${
                                    index === currentIndex
                                        ? "w-8 bg-[#469D89]"
                                        : "bg-muted-foreground/30"
                                }`}
                                onClick={() => setCurrentIndex(index)}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                </motion.div>
            </article>
        </section>
    );
};

export default TestimonialSection;
