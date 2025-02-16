import React from "react";
import {FaFacebook, FaGithub, FaInstagram, FaLinkedin} from "react-icons/fa";
import Link from "next/link";

interface ContactInfo {
    email: string;
    phone: { number: string; isWhatsApp: boolean }[];
    address: string;
    socialLinks: {
        platform: string;
        url: string;
        icon: JSX.Element;
    }[];
}

const ProfileHeader = () => {
    const contactInfo: ContactInfo = {
        email: "asifahhsan727@gmail.com",
        phone: [
            { number: "+8801795870994", isWhatsApp: false },
            { number: "+8801685436578", isWhatsApp: true },
        ],
        address: "35/c Shah Alibag, Mirpur 1, Dhaka, Bangladesh",
        socialLinks: [
            {
                platform: "Facebook",
                url: "https://www.facebook.com/asif.ahsan727/",
                icon: <FaFacebook size={30} color="#469D89" />,
            },
            {
                platform: "Instagram",
                url: "https://www.instagram.com/aragorn_isildurr/",
                icon: <FaInstagram size={30} color="#469D89" />,
            },
            {
                platform: "LinkedIn",
                url: "https://www.linkedin.com/in/asif-ahsan-27832012b/",
                icon: <FaLinkedin size={30} color="#469D89" />,
            },
            {
                platform: "GitHub",
                url: "https://github.com/AsifAhsan4980",
                icon: <FaGithub size={30} color="#469D89" />,
            },
        ],
    };
    return (
        <section className="w-[28%] max-md:w-full">
            <div className="mb-14 w-16 h-2 bg-[#469D89] rounded"/>
            <h1 className="text-8xl font-bold tracking-wide  leading-[110px] max-md:text-4xl max-md:leading-[49px] max-sm:text-3xl max-sm:leading-10">
                <span>Asif</span>
                <br/>
                <span>Ahsan</span>
            </h1>
            <div className="flex gap-6 mt-16 max-sm:justify-center">
                {contactInfo.socialLinks.map((link) => (
                    <div key={link.url}>
                        <Link href={link.url}>
                            <div
                                className="w-12 h-12 flex items-center justify-center border border-[#469D89] rounded-full max-sm:w-9 max-sm:h-9">
                                {link.icon}
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

        </section>
    );
};

export default ProfileHeader;
