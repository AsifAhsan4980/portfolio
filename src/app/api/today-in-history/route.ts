import { NextResponse } from "next/server";

export interface HistoryEvent {
    year: string;
    text: string;
}

interface MuffinLabsEntry {
    year: string;
    text: string;
}

interface MuffinLabsResponse {
    date: string;
    data: {
        Events: MuffinLabsEntry[];
        Births: MuffinLabsEntry[];
        Deaths: MuffinLabsEntry[];
    };
}

let cache: { date: string; data: HistoryEvent[] } | null = null;

export async function GET() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const dateKey = `${month}/${day}`;

    // Return cached data if same day
    if (cache && cache.date === dateKey) {
        return NextResponse.json({ events: cache.data }, {
            headers: { "Cache-Control": "public, max-age=3600, s-maxage=3600" },
        });
    }

    try {
        const res = await fetch(`https://history.muffinlabs.com/date/${month}/${day}`, {
            next: { revalidate: 3600 },
        });

        if (!res.ok) {
            return NextResponse.json({ events: [] }, { status: 200 });
        }

        const json: MuffinLabsResponse = await res.json();
        const events: HistoryEvent[] = (json.data?.Events || [])
            .filter((e) => e.year && e.text)
            .map((e) => ({ year: e.year, text: e.text }));

        cache = { date: dateKey, data: events };

        return NextResponse.json({ events }, {
            headers: { "Cache-Control": "public, max-age=3600, s-maxage=3600" },
        });
    } catch {
        return NextResponse.json({ events: [] }, { status: 200 });
    }
}
