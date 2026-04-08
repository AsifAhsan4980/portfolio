export interface Project {
    id: string;
    name: string;
    type: string;
    image: string;
    description: string;
    timeLine: string;
    technologies: string[];
    responsibilities: string;
    status: string;
    website: string;
    personal?: boolean;
    challenge?: string;
    outcome?: string;
}

export const projects: Project[] = [
    {
        name: "Ticket Tomorrow",
        type: "Ticketing Platform",
        image: "https://s3.ap-southeast-1.amazonaws.com/www.cdntickettomorrow.com/public/meta/metaTickettomorrow.jpg.jpeg",
        description: "An online ticketing platform with complete frontend, backend, and admin dashboard. Features user, organization, ticketing, and promotion systems with integrated bKash and SSLCommerz payments including full refund flows.",
        id: "1",
        timeLine: "September 2023 - Present",
        technologies: ["Next.js", "React", "TypeScript", "Redux", "AWS Lambda", "AppSync", "DynamoDB", "Cognito"],
        responsibilities: "Architected and developed the complete system (frontend, backend, admin dashboard). Built user, organization, ticketing, and promotion systems. Integrated bKash and SSLCommerz with full refund flows. Implemented backend PDF generation and mailing system. Built role-based dynamic UI system. Mentored junior developers and provided architecture guidance. Currently contributing to UI redesign and stadium system.",
        status: "Ongoing",
        website: "https://tickettomorrow.com.bd",
        challenge: "Building a high-availability ticketing system that handles concurrent ticket purchases without double-selling, while integrating local Bangladeshi payment gateways with full refund flows.",
        outcome: "Reduced page load times by 60% using SSR and AWS CloudFront CDN. Successfully handling thousands of concurrent users during major event launches."
    },
    {
        name: "ZodoLive",
        type: "Live Streaming Platform",
        image: "https://www.zodolive.com/logo.png",
        description: "A global live streaming and entertainment platform (Android & iOS) enabling creators and influencers to engage with audiences through interactive live sessions, gifting, and real-time interactions.",
        id: "2",
        timeLine: "2024 - Present",
        technologies: ["Next.js", "React", "Node.js", "TypeScript", "AWS Lambda", "AppSync", "DynamoDB", "PostgreSQL", "S3", "Cognito", "GraphQL", "Agora SDK"],
        responsibilities: "Built the entire admin dashboard from scratch including real-time statistics, advanced theme management, and full RBAC. Implemented glass UI theme system with dynamic customization. Integrated Agora SDK for live user monitoring. Designed and deployed marketing website end-to-end. Developed automated bot systems for engagement simulation. Built backend services using AWS Lambda and AppSync.",
        status: "Live",
        website: "https://www.zodolive.com",
        challenge: "Delivering sub-100ms latency for real-time gifting interactions across global audiences while keeping infrastructure costs manageable.",
        outcome: "Platform went live with 10,000+ active users. Real-time gifting system processes thousands of transactions per minute with zero downtime."
    },
    {
        name: "Admin Dashboard — ZodoLive",
        type: "Live Event Platform",
        image: "https://www.zodolive.com/logo.png",
        description: "A comprehensive admin dashboard for managing live events, monitoring user activity, managing content, and overseeing the ZodoLive platform's operations. Features include user management (agency/host/reseller), secure single-device login, diamond transaction system, and DynamoDB-PostgreSQL synchronization.",
        id: "3",
        timeLine: "January 2024 - Present",
        technologies: ["React", "Node.js", "TypeScript", "AWS Lambda", "AppSync", "S3", "Cognito", "DynamoDB", "PostgreSQL", "Agora SDK"],
        responsibilities: "Built responsive frontend with React. Developed user management (agency/host/reseller), secure single-device login system, diamond transaction system (admin → reseller → user), DynamoDB ↔ PostgreSQL synchronization, PK battle system, post & story backend services, cron jobs (VIP expiry, reports, cleanup), purchase flows, user heartbeat system and analytics, and data migration pipelines.",
        status: "Ongoing",
        website: "https://www.zlaprit.zodolive.com/home",
        challenge: "Creating an intuitive dashboard that gives operators real-time visibility into thousands of concurrent streams and user activities.",
        outcome: "Reduced operational response time by 45% through real-time dashboards and automated alerting systems."
    },
    {
        name: "Right Tracks IT",
        type: "Custom Software Development",
        image: "https://www.righttracksit.com/right-tracks-meta-image.jpeg",
        description: "A software development agency delivering custom web, mobile, and cloud solutions across fintech, healthcare, and e-commerce. Working here as Senior Software Engineer, building production-grade systems for clients in Bangladesh and internationally.",
        id: "4",
        timeLine: "2025 - Present",
        technologies: ["React", "Next.js", "Node.js", "TypeScript", "AWS", "Swift", "Kotlin"],
        responsibilities: "Senior Software Engineer — designing and shipping full-stack web and mobile applications, architecting cloud infrastructure on AWS, and leading technical delivery across multiple client projects.",
        status: "Ongoing",
        website: "https://www.righttracksit.com/",
        challenge: "Delivering consistent, high-quality custom software across a diverse portfolio of clients with varying technical requirements and timelines.",
        outcome: "Contributing to 20+ client projects across Bangladesh and internationally, spanning fintech, healthcare, and e-commerce verticals."
    },
    {
        name: "Tribel",
        type: "Social Media Platform",
        image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&q=80",
        description: "A hybrid social media platform combining features of Facebook and Twitter, targeted towards the US audience. Developed backend systems with occasional frontend contributions. Recognized as a star contributor for bug resolution and stability improvements.",
        id: "5",
        timeLine: "June 2022 - Present",
        technologies: ["React", "Node.js", "MongoDB", "Express", "AWS S3", "Amplify", "FFmpeg", "AWS Rekognition"],
        responsibilities: "Developed backend systems with occasional frontend contributions. Delivered features: posts, stories, collaborations, feeds, trending system. Built user retention mechanisms. Optimized media processing pipelines using FFmpeg. Integrated AWS Rekognition for automated moderation.",
        status: "Active",
        website: "https://tribel.com",
        challenge: "Scaling a social media feed algorithm that can handle millions of posts while keeping the experience fast and relevant for each user.",
        outcome: "Platform serves hundreds of thousands of US users. Feed rendering optimized to under 200ms through intelligent caching and pagination strategies."
    },
    {
        name: "Wozaif",
        type: "Recruitment Platform",
        image: "https://www.wozaif.com/logo.svg",
        description: "A job recruitment platform connecting job seekers and employers across Asia with advanced search, filtering, and multilingual support including full RTL layout. Led development as Team Lead.",
        id: "6",
        timeLine: "January 2024 - Present",
        technologies: ["Next.js", "React", "TypeScript", "Redux", "Tailwind", "i18n", "AWS Lambda", "AppSync", "S3", "Cognito"],
        responsibilities: "Led development and converted Figma designs into production-ready application. Designed full system architecture (employer, employee, role management). Implemented authentication and authorization systems. Delivered multilingual platform with RTL support.",
        status: "Ongoing",
        website: "https://www.wozaif.com/",
        challenge: "Building a multilingual job platform that works seamlessly across Arabic, English, and other Asian languages including RTL layout support.",
        outcome: "Launched in 3 countries with full RTL support. Search performance optimized to under 300ms for complex multi-filter queries."
    },
    {
        name: "Pipo Bazar",
        type: "E-commerce Marketplace",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
        description: "An e-commerce platform connecting small vendors and customers in emerging markets with product listings, advanced search, cart, checkout, and secure Stripe payment integration.",
        id: "7",
        timeLine: "March 2024 - October 2024",
        technologies: ["React", "Node.js", "TypeScript", "AWS Lambda", "S3", "DynamoDB", "Cognito", "Stripe"],
        responsibilities: "Built product listing, search, cart, and checkout systems. Integrated Stripe payments. Improved conversion rate by 35%.",
        status: "Finished",
        website: "https://pipobazar.com",
        challenge: "Creating a vendor marketplace where small businesses with no tech experience could list and manage products easily.",
        outcome: "Onboarded 200+ vendors within the first month. Cart-to-checkout conversion optimized by 35% through UX improvements and faster payment flow."
    },
    {
        name: "Azan Backend & Dashboard",
        type: "Islamic Services Platform",
        image: "/assets/svg/azan-placeholder.png",
        description: "A backend system and admin dashboard for managing global prayer times, notifications, and user data for an Islamic services platform. Built REST APIs for prayer time calculations with 98% notification delivery rate.",
        id: "8",
        timeLine: "2021",
        technologies: ["Node.js", "Express", "MongoDB", "AWS Lambda", "React"],
        responsibilities: "Built REST APIs for global prayer time calculations. Developed admin dashboard and notification system. Achieved 98% notification delivery rate.",
        status: "Finished",
        website: "",
        challenge: "Computing accurate prayer times across thousands of global locations using different Islamic calculation methods and accounting for DST.",
        outcome: "Delivered accurate prayer time calculations for 5000+ global locations. Push notification system achieved 98% delivery rate."
    },
    {
        name: "Doodle Odoo",
        type: "Company Portfolio",
        image: "https://s3.ap-southeast-1.amazonaws.com/www.thedoodleinc.com/other_doodle_images/OG-Home.png",
        description: "A multilingual SEO-optimized portfolio platform for Doodle showcasing company achievements, services, and project highlights. Improved organic traffic by 40%.",
        id: "9",
        timeLine: "May 2024 - August 2024",
        technologies: ["Next.js", "React", "TypeScript", "AWS Amplify", "i18n"],
        responsibilities: "Developed multilingual SEO-optimized platform. Improved organic traffic by 40%.",
        status: "Finished",
        website: "https://odoo.thedoodleinc.com/",
        challenge: "Implementing a smooth multilingual experience with seamless language switching and SEO-optimized content in multiple languages.",
        outcome: "Achieved Lighthouse score of 95+ across all metrics. Multilingual SEO implementation improved organic traffic by 40%."
    },
    {
        name: "Doodle INC",
        type: "Company Portfolio",
        image: "https://www.thedoodleinc.com/asset/header/1200-by-675.jpg",
        description: "Main multilingual portfolio website for Doodle with high performance (Lighthouse 95+). Increased inbound leads by 60%.",
        id: "10",
        timeLine: "April 2023 - June 2023",
        technologies: ["Next.js", "React", "TypeScript", "AWS Amplify", "i18n"],
        responsibilities: "Built multilingual portfolio website with high performance (Lighthouse 95+). Increased inbound leads by 60%.",
        status: "Finished",
        website: "https://www.thedoodleinc.com/",
        challenge: "Creating a visually striking portfolio that represents the agency's creative capabilities while maintaining top performance scores.",
        outcome: "Delivered ahead of schedule. Site became the agency's primary lead generation source, increasing inbound inquiries by 60%."
    },
    {
        name: "Creator AI",
        type: "AI Image & Video Generation Platform",
        image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
        description: "AI platform powering two applications: Paint (image generation) and Vida (video generation) for iOS and Android. Built unified backend and admin dashboard system with content, category, and slider management. Integrated Gemini Nano and Banana for AI generation pipelines.",
        id: "11",
        timeLine: "2024 - Present",
        technologies: ["Next.js", "TypeScript", "AWS Amplify", "AppSync", "GraphQL", "S3", "Cognito", "Redux Toolkit", "Tailwind", "Shadcn"],
        responsibilities: "Built AI platform powering two applications (Paint and Vida). Developed unified backend and admin dashboard system. Implemented content, category, and slider management system. Integrated Gemini Nano and Banana for AI generation pipelines.",
        status: "Live",
        website: "https://main.d2eujkywr6wbyq.amplifyapp.com/",
        challenge: "Integrating AI generation capabilities into a seamless mobile-first experience while managing costs, latency, and content moderation at scale.",
        outcome: "Platform serves thousands of AI-generated assets daily. Average generation latency under 3 seconds. Admin dashboard processes 500+ content updates daily."
    },
    {
        name: "Gunti",
        type: "Cross-Platform Expense Manager",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
        description: "Cross-platform expense management application (Android + Web) with budgeting, analytics, RBAC, and subscription system. Local-first architecture with premium sync. Tagline: আপনার টাকা, আপনার হিসাব.",
        id: "12",
        timeLine: "2026 - Present",
        technologies: ["Kotlin", "Next.js", "Node.js", "PostgreSQL", "Redis", "Docker"],
        responsibilities: "Built cross-platform application (Android + Web). Implemented budgeting, analytics, RBAC, and subscription system. Local-first architecture with premium sync.",
        status: "Ongoing",
        website: "",
        personal: true,
        challenge: "Parsing unstructured SMS messages from bKash and Nagad (local mobile payment platforms) to automatically categorize expenses without user input.",
        outcome: "SMS parsing accuracy of 94%+ for bKash/Nagad transactions. Supports 15+ expense categories with automated tagging and monthly budget alerts."
    },
    {
        name: "Nexus RTC SDK",
        type: "Real-Time Communications SDK",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
        description: "Production-grade, self-hosted real-time audio/video SDK platform — a full Agora RTC alternative. Built real-time communication SDK with media engine, signaling, analytics, and infrastructure. Achieved sub-50ms latency with scalable Kubernetes setup.",
        id: "13",
        timeLine: "2025 - Present",
        technologies: ["WebRTC", "C++", "Node.js", "Kubernetes", "Redis", "ClickHouse", "AWS"],
        responsibilities: "Built real-time communication SDK (Agora alternative). Developed media engine, signaling, analytics, and infrastructure. Achieved sub-50ms latency with scalable Kubernetes setup.",
        status: "Ongoing",
        website: "",
        personal: true,
        challenge: "Building a self-hostable alternative to Agora RTC that supports all major platforms without sacrificing call quality or reliability.",
        outcome: "Achieved sub-50ms latency on local networks. ClickHouse analytics pipeline processes 1M+ QoE events per hour. K8s infrastructure auto-scales from 10 to 10,000 concurrent sessions."
    },
    {
        name: "Nagorik",
        type: "Civic Issue Reporting Platform",
        image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80",
        description: "A civic reporting system with microservices architecture for Bangladesh — citizens report potholes, garbage, broken infrastructure, and other local problems. Includes admin dashboard and nationwide coverage.",
        id: "14",
        timeLine: "2025 - Present",
        technologies: ["Next.js", "Node.js", "PostgreSQL", "Docker"],
        responsibilities: "Built civic reporting system with microservices architecture. Implemented admin dashboard and nationwide coverage.",
        status: "Ongoing",
        website: "",
        personal: true,
        challenge: "Enabling anonymous civic reporting without enabling abuse — solving the friction vs. accountability tradeoff through per-report tracking codes and lightweight device fingerprinting.",
        outcome: "Full reporting lifecycle implemented (pending → verified → assigned → in_progress → resolved → closed). Location hierarchy covers all 495 Bangladesh Upazilas. Admin dashboard includes upvote-weighted priority queue and resolution-rate analytics."
    },
    {
        name: "Uppsala Central Gross",
        type: "Grocery E-Commerce",
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80",
        description: "A Swedish grocery e-commerce platform for Uppsala Central Gross. Contributing to the grocery e-commerce system with backend and mobile integrations. Deployment in progress.",
        id: "15",
        timeLine: "2026 - Present",
        technologies: ["Node.js", "Express", "Prisma", "SQLite", "Kotlin"],
        responsibilities: "Contributing to grocery e-commerce system. Developed backend and mobile integrations.",
        status: "Ongoing",
        website: "https://uppsalacentralgross.se",
        personal: false,
        challenge: "Building a fully functional grocery e-commerce system with backend services and mobile integrations for a Swedish local grocery store.",
        outcome: "Live at uppsalacentralgross.se with full product management for store staff."
    },
];

export const statusConfig: Record<string, { label: string; color: string; glow: string }> = {
    Live:    { label: "LIVE",    color: "text-green-400 border-green-400/40 bg-green-400/8",  glow: "bg-green-400" },
    Ongoing: { label: "ONGOING", color: "text-[#469D89] border-[#469D89]/40 bg-[#469D89]/8", glow: "bg-[#469D89]" },
    Active:  { label: "ACTIVE",  color: "text-blue-400 border-blue-400/40 bg-blue-400/8",    glow: "bg-blue-400" },
    Finished:{ label: "DONE",    color: "text-muted-foreground border-border/40",             glow: "bg-muted-foreground" },
};
