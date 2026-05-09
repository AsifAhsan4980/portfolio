import type { Metadata } from "next";
import { games } from "@/data/games";
import GameCard from "@/components/games/GameCard";

export const metadata: Metadata = {
    title: "Games — Play & Have Fun",
    description:
        "12 browser games built with React & HTML5: Tic-Tac-Toe (AI), Sholo Guti, Checkers, Snake, 2048, Memory Match, Minesweeper, Bagh-Chal, Baro Guti, Moksha Patam, Pallanguzhi, and Ludo. Includes traditional South Asian board games.",
    keywords: [
        "Tic Tac Toe", "Sholo Guti", "16 Guti", "Checkers", "Snake Game",
        "2048 Game", "Memory Match", "Minesweeper", "Bagh-Chal", "Tiger and Goats",
        "Baro Guti", "12 Guti", "Moksha Patam", "Snakes and Ladders", "Pallanguzhi",
        "Mancala", "Ludo", "Bangladeshi Board Game", "Indian Board Game",
        "South Asian Traditional Games", "HTML5 Games", "Browser Games",
        "Asif Ahsan", "React Games",
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

export default function GamesPage() {
    const gamesJsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Browser Games by Asif Ahsan",
        description: "12 browser games including traditional South Asian board games and classic arcade games.",
        numberOfItems: games.length,
        itemListElement: games.map((game, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: game.title,
            url: `https://asifahsan.com/games/${game.slug}`,
        })),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(gamesJsonLd) }}
            />

            <div className="relative container py-12 min-h-screen">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-[#469D89]/6 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-[#469D89]/30 pointer-events-none" />
                <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-[#469D89]/30 pointer-events-none" />

                <div className="text-center mb-12 relative z-10">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#469D89]/50" />
                        <span className="text-[10px] font-mono text-[#469D89]/60 tracking-[0.3em] uppercase">Arcade</span>
                        <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#469D89]/50" />
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-bold neon-text-pulse">
                        Mini <span className="gradient-text">Games</span>
                    </h1>
                    <p className="mt-3 text-sm font-mono text-muted-foreground">
                        <span className="text-[#469D89]/50">{'>'}</span> {games.length} games · take a break and have some fun
                    </p>
                </div>

                <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
                    {games.map((game, i) => (
                        <GameCard
                            key={game.slug}
                            title={game.title}
                            description={game.description}
                            icon={game.icon}
                            href={`/games/${game.slug}`}
                            delay={0.05 + i * 0.06}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
