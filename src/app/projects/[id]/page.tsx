import { projects, statusConfig } from "@/data/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateStaticParams() {
    return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const project = projects.find((p) => p.id === id);
    if (!project) return {};
    return {
        title: `${project.name} | Asif Ahsan`,
        description: project.description,
    };
}

export default async function ProjectCaseStudy({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = projects.find((p) => p.id === id);
    if (!project) notFound();

    const status = statusConfig[project.status] || statusConfig.Finished;

    return (
        <div className="relative min-h-screen">
            {/* Background */}
            <div className="absolute inset-0 bg-cyber-grid opacity-40 pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#469D89]/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative container py-12 max-w-4xl">
                {/* Back link */}
                <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 text-[11px] font-mono text-[#469D89]/60 hover:text-[#469D89] transition-colors mb-8 tracking-widest uppercase"
                >
                    ← All Projects
                </Link>

                {/* Hero */}
                <div className="relative rounded-2xl overflow-hidden border border-[#469D89]/20 mb-8">
                    <div className="relative h-56 lg:h-72 overflow-hidden">
                        <img
                            src={project.image}
                            alt={project.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

                        {/* Badges */}
                        <div className="absolute top-4 left-4 flex gap-2">
                            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-mono tracking-widest ${status.color}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${status.glow} ${project.status !== "Finished" ? "animate-pulse" : ""}`} />
                                {status.label}
                            </div>
                            {project.personal && (
                                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-purple-400/40 bg-purple-400/10 text-purple-300 text-[10px] font-mono tracking-widest">
                                    ✦ Personal
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Title block */}
                    <div className="p-6 lg:p-8">
                        <div className="text-[10px] font-mono text-[#469D89]/50 tracking-widest uppercase mb-2">{project.type}</div>
                        <h1 className="text-3xl lg:text-4xl font-bold gradient-text-static mb-2">{project.name}</h1>
                        <p className="text-[11px] font-mono text-[#469D89]/50 tracking-widest">{project.timeLine}</p>
                    </div>
                </div>

                {/* Content grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Overview */}
                        <Section title="Overview">
                            <p className="text-sm text-muted-foreground leading-7">{project.description}</p>
                        </Section>

                        {/* Challenge */}
                        {project.challenge && (
                            <Section title="The Challenge">
                                <p className="text-sm text-muted-foreground leading-7">{project.challenge}</p>
                            </Section>
                        )}

                        {/* My Role */}
                        <Section title="My Role">
                            <p className="text-sm text-muted-foreground leading-7">{project.responsibilities}</p>
                        </Section>

                        {/* Outcome */}
                        {project.outcome && (
                            <Section title="Outcome">
                                <p className="text-sm text-muted-foreground leading-7">{project.outcome}</p>
                            </Section>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-5">
                        {/* Tech stack */}
                        <div className="border border-[#469D89]/15 rounded-xl p-5 bg-background/60 backdrop-blur-sm">
                            <h3 className="text-[10px] font-mono text-[#469D89]/60 tracking-[0.3em] uppercase mb-4">Tech Stack</h3>
                            <div className="flex flex-wrap gap-1.5">
                                {project.technologies.map((tech, i) => (
                                    <span key={i} className="px-2 py-1 text-[10px] font-mono text-[#469D89] border border-[#469D89]/20 rounded-full bg-[#469D89]/5">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Live link */}
                        {project.website && (
                            <a
                                href={project.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between w-full px-5 py-4 rounded-xl border border-[#469D89]/30 bg-[#469D89]/5 hover:bg-[#469D89]/10 hover:border-[#469D89]/60 hover:shadow-[0_0_20px_rgba(70,157,137,0.2)] transition-all duration-300 group"
                            >
                                <span className="text-sm font-mono text-[#469D89] tracking-wide">View Live Site</span>
                                <span className="text-[#469D89] group-hover:translate-x-1 transition-transform">→</span>
                            </a>
                        )}

                        {/* Back to projects */}
                        <Link
                            href="/projects"
                            className="flex items-center justify-between w-full px-5 py-4 rounded-xl border border-[#469D89]/15 hover:border-[#469D89]/30 transition-all duration-300 group"
                        >
                            <span className="text-sm font-mono text-muted-foreground tracking-wide">More Projects</span>
                            <span className="text-muted-foreground group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="border border-[#469D89]/15 rounded-xl p-5 lg:p-6 bg-background/60 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-4 bg-[#469D89] rounded-full" />
                <h2 className="text-[11px] font-mono text-[#469D89]/70 tracking-[0.3em] uppercase">{title}</h2>
            </div>
            {children}
        </div>
    );
}
