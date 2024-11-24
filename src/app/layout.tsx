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
    title: "Asif Ahsan",
    description: "Sr. Software Engineering Developer",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={''}>
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
