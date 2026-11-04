import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects, otherProjects, domainLabel, gallery, type Domain } from "@/content/site";
import ProjectArt from "@/components/ProjectArt";
import Gallery from "@/components/Gallery";
import { SkillList } from "@/components/SkillTag";

type Page = {
  slug: string;
  domain: Domain;
  title: string;
  blurb: string;
  tags: string[];
  stats?: { value: string; label: string }[];
  repo?: string;
  live?: string;
  problem?: string;
  built?: string[];
  notes?: string[];
};

// One page per project: the full case studies, and the smaller projects (title, summary, skills, images).
function find(slug: string): Page | undefined {
  const p = projects.find((x) => x.slug === slug);
  if (p) return p;
  const o = otherProjects.find((x) => x.slug === slug);
  if (!o) return undefined;
  return {
    slug: o.slug, domain: o.domain, title: o.title, blurb: o.line, tags: o.tags,
    live: "href" in o ? (o.href as string) : undefined,
    stats: "stats" in o ? o.stats : undefined,
    problem: "problem" in o ? o.problem : undefined,
    built: "built" in o ? o.built : undefined,
    notes: "notes" in o ? o.notes : undefined,
  };
}

export function generateStaticParams() {
  return [...projects, ...otherProjects].map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = find(slug);
  return p ? { title: p.title, description: p.blurb } : {};
}

export default async function CaseStudy({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const p = find(slug);
  if (!p) notFound();
  const g = gallery[slug];
  return (
    <main id="main" className={`mx-auto max-w-3xl px-4 py-16 d-${p.domain}`}>
      <Link href="/#engineering" className="text-sm text-muted hover:underline">← Back</Link>
      <p className="tag mt-6 block w-fit uppercase tracking-widest">{domainLabel[p.domain]}</p>
      <h1 className="mt-4 text-5xl font-bold">{p.title}</h1>
      <p className="mt-4 text-xl text-muted">{p.blurb}</p>

      <div className="art-frame win win-on">
        <ProjectArt slug={p.slug} fit="meet" />
      </div>

      {p.stats && (
        <dl className="mt-10 grid grid-cols-3 gap-4 border-y border-line py-6">
          {p.stats.map((s, i) => (
            <div key={i}>
              <dt className="stat-val text-2xl font-bold sm:text-3xl">{s.value}</dt>
              <dd className="mt-1 text-xs text-muted sm:text-sm">{s.label}</dd>
            </div>
          ))}
        </dl>
      )}

      {g && <Gallery title={g.title} items={g.items} />}

      {p.problem && (
        <>
          <h2 className="mt-12 text-sm uppercase tracking-widest text-muted">The problem</h2>
          <p className="mt-3 text-lg">{p.problem}</p>
        </>
      )}
      {p.built && (
        <>
          <h2 className="mt-12 text-sm uppercase tracking-widest text-muted">What I built</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-lg">
            {p.built.map((b) => <li key={b}>{b}</li>)}
          </ul>
        </>
      )}
      {p.notes && (
        <>
          <h2 className="mt-12 text-sm uppercase tracking-widest text-muted">Findings and trade-offs</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-lg">
            {p.notes.map((n) => <li key={n}>{n}</li>)}
          </ul>
        </>
      )}

      <p className="mt-12 flex flex-wrap gap-3 text-sm">
        {p.repo ? (
          <a href={p.repo} className="btn-solid">Code on GitHub ↗</a>
        ) : (
          <span className="mono border-2 border-line px-5 py-3 text-xs uppercase tracking-wider text-muted">Private repository</span>
        )}
        {p.live && (
          <a href={p.live} className="btn-ghost">Live demo ↗</a>
        )}
      </p>
      <SkillList skills={p.tags} />
    </main>
  );
}
