"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { commands, type CommandOutput } from "@/data/terminal-commands";

interface HistoryEntry {
    command: string;
    output: CommandOutput[];
}

const InteractiveTerminal = () => {
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<HistoryEntry[]>([
        {
            command: "",
            output: [
                { type: "text", content: "Welcome to Asif's terminal. Type 'help' to get started." },
            ],
        },
    ]);
    const [cmdHistory, setCmdHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const outputRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = useCallback(() => {
        if (outputRef.current) {
            outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [history, scrollToBottom]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = input.trim().toLowerCase();
        if (!trimmed) return;

        setCmdHistory((prev) => [trimmed, ...prev]);
        setHistoryIndex(-1);

        if (trimmed === "clear") {
            setHistory([]);
            setInput("");
            return;
        }

        const cmd = commands[trimmed];
        if (cmd) {
            const output = cmd.execute();
            setHistory((prev) => [...prev, { command: trimmed, output }]);

            // auto-download for resume command
            if (trimmed === "resume") {
                const link = document.createElement("a");
                link.href = "/assets/pdf/Resume_of_Asif_Ahsan.pdf";
                link.download = "Asif_Ahsan_Resume.pdf";
                link.click();
            }
        } else {
            setHistory((prev) => [
                ...prev,
                {
                    command: trimmed,
                    output: [
                        {
                            type: "error",
                            content: `Command not found: ${trimmed}. Type 'help' for available commands.`,
                        },
                    ],
                },
            ]);
        }

        setInput("");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowUp") {
            e.preventDefault();
            if (cmdHistory.length > 0) {
                const next = Math.min(historyIndex + 1, cmdHistory.length - 1);
                setHistoryIndex(next);
                setInput(cmdHistory[next]);
            }
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (historyIndex > 0) {
                const next = historyIndex - 1;
                setHistoryIndex(next);
                setInput(cmdHistory[next]);
            } else {
                setHistoryIndex(-1);
                setInput("");
            }
        }
    };

    const renderOutput = (item: CommandOutput, i: number) => {
        switch (item.type) {
            case "text":
                return (
                    <div key={i} className="text-[13px] text-[#a8c5be] leading-6 font-mono whitespace-pre-wrap">
                        {item.content}
                    </div>
                );
            case "list":
                return (
                    <div key={i} className="space-y-1 ml-2">
                        {item.items?.map((li, j) => (
                            <div key={j} className="text-[13px] text-[#a8c5be]/80 font-mono leading-6">
                                <span className="text-[#469D89] mr-2">›</span>
                                {li}
                            </div>
                        ))}
                    </div>
                );
            case "link":
                return (
                    <div key={i}>
                        <Link
                            href={item.url ?? "#"}
                            target={item.url?.startsWith("http") ? "_blank" : undefined}
                            rel={item.url?.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="text-[13px] font-mono text-[#469D89] hover:text-[#5fb8a3] underline underline-offset-4 decoration-[#469D89]/30 transition-colors"
                        >
                            {item.content}
                        </Link>
                    </div>
                );
            case "error":
                return (
                    <div key={i} className="text-[13px] font-mono text-red-400/80 leading-6">
                        {item.content}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <motion.section
            className="relative container py-16"
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            {/* Section header */}
            <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#469D89]/50" />
                    <span className="text-[10px] font-mono text-[#469D89]/60 tracking-[0.3em] uppercase">
                        Interactive
                    </span>
                    <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#469D89]/50" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold">
                    <span className="gradient-text">Terminal</span>
                </h2>
                <p className="mt-2 text-sm font-mono text-muted-foreground">
                    <span className="text-[#469D89]/50">{'>'}</span> Type &apos;help&apos; to explore
                </p>
            </div>

            {/* Terminal window */}
            <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden border border-[#469D89]/20 bg-[#060a09]">
                {/* Title bar */}
                <div className="flex items-center justify-between px-4 py-3 bg-[#469D89]/8 border-b border-[#469D89]/15">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400/60" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                        <div className="w-3 h-3 rounded-full bg-[#469D89]/60" />
                    </div>
                    <span className="text-[10px] font-mono text-[#469D89]/40 tracking-widest">
                        asif@portfolio ~ %
                    </span>
                    <div className="w-16" />
                </div>

                {/* Output area */}
                <div
                    ref={outputRef}
                    className="p-5 max-h-[400px] overflow-y-auto space-y-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#469D89]/20"
                    onClick={() => inputRef.current?.focus()}
                >
                    {history.map((entry, i) => (
                        <div key={i} className="space-y-2">
                            {entry.command && (
                                <div className="text-[13px] font-mono">
                                    <span className="text-[#469D89]">$</span>{" "}
                                    <span className="text-foreground/80">{entry.command}</span>
                                </div>
                            )}
                            <div className="space-y-1">
                                {entry.output.map((out, j) => renderOutput(out, j))}
                            </div>
                        </div>
                    ))}

                    {/* Input line */}
                    <form onSubmit={handleSubmit} className="flex items-center gap-2">
                        <span className="text-[#469D89] text-[13px] font-mono shrink-0">$</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="flex-1 bg-transparent border-none outline-none text-[13px] font-mono text-foreground/90 caret-[#469D89] placeholder:text-[#469D89]/20"
                            placeholder="type a command..."
                            autoComplete="off"
                            spellCheck={false}
                        />
                    </form>
                </div>
            </div>
        </motion.section>
    );
};

export default InteractiveTerminal;
