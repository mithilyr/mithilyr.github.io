"use client";
import { useRef } from "react";

// Full-width grid background (edge to edge) with a soft spotlight that follows the pointer.
// Children are expected to supply their own centred container.
export default function HeroGlow({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  return (
    <section
      ref={ref}
      className="hero-grid relative flex min-h-[calc(100svh-3.75rem)] flex-col justify-center overflow-hidden py-16"
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
