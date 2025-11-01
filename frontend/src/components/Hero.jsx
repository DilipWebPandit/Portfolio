import React from "react";
import {
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaGithub,
  FaArrowDown,
  FaRocket,
} from "react-icons/fa";
import { RiMessage3Fill } from "react-icons/ri";
import { SiMongodb, SiExpress, SiTailwindcss } from "react-icons/si";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-[url('/bg3.webp')] bg-cover bg-center"
        style={{
          backgroundAttachment: "fixed", // parallax feel
        }}
      ></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-gray-900/60 to-black/80 backdrop-blur-[2px]"></div>

      {/* Content */}
      <div className="relative z-10 px-4 text-white">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
          Hi, I'm{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
            Dilip
          </span>
        </h1>

        <p className="mt-4 text-xl text-gray-200 max-w-2xl mx-auto">
          I’m a <strong>Full Stack Web Developer</strong> passionate about
          building dynamic, scalable, and visually engaging web applications
          using the{" "}
          <span className="font-semibold text-indigo-400">MERN Stack</span>.
        </p>

        {/* Tech Icons */}
        <div className="flex flex-wrap justify-center gap-6 mt-8 text-4xl text-indigo-400">
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
          <FaDatabase
            className="hover:scale-110 transition-transform duration-300"
            title="Databases"
          />
        </div>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="#projects"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg hover:bg-indigo-700 transition-all"
          >
            <FaRocket className="inline" /> View Projects
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border border-indigo-400 text-indigo-400 rounded-lg hover:bg-indigo-500 hover:text-white transition-all"
          >
            <RiMessage3Fill className="inline text-white" /> Contact Me
          </a>
          {/* <a
            href="/adminDashboard"
            className="px-6 py-3 border border-purple-400 text-purple-400 rounded-lg hover:bg-purple-500 hover:text-white transition-all"
          >
            🛠 Upload Project
          </a> */}
        </div>

        {/* Down Arrow */}
        <div className="mt-16 flex justify-center items-center animate-bounce text-gray-300">
          <FaArrowDown className="text-3xl" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
