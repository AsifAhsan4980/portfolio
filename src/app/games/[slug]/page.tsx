import { games, getGameBySlug } from "@/data/games";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import GamePlayer from "@/components/games/GamePlayer";

export async function generateStaticParams() {
    return games.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const game = getGameBySlug(slug);
    if (!game) return {};

    return {
        title: `${game.title} — Play Free Online`,
        description: game.description,
        keywords: [...game.keywords, "HTML5 Game", "Browser Game", "React Game", "Asif Ahsan"],
        alternates: {
            canonical: `https://asifahsan.com/games/${game.slug}`,
        },
        openGraph: {
            title: `${game.title} | Asif Ahsan`,
            description: game.description,
            url: `https://asifahsan.com/games/${game.slug}`,
            type: "website",
        },
        twitter: {
            card: "summary",
            title: `${game.title} | Asif Ahsan`,
            description: game.description,
        },
    };
}

export default async function GamePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const game = getGameBySlug(slug);
    if (!game) notFound();

    const gameJsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: game.title,
        description: game.description,
        url: `https://asifahsan.com/games/${game.slug}`,
        applicationCategory: "GameApplication",
        operatingSystem: "Web Browser",
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
        },
        author: {
            "@type": "Person",
            name: "Asif Ahsan",
            url: "https://asifahsan.com",
        },
        breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://asifahsan.com" },
                { "@type": "ListItem", position: 2, name: "Games", item: "https://asifahsan.com/games" },
                { "@type": "ListItem", position: 3, name: game.title, item: `https://asifahsan.com/games/${game.slug}` },
            ],
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(gameJsonLd) }}
            />
            <GamePlayer componentName={game.component} />
        </>
    );
}
