import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

function longestCommonPrefix(a = "", b = "") {
  const len = Math.min(a.length, b.length);
  let i = 0;
  while (i < len && a[i] === b[i]) i++;
  return i;
}

export default function Typewriter({
  items = [],
  typeSpeed = 55, // ms per char
  backSpeed = 30, // ms per char delete
  backDelay = 1100, // ms pause before delete
  loop = true,
  className = "",
  minCh = 28,
}) {
  const shouldReduce = useReducedMotion();
  const safeItems = items.filter(Boolean);
  const staticText = useMemo(() => safeItems.join(", "), [safeItems]);

  // Reduced-motion: render static list for all users (and SEO)
  if (shouldReduce || safeItems.length === 0) {
    return (
      <span className={className} style={{ minWidth: `${minCh}ch` }}>
        {staticText}
      </span>
    );
  }

  // Animated typewriter for non-reduced motion
  const [index, setIndex] = useState(0); // which item we're on
  const [text, setText] = useState(""); // currently displayed slice
  const [phase, setPhase] = useState("typing"); // typing | pausing | deleting
  const pauseUntilRef = useRef(0);

  useEffect(() => {
    if (safeItems.length === 0) return;

    const current = safeItems[index % safeItems.length];
    const next = safeItems[(index + 1) % safeItems.length];

    let timeoutId;

    const now = Date.now();
    if (phase === "pausing") {
      if (now >= pauseUntilRef.current) {
        setPhase("deleting");
      } else {
        timeoutId = setTimeout(() => setPhase("deleting"), pauseUntilRef.current - now);
      }
      return () => clearTimeout(timeoutId);
    }

    if (phase === "typing") {
      if (text === current) {
        setPhase("pausing");
        pauseUntilRef.current = now + backDelay;
        return;
      }
      timeoutId = setTimeout(() => {
        setText(current.slice(0, text.length + 1));
      }, typeSpeed);
      return () => clearTimeout(timeoutId);
    }

    if (phase === "deleting") {
      const keep = longestCommonPrefix(current, next);
      if (text.length <= keep) {
        setPhase("typing");
        setIndex((i) => (i + 1) % safeItems.length);
        return;
      }
      timeoutId = setTimeout(() => {
        setText(text.slice(0, -1));
      }, backSpeed);
      return () => clearTimeout(timeoutId);
    }
  }, [text, index, phase, safeItems, typeSpeed, backSpeed, backDelay]);

  return (
    <span className={className} style={{ minWidth: `${minCh}ch` }}>
      {/* Screen reader friendly static content; hide the animation from SR */}
      <span className="sr-only">{staticText}</span>
      <span aria-hidden="true" className="whitespace-nowrap">
        {text}
        <span
          className="ml-1 inline-block h-[1em] w-[1px] align-[-0.1em] bg-current cursor-blink"
          aria-hidden="true"
        />
      </span>
    </span>
  );
}

