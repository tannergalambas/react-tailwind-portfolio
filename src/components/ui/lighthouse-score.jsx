export default function LighthouseScore({ score = 100, color = "#22c55e", size = 96, thickness = 6, track = "#334155", delay = 0 }) {
  const pct = Math.max(0, Math.min(100, score));
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  const dash = (pct / 100) * c;

  return (
    <svg width={size} height={size} style={{ animationDelay: `${delay}ms` }} aria-hidden>
      {/* track */}
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={thickness} />
      {/* progress arc */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={thickness}
        strokeLinecap="round"
        strokeDasharray={`${dash} ${c - dash}`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  );
}
