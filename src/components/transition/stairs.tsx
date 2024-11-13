"use-client"
import {  motion } from "framer-motion";
import { useTheme } from "next-themes";

const stairAnimation = {
  initial: {
    top:"0%"
  },
  animate: {
    top:"100%"
  },
  exit: {
    top:["100%","0%"]
  }
}

const reverseIndex = (index: number) => {
  const totalSteps=6
  return totalSteps - index -1
}

const Stairs = () => {
  const { theme } = useTheme();
  return(
      <>
        {
          [...Array(6)].map((_, index) =>(
              <motion.div
                  key={index}
                  variants={stairAnimation}
                  initial={"initial"}
                  animate={"animate"}
                  exit={"exit"}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                    delay: reverseIndex(index)*0.1
                  }}
                  className={`h-full w-full bg-white relative z-10 ${
                      theme === "dark" ? "bg-white" : "bg-black"
                  }`}
              />
          ))
        }
      </>
  )
}

export default Stairs