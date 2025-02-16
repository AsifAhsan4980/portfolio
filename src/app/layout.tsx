import type {Metadata} from "next";
// import localFont from "next/font/local";
import {JetBrains_Mono} from "next/font/google"
import "./globals.css";
import {ThemeProvider} from "@/components/theme/theme-provider";
import Navbar from "@/components/navbar/navbar";
import React from "react";
import PageTransition from "@/components/transition/pageTransition";
import StairEffect from "@/components/transition/stattirEffect";
import Footer from "@/components/footer/Footer";
import Head from "next/head";

const jetbrainMono = JetBrains_Mono({
    subsets: ['latin'],
    weight: ["100", '200', '300', '400', '500', '600', '700', '800'],
    variable: '--font-jetbrainsMono'
})

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
    title: "Asif Ahsan | Senior Software Engineer",
    description:
        "🚀 Senior Software Engineer specializing in JavaScript, TypeScript, React, Next.js, Angular, and AWS serverless technologies. Passionate about building scalable and high-performance web applications.",
    keywords: [
        "Software Engineer",
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "AWS",
        "Serverless",
        "Web Development",
    ],
    authors: [{ name: "Asif Ahsan", url: "https://asifahsan.com" }],
    openGraph: {
        title: "Asif Ahsan | Senior Software Engineer",
        description:
            "🚀 Senior Software Engineer specializing in JavaScript, TypeScript, React, Next.js, Angular, and AWS serverless technologies.",
        url: "https://asifahsan.com",
        siteName: "Asif Ahsan",
        images: [
            {
                url: "/assets/images/asifahsan.jpg", // Ensure this is an absolute URL
                width: 1200,
                height: 630,
                alt: "Asif Ahsan - Senior Software Engineer",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Asif Ahsan | Senior Software Engineer",
        description:
            "🚀 Senior Software Engineer specializing in JavaScript, TypeScript, React, Next.js, Angular, and AWS serverless technologies.",
        images: ["/assets/images/asifahsan.jpg"], // Use an absolute URL
    },
    metadataBase: new URL("https://asifahsan.com"), // Helps with generating absolute URLs
};


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={''}>
        <Head>
            <title>Asif Ahsan | Senior Software Engineer | JavaScript, React, Next.js, AWS</title>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <meta charSet="UTF-8"/>

            <meta name="description"
                  content="🚀 Senior Software Engineer with expertise in JavaScript, TypeScript, React, Next.js, Angular, and AWS serverless technologies. Passionate about building scalable and high-performance web applications."/>
            <meta name="keywords"
                  content="Software Engineer, JavaScript, TypeScript, React, Next.js, AWS, Serverless, Web Development"/>
            <meta name="author" content="Asif Ahsan"/>

            {/* Open Graph (Facebook, LinkedIn, etc.) */}
            <meta property="og:title" content="Asif Ahsan | Senior Software Engineer | JavaScript, React, Next.js, AWS"/>
            <meta property="og:description"
                  content="E🚀 Senior Software Engineer with expertise in JavaScript, TypeScript, React, Next.js, Angular, and AWS serverless technologies. Passionate about building scalable and high-performance web applications."/>
            <meta property="og:image" content="/assets/images/asifahsan.jpg"/>
            <meta property="og:url" content="https://asifahsan.com/"/>
            <meta property="og:type" content="website"/>

            {/* Twitter Cards */}
            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="twitter:title" content="Asif Ahsan | Senior Software Engineer | JavaScript, React, Next.js, AWS."/>
            <meta name="twitter:description"
                  content="🚀 Senior Software Engineer with expertise in JavaScript, TypeScript, React, Next.js, Angular, and AWS serverless technologies. Passionate about building scalable and high-performance web applications."/>
            <meta name="twitter:image" content="/assets/images/asifahsan.jpg"/>

            {/* Favicon */}
            <link rel="icon" href="/favicon.ico"/>
        </Head>
            <body
                className={jetbrainMono.variable}
                // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange>
                    <Navbar/>
                    <StairEffect/>
                        <PageTransition>
                            {children}
                        </PageTransition>
                    <Footer/>
                </ThemeProvider>

            </body>
        </html>
    );
}
