"use client";
import { useRef } from "react";

// Grid background with a soft spotlight that follows the pointer.
export default function HeroGlow({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  return (
    <section
      ref={ref}
      className="hero-grid relative flex min-h-[calc(100svh-4rem)] flex-col items-start justify-center py-16"
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        ref.current!.style.setProperty("--mx", `${e.clientX - r.left}px`);
        ref.current!.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      {children}
    </section>
  );
}
