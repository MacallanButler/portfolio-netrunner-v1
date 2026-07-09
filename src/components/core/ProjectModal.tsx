"use client";

import React, { useEffect } from "react";
import NextImage from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useProjectModal } from "@/context/ProjectModalContext";
import { SystemBadge } from "@/components/core/SystemBadge";
import { GlitchText } from "@/components/core/GlitchText";
import { getTechColor } from "@/lib/techColors";

const PREVIEW_MAP: Record<string, string> = {
  apex_drop:      "/previews/apex_drop.png",
  blue_horizon:   "/previews/blue_horizon.png",
  ghost_mountain: "/previews/ghost_mountain.png",
};

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
              </div>
            </div>

            {/* Body */}
            <div className="relative z-10 flex flex-col lg:flex-row flex-1 overflow-hidden">

              {/* LEFT: Meta panel — flex column, button pinned to bottom */}
              <motion.div
                className="lg:w-64 xl:w-72 flex-shrink-0 border-b lg:border-b-0 lg:border-r border-white/10 p-5 flex flex-col gap-3 overflow-hidden"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.3, ease: "easeOut" }}
              >
                {/* Title + category + client */}
                <div className="space-y-1.5">
                  <h2 className="text-xl font-bold tracking-tight text-white leading-tight">
                    <GlitchText text={activeProject?.title ?? ""} hover={false} />
                  </h2>
                  <SystemBadge
                    label={activeProject?.category ?? ""}
                    status="neutral"
                  />
                  <p className="font-mono text-[10px] text-text-muted tracking-widest uppercase">
                    {activeProject?.client}
                  </p>
                </div>

                <SystemBadge
                  label={activeProject?.status ?? ""}
                  status={activeProject?.status === "COMPLETED" ? "success" : "warning"}
                />

                {/* Description — clamped to 3 lines */}
                <div>
                  <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest mb-1">// OVERVIEW</p>
                  <p className="text-xs text-text-muted leading-relaxed line-clamp-3">{activeProject?.description}</p>
                </div>

                {/* Stack */}
                <div>
                  <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest mb-2">// STACK</p>
                  <div className="flex flex-wrap gap-1.5">
                    {activeProject?.techStack.map((tech) => {
                      const colors = getTechColor(tech);
                      return (
                        <span
                          key={tech}
                          className="text-[9px] font-mono px-1.5 py-0.5 rounded border tracking-wider"
                          style={{ backgroundColor: colors.bg, color: colors.text, borderColor: colors.border }}
                        >
                          {tech}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Shipped date */}
                <div className="border-t border-white/5 pt-2">
                  <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest mb-0.5">// SHIPPED</p>
                  <p className="font-mono text-[10px] text-white/50">
                    {activeProject ? new Date(activeProject.completionDate).toLocaleDateString("en-US", {
                      year: "numeric", month: "long",
                    }) : ""}
                  </p>
                </div>

                {/* LAUNCH SITE — pinned to bottom */}
                {activeProject?.liveUrl && (
                  <a
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto flex items-center justify-center gap-3 w-full px-4 py-3 border border-neon-cyan text-neon-cyan font-mono text-xs tracking-widest uppercase transition-all duration-200 hover:bg-neon-cyan/10 hover:shadow-[0_0_20px_rgba(0,255,0,0.2)] group flex-shrink-0"
                  >
                    <span>LAUNCH SITE</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
                  </a>
                )}
              </motion.div>

              {/* RIGHT: Showcase panel */}
              <motion.div
                className="flex-1 relative overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                {PREVIEW_MAP[activeProject?.id ?? ""] ? (
                  <NextImage
                    src={PREVIEW_MAP[activeProject?.id ?? ""]}
                    alt={`${activeProject?.title ?? ""} showcase`}
                    width={1920}
                    height={1080}
                    className="w-full h-auto object-contain"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center border border-dashed border-white/10">
                    <p className="font-mono text-[10px] text-neon-cyan/50 uppercase tracking-[0.3em]">SHOWCASE_PENDING</p>
                    <p className="font-mono text-xs text-white/20 mt-2">{activeProject?.id}</p>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}