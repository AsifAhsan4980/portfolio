export function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

export interface TocItem {
    id: string;
    text: string;
    level: "h2" | "h3";
}

export function extractTocItems(sections: { type: string; content?: string }[]): TocItem[] {
    return sections
        .filter((s) => (s.type === "h2" || s.type === "h3") && s.content)
        .map((s) => ({
            id: slugify(s.content!),
            text: s.content!,
            level: s.type as "h2" | "h3",
        }));
}
