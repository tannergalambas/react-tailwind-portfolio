import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="py-6 text-center text-sm text-gray-400 bg-[#0f172a] flex flex-col items-center gap-2">
      <p>
        © {year} Tanner Galambas · Built with React, Tailwind CSS, Framer Motion, and Vite · Hosted on Vercel
      </p>
      <div className="flex gap-4 text-xl">
        <a
          href="https://github.com/tannergalambas"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors duration-200 flex items-center justify-center"
          aria-label="GitHub profile"
          title="GitHub"
        >
          <FaGithub aria-hidden="true" />
        </a>
        <a
          href="https://www.linkedin.com/in/tanner-galambas/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400 transition-colors duration-200 flex items-center justify-center"
          aria-label="LinkedIn profile"
          title="LinkedIn"
        >
          <FaLinkedin aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
