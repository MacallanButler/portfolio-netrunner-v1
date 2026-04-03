"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProjectModal } from "@/context/ProjectModalContext";
import { SystemBadge } from "@/components/core/SystemBadge";
import { GlitchText } from "@/components/core/GlitchText";
import { getTechColor } from "@/lib/techColors";

export function ProjectModal() {
  const { activeProject, isClosing, closeProject } = useProjectModal();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeProject && !isClosing) closeProject();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeProject, activeProject, isClosing]);

  const isVisible = !!activeProject || isClosing;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-40 bg-surface-dark/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={!isClosing ? closeProject : undefined}
          />

          {/* Modal — no layoutId, no spring, clean cut */}
          <motion.div
            key="modal"
            className="fixed inset-4 md:inset-8 lg:inset-12 z-50 flex flex-col rounded-sm border border-neon-cyan/30 bg-surface-card overflow-hidden shadow-[0_0_60px_rgba(0,255,0,0.08)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12, ease: "linear" }}
          >
            {/* Scanline overlay */}
            <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.18)_50%)] bg-[length:100%_3px] opacity-10" />

            {/* Corner accents */}
            <div className="absolute top-0 left-0 h-3 w-3 border-t-2 border-l-2 border-neon-cyan opacity-70 z-10" />
            <div className="absolute top-0 right-0 h-3 w-3 border-t-2 border-r-2 border-neon-cyan opacity-70 z-10" />
            <div className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-neon-cyan opacity-70 z-10" />
            <div className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-neon-cyan opacity-70 z-10" />

            {/* Header bar */}
            <div className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/10 flex-shrink-0">
              <button
                onClick={!isClosing ? closeProject : undefined}
                disabled={isClosing}
                className="group font-mono text-[10px] tracking-widest uppercase text-text-muted hover:text-neon-cyan transition-colors duration-150 disabled:opacity-30 disabled:pointer-events-none"
              >
                <span className="border border-current px-1.5 py-0.5 opacity-50 group-hover:opacity-100 transition-opacity">ESC</span>
              </button>

              <div className="flex items-center gap-4 font-mono text-[10px] text-text-muted">
                {activeProject?.repoUrl && (
                  <a href={activeProject.repoUrl} target="_blank" rel="noopener noreferrer"
                    className="hover:text-neon-cyan transition-colors tracking-widest uppercase">
                    [ SOURCE ]
                  </a>
                )}
                {activeProject?.liveUrl && (
                  <a href={activeProject.liveUrl} target="_blank" rel="noopener noreferrer"
                    className="hover:text-neon-cyan transition-colors tracking-widest uppercase">
                    [ LIVE ]
                  </a>
                )}
              </div>
            </div>

            {/* Body */}
            <div className="relative z-10 flex flex-col lg:flex-row flex-1 overflow-hidden">

              {/* LEFT: Meta panel */}
              <motion.div
                className="lg:w-72 xl:w-80 flex-shrink-0 border-b lg:border-b-0 lg:border-r border-white/10 p-6 overflow-y-auto space-y-6"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.3, ease: "easeOut" }}
              >
                {/* Title → category badge → client, all left-aligned */}
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold tracking-tight text-white leading-tight">
                    <GlitchText text={activeProject?.title ?? ""} hover={false} />
                  </h2>
                  <SystemBadge
                    label={activeProject?.category ?? ""}
                    status="neutral"
                  />
                  <p className="font-mono text-xs text-text-muted tracking-widest uppercase">
                    {activeProject?.client}
                  </p>
                </div>

                <SystemBadge
                  label={activeProject?.status ?? ""}
                  status={activeProject?.status === "COMPLETED" ? "success" : "warning"}
                />

                <div>
                  <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest mb-2">// OVERVIEW</p>
                  <p className="text-sm text-text-muted leading-relaxed">{activeProject?.description}</p>
                </div>

                <div>
                  <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest mb-3">// STACK</p>
                  <div className="flex flex-wrap gap-2">
                    {activeProject?.techStack.map((tech) => {
                      const colors = getTechColor(tech);
                      return (
                        <span
                          key={tech}
                          className="text-[10px] font-mono px-2 py-1 rounded border tracking-wider"
                          style={{ backgroundColor: colors.bg, color: colors.text, borderColor: colors.border }}
                        >
                          {tech}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5">
                  <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest mb-1">// SHIPPED</p>
                  <p className="font-mono text-xs text-white/60">
                    {activeProject ? new Date(activeProject.completionDate).toLocaleDateString("en-US", {
                      year: "numeric", month: "long", day: "numeric",
                    }) : ""}
                  </p>
                </div>
              </motion.div>

              {/* RIGHT: Showcase panel */}
              <motion.div
                className="flex-1 relative overflow-hidden flex items-center justify-center p-6 lg:p-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <ShowcasePlaceholder id={activeProject?.id ?? ""} />
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function ShowcasePlaceholder({ id }: { id: string }) {
  return (
    <div className="w-full h-full min-h-[300px] flex flex-col items-center justify-center border border-dashed border-white/10 rounded-sm relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(0,255,0,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,0,0.2) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />
      <motion.div
        className="absolute left-0 right-0 h-px bg-neon-cyan/30"
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
      <div className="relative z-10 text-center space-y-3">
        <p className="font-mono text-[10px] text-neon-cyan/50 uppercase tracking-[0.3em]">SHOWCASE_PENDING</p>
        <p className="font-mono text-xs text-white/20">{id}</p>
      </div>
    </div>
  );
}