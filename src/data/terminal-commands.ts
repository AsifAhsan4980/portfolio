export interface CommandOutput {
    type: "text" | "list" | "link" | "error";
    content: string;
    items?: string[];
    url?: string;
}

export interface Command {
    description: string;
    execute: () => CommandOutput[];
}

export const commands: Record<string, Command> = {
    help: {
        description: "List available commands",
        execute: () => [
            { type: "text", content: "Available commands:" },
            {
                type: "list",
                content: "",
                items: [
                    "help        — Show this help message",
                    "about       — Who am I?",
                    "skills      — Technical skills overview",
                    "projects    — Featured projects",
                    "experience  — Work experience",
                    "contact     — Get in touch",
                    "resume      — Download my resume",
                    "socials     — Social media links",
                    "clear       — Clear terminal",
                ],
            },
        ],
    },

    about: {
        description: "About me",
        execute: () => [
            { type: "text", content: "━━━ About Asif Ahsan ━━━" },
            {
                type: "text",
                content:
                    "Senior Software Engineer with 5+ years of professional experience. Specializing in scalable distributed systems, real-time platforms, and cloud-native architectures. Shipped 14+ projects across 5+ countries, serving 20+ clients and impacting 100K+ users.",
            },
            { type: "text", content: "" },
            { type: "text", content: "Location: Dhaka, Bangladesh" },
            { type: "text", content: "Education: BSc in CSE — BRAC University" },
        ],
    },

    skills: {
        description: "Technical skills",
        execute: () => [
            { type: "text", content: "━━━ Tech Stack ━━━" },
            {
                type: "list",
                content: "",
                items: [
                    "Frontend  → React, Next.js, TypeScript, Tailwind CSS",
                    "Backend   → Node.js, Express, GraphQL, REST",
                    "Mobile    → Kotlin, Swift, Flutter, Jetpack Compose",
                    "Cloud     → AWS (Lambda, AppSync, DynamoDB, S3, Cognito)",
                    "Database  → PostgreSQL, MongoDB, DynamoDB, Redis",
                    "DevOps    → Docker, Kubernetes, CI/CD, Nginx",
                    "Real-Time → WebRTC, Agora SDK, WebSockets",
                    "AI/ML     → Gemini Nano, Banana, Claude API",
                ],
            },
        ],
    },

    projects: {
        description: "Featured projects",
        execute: () => [
            { type: "text", content: "━━━ Featured Projects ━━━" },
            {
                type: "list",
                content: "",
                items: [
                    "Ticket Tomorrow  — Ticketing platform (Next.js, AWS)",
                    "ZodoLive         — Live streaming platform (Agora, React)",
                    "Tribel           — Social media (FFmpeg, AWS Rekognition)",
                    "Creator AI       — AI generation (Gemini Nano, Banana)",
                    "Gunti            — Expense manager (Kotlin, Swift, Flutter)",
                    "Nexus RTC SDK    — Real-time communication SDK",
                ],
            },
            { type: "link", content: "View all projects →", url: "/projects" },
        ],
    },

    experience: {
        description: "Work experience",
        execute: () => [
            { type: "text", content: "━━━ Work Experience ━━━" },
            {
                type: "list",
                content: "",
                items: [
                    "2025–Present  Right Tracks IT Ltd — Senior Software Engineer",
                    "2022–2025     Doodle Technologies Ltd — Software Engineer",
                    "2021–2022     Tech Hack Inc. (Canada) — Software Engineer",
                    "2021          Bengal Software Ltd — Junior Software Engineer",
                    "2021          Gononet Ltd — Intern Software Engineer",
                ],
            },
        ],
    },

    contact: {
        description: "Contact info",
        execute: () => [
            { type: "text", content: "━━━ Contact ━━━" },
            { type: "text", content: "Email: asifahsan727@gmail.com" },
            { type: "text", content: "Phone: +8801795870994" },
            { type: "text", content: "WhatsApp: +8801685436578" },
            { type: "link", content: "Send a message →", url: "/hire-me" },
        ],
    },

    resume: {
        description: "Download resume",
        execute: () => [
            { type: "text", content: "Downloading resume..." },
            { type: "link", content: "Click here if download doesn't start →", url: "/assets/pdf/Resume_of_Asif_Ahsan.pdf" },
        ],
    },

    socials: {
        description: "Social media links",
        execute: () => [
            { type: "text", content: "━━━ Socials ━━━" },
            { type: "link", content: "GitHub", url: "https://github.com/AsifAhsan4980" },
            { type: "link", content: "LinkedIn", url: "https://www.linkedin.com/in/asif-ahsan-27832012b/" },
            { type: "link", content: "Facebook", url: "https://www.facebook.com/asif.ahsan727/" },
            { type: "link", content: "Instagram", url: "https://www.instagram.com/aragorn_isildurr/" },
        ],
    },
};
