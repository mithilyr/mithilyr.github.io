import { site } from "@/content/site";

type Repo = {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  fork: boolean;
};
type User = { public_repos: number; followers: number };

const handle = site.github.split("/").filter(Boolean).pop()!;

async function load() {
  try {
    const [u, r] = await Promise.all([
      fetch(`https://api.github.com/users/${handle}`),
      fetch(`https://api.github.com/users/${handle}/repos?per_page=100&sort=pushed`),
    ]);
    if (!u.ok || !r.ok) return null;
    return { user: (await u.json()) as User, repos: (await r.json()) as Repo[] };
  } catch {
    return null;
  }
}

// Pulled from the public GitHub API when the site is built, so it needs a rebuild to refresh.
export default async function GithubActivity() {
  const data = await load();
  if (!data) return <p className="text-muted">GitHub activity is unavailable right now. <a className="underline" href={site.github}>See the profile ↗</a></p>;
  const repos = data.repos.filter((r) => !r.fork);
  const langs = new Map<string, number>();
  repos.forEach((r) => r.language && langs.set(r.language, (langs.get(r.language) ?? 0) + 1));
  const top = [...langs.entries()].sort((a, b) => b[1] - a[1]);
  const total = top.reduce((n, [, c]) => n + c, 0) || 1;

  return (
    <div>
      <p className="border-y border-line py-6 text-lg">
        <span className="text-3xl font-bold text-accent">{data.user.public_repos}</span>{" "}
        <span className="text-muted">public repos, most recently active below</span>
      </p>
      {top.length > 0 && (
        <div className="mt-6">
          <div className="flex h-2 overflow-hidden bg-line" aria-hidden>
            {top.map(([lang, c], i) => (
              <span
                key={lang}
                style={{ width: `${(c / total) * 100}%`, background: ["var(--accent)", "var(--gold)", "var(--c-ai)", "var(--c-web)"][i % 4] }}
              />
            ))}
          </div>
          <p className="mt-2 text-sm text-muted">{top.map(([l, c]) => `${l} ${Math.round((c / total) * 100)}%`).join(" · ")}</p>
        </div>
      )}
      <ul className="mt-8 grid gap-4 sm:grid-cols-3">
        {repos.slice(0, 3).map((r) => (
          <li key={r.name}>
            <a href={r.html_url} className="mini-card win d-ai block h-full">
              <p className="font-semibold">{r.name}</p>
              <p className="mt-2 text-sm text-muted">{r.description ?? "No description yet"}</p>
              <p className="mt-4 text-xs text-muted">
                {r.language ?? "n/a"} · updated {new Date(r.pushed_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
              </p>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-muted">Pulled from the GitHub API when the site was last built.</p>
    </div>
  );
}
