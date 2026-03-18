/**
 * Maps technology names to their official brand colors.
 * Used to render color-coded badges in project cards.
 */
export const TECH_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  "React":          { bg: "rgba(97,218,251,0.12)",  text: "#61DAFB", border: "rgba(97,218,251,0.3)"  },
  "Next.js":        { bg: "rgba(255,255,255,0.08)", text: "#FFFFFF", border: "rgba(255,255,255,0.2)" },
  "TypeScript":     { bg: "rgba(49,120,198,0.15)",  text: "#5B9BD5", border: "rgba(49,120,198,0.35)" },
  "JavaScript":     { bg: "rgba(247,223,30,0.12)",  text: "#F7DF1E", border: "rgba(247,223,30,0.3)"  },
  "Tailwind CSS":   { bg: "rgba(6,182,212,0.12)",   text: "#06B6D4", border: "rgba(6,182,212,0.3)"   },
  "Framer Motion":  { bg: "rgba(187,75,143,0.12)",  text: "#E879C0", border: "rgba(187,75,143,0.3)"  },
  "Vite":           { bg: "rgba(100,108,255,0.12)", text: "#9B9EFF", border: "rgba(100,108,255,0.3)" },
  "Ruby":           { bg: "rgba(204,0,0,0.12)",     text: "#FF6B6B", border: "rgba(204,0,0,0.3)"     },
  "Ruby on Rails":  { bg: "rgba(204,0,0,0.12)",     text: "#FF6B6B", border: "rgba(204,0,0,0.3)"     },
  "PostgreSQL":     { bg: "rgba(51,103,145,0.15)",  text: "#5B91C4", border: "rgba(51,103,145,0.35)" },
  "Node.js":        { bg: "rgba(51,153,51,0.12)",   text: "#6FCF7C", border: "rgba(51,153,51,0.3)"   },
  "HTML / CSS":     { bg: "rgba(227,79,38,0.12)",   text: "#FF8A65", border: "rgba(227,79,38,0.3)"   },
  "Sanity CMS":     { bg: "rgba(248,84,55,0.12)",   text: "#F84537", border: "rgba(248,84,55,0.3)"   },
  "Python":         { bg: "rgba(55,118,171,0.12)",  text: "#4B8BBE", border: "rgba(55,118,171,0.3)"  },
};

/** Returns color config for a tech, falling back to a neutral style. */
export function getTechColor(tech: string) {
  return TECH_COLORS[tech] ?? {
    bg: "rgba(255,255,255,0.05)",
    text: "rgba(255,255,255,0.5)",
    border: "rgba(255,255,255,0.12)",
  };
}
