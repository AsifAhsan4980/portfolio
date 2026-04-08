import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Technical Expertise — Skills & Technologies",
    description:
        "Full-stack technical skills: React, Next.js, Node.js, TypeScript, AWS, GraphQL, WebRTC, Kotlin, Swift, Flutter, PostgreSQL, MongoDB, Docker, Kubernetes. 5+ years building scalable distributed systems.",
    keywords: [
        "Asif Ahsan Skills",
        "Full Stack Developer Skills",
        "React Expert",
        "Next.js Expert",
        "AWS Cloud Engineer",
        "Node.js Backend Developer",
        "TypeScript Developer",
        "GraphQL API Developer",
        "WebRTC Developer",
        "Kotlin Mobile Developer",
        "Swift iOS Developer",
        "PostgreSQL",
        "MongoDB",
        "Docker Kubernetes",
        "Microservices Architecture",
    ],
    alternates: {
        canonical: "https://asifahsan.com/expertise",
    },
    openGraph: {
        title: "Technical Expertise | Asif Ahsan",
        description:
            "Full-stack technical skills spanning frontend, backend, mobile, cloud, AI, and infrastructure. 5+ years of professional experience across 11 technology categories.",
        url: "https://asifahsan.com/expertise",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Technical Expertise | Asif Ahsan",
        description:
            "Full-stack skills: React, Next.js, Node.js, AWS, GraphQL, WebRTC, Kotlin, Swift, Docker, Kubernetes — 5+ years experience.",
    },
};

export default function ExpertiseLayout({ children }: { children: React.ReactNode }) {
    return children;
}
