import React from "react";
import  ImageGallery  from "./ImageGallery";

export function DesignerInfo() {
    return (
        <article className="w-[55%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col items-start w-full max-md:mt-10 max-md:max-w-full">
                <h1 className="text-5xl font-bold tracking-wide  leading-[60px] max-md:max-w-full max-md:text-4xl max-md:leading-[56px]">
                    Detail Oriented &<br />
                    Passionate Software Engineer
                </h1>
                <p className="self-stretch mt-6 text-lg leading-8 max-md:max-w-full">
                    I am a strong, skillful, and self-organized full-stack
                    developer with 3 years of experience developing
                    websites with clean code, well documentation, code
                    reusability, proper software architecture, and a user
                    friendly interface. Whether a multi-page dynamic
                    website or building complex software the result of
                    my work gives me ample joy.
                </p>
                <ImageGallery />
            </div>
        </article>
    );
}
