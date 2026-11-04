import Link from "next/link";
import { site, experience, education, certifications, projects, otherProjects, universityProjects, roles, ticker, domainLabel } from "@/content/site";
import Reveal from "@/components/Reveal";
import Typing from "@/components/Typing";
import Marquee from "@/components/Marquee";
import SectionIndex from "@/components/SectionIndex";
import HeroGlow from "@/components/HeroGlow";
import Hero3D from "@/components/Hero3D";
import Image from "next/image";
import SkillGrid from "@/components/SkillGrid";
import GithubActivity from "@/components/GithubActivity";
import ProjectArt from "@/components/ProjectArt";

function Section({ id, n, title, children }: { id: string; n: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20 border-t-2 border-line py-20">
      <h2 className="eyebrow mb-10">
        <b>{n}</b> {title}
      </h2>
      <Reveal>{children}</Reveal>
    </section>
  );
}

export default function Home() {
  const [first, ...rest] = site.name.split(" ");
  return (
    <>
      <SectionIndex />
      <main id="main">
        <HeroGlow>
          <Hero3D />
          <div className="mx-auto w-full max-w-7xl px-4">
          <p className="status-chip">
            <span className="pulse-dot" aria-hidden />
            Open to internships and collaborations
          </p>
          <p className="text-sm uppercase tracking-widest text-muted">{site.location}</p>
          <h1 className="mt-4 text-[min(13vw,8rem)] font-bold uppercase leading-[0.9]">
            {first}
            <br />
            <span className="grad-text">{rest.join(" ")}</span>
          </h1>
          <p className="mt-8 max-w-2xl text-2xl sm:text-3xl 2xl:text-4xl">{site.pitch}</p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a href="#work" className="btn-solid">See the work <span aria-hidden>→</span></a>
            {site.resume && (
              <a href={site.resume} className="btn-ghost">Résumé <span aria-hidden>↓</span></a>
            )}
          </div>
          <p className="mt-10 text-sm text-muted">
            <Typing words={roles} />
          </p>
          </div>
        </HeroGlow>
        <Marquee items={ticker} />

        <div className="mx-auto max-w-7xl px-4">

        <Section id="about" n="01" title="About">
          <div className="grid items-start gap-10 md:grid-cols-[1fr_auto]">
            <div className="space-y-4">
              {site.about.map((p) => (
                <p key={p} className="max-w-2xl text-lg">{p}</p>
              ))}
            </div>
            <div className="win win-on p-1.5">
              <Image
                src={site.photo}
                alt={`Portrait of ${site.name}`}
                width={400}
                height={400}
                className="h-64 w-64 object-cover md:h-72 md:w-72"
              />
            </div>
          </div>
        </Section>

        <Section id="skills" n="02" title="Skills">
          <SkillGrid />
        </Section>

        <Section id="experience" n="03" title="Experience">
          <ul className="divide-y divide-line">
            {experience.map((e, i) => (
              <li key={e.role + e.org}>
                <details className="group py-5" open={i === 0}>
                  <summary className="flex cursor-pointer list-none flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                    <span className="text-lg">
                      <strong>{e.org}</strong> <span className="text-muted">{e.role}</span>
                    </span>
                    <span className="flex shrink-0 items-center gap-3">
                      <span className="xp-year">{e.year}</span>
                      <span aria-hidden className="text-accent transition group-open:rotate-45">+</span>
                    </span>
                  </summary>
                  <p className="mt-4 max-w-3xl text-muted">{e.detail}</p>
                </details>
              </li>
            ))}
          </ul>
          <div className="mt-14 grid gap-10 sm:grid-cols-2">
            <div>
              <h3 className="mb-3 font-semibold">Education</h3>
              <ul className="divide-y divide-line">
                {education.map((e) => (
                  <li key={e.what} className="flex justify-between gap-4 py-3">
                    <span>{e.what} <span className="text-muted">· {e.where}</span></span>
                    <span className="shrink-0 text-muted">{e.year}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-3 font-semibold">Certifications</h3>
              <ul className="flex flex-wrap gap-2">
                {certifications.map((c) => (
                  <li key={c} className="tag" style={{ ["--dc" as string]: "var(--accent)" }}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        <Section id="work" n="04" title="Work">
          <div className="grid gap-6 sm:grid-cols-2">
            {projects.map((p, i) => (
              <Link
                key={p.slug}
                href={`/work/${p.slug}`}
                className={`group work-card win d-${p.domain}`}
              >
                <div className="work-band">
                  <ProjectArt slug={p.slug} />
                  <span className="work-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="work-kind">{domainLabel[p.domain]}</span>
                </div>
                <div className="flex flex-1 flex-col p-5 pt-6">
                  <h3 className="text-xl font-semibold">{p.title}</h3>
                  <p className="mt-2 text-muted">{p.blurb}</p>
                  <dl className="mt-6 grid grid-cols-3 gap-3">
                    {p.stats.map((s, j) => (
                      <div key={j}>
                        <dt className="stat-val text-2xl font-bold leading-tight">{s.value}</dt>
                        <dd className="mt-1 text-xs text-muted">{s.label}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-6 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </p>
                  <p className="mt-auto pt-6 text-sm font-semibold transition group-hover:text-[var(--dc)]">Read the case study →</p>
                </div>
              </Link>
            ))}
          </div>

          <h3 className="mb-4 mt-16 font-semibold">More projects</h3>
          <ul className="grid gap-6 sm:grid-cols-2">
            {otherProjects.map((p, i) => (
              <li key={p.title} className={`work-card win d-${p.domain}`}>
                <div className="work-band">
                  <ProjectArt slug={p.slug} />
                  <span className="work-num">{String(projects.length + i + 1).padStart(2, "0")}</span>
                  <span className="work-kind">{domainLabel[p.domain]}</span>
                </div>
                <div className="flex flex-1 flex-col p-5 pt-6">
                  <h3 className="text-xl font-semibold">
                    {p.href ? (
                      <a href={p.href} className="after:absolute after:inset-0">{p.title} ↗</a>
                    ) : (
                      p.title
                    )}
                  </h3>
                  <p className="mt-2 text-muted">{p.line}</p>
                  <p className="mt-6 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </p>
                  {p.href && <p className="mt-auto pt-6 text-sm font-semibold">Open the prototype ↗</p>}
                </div>
              </li>
            ))}
          </ul>

          <details className="group win mt-6 p-5">
            <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">
              University projects
              <span aria-hidden className="text-accent transition group-open:rotate-45">+</span>
            </summary>
            <div className="mt-4 grid gap-6 sm:grid-cols-3">
              {Object.entries(universityProjects).reverse().map(([year, items]) => (
                <div key={year}>
                  <p className="mb-2 text-sm font-semibold text-accent">{year}</p>
                  <ul className="space-y-2 text-sm text-muted">
                    {items.map((i) => <li key={i}>{i}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </details>
        </Section>

        <Section id="github" n="05" title="GitHub">
          <GithubActivity />
        </Section>

        <section id="contact" className="scroll-mt-20 border-t-2 border-line py-20">
          <Reveal>
            <div className="cta-panel">
              <p className="text-sm uppercase tracking-widest opacity-70">Contact</p>
              <p className="mt-4 max-w-3xl text-4xl font-bold leading-[1.05] sm:text-6xl">Let&apos;s build something.</p>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a href={`mailto:${site.email}`} className="btn-solid">{site.email} <span aria-hidden>→</span></a>
                {site.resume && <a href={site.resume} className="btn-ghost">Résumé ↓</a>}
                <a href={site.github} className="btn-ghost">GitHub ↗</a>
                <a href={site.linkedin} className="btn-ghost">LinkedIn ↗</a>
              </div>
            </div>
          </Reveal>
        </section>
        </div>
      </main>
    </>
  );
}
