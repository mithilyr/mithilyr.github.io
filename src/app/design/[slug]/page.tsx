import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { design } from "@/content/site";
import Gallery from "@/components/Gallery";
import { SkillList } from "@/components/SkillTag";

export function generateStaticParams() {
  return design.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps<"/design/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const d = design.find((x) => x.slug === slug);
  return d ? { title: d.title, description: d.blurb } : {};
}

// One page per design collection: the full set of pieces, large, with a viewer.
export default async function DesignPage({ params }: PageProps<"/design/[slug]">) {
  const { slug } = await params;
  const d = design.find((x) => x.slug === slug);
  if (!d) notFound();
  return (
    <main id="main" className="mx-auto max-w-4xl px-4 py-16">
      <Link href="/#design" className="text-sm text-muted hover:underline">← Back</Link>
      <p className="tag mt-6 block w-fit uppercase tracking-widest" style={{ ["--dc" as string]: "var(--accent)" }}>{d.tag}</p>
      <h1 className="mt-4 text-5xl font-medium italic leading-[1.05] [font-family:var(--font-playfair),Georgia,serif] sm:text-6xl">{d.title}</h1>
      <p className="mt-5 max-w-2xl text-xl text-muted">{d.blurb}</p>
      <Gallery title="The work" items={d.items} />
      <SkillList skills={d.skills} label="Made with" />
    </main>
  );
}
