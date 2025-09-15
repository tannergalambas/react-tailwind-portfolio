// Lightweight GA4 reporting for core web vitals in production
// Uses the "web-vitals" package. Safe‑guards if gtag is missing.
export async function reportWebVitals() {
  try {
    const { onCLS, onFID, onLCP, onFCP, onINP, onTTFB } = await import('web-vitals');
    const send = (metric) => {
      if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
      // GA4: send the metric name as the event, with numeric value
      window.gtag('event', metric.name, {
        value: metric.value,
        metric_id: metric.id,
        metric_delta: metric.delta,
        metric_rating: metric.rating,
      });
    };
    onCLS(send); onFID(send); onLCP(send);
    // Optional extras (harmless to include)
    onFCP(send); onINP(send); onTTFB(send);
  } catch (_) {
    // ignore if the library isn't available
  }
}

