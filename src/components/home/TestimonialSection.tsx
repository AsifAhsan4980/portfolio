"use client";
import * as React from "react";

const TestimonialSection = () => {
    return (
        <section className="flex flex-col mx-auto my-0 w-full  max-w-[1440px]">
            <article className="flex flex-col justify-center items-center px-20 py-24 w-full bg-white max-md:px-10 max-md:py-16 max-sm:px-5 max-sm:py-10">
                <div className="flex flex-col w-full max-w-[1090px]">
                    <header className="flex gap-5 items-center mb-14 max-sm:flex-col max-sm:gap-4 max-sm:text-center">
                        <div className="bg-red-400 rounded-full h-[72px] w-[72px]" />
                        <div className="flex flex-col max-sm:items-center">
                            <h2 className="text-2xl font-bold tracking-wide leading-none text-zinc-900">
                                Deependra Bardhan
                            </h2>
                            <p className="mt-3 text-lg text-slate-600">CPO Ehya Enterpise</p>
                        </div>
                    </header>
                    <div className="flex gap-20 items-center max-md:gap-10 max-sm:flex-col max-sm:gap-8">
                        <blockquote className="text-3xl tracking-wide leading-[54px] max-w-[924px] text-zinc-900 max-md:text-2xl max-md:leading-10 max-sm:text-2xl max-sm:leading-9 max-sm:text-center">
                            &quot;Angelo exceeded all our expectations in redesigning the Ehya
                            Dashboard marketing site. Ibnu and the team understood our
                            requirements and the aesthetic we were going for. They were able
                            to quickly iterate on the design, keeping us involved at every
                            step, until we had something we are very proud of.&quot;
                        </blockquote>
                        <button
                            className="flex justify-center items-center bg-white rounded-full transition-transform cursor-pointer duration-[0.2s] h-[72px] shadow-[0_4px_6px_rgba(0,0,0,0.1)] w-[72px] max-sm:mx-auto max-sm:my-0"
                            aria-label="Next testimonial"
                        >
                            <i className="ti ti-chevron-right text-2xl text-zinc-900" />
                        </button>
                    </div>
                </div>
            </article>
        </section>
    );
};

export default TestimonialSection;
