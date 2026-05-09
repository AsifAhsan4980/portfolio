export interface Game {
    slug: string;
    title: string;
    description: string;
    icon: string;
    component: string;
    keywords: string[];
}

export const games: Game[] = [
    {
        slug: "sholo-guti",
        title: "Sholo Guti",
        description: "Traditional Bangladeshi board game. 16 Guti vs 1 Tiger — a strategic battle of wits.",
        icon: "🐅",
        component: "SholoGuti",
        keywords: ["Sholo Guti", "16 Guti", "Bangladeshi Board Game", "Traditional Board Game", "Strategy Game"],
    },
    {
        slug: "bagh-chal",
        title: "Bagh-Chal",
        description: "Tiger & Goats — Nepali/Bengali classic. 4 tigers hunt 20 goats; goats try to trap all tigers.",
        icon: "🐅🐐",
        component: "BaghChal",
        keywords: ["Bagh-Chal", "Tiger and Goats", "Nepali Board Game", "Bengali Board Game", "Strategy Game"],
    },
    {
        slug: "baro-guti",
        title: "Baro Guti",
        description: "12 Guti — traditional Bangladeshi capture game. Jump over opponents to capture them.",
        icon: "⬡",
        component: "BaroGuti",
        keywords: ["Baro Guti", "12 Guti", "Bangladeshi Board Game", "Capture Game", "Traditional Game"],
    },
    {
        slug: "moksha-patam",
        title: "Moksha Patam",
        description: "Ancient Indian Snakes & Ladders. Virtues lift you up, vices pull you down. Reach Moksha!",
        icon: "🐍🪜",
        component: "MokshaPatam",
        keywords: ["Moksha Patam", "Snakes and Ladders", "Indian Board Game", "Ancient Board Game", "Dice Game"],
    },
    {
        slug: "pallanguzhi",
        title: "Pallanguzhi",
        description: "South Indian Mancala. Sow seeds counter-clockwise, capture pits with exactly 4 seeds.",
        icon: "🫘",
        component: "Pallanguzhi",
        keywords: ["Pallanguzhi", "Mancala", "South Indian Game", "Seed Sowing Game", "Traditional Game"],
    },
    {
        slug: "ludo",
        title: "Ludo",
        description: "The desi classic! Roll a 6 to enter, race all 4 tokens home. Land on opponents to send them back.",
        icon: "🎲",
        component: "Ludo",
        keywords: ["Ludo", "Board Game", "Dice Game", "Classic Game", "Family Game"],
    },
    {
        slug: "tic-tac-toe",
        title: "Tic-Tac-Toe",
        description: "Classic 3x3 grid game. Play against an AI opponent powered by the minimax algorithm.",
        icon: "❌⭕",
        component: "TicTacToe",
        keywords: ["Tic-Tac-Toe", "Noughts and Crosses", "AI Game", "Minimax Algorithm", "Classic Game"],
    },
    {
        slug: "checkers",
        title: "Checkers",
        description: "Classic draughts on an 8x8 board. Capture all opponent pieces with mandatory jumps.",
        icon: "🔴⚫",
        component: "Checkers",
        keywords: ["Checkers", "Draughts", "Board Game", "8x8 Board Game", "Classic Game"],
    },
    {
        slug: "snake",
        title: "Snake",
        description: "Guide the snake to eat food and grow. Don't hit the walls or yourself!",
        icon: "🐍",
        component: "Snake",
        keywords: ["Snake Game", "Arcade Game", "Classic Snake", "Browser Game", "Retro Game"],
    },
    {
        slug: "2048",
        title: "2048",
        description: "Slide tiles to combine matching numbers. Can you reach the 2048 tile?",
        icon: "🔢",
        component: "Game2048",
        keywords: ["2048 Game", "Puzzle Game", "Number Puzzle", "Sliding Tiles", "Brain Game"],
    },
    {
        slug: "memory-match",
        title: "Memory Match",
        description: "Flip cards to find matching pairs. Test your memory with 8 pairs of emojis.",
        icon: "🧠",
        component: "MemoryMatch",
        keywords: ["Memory Match", "Card Matching", "Memory Game", "Emoji Game", "Brain Training"],
    },
    {
        slug: "minesweeper",
        title: "Minesweeper",
        description: "Clear the minefield without detonating any mines. Flag suspected mines.",
        icon: "💣",
        component: "Minesweeper",
        keywords: ["Minesweeper", "Mine Sweeper", "Puzzle Game", "Logic Game", "Classic Game"],
    },
];

export function getGameBySlug(slug: string): Game | undefined {
    return games.find((g) => g.slug === slug);
}
