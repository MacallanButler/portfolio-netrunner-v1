"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { GlitchText } from "@/components/core/GlitchText";
import { NeonButton } from "@/components/core/NeonButton";
import { trackPricingCtaClick } from "@/lib/analytics";

const BOOT_LOGS = [
  "INITIALIZING_SYSTEM...",
  "LOADING_SITE_ENGINE...",
  "SYNCING_PROJECT_DATABASE...",
  "ESTABLISHING_SECURE_CONNECTION...",
  "SYSTEM_READY.",
];

export default function BootSequence() {
  const router = useRouter();
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    if (sessionStorage.getItem("bootComplete") === "true") {
      const timer = setTimeout(() => {
        setLogs(BOOT_LOGS);
      }, 0);
      return () => clearTimeout(timer);
    }

    let delay = 0;
    BOOT_LOGS.forEach((log, index) => {
      delay += Math.random() * 400 + 200;
      setTimeout(() => {
        setLogs((prev) => [...prev, log]);
        if (index === BOOT_LOGS.length - 1) {
          sessionStorage.setItem("bootComplete", "true");
        }
      }, delay);
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-2xl mx-auto p-4">
      <h1 className="sr-only">MCB Systems | Full-Stack Development & UI Architecture Studio</h1>

      {/* Boot Logs Console (Non-blocking status readout) */}
      <div className="font-mono text-xs md:text-sm text-text-muted self-start mb-8 space-y-1 h-28 overflow-hidden border-l-2 border-neon-cyan/30 pl-3 w-full">
        {logs.length === 0 ? (
          <div className="text-neon-cyan/60 animate-pulse">&gt; INITIALIZING_SYSTEM...</div>
        ) : (
          logs.map((log, i) => (
            <div
              key={i}
              className={i === logs.length - 1 ? "text-neon-cyan transition-colors" : "text-text-muted"}
            >
              &gt; {log}
            </div>
          ))
        )}
      </div>

      {/* Hero Content (Rendered immediately on first paint for optimal LCP) */}
      <div className="text-center space-y-8 w-full">
        <div className="space-y-4">
          <div className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
            <GlitchText text="MCB_SYSTEMS" />
          </div>
          <h2 className="text-text-muted font-mono text-sm md:text-base font-normal">
            Full-Stack Development & UI Architecture Studio
          </h2>
          <div className="flex items-center justify-center gap-2 text-xs md:text-sm font-mono text-neon-cyan">
            <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
            <span>Open for new client work</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <NeonButton variant="primary" onClick={() => router.push("/gigs")}>
            View Archive
          </NeonButton>
          <NeonButton
            variant="secondary"
            onClick={() => {
              trackPricingCtaClick("hero");
              router.push("/comms");
            }}
          >
            Contact
          </NeonButton>
        </div>
      </div>
    </div>
  );
}
