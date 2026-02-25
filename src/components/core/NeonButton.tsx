"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface NeonButtonProps extends HTMLMotionProps<"button"> {
    variant?: "primary" | "secondary" | "danger";
    children: React.ReactNode;
}

export function NeonButton({ variant = "primary", className, children, ...props }: NeonButtonProps) {
    const variants = {
        primary: "border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10 hover:shadow-[0_0_20px_rgba(0,255,255,0.4)]",
        secondary: "border-text-muted text-text-muted hover:border-white hover:text-white hover:bg-white/5",
        danger: "border-neon-red text-neon-red hover:bg-neon-red/10 hover:shadow-[0_0_20px_rgba(255,0,60,0.4)]",
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
                "relative px-6 py-2 border font-mono uppercase tracking-widest text-sm transition-all duration-300",
                "before:absolute before:top-0 before:left-0 before:w-1 before:h-1 before:bg-current before:opacity-0 hover:before:opacity-100",
                "after:absolute after:bottom-0 after:right-0 after:w-1 after:h-1 after:bg-current after:opacity-0 hover:after:opacity-100",
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </motion.button>
    );
}
