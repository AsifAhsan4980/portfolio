"use client";

import type { WizardStep } from "@/types/world-cup";

const steps: { key: WizardStep; label: string; number: number }[] = [
  { key: "nickname", label: "Identity", number: 1 },
  { key: "groups", label: "Groups", number: 2 },
  { key: "knockout", label: "Bracket", number: 3 },
  { key: "review", label: "Review", number: 4 },
];

interface Props {
  currentStep: WizardStep;
}

export default function WizardStepper({ currentStep }: Props) {
  const currentIndex = steps.findIndex((s) => s.key === currentStep);
  if (currentStep === "saved") return null;

  return (
    <div className="flex items-center justify-center gap-2 mb-10">
      {steps.map((s, i) => {
        const isActive = s.key === currentStep;
        const isPast = i < currentIndex;

        return (
          <div key={s.key} className="flex items-center gap-2">
            <div
              className={`
              flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-mono tracking-widest uppercase transition-all duration-300
              ${
                isActive
                  ? "border-[#469D89] text-[#469D89] bg-[#469D89]/15"
                  : isPast
                    ? "border-[#469D89]/50 text-[#469D89]/90"
                    : "border-muted-foreground/30 text-muted-foreground/70"
              }
            `}
            >
              <span className={isActive ? "font-bold" : ""}>
                {isPast ? "✓" : `0${s.number}`}
              </span>
              <span className="hidden sm:inline">{s.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`w-8 h-px transition-colors duration-300 ${
                  i < currentIndex ? "bg-[#469D89]/60" : "bg-muted-foreground/20"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
