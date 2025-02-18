"use client";
import React from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileIntro from "./ProfileIntro";
import Image from "next/image";
import img from "@/assets/images/Untitled-1.png";

const PortfolioHeader = () => {
    return (
        <header className="flex flex-col w-full">
            <div className="flex flex-col items-center px-4 lg:px-20 w-full">
                <div className="flex flex-col w-full max-w-[1487px]">
                    {/* Main Content */}
                    <main className="flex flex-col lg:flex-row gap-5 w-full max-w-[1487px]">
                        {/* ProfileHeader Section */}
                        <div className="w-full lg:w-1/3 mx-auto">
                            <ProfileHeader/>
                        </div>

                        {/* Image Section */}
                        <section className="w-full lg:w-1/3 flex justify-center">
                            <div className="w-full h-auto aspect-[0.67] max-w-[410px]">
                                <Image
                                    src={img}
                                    alt="Profile Picture"
                                    height={612}
                                    width={410}
                                    className="w-full h-auto"
                                />
                            </div>
                        </section>

                        {/* ProfileIntro Section */}
                        <div className="w-full lg:w-1/3 text-center mx-auto">
                            <ProfileIntro/>
                        </div>
                    </main>
                </div>
            </div>
        </header>
    );
};

export default PortfolioHeader;
