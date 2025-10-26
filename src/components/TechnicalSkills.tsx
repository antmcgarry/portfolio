"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { FaReact, FaNodeJs, FaMobile } from "react-icons/fa";
import {
  SiTypescript,
  SiJavascript,
  SiNextdotjs,
  SiExpress,
  SiTailwindcss,
  SiCss3,
  SiRedux,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import { VscDebugConsole } from "react-icons/vsc";
import { LuTestTube } from "react-icons/lu";

// Map skills to icons and colors
const skillsData = [
  { name: "React", icon: FaReact, color: "#61DAFB" },
  { name: "React Native", icon: FaMobile, color: "#61DAFB" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "ExpressJS", icon: SiExpress, color: "#FFFFFF" },
  { name: "NodeJS", icon: FaNodeJs, color: "#339933" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "CSS/SCSS", icon: SiCss3, color: "#1572B6" },
  { name: "API Integration", icon: TbApi, color: "#FF6B6B" },
  { name: "State Management", icon: SiRedux, color: "#764ABC" },
  { name: "Testing", icon: LuTestTube, color: "#E33332" },
  { name: "End-to-End Testing", icon: VscDebugConsole, color: "#4CAF50" },
];

export default function TechnicalSkills() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  // Initialize with a function to get the correct initial value
  const [itemsPerPage, setItemsPerPage] = useState(() => {
    if (typeof globalThis.window === "undefined") return 4;
    const width = globalThis.window.innerWidth;
    if (width < 640) return 2;
    if (width < 768) return 3;
    if (width < 1024) return 4;
    return 5;
  });

  const [windowWidth, setWindowWidth] = useState(() =>
    typeof globalThis.window === "undefined" ? 0 : globalThis.window.innerWidth
  );

  const carouselRef = useRef(null);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);

      if (width < 640) {
        setItemsPerPage(2);
      } else if (width < 768) {
        setItemsPerPage(3);
      } else if (width < 1024) {
        setItemsPerPage(4);
      } else {
        setItemsPerPage(5);
      }
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(skillsData.length / itemsPerPage);

  // Auto-rotate carousel - pause on hover
  useEffect(() => {
    if (hoveredSkill !== null) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages);
    }, 4000);

    return () => clearInterval(interval);
  }, [totalPages, hoveredSkill]);

  // Variants for animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.6,
      },
    },
  };

  // Get current page items
  const getCurrentItems = () => {
    const startIndex = currentIndex * itemsPerPage;
    return skillsData.slice(startIndex, startIndex + itemsPerPage);
  };

  // Handle manual navigation
  const goToPage = (index: number) => {
    setCurrentIndex(index);
  };

  // Handle next and previous
  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <div className="mt-16 py-8">
      <motion.h3
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-xl md:text-2xl font-semibold mb-8 md:mb-10 text-center relative"
      >
        <span className="bg-clip-text text-white">Technical Skills</span>
        <div className="absolute w-16 md:w-20 h-1 bg-white bottom-[-8px] md:bottom-[-10px] left-1/2 transform -translate-x-1/2 rounded-full"></div>
      </motion.h3>

      <div className="relative overflow-hidden max-w-4xl mx-auto px-4 md:px-6">
        {/* Navigation arrows */}
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10">
          <button
            onClick={goToPrev}
            className="bg-white/10 backdrop-blur-md hover:bg-white/20 dark:bg-gray-800/30 dark:hover:bg-gray-800/50 p-1 md:p-2 rounded-full shadow-lg border border-gray-200/20 dark:border-gray-700/30 transition-all duration-300"
            aria-label="Previous skills"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 md:h-5 md:w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>

        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10">
          <button
            onClick={goToNext}
            className="bg-white/10 backdrop-blur-md hover:bg-white/20 dark:bg-gray-800/30 dark:hover:bg-gray-800/50 p-1 md:p-2 rounded-full shadow-lg border border-gray-200/20 dark:border-gray-700/30 transition-all duration-300"
            aria-label="Next skills"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 md:h-5 md:w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        <motion.div
          className="flex justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 my-6 md:my-10"
          ref={carouselRef}
          key={currentIndex}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {getCurrentItems().map((skill, index) => (
            <motion.div
              key={`${currentIndex}-${index}`}
              variants={itemVariants}
              className="flex flex-col items-center"
              onMouseEnter={() => setHoveredSkill(index)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <motion.div
                className="relative flex items-center justify-center w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-xl md:rounded-2xl shadow-lg mb-3 md:mb-4 overflow-hidden backdrop-blur-sm"
                style={{
                  background: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))`,
                  boxShadow: `0 8px 32px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(255,255,255,0.1)`,
                  border: `1px solid rgba(255,255,255,0.08)`,
                }}
                whileHover={{
                  y: -5,
                  boxShadow: `0 15px 30px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(255,255,255,0.2)`,
                  transition: { duration: 0.2 },
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 dark:to-white/5"></div>
                {/* Subtle glow effect */}
                <motion.div
                  className="absolute inset-0 opacity-0"
                  animate={{ opacity: hoveredSkill === index ? 0.7 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                <skill.icon
                  size={windowWidth < 640 ? 28 : windowWidth < 768 ? 32 : 36}
                  color={skill.color}
                  className="relative z-10"
                />
              </motion.div>
              <motion.span
                className="text-xs sm:text-sm font-medium text-center"
                animate={{
                  scale: hoveredSkill === index ? 1.05 : 1,
                  color: hoveredSkill === index ? skill.color : "",
                }}
                transition={{ duration: 0.2 }}
              >
                {skill.name}
              </motion.span>
            </motion.div>
          ))}
        </motion.div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 md:gap-3 mt-6 md:mt-8">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`w-2 md:w-2.5 h-2 md:h-2.5 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "bg-white w-6 md:w-8"
                  : "bg-gray-300/50 dark:bg-gray-600/50 hover:bg-gray-400 dark:hover:bg-gray-500"
              }`}
              onClick={() => goToPage(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
