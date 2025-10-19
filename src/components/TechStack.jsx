import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef } from "react";
import { FaReact, FaWordpress, FaGitAlt } from "react-icons/fa";
import { SiTailwindcss, SiTypescript, SiNextdotjs, SiFramer, SiVite } from "react-icons/si";

const TOOLS = [
  { key: "react", label: "React", subtitle: "Library", Icon: FaReact, color: "#61dafb" },
  { key: "typescript", label: "TypeScript", subtitle: "Language", Icon: SiTypescript, color: "#3178c6" },
  { key: "nextjs", label: "Next.js", subtitle: "Framework", Icon: SiNextdotjs, color: "#ffffff" },
  { key: "tailwind", label: "Tailwind CSS", subtitle: "Styling", Icon: SiTailwindcss, color: "#38bdf8" },
  { key: "framer", label: "Framer Motion", subtitle: "Animation", Icon: SiFramer, color: "#a855f7" },
  { key: "wordpress", label: "WordPress", subtitle: "CMS", Icon: FaWordpress, color: "#21759b" },
  { key: "vite", label: "Vite", subtitle: "Dev/Bundler", Icon: SiVite, color: "#a162f7" },
  { key: "git", label: "Git", subtitle: "Version Control", Icon: FaGitAlt, color: "#f1502f" },
];

// Match project-b entrance animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const cardVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: { scale: 1, rotate: 0, transition: { type: "spring", stiffness: 100, damping: 10 } },
};

const TechStack = () => {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="py-12" aria-labelledby="tech-heading">
      <h2 id="tech-heading" className="text-3xl sm:text-4xl font-bold text-center mb-6 text-gradient">
        Tech Stack
      </h2>

      <motion.ul
        ref={ref}
        role="list"
        className="mx-auto grid max-w-5xl grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 px-4"
        variants={reduce ? undefined : containerVariants}
        initial={reduce ? undefined : "hidden"}
        animate={reduce ? undefined : inView ? "visible" : "hidden"}
      >
        {TOOLS.map((tool, idx) => {
          const { Icon } = tool;
          const delay = idx * 0.06;
          return (
            <motion.li
              key={tool.key}
              aria-label={`${tool.label} — ${tool.subtitle}`}
              className="group relative list-none"
              variants={reduce ? undefined : cardVariants}
              transition={{ type: "spring", stiffness: 140, damping: 14, delay: reduce ? 0 : delay }}
              whileHover={reduce ? {} : { y: -8, scale: 1.02 }}
            >
              <motion.div
                className="relative rounded-xl p-5 h-full bg-white/5 border border-white/10 backdrop-blur-sm transition-transform duration-300"
                whileHover={{
                  backgroundColor: "rgba(255,255,255,0.06)",
                  boxShadow: `0 10px 30px ${tool.color}33`,
                  borderColor: "rgba(255,255,255,0.18)",
                }}
              >
                <div className="flex items-center gap-3">
                  <Icon className="text-2xl" style={{ color: tool.color }} aria-hidden="true" />
                  <div className="text-left">
                    <div className="font-medium text-slate-100">{tool.label}</div>
                    <div className="text-xs text-slate-200">{tool.subtitle}</div>
                  </div>
                </div>
              </motion.div>
            </motion.li>
          );
        })}
      </motion.ul>
    </section>
  );
};

export default TechStack;
