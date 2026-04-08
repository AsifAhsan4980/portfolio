import { intents, fallbackResponse, type Intent, type ChatResponse } from "@/data/chatbot-knowledge";

function scoreIntent(input: string, intent: Intent): number {
    const normalized = input.toLowerCase().trim();
    let score = 0;

    // Regex pattern match (strongest signal)
    for (const pattern of intent.patterns) {
        if (pattern.test(normalized)) {
            score += 10;
            break;
        }
    }

    // Keyword overlap
    for (const keyword of intent.keywords) {
        if (normalized.includes(keyword)) {
            score += 3;
        }
    }

    // Exact single-word match bonus
    if (intent.keywords.includes(normalized)) {
        score += 5;
    }

    return score;
}

export function matchIntent(userMessage: string): ChatResponse {
    const trimmed = userMessage.trim();
    if (!trimmed) return fallbackResponse;

    // Handle "view all" / "all projects" chip
    if (/^(view\s*)?all(\s*projects)?$/i.test(trimmed)) {
        return {
            text: "Here are all of Asif's projects:",
            links: [{ label: "View All Projects", url: "/projects" }],
            chips: ["Skills", "Experience", "Contact"],
        };
    }

    const scored = intents
        .map((intent) => ({ intent, score: scoreIntent(trimmed, intent) }))
        .filter((s) => s.score > 0);

    if (scored.length === 0) return fallbackResponse;

    scored.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return b.intent.priority - a.intent.priority;
    });

    return scored[0].intent.response;
}
