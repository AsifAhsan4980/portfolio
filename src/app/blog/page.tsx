import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/data/blog";

export const metadata: Metadata = {
    title: "Tech Blog — Full Stack Engineering Articles",
    description: "Technical deep dives on full-stack engineering, AWS serverless patterns, WebRTC, AI integration, microservices architecture, and modern web development by Asif Ahsan.",
    keywords: [
        "Software Engineering Blog",
        "Full Stack Development Blog",
        "React Next.js Tutorial",
        "AWS Serverless Blog",
        "WebRTC Tutorial",
        "Microservices Architecture",
        "Asif Ahsan Blog",
    ],
    alternates: {
        canonical: "https://asifahsan.com/blog",
    },
    openGraph: {
        title: "Tech Blog | Asif Ahsan",
        description: "Technical deep dives on full-stack engineering, AWS serverless, WebRTC, AI integration, and modern web development.",
        url: "https://asifahsan.com/blog",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Tech Blog | Asif Ahsan",
        description: "Technical deep dives on full-stack engineering, AWS serverless, WebRTC, AI integration, and modern web development.",
    },
};

interface ComingSoonPost {
    slug: string;
    title: string;
    date: string;
    readTime: string;
    tags: string[];
    excerpt: string;
}

const comingSoon: ComingSoonPost[] = [
    {
        slug: "aws-serverless-patterns-nextjs",
        title: "Scaling Serverless: AWS Lambda + DynamoDB Patterns That Actually Work",
        date: "Coming soon",
        readTime: "~10 min",
        tags: ["AWS", "Lambda", "DynamoDB", "Serverless"],
        excerpt:
            "Three years and a dozen serverless projects later — cold start mitigation, single-table DynamoDB design, and building reliable payment flows with Lambda and AppSync.",
    },
    {
        slug: "nextjs-migration-performance",
        title: "From React to Next.js: A Real-World Migration Story",
        date: "Coming soon",
        readTime: "~9 min",
        tags: ["Next.js", "React", "Performance", "SSR"],
        excerpt:
            "Migrating a high-traffic ticketing platform from CRA to Next.js with SSR and AWS CloudFront cut LCP from 4.2s to 1.1s. Architecture decisions, gotchas, and the before/after numbers.",
    },
];

export default function BlogPage() {
    return (
        <div className="relative min-h-screen">
            <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-[#469D89]/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative container py-16 max-w-3xl">
                {/* Header */}
                <div className="mb-14">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#469D89]/50" />
                        <span className="text-[10px] font-mono text-[#469D89]/60 tracking-[0.3em] uppercase">Writing</span>
                        <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#469D89]/50" />
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-bold mb-4 neon-text-pulse">
                        Tech <span className="gradient-text">Articles</span>
                    </h1>
                    <p className="text-sm font-mono text-muted-foreground leading-6">
                        <span className="text-[#469D89]/50">{">"}</span>{" "}
                        {blogPosts.length} published · deep dives on systems, AI, and building for real users.
                    </p>
                </div>

                {/* Published posts */}
                <div className="space-y-5 mb-12">
                    {blogPosts.map((post, i) => (
                        <Link key={post.slug} href={`/blog/${post.slug}`}>
                            <article
                                className="group relative border border-[#469D89]/15 rounded-2xl p-6 lg:p-7 bg-background/60 backdrop-blur-sm hover:border-[#469D89]/45 hover:shadow-[0_4px_30px_rgba(70,157,137,0.1)] transition-all duration-300 cursor-pointer"
                                style={{ animationDelay: `${i * 0.1}s` }}
                            >
                                {/* Published badge */}
                                <div className="absolute top-5 right-5 flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                    <span className="text-[9px] font-mono text-green-400/70 tracking-widest uppercase">Published</span>
                                </div>

                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-[10px] font-mono text-[#469D89]/50 tracking-widest">{post.date}</span>
                                    <span className="w-1 h-1 rounded-full bg-[#469D89]/30" />
                                    <span className="text-[10px] font-mono text-[#469D89]/50 tracking-widest">{post.readTime}</span>
                                </div>

                                <h2 className="text-lg font-bold mb-3 text-foreground group-hover:text-[#469D89] transition-colors duration-300 leading-snug pr-28">
                                    {post.title}
                                </h2>

                                <p className="text-sm text-muted-foreground leading-6 mb-5 line-clamp-2">
                                    {post.excerpt}
                                </p>

                                <div className="flex items-center justify-between">
                                    <div className="flex flex-wrap gap-1.5">
                                        {post.tags.slice(0, 4).map((tag, j) => (
                                            <span
                                                key={j}
                                                className="px-2 py-0.5 text-[9px] font-mono text-[#469D89] border border-[#469D89]/20 rounded-full bg-[#469D89]/5"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <span className="text-[11px] font-mono text-[#469D89]/50 group-hover:text-[#469D89] group-hover:translate-x-1 transition-all tracking-widest">
                                        Read →
                                    </span>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>

                {/* Coming soon section */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="h-px flex-1 bg-[#469D89]/12" />
                        <span className="text-[10px] font-mono text-[#469D89]/40 tracking-[0.3em] uppercase">Coming Soon</span>
                        <div className="h-px flex-1 bg-[#469D89]/12" />
                    </div>
                    <div className="space-y-4">
                        {comingSoon.map((post) => (
                            <article
                                key={post.slug}
                                className="relative border border-[#469D89]/8 rounded-2xl p-5 lg:p-6 bg-background/40 backdrop-blur-sm opacity-60"
                            >
                                <div className="absolute top-4 right-4 px-2 py-0.5 rounded-full border border-[#469D89]/20 bg-[#469D89]/5 text-[9px] font-mono text-[#469D89]/50 tracking-widest uppercase">
                                    Coming Soon
                                </div>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-[10px] font-mono text-[#469D89]/35 tracking-widest">{post.date}</span>
                                    <span className="w-1 h-1 rounded-full bg-[#469D89]/20" />
                                    <span className="text-[10px] font-mono text-[#469D89]/35 tracking-widest">{post.readTime}</span>
                                </div>
                                <h2 className="text-base font-bold mb-2 text-foreground/60 leading-snug pr-24">
                                    {post.title}
                                </h2>
                                <p className="text-sm text-muted-foreground/60 leading-6 line-clamp-2 mb-4">
                                    {post.excerpt}
                                </p>
                                <div className="flex flex-wrap gap-1.5">
                                    {post.tags.map((tag, j) => (
                                        <span key={j} className="px-2 py-0.5 text-[9px] font-mono text-[#469D89]/40 border border-[#469D89]/12 rounded-full">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </article>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="p-6 rounded-2xl border border-[#469D89]/15 bg-background/50 backdrop-blur-sm text-center">
                    <p className="text-sm text-muted-foreground">
                        I write about real problems I&apos;ve solved — no fluff.{" "}
                        <Link href="/contacts" className="text-[#469D89] hover:underline">
                            Get in touch
                        </Link>{" "}
                        if you want to talk about any of this.
                    </p>
                </div>
            </div>
        </div>
    );
}
