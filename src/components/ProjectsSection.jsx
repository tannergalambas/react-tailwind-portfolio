import { Github } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import ProjectCard from "@/components/ui/ProjectCard.jsx";
import { useGitHubProjects } from "@/hooks/useGitHubProjects.js";

const TAG_COLOR_PALETTE = {
  javascript: "#F7DF1E",
  typescript: "#3178C6",
  react: "#61DAFB",
  tailwindcss: "#38BDF8",
  css: "#264DE4",
  html: "#E34F26",
  astro: "#FF5D01",
  node: "#539E43",
  nextjs: "#111827",
  express: "#68A063",
  vite: "#646CFF",
  markdown: "#0C1226",
  json: "#F4A261",
  shell: "#4CAF50",
  scss: "#C6538C",
  sass: "#BF4080",
  yaml: "#FFCC00",
  dockerfile: "#2496ED",
  wordpress: "#21759B",
  api: "#9333EA",
  firebase: "#FFCB2B",
  testing: "#E11D48",
};

const TAG_LABEL_OVERRIDES = {
  tailwindcss: "Tailwind CSS",
  css: "CSS",
  html: "HTML",
  json: "JSON",
  yaml: "YAML",
  dockerfile: "Dockerfile",
  nextjs: "Next.js",
};

const INFERRED_TAG_RULES = [
  { test: /react/i, tag: "React" },
  { test: /astro/i, tag: "Astro" },
  { test: /tailwind/i, tag: "TailwindCSS" },
  { test: /node/i, tag: "Node" },
  { test: /express/i, tag: "Express" },
  { test: /vite/i, tag: "Vite" },
  { test: /jest/i, tag: "Testing" },
];

function formatTagLabel(tag) {
  const normalized = tag.toLowerCase();
  if (TAG_LABEL_OVERRIDES[normalized]) {
    return TAG_LABEL_OVERRIDES[normalized];
  }

  return tag
    .split(/[-_]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function hexToRgb(hex) {
  const normalized = hex.replace("#", "");
  const value =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => char + char)
          .join("")
      : normalized;

  const parsed = Number.parseInt(value, 16);

  return {
    r: (parsed >> 16) & 255,
    g: (parsed >> 8) & 255,
    b: parsed & 255,
  };
}

function withAlpha(hex, alpha) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function getContrastColor(hex) {
  const { r, g, b } = hexToRgb(hex);
  const [nr, ng, nb] = [r, g, b].map((value) => {
    const channel = value / 255;
    return channel <= 0.03928
      ? channel / 12.92
      : Math.pow((channel + 0.055) / 1.055, 2.4);
  });

  const luminance = 0.2126 * nr + 0.7152 * ng + 0.0722 * nb;

  return luminance > 0.6 ? "#0f172a" : "#f8fafc";
}

function createTagDescriptor(tag) {
  const label = typeof tag === "string" ? tag : tag.label;
  const slug = label.toLowerCase();
  const baseHex = TAG_COLOR_PALETTE[slug] ?? "#64748B";

  return {
    label: formatTagLabel(label),
    slug,
    color: baseHex,
    background: withAlpha(baseHex, 0.28),
    border: withAlpha(baseHex, 0.45),
    textColor: slug === "javascript" ? "#f8fafc" : getContrastColor(baseHex),
  };
}

function decorateTags(tags = []) {
  return tags.map(createTagDescriptor);
}

const FALLBACK_PROJECTS = [
  {
    id: "react-tailwind-portfolio",
    title: "React Tailwind Portfolio",
    description: "Personal portfolio built with React and Tailwind CSS showcasing modern design patterns and responsive layouts.",
    image: "/images/portfolio-cover.svg",
    tags: decorateTags(["React", "TailwindCSS", "JavaScript"]),
    github: "https://github.com/tannergalambas/react-tailwind-portfolio",
    demo: null,
    isCurrent: true,
    languageSegments: [],
  },
  {
    id: "little-lemon-capstone",
    title: "Little Lemon Capstone",
    description: "A complete restaurant website built with React, featuring table reservations, menu displays, and responsive design.",
    image: "/images/little-lemon-logo.png",
    imageFit: "contain",
    tags: decorateTags(["React", "JavaScript", "CSS"]),
    github: "https://github.com/tannergalambas/little-lemon-capstone",
    demo: "https://lemon.tannergalambas.com/",
    isMock: true,
    languageSegments: [],
  },
  {
    id: "tide",
    title: "Tide",
    description: "A React clone of Imperial Tide’s band site, featuring a clean, responsive design with multi-page routing.",
    image: "/images/tide-band.jpg",
    tags: decorateTags(["React", "JavaScript"]),
    github: "https://github.com/tannergalambas/imperial-tide",
    demo: "https://tide.tannergalambas.com/",
    badgeLabel: "UI Clone",
    languageSegments: [],
  },
];

function formatRepoName(name) {
  return name
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function createGradientFromName(name) {
  const hash = Array.from(name).reduce(
    (acc, char) => (char.charCodeAt(0) + ((acc << 5) - acc)) >>> 0,
    0,
  );

  const palette = CARD_GRADIENTS[hash % CARD_GRADIENTS.length];

  return palette ?? CARD_GRADIENTS[0];
}

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const [fetchEnabled, setFetchEnabled] = useState(false);

  useEffect(() => {
    if (isInView) {
      setFetchEnabled(true);
    }
  }, [isInView]);

  useEffect(() => {
    const timeout = setTimeout(() => setFetchEnabled(true), 5000);
    return () => clearTimeout(timeout);
  }, []);

  const { data: githubData, isLoading, error } = useGitHubProjects({
    perPage: 9,
    enabled: fetchEnabled,
  });

  const githubProjects = useMemo(() => {
    if (!Array.isArray(githubData)) {
      return [];
    }

    return githubData
      .filter((repo) => !repo.archived && !repo.fork)
      .map((repo) => {
        const tagMap = new Map();
        const addTag = (label) => {
          if (!label) {
            return;
          }

          const normalized = typeof label === "string" ? label.trim() : "";

          if (!normalized) {
            return;
          }

          const slug = normalized.toLowerCase();

          if (!tagMap.has(slug)) {
            tagMap.set(slug, normalized);
          }
        };

        addTag(repo.language);

        if (Array.isArray(repo.languages)) {
          repo.languages.forEach((entry) => addTag(entry?.name));
        }

        if (Array.isArray(repo.topics)) {
          repo.topics.forEach(addTag);
        }

        INFERRED_TAG_RULES.forEach(({ test, tag }) => {
          if (test.test(repo.name) || test.test(repo.description ?? "")) {
            addTag(tag);
          }
        });

        if (tagMap.size === 0) {
          addTag("GitHub");
        }

        const gradient = createGradientFromName(repo.name);
        const languageSegments = (() => {
          const hasLanguageBreakdown = Array.isArray(repo.languages) && repo.languages.length > 0;

          if (!hasLanguageBreakdown && repo.language) {
            const descriptor = createTagDescriptor(repo.language);
            return [
              {
                label: descriptor.label,
                slug: descriptor.slug,
                color: descriptor.color,
                percent: 100,
                bytes: repo.totalLanguageBytes || 1,
                isEstimated: true,
              },
            ];
          }

          if (!hasLanguageBreakdown) {
            return [];
          }

          const totalBytes =
            repo.totalLanguageBytes ??
            repo.languages.reduce((sum, entry) => sum + (entry?.bytes ?? 0), 0);

          if (!totalBytes) {
            if (repo.language) {
              const descriptor = createTagDescriptor(repo.language);
              return [
                {
                  label: descriptor.label,
                  slug: descriptor.slug,
                  color: descriptor.color,
                  percent: 100,
                  bytes: 1,
                  isEstimated: true,
                },
              ];
            }

            return [];
          }

          const segments = repo.languages.map((entry) => {
            const label = entry?.name ?? "Other";
            const descriptor = createTagDescriptor(label);
            const percent = (entry.bytes / totalBytes) * 100;

            return {
              label: descriptor.label,
              slug: descriptor.slug,
              color: descriptor.color,
              percent,
              bytes: entry.bytes,
            };
          });

          if (segments.length <= 5) {
            return segments;
          }

          const primary = segments.slice(0, 4);
          const otherBytes = segments
            .slice(4)
            .reduce((sum, segment) => sum + (segment.bytes ?? 0), 0);

          if (otherBytes > 0) {
            primary.push({
              label: "Other",
              slug: "other",
              color: "#475569",
              percent: (otherBytes / totalBytes) * 100,
              bytes: otherBytes,
            });
          }

          return primary;
        })();

        return {
          id: repo.id,
          title: formatRepoName(repo.name),
          description:
            repo.description ||
            "This repository does not have a summary yet, but the code speaks for itself.",
          tags: decorateTags(Array.from(tagMap.values()).slice(0, 6)),
          github: repo.html_url,
          demo: repo.homepage || null,
          updatedAt: repo.pushed_at,
          gradient,
          languageSegments,
        };
      })
      .sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      )
      .slice(0, 6);
  }, [githubData]);

  const hasGithubProjects = githubProjects.length > 0;
  const fallbackUsed = !hasGithubProjects && !isLoading;
  const projectsToRender = hasGithubProjects
    ? githubProjects
    : fallbackUsed
      ? FALLBACK_PROJECTS
      : [];
  return (
    <section ref={ref} id="projects" className="py-10 bg-transparent relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold mb-6 text-gradient"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Featured Projects
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          <motion.p
            className="text-lg text-slate-300 max-w-xl sm:max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Some of my recent work showcasing modern web development
          </motion.p>
        </motion.div>
        
        {/* Projects Grid */}
        <motion.div
          className="grid lg:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {projectsToRender.length > 0 ? (
            projectsToRender.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-slate-200 py-10">
              Loading GitHub projects…
            </div>
          )}
        </motion.div>

        {fallbackUsed && (
          <motion.p
            className="text-center text-sm text-slate-200 -mt-12 mb-16"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            GitHub data is temporarily unavailable, so curated highlights are shown instead.
          </motion.p>
        )}

        {/* Enhanced GitHub CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <motion.div
            className="inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.a
              href="https://github.com/tannergalambas"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-white font-semibold rounded-2xl border border-slate-600 hover:border-slate-500 transition-all duration-300 overflow-hidden"
            >
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut"
                }}
              />
              
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Github className="w-5 h-5" />
              </motion.div>
              <span className="relative z-10">View All Projects on GitHub</span>
              
              {/* Hover glow */}
              <motion.div
                className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-0 blur-sm group-hover:opacity-40 transition-opacity duration-300"
              />
            </motion.a>
          </motion.div>
          
          <motion.p
            className="mt-4 text-sm text-slate-200"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            Explore my complete collection of public projects, experiments, and open source contributions
          </motion.p>

          {error && (
            <motion.p
              className="mt-3 text-xs text-slate-500"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 1.8 }}
            >
              GitHub API error: {error.message}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
const CARD_GRADIENTS = [
  { from: "#1d4ed8", to: "#312e81" }, // blue → indigo
  { from: "#3b82f6", to: "#8b5cf6" }, // azure → violet
  { from: "#6366f1", to: "#9333ea" }, // indigo → purple
  { from: "#8b5cf6", to: "#ec4899" }, // violet → pink
  { from: "#0ea5e9", to: "#2563eb" }, // sky → blue
  { from: "#1e293b", to: "#3b82f6" }, // slate → blue
];
