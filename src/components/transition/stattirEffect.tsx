"use client"
import {usePathname} from "next/navigation";
import {AnimatePresence} from "framer-motion";
import Stairs from "@/components/transition/stairs";




const StairEffect  = () =>{
    const pathName = usePathname();
    return (
        <AnimatePresence mode="wait">
            <div key={pathName}>
                <div className={"w-screen h-screen fixed top-0 left-0 right-0 pointer-events-none z-40 flex"}>
                    <Stairs/>
                </div>

            </div>
        </AnimatePresence>


    )
}

export default StairEffect