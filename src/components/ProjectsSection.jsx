import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";
import ProjectCard from "@/components/ui/project-card.jsx";
import { useGitHubProjects } from "@/hooks/use-github-projects.jsx";

const projectFilters = [
  { id: "all", label: "All Projects" },
  { id: "react", label: "React" },
  { id: "wordpress", label: "WordPress" },
  { id: "javascript", label: "JavaScript" }
];

const featuredProjects = [
  {
    id: "little-lemon-capstone",
    title: "Little Lemon Capstone",
    description: "A complete restaurant website built with React, featuring table reservations, menu displays, and responsive design.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300",
    tags: ["React", "JavaScript", "CSS3"],
    category: ["react", "javascript"],
    github: "https://github.com/tannergalambas/little-lemon-capstone",
    demo: null
  },
  {
    id: "react-tailwind-portfolio",
    title: "React Tailwind Portfolio",
    description: "Personal portfolio built with React and Tailwind CSS showcasing modern design patterns and responsive layouts.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300",
    tags: ["React", "TailwindCSS", "JavaScript"],
    category: ["react", "javascript"],
    github: "https://github.com/tannergalambas/react-tailwind-portfolio",
    demo: null
  },
  {
    id: "github-profile",
    title: "GitHub Profile README",
    description: "Personal GitHub profile README showcasing development journey and technical expertise with dynamic stats.",
    image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300",
    tags: ["Markdown", "GitHub", "APIs"],
    category: ["javascript"],
    github: "https://github.com/tannergalambas/tannergalambas",
    demo: null
  }
];

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const { data: githubProjects, isLoading: isLoadingGithub } = useGitHubProjects();

  const filteredProjects = featuredProjects.filter(project => 
    activeFilter === "all" || project.category.includes(activeFilter)
  );

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
        
        {/* Project Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-gray-100 dark:bg-slate-700 rounded-lg p-1">
            {projectFilters.map((filter) => (
              <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "ghost"}
              onClick={() => setActiveFilter(filter.id)}
              data-testid={`button-filter-${filter.id}`}
              className={`px-6 py-2 text-sm font-medium rounded-md transition-all ${
                activeFilter === filter.id
                  ? "bg-white dark:bg-slate-600 text-blue-600 dark:text-blue-400 shadow-sm"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {filter.label}
            </Button>
            ))}
          </div>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
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

        {/* GitHub Stats */}
{/*
{githubProjects && !isLoadingGithub && (
  <div className="mt-12 bg-gray-50 dark:bg-slate-700 rounded-2xl p-8">
    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">GitHub Activity</h3>
    <div className="grid md:grid-cols-3 gap-6">
      <div className="text-center">
        <div data-testid="text-total-repos" className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
          {githubProjects.length}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-300">Public Repositories</div>
      </div>
      <div className="text-center">
        <div data-testid="text-total-stars" className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-1">
          {githubProjects.reduce((acc, repo) => acc + repo.stargazers_count, 0)}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-300">Total Stars</div>
      </div>
      <div className="text-center">
        <div data-testid="text-languages" className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">
          {new Set(githubProjects.filter(repo => repo.language).map(repo => repo.language)).size}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-300">Languages Used</div>
      </div>
    </div>
  </div>
)}
*/}
      </div>
    </section>
  );
}