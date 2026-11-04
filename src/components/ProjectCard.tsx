import Link from "next/link";
import { domainLabel, type Domain } from "@/content/site";
import ProjectArt from "./ProjectArt";
import { SkillList } from "./SkillTag";

type Props = {
  n: number;
  domain: Domain;
  slug: string;
  title: string;
  blurb: string;
  tags: string[];
  stats?: { value: string; label: string }[];
};

// One project card: a drawing band, the story, and the skills used on that project.
// The whole card opens that project's own page.
export default function ProjectCard({ n, domain, slug, title, blurb, tags, stats }: Props) {
  return (
    <li data-d={domain}>
      <Link href={`/work/${slug}`} className={`group work-card win d-${domain} h-full`}>
        <div className="work-band">
          <ProjectArt slug={slug} />
          <span className="work-num">{String(n).padStart(2, "0")}</span>
          <span className="work-kind">{domainLabel[domain]}</span>
        </div>
        <div className="flex flex-1 flex-col p-5 pt-6">
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="mt-2 text-muted">{blurb}</p>
          {stats && (
            <dl className="mt-6 grid grid-cols-3 gap-3">
              {stats.map((s, j) => (
                <div key={j}>
                  <dt className="stat-val text-2xl font-bold leading-tight">{s.value}</dt>
                  <dd className="mt-1 text-xs text-muted">{s.label}</dd>
                </div>
              ))}
            </dl>
          )}
          <SkillList skills={tags} />
          <p className="mt-auto pt-6 text-sm font-semibold transition group-hover:text-[var(--dc)]">See the project →</p>
        </div>
      </Link>
    </li>
  );
}
