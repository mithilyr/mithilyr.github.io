// Infinite horizontal ticker. Content is duplicated so the loop is seamless.
export default function Marquee({ items }: { items: string[] }) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={hidden}>
      {items.map((t) => (
        <li key={t} className="whitespace-nowrap text-sm uppercase tracking-widest">
          {t} <span className="text-accent">★</span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee-wrap overflow-hidden border-y border-line py-4">
      <div className="marquee flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
