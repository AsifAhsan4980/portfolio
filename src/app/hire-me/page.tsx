import { Metadata } from "next";
import EmailSentOption from "@/components/hire-me/emailSentOption";
import MyContact from "@/components/hire-me/myContact";

export const metadata: Metadata = {
    title: "Hire Me — Senior Software Engineer",
    description: "Hire Asif Ahsan — Senior Software Engineer with 5+ years experience. Specializing in React, Next.js, Node.js, AWS, and cloud-native architectures. Available for full-time, freelance, and consulting.",
    keywords: [
        "Hire Asif Ahsan",
        "Hire Full Stack Developer",
        "Hire Software Engineer Bangladesh",
        "Hire React Developer",
        "Hire Next.js Developer",
        "Hire Node.js Developer",
        "Freelance Software Engineer",
        "Remote Software Engineer",
        "Software Development Consulting",
    ],
    alternates: {
        canonical: "https://asifahsan.com/hire-me",
    },
    openGraph: {
        title: "Hire Me | Asif Ahsan — Senior Software Engineer",
        description: "Senior Software Engineer with 5+ years experience. Available for full-time roles, freelance projects, and technical consulting.",
        url: "https://asifahsan.com/hire-me",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Hire Me | Asif Ahsan",
        description: "Senior Software Engineer — available for full-time, freelance, and consulting. React, Next.js, Node.js, AWS.",
    },
};

const HireME = () => {
    return (
        <div className="relative container mx-auto py-12 px-4 lg:px-8 min-h-screen">
            {/* Ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-[#469D89]/6 rounded-full blur-[100px] pointer-events-none" />

            {/* HUD corners */}
            <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-[#469D89]/25 pointer-events-none" />
            <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-[#469D89]/25 pointer-events-none" />

            {/* Page header — CSS blur-fade-in animation */}
            <div className="text-center mb-12 relative z-10 animate-blur-fade-in">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#469D89]/50" />
                    <span className="text-[10px] font-mono text-[#469D89]/60 tracking-[0.3em] uppercase">Hire Me</span>
                    <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#469D89]/50" />
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold neon-text-pulse">
                    Let&apos;s <span className="gradient-text">Work Together</span>
                </h1>
                <p className="mt-3 text-sm font-mono text-muted-foreground">
                    <span className="text-[#469D89]/50">{'>'}</span> Send me a message or reach out directly
                </p>
            </div>

            {/* Two-column layout */}
            <div className="relative z-10 grid gap-8 lg:grid-cols-2 lg:items-start">
                {/* Left: Email form */}
                <EmailSentOption />

                {/* Neon divider (desktop) */}
                <div
                    className="hidden lg:block absolute inset-y-0 left-1/2 w-px"
                    style={{
                        background: "linear-gradient(to bottom, transparent, rgba(70,157,137,0.3), transparent)",
                    }}
                    aria-hidden="true"
                />

                {/* Right: Contact info */}
                <MyContact />
            </div>
        </div>
    );
};

export default HireME;
