"use client";
import { useEffect, useState } from "react";

// Types a word, holds, deletes, moves to the next. Static text if reduced motion.
export default function Typing({ words }: { words: string[] }) {
  const [text, setText] = useState(words[0]);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let w = 0, i = 0, del = false;
    let t: ReturnType<typeof setTimeout>;
    const tick = () => {
      const word = words[w];
      i += del ? -1 : 1;
      setText(word.slice(0, i));
      let wait = del ? 35 : 70;
      if (!del && i === word.length) { del = true; wait = 1400; }
      else if (del && i === 0) { del = false; w = (w + 1) % words.length; wait = 300; }
      t = setTimeout(tick, wait);
    };
    t = setTimeout(tick, 1400);
    return () => clearTimeout(t);
  }, [words]);
  return (
    <span aria-label={words[0]}>
      {text}
      <span className="caret" aria-hidden />
    </span>
  );
}
