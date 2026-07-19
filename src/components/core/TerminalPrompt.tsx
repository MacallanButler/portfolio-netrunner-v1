"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useAudio } from "@/context/AudioContext";
import { trackTerminalCommand, trackExternalLinkClick, trackEmailClick } from "@/lib/analytics";
import projectsData from "@/data/projects.json";

interface TerminalPromptProps {
    user?: string;
    host?: string;
    path?: string;
    command: string;
    output?: string | React.ReactNode;
    className?: string;
}

interface HistoryItem {
    cmd: string;
    out: React.ReactNode;
}

export function TerminalPrompt({
    user = "netrunner",
    host = "NIGHT-CITY",
    path = "~",
    command,
    output,
    className
}: TerminalPromptProps) {
    const { playClick, playKeypress, playGlitch } = useAudio();
    
    const [typedCommand, setTypedCommand] = useState("");
    const [isAutoTypingComplete, setIsAutoTypingComplete] = useState(false);
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [inputVal, setInputVal] = useState("");
    
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-type the initial command on mount
    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setTypedCommand(command.slice(0, index + 1));
            // Play a soft keypress sound for auto-typing if audio is enabled
            if (index % 2 === 0) {
                playKeypress();
            }
            index++;
            if (index >= command.length) {
                clearInterval(interval);
                setTimeout(() => {
                    // Complete typing and add first entry to history
                    setHistory([{ cmd: command, out: output }]);
                    setIsAutoTypingComplete(true);
                }, 400);
            }
        }, 55);
        return () => clearInterval(interval);
    }, [command, output, playKeypress]);

    // Scroll to bottom when history changes
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [history, typedCommand]);

    const focusInput = () => {
        if (inputRef.current) {
            inputRef.current.focus();
            playClick();
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputVal(e.target.value);
        // Play soft keypress sound when typing
        playKeypress();
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedCmd = inputVal.trim();
        if (!trimmedCmd) return;

        playClick();
        trackTerminalCommand(trimmedCmd);
        
        let response: React.ReactNode = "";
        const lowerCmd = trimmedCmd.toLowerCase();

        switch (lowerCmd) {
            case "help":
                response = (
                    <div className="space-y-1 text-xs text-text-muted">
                        <p>Available commands:</p>
                        <p>  <span className="text-neon-cyan">about</span>      - Personal details and status</p>
                        <p>  <span className="text-neon-cyan">projects</span>   - List of completed operations</p>
                        <p>  <span className="text-neon-cyan">contact</span>    - Communications and node links</p>
                        <p>  <span className="text-neon-cyan">clear</span>      - Clear system logs</p>
                        <p>  <span className="text-neon-cyan">github</span>     - Link to remote code repositories</p>
                        <p>  <span className="text-neon-cyan">linkedin</span>   - Connect on neural network</p>
                    </div>
                );
                break;
            case "about":
            case "whoami":
                response = (
                    <div className="space-y-1 text-xs text-text-muted">
                        <p><span className="text-neon-cyan">location:</span> Remote / Worldwide</p>
                        <p><span className="text-neon-cyan">specialty:</span> High-fidelity React interfaces & motion architecture</p>
                        <p><span className="text-neon-cyan">interfaces:</span> Next.js · TypeScript · CSS Grid/Flexbox</p>
                        <p><span className="text-neon-cyan">status:</span> Available for contracts and freelance deployments</p>
                    </div>
                );
                break;
            case "projects":
            case "gigs":
                response = (
                    <div className="space-y-1 text-xs text-text-muted">
                        <p className="text-white mb-1 font-semibold">PROJECT DATABASE:</p>
                        {projectsData.map(p => (
                            <p key={p.id}>
                              • <span className="text-neon-cyan">{p.title}</span> - {p.category} ({p.client})
                            </p>
                        ))}
                        <p className="text-[10px] text-text-muted/60 mt-1">To view full details, click project cards on the dashboard or archive grid.</p>
                    </div>
                );
                break;
            case "contact":
            case "comms":
                response = (
                    <div className="space-y-1 text-xs text-text-muted">
                        <p>COMMUNICATION LINK SETTINGS:</p>
                        <p>• Email: <a href="mailto:macallan@macallanbutler.com" onClick={() => trackEmailClick("terminal")} className="text-neon-cyan hover:underline">macallan@macallanbutler.com</a></p>
                        <p>• Form: Visit the <span className="text-neon-cyan">Contact</span> tab in the sidebar</p>
                        <p>• Net: Type <span className="text-neon-cyan">linkedin</span> or <span className="text-neon-cyan">github</span> to launch links</p>
                    </div>
                );
                break;
            case "github":
                response = <p className="text-xs text-text-muted">Opening GitHub repository profile...</p>;
                if (typeof window !== "undefined") {
                    trackExternalLinkClick("https://github.com/MacallanButler");
                    window.open("https://github.com/MacallanButler", "_blank");
                }
                break;
            case "linkedin":
                response = <p className="text-xs text-text-muted">Opening LinkedIn network card...</p>;
                if (typeof window !== "undefined") {
                    trackExternalLinkClick("https://linkedin.com");
                    window.open("https://linkedin.com", "_blank");
                }
                break;
            case "clear":
                setHistory([]);
                setInputVal("");
                return;
            case "hack":
            case "sudo":
                playGlitch();
                response = (
                    <div className="text-xs text-neon-cyan font-mono animate-pulse">
                        <p>ACCESSING BACKDOOR MAINFRAME...</p>
                        <p>DECRYPTING SYSTEM PORTAL... SUCCESS</p>
                        <p className="text-white mt-1">WELCOME OPERATOR. PORTFOLIO_OS CORE DECRYPTED.</p>
                    </div>
                );
                break;
            default:
                playGlitch();
                response = (
                    <p className="text-xs text-neon-red/80">
                        system: command not found: &apos;{trimmedCmd}&apos;. Type &apos;help&apos; for list.
                    </p>
                );
        }

        setHistory(prev => [...prev, { cmd: trimmedCmd, out: response }]);
        setInputVal("");
    };

    return (
        <div 
            ref={containerRef}
            onClick={focusInput}
            className={cn(
                "font-mono text-sm space-y-4 max-h-[300px] overflow-y-auto cursor-text scrollbar-none select-text p-2 bg-surface-dark/40 rounded-sm",
                className
            )}
        >
            {/* History Output */}
            {history.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                    <div className="flex items-center gap-2">
                        <span className="text-neon-cyan">{user}@{host}</span>
                        <span className="text-text-muted">:{path}$</span>
                        <span className="text-text-primary">{item.cmd}</span>
                    </div>
                    {item.out && (
                        <div className="text-text-muted pl-4 border-l border-white/10 mt-1">
                            {item.out}
                        </div>
                    )}
                </div>
            ))}

            {/* Auto Typing Render */}
            {!isAutoTypingComplete && (
                <div className="flex items-center gap-2">
                    <span className="text-neon-cyan">{user}@{host}</span>
                    <span className="text-text-muted">:{path}$</span>
                    <span className="text-text-primary">
                        {typedCommand}
                        <span className="inline-block w-2 h-4 bg-neon-cyan ml-1 animate-pulse" />
                    </span>
                </div>
            )}

            {/* Interactive Input Form */}
            {isAutoTypingComplete && (
                <form onSubmit={handleFormSubmit} className="flex items-center gap-2 pt-1">
                    <span className="text-neon-cyan">{user}@{host}</span>
                    <span className="text-text-muted">:{path}$</span>
                    <div className="flex-1 flex items-center relative">
                        <input
                            ref={inputRef}
                            type="text"
                            value={inputVal}
                            onChange={handleInputChange}
                            className="w-full bg-transparent border-none outline-none text-text-primary font-mono focus:ring-0 p-0 text-sm focus:outline-none"
                            maxLength={30}
                            placeholder="type 'help' for instructions..."
                            autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="none"
                            spellCheck={false}
                        />
                    </div>
                </form>
            )}
        </div>
    );
}
