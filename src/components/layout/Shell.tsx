"use client";

import React from "react";
import { Sidebar } from "./Sidebar";
import { ScanlineOverlay } from "@/components/core/ScanlineOverlay";

export function Shell({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-surface-dark text-text-primary font-sans selection:bg-neon-cyan/30 selection:text-neon-cyan">
            <ScanlineOverlay />

            {/* Background Grid */}
            <div
                className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(var(--text-muted) 1px, transparent 1px), linear-gradient(90deg, var(--text-muted) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            <Sidebar />

            <main className="flex-1 md:pl-64 relative z-10 overflow-x-hidden min-h-screen">
                <div className="p-6 md:p-12 lg:p-16 max-w-7xl mx-auto w-full">
                    {children}
                </div>
            </main>
        </div>
    );
}
