"use client";

import { useEffect, useState } from "react";

// Unique-visitor counter backed by Supabase (see supabase/visitors.sql).
// One random UUID per browser, no IP and no personal data. The anon key is
// public by design: the table is locked and only two functions are callable.
const SUPABASE_URL = "https://csomgkxmeigcrfkzhvme.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzb21na3htZWlnY3Jma3podm1lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ5OTkxODIsImV4cCI6MjExMDU3NTE4Mn0.ssR3zcCgm-JoyvAEr8VwmcV7KWiKOHTMvBEdfOy1ubg";

const MIN_VISIBLE = 25; // hide the badge until the number looks healthy
const ID_KEY = "pf_visitor_id";
const OWNER_KEY = "pf_owner";

function rpc(name: string, body: object = {}): Promise<unknown> {
  return fetch(`${SUPABASE_URL}/rest/v1/rpc/${name}`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((r) => {
    if (!r.ok) throw new Error(String(r.status));
    return r.json();
  });
}

export default function VisitorCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return;

    let id: string | null = null;
    let owner = false;
    try {
      // ?me once in this browser excludes you; ?unme undoes it.
      const q = new URLSearchParams(window.location.search);
      if (q.has("me")) localStorage.setItem(OWNER_KEY, "1");
      if (q.has("unme")) localStorage.removeItem(OWNER_KEY);
      owner = localStorage.getItem(OWNER_KEY) === "1";
      id = localStorage.getItem(ID_KEY);
      if (!id) {
        id = crypto.randomUUID();
        localStorage.setItem(ID_KEY, id);
      }
    } catch {
      id = null; // storage blocked: read the count only
    }

    // local dev and previews are read-only so testing never inflates the count
    const local = ["localhost", "127.0.0.1", "[::1]"].includes(window.location.hostname);
    const bot =
      local ||
      navigator.webdriver ||
      /bot|crawl|spider|headless|lighthouse|preview/i.test(navigator.userAgent);

    // ?stats shows the count at any size (for you), otherwise it stays hidden below MIN_VISIBLE
    const peek = new URLSearchParams(window.location.search).has("stats");

    const call = owner || bot || !id ? rpc("visitor_count") : rpc("register_visit", { p_id: id });
    call
      .then((n) => {
        const num = Number(n);
        if (Number.isFinite(num) && (peek || num >= MIN_VISIBLE)) setCount(num);
      })
      .catch(() => {});
  }, []);

  if (count === null) return null;
  return (
    <p className="mono mx-auto max-w-7xl px-4 pb-4 text-xs sm:pb-4">
      <span className="text-accent">{count.toLocaleString()}</span> unique {count === 1 ? "visitor" : "visitors"}
    </p>
  );
}
