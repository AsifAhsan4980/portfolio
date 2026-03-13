"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type GlassVariant = "default" | "elevated" | "bordered" | "glow";
type BlurLevel = "sm" | "md" | "lg" | "xl";

interface GlassCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
    children: React.ReactNode;
    variant?: GlassVariant;
    blur?: BlurLevel;
    hover?: boolean;
    className?: string;
}

const blurMap: Record<BlurLevel, string> = {
    sm: "backdrop-blur-sm",
    md: "backdrop-blur-md",
    lg: "backdrop-blur-lg",
    xl: "backdrop-blur-xl",
};

const variantStyles: Record<GlassVariant, string> = {
    default: "bg-[var(--glass-bg)] border-[var(--glass-border)]",
    elevated: "bg-[var(--glass-bg)] border-[var(--glass-border)] shadow-glass",
    bordered: "bg-transparent border-2 border-[#469D89]/30",
    glow: "bg-[var(--glass-bg)] border-[var(--glass-border)] shadow-glow",
};

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
    (
        {
            children,
            variant = "default",
            blur = "xl",
            hover = true,
            className,
            ...props
        },
        ref
    ) => {
        return (
            <motion.div
                ref={ref}
                className={cn(
                    "rounded-2xl border p-6",
                    blurMap[blur],
                    variantStyles[variant],
                    hover && "transition-all duration-300 ease-out hover:shadow-glow",
                    className
                )}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                {...props}
            >
                {children}
            </motion.div>
        );
    }
);

GlassCard.displayName = "GlassCard";

// Animated stat card variant for bento grids
interface StatCardProps extends GlassCardProps {
    value: string;
    label: string;
    icon?: React.ReactNode;
    size?: "normal" | "large" | "wide" | "tall";
}

const sizeStyles: Record<string, string> = {
    normal: "",
    large: "col-span-2 row-span-2",
    wide: "col-span-2",
    tall: "row-span-2",
};

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
    (
        {
            value,
            label,
            icon,
            size = "normal",
            className,
            ...props
        },
        ref
    ) => {
        return (
            <GlassCard
                ref={ref}
                variant="elevated"
                className={cn(
                    "flex flex-col justify-center items-center text-center",
                    sizeStyles[size],
                    className
                )}
                {...props}
            >
                {icon && (
                    <div className="mb-3 text-[#469D89]">
                        {icon}
                    </div>
                )}
                <motion.span
                    className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text-static"
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {value}
                </motion.span>
                <span className="mt-2 text-sm md:text-base text-muted-foreground">
                    {label}
                </span>
            </GlassCard>
        );
    }
);

StatCard.displayName = "StatCard";

export { GlassCard, StatCard };
export type { GlassCardProps, StatCardProps, GlassVariant, BlurLevel };
