"use client";

import { motion } from "framer-motion";
import type { Team } from "@/data/world-cup-2026";

interface Props {
  team: Team;
  onClick?: () => void;
  interactive?: boolean;
  size?: "sm" | "md";
  highlight?: boolean;
}

export default function TeamBadge({
  team,
  onClick,
  interactive,
  size = "sm",
  highlight,
}: Props) {
  return (
    <motion.button
      whileHover={interactive ? { scale: 1.05 } : undefined}
      whileTap={interactive ? { scale: 0.95 } : undefined}
      onClick={onClick}
      disabled={!interactive}
      className={`
        inline-flex items-center gap-1.5 rounded-lg border transition-all duration-200
        ${size === "sm" ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm"}
        ${
          highlight
            ? "border-[#469D89] bg-[#469D89]/15 shadow-[0_0_15px_rgba(70,157,137,0.25)]"
            : "border-[#469D89]/30 bg-background/80"
        }
        ${
          interactive
            ? "hover:border-[#469D89]/60 hover:bg-[#469D89]/10 cursor-pointer"
            : "cursor-default"
        }
      `}
    >
      <span>{team.flag}</span>
      <span className="font-mono">{team.code}</span>
    </motion.button>
  );
}
