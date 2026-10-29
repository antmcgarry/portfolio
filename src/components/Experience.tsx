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
        initial={false}
        animate={isInView ? { opacity: 1, x: 0 } : undefined}
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
        "year": "2023 to present",
        "title": "Principal Lead Frontend Developer",
        "company": "Acorn Insurance, Acorn Group",
        "description": "Previously Lead Front-End Software Engineer. I lead 15+ engineers across seven squads and set frontend standards across the group's insurance brands. I introduced Module Federation, Vite, Vitest and Playwright. I led a React car insurance quote-and-buy journey and introduced a React Native taxi app using Expo and Maestro. I build shared UI components and private npm packages, support Claude and Cursor adoption, and guide colleagues through progression plans and one-to-ones."
    },
    {
        "year": "2022 to 2023",
        "title": "Senior Front-End Software Engineer",
        "company": "Players' Lounge",
        "description": "Built React, Next.js and React Native applications in TypeScript. Delivered an MVP for the Peerless esports wagering application in three months. Worked with onshore and offshore engineers, designers and product owners using Kanban, with GraphQL and Apollo in the stack."
    },
    {
        "year": "2021 to 2022",
        "title": "Lead Front-End Software Engineer",
        "company": "Acorn Insurance",
        "description": "Built and maintained React and TypeScript applications, including a quote-and-buy journey for private car insurance. Worked with engineers, designers, product owners and client stakeholders on technical solutions to business requirements."
    },
    {
        "year": "2019 to 2021",
        "title": "Software Engineer",
        "company": "Fourth Wall Creative",
        "description": "Built ticketing and event management software for Premier League football clubs using React, TypeScript and Laravel. Developed a package fulfilment application so clubs could track product distribution to members and record satisfaction."
    },
    {
        "year": "2017 to 2019",
        "title": "Software Engineer",
        "company": "Nova Ltd",
        "description": "Built digital products with entrepreneurs and venture teams using React, React Native and TypeScript. Released DLG Inventory, DLG Spellbook, UMII and Thrift on app stores. Managed engineering intern recruitment in 2018 and 2019, then supervised their development and training."
    },
    {
        "year": "2015 to 2017",
        "title": "Game Developer",
        "company": "CyberGaTE, Edge Hill University",
        "description": "Led the game development team and built a cybersecurity gamification game with Unity 3D and C#."
    }
];

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-20 bg-white dark:bg-gray-800"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          initial={false}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-16"
        >
          Professional experience
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
