import { useEffect } from "react";

export function useTitle(title, opts = {}) {
  useEffect(() => {
    if (!title) return;
    const prev = document.title;
    document.title = title;
    if (opts.description) {
      const meta = document.querySelector('meta[name="description"]') || (() => {
        const m = document.createElement('meta');
        m.setAttribute('name', 'description');
        document.head.appendChild(m);
        return m;
      })();
      meta.setAttribute('content', opts.description);
    }
    return () => { document.title = prev; };
  }, [title, opts.description]);
}

