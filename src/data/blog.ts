export type SectionType = "h2" | "h3" | "p" | "code" | "ul" | "callout" | "divider";

export interface Section {
    type: SectionType;
    content?: string;
    language?: string;
    items?: string[];
}

export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    readTime: string;
    tags: string[];
    excerpt: string;
    sections: Section[];
}

export const blogPosts: BlogPost[] = [
    // ─────────────────────────────────────────────
    //  POST 1 — Gunti / TakaTrack
    // ─────────────────────────────────────────────
    {
        slug: "building-gunti-expense-tracker",
        title: "Building TakaTrack (Gunti): 4 Platforms, 11 Microservices, and Everything I Learned Shipping a Personal Finance Ecosystem for Bangladesh",
        date: "Mar 2025",
        readTime: "16 min read",
        tags: ["Kotlin", "Swift", "Next.js", "Microservices", "Bangladesh", "Personal Project"],
        excerpt:
            "TakaTrack started as a simple expense tracker and became something I didn't expect: a full personal finance ecosystem with native Android and iOS apps, a Next.js PWA, an admin dashboard, 11 backend microservices, Firebase Phone OTP, OpenAI-powered insights, and a Zakat calculator. Here's what building it actually looked like.",
        sections: [
            {
                type: "p",
                content:
                    "TakaTrack started with a single question: why does every personal finance app ignore how money actually moves in Bangladesh? bKash, Nagad, Rocket — these are the payment rails for over 60 million Bangladeshis. Every transaction generates an SMS. There are no bank APIs, no card webhooks, no open banking standards. Just SMS messages.",
            },
            {
                type: "p",
                content:
                    "I started building what I thought would be a simple SMS-parsing expense tracker. Twelve months later, TakaTrack (branded as Gunti — Bengali for 'count') is a four-platform ecosystem with 11 backend microservices, native Android and iOS apps, a Next.js PWA, an admin dashboard, and more features than I originally planned. Here's the honest account of building it.",
            },
            {
                type: "h2",
                content: "The Full Architecture",
            },
            {
                type: "p",
                content:
                    "TakaTrack has four client surfaces, each built natively for its platform:",
            },
            {
                type: "ul",
                items: [
                    "Android: Kotlin + Jetpack Compose — primary platform, SMS reading with WorkManager background polling, Material 3 UI",
                    "iOS: Swift + SwiftUI — manual entry with smart prediction, Shortcuts integration",
                    "Web (desktop): Next.js 15 PWA — full dashboard with Recharts analytics, family group management, installable via service worker (Serwist)",
                    "Admin Dashboard: Next.js 15 — internal tools, user management, subscription tracking, feature flags",
                ],
            },
            {
                type: "p",
                content:
                    "Behind them, 11 Node.js microservices each own a specific business domain with their own PostgreSQL database:",
            },
            {
                type: "code",
                language: "text",
                content: `Service            Port   Responsibility
─────────────────────────────────────────────────────
api-gateway        3000   JWT verification, rate limiting, routing
auth-service       3001   Firebase Phone OTP → JWT tokens
user-service       3002   Profiles, subscriptions, family groups
expense-service    3003   CRUD, categories, receipt uploads (S3)
budget-service     3004   Monthly budgets, threshold alerts
loan-service       3005   EMI schedules, Zakat calculator
notification-svc   3006   FCM push, bill reminders
sms-service        3007   Parses bKash / Nagad / Rocket / bank SMS
analytics-service  3008   Reports, trends, OpenAI insights
payment-service    3009   bKash tokenized, Nagad, SSLCommerz
admin-service      3010   Feature flags, promo codes, user ops`,
            },
            {
                type: "h2",
                content: "Security First: The BFF Pattern",
            },
            {
                type: "p",
                content:
                    "One of the most important architecture decisions was implementing the Backend for Frontend (BFF) pattern for the web app. The Next.js server acts as a secure intermediary — it handles authentication with the auth-service and issues JWT tokens stored in httpOnly cookies. The browser never sees the JWT. Client-side JavaScript has no way to read or steal it.",
            },
            {
                type: "code",
                language: "typescript",
                content: `// Next.js API route — acts as BFF
// /app/api/auth/login/route.ts
export async function POST(req: Request) {
    const { phone, otpCode } = await req.json();

    // Verify OTP with Firebase on the server
    const { token } = await authService.verifyOtp({ phone, otpCode });

    // JWT lives only in a httpOnly cookie — never in JS
    const response = NextResponse.json({ success: true });
    response.cookies.set("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
    });
    return response;
}`,
            },
            {
                type: "callout",
                content:
                    "This BFF pattern is the right way to handle auth in Next.js apps that talk to microservices. Storing JWTs in localStorage or even sessionStorage exposes them to XSS attacks. httpOnly cookies are immune — they're sent by the browser automatically but can never be read by JavaScript.",
            },
            {
                type: "h2",
                content: "Phone-Only Authentication — A Deliberate Bangladesh Choice",
            },
            {
                type: "p",
                content:
                    "TakaTrack has no email login, no Google sign-in, no password. Purely phone number + OTP via Firebase Phone Auth. This is intentional. Bangladesh has some of the highest mobile penetration rates in South Asia. Almost every adult has a phone number. Email usage is far less universal, especially among non-tech-savvy users. Phone OTP removes the friction of remembering passwords and is instantly familiar to anyone who uses bKash.",
            },
            {
                type: "p",
                content:
                    "Firebase Phone Auth handles OTP delivery and verification. On successful verification, Firebase returns a credential. The auth-service exchanges this for a platform JWT, which the BFF stores in the httpOnly cookie. Subsequent API calls are authenticated via that cookie — the mobile apps use Authorization headers with their own shorter-lived tokens.",
            },
            {
                type: "h2",
                content: "The SMS Intelligence Service",
            },
            {
                type: "p",
                content:
                    "The sms-service is a dedicated microservice that parses incoming transaction messages from four providers: bKash, Nagad, Rocket, and Bangladeshi banks (Islami Bank, Dutch-Bangla, BRAC Bank, etc.). Each provider has multiple message templates — send money, receive money, merchant payment, cash out, salary credit, airtime top-up, and more.",
            },
            {
                type: "code",
                language: "typescript",
                content: `// sms-service: transaction extraction from raw SMS body
interface ParsedTransaction {
    platform: "bkash" | "nagad" | "rocket" | "bank";
    type: "send" | "receive" | "payment" | "cashout" | "cashin";
    amount: number;
    balance?: number;
    recipient?: string;
    trxId?: string;
    timestamp: Date;
    confidence: number; // 0–1, how certain we are about the parse
}

const BKASH_PATTERNS: SmsPattern[] = [
    {
        type: "send",
        regex: /You have sent Tk ([\d,]+\.\d{2}) to (\d{11}).*?balance is Tk ([\d,]+\.\d{2}).*?TrxID (\w+)/s,
        groups: { amount: 1, recipient: 2, balance: 3, trxId: 4 },
    },
    {
        type: "receive",
        regex: /Tk ([\d,]+\.\d{2}) has been credited.*?by (\d{11}).*?TrxID (\w+)/s,
        groups: { amount: 1, sender: 2, trxId: 3 },
    },
    {
        type: "payment",
        regex: /You have paid Tk ([\d,]+\.\d{2}) to (.+?) successfully.*?TrxID (\w+)/s,
        groups: { amount: 1, merchant: 2, trxId: 3 },
    },
    // 9 more bKash patterns, 8 Nagad patterns, 6 Rocket patterns, 12 bank patterns...
];`,
            },
            {
                type: "p",
                content:
                    "The service returns a parsed transaction or a low-confidence flag that triggers a manual review prompt in the app. The parsing accuracy across bKash and Nagad messages is currently at 94%.",
            },
            {
                type: "h2",
                content: "OpenAI-Powered Spending Insights",
            },
            {
                type: "p",
                content:
                    "The analytics-service does standard reporting (monthly summaries, category breakdowns, trend charts via Recharts on the web). But the most interesting feature is AI-powered insights using the OpenAI API. Once a month, the service aggregates a user's anonymized spending patterns and sends them to GPT-4 with a carefully crafted prompt:",
            },
            {
                type: "code",
                language: "typescript",
                content: `async function generateInsights(userId: string): Promise<string> {
    const summary = await buildSpendingSummary(userId); // aggregated, no PII

    const prompt = \`
You are a personal finance advisor for a Bangladeshi user.
Analyze this spending summary and provide 3 specific, actionable insights
in simple language. Focus on patterns, not lectures.

Spending summary (last 30 days):
- Total spent: ৳\${summary.total}
- Top categories: \${summary.topCategories.join(", ")}
- vs. last month: \${summary.changeVsLastMonth}%
- Budget adherence: \${summary.budgetAdherence}%
- Unusual transactions: \${summary.unusualItems.join(", ")}

Write in a friendly, non-judgmental tone. Use Bengali currency (৳).
\`;

    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini", // cost-effective for monthly summaries
        messages: [{ role: "user", content: prompt }],
        max_tokens: 300,
    });

    return response.choices[0].message.content ?? "";
}`,
            },
            {
                type: "h2",
                content: "The Zakat Calculator — A Feature I Didn't Plan",
            },
            {
                type: "p",
                content:
                    "The loan-service includes an EMI calculator as expected. What I didn't plan for was the Zakat calculator. Bangladesh is 90% Muslim, and Zakat — an annual religious obligation to donate 2.5% of qualifying wealth above a minimum threshold (Nisab) — is something many users asked about early in beta.",
            },
            {
                type: "p",
                content:
                    "The Nisab threshold is calculated in silver (85g) or gold (612.35g), which means it fluctuates with commodity prices. The Zakat calculator in TakaTrack uses current gold/silver prices fetched from a commodity API, calculates the Nisab in BDT, compares it to the user's declared assets, and outputs their Zakat obligation. It's a simple calculation but one that users interact with once a year and have to look up manually otherwise. Small feature, disproportionate value.",
            },
            {
                type: "h2",
                content: "Payment Integrations — bKash Tokenized is Hard",
            },
            {
                type: "p",
                content:
                    "TakaTrack has a subscription tier (premium features: AI insights, family groups, advanced analytics). The payment-service handles three providers: bKash tokenized payment, Nagad, and SSLCommerz (card payments). bKash tokenized was by far the most complex to integrate.",
            },
            {
                type: "p",
                content:
                    "bKash's tokenized payment flow lets users authorize TakaTrack once and then be charged automatically for recurring subscriptions without approving each transaction. The merchant agreement process is bureaucratic — it requires a trade license, TIN certificate, and bank account documentation. The technical integration itself involves a multi-step OAuth-like flow where TakaTrack exchanges a grant token for an ID and access token, which are then used to execute charges.",
            },
            {
                type: "h2",
                content: "Family Groups and Real-Time Sync",
            },
            {
                type: "p",
                content:
                    "The user-service manages family groups — a feature where multiple family members share a financial view. Shared expenses are pooled, and the system calculates net settlement amounts (who owes whom). The real-time challenge: when three family members transact throughout the day, the shared dashboard needs to stay current. I used Redis pub/sub to broadcast transaction events, with Server-Sent Events delivering updates to the Next.js web app and WebSockets to the mobile apps.",
            },
            {
                type: "h2",
                content: "What Took Longer Than Expected",
            },
            {
                type: "ul",
                items: [
                    "bKash merchant registration: 6 weeks of back-and-forth with documentation before getting sandbox access",
                    "SMS parser edge cases: SMS formats change without notice — I've had to update patterns three times already",
                    "Bilingual UI: next-intl is excellent but ensuring every string, every error message, every toast notification exists in both Bangla and English is meticulous work",
                    "Firebase Phone Auth on Android emulator: OTP interception for testing required a custom test phone numbers setup that isn't well documented",
                    "Microservice debugging: when something breaks across service boundaries, distributed tracing becomes essential — I added OpenTelemetry later than I should have",
                ],
            },
            {
                type: "h2",
                content: "Current Status",
            },
            {
                type: "p",
                content:
                    "TakaTrack is in closed beta with 40 users in Dhaka. The Android app is feature-complete. The iOS app covers core expense tracking; advanced features are in progress. The web dashboard is fully functional. Target: Play Store launch with 500 beta users by Q2 2025.",
            },
            {
                type: "p",
                content:
                    "If you're building in the Bangladeshi fintech space, or curious about any part of this architecture, I'd genuinely enjoy talking about it. The intersection of local payment infrastructure and mobile-first software design in emerging markets is a fascinating problem space.",
            },
        ],
    },

    // ─────────────────────────────────────────────
    //  POST 2 — Nexus RTC SDK
    // ─────────────────────────────────────────────
    {
        slug: "building-nexus-rtc-sdk",
        title: "Building Nexus RTC: Why I'm Building a Self-Hosted Agora Alternative from Scratch",
        date: "Feb 2025",
        readTime: "18 min read",
        tags: ["WebRTC", "Kotlin", "Swift", "LiveKit", "Kubernetes", "Personal Project"],
        excerpt:
            "Agora RTC is excellent — until you look at the pricing at scale. $15–30K/month for a growing startup isn't viable. So I started building Nexus RTC: a production-grade, self-hosted real-time audio/video SDK platform with cross-platform SDKs, a C++ media engine, cloud recording, and QoE analytics.",
        sections: [
            {
                type: "p",
                content:
                    "In late 2024, while scoping a real-time feature for a client's platform, I priced out Agora RTC for 50,000 daily active users averaging 20 minutes of call time. The number came back at around $18,000/month. For a Series A startup, that's a significant infrastructure line item — one that only grows as the product succeeds.",
            },
            {
                type: "p",
                content:
                    "I started researching self-hosted alternatives. LiveKit is excellent as an SFU. Mediasoup gives you raw building blocks. Jitsi works for meetings. But none of them give you what Agora does: a complete platform with polished cross-platform SDKs (iOS, Android, Web, Flutter, React Native, Unity), cloud recording, live transcription, QoE analytics, and a CDN-backed delivery network. To build that on top of LiveKit would take a team months.",
            },
            {
                type: "p",
                content:
                    "That's the gap Nexus RTC is filling. This post is about the architecture — what I'm building, the decisions I've made, and the hard problems I'm still solving.",
            },
            {
                type: "h2",
                content: "What Makes WebRTC Hard in Production",
            },
            {
                type: "p",
                content:
                    "WebRTC has been around since 2011. The browser API is reasonably well-documented. Most developers can get a two-peer video call working in a weekend. Production is a completely different animal.",
            },
            {
                type: "h3",
                content: "NAT Traversal",
            },
            {
                type: "p",
                content:
                    "The majority of devices on the internet are behind NAT — home routers, corporate firewalls, mobile carrier NAT. Two devices behind NAT can't connect to each other directly. WebRTC uses ICE (Interactive Connectivity Establishment) to punch through NAT, which involves STUN servers for address discovery and TURN servers as relay fallbacks. In my testing, about 15% of connections require TURN relay. TURN traffic is expensive to run at scale.",
            },
            {
                type: "h3",
                content: "Scalability: P2P Doesn't Scale",
            },
            {
                type: "p",
                content:
                    "P2P WebRTC works for 1:1 calls. For group calls, it breaks down fast. If you have 8 people in a call and every participant sends to every other participant, each person is uploading 7 streams simultaneously. At 1080p that's catastrophic. The solution is an SFU (Selective Forwarding Unit) — a server that receives streams from each participant and selectively forwards them to others. The SFU doesn't decode or re-encode; it just routes packets. This is why LiveKit, Mediasoup, and Janus exist.",
            },
            {
                type: "h3",
                content: "Codec Negotiation",
            },
            {
                type: "p",
                content:
                    "Not every device supports the same codecs. VP8, VP9, H.264, H.265, AV1 — each has different hardware acceleration profiles, patent status, and browser support. WebRTC's SDP negotiation handles this, but you need to be careful about which codecs you prioritize for different device classes. On flagship Android phones, AV1 encoding is hardware-accelerated and gives the best quality per bit. On iOS, H.264 is the battle-tested choice. Getting this wrong wastes bandwidth or CPU.",
            },
            {
                type: "h2",
                content: "The Architecture",
            },
            {
                type: "p",
                content:
                    "Nexus RTC is built in layers:",
            },
            {
                type: "code",
                language: "text",
                content: `┌─────────────────────────────────────────────────────┐
│                    SDK Layer                        │
│   Web SDK  │  iOS SDK  │  Android SDK  │  Flutter  │
│            │           │               │  React Native │
└────────────────────────┬────────────────────────────┘
                         │ WebSocket (Signaling)
                         │ DTLS-SRTP  (Media)
┌────────────────────────▼────────────────────────────┐
│              Signaling Server (Node.js)             │
│   Session management · Room state · ICE exchange   │
└────────────────────────┬────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────┐
│              SFU Layer (LiveKit)                    │
│   Audio/video routing · Simulcast · Bandwidth est. │
└───────────┬────────────────────────────┬────────────┘
            │                            │
┌───────────▼──────────┐   ┌────────────▼────────────┐
│  Recording Pipeline  │   │   QoE Analytics         │
│  (FFmpeg + S3)       │   │   (ClickHouse)          │
└──────────────────────┘   └─────────────────────────┘`,
            },
            {
                type: "h2",
                content: "The Signaling Server",
            },
            {
                type: "p",
                content:
                    "The signaling server handles session lifecycle — creating rooms, authenticating participants, exchanging ICE candidates and SDP offers/answers between peers. I built it in Node.js using WebSockets (ws library) with Redis for session state so it's horizontally scalable.",
            },
            {
                type: "code",
                language: "typescript",
                content: `// Simplified signaling flow
class SignalingServer {
    async handleOffer(ws: WebSocket, payload: OfferPayload) {
        const { roomId, participantId, sdp, iceServers } = payload;

        // Validate JWT, check room exists
        const room = await this.roomStore.get(roomId);
        if (!room) throw new SignalingError("ROOM_NOT_FOUND");

        // Forward SDP offer to LiveKit SFU via gRPC
        const answer = await this.livekitClient.publishTrack({
            roomName: roomId,
            participantIdentity: participantId,
            offer: sdp,
        });

        // Send answer back to SDK
        ws.send(JSON.stringify({
            type: "answer",
            sdp: answer.sdp,
            iceServers: this.getIceServers(room.region),
        }));

        // Emit participant joined event for QoE tracking
        await this.analytics.emit("participant_joined", {
            roomId, participantId,
            timestamp: Date.now(),
            region: room.region,
        });
    }
}`,
            },
            {
                type: "h2",
                content: "The Web SDK",
            },
            {
                type: "p",
                content:
                    "The Web SDK wraps the browser's WebRTC APIs and the signaling protocol behind a clean developer interface. The goal: an Agora-like DX where you join a room and publish a track in under 10 lines of code.",
            },
            {
                type: "code",
                language: "typescript",
                content: `import { NexusClient } from "@nexus-rtc/web";

const client = new NexusClient({
    appId: "YOUR_APP_ID",
    token: await fetchToken(userId, roomId), // JWT from your server
});

const room = await client.join(roomId);

// Publish local camera
const cameraTrack = await room.createCameraVideoTrack({
    resolution: "720p",
    codec: "h264", // auto-detected if omitted
});
await room.publish(cameraTrack);

// Subscribe to remote participants
room.on("participant-joined", (participant) => {
    participant.on("track-published", (track) => {
        const element = document.createElement("video");
        track.attach(element);
        document.body.appendChild(element);
    });
});`,
            },
            {
                type: "h2",
                content: "Cross-Platform SDK Strategy",
            },
            {
                type: "p",
                content:
                    "Writing six SDKs (Web, iOS, Android, Flutter, React Native, Unity) from scratch would take years. My strategy is layered: write core WebRTC logic once in C++ using libwebrtc, then wrap it with thin platform-native bindings. The C++ core handles codec selection, bitrate adaptation, packet loss concealment, and jitter buffer management — the hard stuff that needs to be consistent across platforms.",
            },
            {
                type: "ul",
                items: [
                    "C++ Core: libwebrtc, codec management, network adaptation, audio processing",
                    "iOS: Swift wrapper using Objective-C bridge — exposes a Swift-idiomatic API",
                    "Android: Kotlin wrapper using JNI — follows Android Jetpack patterns",
                    "Flutter: Dart plugin using platform channels to the native iOS/Android wrappers",
                    "React Native: Native module for iOS + Android, with a clean JS/TS API on top",
                    "Web: TypeScript SDK using browser WebRTC APIs directly (no C++ needed)",
                ],
            },
            {
                type: "h2",
                content: "QoE Analytics with ClickHouse",
            },
            {
                type: "p",
                content:
                    "Call quality measurement is a first-class feature in Nexus RTC, not an afterthought. Every second, each SDK emits a telemetry packet: RTT, packet loss, jitter, audio level, video resolution, frame rate, codec, and estimated bandwidth. These land in ClickHouse — a columnar database designed for high-volume time-series analytical workloads.",
            },
            {
                type: "p",
                content:
                    "Why ClickHouse instead of something like TimescaleDB or InfluxDB? ClickHouse can ingest 1 million rows per second on modest hardware and query billions of rows in seconds. For a platform where 10,000 concurrent sessions each emit 1 packet/second, that's 10,000 rows/second at baseline. ClickHouse handles it without breaking a sweat.",
            },
            {
                type: "code",
                language: "sql",
                content: `-- Example: find calls with degraded quality in the last hour
SELECT
    room_id,
    participant_id,
    avg(packet_loss_pct)    AS avg_loss,
    avg(rtt_ms)             AS avg_rtt,
    avg(jitter_ms)          AS avg_jitter,
    min(video_resolution)   AS min_resolution
FROM qoe_events
WHERE
    timestamp >= now() - INTERVAL 1 HOUR
    AND (packet_loss_pct > 5 OR rtt_ms > 300)
GROUP BY room_id, participant_id
ORDER BY avg_loss DESC
LIMIT 100`,
            },
            {
                type: "h2",
                content: "Kubernetes Infrastructure",
            },
            {
                type: "p",
                content:
                    "The infrastructure is defined in Terraform and deployed on DigitalOcean managed Kubernetes. The SFU is the most resource-intensive component — it processes and forwards all media packets. I use Kubernetes HPA (Horizontal Pod Autoscaler) to scale SFU instances based on CPU and a custom metric: active WebRTC tracks per pod.",
            },
            {
                type: "p",
                content:
                    "One non-obvious challenge: SFU pods are stateful. When an SFU pod scales down, you can't just kill it — active rooms are running on it. The scale-down process drains a pod: it stops accepting new rooms, waits for existing rooms to end, then terminates. This graceful drain is implemented as a pre-stop hook with a 5-minute timeout.",
            },
            {
                type: "h2",
                content: "What's Hard, What's Left",
            },
            {
                type: "p",
                content:
                    "The hardest remaining problem is end-to-end encryption. Agora, Zoom, and Google Meet all have E2EE modes now. Implementing E2EE over WebRTC requires Insertable Streams (in Chrome/Firefox) to encrypt the media payload before it reaches the SFU. The SFU then forwards encrypted packets it can't read — which breaks server-side recording and transcription. Finding the right tradeoff between privacy and features is an open design question.",
            },
            {
                type: "p",
                content:
                    "Nexus RTC is still in active development. The Web SDK and signaling server are working. The Android SDK is in alpha. If you're building a product that needs WebRTC at scale and you'd rather own your infrastructure, I'd love to talk.",
            },
        ],
    },

    // ─────────────────────────────────────────────
    //  POST 3 — Nagorik
    // ─────────────────────────────────────────────
    {
        slug: "building-nagorik-civic-platform",
        title: "Building Nagorik: A Civic Issue Reporting Platform for Bangladesh (6 Microservices, Anonymous Reports, and a Government Dashboard)",
        date: "Jan 2025",
        readTime: "13 min read",
        tags: ["Next.js", "Microservices", "Prisma", "PostgreSQL", "Civic Tech", "Bangladesh", "Personal Project"],
        excerpt:
            "Bangladesh has a pothole problem. It also has a garbage problem, a broken streetlight problem, and a drainage problem. What it doesn't have is a simple way for citizens to report these issues and actually track whether anything gets done. Nagorik is my attempt to build that — a civic issue reporting platform with anonymous submissions, trackable codes, a location hierarchy, and a government admin dashboard.",
        sections: [
            {
                type: "p",
                content:
                    "The idea for Nagorik came from a frustrating personal experience. A road near my house had a pothole the size of a dinner plate for eight months. There was nowhere obvious to report it — no app, no number that felt real, no way to know if anyone would ever see the complaint. So I built the platform I wished existed.",
            },
            {
                type: "p",
                content:
                    "Nagorik (Bengali for 'citizen') is a civic issue reporting platform. Citizens report local problems — potholes, garbage dumps, broken streetlights, waterlogging, damaged infrastructure — with photos, location, and a description. Each report gets a unique tracking code. Government admin staff verify, assign, and resolve reports through a dedicated dashboard. No account required to submit. That last part turned out to be the most interesting design constraint of the whole project.",
            },
            {
                type: "h2",
                content: "The Anonymous Reporting Problem",
            },
            {
                type: "p",
                content:
                    "Requiring account creation before submitting a report kills participation. It's friction at exactly the wrong moment — when someone has just spotted a problem and wants to report it before they forget. But anonymous submissions create their own problems: spam, duplicate reports, and no way to notify submitters of updates.",
            },
            {
                type: "p",
                content:
                    "My solution: every report — whether from a registered user or a guest — gets a unique tracking code in the format NAG-YYYY-XXXXXX, where YYYY is the year and XXXXXX is a zero-padded sequential integer. Anyone with this code can look up the current status of their report without logging in.",
            },
            {
                type: "code",
                language: "typescript",
                content: `// issues service — report creation with tracking code generation
async function createIssue(dto: CreateIssueDto, userId?: string): Promise<Issue> {
    const year = new Date().getFullYear();

    // Atomic sequence per year — no gaps, no race conditions
    const sequence = await prisma.$queryRaw<[{ nextval: bigint }]>\`
        SELECT nextval('issue_sequence_\${year}')
    \`;
    const seq = Number(sequence[0].nextval);
    const trackingCode = \`NAG-\${year}-\${String(seq).padStart(6, "0")}\`;

    return prisma.issue.create({
        data: {
            trackingCode,
            title: dto.title,
            description: dto.description,
            categoryId: dto.categoryId,
            locationId: dto.locationId,
            status: "pending",
            isAnonymous: !userId,
            submittedById: userId ?? null,
            photoKeys: dto.photoKeys,  // S3 object keys
        },
    });
}`,
            },
            {
                type: "callout",
                content:
                    "Using a PostgreSQL sequence per year (issue_sequence_2025, issue_sequence_2026) guarantees no duplicate codes even under concurrent load, and resets the counter cleanly at year boundaries — making the tracking codes more readable: NAG-2025-000001.",
            },
            {
                type: "h2",
                content: "The Architecture: 6 Microservices",
            },
            {
                type: "p",
                content:
                    "Nagorik runs as a monorepo with six backend services, a shared Prisma schema package, and a Next.js 16 frontend. All services communicate through a central API gateway that handles routing and JWT verification so individual services stay stateless.",
            },
            {
                type: "ul",
                items: [
                    "api-gateway:3001 — Request routing, JWT verification, rate limiting",
                    "auth:3002 — Phone OTP auth (SMS via Twilio), JWT issuance, refresh tokens",
                    "users:3003 — Profiles, notification preferences, report history",
                    "issues:3004 — Core report CRUD, status lifecycle, upvoting, search",
                    "locations:3005 — Division / District / Upazila hierarchy with geo data",
                    "upload:3006 — S3 presigned URL generation, photo validation, virus scan hooks",
                ],
            },
            {
                type: "p",
                content:
                    "The monorepo approach with a shared Prisma schema was a deliberate tradeoff. Each service owns its domain, but they all reference the same schema package — which means schema changes require a coordinated migration, not independent deploys. For a solo project this is manageable; for a large team it would need more thought.",
            },
            {
                type: "code",
                language: "typescript",
                content: `// packages/database/schema.prisma — shared across all services
model Issue {
    id           String      @id @default(cuid())
    trackingCode String      @unique
    title        String
    description  String
    status       IssueStatus @default(pending)
    isAnonymous  Boolean     @default(true)
    upvoteCount  Int         @default(0)
    photoKeys    String[]
    categoryId   String
    locationId   String
    submittedById String?

    category  Category  @relation(fields: [categoryId], references: [id])
    location  Location  @relation(fields: [locationId], references: [id])
    upvotes   Upvote[]
    comments  Comment[]
    history   IssueHistory[]

    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
}

enum IssueStatus {
    pending
    verified
    assigned
    in_progress
    resolved
    closed
}`,
            },
            {
                type: "h2",
                content: "The Location Hierarchy",
            },
            {
                type: "p",
                content:
                    "Bangladesh has a well-defined administrative hierarchy: 8 Divisions → 64 Districts → 495 Upazilas → thousands of Union Parishads. For civic reporting, Division/District/Upazila is the right granularity — specific enough to route reports to the right authority, broad enough not to overwhelm the location picker.",
            },
            {
                type: "p",
                content:
                    "The locations service preloads all 495 Upazilas into memory on startup (the dataset is static, ~150KB of JSON). The frontend cascades selection: pick Division → Districts filter → pick District → Upazilas filter. No round-trips after the initial load. This matters on Bangladesh's mobile connections where a round-trip adds 200–400ms.",
            },
            {
                type: "code",
                language: "typescript",
                content: `// locations service — cascading hierarchy endpoint
app.get("/hierarchy", async (req, res) => {
    // Served from in-memory cache — static data changes ~once per decade
    const data = locationCache.getAll();

    const hierarchy = data.divisions.map(division => ({
        ...division,
        districts: data.districts
            .filter(d => d.divisionId === division.id)
            .map(district => ({
                ...district,
                upazilas: data.upazilas.filter(u => u.districtId === district.id),
            })),
    }));

    res.json(hierarchy);
});

// Client-side: one fetch, then filter locally
const [hierarchy] = useState(() => fetch("/api/locations/hierarchy").then(r => r.json()));

const filteredDistricts = useMemo(
    () => hierarchy?.find(d => d.id === selectedDivision)?.districts ?? [],
    [hierarchy, selectedDivision]
);`,
            },
            {
                type: "h2",
                content: "Photo Uploads with S3 Presigned URLs",
            },
            {
                type: "p",
                content:
                    "Citizens can attach up to 5 photos to a report. Uploading images through the API server wastes bandwidth and ties up server resources — the standard solution is S3 presigned URLs: the client gets a time-limited URL and uploads directly to S3, bypassing the server entirely.",
            },
            {
                type: "code",
                language: "typescript",
                content: `// upload service — presigned URL generation
app.post("/presigned", authenticateOptional, async (req, res) => {
    const { count, mimeTypes } = req.body;

    if (count > 5) return res.status(400).json({ error: "Max 5 photos per report" });

    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (mimeTypes.some((t: string) => !allowed.includes(t))) {
        return res.status(400).json({ error: "Only JPEG, PNG, and WebP allowed" });
    }

    const uploads = await Promise.all(
        mimeTypes.map(async (mimeType: string) => {
            const key = \`issues/pending/\${crypto.randomUUID()}\`;
            const url = await getSignedUrl(
                s3,
                new PutObjectCommand({
                    Bucket: process.env.S3_BUCKET,
                    Key: key,
                    ContentType: mimeType,
                    ContentLength: 10 * 1024 * 1024, // 10MB max
                }),
                { expiresIn: 300 } // 5 minutes
            );
            return { key, url };
        })
    );

    res.json({ uploads });
});`,
            },
            {
                type: "h2",
                content: "The Issue Lifecycle",
            },
            {
                type: "p",
                content:
                    "The issue lifecycle was the hardest thing to get right — not technically, but from a product perspective. The states had to be meaningful to citizens checking their tracking code, not just convenient for admin staff.",
            },
            {
                type: "ul",
                items: [
                    "pending — Submitted, awaiting admin review",
                    "verified — Admin confirmed it's a real issue (not spam/duplicate)",
                    "assigned — Routed to the relevant department or field team",
                    "in_progress — Active work has started (admin confirms on-site activity)",
                    "resolved — Fix confirmed complete by admin",
                    "closed — Resolved and archived, or rejected as out-of-scope",
                ],
            },
            {
                type: "p",
                content:
                    "Every status transition is logged to an IssueHistory table with the admin user ID, timestamp, and optional note. Citizens tracking their report see a clean timeline of status changes — not just the current state, but the full history of what happened and when.",
            },
            {
                type: "h2",
                content: "The Government Admin Dashboard",
            },
            {
                type: "p",
                content:
                    "The admin dashboard is a separate Next.js app (same monorepo) that government staff use to triage, assign, and resolve reports. It has role-based access: super-admins can see all reports nationally, district admins see only their district, upazila staff see only their upazila.",
            },
            {
                type: "p",
                content:
                    "Analytics are built with Recharts — resolution rate over time, average time-to-resolve by category, most-reported locations heatmap, and an upvote-weighted priority queue that surfaces the issues citizens care most about.",
            },
            {
                type: "code",
                language: "typescript",
                content: `// issues service — upvote-weighted priority score
// Surfaces actively-complained-about issues over old forgotten ones
async function getPriorityQueue(locationId: string) {
    return prisma.$queryRaw\`
        SELECT
            i.*,
            -- Decay older upvotes, boost recent ones
            (i."upvoteCount" * EXP(-0.1 * EXTRACT(DAY FROM NOW() - i."createdAt"))) AS priority_score
        FROM "Issue" i
        WHERE i."locationId" = \${locationId}
          AND i.status IN ('pending', 'verified')
        ORDER BY priority_score DESC
        LIMIT 50
    \`;
}`,
            },
            {
                type: "h2",
                content: "Upvoting Without Login",
            },
            {
                type: "p",
                content:
                    "The upvote feature lets citizens signal that a reported issue affects them too. But requiring login to upvote defeats the purpose — most people won't bother. The solution: device fingerprinting (screen resolution + timezone + user agent hash) as an anti-abuse mechanism, stored as a short hash cookie. Not perfect, but good enough to prevent trivial abuse without friction.",
            },
            {
                type: "code",
                language: "typescript",
                content: `// Lightweight device fingerprint for anonymous upvote deduplication
function getDeviceFingerprint(req: Request): string {
    const ua = req.headers["user-agent"] ?? "";
    const lang = req.headers["accept-language"] ?? "";
    const ip = req.ip ?? "";
    // One-way hash — not reversible, just an identifier
    return crypto
        .createHash("sha256")
        .update(\`\${ua}|\${lang}|\${ip}\`)
        .digest("hex")
        .slice(0, 16);
}`,
            },
            {
                type: "h2",
                content: "What I'd Do Differently",
            },
            {
                type: "p",
                content:
                    "The shared Prisma schema was convenient but created coupling I'd avoid in production. The right move would be database-per-service with async events (Kafka or at minimum a transactional outbox) for cross-service data. For a solo project the pragmatic shortcut is fine; for a real government deployment it would be a maintenance headache.",
            },
            {
                type: "p",
                content:
                    "The other thing I underestimated: the location data problem. Getting accurate, complete Division/District/Upazila data for Bangladesh required significant cleanup — transliterations of Bangla names, merging multiple sources, handling special administrative zones (Dhaka City Corporation vs Dhaka District). Geographic data for emerging markets is messy in ways that geographic data for the US is not.",
            },
            {
                type: "callout",
                content:
                    "The most satisfying part of building civic tech: the problem is completely real, the users are real citizens, and a working solution would make a tangible difference. E-commerce is fun to build. Civic infrastructure feels important.",
            },
        ],
    },

    // ─────────────────────────────────────────────
    //  POST 4 — AI and the Future of Programming
    // ─────────────────────────────────────────────
    {
        slug: "ai-future-of-programming",
        title: "Is Programming Doomed Because of AI — or Are We Standing at the Biggest Opportunity in the Field's History?",
        date: "Mar 2025",
        readTime: "16 min read",
        tags: ["AI", "Software Engineering", "Career", "Future"],
        excerpt:
            "Every week someone declares that AI will replace programmers within two years. After a year of building products with AI as a core tool — and shipping an AI platform myself — I think both the doomers and the dismissers are wrong. Here's the actual picture.",
        sections: [
            {
                type: "p",
                content:
                    "The takes are everywhere. On one side: 'AI will replace junior developers within 18 months. Senior developers are next. Learn prompt engineering or find a new career.' On the other side: 'AI is a fancy autocomplete. It can't understand requirements, can't architect systems, can't debug production incidents. Developers are safe.'",
            },
            {
                type: "p",
                content:
                    "I've spent the past year building with AI as a first-class tool — integrating Claude into Creator AI, using Cursor and Claude for my personal projects, watching AI-assisted code land in production. My take is more nuanced than either camp, and I think the framing of 'doomed vs safe' is the wrong question entirely.",
            },
            {
                type: "h2",
                content: "What AI Is Genuinely Excellent At",
            },
            {
                type: "p",
                content:
                    "Let me be honest about what AI coding tools actually do well, because dismissing them is intellectually dishonest.",
            },
            {
                type: "h3",
                content: "Boilerplate Elimination",
            },
            {
                type: "p",
                content:
                    "AI is transformatively good at boilerplate. CRUD endpoints, form validation, database schema migrations, test fixtures, configuration files, TypeScript interface generation from JSON — work that's necessary but not mentally engaging. A task that would take a developer 45 minutes now takes 3 minutes of prompting and 5 minutes of reviewing the output. This is not small. Boilerplate represents a significant portion of real software engineering work.",
            },
            {
                type: "h3",
                content: "Cross-Language Translation",
            },
            {
                type: "p",
                content:
                    "Porting code between languages — Python to TypeScript, Java to Kotlin, old JavaScript to modern ES2024 — is mechanical work that AI does extremely well. I used Claude to port a Node.js SMS parser to Kotlin for Gunti. The translation was 90% correct on the first pass, with the remaining 10% being platform-specific idioms that needed adjustment. What would have taken a day took two hours.",
            },
            {
                type: "h3",
                content: "Documentation and Test Generation",
            },
            {
                type: "p",
                content:
                    "Generating meaningful documentation from code and writing unit tests for clearly-defined functions are AI's strongest suits. The tests it generates for pure functions with well-defined inputs and outputs are often better than what a time-pressured developer would write manually.",
            },
            {
                type: "h2",
                content: "What AI Is Still Genuinely Bad At",
            },
            {
                type: "p",
                content:
                    "Here's where honest assessment matters more, because this is where the overconfidence claims get dangerous.",
            },
            {
                type: "h3",
                content: "Understanding Unstated Requirements",
            },
            {
                type: "p",
                content:
                    "Most software requirements are incomplete. A product manager asks for a 'search feature.' What they actually mean involves: understanding the data model, knowing which fields should be weighted, handling pagination, considering performance at scale, accommodating future filter additions, and deciding whether fuzzy matching is needed. A developer asks those questions and thinks through the implications. An AI builds exactly what was asked — and then you spend three weeks refactoring it because the requirements were underspecified.",
            },
            {
                type: "h3",
                content: "Debugging Complex Distributed Systems",
            },
            {
                type: "p",
                content:
                    "When something breaks in production — a race condition, a memory leak under specific load patterns, an intermittent timeout in a distributed transaction — the debugging process requires forming and testing hypotheses across multiple system layers simultaneously. It requires intuition built from seeing similar failures before. AI tools can suggest causes and point to code, but the actual diagnosis of subtle production issues still requires a human who understands the full system.",
            },
            {
                type: "h3",
                content: "Architectural Judgment",
            },
            {
                type: "p",
                content:
                    "Should this system use a message queue or direct API calls? Should this data live in PostgreSQL or Redis? When does a microservice boundary make sense, and when does it create accidental complexity? These decisions depend on the specific constraints of a business — expected load, team size, budget, organizational structure — that can't be fully expressed in a prompt. AI gives you options. Choosing between them requires judgment that comes from experience.",
            },
            {
                type: "callout",
                content:
                    "The most dangerous failure mode I've seen: a developer uses AI to quickly generate a solution, it works in development, it ships to production, and two months later it collapses under load because the AI generated code that was technically correct but architecturally wrong for the actual usage pattern.",
            },
            {
                type: "h2",
                content: "The Historical Pattern Everyone Forgets",
            },
            {
                type: "p",
                content:
                    "Every generation of software tooling has been described as 'replacing programmers.' Compilers were going to make assembly programmers obsolete (they did, and massively increased the number of programmers by lowering the barrier). COBOL was going to let business people write their own software (it didn't, and business analysts became their own discipline). Visual Basic, drag-and-drop tools, website builders — all were going to eliminate the need for 'real' developers.",
            },
            {
                type: "p",
                content:
                    "What actually happened each time: the tools raised the productivity floor, the demand for software increased faster than the productivity gains, and more developers were needed than before. When building a website went from requiring a web developer to being doable with Squarespace, the number of web developers didn't decrease. It increased — because suddenly every small business wanted a custom website that Squarespace couldn't build.",
            },
            {
                type: "p",
                content:
                    "AI is the same pattern, at a larger scale and faster pace. But the pattern is recognizable.",
            },
            {
                type: "h2",
                content: "The Floor Rises. The Ceiling Rises Higher.",
            },
            {
                type: "p",
                content:
                    "Here's the dynamic that I think people miss: AI tools raise the floor of developer productivity significantly. A developer who struggled with SQL can now write competent queries. A developer who was weak on testing can now generate test suites. This closes gaps. It makes average developers more capable.",
            },
            {
                type: "p",
                content:
                    "But it also raises the ceiling. A genuinely strong developer who knows how to use AI as an amplifier — who can review AI output critically, who uses it for leverage on the mechanical work and brings deep judgment to the architectural work — becomes dramatically more productive. The 10x developer, a controversial concept in normal times, is something closer to real when AI handles the repetitive work and an experienced engineer focuses entirely on the hard problems.",
            },
            {
                type: "p",
                content:
                    "This doesn't make the market better for everyone uniformly. For someone who was adding value primarily through grinding out boilerplate, the value proposition shrinks. For someone who was adding value through system thinking, architecture, and judgment — the market for their skills grows, because now they can execute faster.",
            },
            {
                type: "h2",
                content: "The New Developer Role",
            },
            {
                type: "p",
                content:
                    "What does being a 'good developer' mean in this environment? I think it looks like this:",
            },
            {
                type: "ul",
                items: [
                    "System thinker: Understanding how pieces fit together at a level that AI cannot replicate without deep context you provide",
                    "Critical reviewer: AI output is confident, readable, and plausible — but not always correct. The ability to spot subtle bugs, performance problems, and architectural mismatches in generated code is increasingly valuable",
                    "Requirement excavator: Getting from what a stakeholder says they want to what a system actually needs to do. This is a human skill that AI assists but doesn't replace",
                    "AI orchestrator: Knowing when to delegate to AI, what to delegate, and how to verify the result — this is its own skill set that experienced developers are still figuring out",
                    "Deep domain expert: The more context you can provide to an AI about your specific domain, constraints, and tradeoffs, the better its outputs. Deep domain knowledge becomes more, not less, valuable",
                ],
            },
            {
                type: "h2",
                content: "The Uncomfortable Part",
            },
            {
                type: "p",
                content:
                    "I'll be direct about something the optimistic takes skip: some jobs will change significantly. Entry-level work that was primarily about building CRUD features to well-defined specs — that work is going to look different. It will either be done faster (by fewer people), or it will be done at a more sophisticated level by the same number of people (as AI handles the mechanical implementation).",
            },
            {
                type: "p",
                content:
                    "The path for early-career developers isn't to be afraid of this — it's to not spend years becoming excellent at the things AI does well. Instead: invest in understanding systems deeply, build real projects with real users, develop opinions about architecture, learn to work with AI as a multiplier rather than a replacement for thinking.",
            },
            {
                type: "h2",
                content: "My Actual Prediction",
            },
            {
                type: "p",
                content:
                    "Not doom, and not status quo. The amount of software in the world is going to increase dramatically, because the cost of building it is falling. New categories of software will become economically viable that weren't before. The demand for people who can envision, architect, and ship software systems will grow.",
            },
            {
                type: "p",
                content:
                    "The developers who will struggle are those who treat programming as a mechanical trade — who learn to write code but not to think about systems. The developers who will thrive are those who understand that writing code was always the easy part. The hard part was always understanding what to build, why to build it that way, and how to make it reliable at scale. AI is very good at writing code. It is not good at those other things.",
            },
            {
                type: "p",
                content:
                    "We're not at the end of software engineering. We're at the beginning of a period where software engineering becomes something closer to a genuine system design discipline — where the conversation between human and machine produces things neither could build alone. That's not doom. That might be the most interesting time in the field's history to be working in it.",
            },
        ],
    },
];
