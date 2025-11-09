"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import TechnicalSkills from "./TechnicalSkills";

export default function AboutMe() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 bg-gray-50 dark:bg-gray-900"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.h2
            variants={childVariants}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            About Me
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
            {/* Image column */}
            <motion.div
              variants={childVariants}
              className="flex justify-center"
            >
              <div className="relative w-48 h-48 md:w-56 md:h-56 overflow-hidden rounded-full border-4 border-blue-500">
                <Image
                  src="/images/me.png"
                  alt="Anthony McGarry"
                  fill
                  sizes="(max-width: 768px) 192px, 224px"
                  className="object-cover"
                />
              </div>
            </motion.div>

            {/* Bio column */}
            <motion.div variants={childVariants} className="md:col-span-2">
              <p className="text-lg mb-4">
                I&apos;m a keen front-end developer with over 10 years&apos;
                experience crafting modern web applications. I specialise in
                React and TypeScript, building intuitive interfaces that provide
                brilliant user experiences.
              </p>
              <p className="text-lg mb-4">
                My tech journey started with a fascination for interactive
                applications. Now I turn complex requirements into elegant code,
                with a focus on performance and accessibility. I&apos;m
                particularly passionate about architecture and responsive
                design.
              </p>
            </motion.div>
          </div>

          {/* Skills section - now using the TechnicalSkills component */}
          <motion.div variants={childVariants}>
            <TechnicalSkills />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
