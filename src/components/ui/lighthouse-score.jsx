export default function LighthouseScore({ score = 100, color = "#22c55e", size = 96, thickness = 6, track = "#1f2937", delay = 0, duration = 900, marker = true }) {
  const pct = Math.max(0, Math.min(100, score));
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  const dash = (pct / 100) * c;
  const targetOffset = c - dash; // animate from full offset (0%) to this
  const center = size / 2;
  const angle = (pct / 100) * 2 * Math.PI - Math.PI / 2; // start at top
  const endX = center + r * Math.cos(angle);
  const endY = center + r * Math.sin(angle);

  return (
    <svg width={size} height={size} aria-hidden>
      {/* track */}
      <circle cx={center} cy={center} r={r} fill="none" stroke={track} strokeWidth={thickness} />
      {/* progress arc */}
      <circle
        cx={center}
        cy={center}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={thickness}
        strokeLinecap="round"
        strokeDasharray={`${c}`}
        strokeDashoffset={`${c}`}
        transform={`rotate(-90 ${center} ${center})`}
        className="ring-anim"
        style={{
          '--target': targetOffset,
          animationDelay: `${delay}ms`,
          animationDuration: `${duration}ms`,
        }}
      />
      {marker && pct < 100 && (
        <circle cx={endX} cy={endY} r={Math.max(2, thickness/2)} fill="#0ea5e9" stroke={color} strokeWidth="1" />
      )}
    </svg>
  );
}
