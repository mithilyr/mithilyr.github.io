import {
  siPython, siTypescript, siNextdotjs, siFastapi, siQt, siThreedotjs, siPostgresql, siSupabase,
  siSqlalchemy, siDocker, siGithubactions, siCloudflare, siRender, siUv, siHuggingface, siOllama,
  siClaude, siGooglegemini, siPytest, siRuff, siPenpot, siJavascript, siC, siPhp, siPandas, siNumpy,
  siScikitlearn, siOpenrouter, siN8n, siModelcontextprotocol, siGit, siLinux, siJinja, siWordpress,
  siWoocommerce, siArduino,
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
  Ruff: siRuff, Penpot: siPenpot, JavaScript: siJavascript, C: siC, PHP: siPhp, pandas: siPandas,
  NumPy: siNumpy, "scikit-learn": siScikitlearn, OpenRouter: siOpenrouter, n8n: siN8n,
  MCP: siModelcontextprotocol, Git: siGit, Linux: siLinux, Jinja2: siJinja, WordPress: siWordpress,
  WooCommerce: siWoocommerce, Arduino: siArduino,
};

// Colour per skill group; groups longer than SHOW fold the rest into a "+N more" disclosure.
const groupColour = ["d-solar", "d-ai", "d-web", "d-data", "d-solar", "d-ai", "d-web"];
const SHOW = 8;

function Chip({ name }: { name: string }) {
  const icon = icons[name];
  return (
    <li className="skill-chip group flex items-center gap-2 border border-line px-3 py-1.5 text-sm">
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
}

export default function SkillGrid() {
  return (
    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
      {Object.entries(skills).map(([group, items], gi) => {
        const head = items.slice(0, SHOW);
        const more = items.slice(SHOW);
        return (
          <div key={group} className={groupColour[gi % groupColour.length]}>
            <h3 className="mb-4 flex items-center gap-2 font-semibold">
              <span className="h-2 w-2" style={{ background: "var(--dc)" }} aria-hidden />
              {group}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {head.map((name) => <Chip key={name} name={name} />)}
            </ul>
            {more.length > 0 && (
              <details className="group/more mt-2">
                <summary className="cursor-pointer list-none text-sm text-muted transition hover:text-[var(--dc)]">
                  <span className="group-open/more:hidden">+ {more.length} more</span>
                  <span className="hidden group-open/more:inline">Show less</span>
                </summary>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {more.map((name) => <Chip key={name} name={name} />)}
                </ul>
              </details>
            )}
          </div>
        );
      })}
    </div>
  );
}
