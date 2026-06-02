"use client";

import { useState } from "react";

interface Props {
  nickname: string;
  setNickname: (name: string) => void;
  onNext: () => void;
}

export default function NicknameStep({ nickname, setNickname, onNext }: Props) {
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = nickname.trim();
    if (!trimmed) {
      setError("Enter a nickname to continue");
      return;
    }
    if (trimmed.length > 30) {
      setError("Max 30 characters");
      return;
    }
    setNickname(trimmed);
    onNext();
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="border border-[#469D89]/40 rounded-2xl p-8 bg-background/80 backdrop-blur-sm">
        <h2 className="text-lg font-mono font-bold mb-2">
          Who&apos;s predicting?
        </h2>
        <p className="text-xs text-muted-foreground font-mono mb-6">
          Enter a nickname to identify your prediction
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
                setError("");
              }}
              placeholder="Your nickname..."
              maxLength={30}
              className="w-full px-4 py-3 rounded-xl border border-[#469D89]/40 bg-background font-mono text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-[#469D89] focus:shadow-[0_0_15px_rgba(70,157,137,0.25)] transition-all"
              autoFocus
            />
            {error && (
              <p className="mt-2 text-xs text-red-400 font-mono">{error}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl border border-[#469D89]/30 bg-[#469D89]/10 text-[#469D89] font-mono text-sm font-bold hover:bg-[#469D89]/20 hover:border-[#469D89]/50 transition-all duration-300"
          >
            Start Predicting →
          </button>
        </form>
      </div>
    </div>
  );
}
