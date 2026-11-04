"use client";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { Shot } from "@/content/site";

// A grid of real project images. Click one to open it large; arrows or the keyboard move between
// them, Esc closes. Plain overlay, no library.
export default function Gallery({ title, items, compact = false }: { title: string; items: Shot[]; compact?: boolean }) {
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + items.length) % items.length)), [items.length]);

  useEffect(() => {
    if (open === null) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    addEventListener("keydown", key);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      removeEventListener("keydown", key);
      document.body.style.overflow = prev;
    };
  }, [open, close, step]);

  const cur = open === null ? null : items[open];
  const lead = items.length % 2 === 1; // an odd one out gets the full row

  return (
    <section className={compact ? "mt-6" : "mt-12"} aria-label={title}>
      {!compact && <h2 className="text-sm uppercase tracking-widest text-muted">{title}</h2>}
      {compact ? (
        // thumbnails only: a tidy row of equal squares; captions show in the viewer
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {items.map((s, i) => (
            <li key={s.src}>
              <button type="button" onClick={() => setOpen(i)} className="gal-thumb win block aspect-square w-full" aria-label={s.caption}>
                <Image src={s.src} alt={s.alt} width={s.w} height={s.h} sizes="(min-width: 640px) 200px, 45vw" className="block h-full w-full object-cover" />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {items.map((s, i) => (
            <li key={s.src} className={lead && i === 0 ? "sm:col-span-2" : ""}>
              <button type="button" onClick={() => setOpen(i)} className="gal-thumb win group block w-full text-left">
                <Image src={s.src} alt={s.alt} width={s.w} height={s.h} sizes="(min-width: 768px) 380px, 90vw" className="block h-auto w-full" />
                <span className="block p-3 text-xs text-muted">{s.caption}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {cur && (
        <div className="gal-overlay" role="dialog" aria-modal="true" aria-label={cur.caption} onClick={close}>
          <figure className="gal-figure" onClick={(e) => e.stopPropagation()}>
            <Image src={cur.src} alt={cur.alt} width={cur.w} height={cur.h} sizes="100vw" className="gal-img" priority />
            <figcaption className="mono mt-3 text-xs text-[#f1ecdc]">
              {(open ?? 0) + 1} / {items.length} · {cur.caption}
            </figcaption>
          </figure>
          <button type="button" className="gal-btn gal-close" onClick={close} aria-label="Close">✕</button>
          {items.length > 1 && (
            <>
              <button type="button" className="gal-btn gal-prev" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous image">←</button>
              <button type="button" className="gal-btn gal-next" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next image">→</button>
            </>
          )}
        </div>
      )}
    </section>
  );
}
