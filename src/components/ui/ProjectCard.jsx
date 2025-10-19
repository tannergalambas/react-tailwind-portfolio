// src/components/ui/project-card.jsx
import { Github, ExternalLink } from "lucide-react";

function formatPercent(value) {
  if (value >= 10) {
    return `${Math.round(value)}%`;
  }
  if (value >= 1) {
    return `${value.toFixed(1)}%`;
  }
  if (value === 0) {
    return "0%";
  }
  return "<0.1%";
}

export default function ProjectCard({ project }) {
  const lastUpdated = project.updatedAt
    ? new Date(project.updatedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;
  const languageSegments = Array.isArray(project.languageSegments)
    ? project.languageSegments.filter((segment) => segment.percent > 0)
    : [];

  return (
    <div className="bg-[#1e293b] rounded-xl shadow p-6 transition hover:shadow-xl flex flex-col text-white">
      {project.image ? (
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className={`rounded-md mb-4 w-full h-48 ${
            project.imageFit === "contain" ? "object-contain p-3" : "object-cover"
          }`}
        />
      ) : (
        <div
          className="rounded-md mb-4 w-full h-48 flex flex-col justify-between p-6 border border-white/10 shadow-inner"
          style={{
            background: `linear-gradient(135deg, ${project.gradient?.from ?? "#1e293b"}, ${
              project.gradient?.to ?? "#0f172a"
            })`,
          }}
        >
          <span className="text-xs uppercase tracking-[0.18em] text-white/75">
            GitHub Project
          </span>
          <div>
            <p className="text-lg font-semibold text-white leading-tight">
              {project.title}
            </p>
            {lastUpdated && (
              <p className="mt-2 text-[0.65rem] uppercase tracking-[0.12em] text-white/60">
                Updated {lastUpdated}
              </p>
            )}
          </div>
        </div>
      )}
      <h3 className="text-xl font-semibold mb-2 text-gray-100">
        {project.title}
      </h3>
      <p className="text-sm text-gray-300 mb-3">{project.description}</p>
      {languageSegments.length > 0 && (
        <div className="mb-4">
          <div className="text-xs text-slate-200 uppercase tracking-[0.18em]">
            Languages
          </div>
          <div className="mt-3 h-2 rounded-full bg-slate-800/80 overflow-hidden flex">
            {languageSegments.map((segment) => (
              <span
                key={segment.slug}
                style={{
                  backgroundColor: segment.color,
                  flex: segment.bytes || 0,
                }}
              />
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-300">
            {languageSegments.map((segment) => (
              <div key={`${segment.slug}-legend`} className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: segment.color }}
                  aria-hidden="true"
                />
                <span className="font-medium text-slate-200">{segment.label}</span>
                <span className="text-slate-200/80">{formatPercent(segment.percent)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {Array.isArray(project.tags) && project.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 text-xs mb-4">
          {project.tags.map((tag) => {
            const label = typeof tag === "string" ? tag : tag.label;
            const background = typeof tag === "string" ? undefined : tag.background;
            const border = typeof tag === "string" ? undefined : tag.border;
            const textColor = typeof tag === "string" ? undefined : tag.textColor;
            const key = typeof tag === "string" ? label : tag.slug ?? label;

            return (
              <span
                key={key}
                className="px-2 py-1 rounded border text-xs font-medium"
                style={{
                  backgroundColor: background,
                  borderColor: border,
                  color: textColor,
                }}
              >
                {label}
              </span>
            );
          })}
        </div>
      )}
      <div className="mt-auto flex gap-3 items-center">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View code for ${project.title} on GitHub`}
            className="text-sm text-blue-500 hover:underline flex items-center"
          >
            <Github className="h-4 w-4 mr-1" />
            Code
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open live site for ${project.title}`}
            className="text-sm text-green-500 hover:underline flex items-center"
          >
            <ExternalLink className="h-4 w-4 mr-1" />
            Live
          </a>
        )}
        {(project.badgeLabel || project.isMock) && (
          <span
            className={`ml-auto text-xs uppercase tracking-wide px-2 py-1 rounded ${
              project.badgeLabel ? 'bg-violet-200 text-violet-900' : 'bg-amber-200 text-amber-900'
            }`}
          >
            {project.badgeLabel || 'Mock'}
          </span>
        )}
        {project.isCurrent && (
          <span className="text-xs text-gray-200 bg-slate-700/60 border border-slate-600 px-2 py-1 rounded">
            This site
          </span>
        )}
      </div>
    </div>
  );
}
