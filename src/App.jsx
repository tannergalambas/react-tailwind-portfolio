import { motion } from "framer-motion";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import headshot4x5 from "./assets/tan-headshot-4x5.jpg";
import headshot4x5_3x from "./assets/tan-headshot-4x5@3x.jpg";
import TechStack from "./components/TechStack";
import About from "./components/About";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import ScrollToTopButton from "./components/ScrollToTopButton";
import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/react";
import ProjectsSection from "@/components/ProjectsSection";
import { Toaster } from "@/components/ui/toaster";

function App() {
  const location = useLocation();

  return (
    <>
      {/* Skip link for keyboard users */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only absolute left-2 top-2 z-[100] bg-white text-black px-3 py-1 rounded shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        Skip to content
      </a>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        id="main"
        role="main"
        className="pt-24 min-h-screen flex flex-col items-center px-4 text-center"
      >
        <motion.div
          className="w-36 sm:w-40 md:w-48 aspect-[4/5] rounded-2xl overflow-hidden mb-6 shadow-lg transition duration-300 hover:shadow-[0_0_25px_rgba(147,197,253,0.8)]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <img
            src={headshot4x5}
            srcSet={`${headshot4x5} 320w, ${headshot4x5_3x} 480w`}
            sizes="(min-width: 768px) 192px, (min-width: 640px) 160px, 144px"
            width="480"
            height="600"
            fetchpriority="high"
            alt="Tanner Galambas"
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </motion.div>
        <motion.h1
          className="text-4xl font-bold tracking-wide mb-2 text-indigo-400"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Tanner Galambas
        </motion.h1>
        <motion.p
          className="text-lg text-slate-200 mb-1"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Front-End Developer · React & WordPress Specialist
        </motion.p>
        <motion.p
          className="text-slate-300 max-w-xl mt-2 leading-relaxed"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          I build fast, responsive, and accessible websites with modern tools like React, Tailwind, and WordPress — focused on user experience and performance. Based in Austin, TX.
        </motion.p>

        <motion.a
          href="#contact"
          className="mt-2 inline-block bg-blue-600 text-white px-6 py-2 rounded-full shadow hover:bg-blue-700 transition"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Get in Touch
        </motion.a>

        <section id="tech" className="w-full mt-2">
          <TechStack />
        </section>

        <section id="about" className="w-full mt-2">
          <About />
        </section>

        <section id="activity" className="w-full mt-8 px-2">
  <div className="max-w-6xl mx-auto">
    {/* Featured Projects */}
    <ProjectsSection />
  </div>
</section>

        <section id="contact" className="w-full mt-2">
          <Contact />
        </section>
      </motion.div>

      <ScrollToTopButton />
      <Footer />
      <Toaster />
      <Analytics />
    </>
  );
}

export default App;
