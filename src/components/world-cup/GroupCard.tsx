"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import type { Group } from "@/data/world-cup-2026";
import type { GroupPrediction } from "@/types/world-cup";

interface Props {
  group: Group;
  prediction: GroupPrediction | undefined;
  onChange: (pred: GroupPrediction) => void;
  readOnly?: boolean;
}

const SLOT_LABELS = ["1st — Advances", "2nd — Advances", "3rd — May Advance"];
const POSITIONS = ["first", "second", "third"] as const;

export default function GroupCard({
  group,
  prediction,
  onChange,
  readOnly,
}: Props) {
  const [dragOver, setDragOver] = useState<string | null>(null);

  // Touch drag state
  const [touchDragging, setTouchDragging] = useState<string | null>(null);
  const [touchGhost, setTouchGhost] = useState<{
    x: number;
    y: number;
    code: string;
  } | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const slotRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const assigned = [
    prediction?.first,
    prediction?.second,
    prediction?.third,
  ].filter(Boolean);
  const unassigned = group.teams.filter((t) => !assigned.includes(t.code));
  const isComplete = assigned.length === 3;

  const handleAssignNext = (teamCode: string) => {
    if (readOnly) return;
    const pred = prediction || { first: "", second: "", third: "" };
    if (!pred.first) {
      onChange({ ...pred, first: teamCode });
    } else if (!pred.second) {
      onChange({ ...pred, second: teamCode });
    } else if (!pred.third) {
      onChange({ ...pred, third: teamCode });
    }
  };

  const handleRemove = (position: "first" | "second" | "third") => {
    if (readOnly) return;
    const pred = prediction || { first: "", second: "", third: "" };
    if (position === "first") {
      onChange({ first: "", second: "", third: "" });
    } else if (position === "second") {
      onChange({ ...pred, second: "", third: "" });
    } else {
      onChange({ ...pred, third: "" });
    }
  };

  const applyDrop = useCallback(
    (teamCode: string, slot: "first" | "second" | "third") => {
      const isGroupTeam = group.teams.some((t) => t.code === teamCode);
      if (!isGroupTeam) return;
      const pred = prediction || { first: "", second: "", third: "" };
      const updated = { ...pred };
      for (const pos of POSITIONS) {
        if (updated[pos] === teamCode) updated[pos] = "";
      }
      updated[slot] = teamCode;
      onChange(updated);
    },
    [group.teams, prediction, onChange]
  );

  // --- HTML5 Drag handlers (desktop) ---
  const onDragStart = (e: React.DragEvent, teamCode: string) => {
    e.dataTransfer.setData("text/plain", teamCode);
    e.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = (e: React.DragEvent, slot: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOver(slot);
  };

  const onDragLeave = () => setDragOver(null);

  const onDrop = (
    e: React.DragEvent,
    slot: "first" | "second" | "third"
  ) => {
    e.preventDefault();
    setDragOver(null);
    const teamCode = e.dataTransfer.getData("text/plain");
    if (!teamCode) return;
    applyDrop(teamCode, slot);
  };

  // --- Touch drag handlers (mobile) ---
  const findSlotUnderPoint = (x: number, y: number): string | null => {
    for (const [slotName, el] of slotRefs.current.entries()) {
      const rect = el.getBoundingClientRect();
      if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
        return slotName;
      }
    }
    return null;
  };

  const onTouchStart = (teamCode: string) => (e: React.TouchEvent) => {
    if (readOnly) return;
    const touch = e.touches[0];
    setTouchDragging(teamCode);
    setTouchGhost({ x: touch.clientX, y: touch.clientY, code: teamCode });
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchDragging) return;
    e.preventDefault();
    const touch = e.touches[0];
    setTouchGhost((prev) =>
      prev ? { ...prev, x: touch.clientX, y: touch.clientY } : null
    );
    const slot = findSlotUnderPoint(touch.clientX, touch.clientY);
    setDragOver(slot);
  };

  const onTouchEnd = () => {
    if (!touchDragging) return;
    if (dragOver && POSITIONS.includes(dragOver as (typeof POSITIONS)[number])) {
      applyDrop(touchDragging, dragOver as "first" | "second" | "third");
    }
    setTouchDragging(null);
    setTouchGhost(null);
    setDragOver(null);
  };

  const setSlotRef = (pos: string) => (el: HTMLDivElement | null) => {
    if (el) slotRefs.current.set(pos, el);
    else slotRefs.current.delete(pos);
  };

  const team = (code: string) => group.teams.find((t) => t.code === code);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchEnd}
      className={`
        border rounded-2xl p-5 bg-background/80 backdrop-blur-sm transition-all duration-300 relative min-w-0 overflow-hidden
        ${
          isComplete
            ? "border-[#469D89]/60 shadow-[0_0_20px_rgba(70,157,137,0.2)]"
            : "border-[#469D89]/30"
        }
      `}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-mono font-bold">
          Group <span className="text-[#469D89]">{group.name}</span>
        </h3>
        {isComplete && (
          <span className="text-[10px] font-mono text-[#469D89] font-bold">
            COMPLETE
          </span>
        )}
      </div>

      {/* Position slots (drop targets) */}
      <div className="space-y-2 mb-4">
        {POSITIONS.map((pos, i) => {
          const teamCode = prediction?.[pos];
          const t = teamCode ? team(teamCode) : null;
          const isOver = dragOver === pos;

          return (
            <div key={pos} className="flex items-center gap-2">
              <span className="text-[9px] font-mono text-muted-foreground w-24 shrink-0">
                {SLOT_LABELS[i]}
              </span>
              {t ? (
                <div
                  ref={setSlotRef(pos)}
                  draggable={!readOnly}
                  onDragStart={(e) => onDragStart(e, t.code)}
                  onDragOver={(e) => onDragOver(e, pos)}
                  onDragLeave={onDragLeave}
                  onDrop={(e) => onDrop(e, pos)}
                  onTouchStart={onTouchStart(t.code)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#469D89]/40 bg-[#469D89]/10 text-sm transition-all select-none ${
                    readOnly
                      ? "cursor-default"
                      : "cursor-grab active:cursor-grabbing hover:border-[#469D89]/60"
                  } ${isOver ? "ring-2 ring-[#469D89]/50" : ""} ${
                    touchDragging === t.code ? "opacity-40" : ""
                  }`}
                >
                  <span className="text-base">{t.flag}</span>
                  <span className="font-mono text-xs font-medium">
                    {t.name}
                  </span>
                  {!readOnly && (
                    <button
                      onClick={() => handleRemove(pos)}
                      className="text-xs text-muted-foreground hover:text-red-400 ml-auto transition-colors"
                    >
                      ×
                    </button>
                  )}
                </div>
              ) : (
                <div
                  ref={setSlotRef(pos)}
                  onDragOver={(e) => onDragOver(e, pos)}
                  onDragLeave={onDragLeave}
                  onDrop={(e) => onDrop(e, pos)}
                  className={`flex-1 h-9 rounded-lg border-2 border-dashed flex items-center justify-center transition-all ${
                    isOver
                      ? "border-[#469D89]/60 bg-[#469D89]/10"
                      : "border-muted-foreground/25"
                  }`}
                >
                  <span
                    className={`text-[9px] font-mono ${
                      isOver
                        ? "text-[#469D89]"
                        : "text-muted-foreground/70"
                    }`}
                  >
                    {isOver ? "Drop here" : "Drag team here"}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Unassigned teams pool (draggable + clickable) */}
      {!readOnly && unassigned.length > 0 && (
        <div className="pt-3 border-t border-[#469D89]/25">
          <p className="text-[8px] font-mono text-muted-foreground mb-2 uppercase tracking-widest">
            Available
          </p>
          <div className="space-y-1.5">
            {unassigned.map((t) => (
              <div
                key={t.code}
                draggable
                onDragStart={(e) => onDragStart(e, t.code)}
                onTouchStart={onTouchStart(t.code)}
                onClick={() => handleAssignNext(t.code)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg border border-[#469D89]/30 bg-background/80 cursor-grab active:cursor-grabbing hover:border-[#469D89]/60 hover:bg-[#469D89]/10 transition-all select-none ${
                  touchDragging === t.code ? "opacity-40" : ""
                }`}
              >
                <span className="text-base">{t.flag}</span>
                <span className="font-mono text-sm">{t.name}</span>
                <span className="text-[10px] font-mono text-muted-foreground ml-auto">
                  {t.code}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Touch drag ghost */}
      {touchGhost && (
        <div
          className="fixed z-50 pointer-events-none px-3 py-1.5 rounded-lg border border-[#469D89] bg-[#469D89]/20 backdrop-blur-sm text-sm font-mono font-medium shadow-lg"
          style={{
            left: touchGhost.x - 40,
            top: touchGhost.y - 20,
          }}
        >
          {(() => {
            const t = team(touchGhost.code);
            return t ? `${t.flag} ${t.name}` : touchGhost.code;
          })()}
        </div>
      )}
    </motion.div>
  );
}
