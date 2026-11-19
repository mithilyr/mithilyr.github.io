import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import Nav from "@/components/Nav";
import SmoothScroll from "@/components/SmoothScroll";
import CursorRing from "@/components/CursorRing";
import BackToTop from "@/components/BackToTop";
import SiteFooter from "@/components/SiteFooter";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

// High-contrast serif with a calligraphic italic, used only for the Design & Publicity division.
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jb",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mithilyr.github.io"),
  title: { default: `${site.name} | Engineer`, template: `%s | ${site.name}` },
  description: site.pitch,
  openGraph: { title: site.name, description: site.pitch, type: "website", siteName: site.name },
  twitter: { card: "summary_large_image", title: site.name, description: site.pitch },
};

// Sets the saved theme before paint to avoid a flash.
const themeScript = `try{var t=localStorage.getItem("theme");if(t)document.documentElement.dataset.theme=t;else if(matchMedia("(prefers-color-scheme: dark)").matches)document.documentElement.dataset.theme="dark"}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrains.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-accent focus:px-3 focus:py-2 focus:text-black">
          Skip to content
        </a>
        <SmoothScroll />
        <div className="film-grain" aria-hidden />
        <CursorRing />
        <Nav />
        {children}
        <BackToTop />
        <SiteFooter />
      </body>
    </html>
  );
}
