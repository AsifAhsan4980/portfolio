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
        type: "Ticketing Ecommerce",
        image: "https://s3.ap-southeast-1.amazonaws.com/www.cdntickettomorrow.com/public/meta/metaTickettomorrow.jpg.jpeg",
        description: "An online ticketing platform that facilitates easy purchase and management of event tickets. Includes secure payment options and user authentication with AWS serverless architecture.",
        id: "1",
        timeLine: "September 2023 - Present",
        technologies: ["Next.js", "React", "Redux", "AWS Lambda", "AppSync", "DynamoDB", "GraphQL", "TypeScript"],
        responsibilities: "Developed the frontend using Next.js and React, implemented AWS services for a serverless backend, integrated multiple payment gateways.",
        status: "Ongoing",
        website: "https://tickettomorrow.com.bd",
        challenge: "Building a high-availability ticketing system that handles concurrent ticket purchases without double-selling, while integrating local Bangladeshi payment gateways.",
        outcome: "Reduced page load times by 60% using SSR and AWS CloudFront CDN. Successfully handling thousands of concurrent users during major event launches."
    },
    {
        name: "ZodoLive",
        type: "Live Streaming Platform",
        image: "https://www.zodolive.com/logo.png",
        description: "A global live streaming and entertainment platform enabling creators and influencers to engage with audiences through interactive live sessions, gifting, and real-time interactions.",
        id: "2",
        timeLine: "2024 - Present",
        technologies: ["Next.js", "React", "Node.js", "AWS Amplify", "S3", "CloudFront", "DynamoDB", "PostgreSQL", "TypeScript"],
        responsibilities: "Designed scalable frontend applications, implemented backend services with Node.js and AWS Amplify, managed real-time interactions.",
        status: "Live",
        website: "https://www.zodolive.com",
        challenge: "Delivering sub-100ms latency for real-time gifting interactions across global audiences while keeping infrastructure costs manageable.",
        outcome: "Platform went live with 10,000+ active users. Real-time gifting system processes thousands of transactions per minute with zero downtime."
    },
    {
        name: "Admin Dashboard — ZodoLive",
        type: "Live Event Platform",
        image: "https://www.zodolive.com/logo.png",
        description: "An admin dashboard for managing live events, monitoring user activity, managing content, and overseeing the ZodoLive platform's operations.",
        id: "3",
        timeLine: "January 2024 - Present",
        technologies: ["React", "Node.js", "AWS Amplify", "S3", "EC2", "DynamoDB", "PostgreSQL", "JavaScript"],
        responsibilities: "Built responsive frontend interfaces using React, developed backend APIs with AWS Amplify and Node.js.",
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
        technologies: ["React", "React Native", "Node.js", "AWS", "Azure", "Google Cloud", "Swift", "Kotlin"],
        responsibilities: "Senior Software Engineer — designing and shipping full-stack web and mobile applications, architecting cloud infrastructure on AWS, and leading technical delivery across multiple client projects.",
        status: "Ongoing",
        website: "https://www.righttracksit.com/",
        challenge: "Delivering consistent, high-quality custom software across a diverse portfolio of clients with varying technical requirements and timelines.",
        outcome: "Contributing to 20+ client projects across Bangladesh and internationally, spanning fintech, healthcare, and e-commerce verticals."
    },
    {
        name: "Tribel",
        type: "Social Media",
        image: "https://cdntribel.com/public/uploads/post_images/Tribel_logo.png",
        description: "A hybrid social media platform combining features of Facebook and Twitter, targeted towards the US audience. Focuses on user engagement, content sharing, and community building.",
        id: "5",
        timeLine: "June 2022 - Present",
        technologies: ["React", "Node.js", "MongoDB", "Express", "AWS S3", "Amplify", "JavaScript"],
        responsibilities: "Led development of interactive social media features, managed data storage on MongoDB, optimized performance for large-scale user interactions.",
        status: "Active",
        website: "https://tribel.com",
        challenge: "Scaling a social media feed algorithm that can handle millions of posts while keeping the experience fast and relevant for each user.",
        outcome: "Platform serves hundreds of thousands of US users. Feed rendering optimized to under 200ms through intelligent caching and pagination strategies."
    },
    {
        name: "Wozaif",
        type: "Job Recruitment",
        image: "https://www.wozaif.com/logo.svg",
        description: "A job recruitment platform connecting job seekers and employers across Asia with advanced search, filtering, and multilingual support.",
        id: "6",
        timeLine: "January 2024 - Present",
        technologies: ["Next.js", "React", "i18n", "AWS Lambda", "AppSync", "S3", "Cognito", "GraphQL", "TypeScript"],
        responsibilities: "Developed and optimized the job search modules, integrated multilingual support, managed backend APIs with AWS AppSync and Lambda.",
        status: "Ongoing",
        website: "https://www.wozaif.com/",
        challenge: "Building a multilingual job platform that works seamlessly across Arabic, English, and other Asian languages including RTL layout support.",
        outcome: "Launched in 3 countries with full RTL support. Search performance optimized to under 300ms for complex multi-filter queries."
    },
    {
        name: "Pipo Bazar",
        type: "E-commerce Marketplace",
        image: "https://api.pipobazar.com/images/images-1688135566889.jpg",
        description: "An e-commerce platform connecting small vendors and customers in emerging markets with product listings, advanced search, and secure payment methods.",
        id: "7",
        timeLine: "March 2024 - October 2024",
        technologies: ["React", "Redux", "Node.js", "AWS Lambda", "S3", "DynamoDB", "Cognito", "Stripe", "TypeScript"],
        responsibilities: "Developed core e-commerce functionalities, integrated Stripe payment system, optimized UI for product discovery.",
        status: "Finished",
        website: "https://pipobazar.com",
        challenge: "Creating a vendor marketplace where small businesses with no tech experience could list and manage products easily.",
        outcome: "Onboarded 200+ vendors within the first month. Cart-to-checkout conversion optimized by 35% through UX improvements and faster payment flow."
    },
    {
        name: "Azan Backend & Dashboard",
        type: "Islamic Services Platform",
        image: "/assets/svg/azan-placeholder.png",
        description: "A backend system and admin dashboard for managing prayer times, notifications, and user data for an Islamic services platform.",
        id: "8",
        timeLine: "January 2022 - March 2022",
        technologies: ["Node.js", "Express", "MongoDB", "AWS Lambda", "S3", "DynamoDB", "React", "TypeScript"],
        responsibilities: "Developed RESTful APIs for prayer time calculations, designed admin dashboard, implemented location-based Azan updates.",
        status: "Finished",
        website: "",
        challenge: "Computing accurate prayer times across thousands of global locations using different Islamic calculation methods and accounting for DST.",
        outcome: "Delivered accurate prayer time calculations for 5000+ global locations. Push notification system achieved 98% delivery rate."
    },
    {
        name: "Doodle Odoo",
        type: "Company Portfolio",
        image: "https://s3.ap-southeast-1.amazonaws.com/www.thedoodleinc.com/other_doodle_images/OG-Home.png",
        description: "A portfolio website for Doodle showcasing company achievements, services, and project highlights with multilingual support.",
        id: "9",
        timeLine: "May 2024 - August 2024",
        technologies: ["Next.js", "React", "i18n", "AWS Amplify", "TypeScript"],
        responsibilities: "Implemented the company portfolio site with multilingual support, optimized performance with AWS Amplify.",
        status: "Finished",
        website: "https://odoo.thedoodleinc.com/",
        challenge: "Implementing a smooth multilingual experience with seamless language switching and SEO-optimized content in multiple languages.",
        outcome: "Achieved Lighthouse score of 95+ across all metrics. Multilingual SEO implementation improved organic traffic by 40%."
    },
    {
        name: "Doodle INC",
        type: "Company Portfolio",
        image: "https://www.thedoodleinc.com/asset/header/1200-by-675.jpg",
        description: "Main portfolio website for Doodle, showcasing company achievements, services, and project highlights.",
        id: "10",
        timeLine: "April 2023 - June 2023",
        technologies: ["Next.js", "React", "i18n", "AWS Amplify", "TypeScript"],
        responsibilities: "Implemented company portfolio site with multilingual support, focusing on responsiveness and performance.",
        status: "Finished",
        website: "https://www.thedoodleinc.com/",
        challenge: "Creating a visually striking portfolio that represents the agency's creative capabilities while maintaining top performance scores.",
        outcome: "Delivered ahead of schedule. Site became the agency's primary lead generation source, increasing inbound inquiries by 60%."
    },
    {
        name: "Creator AI",
        type: "AI Image & Video Generation Platform",
        image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
        description: "AI-powered image and video generation platform serving an iOS app. Users generate visual content via Claude AI (Haiku), managed through a Next.js admin dashboard with category & slider control, S3 asset storage, and AWS AppSync GraphQL backend.",
        id: "11",
        timeLine: "2024 - Present",
        technologies: ["Next.js", "TypeScript", "Claude AI (Haiku)", "AWS Amplify", "AppSync", "GraphQL", "S3", "Cognito", "Redux Toolkit", "Tailwind", "Shadcn"],
        responsibilities: "Built the full platform — Claude Haiku integration for AI image & video generation, GraphQL data layer with AppSync, Cognito auth, S3 asset pipeline, Redux Toolkit state, and the complete admin dashboard for content management.",
        status: "Live",
        website: "https://main.d2eujkywr6wbyq.amplifyapp.com/",
        challenge: "Integrating Claude AI's generation capabilities into a seamless iOS-first experience while managing costs, latency, and content moderation at scale.",
        outcome: "Platform serves thousands of AI-generated assets daily. Average generation latency under 3 seconds. Admin dashboard processes 500+ content updates daily."
    },
    {
        name: "Gunti",
        type: "Cross-Platform Expense Manager",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
        description: "Personal finance and expense tracking app built for Bangladesh. Tracks monthly spending, budgets, loans, and family group expenses with bKash/Nagad SMS auto-parsing. Supports both Bangla and English. Tagline: আপনার টাকা, আপনার হিসাব.",
        id: "12",
        timeLine: "2025 - Present",
        technologies: ["Kotlin", "Jetpack Compose", "Swift", "SwiftUI", "Next.js 15", "Node.js", "TypeScript", "PostgreSQL", "Redis", "Docker", "next-intl"],
        responsibilities: "Architected the full-stack solution — Android app with Kotlin & Jetpack Compose, iOS app with Swift & SwiftUI, Next.js web platform, and Node.js microservices backend with SMS parsing for local payment platforms.",
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
        description: "Production-grade, self-hosted real-time audio/video SDK platform — a full Agora RTC alternative. Ships cross-platform SDKs (iOS, Android, Web, Flutter, React Native, Unity), a C++ media engine, WebRTC signaling server, cloud recording, live transcription, and QoE analytics.",
        id: "13",
        timeLine: "2024 - Present",
        technologies: ["WebRTC", "TypeScript", "Node.js", "C++", "Kotlin", "Swift", "Flutter", "React Native", "LiveKit SFU", "ClickHouse", "Redis", "PostgreSQL", "Kubernetes", "Docker", "Terraform"],
        responsibilities: "Designed and built the full SDK platform — WebRTC signaling server, Web SDK, Android/iOS wrappers, Flutter & React Native plugins, Kubernetes infrastructure, and QoE analytics pipeline.",
        status: "Ongoing",
        website: "",
        personal: true,
        challenge: "Building a self-hostable alternative to Agora RTC that supports all major platforms (iOS, Android, Web, Flutter, React Native, Unity) without sacrificing call quality or reliability.",
        outcome: "Achieved sub-50ms latency on local networks. ClickHouse analytics pipeline processes 1M+ QoE events per hour. K8s infrastructure auto-scales from 10 to 10,000 concurrent sessions."
    },
    {
        name: "Nagorik",
        type: "Civic Issue Reporting Platform",
        image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80",
        description: "A civic issue reporting platform for Bangladesh — citizens report potholes, garbage, broken infrastructure, and other local problems. Anonymous submissions get a unique NAG-YYYY-XXXXXX tracking code. Government admins verify, assign, and resolve reports through a dedicated dashboard with Recharts analytics.",
        id: "14",
        timeLine: "2025 - Present",
        technologies: ["Next.js 16", "React 19", "TypeScript", "Node.js", "Express", "Prisma", "PostgreSQL", "AWS S3", "Docker", "Zustand", "TanStack Query"],
        responsibilities: "Designed and built the full platform — 6 backend microservices (api-gateway, auth, users, issues, locations, upload), shared Prisma monorepo schema, Next.js 16 frontend with anonymous reporting, S3 presigned photo uploads, Division/District/Upazila location hierarchy, and a government admin dashboard.",
        status: "Ongoing",
        website: "",
        personal: true,
        challenge: "Enabling anonymous civic reporting without enabling abuse — solving the friction vs. accountability tradeoff through per-report tracking codes and lightweight device fingerprinting for upvote deduplication.",
        outcome: "Full reporting lifecycle implemented (pending → verified → assigned → in_progress → resolved → closed). Location hierarchy covers all 495 Bangladesh Upazilas. Admin dashboard includes upvote-weighted priority queue and resolution-rate analytics."
    },
    {
        name: "Uppsala Central Gross",
        type: "Grocery E-Commerce",
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80",
        description: "A Swedish grocery e-commerce platform for Uppsala Central Gross — a local grocery store. Built with a vanilla JS SPA frontend, Express.js backend, and Prisma/SQLite database. Three-server architecture: customer storefront, admin panel, and API. A friend's project I contributed to.",
        id: "15",
        timeLine: "2024",
        technologies: ["JavaScript", "HTML5", "CSS3", "Express.js", "Prisma", "SQLite", "Node.js"],
        responsibilities: "Contributed to the vanilla JS SPA frontend (no framework), Express.js REST API, and Prisma/SQLite data layer. Built product catalog, cart, checkout, and admin inventory management.",
        status: "Finished",
        website: "https://uppsalacentralgross.se",
        personal: false,
        challenge: "Building a fully functional grocery e-commerce SPA with no frontend framework — pure vanilla JS with custom routing, state management, and DOM diffing to keep the bundle lean.",
        outcome: "Live at uppsalacentralgross.se. Three-server architecture (API:8080, admin:4001, storefront:4000) runs on a single VPS with minimal overhead. Full product management for store staff."
    },
];

export const statusConfig: Record<string, { label: string; color: string; glow: string }> = {
    Live:    { label: "LIVE",    color: "text-green-400 border-green-400/40 bg-green-400/8",  glow: "bg-green-400" },
    Ongoing: { label: "ONGOING", color: "text-[#469D89] border-[#469D89]/40 bg-[#469D89]/8", glow: "bg-[#469D89]" },
    Active:  { label: "ACTIVE",  color: "text-blue-400 border-blue-400/40 bg-blue-400/8",    glow: "bg-blue-400" },
    Finished:{ label: "DONE",    color: "text-muted-foreground border-border/40",             glow: "bg-muted-foreground" },
};
