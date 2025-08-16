import { motion } from "framer-motion";
import me from "./assets/me.jpeg";
import TechStack from "./components/TechStack";
import About from "./components/About";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-24 min-h-screen flex flex-col items-center bg-gradient-to-b from-white via-slate-100 to-white px-4 text-center"
      >
        <img
          src={me}
          alt="Tanner Galambas"
          className="w-40 h-40 rounded-full object-cover mb-6 shadow-lg"
        />
        <h1 className="text-2xl font-bold">Tanner Galambas</h1>
        <p className="text-gray-700 mt-2">
          Front-End Developer | React & WordPress Specialist
        </p>
        <p className="text-gray-600 mt-1 max-w-md">
          I build responsive, accessible websites that are fast, modern, and user-friendly.
          Based in Austin, TX.
        </p>

        {/* Sections */}
        <section id="tech">
          <TechStack />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </motion.div>
    </>
  );
}

export default App;