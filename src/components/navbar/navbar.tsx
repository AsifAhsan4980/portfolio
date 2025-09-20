"use client"

import { ModeToggle } from "@/components/theme/toggleTheme";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "framer-motion";

type Menu = {
    id: number;
    title: string;
    route: string;
    isComponent: boolean;
}

const menuList: Menu[] = [
    {
        id: 1,
        title: "Home",
        route: "/",
        isComponent: false
    },
    {
        id: 2,
        title: "Expertise",
        route: "/expertise",
        isComponent: false
    },
    {
        id: 4,
        title: "Projects",
        route: "/projects",
        isComponent: false
    },
    {
        id: 5,
        title: "Contacts",
        route: "/contacts",
        isComponent: false
    },
    {
        id: 6,
        title: "Home",
        route: "/",
        isComponent: true
    },
]

const Navbar = () => {
    const pathname = usePathname();
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="py-2 xl:py-4 z-40 mb-10">
            <div className="container mx-auto flex justify-between items-center">
                <Link href={"/"}>
                    <h1>
                        <div className="text-4xl font-semibold">
                            Asif <span className="text-[#469D89]">.</span>
                            <div className=" w-16 h-2 bg-[#469D89] rounded"/>
                        </div>
                    </h1>
                </Link>

                {/* Desktop Navigation (No Change) */}
                <div className="hidden lg:flex xl:flex item-center gap-8">
                    <nav className={"hidden xl:flex item-center gap-8"}>


                        {
                            menuList.map(r => !r.isComponent ? (

                                <Link href={r.route} key={r.id}
                                      className={`${r.route===pathname && 'text-[#469D89] border-b-2 border-[#469D89]'} capitalize font-medium transition-all pt-1.5`}>
                                    <h6>
                                        {r.title}
                                    </h6>

                                </Link>


                            ) : (<div key={r.id}><ModeToggle/></div>))
                        }
                        <Button className={"bg-[#469D89]"}>
                            <Link href={"hire-me"}>
                                Hire me
                            </Link>

                        </Button>

                    </nav>
                </div>

                {/* Hamburger Menu for Small Screens */}
                <div className="xl:hidden flex items-center gap-4">
                    <button onClick={toggleMobileMenu} className="text-3xl">
                        {isMobileMenuOpen ? 'X' : '☰'}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <motion.div
                className={`fixed top-0 left-0 w-full h-full bg-white dark:bg-[#1a1b1e] bg-opacity-90 z-50 p-4 ${isMobileMenuOpen ? 'block' : 'hidden'}`}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.3}}
            >
                <div className="flex justify-between items-center mb-6">
                    <Link href="/">
                        <h1 className="text-3xl font-semibold text-[#183b56] dark:text-white">
                            Asif <span className="text-[#469D89]">.</span>
                        </h1>
                    </Link>
                    <button onClick={toggleMobileMenu} className="text-3xl">
                        X
                    </button>
                </div>

                <nav className="flex flex-col items-center gap-6">
                    {
                        menuList.map(r => !r.isComponent ? (
                            <Link onClick={toggleMobileMenu} href={r.route} key={r.id} className={`${r.route === pathname && 'text-[#469D89]'} capitalize font-medium transition-all`}>
                                {r.title}
                            </Link>
                        ) : (<div key={r.id}><ModeToggle /></div>))
                    }
                    <Button className="bg-[#469D89]">
                        <Link onClick={toggleMobileMenu} href="hire-me">Hire me</Link>
                    </Button>
                </nav>
            </motion.div>
        </header>
    );
};

export default Navbar;
