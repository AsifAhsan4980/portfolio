"use client";
import { memo } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default memo(function ScrollProgress() {
    const { scrollYProgress } = useScroll();

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 30,
        restDelta: 0.001,
    });

    // Dot slides from top to bottom of the track
    const dotY = useTransform(scaleY, [0, 1], ["0%", "100%"]);

    // Fade in after a tiny scroll, fade out near the very bottom
    const opacity = useTransform(scrollYProgress, [0, 0.03, 0.97, 1], [0, 1, 1, 0]);

    return (
        <motion.div
            className="fixed right-5 top-1/2 -translate-y-1/2 z-[9999] pointer-events-none flex flex-col items-center"
            style={{ opacity }}
        >
            {/* Track */}
            <div className="relative w-[1.5px] h-28 rounded-full bg-[#469D89]/15">
                {/* Fill */}
                <motion.div
                    className="absolute top-0 left-0 w-full rounded-full bg-gradient-to-b from-[#469D89] to-[#5fb8a3] origin-top"
                    style={{ scaleY, height: "100%" }}
                />

                {/* Glowing dot at current scroll position */}
                <motion.div
                    className="absolute -left-[3px] w-[7px] h-[7px] rounded-full bg-[#469D89]"
                    style={{
                        top: dotY,
                        translateY: "-50%",
                        boxShadow:
                            "0 0 6px rgba(70,157,137,1), 0 0 14px rgba(70,157,137,0.7), 0 0 28px rgba(70,157,137,0.3)",
                    }}
                />
            </div>
        </motion.div>
    );
});
