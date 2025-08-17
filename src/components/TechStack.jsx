import { FaReact, FaGithub } from "react-icons/fa";
import { SiTailwindcss, SiVite, SiJavascript, SiFramer } from "react-icons/si";
import { motion } from "framer-motion";

const icons = [
  { component: FaReact, label: "React", color: "text-blue-400", hoverColor: "hover:text-blue-500", delay: 0 },
  { component: SiTailwindcss, label: "TailwindCSS", color: "text-sky-300", hoverColor: "hover:text-sky-400", delay: 0.1 },
  { component: SiJavascript, label: "JavaScript", color: "text-yellow-300", hoverColor: "hover:text-yellow-400", delay: 0.2 },
  { component: SiVite, label: "Vite", color: "text-purple-400", hoverColor: "hover:text-purple-500", delay: 0.3 },
  { component: SiFramer, label: "Framer Motion", color: "text-pink-400", hoverColor: "hover:text-pink-500", delay: 0.4 },
  { component: FaGithub, label: "GitHub", color: "text-gray-300", hoverColor: "hover:text-white", delay: 0.5, link: "https://github.com/tannergalambas" },
];

const TechStack = () => {
  return (
    <div className="py-12">
      <h2 className="text-2xl font-semibold text-center mb-8">Tech Stack</h2>
      <div className="flex justify-center gap-10 flex-wrap">
        {icons.map(({ component: Icon, label, color, hoverColor, delay, link }, index) => {
          const icon = (
            <motion.div
              key={index}
              className={`flex flex-col items-center ${color} ${hoverColor} transition-colors duration-200`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut", delay }}
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.15, ease: "easeOut" },
              }}
            >
              <Icon className="text-5xl" />
              <span className="text-sm mt-2 text-gray-300">{label}</span>
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