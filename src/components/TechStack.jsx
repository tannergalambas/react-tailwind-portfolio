import {
  FaReact,
  FaWordpress,
  FaHtml5,
  FaCss3Alt
} from "react-icons/fa";
import { SiTailwindcss, SiJavascript } from "react-icons/si";
import { motion } from "framer-motion";

const icons = [
  { component: FaReact, label: "React", color: "text-blue-400", hoverColor: "hover:text-blue-500", delay: 0 },
  { component: SiTailwindcss, label: "TailwindCSS", color: "text-sky-300", hoverColor: "hover:text-sky-400", delay: 0.1 },
  { component: SiJavascript, label: "JavaScript", color: "text-yellow-300", hoverColor: "hover:text-yellow-400", delay: 0.2 },
  { component: FaWordpress, label: "WordPress", color: "text-sky-200", hoverColor: "hover:text-sky-300", delay: 0.3 },
  { component: FaHtml5, label: "HTML5", color: "text-orange-500", hoverColor: "hover:text-orange-600", delay: 0.4 },
  { component: FaCss3Alt, label: "CSS3", color: "text-blue-300", hoverColor: "hover:text-blue-400", delay: 0.5 }
];

const TechStack = () => {
  return (
    <div className="py-12">
      <h2 className="text-2xl font-semibold text-center mb-8">Tech Stack</h2>
      <div className="flex justify-center gap-10 flex-wrap">
        {icons.map(({ component: Icon, label, color, hoverColor, delay }, index) => (
          <motion.div
            key={index}
            className={`flex flex-col items-center ${color} ${hoverColor} transition-colors duration-200`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay }}
            whileHover={{
              scale: 1.2,
              transition: { duration: 0.15, ease: "easeOut" }
            }}
          >
            <Icon className="text-5xl" />
            <span className="text-sm mt-2 text-gray-300 text-center">{label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TechStack;