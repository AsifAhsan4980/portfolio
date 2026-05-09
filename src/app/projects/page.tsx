import type { Metadata } from "next";
import ProjectsContent from "@/components/projects/ProjectsContent";

export const metadata: Metadata = {
    title: "Projects — 14+ Shipped Across 5+ Countries",
    description:
        "14+ projects shipped across 5+ countries: live streaming platforms, social media, ticketing systems, recruitment platforms, AI generation tools, e-commerce, real-time communication SDKs, and civic reporting systems.",
    keywords: [
        "Asif Ahsan Projects",
        "ZodoLive Live Streaming",
        "Tribel Social Media",
        "Ticket Tomorrow",
        "Wozaif Recruitment Platform",
        "Creator AI Platform",
        "Nexus RTC SDK",
        "Nagorik Civic Platform",
        "Gunti Expense Manager",
        "Full Stack Projects Portfolio",
        "Next.js Projects",
        "AWS Serverless Projects",
        "React Projects",
    ],
    alternates: {
        canonical: "https://asifahsan.com/projects",
    },
    openGraph: {
        title: "Projects | Asif Ahsan",
        description:
            "14+ projects shipped across 5+ countries — live streaming, social media, ticketing, AI, e-commerce, and real-time communication platforms.",
        url: "https://asifahsan.com/projects",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Projects | Asif Ahsan",
        description:
            "14+ projects shipped across 5+ countries — live streaming, social media, ticketing, AI, e-commerce, and real-time platforms.",
    },
};

export default function ProjectsPage() {
    return <ProjectsContent />;
}
