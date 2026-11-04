import Link from "next/link";
import { site } from "@/content/site";
import FooterJelly from "./FooterJelly";

const menu = [
  ["Home", "/"],
  ["Engineering", "/#engineering"],
  ["Design", "/#design"],
  ["Experience", "/#experience"],
  ["Highlights", "/#highlights"],
  ["Contact", "/#contact"],
] as const;

// Brand, menu and contact columns (as in the earlier portfolio) over the jellyfish.
export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t-2 border-line text-sm text-muted">
      {/* the jellyfish get their own zone, so the info below never covers them */}
      <div className="relative h-[22rem] sm:h-[26rem]">
        <FooterJelly />
      </div>
      <div className="relative border-t-2 border-line bg-bg">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <p className="mono text-2xl font-bold text-fg">
              Mithil<span className="text-accent">.</span>
            </p>
            <p className="mt-3 max-w-xs">{site.tagline}</p>
          </div>
          <nav aria-label="Footer">
            <h6 className="mono mb-3 text-xs uppercase tracking-[0.18em] text-fg">Menu</h6>
            <ul className="space-y-2">
              {menu.map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="foot-link">{label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h6 className="mono mb-3 text-xs uppercase tracking-[0.18em] text-fg">Contact</h6>
            <ul className="space-y-2">
              <li><a href={`mailto:${site.email}`} className="foot-link break-all">{site.email}</a></li>
              <li><a href={site.linkedin} target="_blank" rel="noopener" className="foot-link">LinkedIn ↗</a></li>
              <li><a href={site.github} target="_blank" rel="noopener" className="foot-link">GitHub ↗</a></li>
              <li>{site.location}</li>
            </ul>
          </div>
        </div>
        <div className="border-t-2 border-line">
          <p className="mono mx-auto max-w-7xl px-4 py-4 pb-20 text-xs sm:pb-4">
            &copy; 2026 {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
