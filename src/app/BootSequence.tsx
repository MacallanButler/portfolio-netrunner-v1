"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { GlitchText } from "@/components/core/GlitchText";
import { NeonButton } from "@/components/core/NeonButton";
import { trackPricingCtaClick } from "@/lib/analytics";
import { SiteGradeModule } from "@/components/core/SiteGradeModule";

const BOOT_LOGS = [
  "INITIALIZING_SYSTEM...",
  "LOADING_PORTFOLIO_ENGINE...",
  "SYNCING_PROJECT_DATABASE...",
  "ESTABLISHING_SECURE_CONNECTION...",
  "SYSTEM_READY.",
];

export default function BootSequence() {
  const router = useRouter();
  const [logs, setLogs] = useState<string[]>([]);
  const [bootComplete, setBootComplete] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("bootComplete") === "true") {
      setLogs(BOOT_LOGS);
      setBootComplete(true);
      return;
    }

    let delay = 0;
    BOOT_LOGS.forEach((log, index) => {
      delay += Math.random() * 500 + 300;
      setTimeout(() => {
        setLogs((prev) => [...prev, log]);
        if (index === BOOT_LOGS.length - 1) {
          setTimeout(() => {
            setBootComplete(true);
            sessionStorage.setItem("bootComplete", "true");
          }, 800);
        }
      }, delay);
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-2xl mx-auto p-4">
      <h1 className="sr-only">Macallan Butler | PORTFOLIO_OS Terminal Client</h1>

      {/* Boot Logs */}
      <div className="font-mono text-xs md:text-sm text-text-muted self-start mb-8 space-y-1 h-32 overflow-hidden">
        {logs.map((log, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={i === logs.length - 1 ? "text-neon-cyan" : ""}
          >
            {">"} {log}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {bootComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-8"
          >
            <div className="space-y-4">
              <div className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
                <GlitchText text="MACALLAN_BUTLER" />
              </div>
              <h2 className="text-text-muted font-mono text-sm md:text-base font-normal">
                Full-Stack Developer
              </h2>
              <h3 className="text-xs md:text-sm font-mono text-text-muted max-w-md mx-auto leading-relaxed">
                System status: <span className="text-neon-cyan animate-pulse">open to freelance clients and full-time teams</span>. Explore the archive below.
              </h3>
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

            <div className="w-full pt-4 text-left">
              <SiteGradeModule variant="homepage" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
