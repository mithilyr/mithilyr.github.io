import {
  siPython, siQt, siGithubactions, siUv, siNextdotjs, siFastapi, siPostgresql, siDocker, siScikitlearn,
  siJavascript, siSupabase, siCloudflare, siPandas, siSqlalchemy, siJinja, siTypescript, siVercel,
  siInstagram, siYoutube, siFacebook, siPwa,
} from "simple-icons";

type Icon = { path: string };
// Skill name -> logo. Names without a logo show as a plain text chip.
const icons: Record<string, Icon> = {
  Python: siPython, PySide6: siQt, "GitHub Actions": siGithubactions, uv: siUv, "Next.js": siNextdotjs,
  FastAPI: siFastapi, PostgreSQL: siPostgresql, Docker: siDocker, "scikit-learn": siScikitlearn,
  JavaScript: siJavascript, Supabase: siSupabase, Cloudflare: siCloudflare, pandas: siPandas,
  SQLAlchemy: siSqlalchemy, Jinja2: siJinja, TypeScript: siTypescript, Vercel: siVercel,
  Instagram: siInstagram, YouTube: siYoutube, Facebook: siFacebook, PWA: siPwa,
};

// One skill used by a project: a small logo (when there is one) and the name.
export default function SkillTag({ name }: { name: string }) {
  const icon = icons[name];
  return (
    <span className="tag skill-tag">
      {icon && (
        <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden className="shrink-0 fill-current">
          <path d={icon.path} />
        </svg>
      )}
      {name}
    </span>
  );
}

export function SkillList({ skills, label = "Skills used" }: { skills: string[]; label?: string }) {
  return (
    <div className="mt-6">
      <p className="mono mb-2 text-[10px] uppercase tracking-[0.18em] text-muted">{label}</p>
      <p className="flex flex-wrap gap-2">
        {skills.map((s) => (
          <SkillTag key={s} name={s} />
        ))}
      </p>
    </div>
  );
}
