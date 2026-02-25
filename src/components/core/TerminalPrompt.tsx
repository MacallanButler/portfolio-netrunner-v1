"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TerminalPromptProps {
    user?: string;
    host?: string;
    path?: string;
    command: string;
    output?: string | React.ReactNode;
    className?: string;
}

export function TerminalPrompt({
    user = "netrunner",
    host = "NIGHT-CITY",
    path = "~",
    command,
    output,
    className
}: TerminalPromptProps) {
    const [typedCommand, setTypedCommand] = useState("");

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setTypedCommand(command.slice(0, index + 1));
            index++;
            if (index >= command.length) clearInterval(interval);
        }, 50);
        return () => clearInterval(interval);
    }, [command]);

    return (
        <div className={cn("font-mono text-sm space-y-2", className)}>
            <div className="flex flex-wrap gap-2 items-center">
                <span className="text-neon-cyan">{user}@{host}</span>
                <span className="text-text-muted">:{path}$</span>
                <span className="text-text-primary">
                    {typedCommand}
                    <span className="inline-block w-2 h-4 bg-neon-cyan ml-1 animate-pulse" />
                </span>
            </div>
            {output && typedCommand === command && (
                <div className="text-text-muted pl-4 border-l-2 border-white/10 mt-2">
                    {output}
                </div>
            )}
        </div>
    );
}
