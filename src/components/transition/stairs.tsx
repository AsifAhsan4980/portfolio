"use client";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import {useEffect, useState} from "react";

const stairAnimation = {
  initial: {
    top: "0%"
  },
  animate: {
    top: "100%"
  },
  exit: {
    top: ["100%", "0%"]
  }
};

const reverseIndex = (index: number) => {
  const totalSteps = 6;
  return totalSteps - index - 1;
};

const Stairs = () => {
  const { theme, resolvedTheme } = useTheme(); // resolvedTheme gives actual applied theme
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (theme === "system") {
      const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");

      // Set initial system theme
      setSystemTheme(darkModeQuery.matches ? "dark" : "light");

      // Listener for system theme changes
      const handleChange = (e: MediaQueryListEvent) => {
        setSystemTheme(e.matches ? "dark" : "light");
      };

      darkModeQuery.addEventListener("change", handleChange);
      return () => darkModeQuery.removeEventListener("change", handleChange);
    }
  }, [theme]);

  console.log("Theme:", theme); // "light", "dark", or "system"
  console.log("Resolved Theme:", resolvedTheme); // "light" or "dark"
  console.log("System Theme:", systemTheme);

  return (
      <>
        {[...Array(6)].map((_, index) => (
            <motion.div
                key={index}
                variants={stairAnimation}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{
                  duration: 0.2,
                  ease: "easeInOut",
                  delay: reverseIndex(index) * 0.1
                }}
                className={`h-full w-full relative z-10 ${
                    resolvedTheme === "dark" ? "bg-white" : "bg-black"
                }`}
            />
        ))}
      </>
  );
};

export default Stairs;
