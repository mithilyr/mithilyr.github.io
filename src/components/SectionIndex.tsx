"use client";
import { useEffect, useState } from "react";

const ids = ["about", "skills", "experience", "work", "github", "contact"];

// Fixed side dots that light up for the section in view. Desktop only.
export default function SectionIndex() {
  const [active, setActive] = useState("");
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return (
    <aside className="fixed right-5 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-3 min-[1440px]:flex">
      {ids.map((id) => (
        <a
          key={id}
          href={`#${id}`}
          aria-label={id}
          className={`h-2.5 w-2.5 rounded-full border border-fg transition-all ${
            active === id ? "scale-125 bg-accent" : "bg-transparent"
          }`}
        />
      ))}
    </aside>
  );
}
