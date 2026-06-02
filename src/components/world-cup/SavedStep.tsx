"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { getTeamByCode } from "@/data/world-cup-2026";

interface Props {
  id: string;
  nickname: string;
  champion: string;
}

export default function SavedStep({ id, nickname, champion }: Props) {
  const [copied, setCopied] = useState(false);
  const championTeam = getTeamByCode(champion);
  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/world-cup/${id}`
      : `/world-cup/${id}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const input = document.createElement("input");
      input.value = shareUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-md mx-auto text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="border border-[#469D89]/50 rounded-2xl p-8 bg-background/80 backdrop-blur-sm shadow-[0_0_40px_rgba(70,157,137,0.2)]"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="text-5xl mb-4"
        >
          🏆
        </motion.div>

        <h2 className="text-lg font-mono font-bold mb-1">
          Prediction Saved!
        </h2>
        <p className="text-sm text-muted-foreground font-mono mb-6">
          {nickname}&apos;s pick:{" "}
          <span className="text-[#469D89] font-bold">
            {championTeam
              ? `${championTeam.flag} ${championTeam.name}`
              : champion}
          </span>{" "}
          to win it all
        </p>

        {/* Share link */}
        <div className="mb-6">
          <p className="text-[9px] font-mono text-muted-foreground tracking-widest uppercase mb-2">
            Share Your Prediction
          </p>
          <div className="flex items-center gap-2 p-2 border border-[#469D89]/30 rounded-xl bg-background">
            <input
              readOnly
              value={shareUrl}
              className="flex-1 bg-transparent text-xs font-mono text-foreground px-2 outline-none"
            />
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg border border-[#469D89]/40 bg-[#469D89]/15 text-[#469D89] text-xs font-mono font-bold hover:bg-[#469D89]/25 transition-all shrink-0"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        {/* New prediction */}
        <button
          onClick={() => window.location.reload()}
          className="w-full py-2.5 rounded-xl border border-[#469D89]/30 text-foreground font-mono text-sm hover:border-[#469D89]/60 transition-all"
        >
          Make Another Prediction
        </button>
      </motion.div>
    </div>
  );
}
