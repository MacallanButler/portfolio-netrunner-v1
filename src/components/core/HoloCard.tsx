"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HoloCardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
}

export function HoloCard({ children, className, title, style, onClick }: HoloCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            style={style}
            onClick={onClick}
            className={cn(
                "relative overflow-hidden rounded-sm border border-white/10 bg-surface-card p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-neon-cyan/50 hover:shadow-[0_0_15px_rgba(0,255,255,0.1)]",
                className
            )}
        >
            {/* Scanline Overlay */}
            <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-20" />

            {/* Corner Accents */}
            <div className="absolute top-0 left-0 h-2 w-2 border-t-2 border-l-2 border-neon-cyan opacity-50" />
            <div className="absolute top-0 right-0 h-2 w-2 border-t-2 border-r-2 border-neon-cyan opacity-50" />
            <div className="absolute bottom-0 left-0 h-2 w-2 border-b-2 border-l-2 border-neon-cyan opacity-50" />
            <div className="absolute bottom-0 right-0 h-2 w-2 border-b-2 border-r-2 border-neon-cyan opacity-50" />

            {/* Header if title provided */}
            {title && (
                <div className="mb-4 flex items-center gap-2 border-b border-white/5 pb-2">
                    <div className="h-1.5 w-1.5 bg-neon-red animate-pulse" />
                    <h3 className="text-sm font-bold tracking-widest text-text-muted uppercase">{title}</h3>
                </div>
            )}

            {/* Content */}
            <div className="relative z-10">{children}</div>
        </motion.div>
    );
}
