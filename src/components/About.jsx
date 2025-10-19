import { motion, useReducedMotion } from "framer-motion";
import { MapPin, GraduationCap, Code, Zap, Users } from "lucide-react";

const HIGHLIGHTS = [
  {
    title: "Clean Code",
    desc: "Writing maintainable, readable code",
    Icon: Code,
  },
  {
    title: "Performance",
    desc: "Fast, efficient experiences",
    Icon: Zap,
  },
  {
    title: "Accessibility",
    desc: "Inclusive by design",
    Icon: Users,
  },
];

const About = () => {
  const reduce = useReducedMotion();

  return (
    <section className="py-10 px-6 max-w-5xl mx-auto text-center" aria-labelledby="about-heading">
      <motion.h2
        id="about-heading"
        className="text-3xl sm:text-4xl font-bold mb-6 text-gradient"
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={reduce ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        About Me
      </motion.h2>
      <motion.div
        className="glass p-8 rounded-2xl max-w-3xl mx-auto"
        whileHover={reduce ? {} : { scale: 1.01 }}
        transition={{ duration: 0.3 }}
      >
        <motion.p
          className="text-slate-300 text-center max-w-3xl mx-auto leading-relaxed"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={reduce ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          I’m a front-end developer based in Austin, Texas, passionate about building clean, responsive websites with modern tools like React and Tailwind CSS. I hold a B.S. in Information Systems and care deeply about performance, accessibility, and making the web more usable and engaging.
        </motion.p>

        {/* Badges (match new header style) */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm">
          <motion.div className="flex items-center gap-2 text-blue-300" whileHover={reduce ? {} : { scale: 1.05 }}>
            <MapPin className="w-4 h-4" aria-hidden="true" />
            Austin, Texas
          </motion.div>
          <motion.div className="flex items-center gap-2 text-purple-300" whileHover={reduce ? {} : { scale: 1.05 }}>
            <GraduationCap className="w-4 h-4" aria-hidden="true" />
            B.S. Information Systems
          </motion.div>
        </div>
      </motion.div>

      {/* Highlights */}
      <ul role="list" className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
        {HIGHLIGHTS.map((h, i) => (
          <motion.li
            key={h.title}
            className="list-none rounded-xl p-4 bg-white/5 border border-white/10 backdrop-blur-sm"
            aria-label={`${h.title} — ${h.desc}`}
            initial={reduce ? false : { opacity: 0, scale: 0.95, rotate: -1 }}
            whileInView={reduce ? {} : { opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 140, damping: 16, delay: reduce ? 0 : i * 0.08 }}
            whileHover={reduce ? {} : { y: -4, scale: 1.01 }}
          >
            {/* Cute icon chip */}
            {h.Icon && (
              <motion.div
                className="inline-flex p-3 rounded-lg mb-3 bg-gradient-to-r from-blue-600 to-purple-600"
                whileHover={reduce ? {} : { rotate: 5 }}
                transition={{ duration: 0.25 }}
                aria-hidden="true"
              >
                <h.Icon className="w-5 h-5 text-white" />
              </motion.div>
            )}
            <div className="font-medium text-slate-100">{h.title}</div>
            <div className="text-sm text-slate-200">{h.desc}</div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default About;
