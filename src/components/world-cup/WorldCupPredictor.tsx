"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { groups, knockoutMatches } from "@/data/world-cup-2026";
import type {
  GroupPredictions,
  KnockoutPredictions,
  WizardStep,
} from "@/types/world-cup";
import WizardStepper from "./WizardStepper";
import NicknameStep from "./NicknameStep";
import GroupStageStep from "./GroupStageStep";
import KnockoutStep from "./KnockoutStep";
import ReviewStep from "./ReviewStep";
import SavedStep from "./SavedStep";

const STORAGE_KEY = "wc2026_progress";
const MAX_HISTORY = 50;

interface WizardState {
  step: WizardStep;
  nickname: string;
  groupPredictions: GroupPredictions;
  knockoutPredictions: KnockoutPredictions;
}

function loadSavedState(): WizardState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as WizardState;
    // Don't restore if already saved
    if (parsed.step === "saved") return null;
    return parsed;
  } catch {
    return null;
  }
}

function saveState(state: WizardState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // quota exceeded or private browsing
  }
}

function clearSavedState() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}

export default function WorldCupPredictor() {
  const [step, setStep] = useState<WizardStep>("nickname");
  const [nickname, setNickname] = useState("");
  const [groupPredictions, setGroupPredictions] = useState<GroupPredictions>({});
  const [knockoutPredictions, setKnockoutPredictions] =
    useState<KnockoutPredictions>({});
  const [savedId, setSavedId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [restored, setRestored] = useState(false);

  // Undo/redo history
  const [history, setHistory] = useState<WizardState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const isUndoRedo = useRef(false);

  const champion = knockoutPredictions["F"] || "";
  const containerRef = useRef<HTMLDivElement>(null);

  const goToStep = useCallback((next: WizardStep) => {
    setStep(next);
    setTimeout(() => {
      containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }, []);

  // Restore from localStorage on mount
  useEffect(() => {
    const saved = loadSavedState();
    if (saved) {
      setStep(saved.step);
      setNickname(saved.nickname);
      setGroupPredictions(saved.groupPredictions);
      setKnockoutPredictions(saved.knockoutPredictions);
      setRestored(true);
      setTimeout(() => setRestored(false), 3000);
    }
  }, []);

  // Auto-save to localStorage on state changes
  useEffect(() => {
    if (step === "saved") {
      clearSavedState();
      return;
    }
    saveState({ step, nickname, groupPredictions, knockoutPredictions });
  }, [step, nickname, groupPredictions, knockoutPredictions]);

  // Push to undo history on prediction changes
  useEffect(() => {
    if (isUndoRedo.current) {
      isUndoRedo.current = false;
      return;
    }
    const snapshot: WizardState = {
      step,
      nickname,
      groupPredictions,
      knockoutPredictions,
    };
    setHistory((prev) => {
      const trimmed = prev.slice(0, historyIndex + 1);
      const next = [...trimmed, snapshot];
      if (next.length > MAX_HISTORY) next.shift();
      return next;
    });
    setHistoryIndex((prev) => {
      const newIdx = prev + 1;
      return newIdx >= MAX_HISTORY ? MAX_HISTORY - 1 : newIdx;
    });
  }, [groupPredictions, knockoutPredictions]);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const handleUndo = useCallback(() => {
    if (!canUndo) return;
    isUndoRedo.current = true;
    const prev = history[historyIndex - 1];
    setStep(prev.step);
    setNickname(prev.nickname);
    setGroupPredictions(prev.groupPredictions);
    setKnockoutPredictions(prev.knockoutPredictions);
    setHistoryIndex((i) => i - 1);
  }, [canUndo, history, historyIndex]);

  const handleRedo = useCallback(() => {
    if (!canRedo) return;
    isUndoRedo.current = true;
    const next = history[historyIndex + 1];
    setStep(next.step);
    setNickname(next.nickname);
    setGroupPredictions(next.groupPredictions);
    setKnockoutPredictions(next.knockoutPredictions);
    setHistoryIndex((i) => i + 1);
  }, [canRedo, history, historyIndex]);

  // Keyboard shortcuts for undo/redo
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "z") {
        e.preventDefault();
        if (e.shiftKey) {
          handleRedo();
        } else {
          handleUndo();
        }
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "y") {
        e.preventDefault();
        handleRedo();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleUndo, handleRedo]);

  const handleSave = useCallback(async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/world-cup/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nickname,
          groupPredictions,
          knockoutPredictions,
          champion,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setSavedId(data.id);
        setStep("saved");
      } else {
        alert(data.error || "Failed to save prediction");
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  }, [nickname, groupPredictions, knockoutPredictions, champion]);

  return (
    <div ref={containerRef} className="max-w-6xl mx-auto">
      {/* Restored banner */}
      <AnimatePresence>
        {restored && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 px-4 py-2 rounded-xl border border-[#469D89]/40 bg-[#469D89]/10 text-center"
          >
            <span className="text-xs font-mono text-[#469D89]">
              Progress restored from your last session
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between mb-2">
        <WizardStepper currentStep={step} />

        {/* Undo/Redo buttons */}
        {step !== "saved" && step !== "nickname" && (
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={handleUndo}
              disabled={!canUndo}
              title="Undo (Ctrl+Z)"
              className="p-1.5 rounded-lg border border-[#469D89]/25 text-muted-foreground hover:text-[#469D89] hover:border-[#469D89]/50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 7v6h6" />
                <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6.69 3L3 13" />
              </svg>
            </button>
            <button
              onClick={handleRedo}
              disabled={!canRedo}
              title="Redo (Ctrl+Shift+Z)"
              className="p-1.5 rounded-lg border border-[#469D89]/25 text-muted-foreground hover:text-[#469D89] hover:border-[#469D89]/50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 7v6h-6" />
                <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6.69 3L21 13" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
          transition={{ duration: 0.35 }}
        >
          {step === "nickname" && (
            <NicknameStep
              nickname={nickname}
              setNickname={setNickname}
              onNext={() => goToStep("groups")}
            />
          )}
          {step === "groups" && (
            <GroupStageStep
              groupPredictions={groupPredictions}
              setGroupPredictions={setGroupPredictions}
              onNext={() => goToStep("knockout")}
              onBack={() => goToStep("nickname")}
            />
          )}
          {step === "knockout" && (
            <KnockoutStep
              groupPredictions={groupPredictions}
              knockoutPredictions={knockoutPredictions}
              setKnockoutPredictions={setKnockoutPredictions}
              onNext={() => goToStep("review")}
              onBack={() => goToStep("groups")}
            />
          )}
          {step === "review" && (
            <ReviewStep
              nickname={nickname}
              groupPredictions={groupPredictions}
              knockoutPredictions={knockoutPredictions}
              champion={champion}
              onSave={handleSave}
              saving={saving}
              onBack={() => goToStep("knockout")}
            />
          )}
          {step === "saved" && savedId && (
            <SavedStep id={savedId} nickname={nickname} champion={champion} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
