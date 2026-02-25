"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SystemBadgeProps {
    label: string;
    status?: "success" | "warning" | "error" | "neutral";
    className?: string;
}

export function SystemBadge({ label, status = "neutral", className }: SystemBadgeProps) {
    const colors = {
        success: "border-neon-cyan text-neon-cyan bg-neon-cyan/5",
        warning: "border-yellow-500 text-yellow-500 bg-yellow-500/5",
        error: "border-neon-red text-neon-red bg-neon-red/5",
        neutral: "border-text-muted text-text-muted bg-white/5",
    };

    return (
        <span
            className={cn(
                "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase border",
                colors[status],
                className
            )}
        >
            <span className={cn("inline-block w-1.5 h-1.5 rounded-full mr-1.5", status === 'neutral' ? 'bg-current' : 'animate-pulse bg-current')} />
            {label}
        </span>
    );
}
