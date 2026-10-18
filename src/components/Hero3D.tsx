"use client";
import { useEffect, useRef } from "react";
import type * as T from "three";
import type { feature } from "topojson-client";

// Rough [lat, lon] for one city per country. Sri Lanka is the hub (index 0).
const SRI_LANKA: [number, number] = [7.87, 80.77];
const PLACES: [number, number][] = [
  SRI_LANKA,
  [28.6, 77.2], [51.5, -0.1], [40.7, -74], [37.8, -122.4], [-23.5, -46.6],
  [35.7, 139.7], [-33.9, 151.2], [-26.2, 28], [6.5, 3.4], [30, 31.2],
  [25.2, 55.3], [1.35, 103.8], [39.9, 116.4], [52.5, 13.4], [55.8, 37.6],
  [43.7, -79.4], [19.4, -99.1], [-34.6, -58.4], [-1.3, 36.8], [-6.2, 106.8],
  [37.6, 127], [41, 29],
  // more cities so every region of the globe has dots
  [64.1, -21.9], [59.9, 10.7], [40.4, -3.7], [41.9, 12.5], [52.2, 21], [50.4, 30.5],
  [35.7, 51.4], [24.7, 46.7], [24.9, 67], [23.8, 90.4], [27.7, 85.3], [13.8, 100.5],
  [21, 105.8], [14.6, 121], [25, 121.5], [-31.9, 115.9], [-36.8, 174.8], [21.3, -157.9],
  [61.2, -149.9], [-12, -77], [4.7, -74.1], [-33.4, -70.6], [10.5, -66.9], [23.1, -82.4],
  [5.6, -0.2], [14.7, -17.5], [9, 38.7], [33.6, -7.6], [-4.3, 15.3], [-8.8, 13.2],
  [-18.9, 47.5], [43.2, 76.9], [47.9, 106.9], [55, 82.9], [43.1, 131.9],
];
// A few long links across oceans so the network spans the whole globe.
const LONG_LINKS: [number, number][] = [[3, 2], [4, 6], [5, 9], [7, 12], [8, 5], [17, 3], [18, 8], [40, 4], [40, 6], [11, 2]];
const HUB_LINKS = [1, 2, 6, 7, 11, 12, 13, 19]; // places Sri Lanka connects to directly
const R = 2;

function toXYZ([lat, lon]: [number, number], r = R): [number, number, number] {
  const la = (lat * Math.PI) / 180, lo = (lon * Math.PI) / 180;
  return [r * Math.cos(la) * Math.sin(lo), r * Math.sin(la), r * Math.cos(la) * Math.cos(lo)];
}

// Soft round sprite so points render as dots, not squares.
function dotTexture(THREE: typeof T) {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const x = c.getContext("2d")!;
  const g = x.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.45, "rgba(255,255,255,1)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  x.fillStyle = g;
  x.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

type Topo = Parameters<typeof feature>[0];

// Paints the Natural Earth land shapes (110m, public domain) to a small canvas and
// returns a lookup: is this lat/lon on land?
async function landMask() {
  const [{ feature }, land] = await Promise.all([
    import("topojson-client"),
    import("world-atlas/land-110m.json"),
  ]);
  const topo = land.default as unknown as Topo;
  const geo = feature(topo, (topo as unknown as { objects: { land: never } }).objects.land) as unknown as {
    features?: { geometry: { type: string; coordinates: number[][][] | number[][][][] } }[];
    geometry?: { type: string; coordinates: number[][][] | number[][][][] };
  };
  const W = 1024, H = 512;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const x = c.getContext("2d", { willReadFrequently: true })!;
  x.fillStyle = "#000";
  const geoms = geo.features ? geo.features.map((f) => f.geometry) : [geo.geometry!];
  for (const g of geoms) {
    const polys = (g.type === "Polygon" ? [g.coordinates] : g.coordinates) as number[][][][];
    for (const poly of polys) {
      x.beginPath();
      for (const ring of poly) {
        ring.forEach(([lon, lat], i) => {
          const px = ((lon + 180) / 360) * W, py = ((90 - lat) / 180) * H;
          if (i) x.lineTo(px, py);
          else x.moveTo(px, py);
        });
        x.closePath();
      }
      x.fill("evenodd");
    }
  }
  const data = x.getImageData(0, 0, W, H).data;
  return (lat: number, lon: number) => {
    const px = Math.min(W - 1, Math.floor(((lon + 180) / 360) * W));
    const py = Math.min(H - 1, Math.floor(((90 - lat) / 180) * H));
    return data[(py * W + px) * 4 + 3] > 128;
  };
}

// Globe of dots, a bright Sri Lanka marker, and rough straight links between countries.
export default function Hero3D() {
  const host = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let stop = () => {};
    let cancelled = false;

    (async () => {
      const THREE = await import("three");
      if (cancelled) return;

      let renderer: T.WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      } catch {
        return; // no WebGL: the page still works without the globe
      }
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      el.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
      camera.position.z = 6.5;

      const map = dotTexture(THREE);
      const dot = (size: number, opacity: number) =>
        new THREE.PointsMaterial({ size, map, transparent: true, opacity, depthWrite: false });
      const mats = {
        base: dot(0.045, 0.7),
        place: dot(0.11, 0.9),
        hub: dot(0.2, 1),
        halo: dot(0.45, 0.4),
        link: new THREE.LineBasicMaterial({ transparent: true, opacity: 0.4 }),
      };

      const globe = new THREE.Group();
      const geos: T.BufferGeometry[] = [];
      const pointsOf = (arr: number[], m: T.PointsMaterial) => {
        const g = new THREE.BufferGeometry();
        g.setAttribute("position", new THREE.Float32BufferAttribute(arr, 3));
        geos.push(g);
        return new THREE.Points(g, m);
      };

      // land dots: sample an even spread of points and keep those that fall on land
      const mask = await landMask();
      if (cancelled) return;
      const n = 14000, base: number[] = [];
      for (let i = 0; i < n; i++) {
        const y = 1 - (i / (n - 1)) * 2, r = Math.sqrt(1 - y * y), a = i * 2.399963;
        const x = Math.cos(a) * r, z = Math.sin(a) * r;
        const lat = (Math.asin(y) * 180) / Math.PI, lon = (Math.atan2(x, z) * 180) / Math.PI;
        if (mask(lat, lon)) base.push(x * R, y * R, z * R);
      }
      globe.add(pointsOf(base, mats.base));

      // country dots, Sri Lanka drawn separately so it can be brighter
      const xyz = PLACES.map((p) => toXYZ(p));
      globe.add(pointsOf(xyz.slice(1).flat(), mats.place));
      globe.add(pointsOf(xyz[0], mats.hub));
      globe.add(pointsOf(xyz[0], mats.halo));

      // rough links: Sri Lanka to a few hubs, every other place to its two nearest
      const edges = new Set<string>();
      const add = (a: number, b: number) => edges.add(a < b ? `${a}-${b}` : `${b}-${a}`);
      HUB_LINKS.forEach((i) => add(0, i));
      LONG_LINKS.forEach(([a, b]) => add(a, b));
      const d2 = (a: number, b: number) =>
        xyz[a].reduce((s, v, k) => s + (v - xyz[b][k]) ** 2, 0);
      for (let a = 1; a < xyz.length; a++) {
        xyz.map((_, b) => b).filter((b) => b !== a).sort((p, q) => d2(a, p) - d2(a, q)).slice(0, 2).forEach((b) => add(a, b));
      }
      const seg: number[] = [];
      edges.forEach((e) => {
        const [a, b] = e.split("-").map(Number);
        seg.push(...xyz[a], ...xyz[b]);
      });
      const lg = new THREE.BufferGeometry();
      lg.setAttribute("position", new THREE.Float32BufferAttribute(seg, 3));
      geos.push(lg);
      globe.add(new THREE.LineSegments(lg, mats.link));
      scene.add(globe);

      const paint = () => {
        const css = getComputedStyle(document.documentElement);
        const accent = new THREE.Color(css.getPropertyValue("--accent").trim() || "#f97316");
        const fg = new THREE.Color(css.getPropertyValue("--fg").trim() || "#141414");
        mats.base.color.copy(fg).lerp(accent, 0.5);
        mats.place.color.copy(accent);
        mats.hub.color.copy(accent).lerp(new THREE.Color("#ffffff"), 0.35);
        mats.halo.color.copy(accent);
        mats.link.color.copy(accent);
      };
      paint();
      // repaint on theme toggle or when --accent is changed (inline style)
      const watch = new MutationObserver(paint);
      watch.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "style"] });

      const resize = () => {
        const { clientWidth: w, clientHeight: h } = el;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(el);

      const target = { x: 0, y: 0 };
      const onMove = (e: PointerEvent) => {
        target.x = (e.clientX / innerWidth - 0.5) * 2;
        target.y = (e.clientY / innerHeight - 0.5) * 2;
      };
      addEventListener("pointermove", onMove);

      let visible = true;
      const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
      io.observe(el);

      // Face Sri Lanka, then sway gently around it.
      const faceY = -(SRI_LANKA[1] * Math.PI) / 180;
      const faceX = (SRI_LANKA[0] * Math.PI) / 180;
      globe.rotation.set(faceX, faceY, 0);
      // "LK" tag: an HTML label that follows the hub and fades when it turns away
      const hubPos = new THREE.Vector3(...xyz[0]);
      const tmp = new THREE.Vector3();
      const placeLabel = () => {
        const l = label.current;
        if (!l) return;
        globe.updateMatrixWorld();
        tmp.copy(hubPos).applyMatrix4(globe.matrixWorld);
        const front = tmp.z / R; // 1 = facing camera, <0 = hidden behind
        tmp.project(camera);
        l.style.transform = `translate(${((tmp.x + 1) / 2) * el.clientWidth}px, ${((1 - tmp.y) / 2) * el.clientHeight + 16}px) translateX(-50%)`;
        l.style.opacity = String(Math.max(0, Math.min(1, (front - 0.1) * 3)));
      };
      placeLabel();
      let raf = 0;
      const t0 = performance.now();
      const frame = () => {
        raf = requestAnimationFrame(frame);
        if (!visible || document.hidden) return;
        const t = (performance.now() - t0) / 1000;
        const pulse = (Math.sin(t * 2.2) + 1) / 2;
        mats.halo.size = 0.3 + pulse * 0.3;
        placeLabel();
        mats.halo.opacity = 0.5 - pulse * 0.35;
        globe.rotation.y += (faceY + Math.sin(t * 0.25) * 0.7 + target.x * 0.5 - globe.rotation.y) * 0.04;
        globe.rotation.x += (faceX + target.y * 0.3 + scrollY * 0.0015 - globe.rotation.x) * 0.04;
        renderer.render(scene, camera);
      };
      if (reduce) renderer.render(scene, camera);
      else frame();

      stop = () => {
        cancelAnimationFrame(raf);
        removeEventListener("pointermove", onMove);
        ro.disconnect();
        io.disconnect();
        watch.disconnect();
        geos.forEach((g) => g.dispose());
        Object.values(mats).forEach((m) => m.dispose());
        map.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => {
      cancelled = true;
      stop();
    };
  }, []);

  return (
    <div
      ref={host}
      aria-hidden
      className="pointer-events-none absolute -z-10 inset-y-0 right-0 w-full opacity-40 sm:w-3/5 sm:opacity-100"
    >
      <span
        ref={label}
        className="absolute left-0 top-0 text-xs font-bold tracking-widest text-accent opacity-0"
      >
        LK
      </span>
    </div>
  );
}
