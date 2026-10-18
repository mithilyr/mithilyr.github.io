import Link from "next/link";
import { site, experience, education, certifications, projects, otherProjects, universityProjects, roles, ticker } from "@/content/site";
import Reveal from "@/components/Reveal";
import Typing from "@/components/Typing";
import Marquee from "@/components/Marquee";
import SectionIndex from "@/components/SectionIndex";
import HeroGlow from "@/components/HeroGlow";
import Hero3D from "@/components/Hero3D";
import Image from "next/image";
import SkillGrid from "@/components/SkillGrid";
import GithubActivity from "@/components/GithubActivity";

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-16 border-t border-line py-16">
      <h2 className="mb-8 text-sm uppercase tracking-widest text-muted">{title}</h2>
      <Reveal>{children}</Reveal>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <SectionIndex />
      <main id="main" className="mx-auto max-w-7xl px-4">
        <HeroGlow>
          <Hero3D />
          <p className="text-sm uppercase tracking-widest text-muted">{site.location}</p>
          <h1 className="mt-4 text-[min(13vw,8rem)] font-bold uppercase leading-[0.9]">
            {site.name}
          </h1>
          <p className="mt-8 max-w-2xl text-2xl sm:text-3xl 2xl:text-4xl">{site.pitch}</p>
          <a
            href="#work"
            className="mt-8 inline-block rounded-full border border-fg px-6 py-3 text-sm hover:bg-accent hover:text-black"
          >
            See the work →
          </a>
          <p className="mt-10 text-sm text-muted">
            <span className="pulse-dot mr-2" aria-hidden />
            <Typing words={roles} />
          </p>
        </HeroGlow>
        <Marquee items={ticker} />

        <Section id="about" title="About">
          <div className="grid items-start gap-10 md:grid-cols-[1fr_auto]">
            <div className="space-y-4">
              {site.about.map((p) => (
                <p key={p} className="max-w-2xl text-lg">{p}</p>
              ))}
            </div>
            <Image
              src={site.photo}
              alt={`Portrait of ${site.name}`}
              width={400}
              height={400}
              className="h-64 w-64 rounded-3xl border border-line object-cover md:h-72 md:w-72"
            />
          </div>
        </Section>

        <Section id="skills" title="Skills">
          <SkillGrid />
        </Section>

        <Section id="experience" title="Experience">
          <ul className="divide-y divide-line">
            {experience.map((e, i) => (
              <li key={e.role + e.org}>
                <details className="group py-4" open={i === 0}>
                  <summary className="flex cursor-pointer list-none items-baseline justify-between gap-4">
                    <span>
                      <strong>{e.org}</strong> <span className="text-muted">{e.role}</span>
                    </span>
                    <span className="flex shrink-0 items-center gap-3 text-muted">
                      {e.year}
                      <span aria-hidden className="transition group-open:rotate-45">+</span>
                    </span>
                  </summary>
                  <p className="mt-3 max-w-3xl text-muted">{e.detail}</p>
                </details>
              </li>
            ))}
          </ul>
          <div className="mt-12 grid gap-10 sm:grid-cols-2">
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
              <ul className="space-y-2 text-muted">
                {certifications.map((c) => <li key={c}>{c}</li>)}
              </ul>
            </div>
          </div>
        </Section>

        <Section id="work" title="Work">
          <div className="grid gap-6 sm:grid-cols-2">
            {projects.map((p) => (
              <Link
                key={p.slug}
                href={`/work/${p.slug}`}
                className="group flex flex-col rounded-2xl border border-line p-6 transition hover:-translate-y-1 hover:border-fg"
              >
                <h3 className="text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-muted">{p.blurb}</p>
                <dl className="mt-6 grid grid-cols-3 gap-2">
                  {p.stats.map((s, i) => (
                    <div key={i}>
                      <dt className="text-2xl font-bold">{s.value}</dt>
                      <dd className="text-xs text-muted">{s.label}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-6 flex flex-wrap gap-2 text-xs text-muted">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-full border border-line px-2 py-1">{t}</span>
                  ))}
                </p>
                <p className="mt-6 text-sm font-semibold group-hover:text-accent">Read the case study →</p>
              </Link>
            ))}
          </div>

          <h3 className="mb-4 mt-14 font-semibold">More projects</h3>
          <ul className="grid gap-4 sm:grid-cols-2">
            {otherProjects.map((p) => (
              <li key={p.title} className="rounded-2xl border border-line p-5">
                <p className="font-semibold">
                  {p.href ? (
                    <a href={p.href} className="underline decoration-line underline-offset-4 hover:decoration-fg">{p.title} ↗</a>
                  ) : (
                    p.title
                  )}
                </p>
                <p className="mt-2 text-sm text-muted">{p.line}</p>
                <p className="mt-3 flex flex-wrap gap-2 text-xs text-muted">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-full border border-line px-2 py-1">{t}</span>
                  ))}
                </p>
              </li>
            ))}
          </ul>

          <details className="group mt-6 rounded-2xl border border-line p-5">
            <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">
              University projects
              <span aria-hidden className="text-muted transition group-open:rotate-45">+</span>
            </summary>
            <div className="mt-4 grid gap-6 sm:grid-cols-3">
              {Object.entries(universityProjects).reverse().map(([year, items]) => (
                <div key={year}>
                  <p className="mb-2 text-sm font-semibold">{year}</p>
                  <ul className="space-y-2 text-sm text-muted">
                    {items.map((i) => <li key={i}>{i}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </details>
        </Section>

        <Section id="github" title="GitHub">
          <GithubActivity />
        </Section>

        <Section id="contact" title="Contact">
          <p className="text-4xl font-bold sm:text-6xl">Let&apos;s build something.</p>
          <p className="mt-6">
            <a href={`mailto:${site.email}`} className="underline">{site.email}</a>
            {" · "}
            <a href={site.github} className="underline">GitHub ↗</a>
            {" · "}
            <a href={site.linkedin} className="underline">LinkedIn ↗</a>
          </p>
        </Section>
      </main>
    </>
  );
}
