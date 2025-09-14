import { motion } from "framer-motion";
import { Rocket, Accessibility, Smartphone } from "lucide-react";

function ScoreRing({ score = 100, label = "", color = "#22c55e" }) {
  const pct = Math.max(0, Math.min(100, score));
  const size = 80;
  const stroke = 8;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = (pct / 100) * circumference;

  return (
    <div className="flex flex-col items-center text-center">
      <svg width={size} height={size} className="mb-2">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#1f2937"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference - dash}`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="fill-white font-semibold"
        >
          {pct}
        </text>
      </svg>
      <div className="text-sm font-semibold text-slate-100">{label}</div>
    </div>
  );
}

export default function PerfAccessibility() {
  return (
    <section className="py-10 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold mb-2 text-gradient"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Performance & Accessibility
        </motion.h2>
        <motion.p
          className="text-slate-300 max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Committed to building fast, accessible, and optimized web experiences.
        </motion.p>

        {/* Score rings */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-8 justify-items-center mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <ScoreRing score={98} label="Performance" color="#22c55e" />
          <ScoreRing score={100} label="Accessibility" color="#22c55e" />
          <ScoreRing score={100} label="Best Practices" color="#22c55e" />
          <ScoreRing score={98} label="SEO" color="#22c55e" />
        </motion.div>

        {/* Feature blurbs */}
        <div className="grid sm:grid-cols-3 gap-8 text-left">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 mb-3">
              <Rocket className="h-5 w-5 text-white" />
            </div>
            <div className="font-semibold text-slate-100 mb-1">Fast Loading</div>
            <p className="text-sm text-slate-300">Optimized assets, code‑splitting, and lazy loading for quick page loads.</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 mb-3">
              <Accessibility className="h-5 w-5 text-white" />
            </div>
            <div className="font-semibold text-slate-100 mb-1">Accessible Design</div>
            <p className="text-sm text-slate-300">Semantic HTML, ARIA labels, keyboard navigation, and reduced‑motion support.</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-pink-500 to-orange-500 mb-3">
              <Smartphone className="h-5 w-5 text-white" />
            </div>
            <div className="font-semibold text-slate-100 mb-1">Responsive</div>
            <p className="text-sm text-slate-300">Mobile‑first layouts that look great on any screen size.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

