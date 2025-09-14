export default function LighthouseScore({ score = 100, color = "#22c55e", size = 96, thickness = 10, delay = 0 }) {
  const pct = Math.max(0, Math.min(100, score));
  const angle = (pct / 100) * 360;
  const ringColor = color;
  const bgTrack = "#334155"; // slate-700

  const style = {
    width: size,
    height: size,
    background: `conic-gradient(${ringColor} ${angle}deg, ${bgTrack} 0)` ,
    WebkitMask: `radial-gradient(farthest-side, transparent calc(50% - ${thickness}px), #000 calc(50% - ${thickness - 1}px))`,
    mask: `radial-gradient(farthest-side, transparent calc(50% - ${thickness}px), #000 calc(50% - ${thickness - 1}px))`,
    animationDelay: `${delay}ms`,
  };

  return <div aria-hidden className="rounded-full" style={style} />;
}

