"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
    FolderKanban,
    Terminal,
    BarChart3,
    Mail,
    LayoutTemplate,
    Menu,
    X
} from "lucide-react";
import { GlitchText } from "@/components/core/GlitchText";

const NAVIGATION = [
    { name: "DASHBOARD", path: "/dashboard", icon: LayoutTemplate },
    { name: "PROJECTS", path: "/gigs", icon: FolderKanban },
    { name: "SKILLS", path: "/cyberware", icon: BarChart3 },
    { name: "CONTACT", path: "/comms", icon: Mail },
    { name: "SYSTEM", path: "/design-system", icon: Terminal },
];

export function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Menu Toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-4 right-4 z-50 md:hidden p-2 border border-neon-cyan text-neon-cyan bg-surface-dark/90 backdrop-blur-sm"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar Container */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-40 w-64 transform bg-surface-card border-r border-white/10 transition-transform duration-300 md:translate-x-0",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex flex-col h-full relative overflow-hidden">
                    {/* Scanline overlay for sidebar */}
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_2px,3px_100%] z-0" />

                    {/* Header */}
                    <div className="p-6 border-b border-white/10 relative z-10">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse" />
                            <span className="text-xs font-mono text-neon-cyan tracking-widest">NETRUNNER_OS</span>
                        </div>
                        <h1 className="text-xl font-bold tracking-tighter">
                            <GlitchText text="MB_SYSTEMS" />
                        </h1>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 py-8 space-y-2 relative z-10 px-4">
                        {NAVIGATION.map((item) => {
                            const isActive = pathname === item.path || (item.path !== "/" && pathname?.startsWith(item.path));
                            const Icon = item.icon;

                            return (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className={cn(
                                        "group flex items-center gap-4 px-4 py-3 text-sm font-mono tracking-wider transition-all duration-300 border-l-2",
                                        isActive
                                            ? "border-neon-cyan bg-neon-cyan/5 text-neon-cyan"
                                            : "border-transparent text-text-muted hover:text-text-primary hover:bg-white/5 hover:border-white/20"
                                    )}
                                    onClick={() => setIsOpen(false)}
                                >
                                    <Icon size={18} className={cn("transition-colors", isActive ? "text-neon-cyan" : "text-text-muted group-hover:text-text-primary")} />
                                    <span>{item.name}</span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="sidebar-active"
                                            className="absolute right-4 w-1.5 h-1.5 bg-neon-cyan rounded-full shadow-[0_0_10px_#00FFFF]"
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Footer / System Status */}
                    <div className="p-6 border-t border-white/10 relative z-10">
                        <div className="space-y-4">
                            <div className="flex justify-between text-xs font-mono text-text-muted">
                                <span>CPU</span>
                                <span>12%</span>
                            </div>
                            <div className="w-full h-1 bg-surface-dark">
                                <div className="w-[12%] h-full bg-neon-cyan/50" />
                            </div>

                            <div className="flex justify-between text-xs font-mono text-text-muted">
                                <span>MEM</span>
                                <span>34%</span>
                            </div>
                            <div className="w-full h-1 bg-surface-dark">
                                <div className="w-[34%] h-full bg-neon-cyan/50" />
                            </div>

                            <div className="pt-4 flex items-center justify-between text-[10px] text-text-muted uppercase tracking-widest border-t border-white/5 mt-4">
                                <span>Status:</span>
                                <span className="text-neon-cyan animate-pulse">Online</span>
                            </div>

                            <div className="flex items-center justify-between text-[10px] text-text-muted uppercase tracking-widest pt-2">
                                <span>Audio:</span>
                                <button className="text-white hover:text-neon-cyan transition-colors">
                                    [ MUTE ]
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/80 z-30 md:hidden backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
