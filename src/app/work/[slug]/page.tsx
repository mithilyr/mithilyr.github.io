import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects } from "@/content/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p ? { title: p.title, description: p.blurb } : {};
}

export default async function CaseStudy({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();
  return (
    <main id="main" className="mx-auto max-w-3xl px-4 py-16">
      <Link href="/#work" className="text-sm text-muted hover:underline">← Back</Link>
      <h1 className="mt-6 text-5xl font-bold">{p.title}</h1>
      <p className="mt-4 text-xl text-muted">{p.blurb}</p>

      <dl className="mt-10 grid grid-cols-3 gap-4 border-y border-line py-6">
        {p.stats.map((s, i) => (
          <div key={i}>
            <dt className="text-2xl font-bold sm:text-3xl">{s.value}</dt>
            <dd className="mt-1 text-xs text-muted sm:text-sm">{s.label}</dd>
          </div>
        ))}
      </dl>

      <h2 className="mt-12 text-sm uppercase tracking-widest text-muted">The problem</h2>
      <p className="mt-3 text-lg">{p.problem}</p>

      <h2 className="mt-12 text-sm uppercase tracking-widest text-muted">What I built</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-lg">
        {p.built.map((b) => <li key={b}>{b}</li>)}
      </ul>

      <h2 className="mt-12 text-sm uppercase tracking-widest text-muted">Findings and trade-offs</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-lg">
        {p.notes.map((n) => <li key={n}>{n}</li>)}
      </ul>

      <p className="mt-12 flex flex-wrap gap-3 text-sm">
        {p.repo ? (
          <a href={p.repo} className="rounded-full border border-fg px-5 py-2 hover:bg-accent hover:text-black">Code on GitHub ↗</a>
        ) : (
          <span className="rounded-full border border-line px-5 py-2 text-muted">Private repository</span>
        )}
        {p.live && (
          <a href={p.live} className="rounded-full border border-fg px-5 py-2 hover:bg-accent hover:text-black">Live demo ↗</a>
        )}
      </p>
      <p className="mt-4 text-sm text-muted">{p.tags.join(" · ")}</p>
    </main>
  );
}
