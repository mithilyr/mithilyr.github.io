// Infinite horizontal ticker. Content is duplicated so the loop is seamless.
// Each item is "word + square", and the square has equal space on both sides.
const seps = ["var(--accent)", "var(--gold)"];

export default function Marquee({ items }: { items: string[] }) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden}>
      {items.map((t, i) => (
        <li key={t} className="flex items-center">
          <span className={`tick ${i % 3 === 1 ? "tick-out" : ""}`}>{t}</span>
          <span className="tick-sep" style={{ background: seps[i % seps.length] }} />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee-wrap overflow-hidden border-y-2 border-line py-6">
      <div className="marquee flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
