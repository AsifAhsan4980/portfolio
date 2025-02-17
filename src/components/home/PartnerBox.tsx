"use client";
import * as React from "react";
import { useTheme } from "next-themes";

interface PartnerBoxProps {
    logoSrc: string;
    altText?: string;
}

const PartnerBox: React.FC<PartnerBoxProps> = ({ logoSrc, altText = "Partner logo" }) => {
    const { theme } = useTheme();

    // Change background based on theme
    const bgColor = theme === "dark" ? "bg-[#EAEAEA]" : "bg-[#F4F1EB]";

    return (
        <article
            className={`flex items-center justify-center p-1 rounded-lg transition-transform duration-200 ease-in-out 
                        h-[52px] w-[190px] max-md:w-40 max-md:h-[45px] max-sm:h-10 max-sm:w-[140px] 
                        ${bgColor} border border-[#469d89] dark:border-gray-700`}
            role="img"
            aria-label={altText}
        >
            <img
                src={logoSrc}
                alt={altText}
                className="max-w-full max-h-full object-contain"
            />
        </article>
    );
};

function Partners() {
    return (
        <section className="flex flex-col px-5 py-0 mx-auto my-0 w-full max-w-[1140px] max-md:px-4 max-md:py-0 max-sm:px-2.5 max-sm:py-0 mt-10">
            <div className="flex gap-5 justify-center self-center mt-5 w-full max-md:flex-wrap max-md:gap-4 max-sm:gap-2.5">
                <PartnerBox logoSrc="https://www.tickettomorrow.com/_next/static/media/Logo.585c4ecc.svg" />
                <PartnerBox logoSrc="https://www.asifahsan.com/assets/svg/tribel.svg" />
                <PartnerBox logoSrc="https://www.wozaif.com/_next/static/media/navbarLogo.7695c96c.svg" />
                <PartnerBox logoSrc="https://www.pipobazar.com/logo.png" />
            </div>
        </section>
    );
}

export default Partners;
