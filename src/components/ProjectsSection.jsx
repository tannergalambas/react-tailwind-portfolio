import { Github } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ProjectCard from "@/components/ui/ProjectCard.jsx";

const featuredProjects = [
  // 1) React Tailwind Portfolio — strongest first
  {
    id: "react-tailwind-portfolio",
    title: "React Tailwind Portfolio",
    description: "Personal portfolio built with React and Tailwind CSS showcasing modern design patterns and responsive layouts.",
    image: "/images/portfolio-cover.svg",
    tags: ["React", "TailwindCSS", "JavaScript"],
    github: "https://github.com/tannergalambas/react-tailwind-portfolio",
    demo: null,
    isCurrent: true
  },
  // 2) Little Lemon Capstone — credible case study
  {
    id: "little-lemon-capstone",
    title: "Little Lemon Capstone",
    description: "A complete restaurant website built with React, featuring table reservations, menu displays, and responsive design.",
    image: "/images/little-lemon-logo.png",
    imageFit: "contain",
    tags: ["React", "JavaScript", "CSS3"],
    github: "https://github.com/tannergalambas/little-lemon-capstone",
    demo: "https://lemon.tannergalambas.com/",
    isMock: true
  },
  // 3) Tide — creative closer
  {
    id: "tide",
    title: "Tide",
    description: "A React clone of Imperial Tide’s band site, featuring a clean, responsive design with multi-page routing.",
    image: "/images/tide-band.jpg",
    tags: ["React", "JavaScript"],
    github: "https://github.com/tannergalambas/imperial-tide",
    demo: "https://tide.tannergalambas.com/",
    badgeLabel: "UI Clone"
  }
];

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

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
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </motion.div>
        
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
            className="mt-4 text-sm text-slate-400"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            Explore my complete collection of projects, experiments, and open source contributions
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
