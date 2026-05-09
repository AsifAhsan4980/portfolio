import type {Metadata} from "next";
import {JetBrains_Mono} from "next/font/google"
import "./globals.css";
import {ThemeProvider} from "@/components/theme/theme-provider";
import Navbar from "@/components/navbar/navbar";
import React from "react";
import PageTransition from "@/components/transition/pageTransition";
import StairEffect from "@/components/transition/stattirEffect";
import Footer from "@/components/footer/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import AmbientGlow from "@/components/ui/AmbientGlow";
import { Analytics } from "@vercel/analytics/react";
import { FocusModeProvider } from "@/context/FocusMode";
import FocusAwareShell from "@/components/ui/FocusAwareShell";
import ChatBot from "@/components/chatbot/ChatBot";
import TodayInHistory from "@/components/ui/TodayInHistory";
import FirebaseAnalytics from "@/components/analytics/FirebaseAnalytics";

const jetbrainMono = JetBrains_Mono({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    display: 'swap',
    variable: '--font-jetbrainsMono'
})

export const metadata: Metadata = {
    metadataBase: new URL("https://asifahsan.com"),
    title: {
        default: "Asif Ahsan | Senior Software Engineer (Full Stack)",
        template: "%s | Asif Ahsan",
    },
    description:
        "Senior Software Engineer with 6+ years of experience designing and building high-performance web applications. Shipped 14+ projects across 5+ countries, serving 20+ clients and impacting 100K+ users. Specialized in scalable distributed systems, real-time platforms, and cloud-native architectures.",
    keywords: [
        "Asif Ahsan",
        "Senior Software Engineer",
        "Full Stack Developer",
        "Software Engineer Bangladesh",
        "Software Engineer Dhaka",
        "React Developer",
        "Next.js Developer",
        "Node.js Developer",
        "AWS Solutions Architect",
        "TypeScript Developer",
        "JavaScript Developer",
        "GraphQL Developer",
        "WebRTC Developer",
        "Kotlin Developer",
        "Swift Developer",
        "Full Stack Web Development",
        "Cloud Native Architecture",
        "Distributed Systems",
        "Real-Time Applications",
        "Live Streaming Platform",
        "E-Commerce Development",
        "Mobile App Development",
        "Microservices Architecture",
        "Cocos Studio",
        "Unity Game Engine",
        "Serverless Development",
        "Hire Software Engineer Bangladesh",
        "Freelance Full Stack Developer",
    ],
    authors: [{ name: "Asif Ahsan", url: "https://asifahsan.com" }],
    creator: "Asif Ahsan",
    publisher: "Asif Ahsan",
    category: "Technology",
    classification: "Software Engineering Portfolio",
    alternates: {
        canonical: "https://asifahsan.com",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    openGraph: {
        title: "Asif Ahsan | Senior Software Engineer (Full Stack)",
        description:
            "Senior Software Engineer with 6+ years of experience. Shipped 14+ projects across 5+ countries, impacting 100K+ users. Specialized in scalable distributed systems, real-time platforms, and cloud-native architectures.",
        url: "https://asifahsan.com",
        siteName: "Asif Ahsan",
        locale: "en_US",
        images: [
            {
                url: "/opengraph-image",
                width: 1200,
                height: 630,
                alt: "Asif Ahsan - Senior Software Engineer Portfolio",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Asif Ahsan | Senior Software Engineer (Full Stack)",
        description:
            "Senior Software Engineer with 6+ years of experience. Shipped 14+ projects across 5+ countries, impacting 100K+ users. Specialized in scalable distributed systems and cloud-native architectures.",
        images: ["/opengraph-image"],
    },
};

// JSON-LD structured data for SEO
const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Asif Ahsan — Senior Software Engineer',
    url: 'https://asifahsan.com',
    description: 'Portfolio of Asif Ahsan, Senior Software Engineer specializing in scalable distributed systems, real-time platforms, and cloud-native architectures.',
    author: {
        '@type': 'Person',
        name: 'Asif Ahsan',
        url: 'https://asifahsan.com',
    },
};

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Asif Ahsan',
    givenName: 'Asif',
    familyName: 'Ahsan',
    url: 'https://asifahsan.com',
    email: 'asifahsan727@gmail.com',
    telephone: '+8801795870994',
    jobTitle: 'Senior Software Engineer',
    description: 'Senior Software Engineer with 6+ years of experience designing and building high-performance web applications. Shipped 14+ projects across 5+ countries, serving 20+ clients and impacting 100K+ users. Specialized in scalable distributed systems, real-time platforms, and cloud-native architectures.',
    image: 'https://asifahsan.com/assets/images/asifahsan.jpg',
    address: {
        '@type': 'PostalAddress',
        addressLocality: 'Dhaka',
        addressRegion: 'Dhaka Division',
        addressCountry: 'BD',
    },
    worksFor: {
        '@type': 'Organization',
        name: 'Right Tracks IT',
        url: 'https://www.righttracksit.com/',
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Mohakhali DOHS, Dhaka',
            addressCountry: 'BD',
        },
    },
    alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'BRAC University',
        url: 'https://www.bracu.ac.bd/',
    },
    nationality: {
        '@type': 'Country',
        name: 'Bangladesh',
    },
    sameAs: [
        'https://www.linkedin.com/in/asif-ahsan-27832012b/',
        'https://github.com/AsifAhsan4980',
        'https://www.facebook.com/asif.ahsan727/',
        'https://www.instagram.com/aragorn_isildurr/',
    ],
    knowsAbout: [
        'TypeScript', 'JavaScript', 'React', 'Next.js', 'Node.js', 'AWS',
        'GraphQL', 'WebRTC', 'PostgreSQL', 'MongoDB', 'DynamoDB', 'Redis',
        'Kotlin', 'Swift', 'Flutter', 'Docker', 'Kubernetes', 'Terraform',
        'Microservices', 'Serverless Architecture', 'Real-Time Communication',
        'Live Streaming', 'E-Commerce', 'Cloud Native Architecture',
    ],
    knowsLanguage: ['en', 'bn'],
    hasOccupation: {
        '@type': 'Occupation',
        name: 'Senior Software Engineer',
        occupationalCategory: '15-1252.00',
        skills: 'React, Next.js, Node.js, TypeScript, AWS, GraphQL, WebRTC, PostgreSQL, MongoDB, Kotlin, Swift, Docker, Kubernetes',
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <head>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        </head>
        <body className={jetbrainMono.variable}>
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#469D89] focus:text-white focus:rounded focus:outline-none"
            >
                Skip to main content
            </a>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange>
                <FocusModeProvider>
                    <CustomCursor />
                    <ScrollProgress />
                    <AmbientGlow />
                    <Analytics />
                    <FirebaseAnalytics />
                    <ChatBot />
                    <TodayInHistory />
                    <FocusAwareShell
                        navbar={<Navbar/>}
                        footer={<Footer/>}
                    >
                        <StairEffect/>
                        <main id="main-content">
                            <PageTransition>
                                {children}
                            </PageTransition>
                        </main>
                    </FocusAwareShell>
                </FocusModeProvider>
            </ThemeProvider>
        </body>
        </html>
    );
}
