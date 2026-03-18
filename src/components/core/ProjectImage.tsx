import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProjectImageProps {
  id: string;
  title: string;
  className?: string;
}

/**
 * Renders a project's hero image.
 * Expects images at /images/projects/{id}.jpg — shows a styled placeholder if not yet added.
 */
export function ProjectImage({ id, title, className }: ProjectImageProps) {
  const src = `/images/projects/${id}.jpg`;

  return (
    <div className={cn("relative w-full overflow-hidden bg-surface-dark border border-white/10", className)}>
      {/* Placeholder grid bg always visible beneath image */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(0,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.15) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Corner accents */}
      <div className="absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-neon-cyan z-10 opacity-70" />
      <div className="absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-neon-cyan z-10 opacity-70" />
      <div className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-neon-cyan z-10 opacity-70" />
      <div className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-neon-cyan z-10 opacity-70" />

      {/* Placeholder label — hidden when real image loads */}
      <div className="relative z-0 flex flex-col items-center justify-center h-full min-h-[200px] text-center px-4 gap-2">
        <span className="font-mono text-[10px] text-neon-cyan/50 uppercase tracking-[0.2em]">ASSET_PENDING</span>
        <span className="font-mono text-xs text-white/30">{title}</span>
      </div>
    </div>
  );
}
