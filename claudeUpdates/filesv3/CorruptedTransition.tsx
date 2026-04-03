"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimate } from "framer-motion";

interface CorruptedTransitionProps {
  isPlaying: boolean;
  onComplete: () => void;
}

const GLITCH_POOL = "!@#$%^&*<>[]{}|/\\~\`\xb1\xa7\u2591\u2592\u2593\u2588\u2584\u2580\u25a0\u25a1\u25aa\u25ab";

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
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (!isPlaying || hasRun.current) return;
    hasRun.current = true;

    async function runSequence() {
      if (!scope.current) return;

      await animate("#ct-overlay", { opacity: 1 }, { duration: 0.05 });
      await animate("#ct-bar-fill", { scaleX: 0.68 }, { duration: 0.38, ease: [0.25, 0.1, 0.25, 1] });

      await animate("#ct-glitch-chunk", { opacity: 1, x: 0 }, { duration: 0.06 });
      await animate("#ct-bar-fill", { scaleX: 0.68 }, { duration: 0.18 });

      await animate("#ct-bar-fill", { opacity: [1, 0, 1, 0.4, 1] }, { duration: 0.2 });
      await animate("#ct-status-text", { opacity: [1, 0, 1] }, { duration: 0.15 });

      await animate("#ct-error-flash", { opacity: [0, 0.6, 0] }, { duration: 0.12 });
      await animate("#ct-glitch-chunk", { opacity: 0 }, { duration: 0.05 });
      await animate("#ct-bar-fill", { scaleX: 1 }, { duration: 0.12, ease: [0.7, 0, 1, 1] });

      await animate("#ct-status-text", { opacity: 0 }, { duration: 0.08 });
      await animate("#ct-complete-text", { opacity: 1 }, { duration: 0.1 });
      await new Promise((r) => setTimeout(r, 180));

      await animate("#ct-overlay", { y: "-100%" }, { duration: 0.22, ease: [0.7, 0, 1, 1] });

      onCompleteRef.current();
      hasRun.current = false;
    }

    runSequence();
  }, [isPlaying, animate, scope]);

  return (
    <AnimatePresence>
      {isPlaying && (
        <motion.div
          ref={scope}
          className="fixed inset-0 z-[60] pointer-events-none flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
        >
          {/* Full overlay */}
          <motion.div
            id="ct-overlay"
            className="absolute inset-0 bg-surface-dark/95"
            initial={{ opacity: 0 }}
          >
            {/* Scanlines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.35)_50%)] bg-[length:100%_3px] opacity-60" />

            {/* Grid */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `linear-gradient(rgba(0,255,0,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,0,0.8) 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            />

            {/* Error flash */}
            <motion.div
              id="ct-error-flash"
              className="absolute inset-0 bg-neon-red/20"
              initial={{ opacity: 0 }}
            />
          </motion.div>

          {/* Content */}
          <div className="relative z-10 w-full max-w-md px-8 space-y-5">
            <div className="flex flex-col gap-1 mb-6">
              <GlitchLine text="SYSTEM_ACCESS::PORTFOLIO_V2.1" delay={0} />
              <GlitchLine text="INITIALIZING_SECURE_CHANNEL..." delay={80} />
            </div>

            <div className="border-l-2 border-neon-cyan/50 pl-3 space-y-1">
              <p className="font-mono text-[10px] text-text-muted tracking-widest uppercase">
                LOADING_MODULE
              </p>
              <p className="font-mono text-sm text-white tracking-wider">
                PROJECT_DATA.decrypt
              </p>
            </div>

            {/* Bar */}
            <div className="relative">
              <div className="w-full h-[3px] bg-white/10 relative overflow-visible">
                <motion.div
                  id="ct-bar-fill"
                  className="absolute inset-y-0 left-0 w-full bg-neon-cyan origin-left"
                  initial={{ scaleX: 0 }}
                />
                <motion.div
                  id="ct-glitch-chunk"
                  className="absolute top-[-2px] h-[7px] w-[36px] bg-neon-red/80"
                  style={{ left: "62%", mixBlendMode: "screen" }}
                  initial={{ opacity: 0, x: 8 }}
                />
              </div>
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-neon-cyan blur-[3px]"
                style={{ left: "68%" }}
              />
            </div>

            {/* Status */}
            <div className="flex items-center justify-between">
              <motion.div
                id="ct-status-text"
                className="flex items-center gap-2"
                initial={{ opacity: 1 }}
              >
                <motion.div
                  className="w-1 h-1 rounded-full bg-neon-cyan"
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                />
                <span className="font-mono text-[10px] text-neon-cyan/70 tracking-widest uppercase">
                  ACCESSING...
                </span>
              </motion.div>

              <motion.div
                id="ct-complete-text"
                className="font-mono text-[10px] text-neon-cyan tracking-widest uppercase"
                initial={{ opacity: 0 }}
              >
                ACCESS_GRANTED
              </motion.div>
            </div>

            <div className="flex flex-col gap-1 pt-2 border-t border-white/5">
              <GlitchLine text={`NODE_${Math.floor(Math.random() * 9999).toString().padStart(4, "0")}::AUTHENTICATED`} delay={120} />
              <GlitchLine text="DECRYPTING_PAYLOAD ████████░░ 78%" delay={200} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
