import React from "react";
import ImageGallery from "./ImageGallery";

export function DesignerInfo() {
    return (
        <article className="max-md:w-full max-md:ml-0 max-md:flex max-md:flex-col max-md:items-center">
            <div className="flex flex-col items-start w-full max-md:mt-10 max-md:max-w-full max-md:items-center">
                <h1 className="text-5xl font-bold tracking-wide leading-[60px] max-md:text-4xl max-md:leading-[56px] text-center">
                    Detail Oriented &<br />
                    Passionate Software Engineer
                </h1>
                <p className="self-stretch mt-6 text-lg leading-8 max-md:max-w-full text-center">
                    I am a highly skilled and self-motivated full-stack developer with three years of experience in
                    designing and developing dynamic, high-performance web applications. I specialize in writing clean,
                    well-documented, and reusable code while adhering to best practices in software architecture. With a
                    strong focus on user-friendly interfaces and seamless functionality, I excel in building both
                    multi-page dynamic websites and complex software solutions. My commitment to excellence ensures that
                    every project I undertake is both scalable and maintainable, delivering results that drive success
                    and satisfaction.
                </p>
                <ImageGallery />
            </div>
        </article>
    );
}
