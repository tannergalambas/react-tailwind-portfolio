import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="w-full py-4 bg-gray-900 text-white shadow-md fixed top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Tanner Galambas</h1>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6 text-sm">
          <a href="#tech" className="hover:text-blue-400 transition">Tech</a>
          <a href="#about" className="hover:text-blue-400 transition">About</a>
          <a href="#contact" className="hover:text-blue-400 transition">Contact</a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
            Resume
          </a>
          <a href="https://github.com/tannergalambas" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
            <FaGithub size={18} />
          </a>
          <a href="https://www.linkedin.com/in/tanner-galambas/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
            <FaLinkedin size={18} />
          </a>
        </div>

        {/* Mobile Right Section: GitHub + LinkedIn + Hamburger */}
        <div className="md:hidden flex items-center space-x-4">
          <a
            href="https://github.com/tannergalambas"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
            aria-label="GitHub"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/tanner-galambas/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={20} />
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
      </div> {/* ✅ This closes the main flex container */}

      {/* Animated Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden px-4 pt-2 pb-4 space-y-4 bg-gray-900 text-white shadow-md"
          >
            <a onClick={handleLinkClick} href="#tech" className="block hover:text-blue-400">Tech</a>
            <a onClick={handleLinkClick} href="#about" className="block hover:text-blue-400">About</a>
            <a onClick={handleLinkClick} href="#contact" className="block hover:text-blue-400">Contact</a>
            <a onClick={handleLinkClick} href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="block hover:text-blue-400">
              Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;