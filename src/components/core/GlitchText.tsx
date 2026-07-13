"use client";

import React, { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

const GLITCH_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_";

interface GlitchTextProps {
    text: string;
    className?: string;
    hover?: boolean;
}

export function GlitchText({ text, className, hover = true }: GlitchTextProps) {
    const [displayText, setDisplayText] = useState(text);
    const [isGlitching, setIsGlitching] = useState(false);

    const glitch = useCallback(() => {
        if (isGlitching) return;
        setIsGlitching(true);

        let iteration = 0;
        const interval = setInterval(() => {
            setDisplayText((current) =>
                text
                    .split("")
                    .map((char, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
                    })
                    .join("")
            );

            if (iteration >= text.length) {
                clearInterval(interval);
                setIsGlitching(false);
            }

            // Speed up resolution for longer texts to prevent layout shifting/jittering
            iteration += Math.max(1 / 3, text.length / 25);
        }, 30);
    }, [text, isGlitching]);

    // Initial glitch on mount
    useEffect(() => {
        glitch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <span
            className={cn("inline-block font-mono tracking-normal", className)}
            onMouseEnter={hover ? glitch : undefined}
        >
            {displayText}
        </span>
    );
}
