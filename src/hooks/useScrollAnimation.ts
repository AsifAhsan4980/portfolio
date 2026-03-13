"use client";

import { useInView } from "framer-motion";
import { useRef, RefObject } from "react";

type AnimationPreset = "fadeInUp" | "fadeInScale" | "fadeInLeft" | "fadeInRight" | "stagger";

interface ScrollAnimationOptions {
    threshold?: number;
    once?: boolean;
    delay?: number;
}

interface AnimationVariants {
    hidden: Record<string, number | string>;
    visible: Record<string, number | string>;
}

const presets: Record<AnimationPreset, AnimationVariants> = {
    fadeInUp: {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
    },
    fadeInScale: {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
    },
    fadeInLeft: {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0 },
    },
    fadeInRight: {
        hidden: { opacity: 0, x: 30 },
        visible: { opacity: 1, x: 0 },
    },
    stagger: {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    },
};

export function useScrollAnimation(
    preset: AnimationPreset = "fadeInUp",
    options: ScrollAnimationOptions = {}
) {
    const { threshold = 0.1, once = true, delay = 0 } = options;
    const ref = useRef<HTMLDivElement>(null);
    const marginValue = `-${Math.round(threshold * 100)}px 0px` as const;
    const isInView = useInView(ref, {
        once,
        margin: marginValue as unknown as `${number}px ${number}px ${number}px ${number}px`
    });

    const variants = presets[preset];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: delay,
            },
        },
    };

    const itemVariants = {
        hidden: variants.hidden,
        visible: {
            ...variants.visible,
            transition: {
                duration: 0.5,
                ease: "easeOut",
            },
        },
    };

    return {
        ref,
        isInView,
        containerVariants,
        itemVariants,
        animate: isInView ? "visible" : "hidden",
    };
}

// Hook for creating staggered children animations
export function useStaggerAnimation(itemCount: number, staggerDelay: number = 0.1) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut",
            },
        },
    };

    return {
        ref,
        isInView,
        containerVariants,
        itemVariants,
        animate: isInView ? "visible" : "hidden",
    };
}

// Typing effect hook
export function useTypingEffect(
    text: string
): { displayText: string; isComplete: boolean; ref: RefObject<HTMLSpanElement | null> } {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });

    // We'll use CSS animation instead of useState for better performance
    // This returns the full text and lets CSS handle the typing effect
    return {
        displayText: text,
        isComplete: isInView,
        ref,
    };
}

export default useScrollAnimation;
