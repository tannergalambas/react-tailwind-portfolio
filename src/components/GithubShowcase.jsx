import { useEffect, useMemo, useState } from "react";

/** tiny helpers */
const n = (x) => new Intl.NumberFormat().format(x ?? 0);
const langDot = (lang) => {
  const map = {
    JavaScript: "bg-yellow-400",
    TypeScript: "bg-blue-400",
    CSS: "bg-indigo-400",
    HTML: "bg-orange-400",
    PHP: "bg-purple-400",
    Python: "bg-green-400",
    Shell: "bg-slate-400",
  };
  return map[lang] || "bg-slate-400";
};

function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-800/50 p-4 shadow-sm animate-pulse">
      <div className="h-4 w-2/3 bg-slate-700 rounded" />
      <div className="h-3 w-full bg-slate-700 rounded mt-3" />
      <div className="h-3 w-5/6 bg-slate-700 rounded mt-2" />
      <div className="flex gap-4 mt-4">
        <div className="h-3 w-16 bg-slate-700 rounded" />
        <div className="h-3 w-12 bg-slate-700 rounded" />
      </div>
    </div>
  );
}

/**
 * GithubShowcase (grid)
 * Props:
 *  - user: GitHub username (default "tannergalambas")
 *  - limit: number of cards (default 6)
 *  - repos: optional array of repo names to pin (keeps order)
 */
export default function GithubShowcase({ user = "tannergalambas", limit = 6, repos }) {
  const [items, setItems] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let alive = true;

    (async () => {
      setErr(null);
      setItems(null);

      try {
        let data = [];

        if (Array.isArray(repos) && repos.length) {
          const out = [];
          for (const name of repos) {
            const r = await fetch(`https://api.github.com/repos/${user}/${name}`);
            if (r.ok) out.push(await r.json());
          }
          data = out;
        } else {
          const r = await fetch(
            `https://api.github.com/users/${user}/repos?sort=updated&per_page=${limit + 4}`
          );
          if (!r.ok) throw new Error(`GitHub API: ${r.status}`);
          data = await r.json();
        }

        const filtered = data
          .filter((r) => !r.fork && !r.archived)
          .slice(0, limit)
          .map((r) => ({
            id: r.id,
            name: r.name,
            url: r.html_url,
            description: r.description,
            stars: r.stargazers_count,
            forks: r.forks_count,
            language: r.language,
            updatedAt: r.updated_at,
          }));

        if (alive) setItems(filtered);
      } catch (e) {
        if (alive) setErr(e);
      }
    })();

    return () => { alive = false; };
  }, [user, limit, repos]);

  const body = useMemo(() => {
    if (err) {
      return (
        <div className="rounded-2xl border border-slate-700 bg-slate-800/50 p-4 text-sm text-slate-300 shadow-sm">
          Couldn’t load GitHub right now.
        </div>
      );
    }
    if (!items) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: Math.min(6, limit) }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      );
    }
    if (items.length === 0) {
      return <p className="text-slate-400">No repositories to show yet.</p>;
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((repo) => (
          <a
            key={repo.id}
            href={repo.url}
            target="_blank"
            rel="noreferrer"
            className="group rounded-2xl border border-slate-700 bg-slate-800/60 p-5 text-left shadow-sm hover:shadow-md hover:border-slate-500 hover:bg-slate-800/80 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label={`Open ${repo.name} on GitHub`}
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-semibold text-slate-100 group-hover:underline">{repo.name}</h3>
              {repo.language && (
                <span className="inline-flex items-center gap-1 text-xs text-slate-300">
                  <span className={`inline-block w-2 h-2 rounded-full ${langDot(repo.language)}`} />
                  {repo.language}
                </span>
              )}
            </div>

            {repo.description && (
              <p className="mt-2 text-sm text-slate-300 line-clamp-3">{repo.description}</p>
            )}

            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <span>★ {n(repo.stars)}</span>
              {repo.forks ? <span>⑂ {n(repo.forks)}</span> : null}
              {repo.updatedAt ? (
                <span>Updated {new Date(repo.updatedAt).toLocaleDateString()}</span>
              ) : null}
            </div>

            <div className="mt-4">
              <span className="inline-block rounded-full bg-blue-600 px-3 py-1 text-xs text-white group-hover:bg-blue-700 transition">
                View Repo →
              </span>
            </div>
          </a>
        ))}
      </div>
    );
  }, [err, items, limit]);

  return (
    <section aria-labelledby="gh-title">
      <div className="flex items-baseline justify-between mb-3">
        <h3 id="gh-title" className="text-lg font-semibold text-slate-100">GitHub Projects</h3>
        <a
          href={`https://github.com/${user}`}
          target="_blank"
          rel="noreferrer"
          className="text-xs text-slate-400 hover:text-slate-200 underline"
        >
          View GitHub →
        </a>
      </div>
      {body}
    </section>
  );
}