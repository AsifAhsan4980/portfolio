"use client";
import * as React from "react";
import ServiceCard from "./ServiceCard";

const ServicesSection: React.FC = () => {
    return (
        <>
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@700&family=Open+Sans:wght@400&display=swap"
                rel="stylesheet"
            />
            <section className="flex px-16 py-0 mx-auto my-0 w-full bg-gray-400 max-w-[1440px] max-md:px-5 max-md:py-0">
                <div className="flex gap-5 pt-24 mx-auto mt-0 mb-24 w-full max-w-[1140px] max-md:pt-16 max-md:mx-auto max-md:mt-0 max-md:mb-16 max-sm:flex-col max-sm:gap-10">
                    <ServiceCard
                        icon="box"
                        title={["User Experience", "Designer"]}
                        description="I have experienced most in here. You can click and see my works here."
                        className="bg-cyan-500"
                    />
                    <ServiceCard
                        icon="pencil"
                        title={["Branding & Logo", "Designer"]}
                        description="I have experienced most in here. You can click and see my works here."
                        className="bg-blue-950"
                    />
                    <ServiceCard
                        icon="code"
                        title={["Front & Back-End", "Developer"]}
                        description="I have experienced most in here. You can click and see my works here."
                        className="bg-blue-950"
                    />
                </div>
            </section>
        </>
    );
};

export default ServicesSection;
