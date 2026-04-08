import { blogPosts } from "@/data/blog";
import type { Section } from "@/data/blog";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { slugify, extractTocItems } from "@/lib/blog-utils";
import BlogTableOfContents from "@/components/blog/BlogTableOfContents";
import ShareButtons from "@/components/blog/ShareButtons";

export async function generateStaticParams() {
    return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);
    if (!post) return {};
    return {
        title: post.title,
        description: post.excerpt,
        keywords: [...post.tags, "Asif Ahsan", "Software Engineering", "Technical Blog"],
        authors: [{ name: "Asif Ahsan", url: "https://asifahsan.com" }],
        alternates: {
            canonical: `https://asifahsan.com/blog/${post.slug}`,
        },
        openGraph: {
            title: post.title,
            description: post.excerpt,
            url: `https://asifahsan.com/blog/${post.slug}`,
            type: "article",
            authors: ["Asif Ahsan"],
            publishedTime: post.date,
            tags: post.tags,
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.excerpt,
        },
    };
}

function renderSection(section: Section, i: number) {
    switch (section.type) {
        case "h2":
            return (
                <h2
                    key={i}
                    id={slugify(section.content ?? "")}
                    className="text-2xl lg:text-3xl font-bold mt-12 mb-5 text-foreground leading-snug scroll-mt-24"
                >
                    {section.content}
                </h2>
            );

        case "h3":
            return (
                <h3
                    key={i}
                    id={slugify(section.content ?? "")}
                    className="text-lg font-bold mt-8 mb-3 text-[#469D89] scroll-mt-24"
                >
                    {section.content}
                </h3>
            );

        case "p":
            return (
                <p
                    key={i}
                    className="text-[15px] text-muted-foreground leading-8 mb-5"
                >
                    {section.content}
                </p>
            );

        case "ul":
            return (
                <ul key={i} className="mb-6 space-y-2.5 pl-1">
                    {section.items?.map((item, j) => (
                        <li key={j} className="flex gap-3 text-[15px] text-muted-foreground leading-7">
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#469D89] shrink-0" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            );

        case "code":
            return (
                <div key={i} className="my-6 rounded-xl overflow-hidden border border-[#469D89]/20">
                    {/* Code header bar */}
                    <div className="flex items-center justify-between px-4 py-2 bg-[#469D89]/8 border-b border-[#469D89]/15">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-400/50" />
                            <div className="w-2 h-2 rounded-full bg-yellow-400/50" />
                            <div className="w-2 h-2 rounded-full bg-[#469D89]/60" />
                        </div>
                        <span className="text-[10px] font-mono text-[#469D89]/50 tracking-widest uppercase">
                            {section.language ?? "code"}
                        </span>
                    </div>
                    <pre className="overflow-x-auto p-5 bg-[#060a09] text-[13px] leading-6 text-[#a8c5be] font-mono">
                        <code>{section.content}</code>
                    </pre>
                </div>
            );

        case "callout":
            return (
                <div
                    key={i}
                    className="my-6 flex gap-4 p-5 rounded-xl border border-[#469D89]/30 bg-[#469D89]/6"
                >
                    <div className="mt-0.5 w-1 shrink-0 rounded-full bg-[#469D89]" />
                    <p className="text-[14px] text-foreground/80 leading-7 italic">
                        {section.content}
                    </p>
                </div>
            );

        case "divider":
            return (
                <div key={i} className="my-10 flex items-center gap-4">
                    <div className="flex-1 h-px bg-[#469D89]/15" />
                    <span className="text-[#469D89]/30 text-xs font-mono">✦</span>
                    <div className="flex-1 h-px bg-[#469D89]/15" />
                </div>
            );

        default:
            return null;
    }
}

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);
    if (!post) notFound();

    const otherPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

    const blogPostJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        author: {
            '@type': 'Person',
            name: 'Asif Ahsan',
            url: 'https://asifahsan.com',
            jobTitle: 'Senior Software Engineer',
        },
        publisher: {
            '@type': 'Person',
            name: 'Asif Ahsan',
            url: 'https://asifahsan.com',
        },
        datePublished: post.date,
        url: `https://asifahsan.com/blog/${post.slug}`,
        keywords: post.tags.join(', '),
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://asifahsan.com/blog/${post.slug}`,
        },
        breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://asifahsan.com' },
                { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://asifahsan.com/blog' },
                { '@type': 'ListItem', position: 3, name: post.title, item: `https://asifahsan.com/blog/${post.slug}` },
            ],
        },
    };

    const tocItems = extractTocItems(post.sections);

    return (
        <div className="relative min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostJsonLd) }}
            />
            {/* Background */}
            <div className="absolute inset-0 bg-cyber-grid opacity-25 pointer-events-none" />
            <div className="absolute top-0 right-1/4 w-[500px] h-[400px] bg-[#469D89]/4 rounded-full blur-[150px] pointer-events-none" />

            <div className="relative container py-12 max-w-6xl">
                <div className="flex gap-10">
                    {/* Main content */}
                    <div className="flex-1 min-w-0 max-w-3xl">
                        {/* Back */}
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-[11px] font-mono text-[#469D89]/60 hover:text-[#469D89] transition-colors mb-10 tracking-widest uppercase"
                        >
                            ← All Articles
                        </Link>

                        {/* Article header */}
                        <header className="mb-12">
                            {/* Tags */}
                            <div className="flex flex-wrap gap-1.5 mb-6">
                                {post.tags.map((tag, i) => (
                                    <span
                                        key={i}
                                        className="px-2.5 py-1 text-[9px] font-mono text-[#469D89] border border-[#469D89]/25 rounded-full bg-[#469D89]/6 tracking-widest uppercase"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Title */}
                            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-5 text-foreground">
                                {post.title}
                            </h1>

                            {/* Meta + Share */}
                            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                                <div className="flex items-center gap-4 text-[11px] font-mono text-[#469D89]/50 tracking-widest">
                                    <span>{post.date}</span>
                                    <span className="w-1 h-1 rounded-full bg-[#469D89]/30" />
                                    <span>{post.readTime}</span>
                                    <span className="w-1 h-1 rounded-full bg-[#469D89]/30" />
                                    <span>Asif Ahsan</span>
                                </div>
                                <ShareButtons title={post.title} slug={post.slug} />
                            </div>

                            {/* Excerpt */}
                            <p className="text-base text-muted-foreground leading-8 border-l-2 border-[#469D89]/40 pl-5 italic">
                                {post.excerpt}
                            </p>

                            {/* Divider */}
                            <div className="mt-8 h-px bg-gradient-to-r from-[#469D89]/30 via-[#469D89]/10 to-transparent" />
                        </header>

                        {/* Article body */}
                        <article>
                            {post.sections.map((section, i) => renderSection(section, i))}
                        </article>

                        {/* Author card */}
                        <div className="mt-16 p-6 rounded-2xl border border-[#469D89]/20 bg-background/60 backdrop-blur-sm flex gap-5 items-start">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#469D89] to-[#2d6b5f] flex items-center justify-center text-white font-bold text-lg shrink-0">
                                A
                            </div>
                            <div>
                                <div className="font-bold text-sm mb-1">Asif Ahsan</div>
                                <div className="text-[10px] font-mono text-[#469D89]/60 tracking-widest uppercase mb-2">Senior Software Engineer · Dhaka, Bangladesh</div>
                                <p className="text-xs text-muted-foreground leading-6">
                                    Senior Software Engineer with 5+ years of professional experience designing and building high-performance web applications. Shipped 14+ projects across 5+ countries, impacting 100K+ users.
                                </p>
                                <div className="mt-3 flex gap-3">
                                    <Link href="/contacts" className="text-[11px] font-mono text-[#469D89] hover:underline tracking-wide">Get in touch →</Link>
                                    <Link href="/projects" className="text-[11px] font-mono text-[#469D89]/50 hover:text-[#469D89] tracking-wide">View projects →</Link>
                                </div>
                            </div>
                        </div>

                        {/* More articles */}
                        {otherPosts.length > 0 && (
                            <div className="mt-16">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="h-px flex-1 bg-[#469D89]/15" />
                                    <span className="text-[10px] font-mono text-[#469D89]/50 tracking-[0.3em] uppercase">More Articles</span>
                                    <div className="h-px flex-1 bg-[#469D89]/15" />
                                </div>
                                <div className="space-y-4">
                                    {otherPosts.map((p) => (
                                        <Link
                                            key={p.slug}
                                            href={`/blog/${p.slug}`}
                                            className="flex gap-5 p-4 rounded-xl border border-[#469D89]/12 hover:border-[#469D89]/35 hover:bg-[#469D89]/3 transition-all duration-300 group"
                                        >
                                            <div className="flex-1 min-w-0">
                                                <div className="text-[10px] font-mono text-[#469D89]/40 tracking-widest mb-1.5">{p.date} · {p.readTime}</div>
                                                <div className="text-sm font-semibold text-foreground group-hover:text-[#469D89] transition-colors line-clamp-2 leading-snug">
                                                    {p.title}
                                                </div>
                                            </div>
                                            <span className="text-[#469D89]/40 group-hover:text-[#469D89] group-hover:translate-x-1 transition-all self-center shrink-0">→</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar ToC — visible on xl screens */}
                    <aside className="hidden xl:block w-64 shrink-0 pt-[400px]">
                        <BlogTableOfContents items={tocItems} />
                    </aside>
                </div>
            </div>
        </div>
    );
}
