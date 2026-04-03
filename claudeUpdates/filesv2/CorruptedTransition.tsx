"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimate } from "framer-motion";

interface CorruptedTransitionProps {
  isPlaying: boolean;
  onComplete: () => void;
}

// Glitch characters for the corrupted text ticker
const GLITCH_POOL = "!@#$%^&*<>[]{}|/\\~`±§░▒▓█▄▀■□▪▫";

function randomGlitch(len: number) {
  return Array.from({ length: len }, () =>
    GLITCH_POOL[Math.floor(Math.random() * GLITCH_POOL.length)]
  ).join("");
}

// Individual glitch text line that scrambles on its own interval
function GlitchLine({ text, delay }: { text: string; delay: number }) {
  const [display, setDisplay] = React.useState(text);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplay(randomGlitch(text.length));
        i++;
        if (i > 6) {
          clearInterval(interval);
          setDisplay(text);
        }
      }, 40);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay]);

  return (
    <span className="font-mono text-[10px] tracking-widest text-neon-cyan/40">
      {display}
    </span>
  );
}

export function CorruptedTransition({ isPlaying, onComplete }: CorruptedTransitionProps) {
  const [scope, animate] = useAnimate();
  const hasRun = useRef(false);

  useEffect(() => {
    if (!isPlaying || hasRun.current) return;
    hasRun.current = true;

    async function runSequence() {
      if (!scope.current) return;

      // Phase 1: Overlay snaps in, bar begins filling
      await animate("#overlay", { opacity: 1 }, { duration: 0.05 });
      await animate("#bar-fill", { scaleX: 0.68 }, { duration: 0.38, ease: [0.25, 0.1, 0.25, 1] });

      // Phase 2: Stall — bar freezes, glitch chunk appears
      await animate("#glitch-chunk", { opacity: 1, x: 0 }, { duration: 0.06 });
      await animate("#bar-fill", { scaleX: 0.68 }, { duration: 0.18 }); // hold

      // Phase 3: Flicker — bar and overlay flash
      await animate("#bar-fill", { opacity: [1, 0, 1, 0.4, 1] }, { duration: 0.2 });
      await animate("#status-text", { opacity: [1, 0, 1] }, { duration: 0.15 });

      // Phase 4: Error flash, then slam to 100%
      await animate("#error-flash", { opacity: [0, 0.6, 0] }, { duration: 0.12 });
      await animate("#glitch-chunk", { opacity: 0 }, { duration: 0.05 });
      await animate("#bar-fill", { scaleX: 1 }, { duration: 0.12, ease: [0.7, 0, 1, 1] });

      // Phase 5: Hold at 100%, then snap out
      await animate("#status-text", { opacity: 0 }, { duration: 0.08 });
      await animate("#complete-text", { opacity: 1 }, { duration: 0.1 });
      await new Promise((r) => setTimeout(r, 180));

      // Phase 6: Overlay sweeps out upward
      await animate("#overlay", { y: "-100%", opacity: 1 }, { duration: 0.22, ease: [0.7, 0, 1, 1] });

      onComplete();
      hasRun.current = false;
    }

    runSequence();
  }, [isPlaying, animate, scope, onComplete]);

  return (
    <AnimatePresence>
      {isPlaying && (
        <motion.div
          ref={scope}
          className="fixed inset-0 z-[60] pointer-events-none flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
        >
          {/* Full overlay — dark with scanlines */}
          <div
            id="overlay"
            className="absolute inset-0 bg-surface-dark/95"
            style={{ opacity: 0 }}
          >
            {/* Scanline texture */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.35)_50%)] bg-[length:100%_3px] opacity-60" />

            {/* Background grid */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `linear-gradient(rgba(0,255,0,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,0,0.8) 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            />

            {/* Error flash overlay */}
            <div
              id="error-flash"
              className="absolute inset-0 bg-neon-red/20"
              style={{ opacity: 0 }}
            />
          </div>

          {/* Content — centered */}
          <div className="relative z-10 w-full max-w-md px-8 space-y-5">

            {/* Header glitch lines */}
            <div className="flex flex-col gap-1 mb-6">
              <GlitchLine text="SYSTEM_ACCESS::PORTFOLIO_V2.1" delay={0} />
              <GlitchLine text="INITIALIZING_SECURE_CHANNEL..." delay={80} />
            </div>

            {/* Project title area */}
            <div className="border-l-2 border-neon-cyan/50 pl-3 space-y-1">
              <p className="font-mono text-[10px] text-text-muted tracking-widest uppercase">
                LOADING_MODULE
              </p>
              <p className="font-mono text-sm text-white tracking-wider">
                PROJECT_DATA.decrypt
              </p>
            </div>

            {/* Bar track */}
            <div className="relative">
              {/* Track background */}
              <div className="w-full h-[3px] bg-white/10 relative overflow-visible">
                {/* Bar fill */}
                <div
                  id="bar-fill"
                  className="absolute inset-y-0 left-0 w-full bg-neon-cyan origin-left"
                  style={{ scaleX: 0, opacity: 1 }}
                />

                {/* Glitch displacement chunk */}
                <div
                  id="glitch-chunk"
                  className="absolute top-[-2px] h-[7px] w-[36px] bg-neon-red/80"
                  style={{
                    left: "62%",
                    opacity: 0,
                    x: 8,
                    mixBlendMode: "screen",
                  }}
                />
              </div>

              {/* Bar end glow — tracks with fill */}
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-neon-cyan blur-[3px]"
                style={{ left: "68%" }}
              />
            </div>

            {/* Status text */}
            <div className="flex items-center justify-between">
              <div id="status-text" className="flex items-center gap-2" style={{ opacity: 1 }}>
                <motion.div
                  className="w-1 h-1 rounded-full bg-neon-cyan"
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                />
                <span className="font-mono text-[10px] text-neon-cyan/70 tracking-widest uppercase">
                  ACCESSING...
                </span>
              </div>

              <div
                id="complete-text"
                className="font-mono text-[10px] text-neon-cyan tracking-widest uppercase"
                style={{ opacity: 0 }}
              >
                ACCESS_GRANTED
              </div>
            </div>

            {/* Footer glitch lines */}
            <div className="flex flex-col gap-1 pt-2 border-t border-white/5">
              <GlitchLine text={`NODE_${Math.floor(Math.random() * 9999).toString().padStart(4,"0")}::AUTHENTICATED`} delay={120} />
              <GlitchLine text="DECRYPTING_PAYLOAD ████████░░ 78%" delay={200} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
