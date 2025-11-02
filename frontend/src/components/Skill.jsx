import React, { useState, useEffect } from "react";
import { motion, useAnimationFrame } from "framer-motion";

import skills from "../assets/skills.json";

const Skill = () => {
  const [centerIndex, setCenterIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const cardWidth = 150;
  const totalCards = skills.length;
  const totalWidth = cardWidth * totalCards - 40;
  let speed = 30;

  // Detect if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is md breakpoint in Tailwind
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Track which card is in the center - only on mobile
  useAnimationFrame((time) => {
    if (!isMobile) {
      setCenterIndex(null);
      return;
    }

    // Calculate current position in the animation cycle
    const progress = (time / (speed * 1000)) % 1;
    const currentX = -progress * totalWidth;

    // Get viewport center
    const viewportCenter = window.innerWidth / 2;

    // Find which card is closest to center
    const duplicatedSkills = [...skills, ...skills];
    let closestIndex = null;
    let minDistance = Infinity;

    duplicatedSkills.forEach((_, index) => {
      const cardPosition = currentX + index * cardWidth;
      const distance = Math.abs(cardPosition + 75 - viewportCenter); // 75 is half card width

      if (distance < minDistance && distance < 150) {
        // Within 150px of center
        minDistance = distance;
        closestIndex = index;
      }
    });

    setCenterIndex(closestIndex);
  });

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
          <motion.div
            className="flex gap-8 md:gap-10"
            animate={{ x: ["0%", `${-totalWidth}px`] }}
            transition={{ ease: "linear", duration: speed, repeat: Infinity }}
          >
            {[...skills, ...skills].map((skill, index) => {
              const isCenter = isMobile && centerIndex === index;

              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1, rotate: 2 }}
                  animate={{
                    scale: isCenter ? 1.15 : 1,
                    rotate: isCenter ? 2 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className={`min-w-[130px] md:min-w-[150px] rounded-2xl p-5 shadow-lg 
                  bg-linear-to-b from-gray-800 to-gray-900 hover:shadow-[0_0_20px_#6366f1]
                  border transition-all duration-500 flex flex-col items-center justify-center my-10 relative group
                  ${
                    isMobile && isCenter
                      ? "border-indigo-400/50 shadow-[0_0_25px_#6366f1]"
                      : "border-transparent hover:border-indigo-400/50"
                  }`}
                >
                  {/* Single Color glow - mobile center OR desktop/mobile hover */}
                  <div
                    className={`absolute inset-0 blur-xl transition-all duration-500 bg-linear-to-r ${
                      skill.color
                    }
                    ${
                      isCenter
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  ></div>

                  <motion.img
                    src={skill.icon}
                    alt={skill.name}
                    animate={{
                      scale: isCenter ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    className="h-14 w-14 mb-3 relative z-10 drop-shadow-[0_0_12px_rgba(255,255,255,0.5)] 
                    transition-transform duration-500 group-hover:scale-110"
                  />
                  <p className="text-sm md:text-base font-medium text-gray-200 relative z-10">
                    {skill.name}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Edge gradient fade */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-gray-950 via-transparent to-gray-950"></div>
    </section>
  );
};

export default Skill;
