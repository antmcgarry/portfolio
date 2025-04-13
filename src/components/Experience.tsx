"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

// Timeline element component
const TimelineItem = ({
  year,
  title,
  company,
  description,
  index,
  isInView,
}: {
  year: string;
  title: string;
  company: string;
  description: string;
  index: number;
  isInView: boolean;
}) => {
  const isEven = index % 2 === 0;

  return (
    <div
      className={`relative flex ${isEven ? "justify-start" : "justify-end"} md:justify-normal md:even:ml-auto md:odd:mr-auto md:w-1/2 mb-8`}
    >
      {/* Timeline dot and line */}
      <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full">
        <div className="h-full w-px bg-blue-400 dark:bg-blue-600 mx-auto"></div>
        <div className="absolute top-7 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-500"></div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -20 : 20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className={`relative ml-8 md:ml-0 ${isEven ? "md:mr-12" : "md:ml-12"} p-5 rounded-lg shadow-md bg-white dark:bg-gray-800`}
      >
        <div className="text-sm text-blue-500 font-semibold mb-1">{year}</div>
        <h3 className="text-lg font-bold mb-1">{title}</h3>
        <div className="text-gray-600 dark:text-gray-300 mb-3">{company}</div>
        <p className="text-gray-700 dark:text-gray-300">{description}</p>
      </motion.div>
    </div>
  );
};

export default function Experience() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const experiences = [
    {
      year: "2023 - Present",
      title: "Lead Front-End Software Engineer",
      company: "Acorn Insurance",
      description:
        "Leading a team of front-end developers across multiple projects using React-Native, React, and TypeScript. Spearheaded development of a React-based car insurance quote-and-buy journey, implemented Test-Driven Development, and developed a React Native mobile app. Facilitated cross-functional collaboration between engineers, designers, and stakeholders to deliver technical solutions for complex business cases.",
    },
    {
      year: "2022 - 2023",
      title: "Senior Front-End Software Engineer",
      company: "Players' Lounge",
      description:
        "Developed stable and maintainable apps using React, Next.js, React-Native, and TypeScript. Successfully built an MVP for a Peerless wagering application in just 3 months, enabling users to bet on themselves in the ESports industry. Worked in a cross-functional team both onshore and offshore with designers, engineers, and product owners using Kanban methodology.",
    },
    {
      year: "2021 - 2022",
      title: "Lead Front-End Software Engineer",
      company: "Acorn Insurance",
      description:
        "Developed multiple stable and maintainable applications using React with TypeScript. Successfully delivered a quote-and-buy journey application for private car insurance. Collaborated closely with engineers, designers, product owners, and client stakeholders to develop technical solutions for complex business requirements.",
    },
    {
      year: "2019 - 2021",
      title: "Software Engineer",
      company: "Fourth Wall Creative",
      description:
        "Worked alongside premier league football clubs to develop leading software for distributing and managing ticket sales. Built an application for managing package fulfillment for football club members, allowing clubs to track product distribution and member satisfaction. Used React, TypeScript, and Laravel in a collaborative environment.",
    },
    {
      year: "2017 - 2019",
      title: "Software Engineer",
      company: "Nova LTD",
      description:
        "Delivered innovative digital products for entrepreneurs using React, React-Native, and TypeScript. Successfully developed and released multiple mobile apps to Google Play and Apple App Store, including DLG inventory, DLG Spellbook, UMII, and Thrift. Managed software engineer intern recruitment and supervision, creating training materials to help interns progress.",
    },
  ];

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-20 bg-white dark:bg-gray-800"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-16"
        >
          Professional Experience
        </motion.h2>

        <div className="relative max-w-5xl mx-auto">
          {/* Vertical line for larger screens */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full">
            <div className="h-full w-px bg-blue-400 dark:bg-blue-600"></div>
          </div>

          {/* Experience items */}
          {experiences.map((exp, index) => (
            <TimelineItem
              key={index}
              index={index}
              isInView={isInView}
              year={exp.year}
              title={exp.title}
              company={exp.company}
              description={exp.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
