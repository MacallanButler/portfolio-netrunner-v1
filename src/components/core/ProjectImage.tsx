"use client";

import { useState } from "react";
import NextImage from "next/image";
import { cn } from "@/lib/utils";

interface ProjectImageProps {
  id: string;
  title: string;
  className?: string;
}

const PREVIEW_MAP: Record<string, string> = {
  apex_drop:      "/previews/apex_drop.webp",
  blue_horizon:   "/previews/blue_horizon.webp",
  ghost_mountain: "/previews/ghost_mountain.webp",
};

/**
 * Renders a project's hero image from /public/previews/{id}.webp.
 * Falls back to a styled placeholder if no preview exists for the project.
 */
export function ProjectImage({ id, title, className }: ProjectImageProps) {
  const previewSrc = PREVIEW_MAP[id] ?? null;
  const [imgError, setImgError] = useState(false);
  const showPreview = previewSrc && !imgError;

  return (
    <div className={cn("relative w-full overflow-hidden bg-surface-dark border-b border-white/10", className)}>
      {showPreview ? (
        <>
          <NextImage
            src={previewSrc}
            alt={`${title} preview`}
            width={600}
            height={338}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
            onError={() => setImgError(true)}
            priority={false}
          />
          {/* Subtle dark gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface-dark/60 via-transparent to-transparent z-10" />
        </>
      ) : (
        <>
          {/* Placeholder grid bg */}
          <div
            className="absolute inset-0 z-0 opacity-20"
            style={{
              backgroundImage: `linear-gradient(rgba(0,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.15) 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />
          <div className="relative z-0 flex flex-col items-center justify-center h-full min-h-[200px] text-center px-4 gap-2">
            <span className="font-mono text-[10px] text-neon-cyan/50 uppercase tracking-[0.2em]">ASSET_PENDING</span>
            <span className="font-mono text-xs text-white/30">{title}</span>
          </div>
        </>
      )}

      {/* Corner accents always on top */}
      <div className="absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-neon-cyan z-20 opacity-70" />
      <div className="absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-neon-cyan z-20 opacity-70" />
      <div className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-neon-cyan z-20 opacity-70" />
      <div className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-neon-cyan z-20 opacity-70" />
    </div>
  );
}
