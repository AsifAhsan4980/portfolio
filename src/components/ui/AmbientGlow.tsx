"use client";
import { memo, useEffect, useRef, useState } from "react";

export default memo(function AmbientGlow() {
    const glowRef = useRef<HTMLDivElement>(null);
    const [isPointerFine, setIsPointerFine] = useState(false);

    useEffect(() => {
        setIsPointerFine(window.matchMedia("(pointer: fine)").matches);
    }, []);

    useEffect(() => {
        if (!isPointerFine) return;
        const el = glowRef.current;
        if (!el) return;

        const handleMouseMove = (e: MouseEvent) => {
            el.style.left = `${e.clientX}px`;
            el.style.top = `${e.clientY}px`;
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [isPointerFine]);

    if (!isPointerFine) return null;

    return (
        <div
            ref={glowRef}
            className="fixed pointer-events-none z-0"
            style={{
                width: 700,
                height: 700,
                left: -1000,
                top: -1000,
                transform: "translate(-50%, -50%)",
                background:
                    "radial-gradient(circle, rgba(70,157,137,0.045) 0%, rgba(70,157,137,0.015) 35%, transparent 65%)",
                borderRadius: "50%",
                transition: "left 0.15s ease-out, top 0.15s ease-out",
                willChange: "left, top",
            }}
        />
    );
});
