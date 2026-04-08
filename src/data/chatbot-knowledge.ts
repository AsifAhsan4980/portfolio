export interface ChatResponse {
    text: string;
    links?: { label: string; url: string }[];
    chips?: string[];
}

export interface Intent {
    id: string;
    keywords: string[];
    patterns: RegExp[];
    response: ChatResponse;
    priority: number;
}

export const welcomeMessage: ChatResponse = {
    text: "Hi! I'm Asif's portfolio assistant. Ask me anything about his work, skills, or experience -- or pick a topic below.",
    chips: ["About Asif", "Skills", "Projects", "Experience", "Services", "Contact"],
};

export const fallbackResponse: ChatResponse = {
    text: "I'm not sure I understand that. I can help with skills, projects, experience, services, education, or contact info. Try one of the options below!",
    chips: ["About Asif", "Skills", "Projects", "Experience", "Services", "Contact"],
};

export const intents: Intent[] = [
    {
        id: "greeting",
        keywords: ["hi", "hello", "hey", "sup", "yo", "greetings", "howdy", "assalamualaikum", "salam"],
        patterns: [/^(hi|hello|hey|greetings|howdy|yo|salam)[\s!.]*$/i],
        priority: 1,
        response: {
            text: "Hey there! I'm Asif's portfolio assistant. I can tell you about his skills, projects, experience, services, or how to get in touch. What are you curious about?",
            chips: ["Skills", "Projects", "Experience", "Services", "Contact"],
        },
    },
    {
        id: "about",
        keywords: ["about", "who", "introduce", "yourself", "asif", "tell me"],
        patterns: [/who\s*(is|are)\s*(you|asif)/i, /tell\s*me\s*about/i, /about\s*(yourself|asif|him)/i],
        priority: 5,
        response: {
            text: "Asif Ahsan is a Senior Software Engineer with 5+ years of professional experience. He specializes in scalable distributed systems, real-time platforms, and cloud-native architectures.\n\nHe's shipped 14+ projects across 5+ countries, serving 20+ clients and impacting 100K+ users.\n\nHe holds a BSc in Computer Science from BRAC University and is based in Dhaka, Bangladesh.",
            chips: ["Skills", "Experience", "Projects"],
            links: [{ label: "Download Resume", url: "/assets/pdf/Resume_of_Asif_Ahsan.pdf" }],
        },
    },
    {
        id: "skills",
        keywords: ["skills", "tech", "stack", "technologies", "tools", "language", "languages", "expertise", "proficient"],
        patterns: [/what\s*(tech|tools|languages|skills)/i, /tech\s*stack/i, /what\s*can\s*(he|you)\s*(do|build)/i],
        priority: 5,
        response: {
            text: "Here's Asif's tech stack:\n\n- Frontend: React, Next.js, Angular, TypeScript, Tailwind CSS\n- Backend: Node.js, Express, GraphQL, REST APIs\n- Mobile: Kotlin, Swift, Flutter, Jetpack Compose\n- Cloud: AWS (Lambda, AppSync, DynamoDB, S3, Cognito, EC2)\n- Databases: PostgreSQL, MongoDB, DynamoDB, Redis, ClickHouse\n- DevOps: Docker, Kubernetes, Terraform, CI/CD\n- Real-Time: WebRTC, Agora SDK, WebSockets\n- AI/ML: Gemini Nano, Banana, Claude API\n- Design: Figma, Adobe XD, Photoshop, After Effects",
            chips: ["Projects", "Services", "Experience"],
            links: [{ label: "View All Expertise", url: "/expertise" }],
        },
    },
    {
        id: "projects",
        keywords: ["projects", "project", "work", "portfolio", "built", "shipped", "apps"],
        patterns: [/what\s*(have|has)\s*(he|you)\s*built/i, /show\s*projects/i, /recent\s*(work|projects)/i],
        priority: 5,
        response: {
            text: "Asif has shipped 14+ projects. Highlights:\n\n- Ticket Tomorrow — Ticketing platform (Next.js, AWS)\n- ZodoLive — Live streaming platform (Agora, React)\n- Tribel — Social media (FFmpeg, AWS Rekognition)\n- Creator AI — AI generation (Gemini Nano, Banana)\n- Gunti — Expense manager (Kotlin, Swift, Flutter)\n- Nexus RTC SDK — Real-time communication SDK\n\nAsk me about a specific project for details!",
            chips: ["Ticket Tomorrow", "ZodoLive", "Nexus RTC SDK", "View All"],
            links: [{ label: "View All Projects", url: "/projects" }],
        },
    },
    {
        id: "experience",
        keywords: ["experience", "career", "job", "jobs", "work history", "resume", "company", "companies", "worked", "employment"],
        patterns: [/where\s*(has|have|did)\s*(he|you)\s*work/i, /work\s*experience/i, /career/i],
        priority: 5,
        response: {
            text: "Asif's career journey:\n\n- 2025-Present: Senior Software Engineer @ Right Tracks IT\n- 2022-2025: Software Engineer -> SSE @ Doodle Technologies\n- 2021-2022: Software Engineer @ Tech Hack Inc. (Canada)\n- 2021: Junior Software Engineer @ Bengal Software\n- 2021: Intern @ Gononet Ltd\n- 2016-2020: BSc in CSE @ BRAC University",
            chips: ["Skills", "Projects", "Contact"],
        },
    },
    {
        id: "services",
        keywords: ["services", "service", "offer", "offerings", "hire", "freelance", "consulting"],
        patterns: [/what\s*(services|do)\s*(you|he)\s*offer/i, /can\s*(you|he)\s*help\s*with/i],
        priority: 5,
        response: {
            text: "Asif offers four core services:\n\n1. Full-Stack Web Development — React, Next.js, Angular, Node.js\n2. AWS Cloud Architecture — Lambda, AppSync, DynamoDB, S3, Cognito\n3. API & Backend Engineering — GraphQL, REST, PostgreSQL, MongoDB\n4. Cross-Platform Mobile Apps — Kotlin, Swift, Flutter\n\nHe's currently available for new projects.",
            chips: ["Contact", "Projects", "Skills"],
            links: [{ label: "Hire Asif", url: "/hire-me" }],
        },
    },
    {
        id: "contact",
        keywords: ["contact", "email", "phone", "reach", "message", "whatsapp", "connect", "get in touch"],
        patterns: [/how\s*(can|do)\s*(i|we)\s*(contact|reach|message)/i, /get\s*in\s*touch/i],
        priority: 5,
        response: {
            text: "You can reach Asif through:\n\n- Email: asifahsan727@gmail.com\n- Phone: +8801795870994\n- WhatsApp: +8801685436578\n\nOr use the contact form on the Hire Me page.",
            chips: ["Services", "Projects"],
            links: [{ label: "Go to Hire Me Page", url: "/hire-me" }],
        },
    },
    {
        id: "socials",
        keywords: ["social", "socials", "github", "linkedin", "facebook", "instagram", "twitter"],
        patterns: [/social\s*media/i, /follow/i],
        priority: 3,
        response: {
            text: "Find Asif on social media:",
            links: [
                { label: "GitHub", url: "https://github.com/AsifAhsan4980" },
                { label: "LinkedIn", url: "https://www.linkedin.com/in/asif-ahsan-27832012b/" },
                { label: "Facebook", url: "https://www.facebook.com/asif.ahsan727/" },
                { label: "Instagram", url: "https://www.instagram.com/aragorn_isildurr/" },
            ],
            chips: ["Contact", "Projects"],
        },
    },
    {
        id: "education",
        keywords: ["education", "degree", "university", "college", "brac", "study", "studied", "academic"],
        patterns: [/where\s*did\s*(he|you)\s*study/i, /education/i, /degree/i],
        priority: 4,
        response: {
            text: "Asif holds a BSc in Computer Science & Engineering from BRAC University (2016-2020), Dhaka, Bangladesh.\n\nDuring university he was active in:\n- BizBee Business Club — Assistant Director of IT\n- Chess Club — Director\n- Computer Club — Senior Executive",
            chips: ["Experience", "Skills"],
        },
    },
    {
        id: "location",
        keywords: ["location", "where", "based", "country", "city", "live", "from", "dhaka", "bangladesh"],
        patterns: [/where\s*(is|are)\s*(he|you)\s*(based|from|located)/i],
        priority: 3,
        response: {
            text: "Asif is based in Dhaka, Bangladesh. He's worked with clients across 5+ countries including Bangladesh, Canada, the USA, and Sweden.",
            chips: ["Contact", "Experience"],
        },
    },
    {
        id: "availability",
        keywords: ["available", "availability", "open", "freelance", "contract", "remote"],
        patterns: [/is\s*(he|asif)\s*available/i, /can\s*i\s*hire/i, /open\s*(to|for)/i],
        priority: 6,
        response: {
            text: "Yes! Asif is currently available for new projects. Whether it's full-stack web development, cloud architecture, API engineering, or mobile apps — he's open to freelance, contract, and full-time opportunities.",
            chips: ["Services", "Contact"],
            links: [{ label: "Hire Asif", url: "/hire-me" }],
        },
    },
    {
        id: "stats",
        keywords: ["stats", "numbers", "metrics", "achievements", "impact"],
        patterns: [/how\s*many\s*(projects|clients|users)/i, /stats/i],
        priority: 4,
        response: {
            text: "Asif's impact by the numbers:\n\n- 5+ years of professional experience\n- 14+ projects shipped\n- 20+ clients served\n- 100K+ users impacted\n- Across 5+ countries",
            chips: ["Projects", "Experience"],
        },
    },
    {
        id: "resume",
        keywords: ["resume", "cv", "download"],
        patterns: [/download\s*(resume|cv)/i, /\bcv\b/i],
        priority: 6,
        response: {
            text: "You can download Asif's resume below:",
            links: [{ label: "Download Resume (PDF)", url: "/assets/pdf/Resume_of_Asif_Ahsan.pdf" }],
            chips: ["Experience", "Skills", "Contact"],
        },
    },
    {
        id: "project_ticket_tomorrow",
        keywords: ["ticket tomorrow", "tickettomorrow", "ticketing"],
        patterns: [/ticket\s*tomorrow/i],
        priority: 8,
        response: {
            text: "Ticket Tomorrow is an online ticketing platform with complete frontend, backend, and admin dashboard. Features user, organization, ticketing, and promotion systems with bKash and SSLCommerz payment integration.\n\nOutcome: Reduced page load times by 60% using SSR and AWS CloudFront CDN.\n\nTech: Next.js, React, TypeScript, Redux, AWS Lambda, AppSync, DynamoDB, Cognito",
            chips: ["ZodoLive", "All Projects"],
            links: [{ label: "Visit Ticket Tomorrow", url: "https://tickettomorrow.com.bd" }],
        },
    },
    {
        id: "project_zodolive",
        keywords: ["zodolive", "zodo", "live streaming", "streaming"],
        patterns: [/zodo\s*live/i],
        priority: 8,
        response: {
            text: "ZodoLive is a global live streaming platform for iOS and Android. Asif built the entire admin dashboard from scratch — real-time stats, RBAC, glass UI theming, and Agora SDK integration.\n\nOutcome: 10,000+ active users. Real-time gifting processes thousands of transactions per minute.\n\nTech: Next.js, React, Node.js, TypeScript, AWS, PostgreSQL, GraphQL, Agora SDK",
            chips: ["Ticket Tomorrow", "Nexus RTC SDK", "All Projects"],
            links: [{ label: "Visit ZodoLive", url: "https://www.zodolive.com" }],
        },
    },
    {
        id: "project_nexus",
        keywords: ["nexus", "rtc", "webrtc", "real-time communication"],
        patterns: [/nexus/i, /rtc\s*sdk/i],
        priority: 8,
        response: {
            text: "Nexus RTC SDK is Asif's personal project — a production-grade, self-hosted real-time audio/video SDK (a full Agora RTC alternative). Includes media engine, signaling, analytics, and Kubernetes infrastructure.\n\nOutcome: Sub-50ms latency. ClickHouse analytics processes 1M+ QoE events per hour.\n\nTech: WebRTC, C++, Node.js, Kubernetes, Redis, ClickHouse, AWS",
            chips: ["Gunti", "All Projects"],
        },
    },
    {
        id: "project_gunti",
        keywords: ["gunti", "expense", "takatrack"],
        patterns: [/gunti/i, /expense\s*(manager|tracker)/i],
        priority: 8,
        response: {
            text: "Gunti (TakaTrack) is a cross-platform expense management app built with Kotlin (Android), Swift (iOS), and Flutter (cross-platform). Features offline-first architecture, biometric auth, and multi-currency support.\n\nTech: Kotlin, Jetpack Compose, Swift, SwiftUI, Flutter, Dart, SQLite, Hilt",
            chips: ["Nexus RTC SDK", "All Projects"],
            links: [{ label: "Read Blog Post", url: "/blog/building-gunti-expense-tracker" }],
        },
    },
    {
        id: "thanks",
        keywords: ["thanks", "thank", "thank you", "thx", "ty", "appreciate"],
        patterns: [/thank/i, /\bty\b/i, /\bthx\b/i],
        priority: 2,
        response: {
            text: "You're welcome! Feel free to ask anything else about Asif's work, or reach out directly if you'd like to collaborate.",
            chips: ["Contact", "Services", "Projects"],
        },
    },
    {
        id: "games",
        keywords: ["games", "game", "play", "arcade", "fun"],
        patterns: [/play\s*(a\s*)?game/i, /mini\s*games/i],
        priority: 4,
        response: {
            text: "Check out the Games section! There are 12 games including traditional South Asian board games (Sholo Guti, Bagh-Chal, Ludo, Moksha Patam) and classic arcade games (Snake, 2048, Minesweeper, and more).",
            chips: ["Projects", "Skills"],
            links: [{ label: "Play Games", url: "/games" }],
        },
    },
    {
        id: "blog",
        keywords: ["blog", "article", "articles", "posts", "writing", "read"],
        patterns: [/blog\s*posts?/i, /written\s*any/i],
        priority: 4,
        response: {
            text: "Asif writes about his technical projects and engineering insights. Check out the blog for deep-dives into building real products.",
            chips: ["Projects", "Skills"],
            links: [{ label: "Read Blog", url: "/blog" }],
        },
    },
];
