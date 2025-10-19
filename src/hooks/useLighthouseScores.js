import { useEffect, useState } from "react";

export const DEFAULT_LIGHTHOUSE_SCORES = [
  { label: "Performance", score: 98 },
  { label: "Accessibility", score: 100 },
  { label: "Best Practices", score: 100 },
  { label: "SEO", score: 98 },
];

const REPORT_LABEL_MAP = {
  performance: "Performance",
  accessibility: "Accessibility",
  "best-practices": "Best Practices",
  seo: "SEO",
};

const REQUEST_CATEGORIES = Object.keys(REPORT_LABEL_MAP);

function normalizeScore(value) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return null;
  }
  return Math.min(100, Math.max(0, Math.round(value * 100)));
}

export function useLighthouseScores({ fallback = DEFAULT_LIGHTHOUSE_SCORES } = {}) {
  const siteUrl =
    import.meta.env.VITE_LIGHTHOUSE_URL ||
    import.meta.env.VITE_SITE_URL ||
    import.meta.env.VITE_PUBLIC_URL;
  const apiKey = import.meta.env.VITE_PAGESPEED_API_KEY;

  const shouldFetch = Boolean(siteUrl) && Boolean(apiKey);

  const [state, setState] = useState({
    scores: fallback,
    isLoading: shouldFetch,
    error: null,
    usedFallback: !shouldFetch,
    lastFetchedAt: null,
  });

  useEffect(() => {
    if (!shouldFetch) {
      return;
    }

    const controller = new AbortController();

    async function fetchScores() {
      setState((prev) => ({
        ...prev,
        isLoading: true,
        error: null,
      }));

      try {
        const url = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
        url.searchParams.set("url", siteUrl);
        url.searchParams.set("strategy", "desktop");
        REQUEST_CATEGORIES.forEach((category) => {
          url.searchParams.append("category", category);
        });
        url.searchParams.set("key", apiKey);

        const response = await fetch(url.toString(), {
          signal: controller.signal,
        });

        if (!response.ok) {
          let message = `status ${response.status}`;
          try {
            const payload = await response.json();
            if (payload?.error?.message) {
              message = payload.error.message;
            }
          } catch {
            // ignore JSON parse errors
          }
          throw new Error(message);
        }

        const payload = await response.json();
        const categories = payload?.lighthouseResult?.categories;

        if (!categories) {
          throw new Error("Unexpected PageSpeed response format");
        }

        const scores = REQUEST_CATEGORIES.map((key) => {
          const category = categories[key];
          const label = REPORT_LABEL_MAP[key] ?? key;
          const score = normalizeScore(category?.score);

          return {
            label,
            score: score ?? fallback.find((item) => item.label === label)?.score ?? 0,
          };
        });

        setState({
          scores,
          isLoading: false,
          error: null,
          usedFallback: false,
          lastFetchedAt: new Date(),
        });
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }

        setState({
          scores: fallback,
          isLoading: false,
          error,
          usedFallback: true,
          lastFetchedAt: null,
        });
      }
    }

    fetchScores();

    return () => controller.abort();
  }, [apiKey, siteUrl, shouldFetch, fallback]);

  return state;
}
