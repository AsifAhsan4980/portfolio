"use client"

import { ModeToggle } from "@/components/theme/toggleTheme";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Menu = {
    id: number;
    title: string;
    route: string;
    isComponent: boolean;
}

const menuList: Menu[] = [
    { id: 1, title: "Home",      route: "/",          isComponent: false },
    { id: 2, title: "Expertise", route: "/expertise", isComponent: false },
    { id: 4, title: "Projects",  route: "/projects",  isComponent: false },
    { id: 7, title: "Blog",      route: "/blog",      isComponent: false },
    { id: 8, title: "Games",     route: "/games",     isComponent: false },
    { id: 5, title: "Contacts",  route: "/contacts",  isComponent: false },
    { id: 6, title: "Home",      route: "/",          isComponent: true  },
]

const Navbar = () => {
    const pathname = usePathname();
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isMobileMenuOpen) setMobileMenuOpen(false);
        };
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [isMobileMenuOpen]);

    useEffect(() => {
        if (isMobileMenuOpen && menuRef.current) {
            const firstFocusable = menuRef.current.querySelector("a, button");
            (firstFocusable as HTMLElement)?.focus();
        }
    }, [isMobileMenuOpen]);

    return (
        <header
            className={`sticky top-0 z-40 transition-all duration-300 ${
                scrolled
                    ? "border-b border-[#469D89]/15 backdrop-blur-xl bg-background/75 py-2"
                    : "py-2 xl:py-4"
            }`}
        >
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link href="/" aria-label="Go to homepage">
                    <motion.div className="text-3xl font-bold" whileHover={{ scale: 1.02 }}>
                        <span>Asif</span>
                        <span className="text-[#469D89] neon-text">.</span>
                        <div className="w-14 h-[2px] bg-gradient-to-r from-[#469D89] to-transparent rounded-full mt-1" />
                    </motion.div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden xl:flex items-center gap-8" aria-label="Main navigation">
                    {menuList.map(r =>
                        !r.isComponent ? (
                            <Link href={r.route} key={r.id} className="relative capitalize font-mono text-sm tracking-wide focus:outline-none">
                                <span className={`transition-colors duration-200 ${r.route === pathname ? "text-[#469D89]" : "hover:text-[#469D89]"}`}>
                                    {r.title}
                                </span>
                                {r.route === pathname && (
                                    <motion.div
                                        layoutId="nav-underline"
                                        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-[#469D89] to-[#5fb8a3] rounded-full shadow-[0_0_8px_rgba(70,157,137,0.6)]"
                                    />
                                )}
                            </Link>
                        ) : (
                            <div key={r.id}><ModeToggle /></div>
                        )
                    )}
                    <a
                        href="/assets/pdf/Resume_of_Asif_Ahsan.pdf"
                        download="Asif_Ahsan_Resume.pdf"
                        aria-label="Download Resume"
                    >
                        <motion.div
                            className="w-9 h-9 flex items-center justify-center border border-[#469D89]/40 rounded-lg transition-all duration-300 hover:border-[#469D89] hover:bg-[#469D89]/10 hover:shadow-[0_0_14px_rgba(70,157,137,0.3)]"
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.92 }}
                        >
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-[#469D89]">
                                <path d="M7 1v8.5M3.5 6.5L7 10l3.5-3.5M1.5 12.5h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </motion.div>
                    </a>
                    <Link href="hire-me">
                        <div className="relative">
                            {/* Available for work pulse */}
                            <motion.span
                                className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-green-400 z-10"
                                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <motion.span
                                className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-green-400/40"
                                animate={{ scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <motion.button
                                className="px-5 py-2 text-sm font-mono tracking-widest text-[#469D89] border border-[#469D89]/50 rounded-lg transition-all duration-300 hover:border-[#469D89] hover:shadow-[0_0_18px_rgba(70,157,137,0.35)] hover:bg-[#469D89]/8 focus:outline-none focus:ring-2 focus:ring-[#469D89]"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                Hire me
                            </motion.button>
                        </div>
                    </Link>
                </nav>

                {/* Hamburger */}
                <div className="xl:hidden flex items-center gap-3">
                    <ModeToggle />
                    <button
                        onClick={toggleMobileMenu}
                        className="flex flex-col gap-1.5 p-1.5 focus:outline-none focus:ring-2 focus:ring-[#469D89] rounded"
                        aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                        aria-expanded={isMobileMenuOpen}
                        aria-controls="mobile-menu"
                    >
                        <motion.span className="block w-6 h-[2px] bg-[#469D89] rounded-full origin-center"
                            animate={isMobileMenuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
                            transition={{ duration: 0.25 }} />
                        <motion.span className="block w-6 h-[2px] bg-[#469D89] rounded-full"
                            animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                            transition={{ duration: 0.15 }} />
                        <motion.span className="block w-6 h-[2px] bg-[#469D89] rounded-full origin-center"
                            animate={isMobileMenuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
                            transition={{ duration: 0.25 }} />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        ref={menuRef}
                        id="mobile-menu"
                        className="fixed top-0 left-0 w-full h-full z-50 bg-background/96 backdrop-blur-2xl"
                        initial={{ opacity: 0, x: "-100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "-100%" }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Mobile navigation menu"
                    >
                        <div className="absolute inset-0 bg-cyber-grid opacity-50 pointer-events-none" />
                        <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-[#469D89]/40 pointer-events-none" />
                        <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-[#469D89]/40 pointer-events-none" />
                        <div className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-[#469D89]/40 pointer-events-none" />
                        <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-[#469D89]/40 pointer-events-none" />

                        <div className="relative z-10 flex justify-between items-center px-6 py-4 border-b border-[#469D89]/15">
                            <Link href="/" onClick={toggleMobileMenu}>
                                <span className="text-2xl font-bold">Asif<span className="text-[#469D89] neon-text">.</span></span>
                            </Link>
                            <button
                                onClick={toggleMobileMenu}
                                className="text-[#469D89] border border-[#469D89]/40 rounded-lg p-2 hover:bg-[#469D89]/10 focus:outline-none focus:ring-2 focus:ring-[#469D89]"
                                aria-label="Close navigation menu"
                            >
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                            </button>
                        </div>

                        <nav className="relative z-10 flex flex-col items-center gap-8 pt-16" aria-label="Mobile navigation">
                            {menuList.map(r =>
                                !r.isComponent ? (
                                    <motion.div key={r.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: r.id * 0.07 }}
                                    >
                                        <Link onClick={toggleMobileMenu} href={r.route}
                                            className={`text-xl font-mono tracking-widest capitalize transition-colors ${r.route === pathname ? "text-[#469D89] neon-text" : "hover:text-[#469D89]"}`}
                                        >
                                            {r.title}
                                        </Link>
                                    </motion.div>
                                ) : null
                            )}
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
                                className="flex flex-col items-center gap-4"
                            >
                                <Link onClick={toggleMobileMenu} href="hire-me">
                                    <div className="relative inline-block">
                                        <motion.span
                                            className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-green-400 z-10"
                                            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />
                                        <button className="px-8 py-3 text-sm font-mono tracking-widest text-[#469D89] border border-[#469D89]/50 rounded-lg hover:bg-[#469D89]/10 hover:shadow-[0_0_18px_rgba(70,157,137,0.3)] transition-all duration-300">
                                            Hire me
                                        </button>
                                    </div>
                                </Link>
                                <a
                                    href="/assets/pdf/Resume_of_Asif_Ahsan.pdf"
                                    download="Asif_Ahsan_Resume.pdf"
                                    onClick={toggleMobileMenu}
                                    className="flex items-center gap-2 px-8 py-3 text-sm font-mono tracking-widest text-muted-foreground border border-border/50 rounded-lg hover:border-[#469D89]/40 hover:text-[#469D89] hover:bg-[#469D89]/5 transition-all duration-300"
                                >
                                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                                        <path d="M6.5 1v8M3 6.5l3.5 3.5 3.5-3.5M1 12h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    Download CV
                                </a>
                            </motion.div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
