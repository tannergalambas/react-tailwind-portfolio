import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import ProjectCard from "@/components/ui/ProjectCard.jsx";

const featuredProjects = [
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
  {
    id: "tide",
    title: "Tide",
    description: "A React clone of Imperial Tide’s band site, featuring a clean, responsive design with multi-page routing.",
    image: "/images/tide-band.jpg",
    tags: ["React", "JavaScript"],
    github: "https://github.com/tannergalambas/imperial-tide",
    demo: "https://tide.tannergalambas.com/",
    badgeLabel: "UI Clone"
  },
  {
    id: "react-tailwind-portfolio",
    title: "React Tailwind Portfolio",
    description: "Personal portfolio built with React and Tailwind CSS showcasing modern design patterns and responsive layouts.",
    image: "/images/portfolio-cover.svg",
    tags: ["React", "TailwindCSS", "JavaScript"],
    github: "https://github.com/tannergalambas/react-tailwind-portfolio",
    demo: null,
    isCurrent: true
  }
];

export default function ProjectsSection() {

  return (
    <section id="projects" className="py-2 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Featured Projects</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-violet-600 mx-auto mb-8"></div>
          <p className="text-lg text-white">
  Some of my recent work showcasing modern web development
</p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>
        
        {/* GitHub Integration */}
        <div className="text-center mt-12">
          <Button
            asChild
            data-testid="button-view-github"
            className="inline-flex items-center px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-all transform hover:scale-105"
          >
            <a
              href="https://github.com/tannergalambas"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-3 h-5 w-5" />
              View All Projects on GitHub
            </a>
          </Button>
        </div>

      </div>
    </section>
  );
}
