import React from "react";
import { FaReact, FaNodeJs, FaGithub } from "react-icons/fa";
import { SiMongodb, SiExpress, SiTailwindcss } from "react-icons/si";

const About = () => {
  return (
    <section
      id="about"
      className="py-24 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Profile Image */}
        <div className="relative group">
          <img
            src="/portfolioLeft.png"
            alt="Profile"
            className="rounded-2xl shadow-xl w-full object-cover border-4 border-transparent group-hover:border-indigo-500 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 rounded-2xl transition-all duration-500"></div>
        </div>

        {/* About Content */}
        <div className="text-center md:text-left">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            About{" "}
            <span className="text-indigo-600 dark:text-indigo-400">Me</span>
          </h2>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            I'm a{" "}
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">
              Full Stack Web Developer{" "}
            </span>
            who loves crafting responsive, scalable, and visually engaging web
            applications. My goal is to turn ideas into real-world digital
            products that perform beautifully.
          </p>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            I specialize in the{" "}
            <span className="font-semibold text-purple-600 dark:text-purple-400">
              MERN stack
            </span>{" "}
            — building interactive frontends and robust backends. As a fresher,
            I’m passionate about learning new technologies, exploring modern
            frameworks, and tackling real-world coding challenges to sharpen my
            skills.
          </p>

          {/* Tech Stack Icons */}
          <div className="flex flex-wrap justify-center md:justify-start gap-5 text-3xl mb-8 text-indigo-600 dark:text-indigo-400">
            <FaReact
              className="hover:scale-110 transition-transform duration-300"
              title="React"
            />
            <SiExpress
              className="hover:scale-110 transition-transform duration-300"
              title="Express.js"
            />
            <FaNodeJs
              className="hover:scale-110 transition-transform duration-300"
              title="Node.js"
            />
            <SiMongodb
              className="hover:scale-110 transition-transform duration-300"
              title="MongoDB"
            />
            <SiTailwindcss
              className="hover:scale-110 transition-transform duration-300"
              title="Tailwind CSS"
            />
            <FaGithub
              className="hover:scale-110 transition-transform duration-300"
              title="GitHub"
            />
          </div>

          {/* Contact Button */}
          <a
            href="#contact"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all"
          >
            Let’s Connect
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
