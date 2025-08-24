// src/components/ui/project-card.jsx
import { Github, ExternalLink } from "lucide-react";

export default function ProjectCard({ project }) {
  return (
    <div className="bg-[#1e293b] rounded-xl shadow p-6 transition hover:shadow-xl flex flex-col text-white">
      <img src={project.image} alt={project.title} className="rounded-md mb-4 w-full h-40 object-cover" />
      <h4 className="text-xl font-semibold mb-2 text-gray-100">{project.title}</h4>
<p className="text-sm text-gray-300 mb-3">{project.description}</p>
<div className="flex flex-wrap gap-2 text-xs mb-4">
  {project.tags.map(tag => (
    <span key={tag} className="bg-blue-100 text-blue-600 px-2 py-1 rounded">
      {tag}
    </span>
  ))}
</div>
      <div className="mt-auto flex gap-3">
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline flex items-center">
            <Github className="h-4 w-4 mr-1" />
            Code
          </a>
        )}
        {project.demo && (
          <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-sm text-green-500 hover:underline flex items-center">
            <ExternalLink className="h-4 w-4 mr-1" />
            Live
          </a>
        )}
      </div>
    </div>
  );
}