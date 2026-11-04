"use client";
import { useState } from "react";

type Filter = { id: string; label: string; count: number };

// Filter bar + grid. The cards (server-rendered <li data-d="...">) are passed in as children;
// the active filter becomes a class on the grid and CSS hides the cards that don't match.
export default function ProjectFilter({ filters, children }: { filters: Filter[]; children: React.ReactNode }) {
  const [active, setActive] = useState("all");
  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects by field">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={active === f.id}
            onClick={() => setActive(f.id)}
            className="filter-btn"
          >
            {f.label}
            <span className="filter-count">{f.count}</span>
          </button>
        ))}
      </div>
      <ul className={`grid gap-6 sm:grid-cols-2 f-${active}`}>{children}</ul>
    </>
  );
}
