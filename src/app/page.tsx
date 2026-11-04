import { site, experience, education, certifications, projects, otherProjects, universityProjects, roles, ticker, design, highlights, domainLabel, type Domain } from "@/content/site";
import Reveal from "@/components/Reveal";
import Typing from "@/components/Typing";
import Marquee from "@/components/Marquee";
import SectionIndex from "@/components/SectionIndex";
import HeroGlow from "@/components/HeroGlow";
import Hero3D from "@/components/Hero3D";
import Image from "next/image";
import ProjectCard from "@/components/ProjectCard";
import ProjectFilter from "@/components/ProjectFilter";
import Gallery from "@/components/Gallery";
import Link from "next/link";
import { SkillList } from "@/components/SkillTag";

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

// Heading for one of the two "divisions" (Engineering & Software, Design & Publicity).
function DivisionHead({ n, label, title, sub, calligraphic = false }: { n: string; label: string; title: string; sub: string; calligraphic?: boolean }) {
  return (
    <header className="mb-10">
      <p className="eyebrow mb-4">
        <b>{n}</b> {label}
      </p>
      <h2
        className={
          calligraphic
            ? "text-5xl font-medium italic leading-[1.05] tracking-[-0.01em] [font-family:var(--font-playfair),Georgia,serif] sm:text-7xl"
            : "text-4xl font-bold leading-[1.05] sm:text-6xl"
        }
      >
        {title}
      </h2>
      <p className="mono mt-3 text-sm text-muted">{sub}</p>
    </header>
  );
}

const tileColour = ["d-orange", "d-ai", "d-gold", "d-orange"];

export default function Home() {
  const [first, ...rest] = site.name.split(" ");

  // every engineering project, case-study ones first, in one filterable grid
  const cards = [
    ...projects.map((p, i) => ({
      n: i + 1, domain: p.domain, slug: p.slug, title: p.title, blurb: p.blurb, tags: p.tags, stats: p.stats,
    })),
    ...otherProjects.map((p, i) => ({
      n: projects.length + i + 1, domain: p.domain, slug: p.slug, title: p.title, blurb: p.line, tags: p.tags,
      stats: undefined,
    })),
  ];
  const filters = [
    { id: "all", label: "All", count: cards.length },
    ...(Object.keys(domainLabel) as Domain[]).map((d) => ({
      id: d, label: domainLabel[d], count: cards.filter((c) => c.domain === d).length,
    })),
  ];

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
          <h1 className="mt-4 text-[min(14.5vw,8rem)] font-bold uppercase leading-[0.9]">
            {first}
            <br />
            <span className="grad-text">{rest.join(" ")}</span>
          </h1>
          <p className="mt-8 max-w-2xl text-2xl sm:text-3xl 2xl:text-4xl">{site.pitch}</p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a href="#engineering" className="btn-solid">Engineering work <span aria-hidden>→</span></a>
            <a href="#design" className="btn-ghost">Design work <span aria-hidden>→</span></a>
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
              {/* the frame hugs the photo: full width (up to 20rem) on a phone, a fixed square beside the text on a desktop */}
              <div className="win win-on w-full max-w-[20rem] p-1.5 md:w-fit md:max-w-none">
                <Image
                  src={site.photo}
                  alt={`Portrait of ${site.name}`}
                  width={400}
                  height={400}
                  className="block aspect-square w-full object-cover md:h-72 md:w-72"
                />
              </div>
            </div>
          </Section>

          <section id="engineering" className="scroll-mt-20 border-t-2 border-line py-20">
            <DivisionHead
              n="02"
              label="Division 01"
              title="Engineering & Software"
              sub="Solar PV · AI & automation · Web & systems · Data science"
            />
            <Reveal>
              <ProjectFilter filters={filters}>
                {cards.map((c) => (
                  <ProjectCard key={c.slug} {...c} />
                ))}
              </ProjectFilter>

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
            </Reveal>
          </section>
        </div>

        {/* Division 02 flips the colours (light band on the dark site, dark band on the light site) so the two fields read as different worlds. */}
        <section id="design" className="div-alt scroll-mt-20 border-t-2 border-line py-20">
          <div className="mx-auto max-w-7xl px-4">
            <DivisionHead
              n="03"
              label="Division 02"
              title="Design & Publicity"
              sub="Event branding · Sponsorship · Social publicity, built in Canva"
              calligraphic
            />
            <Reveal>
              <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {design.map((d, i) => (
                  <li key={d.slug} className="flex">
                    <Link href={`/design/${d.slug}`} className={`group win ${tileColour[i]} flex w-full flex-col`}>
                      {/* a strip of the real pieces */}
                      <div className="art-tile flex gap-px overflow-hidden bg-[var(--line)]">
                        {d.items.slice(0, 3).map((s) => (
                          <Image
                            key={s.src}
                            src={s.src}
                            alt=""
                            width={s.w}
                            height={s.h}
                            sizes="(min-width: 768px) 130px, 33vw"
                            className="block h-full min-w-0 flex-1 object-cover object-top"
                          />
                        ))}
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <p className="mono text-[11px] uppercase tracking-[0.16em] text-[var(--dc)]">
                          {String(i + 1).padStart(2, "0")} · {d.tag}
                        </p>
                        <h3 className="mt-3 text-[1.7rem] font-medium italic leading-tight [font-family:var(--font-playfair),Georgia,serif]">{d.title}</h3>
                        <p className="mt-2 text-muted">{d.blurb}</p>
                        <SkillList skills={d.skills} label="Made with" />
                        <p className="mt-auto pt-6 text-sm font-semibold transition group-hover:text-[var(--dc)]">See all {d.items.length} pieces →</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4">
          <Section id="experience" n="04" title="Experience">
            <ul className="divide-y divide-line">
              {experience.map((e, i) => (
                <li key={e.role + e.org}>
                  <details className="group py-5" open={i === 0}>
                    <summary className="flex cursor-pointer list-none flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                      <span className="text-lg">
                        <strong>{e.org}</strong> <span className="text-muted">-</span>{" "}
                        <span className="font-semibold text-accent">{e.role}</span>
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
                      <span>{e.what} <span className="text-muted">-</span> <span className="font-semibold text-accent">{e.where}</span></span>
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

          <Section id="highlights" n="05" title="Highlights">
            <ul className="grid gap-6 md:grid-cols-2">
              {highlights.map((h) => (
                <li key={h.id} className={`win flex flex-col p-5 sm:p-6 ${h.images ? "" : "md:self-start"}`}>
                  <p className="mono text-[11px] uppercase tracking-[0.16em] text-accent">{h.tag}</p>
                  <h3 className="mt-3 text-2xl font-semibold leading-tight">{h.title}</h3>
                  <p className="mt-3 text-muted">{h.blurb}</p>
                  {h.points && (
                    <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
                      {h.points.map((p) => <li key={p}>{p}</li>)}
                    </ul>
                  )}
                  {h.team && <p className="mono mt-4 text-xs text-muted">{h.team}</p>}
                  {h.images && <Gallery title={h.title} items={h.images} compact />}
                  {h.href && (
                    <p className="mt-auto pt-5 text-sm font-semibold">
                      <Link href={h.href} className="text-accent underline underline-offset-4">{h.hrefLabel ?? "Read more"} →</Link>
                    </p>
                  )}
                </li>
              ))}
            </ul>
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
