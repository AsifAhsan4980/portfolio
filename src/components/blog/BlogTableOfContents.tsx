"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/blog-utils";

export default function BlogTableOfContents({ items }: { items: TocItem[] }) {
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                }
            },
            { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 }
        );

        const ids = items.map((i) => i.id);
        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [items]);

    if (items.length === 0) return null;

    return (
        <nav className="sticky top-28" aria-label="Table of contents">
            <div className="border border-[#469D89]/15 rounded-xl p-5 bg-background/60 backdrop-blur-sm">
                <h3 className="text-[10px] font-mono text-[#469D89]/60 tracking-[0.3em] uppercase mb-4">
                    On this page
                </h3>
                <ul className="space-y-2">
                    {items.map((item) => (
                        <li key={item.id}>
                            <a
                                href={`#${item.id}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                                }}
                                className={`block text-[12px] font-mono leading-5 transition-all duration-200 ${
                                    item.level === "h3" ? "pl-3" : ""
                                } ${
                                    activeId === item.id
                                        ? "text-[#469D89] translate-x-0.5"
                                        : "text-muted-foreground/60 hover:text-[#469D89]/80"
                                }`}
                            >
                                {item.text}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
