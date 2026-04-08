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

const jetbrainMono = JetBrains_Mono({
    subsets: ['latin'],
    weight: ["100", '200', '300', '400', '500', '600', '700', '800'],
    variable: '--font-jetbrainsMono'
})

export const metadata: Metadata = {
    title: "Asif Ahsan | Senior Software Engineer (Full Stack)",
    description:
        "Senior Software Engineer with 5+ years of experience designing and building high-performance web applications. Shipped 14+ projects across 5+ countries, serving 20+ clients and impacting 100K+ users. Specialized in scalable distributed systems, real-time platforms, and cloud-native architectures.",
    keywords: [
        "Software Engineer",
        "Full Stack Developer",
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "AWS",
        "Node.js",
        "GraphQL",
        "WebRTC",
        "Kotlin",
        "Swift",
    ],
    authors: [{ name: "Asif Ahsan", url: "https://asifahsan.com" }],
    openGraph: {
        title: "Asif Ahsan | Senior Software Engineer (Full Stack)",
        description:
            "Senior Software Engineer with 5+ years of experience. Shipped 14+ projects across 5+ countries, impacting 100K+ users. Specialized in scalable distributed systems, real-time platforms, and cloud-native architectures.",
        url: "https://asifahsan.com",
        siteName: "Asif Ahsan",
        images: [
            {
                url: "/assets/images/asifahsan.jpg",
                width: 1200,
                height: 630,
                alt: "Asif Ahsan - Senior Software Engineer",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Asif Ahsan | Senior Software Engineer (Full Stack)",
        description:
            "Senior Software Engineer with 5+ years of experience. Shipped 14+ projects across 5+ countries, impacting 100K+ users. Specialized in scalable distributed systems and cloud-native architectures.",
        images: ["/assets/images/asifahsan.jpg"],
    },
    metadataBase: new URL("https://asifahsan.com"),
};

// JSON-LD structured data for SEO
const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Asif Ahsan',
    url: 'https://asifahsan.com',
    jobTitle: 'Senior Software Engineer',
    description: 'Senior Software Engineer with 5+ years of experience designing and building high-performance web applications. Specialized in scalable distributed systems, real-time platforms, and cloud-native architectures.',
    sameAs: [
        'https://www.linkedin.com/in/asif-ahsan-27832012b/',
        'https://github.com/AsifAhsan4980',
        'https://www.facebook.com/asif.ahsan727/',
    ],
    knowsAbout: [
        'TypeScript',
        'JavaScript',
        'React',
        'Next.js',
        'Node.js',
        'AWS',
        'GraphQL',
        'WebRTC',
        'PostgreSQL',
        'Kotlin',
        'Swift',
        'Docker',
        'Kubernetes',
    ],
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
                <CustomCursor />
                <ScrollProgress />
                <AmbientGlow />
                <Analytics />
                <Navbar/>
                <StairEffect/>
                <main id="main-content">
                    <PageTransition>
                        {children}
                    </PageTransition>
                </main>
                <Footer/>
            </ThemeProvider>
        </body>
        </html>
    );
}
