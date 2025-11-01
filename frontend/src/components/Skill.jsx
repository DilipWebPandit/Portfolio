import React from "react";
import { motion } from "framer-motion";

import skills from "../assets/skills.json";

// const skills = [
//   {
//     name: "HTML",
//     icon: "/icons/html.svg",
//     color: "from-orange-500 to-yellow-400",
//   },
//   { name: "CSS", icon: "/icons/css.svg", color: "from-blue-500 to-cyan-400" },
//   {
//     name: "JavaScript",
//     icon: "/icons/js.svg",
//     color: "from-yellow-400 to-amber-500",
//   },
//   {
//     name: "React",
//     icon: "/icons/react.svg",
//     color: "from-cyan-400 to-blue-500",
//   },
//   {
//     name: "Node.js",
//     icon: "/icons/node.svg",
//     color: "from-green-500 to-lime-400",
//   },
//   {
//     name: "MongoDB",
//     icon: "/icons/mongodb.svg",
//     color: "from-emerald-500 to-green-400",
//   },
//   {
//     name: "MySQL",
//     icon: "/icons/mysql.svg",
//     color: "from-sky-500 to-blue-600",
//   },
// ];

const Skill = () => {
  // Calculate total width needed for seamless loop
  // Each card is 320px + 40px gap = 360px per card
  const cardWidth = 150; // 320px card + 40px gap (gap-10 = 2.5rem = 40px)
  const totalCards = skills.length;
  const totalWidth = cardWidth * totalCards - 40;
  let speed = 30;

  return (
    <section
      id="skills"
      className="py-24 bg-linear-to-b from-gray-950 via-gray-900 to-gray-800 overflow-hidden relative"
    >
      <div className="max-w-6xl mx-auto text-center px-6">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold text-white mb-14 tracking-wide"
        >
          Tech Stack
        </motion.h2>

        {/* Moving Skills Row */}
        <div className="relative w-full overflow-hidden">
          {/* {window.innerWidth < 640 && (speed = 20)} */}
          <motion.div
            className="flex gap-8 md:gap-10"
            animate={{ x: ["0%", -totalWidth] }}
            transition={{ ease: "linear", duration: speed, repeat: Infinity }}
          >
            {[...skills, ...skills].map((skill, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1, rotate: 2 }}
                className={`min-w-[130px] md:min-w-[150px] rounded-2xl p-5 shadow-lg 
                bg-linear-to-b from-gray-800 to-gray-900 hover:shadow-[0_0_20px_#6366f1] 
                border border-transparent hover:border-indigo-400/50 transition-all duration-500 
                flex flex-col items-center justify-center my-10 relative group`}
              >
                {/* Color glow behind icon */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 blur-xl 
                  transition-all duration-500 bg-linear-to-r ${skill.color}`}
                ></div>

                <motion.img
                  src={skill.icon}
                  alt={skill.name}
                  className="h-14 w-14 mb-3 relative z-10 drop-shadow-[0_0_12px_rgba(255,255,255,0.5)] 
                  transition-transform duration-500 group-hover:scale-110"
                />
                <p className="text-sm md:text-base font-medium text-gray-200 relative z-10">
                  {skill.name}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Edge gradient fade */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-gray-950 via-transparent to-gray-950"></div>
    </section>
  );
};

export default Skill;
