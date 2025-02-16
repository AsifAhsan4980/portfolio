"use client";
import React from "react";
// import NavLinks from "./NavLinks";
import ProfileHeader from "./ProfileHeader";
import ProfileIntro from "./ProfileIntro";
import Image from "next/image";
import img from "@/assets/images/Untitled-1.png"


const PortfolioHeader = () => {
    return (
        <>
            <header className="flex flex-col">
                <div className="flex flex-col items-center px-20  w-full  max-md:p-5 max-sm:p-4">
                    <div className="flex flex-col w-full max-w-[1140px]">
                        {/*<nav className="flex gap-5 justify-between items-center w-full text-base font-semibold text-center text-black max-md:flex-wrap">*/}
                        {/*    <a*/}
                        {/*        href="#"*/}
                        {/*        className="text-2xl font-bold text-black no-underline"*/}
                        {/*    >*/}
                        {/*        asif*/}
                        {/*    </a>*/}
                        {/*    /!*<NavLinks />*!/*/}
                        {/*    <a*/}
                        {/*        href="#"*/}
                        {/*        className="px-6 py-3.5 font-bold text-black no-underline rounded-lg border-2 border-blue-700 border-solid max-sm:px-4 max-sm:py-2.5"*/}
                        {/*    >*/}
                        {/*        Get it now*/}
                        {/*    </a>*/}
                        {/*</nav>*/}

                        <main className="flex gap-5 w-full max-w-[1087px] max-md:flex-col">
                            <ProfileHeader />
                            <section className="w-[39%] max-md:w-full">
                                <div className="w-full h-auto bg-red-400 aspect-[0.67] max-md:mx-0 max-md:my-10" >
                                    <Image src={img} alt={"pp"} height={612} width={410}/>
                                </div>

                            </section>
                            <ProfileIntro />
                        </main>
                    </div>
                </div>
            </header>
        </>
    );
};

export default PortfolioHeader;
