"use client"

import {ModeToggle} from "@/components/theme/toggleTheme";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {Button} from "@/components/ui/button";
// import {usePathname} from "next/";

type Menu = {
    id: number
    title: string
    route: string
    // component: ''
    isComponent: boolean
}


const menuList: Menu [] = [
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
    // {
    //     id: 3,
    //     title: "Resume",
    //     route: "/resume",
    //     isComponent: false
    // },
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
    }, {
        id: 6,
        title: "Home",
        route: "/",
        isComponent: true
    },
]

const Navbar = () => {

    const pathname = usePathname()

    return (
        <header className={"py-2 xl:py-4 z-40"}>
            <div className={"container mx-auto flex justify-between items-center"}>
                <Link href={"/"}>
                    <h1>
                        <div className={"text-4xl font-semibold"}>
                            Asif <span className={'text-[#469D89]'}>.</span>
                        </div>

                    </h1>
                </Link>
                {/*<div className={"flex justify-between"}>*/}
                {/*<div className={"font-bold size-3"}>*/}
                {/*    Asif .*/}
                {/*</div>*/}
                <div>
                    <nav className={"hidden xl:flex item-center gap-8"}>


                        {
                            menuList.map(r => !r.isComponent ? (

                                <Link href={r.route} key={r.id} className={`${r.route===pathname && 'text-[#469D89] border-b-2 border-[#469D89]'} capitalize font-medium transition-all pt-1.5`}>
                                    <h6 >
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
                {/*</div>*/}

            </div>
        </header>


    )
}

export default Navbar