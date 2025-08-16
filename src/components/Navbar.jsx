import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false); // Close menu when a link is clicked
  };

  return (
    <nav className="w-full py-4 bg-white shadow-md fixed top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Tanner Galambas</h1>

        {/* Desktop nav */}
        <div className="hidden md:flex space-x-6">
          <a href="#tech" className="text-gray-700 hover:text-blue-500">Tech</a>
          <a href="#about" className="text-gray-700 hover:text-blue-500">About</a>
          <a href="#contact" className="text-gray-700 hover:text-blue-500">Contact</a>
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 focus:outline-none"
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
            className="md:hidden px-4 pt-2 pb-4 space-y-2 bg-white shadow-md"
          >
            <a onClick={handleLinkClick} href="#tech" className="block text-gray-700 hover:text-blue-500">Tech</a>
            <a onClick={handleLinkClick} href="#about" className="block text-gray-700 hover:text-blue-500">About</a>
            <a onClick={handleLinkClick} href="#contact" className="block text-gray-700 hover:text-blue-500">Contact</a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;