"use client";

import React, { useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { ScanlineOverlay } from "@/components/core/ScanlineOverlay";

const PAGES = ["/gigs", "/services", "/about", "/design-system", "/comms"];

export function Shell({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const touchStartRef = useRef<{ x: number; y: number } | null>(null);

    const handleTouchStart = (e: React.TouchEvent) => {
        const touch = e.touches[0];
        touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (!touchStartRef.current) return;

        const touch = e.changedTouches[0];
        const deltaX = touch.clientX - touchStartRef.current.x;
        const deltaY = touch.clientY - touchStartRef.current.y;

        // Reset touch start
        touchStartRef.current = null;

        // Skip swipe navigation if the project modal is open
        if (typeof window !== "undefined" && window.location.search.includes("project=")) {
            return;
        }

        // Validate horizontal swipe (minimum 100px swipe width, minimal vertical drift)
        if (Math.abs(deltaX) > 100 && Math.abs(deltaY) < 60) {
            const currentIndex = PAGES.indexOf(pathname);
            if (currentIndex === -1) return;

            if (deltaX < 0) {
                // Swipe Left -> Navigate forward (Gigs -> Comms -> Process)
                if (currentIndex < PAGES.length - 1) {
                    router.push(PAGES[currentIndex + 1]);
                }
            } else {
                // Swipe Right -> Navigate backward (Process -> Comms -> Gigs)
                if (currentIndex > 0) {
                    router.push(PAGES[currentIndex - 1]);
                }
            }
        }
    };

    return (
        <div 
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="flex min-h-screen bg-surface-dark text-text-primary font-sans selection:bg-neon-cyan/30 selection:text-neon-cyan"
        >
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
