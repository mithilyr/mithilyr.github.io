import {
  siPython, siTypescript, siNextdotjs, siFastapi, siQt, siThreedotjs, siPostgresql, siSupabase,
  siSqlalchemy, siDocker, siGithubactions, siCloudflare, siRender, siUv, siHuggingface, siOllama,
  siClaude, siGooglegemini, siPytest, siRuff, siPenpot,
} from "simple-icons";
import { skills } from "@/content/site";

type Icon = { path: string; hex: string };
// Skill name -> logo. Names without a logo show as a text chip.
const icons: Record<string, Icon> = {
  Python: siPython, TypeScript: siTypescript, "Next.js": siNextdotjs, FastAPI: siFastapi,
  PySide6: siQt, "Three.js": siThreedotjs, PostgreSQL: siPostgresql, Supabase: siSupabase,
  SQLAlchemy: siSqlalchemy, Docker: siDocker, "GitHub Actions": siGithubactions,
  Cloudflare: siCloudflare, Render: siRender, uv: siUv, "Hugging Face": siHuggingface,
  Ollama: siOllama, "Claude Code": siClaude, Gemini: siGooglegemini, pytest: siPytest,
  Ruff: siRuff, Penpot: siPenpot,
};

export default function SkillGrid() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {Object.entries(skills).map(([group, items]) => (
        <div key={group}>
          <h3 className="mb-3 font-semibold">{group}</h3>
          <ul className="flex flex-wrap gap-2">
            {items.map((name) => {
              const icon = icons[name];
              return (
                <li
                  key={name}
                  className="group flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-sm transition hover:border-fg"
                >
                  {icon && (
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      aria-hidden
                      className="shrink-0 fill-current text-muted transition group-hover:text-[var(--brand)]"
                      style={{ ["--brand" as string]: `#${icon.hex}` }}
                    >
                      <path d={icon.path} />
                    </svg>
                  )}
                  {name}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
