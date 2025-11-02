import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  FaExternalLinkAlt,
  FaGithub,
  FaHtml5,
  FaBootstrap,
} from "react-icons/fa";
import { SiMongodb, SiExpress, SiReact, SiNodedotjs } from "react-icons/si";
import { FaSquareJs, FaCss3Alt } from "react-icons/fa6";
import { MdApi } from "react-icons/md";

const Project = () => {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();
  const scrollRef = useRef(null);

  const projects = [
    {
      title: "Blog Website",
      desc: "A full-stack blog app built with Express, MongoDB, and React where users can create, edit, and comment on articles.",
      img: "/projects/connectWrite.png",
      demo: "https://connectwrite.onrender.com",
      github: "https://github.com/DilipWebPandit/ConnectWrite",
      stack: [
        <FaHtml5 />,
        <FaBootstrap />,
        <img src="/ejs.png" alt="ejs image" className="h-7 w-6" />,
        <FaSquareJs />,
        <SiExpress />,
        <SiMongodb />,
      ],
    },
    {
      title: "Recipe Website",
      desc: "Recipe Explorer — your tasty companion to discover mouth-watering recipes by category! From crispy chicken to fluffy cakes and cheesy pizzas, explore, cook, and enjoy step-by-step recipes made just for you.",
      img: "/projects/recipieWebsite.png",
      demo: "https://tastetrail-recipe-1.onrender.com",
      github: "https://github.com/DilipWebPandit/TasteTrail_Recipe",
      stack: [
        <FaHtml5 />,
        <FaCss3Alt />,
        <FaSquareJs />,
        <MdApi title="API" />,
      ],
    },
    {
      title: "Portfolio Site",
      desc: "This personal portfolio showcasing my work, built using React and Tailwind CSS with smooth dark/light mode support.",
      img: "/projects/portfolio.png",
      demo: "#",
      github: "https://github.com/DilipWebPandit",
      stack: [<SiReact />, <SiNodedotjs />, <SiExpress />],
    },
    {
      title: "EmojiHub",
      desc: "EmojiHub is a simple and interactive web application built with React that allows users to explore and download emojis by category and file type (PNG or SVG). It fetches data from a public emoji API and provides a clean, responsive interface for users to browse, filter, and download their favorite emojis",
      img: "/projects/emojiHub.png",
      demo: "https://emojihub-dilo.onrender.com",
      github: "https://github.com/DilipWebPandit/EmojiHub",
      stack: [<SiReact />, <MdApi title="API" />],
    },
  ];

  // ==== ⚙️ Animation Setup ====
  // Each card width = 320px + 40px gap = 360px
  const cardWidth = 360;
  const totalWidth = cardWidth * projects.length;

  useEffect(() => {
    // Animation speed based on device width
    let speed = 30; // Default (desktop)
    if (window.innerWidth < 640) speed = 20; // Mobile
    else if (window.innerWidth < 1024) speed = 25; // Tablet

    // When not hovered — start the infinite scroll animation
    if (!isHovered) {
      controls.start({
        x: [0, -totalWidth], // Moves from 0px to negative total width
        transition: {
          ease: "linear",
          duration: speed,
          repeat: Infinity, // Repeat forever
        },
      });
    } else {
      // Pause animation on hover
      controls.stop();
    }
  }, [isHovered, controls, totalWidth]);

  useEffect(() => {
    const slider = scrollRef.current;
    let isDown = false;
    let startX, scrollLeft;

    // On mouse down — start dragging
    const mouseDown = (e) => {
      isDown = true;
      slider.classList.add("cursor-grabbing");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    // On mouse leave — stop dragging
    const mouseLeave = () => {
      isDown = false;
      slider.classList.remove("cursor-grabbing");
    };

    // On mouse up — stop dragging
    const mouseUp = () => {
      isDown = false;
      slider.classList.remove("cursor-grabbing");
    };

    // On mouse move — perform manual scroll
    const mouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2; // Scroll speed multiplier
      slider.scrollLeft = scrollLeft - walk;
    };

    // Add event listeners
    slider.addEventListener("mousedown", mouseDown);
    slider.addEventListener("mouseleave", mouseLeave);
    slider.addEventListener("mouseup", mouseUp);
    slider.addEventListener("mousemove", mouseMove);

    // Clean up listeners on unmount
    return () => {
      slider.removeEventListener("mousedown", mouseDown);
      slider.removeEventListener("mouseleave", mouseLeave);
      slider.removeEventListener("mouseup", mouseUp);
      slider.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  return (
    <section
      id="projects"
      className="py-24 bg-linear-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden"
    >
      <div className="max-w-8xl mx-auto px-6 text-center relative">
        {/* Section Heading */}
        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-14">
          <span className="text-indigo-600 dark:text-indigo-400">My</span>{" "}
          Projects
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">
          A showcase of my favorite projects built with modern web technologies
          — from full-stack apps to dynamic frontends. Each project reflects my
          passion for clean design, scalability, and performance.
        </p>

        {/* {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative inset-0 bg-black/30 backdrop-blur-md z-0 flex items-center justify-center"
          >
            <h1 className="text-white text-4xl font-bold">
              Blurry Background {console.log(hoveredIndex)}
            </h1>
          </motion.div>
        )} */}

        {/* === Scrollable Container (Manual + Auto Scroll) === */}
        <div
          ref={scrollRef}
          className="overflow-x-auto scrollbar-hide scroll-container"
          style={{
            display: "flex",
            overflowX: "scroll",
            scrollbarWidth: "none", // For Firefox
            msOverflowStyle: "none", // For Internet Explorer and Edge
          }}
        >
          <motion.div
            className="flex gap-10 cursor-grab active:cursor-grabbing"
            animate={controls}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* We duplicate project list for seamless infinite loop */}
            {[...projects, ...projects].map((proj, index) => (
              <motion.div
                key={index}
                className="group bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl 
                hover:-translate-y-2 transform transition-all duration-300 overflow-hidden border 
                border-transparent hover:border-indigo-500/40 min-w-[320px] h-[450px]"
              >
                {/* === Project Image === */}
                <div className="overflow-hidden shrink-0">
                  <img
                    src={proj.img}
                    alt={proj.title}
                    className="rounded-t-2xl w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* === Project Details === */}
                <div className="p-6 text-left flex flex-col grow">
                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {proj.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                    {proj.desc}
                  </p>

                  {/* Tech Stack Icons */}
                  <div className="flex gap-3 text-indigo-600 dark:text-indigo-400 text-2xl mb-4">
                    {proj.stack.map((icon, i) => (
                      <span
                        key={i}
                        className="hover:scale-110 transition-transform duration-300"
                      >
                        {icon}
                      </span>
                    ))}
                  </div>

                  {/* === Demo & GitHub Links === */}
                  <div className="flex gap-5 mt-auto">
                    <a
                      href={proj.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:underline hover:scale-105 transition-transform"
                    >
                      <FaExternalLinkAlt /> Live Demo
                    </a>
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:underline hover:scale-105 transition-transform"
                    >
                      <FaGithub /> GitHub
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Gradient overlay on both sides for visual fade */}
        <div className="pointer-events-none absolute top-0 left-0 w-20 h-full bg-linear-to-r from-gray-100 dark:from-gray-900 via-transparent to-transparent"></div>
        <div className="pointer-events-none absolute top-0 right-0 w-20 h-full bg-linear-to-l from-gray-100 dark:from-gray-900 via-transparent to-transparent"></div>
      </div>
    </section>
  );
};

export default Project;
