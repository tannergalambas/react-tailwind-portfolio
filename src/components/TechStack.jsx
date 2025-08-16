import { FaReact, FaGithub } from "react-icons/fa";
import { SiTailwindcss, SiVite, SiJavascript } from "react-icons/si";
import { motion } from "framer-motion";

const icons = [
  { component: FaReact, label: "React", hoverColor: "text-blue-500", delay: 0 },
  { component: SiTailwindcss, label: "TailwindCSS", hoverColor: "text-sky-400", delay: 0.1 },
  { component: SiJavascript, label: "JavaScript", hoverColor: "text-yellow-400", delay: 0.2 },
  { component: SiVite, label: "Vite", hoverColor: "text-purple-500", delay: 0.3 },
  { component: FaGithub, label: "GitHub", hoverColor: "text-black", delay: 0.4, link: "https://github.com/tannergalambas" },
];

const TechStack = () => {
  return (
    <div className="py-12">
      <h2 className="text-2xl font-semibold text-center mb-8">Tech Stack</h2>
      <div className="flex justify-center gap-10 flex-wrap text-5xl text-gray-700">
        {icons.map(({ component: Icon, label, hoverColor, delay, link }, index) => {
          const icon = (
            <motion.div
              key={index}
              className={`flex flex-col items-center transition-colors duration-300 hover:${hoverColor}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.5, delay }}
            >
              <Icon />
              <span className="text-sm mt-2">{label}</span>
            </motion.div>
          );

          return link ? (
            <a key={index} href={link} target="_blank" rel="noopener noreferrer">
              {icon}
            </a>
          ) : (
            icon
          );
        })}
      </div>
    </div>
  );
};

export default TechStack;