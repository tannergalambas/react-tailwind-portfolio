import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.div
      className="py-6 px-6 max-w-3xl mx-auto text-center"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-3xl font-semibold mb-4">About Me</h2>
      <p className="text-slate-300 text-center max-w-2xl mx-auto leading-relaxed">
        I'm a front-end developer based in Austin, Texas, passionate about building clean, responsive websites with modern tools like React and Tailwind CSS. I hold a B.S. in Information Systems from the University of Nevada, Reno, and care deeply about performance, accessibility, and making the web more usable and engaging.
      </p>
    </motion.div>
  );
};

export default About;