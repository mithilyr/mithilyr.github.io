// One hand-drawn diagram per project, so each card and case-study page has its own picture.
// All shapes use the project's domain colour (--dc), so they follow the theme.
// Drawn on a 600 x 200 canvas; keep the left ~150 units clear on the cards (the number sits there).

const C = { w: 600, h: 200 };

// Small deterministic random generator: same output on server and client, no hydration mismatch.
function rng(seed: number) {
  let s = seed;
  return () => (s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
}

function Solar() {
  const cols = Array.from({ length: 8 }, (_, i) => i);
  const rows = [0, 1, 2];
  return (
    <>
      <rect className="a-fg" x="300" y="38" width="288" height="132" />
      {rows.map((j) =>
        cols.map((i) => (
          <rect key={`${j}-${i}`} className="a-dim" x={308 + i * 34} y={46 + j * 40} width="28" height="30" />
        )),
      )}
      {/* one string per row, wired into the inverter */}
      {[61, 101, 141].map((y, j) => (
        <polyline key={y} className="a-line a-dash" points={`${574},${y} 308,${y} 285,${y} 285,104 268,104`} style={{ animationDelay: `${j * 0.3}s` }} />
      ))}
      <rect className="a-solid" x="232" y="86" width="36" height="36" />
      <text className="a-txt a-txt-inv" x="250" y="108" textAnchor="middle">INV</text>
    </>
  );
}

function Laya() {
  return (
    <g transform="translate(0 -10)">
      <line className="a-fg" x1="300" y1="168" x2="590" y2="168" />
      {/* macro-F1: Sinhala 0.46 vs English 0.72 */}
      <rect className="a-solid" x="318" y={168 - 0.46 * 120} width="56" height={0.46 * 120} />
      <rect className="a-fg" x="398" y={168 - 0.72 * 120} width="56" height={0.72 * 120} />
      <text className="a-txt" x="346" y={168 - 0.46 * 120 - 8} textAnchor="middle">0.46</text>
      <text className="a-txt" x="426" y={168 - 0.72 * 120 - 8} textAnchor="middle">0.72</text>
      <text className="a-txt a-dimtxt" x="346" y="186" textAnchor="middle">SI</text>
      <text className="a-txt a-dimtxt" x="426" y="186" textAnchor="middle">EN</text>
      {/* calibration: confidence vs accuracy, the curve sits below the diagonal (over-confident) */}
      <rect className="a-fg" x="496" y="46" width="88" height="88" />
      <line className="a-fg a-dash" x1="496" y1="134" x2="584" y2="46" />
      <polyline className="a-line" points="496,134 518,126 540,110 562,88 584,46" />
      <text className="a-txt a-dimtxt" x="540" y="154" textAnchor="middle">confidence</text>
    </g>
  );
}

function Delivery() {
  const route = "M262,112 L330,58 L400,132 L470,72 L540,126 L588,70";
  return (
    <>
      <polyline className="a-fg" points="262,112 330,58 400,132 470,72" />
      <polyline className="a-line a-dash" points="470,72 540,126 588,70" />
      <rect className="a-solid" x="250" y="100" width="24" height="24" />
      {[[330, 58], [400, 132], [470, 72], [540, 126], [588, 70]].map(([x, y]) => (
        <rect key={`${x}-${y}`} className="a-dim" x={x - 6} y={y - 6} width="12" height="12" />
      ))}
      <rect className="a-solid a-truck" x="-6" y="-6" width="12" height="12" style={{ offsetPath: `path("${route}")` }} />
      <text className="a-txt a-dimtxt" x="262" y="146" textAnchor="middle">DEPOT</text>
    </>
  );
}

function Datathon() {
  const h = [48, 56, 52, 64, 70, 66, 78, 74, 84, 80, 90, 86, 98, 94];
  const x0 = 262, pitch = 23, w = 15, base = 170, split = 10;
  const top = (i: number) => base - h[i];
  const line = h.map((_, i) => `${x0 + i * pitch + w / 2},${top(i)}`).join(" ");
  return (
    <>
      <line className="a-fg" x1="250" y1={base} x2="590" y2={base} />
      {h.map((v, i) => (
        <rect key={i} className={i < split ? "a-dim" : "a-hatch"} x={x0 + i * pitch} y={base - v} width={w} height={v} />
      ))}
      {/* forecast band over the last four weeks */}
      <polygon
        className="a-band"
        points={`${x0 + split * pitch + w / 2},${top(split) - 10} ${x0 + 13 * pitch + w / 2},${top(13) - 22} ${x0 + 13 * pitch + w / 2},${top(13) + 14} ${x0 + split * pitch + w / 2},${top(split) + 6}`}
      />
      <polyline className="a-line" points={line} />
      <line className="a-fg a-dash-slow" x1={x0 + split * pitch - 4} y1="34" x2={x0 + split * pitch - 4} y2={base} />
    </>
  );
}

const qrCells = (() => {
  const r = rng(11);
  const out: string[] = [];
  for (let y = 0; y < 21; y++)
    for (let x = 0; x < 21; x++) {
      const finder = (x < 8 && y < 8) || (x > 12 && y < 8) || (x < 8 && y > 12);
      if (!finder && r() > 0.5) out.push(`M${x * 6},${y * 6}h6v6h-6z`);
    }
  return out.join("");
})();

function Finder({ x, y }: { x: number; y: number }) {
  return (
    <>
      <rect className="a-line a-thick" x={x + 3} y={y + 3} width="36" height="36" />
      <rect className="a-solid" x={x + 12} y={y + 12} width="18" height="18" />
    </>
  );
}

function Scan() {
  const ox = 430, oy = 38;
  return (
    <>
      {[[90, 0], [70, 0], [100, 1]].map(([len, late], j) => (
        <g key={j}>
          <rect className={late ? "a-fg" : "a-solid"} x="250" y={58 + j * 40} width="14" height="14" />
          <rect className="a-dim" x="274" y={61 + j * 40} width={len} height="8" />
          <rect className="a-fg" x={274 + len + 8} y={61 + j * 40} width="26" height="8" />
        </g>
      ))}
      <g transform={`translate(${ox} ${oy})`}>
        <path className="a-ink" d={qrCells} opacity=".85" />
        <Finder x={0} y={0} />
        <Finder x={84} y={0} />
        <Finder x={0} y={84} />
      </g>
      <rect className="a-solid a-scan" x={ox - 8} y={oy - 2} width="142" height="3" />
    </>
  );
}

function Sponsor() {
  const steps = ["DRAFT", "REVIEW", "APPROVE", "SEND"];
  const r = rng(5);
  return (
    <>
      {steps.map((s, i) => {
        const x = 250 + i * 90;
        const gate = i === 2;
        return (
          <g key={s}>
            <rect className={gate ? "a-solid" : "a-dim"} x={x} y="62" width="62" height="56" />
            <text className={`a-txt ${gate ? "a-txt-inv" : ""}`} x={x + 31} y="94" textAnchor="middle">{s}</text>
            {i < 3 && <polyline className="a-fg" points={`${x + 62},90 ${x + 90},90 ${x + 84},85 ${x + 90},90 ${x + 84},95`} />}
          </g>
        );
      })}
      <text className="a-txt a-dimtxt" x={250 + 2 * 90 + 31} y="52" textAnchor="middle">a person</text>
      {Array.from({ length: 17 }, (_, i) => (
        <rect key={i} className={r() > 0.7 ? "a-solid" : "a-dim-flat"} x={250 + i * 20} y="146" width="12" height="12" />
      ))}
    </>
  );
}

// Fault map of a panel (flagged cells) next to "why": a ranked feature-importance chart.
function Xai() {
  const flagged = new Set(["2-1", "3-1", "4-2"]);
  return (
    <>
      <rect className="a-fg" x="244" y="44" width="152" height="112" />
      {[0, 1, 2, 3].map((j) =>
        [0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={`${j}-${i}`} className={flagged.has(`${i}-${j}`) ? "a-solid" : "a-dim"} x={252 + i * 24} y={52 + j * 26} width="20" height="22" />
        )),
      )}
      <polyline className="a-line a-dash" points="372,76 410,76 410,65 430,65" />
      {[130, 98, 66, 40].map((w, i) => (
        <rect key={w} className={i === 0 ? "a-solid" : "a-dim"} x="430" y={58 + i * 28} width={w} height="14" />
      ))}
      <text className="a-txt a-dimtxt" x="430" y="174">why it was flagged</text>
    </>
  );
}

// Graph retrieval first (linked nodes), vector search as the fallback (scattered points).
function GraphRag() {
  const g: [number, number][] = [[330, 56], [372, 104], [330, 150], [420, 64], [436, 134]];
  const edges = [[0, 1], [1, 2], [0, 3], [1, 4], [3, 4]];
  const r = rng(23);
  const pts = Array.from({ length: 18 }, () => [484 + r() * 96, 46 + r() * 112]);
  return (
    <>
      {g.slice(0, 3).map(([x, y]) => (
        <line key={`q${y}`} className="a-fg" x1="260" y1="100" x2={x} y2={y} />
      ))}
      {edges.map(([a, b]) => (
        <line key={`${a}${b}`} className="a-fg" x1={g[a][0]} y1={g[a][1]} x2={g[b][0]} y2={g[b][1]} />
      ))}
      <polyline className="a-line" points="260,100 372,104 436,134" />
      <rect className="a-solid" x="250" y="90" width="20" height="20" />
      {g.map(([x, y]) => (
        <rect key={`${x}${y}`} className="a-dim" x={x - 6} y={y - 6} width="12" height="12" />
      ))}
      {pts.map(([x, y], i) => (
        <rect key={i} className="a-dim-flat" x={x} y={y} width="6" height="6" />
      ))}
      <rect className="a-fg" x="522" y="90" width="22" height="22" />
      <rect className="a-solid" x="530" y="98" width="6" height="6" />
      <polyline className="a-line a-dash" points="436,134 480,134 480,101 522,101" />
      <text className="a-txt a-dimtxt" x="372" y="178" textAnchor="middle">graph first</text>
      <text className="a-txt a-dimtxt" x="532" y="178" textAnchor="middle">vector fallback</text>
    </>
  );
}

// NFC reader with waves reaching a card, and a ticking attendance list.
function Checkpoint() {
  const cx = 288, cy = 100;
  const arc = (r: number) => {
    const a = (40 * Math.PI) / 180;
    return `M${cx + r * Math.cos(-a)},${cy + r * Math.sin(-a)} A${r},${r} 0 0 1 ${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  };
  return (
    <>
      <rect className="a-solid" x="250" y="74" width="30" height="52" />
      {[22, 40, 58].map((r, i) => (
        <path key={r} className="a-line a-dash" d={arc(r)} style={{ animationDelay: `${i * 0.25}s` }} />
      ))}
      <rect className="a-dim" x="352" y="86" width="44" height="28" />
      <rect className="a-solid" x="358" y="92" width="10" height="8" />
      {[90, 66, 104, 56].map((w, i) => (
        <g key={i}>
          <rect className={i === 3 ? "a-fg" : "a-solid"} x="436" y={50 + i * 30} width="14" height="14" />
          <rect className="a-dim" x="460" y={53 + i * 30} width={w} height="8" />
        </g>
      ))}
    </>
  );
}

// An ember (flame) inside a wall of tiles, plus a QR tile: the build-your-idea flow reached by QR.
function Ember() {
  return (
    <>
      <rect className="a-fg" x="250" y="46" width="100" height="112" />
      <polygon className="a-solid" points="300,150 276,132 282,110 294,120 292,92 308,66 312,96 328,108 326,132" />
      <polygon className="a-ink" points="300,150 290,138 297,126 304,134 308,122 314,138" opacity=".85" />
      <rect className="a-dim" x="360" y="46" width="100" height="50" />
      <rect className="a-fg" x="470" y="46" width="110" height="50" />
      <rect className="a-dim" x="360" y="108" width="160" height="50" />
      <rect className="a-fg" x="528" y="108" width="52" height="50" />
      {[[534, 114], [562, 114], [534, 140]].map(([x, y]) => (
        <rect key={`${x}${y}`} className="a-solid" x={x} y={y} width="12" height="12" />
      ))}
      {[[554, 128], [564, 138], [570, 148], [552, 148]].map(([x, y]) => (
        <rect key={`${x}${y}`} className="a-ink" x={x} y={y} width="6" height="6" />
      ))}
    </>
  );
}

const art: Record<string, () => React.JSX.Element> = {
  "xai-research": Xai,
  "graph-rag": GraphRag,
  checkpoint: Checkpoint,
  ember: Ember,
  "solar-pv-designer": Solar,
  "laya-lk-bench": Laya,
  "waypoint-delivery": Delivery,
  "waypoint-datathon": Datathon,
  "cv-boost-route": Scan,
  "ieee-sponsorship-companion": Sponsor,
};

export default function ProjectArt({ slug, fit = "slice" }: { slug: string; fit?: "slice" | "meet" }) {
  const Art = art[slug];
  if (!Art) return null;
  return (
    <svg
      className="art"
      // cards crop to the drawing's right side; the page header frames just the drawing itself
      viewBox={fit === "slice" ? `0 0 ${C.w} ${C.h}` : "236 28 360 160"}
      preserveAspectRatio={fit === "slice" ? "xMaxYMid slice" : "xMidYMid meet"}
      aria-hidden
    >
      <Art />
    </svg>
  );
}
