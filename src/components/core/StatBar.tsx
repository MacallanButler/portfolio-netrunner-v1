"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatBarProps {
    label: string;
    value: number; // 0 to 100
    color?: string; // hex or tailwind class
    className?: string;
    showValue?: boolean;
}

export function StatBar({ label, value, color = "bg-neon-cyan", className, showValue = true }: StatBarProps) {
    return (
        <div className={cn("w-full py-2", className)}>
            <div className="flex justify-between text-xs uppercase tracking-wider text-text-muted mb-1">
                <span>{label}</span>
                {showValue && <span>{value}%</span>}
            </div>
            <div className="h-2 w-full bg-surface-overlay/50 relative overflow-hidden">
                {/* Background Grid/Tick marks */}
                <div className="absolute inset-0 w-full h-full bg-[linear-gradient(90deg,transparent_2px,rgba(0,0,0,1)_2px)] bg-[size:4px_100%] opacity-20 z-10" />

                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${value}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className={cn("h-full relative shadow-[0_0_10px_currentColor]", color)}
                    style={{ backgroundColor: color.startsWith("bg-") ? undefined : color }}
                >
                    <div className="absolute right-0 top-0 h-full w-1 bg-white/50 animate-pulse" />
                </motion.div>
            </div>
        </div>
    );
}
