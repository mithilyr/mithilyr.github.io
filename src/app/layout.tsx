import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import Nav from "@/components/Nav";
import SmoothScroll from "@/components/SmoothScroll";
import CursorRing from "@/components/CursorRing";
import BackToTop from "@/components/BackToTop";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: `${site.name} | Engineer`, template: `%s | ${site.name}` },
  description: site.pitch,
  openGraph: { title: site.name, description: site.pitch, type: "website" },
};

// Sets the saved theme before paint to avoid a flash.
const themeScript = `try{var t=localStorage.getItem("theme");if(t)document.documentElement.dataset.theme=t;else if(matchMedia("(prefers-color-scheme: dark)").matches)document.documentElement.dataset.theme="dark"}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={spaceGrotesk.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-accent focus:px-3 focus:py-2 focus:text-black">
          Skip to content
        </a>
        <SmoothScroll />
        <div className="film-grain" aria-hidden />
        <CursorRing />
        <Nav />
        {children}
        <BackToTop />
        <footer className="border-t border-line px-4 pb-24 pt-8 text-center text-sm text-muted">
          {site.name} · {site.location} ·{" "}
          <a href={site.github} className="underline">GitHub</a> ·{" "}
          <a href={site.linkedin} className="underline">LinkedIn</a>
        </footer>
      </body>
    </html>
  );
}
