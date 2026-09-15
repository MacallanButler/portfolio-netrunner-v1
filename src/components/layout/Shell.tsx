"use client";

import React, { useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";
import { ScanlineOverlay } from "@/components/core/ScanlineOverlay";
import { cn } from "@/lib/utils";

const PAGES = ["/gigs", "/services", "/sitegrade", "/about", "/process", "/contact"];

export function Shell({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const isContact = pathname === "/contact" || pathname === "/comms";
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

    const isStandalone = pathname === "/cdm";

    if (isStandalone) {
        return (
            <div 
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

                <main className="flex-1 relative z-10 overflow-x-hidden min-h-screen">
                    <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto w-full">
                        {children}
                    </div>
                </main>
            </div>
        );
    }

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

            <main className={cn(
                "flex-1 md:pl-64 relative z-10 overflow-x-hidden flex flex-col justify-between pt-14 md:pt-0",
                isContact ? "min-h-screen md:h-screen md:max-h-screen md:overflow-hidden" : "min-h-screen"
            )}>
                <div className={cn(
                    "p-4 sm:p-6 max-w-7xl mx-auto w-full flex-1",
                    isContact ? "md:px-8 md:py-3 lg:px-12 lg:py-4 flex flex-col justify-center" : "md:p-12 lg:p-16"
                )}>
                    {children}
                </div>
                <Footer isContact={isContact} />
            </main>
        </div>
    );
}
