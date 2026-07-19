"use client";

import React, { useEffect } from "react";
import NextImage from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useProjectModal } from "@/context/ProjectModalContext";
import { SystemBadge } from "@/components/core/SystemBadge";
import { GlitchText } from "@/components/core/GlitchText";
import { getTechColor } from "@/lib/techColors";
import { cn } from "@/lib/utils";
import { trackExternalLinkClick } from "@/lib/analytics";
import { useAudio } from "@/context/AudioContext";

const PREVIEW_MAP: Record<string, string> = {
  apex_drop:      "/previews/apex_drop.webp",
  blue_horizon:   "/previews/blue_horizon.webp",
  ghost_mountain: "/previews/ghost_mountain.webp",
};

export function ProjectModal() {
  const { activeProject, isClosing, closeProject } = useProjectModal();
  const { playClick } = useAudio();

  const handleClose = () => {
    playClick();
    closeProject();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeProject && !isClosing) handleClose();
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
            className="fixed inset-0 z-40 bg-surface-dark/85 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={!isClosing ? handleClose : undefined}
          />

          {/* Modal Container */}
          <motion.div
            key="modal"
            className="fixed inset-2 md:inset-8 lg:inset-12 z-50 flex flex-col rounded-sm border border-neon-cyan/30 bg-surface-card overflow-hidden shadow-[0_0_60px_rgba(0,255,0,0.08)]"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            {/* Scanline overlay */}
            <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.18)_50%)] bg-[length:100%_3px] opacity-10" />

            {/* Corner accents */}
            <div className="absolute top-0 left-0 h-3 w-3 border-t-2 border-l-2 border-neon-cyan opacity-70 z-10" />
            <div className="absolute top-0 right-0 h-3 w-3 border-t-2 border-r-2 border-neon-cyan opacity-70 z-10" />
            <div className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-neon-cyan opacity-70 z-10" />
            <div className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-neon-cyan opacity-70 z-10" />

            {/* Header bar */}
            <div className="relative z-10 flex items-center justify-between px-4 md:px-6 py-3.5 border-b border-white/10 flex-shrink-0">
              <button
                onClick={!isClosing ? handleClose : undefined}
                disabled={isClosing}
                className="group flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-neon-red hover:text-white transition-colors duration-150 disabled:opacity-30 disabled:pointer-events-none"
              >
                <span className="border border-current px-1.5 py-0.5 opacity-80 group-hover:opacity-100 transition-opacity">[ X ]</span>
                <span className="text-[10px] md:text-xs">CLOSE_CONNECTION</span>
              </button>

              <div className="flex items-center gap-4 font-mono text-[10px] text-text-muted">
                {activeProject?.repoUrl && (
                  <a href={activeProject.repoUrl} target="_blank" rel="noopener noreferrer"
                    onClick={() => trackExternalLinkClick(activeProject.repoUrl!)}
                    className="hover:text-neon-cyan transition-colors tracking-widest uppercase">
                    [ SOURCE ]
                  </a>
                )}
              </div>
            </div>

            {/* Body */}
            <div className="relative z-10 flex flex-col lg:flex-row flex-1 overflow-y-auto lg:overflow-hidden bg-surface-card">
              
              {/* IMAGE SHOWCASE PANEL: Displays first on mobile, second on desktop */}
              <motion.div
                className="w-full lg:flex-1 h-56 sm:h-72 lg:h-full relative overflow-hidden order-1 lg:order-2 flex-shrink-0 border-b lg:border-b-0 border-white/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.3 }}
              >
                {PREVIEW_MAP[activeProject?.id ?? ""] ? (
                  <>
                    <NextImage
                      src={PREVIEW_MAP[activeProject?.id ?? ""]}
                      alt={`${activeProject?.title ?? ""} showcase`}
                      width={1200}
                      height={676}
                      className="w-full h-full object-cover lg:object-contain object-top bg-surface-dark/20"
                      priority
                    />
                    {/* Mobile details overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-dark via-surface-dark/40 to-transparent lg:hidden flex flex-col justify-end p-5 z-10">
                      <div className="space-y-1">
                        <span className="font-mono text-[9px] text-neon-cyan tracking-widest uppercase">
                          {activeProject?.client}
                        </span>
                        <h2 className="text-xl font-bold tracking-tight text-white leading-tight">
                          {activeProject?.title}
                        </h2>
                        <SystemBadge
                          label={activeProject?.category ?? ""}
                          status="neutral"
                          className="text-[9px] px-1.5 py-0.2 mt-1"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center border border-dashed border-white/10">
                    <p className="font-mono text-[10px] text-neon-cyan/50 uppercase tracking-[0.3em]">SHOWCASE_PENDING</p>
                    <p className="font-mono text-xs text-white/20 mt-2">{activeProject?.id}</p>
                  </div>
                )}
              </motion.div>

              {/* DETAILS META PANEL: Displays second on mobile, first on desktop */}
              <motion.div
                className="w-full lg:w-64 xl:w-72 flex-shrink-0 p-5 flex flex-col gap-4 order-2 lg:order-1 overflow-y-auto lg:overflow-hidden bg-surface-card"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.3, ease: "easeOut" }}
              >
                {/* Desktop-only header */}
                <div className="hidden lg:block space-y-1.5">
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

                {/* Mobile-only status header */}
                <div className="lg:hidden flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="font-mono text-[9px] text-text-muted uppercase tracking-widest">// SYSTEM_SPECS</span>
                  <SystemBadge
                    label={activeProject?.status ?? ""}
                    status={activeProject?.status === "COMPLETED" ? "success" : "warning"}
                    className="text-[9px]"
                  />
                </div>

                {/* Desktop-only status badge */}
                <div className="hidden lg:block">
                  <SystemBadge
                    label={activeProject?.status ?? ""}
                    status={activeProject?.status === "COMPLETED" ? "success" : "warning"}
                  />
                </div>

                {/* Description */}
                <div>
                  <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest mb-1">// OVERVIEW</p>
                  <p className="text-xs text-text-muted leading-relaxed lg:line-clamp-4">
                    {activeProject?.description}
                  </p>
                </div>

                {/* Tech Stack */}
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

                {/* Shipped Date */}
                <div className="border-t border-white/5 pt-2">
                  <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest mb-0.5">// SHIPPED</p>
                  <p className="font-mono text-[10px] text-white/50">
                    {activeProject ? new Date(activeProject.completionDate).toLocaleDateString("en-US", {
                      year: "numeric", month: "long",
                    }) : ""}
                  </p>
                </div>

                {/* LAUNCH SITE button */}
                {activeProject?.liveUrl && (
                  <a
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackExternalLinkClick(activeProject.liveUrl!)}
                    className="mt-4 lg:mt-auto flex items-center justify-center gap-3 w-full px-4 py-3 border border-neon-cyan text-neon-cyan font-mono text-xs tracking-widest uppercase transition-all duration-200 hover:bg-neon-cyan/10 hover:shadow-[0_0_20px_rgba(0,255,0,0.2)] group flex-shrink-0"
                  >
                    <span>LAUNCH SITE</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
                  </a>
                )}
              </motion.div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}