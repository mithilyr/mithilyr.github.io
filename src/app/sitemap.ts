import type { MetadataRoute } from "next";
import { projects, otherProjects, design } from "@/content/site";

export const dynamic = "force-static";

const base = "https://mithilyr.github.io";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, priority: 1 },
    ...[...projects, ...otherProjects].map((p) => ({
      url: `${base}/work/${p.slug}/`,
      lastModified: now,
      priority: 0.7,
    })),
    ...design.map((d) => ({ url: `${base}/design/${d.slug}/`, lastModified: now, priority: 0.6 })),
  ];
}
