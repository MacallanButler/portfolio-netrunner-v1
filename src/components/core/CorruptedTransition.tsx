"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, animate } from "framer-motion";

interface CorruptedTransitionProps {
  isPlaying: boolean;
  mode: "open" | "close";
  onComplete: () => void;
}

const GLITCH_POOL = "!@#$%^&*<>[]{}|/\\~`\xb1\xa7\u2591\u2592\u2593\u2588\u2584\u2580\u25a0\u25a1\u25aa\u25ab";

function randomGlitch(len: number) {
  return Array.from({ length: len }, () =>
    GLITCH_POOL[Math.floor(Math.random() * GLITCH_POOL.length)]
  ).join("");
}

function GlitchLine({ text, delay }: { text: string; delay: number }) {
  const [display, setDisplay] = React.useState(text);
  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplay(randomGlitch(text.length));
        i++;
        if (i > 6) { clearInterval(interval); setDisplay(text); }
      }, 40);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay]);
  return <span className="font-mono text-[10px] tracking-widest text-neon-cyan/40">{display}</span>;
}

export function CorruptedTransition({ isPlaying, mode, onComplete }: CorruptedTransitionProps) {
  const hasRun = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const overlayRef = useRef<HTMLDivElement>(null);
  const barFillRef = useRef<HTMLDivElement>(null);
  const glitchChunkRef = useRef<HTMLDivElement>(null);
  const errorFlashRef = useRef<HTMLDivElement>(null);
  const statusTextRef = useRef<HTMLDivElement>(null);
  const completeTextRef = useRef<HTMLDivElement>(null);

  const runOpen = useCallback(async () => {
    const el = {
      overlay: overlayRef.current,
      bar: barFillRef.current,
      chunk: glitchChunkRef.current,
      flash: errorFlashRef.current,
      status: statusTextRef.current,
      complete: completeTextRef.current,
    };
    if (!el.overlay || !el.bar || !el.chunk || !el.flash || !el.status || !el.complete) return;

    // Reset bar to 0, overlay at top
    await animate(el.bar, { scaleX: 0 }, { duration: 0 });
    await animate(el.overlay, { opacity: 1, y: "0%" }, { duration: 0.05 });

    // Fill to 68%
    await animate(el.bar, { scaleX: 0.68 }, { duration: 0.38, ease: [0.25, 0.1, 0.25, 1] });

    // Stall + glitch chunk
    await animate(el.chunk, { opacity: 1, x: 0 }, { duration: 0.06 });
    await new Promise(r => setTimeout(r, 180));

    // Flicker
    await animate(el.bar, { opacity: [1, 0, 1, 0.4, 1] }, { duration: 0.2 });
    await animate(el.status, { opacity: [1, 0, 1] }, { duration: 0.15 });

    // Error flash + slam to 100%
    await animate(el.flash, { opacity: [0, 0.6, 0] }, { duration: 0.12 });
    await animate(el.chunk, { opacity: 0 }, { duration: 0.05 });
    await animate(el.bar, { scaleX: 1 }, { duration: 0.12, ease: [0.7, 0, 1, 1] });

    // Swap to ACCESS_GRANTED
    await animate(el.status, { opacity: 0 }, { duration: 0.08 });
    await animate(el.complete, { opacity: 1 }, { duration: 0.1 });
    await new Promise(r => setTimeout(r, 200));

    // Sweep up and out
    await animate(el.overlay, { y: "-100%" }, { duration: 0.22, ease: [0.7, 0, 1, 1] });

    onCompleteRef.current();
    hasRun.current = false;
  }, []);

  const runClose = useCallback(async () => {
    const el = {
      overlay: overlayRef.current,
      bar: barFillRef.current,
      chunk: glitchChunkRef.current,
      flash: errorFlashRef.current,
      status: statusTextRef.current,
      complete: completeTextRef.current,
    };
    if (!el.overlay || !el.bar || !el.chunk || !el.flash || !el.status || !el.complete) return;

    // Reset text states for close mode
    await animate(el.status, { opacity: 0 }, { duration: 0 });
    await animate(el.complete, { opacity: 0 }, { duration: 0 });

    // Sweep in from top, bar starts full
    await animate(el.bar, { scaleX: 1, opacity: 1 }, { duration: 0 });
    await animate(el.overlay, { opacity: 1, y: "0%" }, { duration: 0.18, ease: [0.2, 0, 0, 1] });

    // Brief hold so user sees full bar
    await new Promise(r => setTimeout(r, 100));

    // Show TERMINATING status
    await animate(el.status, { opacity: 1 }, { duration: 0.08 });

    // Glitch chunk appears at right side
    await animate(el.chunk, { opacity: 1, x: 0 }, { duration: 0.06 });

    // Flicker
    await animate(el.bar, { opacity: [1, 0.3, 1, 0, 1] }, { duration: 0.18 });
    await animate(el.flash, { opacity: [0, 0.5, 0] }, { duration: 0.1 });

    // Drain to 0% fast
    await animate(el.chunk, { opacity: 0 }, { duration: 0.04 });
    await animate(el.bar, { scaleX: 0 }, { duration: 0.2, ease: [0.7, 0, 1, 1] });

    // Swap to CONNECTION_TERMINATED
    await animate(el.status, { opacity: 0 }, { duration: 0.06 });
    await animate(el.complete, { opacity: 1 }, { duration: 0.08 });
    await new Promise(r => setTimeout(r, 180));

    // Sweep back up
    await animate(el.overlay, { y: "-100%" }, { duration: 0.2, ease: [0.7, 0, 1, 1] });

    onCompleteRef.current();
    hasRun.current = false;
  }, []);

  useEffect(() => {
    if (!isPlaying || hasRun.current) return;
    hasRun.current = true;
    if (mode === "open") {
      runOpen();
    } else {
      runClose();
    }
  }, [isPlaying, mode, runOpen, runClose]);

  const isClose = mode === "close";

  return (
    <AnimatePresence>
      {isPlaying && (
        <div className="fixed inset-0 z-[60] pointer-events-none">
          <div
            ref={overlayRef}
            className="absolute inset-0 bg-surface-dark/95"
            style={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.35)_50%)] bg-[length:100%_3px] opacity-60" />
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `linear-gradient(rgba(0,255,0,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,0,0.8) 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            />
            <div ref={errorFlashRef} className="absolute inset-0 bg-neon-red/20" style={{ opacity: 0 }} />
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="w-full max-w-md px-8 space-y-5">
              <div className="flex flex-col gap-1 mb-6">
                {isClose ? (
                  <>
                    <GlitchLine text="TERMINATING_SESSION::PORTFOLIO_V2.1" delay={0} />
                    <GlitchLine text="CLOSING_SECURE_CHANNEL..." delay={60} />
                  </>
                ) : (
                  <>
                    <GlitchLine text="SYSTEM_ACCESS::PORTFOLIO_V2.1" delay={0} />
                    <GlitchLine text="INITIALIZING_SECURE_CHANNEL..." delay={80} />
                  </>
                )}
              </div>

              <div className="border-l-2 border-neon-cyan/50 pl-3 space-y-1">
                <p className="font-mono text-[10px] text-text-muted tracking-widest uppercase">
                  {isClose ? "PURGING_MODULE" : "LOADING_MODULE"}
                </p>
                <p className="font-mono text-sm text-white tracking-wider">
                  {isClose ? "PROJECT_DATA.flush" : "PROJECT_DATA.decrypt"}
                </p>
              </div>

              {/* Bar track */}
              <div className="relative">
                <div className="w-full h-[3px] bg-white/10 relative overflow-visible">
                  <div
                    ref={barFillRef}
                    className="absolute inset-y-0 left-0 w-full bg-neon-cyan origin-left"
                    style={{ transform: isClose ? "scaleX(1)" : "scaleX(0)" }}
                  />
                  <div
                    ref={glitchChunkRef}
                    className="absolute top-[-2px] h-[7px] w-[36px] bg-neon-red/80"
                    style={{ left: "62%", opacity: 0, transform: "translateX(8px)", mixBlendMode: "screen" }}
                  />
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-neon-cyan blur-[3px]" style={{ left: "68%" }} />
              </div>

              {/* Status */}
              <div className="flex items-center justify-between">
                <div ref={statusTextRef} className="flex items-center gap-2" style={{ opacity: isClose ? 0 : 1 }}>
                  <motion.div
                    className="w-1 h-1 rounded-full bg-neon-cyan"
                    animate={{ opacity: [1, 0.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                  />
                  <span className="font-mono text-[10px] text-neon-cyan/70 tracking-widest uppercase">
                    {isClose ? "TERMINATING..." : "ACCESSING..."}
                  </span>
                </div>
                <div
                  ref={completeTextRef}
                  className="font-mono text-[10px] text-neon-cyan tracking-widest uppercase"
                  style={{ opacity: 0 }}
                >
                  {isClose ? "CONNECTION_TERMINATED" : "ACCESS_GRANTED"}
                </div>
              </div>

              <div className="flex flex-col gap-1 pt-2 border-t border-white/5">
                {isClose ? (
                  <>
                    <GlitchLine text={`NODE_${Math.floor(Math.random() * 9999).toString().padStart(4, "0")}::DISCONNECTED`} delay={80} />
                    <GlitchLine text="FLUSHING_PAYLOAD ░░░░░░░░██ 22%" delay={160} />
                  </>
                ) : (
                  <>
                    <GlitchLine text={`NODE_${Math.floor(Math.random() * 9999).toString().padStart(4, "0")}::AUTHENTICATED`} delay={120} />
                    <GlitchLine text="DECRYPTING_PAYLOAD ████████░░ 78%" delay={200} />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}