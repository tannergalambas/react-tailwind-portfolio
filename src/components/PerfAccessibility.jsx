import { motion } from "framer-motion";
import { Rocket, Accessibility, Smartphone } from "lucide-react";
import LighthouseScore from "@/components/ui/lighthouse-score.jsx";
import {
  DEFAULT_LIGHTHOUSE_SCORES,
  useLighthouseScores,
} from "@/hooks/useLighthouseScores.js";

export default function PerfAccessibility() {
  const {
    scores,
    isLoading,
    usedFallback,
    error,
    lastFetchedAt,
  } = useLighthouseScores({ fallback: DEFAULT_LIGHTHOUSE_SCORES });

  const metrics = scores ?? DEFAULT_LIGHTHOUSE_SCORES;

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
          {metrics.map((metric, index) => (
            <div key={metric.label} className="flex flex-col items-center text-center">
              <div className="relative w-24 h-24 mb-2">
                <LighthouseScore
                  score={metric.score}
                  color="#22c55e"
                  size={96}
                  thickness={6}
                  delay={index * 150}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-semibold text-white">
                    {metric.score}
                  </span>
                </div>
              </div>
              <div className="text-sm font-semibold text-slate-100">
                {metric.label}
              </div>
            </div>
          ))}
        </motion.div>

        {isLoading && (
          <p className="text-xs text-slate-500 mb-4">
            Fetching the latest Lighthouse report…
          </p>
        )}

        {usedFallback && !isLoading && (
          <p className="text-xs text-amber-400/90 mb-4">
            Showing saved Lighthouse scores. Provide `VITE_LIGHTHOUSE_URL` and
            `VITE_PAGESPEED_API_KEY` to refresh live results.
          </p>
        )}

        {error && !isLoading && (
          <p className="text-xs text-rose-400/90 mb-4">
            Lighthouse fetch failed: {error.message}
          </p>
        )}

        {lastFetchedAt && (
          <p className="text-xs text-slate-500 mb-4">
            Last fetched {lastFetchedAt.toLocaleString()}
          </p>
        )}

        {/* Feature blurbs */}
        <div className="grid sm:grid-cols-3 gap-8 text-center">
          <div>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mb-3">
              <Rocket className="h-6 w-6 text-white" />
            </div>
            <div className="font-semibold text-slate-100 mb-1">Fast Loading</div>
            <p className="text-sm text-slate-300 max-w-xs mx-auto">Optimized assets, code‑splitting, and lazy loading for quick page loads.</p>
          </div>
          <div>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 mb-3">
              <Accessibility className="h-6 w-6 text-white" />
            </div>
            <div className="font-semibold text-slate-100 mb-1">Accessible Design</div>
            <p className="text-sm text-slate-300 max-w-xs mx-auto">Semantic HTML, ARIA labels, keyboard navigation, and reduced‑motion support.</p>
          </div>
          <div>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-orange-500 mb-3">
              <Smartphone className="h-6 w-6 text-white" />
            </div>
            <div className="font-semibold text-slate-100 mb-1">Responsive</div>
            <p className="text-sm text-slate-300 max-w-xs mx-auto">Mobile‑first layouts that look great on any screen size.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
