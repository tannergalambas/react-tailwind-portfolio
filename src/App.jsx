import { motion, useReducedMotion } from "framer-motion";
import { Suspense, lazy, useEffect } from "react";
import { useLocation } from "react-router-dom";
import headshotAvif320 from "./assets/tan-headshot-4x5-320.avif";
import headshotAvif640 from "./assets/tan-headshot-4x5-640.avif";
import headshotAvif960 from "./assets/tan-headshot-4x5-960.avif";
import headshotWebp320 from "./assets/tan-headshot-4x5-320.webp";
import headshotWebp640 from "./assets/tan-headshot-4x5-640.webp";
import headshotWebp960 from "./assets/tan-headshot-4x5-960.webp";
import headshotJpg640 from "./assets/tan-headshot-4x5-640.jpg";
import headshotJpgRetina from "./assets/tan-headshot-4x5@3x.jpg";
import Navbar from "./components/Navbar";
import ScrollToTopButton from "./components/ScrollToTopButton";
import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/react";
import BackgroundParticles from "@/components/BackgroundParticles";
import Typewriter from "@/components/Typewriter";
import { useTitle } from "@/hooks/useTitle";

const TechStack = lazy(() => import("./components/TechStack"));
const About = lazy(() => import("./components/About"));
const Contact = lazy(() => import("./components/Contact"));
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const PerfAccessibility = lazy(() => import("@/components/PerfAccessibility"));

function App() {
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  useTitle("Tanner Galambas | Front‑End Developer — Austin, TX");

  // Support deep-linking to sections when arriving from other routes
  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    const el = document.getElementById(id);
    if (!el) return;
    // slight delay allows layout to settle before measuring position
    setTimeout(() => {
      const nav = document.querySelector("nav");
      const navH = nav?.offsetHeight || 64;
      // Extra buffer per-section so the heading doesn't crowd the navbar
      let adjust = 24; // default
      if (id === "tech") adjust = 36; // bring Tech heading higher into view
      else if (id === "about") adjust = 44; // nudge About up slightly
      else if (id === "contact") adjust = 40;
      else if (id === "projects") adjust = 32;
      const top = el.getBoundingClientRect().top + window.pageYOffset - navH + adjust;
      window.scrollTo({ top, behavior: "smooth" });
    }, 0);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const preload = document.createElement("link");
    preload.rel = "preload";
    preload.as = "image";
    preload.href = headshotAvif640;
    preload.imagesrcset = `${headshotAvif320} 1x, ${headshotAvif640} 2x, ${headshotAvif960} 3x`;
    preload.imagesizes = "(min-width: 768px) 320px, 288px";
    document.head.appendChild(preload);

    return () => {
      if (preload.parentNode) {
        preload.parentNode.removeChild(preload);
      }
    };
  }, []);

  return (
    <>
      <BackgroundParticles />

      {/* Skip link for keyboard users */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only absolute left-2 top-2 z-[100] bg-white text-black px-3 py-1 rounded shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        Skip to content
      </a>
      <Navbar />
      {/* New hero layout/background/animations with old copy */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        id="main"
        role="main"
        className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center gradient-bg animate-gradient overflow-hidden"
      >
        {/* Floating geometric shapes */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 blur-xl"
          animate={
            reduceMotion
              ? { opacity: 0.25 }
              : { y: [-20, 20, -20], x: [-10, 10, -10], scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }
          }
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }
        />
        <motion.div
          className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-pink-400 to-blue-500 rounded-lg opacity-10 blur-xl rotate-45"
          animate={
            reduceMotion
              ? { opacity: 0.18 }
              : { rotate: [45, 225, 45], scale: [1, 0.8, 1], opacity: [0.1, 0.2, 0.1] }
          }
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }
        />

        {/* Main Content - Side by Side Layout */}
        <div className="z-10 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <motion.div
              className="lg:text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Name with Gradient Text */}
              <motion.h1
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-gradient"
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 100 }}
              >
                Tanner Galambas
              </motion.h1>

              {/* Rotating titles (typewriter) */}
              <motion.div
                className="text-xl md:text-2xl text-blue-100 mb-6 min-h-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
                <Typewriter
                  className="inline-block whitespace-nowrap"
                  items={[
                    "Front-End Developer",
                    "React Specialist",
                    "Accessibility & Performance",
                    "WordPress Expert",
                  ]}
                  typeSpeed={55}
                  backSpeed={25}
                  backDelay={1600}
                  loop
                  minCh={30}
                />
              </motion.div>

              {/* Old descriptive paragraph */}
              <motion.p
                className="text-lg md:text-xl text-slate-200 leading-relaxed mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                I build fast, responsive, and accessible websites with modern tools like React, Tailwind, and WordPress — focused on user experience and performance. Based in Austin, TX.
              </motion.p>
            </motion.div>

            {/* Right Side - Profile Image */}
            <motion.div
              className="relative lg:justify-self-center"
              initial={{ opacity: 0, x: 50, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.4, type: "spring", stiffness: 100 }}
            >
              <motion.div
                className="w-72 h-80 md:w-80 md:h-96 rounded-3xl overflow-hidden shadow-2xl glass animate-float relative mx-auto"
                whileHover={
                  reduceMotion
                    ? {}
                    : { scale: 1.05, rotateY: 5, rotateX: 5, transition: { duration: 0.3 } }
                }
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-20 animate-glow"
                  animate={reduceMotion ? { opacity: 0.2 } : { opacity: [0.2, 0.4, 0.2] }}
                  transition={
                    reduceMotion ? { duration: 0 } : { duration: 3, repeat: Infinity, ease: "easeInOut" }
                  }
                />
                <picture className="w-full h-full block relative z-10">
                  <source
                    type="image/avif"
                    srcSet={`${headshotAvif320} 1x, ${headshotAvif640} 2x, ${headshotAvif960} 3x`}
                    sizes="(min-width: 768px) 320px, 288px"
                  />
                  <source
                    type="image/webp"
                    srcSet={`${headshotWebp320} 1x, ${headshotWebp640} 2x, ${headshotWebp960} 3x`}
                    sizes="(min-width: 768px) 320px, 288px"
                  />
                  <img
                    src={headshotJpg640}
                    srcSet={`${headshotJpg640} 1x, ${headshotJpgRetina} 2x`}
                    sizes="(min-width: 768px) 320px, 288px"
                    width="640"
                    height="800"
                    fetchpriority="high"
                    decoding="sync"
                    alt="Portrait of Tanner Galambas smiling"
                    className="w-full h-full object-cover object-center"
                  />
                </picture>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* CTA Buttons */}
        <motion.div
          className="z-10 max-w-7xl mx-auto mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="#contact"
              className="group relative px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg overflow-hidden"
            whileHover={
              reduceMotion ? {} : { scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }
            }
            whileTap={reduceMotion ? {} : { scale: 0.95 }}
          >
              <span className="relative z-10">Get in Touch</span>
            </motion.a>
            <motion.a
              href="#projects"
              className="px-8 py-3 glass text-white font-semibold rounded-full border border-white/20 hover:bg-white/10 transition-all duration-300"
              whileHover={reduceMotion ? {} : { scale: 1.05 }}
              whileTap={reduceMotion ? {} : { scale: 0.95 }}
            >
              View My Work
            </motion.a>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        {!reduceMotion && (
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <motion.div
              className="w-1 h-12 bg-gradient-to-b from-blue-400 to-transparent rounded-full"
              animate={{ scaleY: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        )}
      </motion.div>

      <section id="tech" className="w-full mt-2 scroll-mt-36">
        <Suspense fallback={<div className="py-12" aria-hidden="true" />}> 
          <TechStack />
        </Suspense>
      </section>

      <section id="about" className="w-full mt-2 scroll-mt-24">
        <Suspense fallback={<div className="py-10" aria-hidden="true" />}> 
          <About />
        </Suspense>
      </section>

      {/* Performance section stands alone */}
      <section id="performance" className="w-full mt-2 px-2">
        <div className="max-w-6xl mx-auto">
          <Suspense fallback={<div className="py-10" aria-hidden="true" />}> 
            <PerfAccessibility />
          </Suspense>
        </div>
      </section>

      {/* Projects anchor lands at the actual list */}
      <section id="projects" className="w-full mt-2 px-2">
        <div className="max-w-6xl mx-auto">
          <Suspense fallback={<div className="py-10" aria-hidden="true" />}> 
            <ProjectsSection />
          </Suspense>
        </div>
      </section>

      <section id="contact" className="w-full mt-2 scroll-mt-16">
        <Suspense fallback={<div className="py-10" aria-hidden="true" />}> 
          <Contact />
        </Suspense>
      </section>

      <ScrollToTopButton />
      <Footer />
      {import.meta.env.PROD && <Analytics />}
    </>
  );
}

export default App;
