import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Games — Play & Have Fun",
    description:
        "12 browser games built with React & HTML5: Tic-Tac-Toe (AI), Sholo Guti, Checkers, Snake, 2048, Memory Match, Minesweeper, Bagh-Chal, Baro Guti, Moksha Patam, Pallanguzhi, and Ludo. Includes traditional South Asian board games. Focus mode for distraction-free gameplay.",
    keywords: [
        "Tic Tac Toe",
        "Sholo Guti",
        "16 Guti",
        "Checkers",
        "Snake Game",
        "2048 Game",
        "Memory Match",
        "Minesweeper",
        "Bagh-Chal",
        "Tiger and Goats",
        "Baro Guti",
        "12 Guti",
        "Moksha Patam",
        "Snakes and Ladders",
        "Pallanguzhi",
        "Mancala",
        "Ludo",
        "Bangladeshi Board Game",
        "Indian Board Game",
        "South Asian Traditional Games",
        "HTML5 Games",
        "Browser Games",
        "Asif Ahsan",
        "React Games",
    ],
    alternates: {
        canonical: "https://asifahsan.com/games",
    },
    openGraph: {
        title: "Games | Asif Ahsan",
        description:
            "12 browser games including traditional South Asian classics: Sholo Guti, Bagh-Chal, Baro Guti, Moksha Patam, Pallanguzhi, Ludo — plus Tic-Tac-Toe, Checkers, Snake, 2048, Memory Match, Minesweeper.",
        url: "https://asifahsan.com/games",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Games | Asif Ahsan",
        description:
            "12 browser games: traditional South Asian board games (Sholo Guti, Bagh-Chal, Ludo, Moksha Patam) plus classic arcade games — built with React.",
    },
};

export default function GamesLayout({ children }: { children: React.ReactNode }) {
    return children;
}
