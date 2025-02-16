"use client";
import * as React from "react";
import {useTheme} from "next-themes";

interface PartnerBoxProps {
    logoSrc: string;
    altText?: string;
    bg: string;
}

const PartnerBox: React.FC<PartnerBoxProps> = ({ logoSrc, altText = "Partner logo", bg }) => {
    return (
        <article
            className={`flex items-center bg-[#F4F1EB ] p-1 rounded-lg justify-center   rounded transition-transform duration-200 ease-in-out h-[52px] w-[190px] max-md:w-40 max-md:h-[45px] max-sm:h-10 max-sm:w-[140px] ${bg}`}
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
    const { theme } = useTheme()
    return (
        <section className="flex flex-col px-5 py-0 mx-auto my-0 w-full max-w-[1140px] max-md:px-4 max-md:py-0 max-sm:px-2.5 max-sm:py-0 mt-10">
            <div className="flex gap-5 justify-center self-center mt-5 w-full max-md:flex-wrap max-md:gap-4 max-sm:gap-2.5">
                <PartnerBox logoSrc={"https://www.tickettomorrow.com/_next/static/media/Logo.585c4ecc.svg"} bg={theme === "dark" ? "bg-[#1a1b1e]": ""}/>
                {/*<PartnerBox logoSrc={''} bg={theme === "dark" ? "bg-white": "border-[#469D89]"}/>*/}
                <PartnerBox logoSrc={'https://www.wozaif.com/_next/static/media/navbarLogo.7695c96c.svg'} bg={theme === "dark" ? "bg-white": ""}/>
                {/*<PartnerBox logoSrc={''} bg={theme === "dark" ? "bg-white": "border-[#469D89]"}/>*/}
                {/*<PartnerBox logoSrc={''} bg={theme === "dark" ? "bg-white": "border-[#469D89]"}/>*/}
            </div>
        </section>
    );
}

export default Partners;
