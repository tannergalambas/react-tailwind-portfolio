// src/components/Navbar.jsx
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleLinkClick = () => setIsOpen(false);

  const linkClasses = ({ isActive }) =>
    `hover:text-blue-400 transition px-2 py-1 rounded ${isActive ? "bg-white/10" : ""}`;

  return (
    <nav className="w-full py-4 bg-gray-900 text-white shadow-md fixed top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Tanner Galambas</h1>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6 text-sm">
          {/* section anchors use absolute hashes so they work from any route */}
          <a href="/#tech" className="hover:text-blue-400 transition">Tech</a>
          <a href="/#about" className="hover:text-blue-400 transition">About</a>
          <a href="/#contact" className="hover:text-blue-400 transition">Contact</a>

          {/* Resume page */}
          <NavLink to="/resume" className={linkClasses} aria-label="Open resume page">
            Resume
          </NavLink>

          {/* Explicit desktop PDF button (outline style) */}
          <a
            href={`${import.meta.env.BASE_URL}resume.pdf`}
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex items-center gap-1 rounded bg-blue-600 px-3 py-1 text-xs text-white font-medium hover:bg-blue-700 transition"
            aria-label="Download Resume (PDF)"
            title="Download Resume (PDF)"
          >
            Resume (PDF)
          </a>

          <a
            href="https://github.com/tannergalambas"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
            aria-label="GitHub"
          >
            <FaGithub size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/tanner-galambas/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={18} />
          </a>
        </div>

        {/* Mobile Right Section */}
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
      </div>

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
            <a onClick={handleLinkClick} href="/#tech" className="block hover:text-blue-400">Tech</a>
            <a onClick={handleLinkClick} href="/#about" className="block hover:text-blue-400">About</a>
            <a onClick={handleLinkClick} href="/#contact" className="block hover:text-blue-400">Contact</a>

            {/* Resume page */}
            <NavLink
              to="/resume"
              className="block hover:text-blue-400"
              onClick={handleLinkClick}
              aria-label="Open resume page"
            >
              Resume
            </NavLink>

            {/* Mobile Resume PDF */}
            <a
              onClick={handleLinkClick}
              href={`${import.meta.env.BASE_URL}resume.pdf`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-slate-300 hover:text-blue-400"
              aria-label="Download PDF resume"
            >
              <FiDownload size={14} /> Resume (PDF)
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;