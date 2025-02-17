import React from "react";

const ProfileIntro = () => {
    return (
        <section className="pt-14 w-[32%] max-md:w-full">
            <div className="mb-5 ml-14 bg-cyan-500 rounded-full h-[30px] w-[30px]"/>
            <div className="w-[50px] h-[50px] bg-red-500 clip-path-triangle rounded-lg"/>


            <div className="flex gap-3.5 items-center mt-16 text-sm font-bold">
                <div/>
                <p>Introduction</p>
            </div>
            <h2 className="mt-9 text-3xl font-bold tracking-wide leading-9 ">
                <span>Senior Software Developer</span>
                <br/>
                <span>based on Dhaka, Bangladesh</span>
            </h2>
            <p className="mt-6 text-base leading-7">
                Hi, My name is Asif Ahsan. I&apos;m a Senior Software Engineer on Dhaka,
                Bangladesh. Experienced with 5+ years to work in this entire industry.
            </p>
        </section>
    );
};

export default ProfileIntro;
