"use client";
import { useEffect, useRef } from "react";

// ASCII jellyfish for the footer, drawn as a grid of square tiles like a terminal "heat map".
// Each jellyfish is a small model (a tilted, pulsing bell with a dense cap and a lacy underside,
// frilled oral arms, thin broken tentacles). Every frame the model is sampled once per square cell
// and the brightness picks one of three looks:
//   bright -> light tile, dark dense glyph  (@ # 8)
//   medium -> mid tile, light glyph          (X S t o % 8)
//   dim    -> faint tile, faint glyph        (' : ; ` ,)
// Cells re-roll a few times a second so it shimmers. Pauses off-screen; one still frame for
// reduced motion.
const BRIGHT = "@#8@#%";
const MID = "XSto%8tX";
const DIM = "':;`,.'";
const NC = 6; // colour steps per palette

type Jelly = {
  fx: number; fy: number; s: number; phase: number; speed: number; depth: number; tilt: number;
  pal: [number, number]; // indices into [accent, gold, cream]
  tentacles: number; len: number;
};
// drawn back to front. A positive tilt points the bell up and to the right, tentacles trailing down-left.
const JELLIES: Jelly[] = [
  { fx: 0.9, fy: 0.16, s: 0.085, phase: 3, speed: 1.7, depth: 0.45, tilt: 0.7, pal: [0, 0], tentacles: 7, len: 2.2 },
  { fx: 0.72, fy: 0.36, s: 0.15, phase: 1.5, speed: 1.35, depth: 0.75, tilt: -0.5, pal: [1, 2], tentacles: 10, len: 2.3 },
  { fx: 0.5, fy: 0.98, s: 0.14, phase: 4.2, speed: 1.2, depth: 0.55, tilt: -0.15, pal: [1, 0], tentacles: 9, len: 2.0 },
  { fx: 0.27, fy: 0.34, s: 0.2, phase: 0, speed: 1.1, depth: 1, tilt: 0.55, pal: [0, 1], tentacles: 13, len: 2.5 },
];

// On narrow screens the jellyfish are re-spread so they don't pile on top of each other.
const PHONE_POS: { fx: number; fy: number }[] = [
  { fx: 0.86, fy: 0.1 },
  { fx: 0.74, fy: 0.46 },
  { fx: 0.46, fy: 0.97 },
  { fx: 0.3, fy: 0.3 },
];

const GONADS: [number, number][] = [[-0.2, -0.14], [0.2, -0.14], [-0.1, -0.33], [0.1, -0.33]];

function hex(c: string, fallback: string): [number, number, number] {
  let h = (c.trim() || fallback).replace("#", "");
  if (h.length === 3) h = h.split("").map((x) => x + x).join("");
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
const smooth = (a: number, b: number, x: number) => {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
// deterministic hash in [0, 1)
function h3(a: number, b: number, c: number) {
  let x = Math.imul(a, 374761393) + Math.imul(b, 668265263) + Math.imul(c, 1274126177);
  x = Math.imul(x ^ (x >>> 13), 1274126177);
  return ((x ^ (x >>> 16)) >>> 0) / 4294967295;
}

// Brightness of one jellyfish at local point (x right, y down, bell radius = 1, bell centre = 0).
// `rnd` is this cell's current random roll: it mottles the bell so tiers mix like in a heat map.
function field(j: Jelly, x: number, y: number, p: number, t: number, rx: number, ry: number, rnd: number) {
  let b = 0;
  const flare = Math.sin(p - 0.9);

  if (y <= 0.2) {
    let e = 2;
    let inside = false;
    if (y <= 0) {
      e = (x / rx) ** 2 + (y / ry) ** 2;
      inside = e <= 1;
    } else {
      const wd = rx * (1 + 0.06 * flare - y * 1.2);
      const edge = 0.14 + 0.05 * Math.sin(x * 18 - t * 2 + flare);
      if (Math.abs(x) <= wd && y <= edge) {
        inside = true;
        e = 0.9 + 0.1 * (Math.abs(x) / wd);
      }
    }
    if (inside) {
      const cap = smooth(0.05, -0.5, y); // 1 on the upper cap, 0 on the underside
      const ang = Math.atan2(-y, x);
      const ribs = 0.5 + 0.5 * Math.cos(ang * 14);
      // inside of the bell: dull, mostly dim and mid tiles
      let body = 0.14 + 0.1 * ribs * smooth(0.2, 0.9, e) + 0.3 * cap * (1 - 0.3 * e);
      for (const [gx, gy] of GONADS) {
        const d = Math.hypot(x - gx, y - gy * (ry / 0.62));
        body += 0.2 * Math.exp(-(((d - 0.12) / 0.032) ** 2));
      }
      body *= 0.6 + 0.8 * rnd;
      if (cap < 0.35 && rnd < 0.4 * (1 - cap)) body *= 0.3; // open lace on the underside
      // outline of the bell: the brightest part, strongest over the cap
      if (e > 0.74) {
        const edge = (0.58 + 0.4 * cap) * (0.78 + 0.5 * rnd);
        body = Math.max(body, edge);
      }
      b = body;
    }
  }

  if (y > 0.03 && y < j.len) {
    // the middle legs: four thick, bright, frilled oral arms with real volume
    if (y < 1.55) {
      for (let k = 0; k < 4; k++) {
        const ax = (k - 1.5) * 0.17 + Math.sin(y * 5 - p * 0.9 + k * 1.1) * 0.09 * (0.3 + y);
        const hw = 0.085 + 0.04 * Math.sin(y * 16 + k * 2) + 0.03 * Math.min(1, y * 2);
        const d = Math.abs(x - ax);
        if (d < hw && rnd > 0.06) b = Math.max(b, (0.66 + 0.4 * rnd) * Math.pow(1 - y / 1.55, 0.6) * (1 - 0.4 * (d / hw)));
      }
    }
    // the outer strands: thin, dull, broken chains of tiles that fade out. The ones nearer the
    // middle are a little thicker and brighter, the ones at the edges barely show.
    for (let k = 0; k < j.tentacles; k++) {
      const kk = (k / (j.tentacles - 1)) * 2 - 1;
      const cw = 1 - Math.abs(kk); // 1 in the middle, 0 at the outer edge
      const fade = Math.pow(Math.max(0, 1 - y / (j.len * (0.75 + 0.3 * cw))), 0.8);
      const base = kk * 0.92 * rx * (1 - 0.1 * Math.min(1, y));
      // outer strands splay outward in long arcs, like the reference
      const tx = base + kk * 0.3 * y * Math.min(1, y) + Math.sin(y * 4.2 - p * 0.7 + k * 0.9) * (0.05 + 0.16 * y) + Math.sin(t * 0.3 + j.phase) * 0.13 * y * y;
      const d = x - tx;
      const reach = 0.05 + 0.04 * cw;
      if (d > -reach && d < reach && rnd > 0.14 + 0.5 * (1 - fade) - 0.2 * cw) {
        b = Math.max(b, fade * (0.1 + 0.1 * rnd + 0.45 * cw * cw * (0.4 + 0.6 * rnd)));
      }
    }
  }
  return Math.min(1, b);
}

export default function FooterJelly() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%";
    el.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0, H = 0, raf = 0, last = 0, visible = false;
    let pals: string[][] = [], lights: string[][] = [];
    let dark = "#000", line = "rgba(255,255,255,.05)", dustCol = "rgb(255,255,255)", glow: [number, number, number][] = [];
    let dustCells: { i: number; j: number; r: number }[] = [];
    const cell = () => (W < 640 ? 8 : 11); // square cells; a little smaller on phones

    const paint = () => {
      const css = getComputedStyle(document.documentElement);
      const base = [
        hex(css.getPropertyValue("--accent"), "#ff7a1a"),
        hex(css.getPropertyValue("--gold"), "#ffc233"),
        hex(css.getPropertyValue("--fg"), "#f1ecdc"),
      ];
      const bg = hex(css.getPropertyValue("--bg"), "#0b0b0a");
      dark = `rgb(${bg.join(",")})`;
      line = `rgba(${base[2].join(",")},0.05)`;
      dustCol = `rgb(${base[0].join(",")})`;
      glow = base;
      const cream = [255, 244, 220];
      const mix = (a: number[], b: number[], f: number) => `rgb(${[0, 1, 2].map((i) => Math.round(a[i] + (b[i] - a[i]) * f)).join(",")})`;
      pals = JELLIES.map((j) => Array.from({ length: NC }, (_, s) => mix(base[j.pal[0]], base[j.pal[1]], s / (NC - 1))));
      lights = JELLIES.map((j) =>
        Array.from({ length: NC }, (_, s) => {
          const a = base[j.pal[0]], c = base[j.pal[1]], f = s / (NC - 1);
          const m = [0, 1, 2].map((i) => a[i] + (c[i] - a[i]) * f);
          return mix(m, cream, 0.55);
        }),
      );
    };
    paint();

    // background: a fine grid, plus isolated faint tiles that flicker
    const layoutDust = () => {
      const cs = cell();
      dustCells = [];
      for (let j = 0; j < Math.ceil(H / cs); j++)
        for (let i = 0; i < Math.ceil(W / cs); i++) {
          const v = h3(i, j, 7);
          if (v < 0.018) dustCells.push({ i, j, r: h3(i, j, 9) });
        }
    };

    const watch = new MutationObserver(() => {
      paint();
      if (reduce) draw(4);
    });
    watch.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      W = el.clientWidth;
      H = el.clientHeight;
      canvas.width = Math.max(1, Math.round(W * dpr));
      canvas.height = Math.max(1, Math.round(H * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      layoutDust();
      if (reduce) draw(4);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    // pointer: the big jellyfish leans a little toward the cursor
    const cur = { x: 0 }, target = { x: 0 };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      target.x = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - 0.5) * 2));
    };
    addEventListener("pointermove", onMove);

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);

    const family = getComputedStyle(el).fontFamily;
    // buckets per tier (0 dim, 1 mid, 2 bright) and colour step: flat [x, y, glyph code, ...]
    const mk = () => Array.from({ length: 3 * NC }, () => [] as number[]);
    const bk = mk();

    function draw(t: number) {
      if (!W || !H) return;
      const c = ctx!;
      const CS = cell();
      c.clearRect(0, 0, W, H);
      c.font = `600 ${CS - 2}px ${family}`;
      c.textAlign = "center";
      c.textBaseline = "middle";
      cur.x += (target.x - cur.x) * 0.05;

      // fine background grid
      c.globalAlpha = 1;
      c.strokeStyle = line;
      c.lineWidth = 1;
      c.beginPath();
      for (let x = 0; x <= W; x += CS) { c.moveTo(x + 0.5, 0); c.lineTo(x + 0.5, H); }
      for (let y = 0; y <= H; y += CS) { c.moveTo(0, y + 0.5); c.lineTo(W, y + 0.5); }
      c.stroke();

      // isolated flickering tiles
      c.fillStyle = dustCol;
      for (const d of dustCells) {
        const a = 0.5 + 0.5 * Math.sin(t * (0.5 + d.r) + d.r * 40);
        c.globalAlpha = 0.04 + 0.1 * a;
        c.fillRect(d.i * CS + 0.5, d.j * CS + 0.5, CS - 1, CS - 1);
        c.globalAlpha = 0.1 + 0.25 * a;
        c.fillText(DIM[Math.floor(d.r * DIM.length)], d.i * CS + CS / 2, d.j * CS + CS / 2);
      }

      const phone = W < 640;
      const unit = Math.min(H, W * 0.9); // sizes follow the narrower side, so phones get smaller jellyfish
      JELLIES.forEach((j, ji) => {
        const pos = phone ? PHONE_POS[ji] : j;
        const S = unit * j.s;
        const p = reduce ? 1 : t * j.speed + j.phase;
        const w = Math.sin(p) + 0.3 * Math.sin(2 * p); // fast squeeze, slow relax
        const rx = 1 - 0.13 * w, ry = 0.62 + 0.18 * w;
        const th = j.tilt + Math.sin(t * 0.2 + j.phase) * 0.1 + (ji === 3 ? cur.x * 0.1 : 0);
        const cos = Math.cos(th), sin = Math.sin(th);
        // swim: surge along the heading on each squeeze, then drift
        const surge = S * 0.16 * w;
        const cx = W * (pos.fx + 0.035 * Math.sin(t * 0.1 + j.phase)) + (ji === 3 ? cur.x * W * 0.05 : 0) + sin * surge;
        const cy = H * pos.fy - cos * surge + Math.sin(t * 0.25 + j.phase) * S * 0.12;

        // soft glow behind the bell
        const gcol = glow[j.pal[0]];
        const g = c.createRadialGradient(cx, cy - S * 0.2, 0, cx, cy - S * 0.2, S * 1.7);
        g.addColorStop(0, `rgba(${gcol.join(",")},${0.1 * j.depth})`);
        g.addColorStop(1, `rgba(${gcol.join(",")},0)`);
        c.globalAlpha = 1;
        c.fillStyle = g;
        c.fillRect(cx - S * 1.8, cy - S * 1.9, S * 3.6, S * 3.8);

        // bounding box of the model, rotated
        let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
        for (const [lx, ly] of [[-1.9, -0.8], [1.9, -0.8], [-1.9, j.len], [1.9, j.len]]) {
          const sx = cx + (cos * lx - sin * ly) * S, sy = cy + (sin * lx + cos * ly) * S;
          x0 = Math.min(x0, sx); x1 = Math.max(x1, sx); y0 = Math.min(y0, sy); y1 = Math.max(y1, sy);
        }
        const i0 = Math.max(0, Math.floor(x0 / CS)), i1 = Math.min(Math.ceil(W / CS), Math.ceil(x1 / CS));
        const j0 = Math.max(0, Math.floor(y0 / CS)), j1 = Math.min(Math.ceil(H / CS), Math.ceil(y1 / CS));

        bk.forEach((b) => (b.length = 0));
        for (let jj = j0; jj < j1; jj++) {
          const py = jj * CS + CS / 2;
          for (let ii = i0; ii < i1; ii++) {
            const px = ii * CS + CS / 2;
            const dx = px - cx, dy = py - cy;
            const x = (cos * dx + sin * dy) / S, y = (-sin * dx + cos * dy) / S;
            const roll = Math.floor(t * 1.5 + h3(ii, jj, 1) * 4);
            const rnd = h3(ii, jj, 200 + roll);
            const pick = h3(ii, jj, 300 + roll);
            let b = field(j, x, y, p, t, rx, ry, rnd);
            if (b < 0.1) {
              if (h3(ii, jj, 400) > 0.992 && x * x + y * y < 6) b = 0.12; // stray tile
              else continue;
            }
            const ci = Math.max(0, Math.min(NC - 1, Math.floor((0.55 - y * 0.3 + b * 0.35) * NC)));
            const tier = b >= 0.62 ? 2 : b >= 0.3 ? 1 : 0;
            const set = tier === 2 ? BRIGHT : tier === 1 ? MID : DIM;
            bk[tier * NC + ci].push(px, py, set.charCodeAt(Math.floor(pick * set.length)));
          }
        }

        const pal = pals[ji], light = lights[ji];
        // tiles first, then glyphs on top
        for (let tier = 0; tier < 3; tier++)
          for (let ci = 0; ci < NC; ci++) {
            const b = bk[tier * NC + ci];
            if (!b.length) continue;
            c.globalAlpha = [0.15, 0.4, 0.92][tier] * j.depth;
            c.fillStyle = tier === 2 ? light[ci] : pal[ci];
            for (let n = 0; n < b.length; n += 3) c.fillRect(b[n] - CS / 2 + 0.5, b[n + 1] - CS / 2 + 0.5, CS - 1, CS - 1);
          }
        for (let tier = 0; tier < 3; tier++)
          for (let ci = 0; ci < NC; ci++) {
            const b = bk[tier * NC + ci];
            if (!b.length) continue;
            c.globalAlpha = [0.6, 0.95, 0.9][tier] * (tier === 2 ? 0.5 + 0.5 * j.depth : j.depth);
            c.fillStyle = tier === 2 ? dark : tier === 1 ? light[ci] : pal[ci];
            for (let n = 0; n < b.length; n += 3) c.fillText(String.fromCharCode(b[n + 2]), b[n], b[n + 1]);
          }
      });
      c.globalAlpha = 1;
    }

    const t0 = performance.now();
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible || document.hidden || now - last < (W < 640 ? 55 : 40)) return; // about 25 fps, 18 on phones
      last = now;
      draw((now - t0) / 1000);
    };
    resize();
    if (reduce) draw(4);
    else raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", onMove);
      ro.disconnect();
      io.disconnect();
      watch.disconnect();
      canvas.remove();
    };
  }, []);

  return <div ref={host} aria-hidden className="mono pointer-events-none absolute inset-0" />;
}
