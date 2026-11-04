"use client";
import { useEffect, useRef } from "react";

// A soft ring that trails the pointer and grows over links and buttons.
// The normal cursor stays visible. Off on touch screens and with reduced motion.
export default function CursorRing() {
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!matchMedia("(pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ring.current!;
    let x = -100, y = -100, tx = -100, ty = -100, big = false, raf = 0;
    const move = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      big = e.target instanceof Element && !!e.target.closest("a, button, summary, input");
      el.style.opacity = "1";
    };
    const leave = () => (el.style.opacity = "0");
    const frame = () => {
      raf = requestAnimationFrame(frame);
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${big ? 1.8 : 1})`;
    };
    addEventListener("pointermove", move);
    document.addEventListener("pointerleave", leave);
    frame();
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);
  return (
    <div
      ref={ring}
      aria-hidden
      className="round-ok pointer-events-none fixed left-0 top-0 z-[60] hidden h-8 w-8 border-2 border-accent opacity-0 transition-[opacity,scale] duration-200 [@media(pointer:fine)]:block"
    >
      <span className="round-ok absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 bg-accent" />
    </div>
  );
}
