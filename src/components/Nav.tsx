import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { site } from "@/content/site";

const links = ["About", "Skills", "Experience", "Work", "Contact"];

// Status-bar style header: flat, full width, numbered "workspaces".
export default function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-line bg-bg/90 backdrop-blur-md">
      <nav aria-label="Main" className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2">
        <Link href="/" aria-label="Home" className="mono bg-accent px-2 py-1 text-sm font-bold text-black">
          {site.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
        </Link>
        <ul className="hidden items-center gap-1 sm:flex">
          {links.map((l, i) => (
            <li key={l}>
              <Link href={`/#${l.toLowerCase()}`} className="bar-link"><i>{i + 1}</i>{l}</Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {site.resume && (
            <a href={site.resume} className="bar-link border-2 border-line">
              résumé ↓
            </a>
          )}
        </div>
      </nav>
      <ul className="nav-scroll flex gap-1 overflow-x-auto px-4 pb-2 sm:hidden">
        {links.map((l, i) => (
          <li key={l}>
            <Link href={`/#${l.toLowerCase()}`} className="bar-link"><i>{i + 1}</i>{l}</Link>
          </li>
        ))}
      </ul>
    </header>
  );
}
