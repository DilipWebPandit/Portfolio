import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400 py-10 relative overflow-hidden">
      {/* Gradient border line on top */}
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Top: Navigation + Socials */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-700 pb-6 mb-6">
          {/* Brand */}
          <h2 className="text-2xl font-bold text-white mb-4 md:mb-0 hover:text-indigo-400 transition">
            Dilip
          </h2>

          {/* Navigation Links */}
          <ul className="flex flex-wrap justify-center gap-6">
            <li>
              <a href="#about" className="hover:text-indigo-400 transition">
                About
              </a>
            </li>
            <li>
              <a href="#skills" className="hover:text-indigo-400 transition">
                Skills
              </a>
            </li>
            <li>
              <a href="#projects" className="hover:text-indigo-400 transition">
                Projects
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-indigo-400 transition">
                Contact
              </a>
            </li>
          </ul>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4 md:mt-0">
            <a
              href="https://github.com/DilipWebPandit"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400 transition transform hover:scale-110"
            >
              <FaGithub className="text-xl" />
            </a>
            <a
              href="www.linkedin.com/in/dilip-kumar-6533a424b"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400 transition transform hover:scale-110"
            >
              <FaLinkedin className="text-xl" />
            </a>
            <a
              href="mailto:dilip7065kumar@gmail.com"
              className="hover:text-indigo-400 transition transform hover:scale-110"
            >
              <FaEnvelope className="text-xl" />
            </a>
          </div>
        </div>

        {/* Bottom: Copyright */}
        <div className="text-center text-sm text-gray-500">
          © {year} <span className="text-indigo-400 font-medium">Dilip</span>.
          All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
