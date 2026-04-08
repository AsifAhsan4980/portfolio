"use client";
import { memo, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default memo(function CustomCursor() {
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isPointerFine, setIsPointerFine] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    // Dot follows precisely
    const dotX = useSpring(mouseX, { damping: 32, stiffness: 600, mass: 0.4 });
    const dotY = useSpring(mouseY, { damping: 32, stiffness: 600, mass: 0.4 });

    // Ring lags behind for satisfying trail effect
    const ringX = useSpring(mouseX, { damping: 20, stiffness: 140, mass: 1 });
    const ringY = useSpring(mouseY, { damping: 20, stiffness: 140, mass: 1 });

    useEffect(() => {
        setIsPointerFine(window.matchMedia("(pointer: fine)").matches);
    }, []);

    useEffect(() => {
        if (!isPointerFine) return;

        const onMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const onOver = (e: MouseEvent) => {
            const el = e.target as HTMLElement;
            setIsHovering(!!el.closest('a, button, [role="button"], input, textarea, select, label, [data-cursor-hover]'));
        };

        const onDown = () => setIsClicking(true);
        const onUp = () => setIsClicking(false);

        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseover", onOver);
        window.addEventListener("mousedown", onDown);
        window.addEventListener("mouseup", onUp);
        return () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseover", onOver);
            window.removeEventListener("mousedown", onDown);
            window.removeEventListener("mouseup", onUp);
        };
    }, [isPointerFine, isVisible, mouseX, mouseY]);

    if (!isPointerFine) return null;

    return (
        <>
            {/* Inner dot — precise, instant */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-[#469D89]"
                style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
                animate={{
                    width: isClicking ? 4 : isHovering ? 6 : 8,
                    height: isClicking ? 4 : isHovering ? 6 : 8,
                    opacity: isVisible ? 1 : 0,
                }}
                transition={{ duration: 0.1 }}
            />

            {/* Outer ring — lagging spring trail */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border"
                style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
                animate={{
                    width: isClicking ? 24 : isHovering ? 48 : 30,
                    height: isClicking ? 24 : isHovering ? 48 : 30,
                    opacity: isVisible ? (isHovering ? 0.9 : 0.45) : 0,
                    borderColor: isHovering ? "rgba(70,157,137,1)" : "rgba(70,157,137,0.55)",
                    backgroundColor: isHovering ? "rgba(70,157,137,0.08)" : "transparent",
                }}
                transition={{ type: "spring", damping: 22, stiffness: 200, mass: 0.6 }}
            />
        </>
    );
});
