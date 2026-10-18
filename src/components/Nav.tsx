import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { site } from "@/content/site";

const links = ["About", "Skills", "Experience", "Work", "Contact"];

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
      <nav aria-label="Main" className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" aria-label="Home" className="rounded-lg bg-accent px-2 py-1 text-sm font-bold text-black">
          {site.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
        </Link>
        <ul className="hidden gap-6 text-sm sm:flex">
          {links.map((l) => (
            <li key={l}>
              <Link href={`/#${l.toLowerCase()}`} className="hover:underline">{l}</Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {site.resume && (
            <a href={site.resume} className="rounded-full border border-line px-4 py-2 text-sm hover:bg-line">
              Résumé ↓
            </a>
          )}
        </div>
      </nav>
      <ul className="flex gap-5 overflow-x-auto px-4 pb-2 text-sm sm:hidden">
        {links.map((l) => (
          <li key={l}>
            <Link href={`/#${l.toLowerCase()}`}>{l}</Link>
          </li>
        ))}
      </ul>
    </header>
  );
}
