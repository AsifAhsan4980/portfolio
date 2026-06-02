"use client";

import { useEffect, useState } from "react";

// FIFA World Cup 2026 opening match: June 11, 2026 (Mexico City)
const TARGET = new Date("2026-06-11T18:00:00Z");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft | null {
  const diff = TARGET.getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(getTimeLeft());
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) return null;

  if (!timeLeft) {
    return (
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#469D89]/50 bg-[#469D89]/10">
        <div className="w-2 h-2 rounded-full bg-[#469D89] animate-pulse" />
        <span className="text-xs font-mono text-[#469D89] font-bold tracking-widest uppercase">
          Tournament In Progress
        </span>
      </div>
    );
  }

  const units = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HRS", value: timeLeft.hours },
    { label: "MIN", value: timeLeft.minutes },
    { label: "SEC", value: timeLeft.seconds },
  ];

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-[9px] font-mono text-[#469D89] tracking-[0.3em] uppercase">
        Kickoff In
      </span>
      <div className="flex items-center gap-1.5 sm:gap-3">
        {units.map((u, i) => (
          <div key={u.label} className="flex items-center gap-1.5 sm:gap-3">
            <div className="flex flex-col items-center px-3 py-2 rounded-xl border border-[#469D89]/30 bg-[#469D89]/5 min-w-[56px]">
              <span className="text-xl sm:text-2xl font-mono font-bold tabular-nums text-foreground">
                {String(u.value).padStart(2, "0")}
              </span>
              <span className="text-[8px] font-mono text-muted-foreground tracking-widest">
                {u.label}
              </span>
            </div>
            {i < units.length - 1 && (
              <span className="text-[#469D89]/50 font-mono font-bold text-lg">
                :
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
