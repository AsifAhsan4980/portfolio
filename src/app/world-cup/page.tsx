import type { Metadata } from "next";
import Image from "next/image";
import WorldCupPredictor from "@/components/world-cup/WorldCupPredictor";
import PredictionStats from "@/components/world-cup/PredictionStats";
import CountdownTimer from "@/components/world-cup/CountdownTimer";

export const metadata: Metadata = {
  title: "FIFA World Cup 2026 Predictions",
  description:
    "Predict the FIFA World Cup 2026 bracket! Pick group winners, fill the knockout bracket, and share your prediction.",
  keywords: [
    "FIFA World Cup 2026",
    "World Cup Predictions",
    "World Cup Bracket",
    "FIFA 2026 Bracket",
  ],
  alternates: {
    canonical: "https://www.asifahsan.com/world-cup",
  },
  openGraph: {
    title: "FIFA World Cup 2026 Predictions",
    description:
      "Predict the 2026 FIFA World Cup bracket and share your picks!",
    url: "https://www.asifahsan.com/world-cup",
  },
};

export default function WorldCupPage() {
  return (
    <div className="relative container py-12 min-h-screen">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-[#469D89]/6 rounded-full blur-[100px] pointer-events-none" />

      {/* HUD corners */}
      <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-[#469D89]/30 pointer-events-none" />
      <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-[#469D89]/30 pointer-events-none" />

      {/* Page header */}
      <div className="text-center mb-12 relative z-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#469D89]/50" />
          <span className="text-[10px] font-mono text-[#469D89] tracking-[0.3em] uppercase">
            Predict
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#469D89]/50" />
        </div>

        {/* Hero image */}
        <div className="relative w-full max-w-2xl mx-auto mb-6 rounded-2xl overflow-hidden border border-[#469D89]/30">
          <Image
            src="/assets/images/FIFA-world-cup-2026-752x440.webp"
            alt="FIFA World Cup 2026"
            width={752}
            height={440}
            priority
            className="w-full h-auto object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        </div>

        <h1 className="text-4xl lg:text-5xl font-bold neon-text-pulse">
          World Cup <span className="gradient-text">2026</span>
        </h1>
        <p className="mt-3 text-sm font-mono text-muted-foreground">
          <span className="text-[#469D89]">{">"}</span> Pick your winners.
          Build your bracket. Share your prediction.
        </p>

        <div className="mt-6">
          <CountdownTimer />
        </div>
      </div>

      <div className="relative z-10">
        <WorldCupPredictor />
      </div>

      {/* Community prediction stats */}
      <div className="relative z-10 mt-16 max-w-6xl mx-auto">
        <PredictionStats />
      </div>
    </div>
  );
}
