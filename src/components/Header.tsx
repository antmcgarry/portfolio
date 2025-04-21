"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 px-4 py-3 backdrop-blur transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-gray-900/80 shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Image
            src="/images/logo.png"
            alt="Anthony McGarry"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="font-bold text-lg md:text-xl">Anthony McGarry</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => scrollToSection("profile")}
            className="text-sm transition-colors hover:text-blue-500 dark:hover:text-blue-400"
          >
            Profile
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="text-sm transition-colors hover:text-blue-500 dark:hover:text-blue-400"
          >
            About Me
          </button>
          <button
            onClick={() => scrollToSection("experience")}
            className="text-sm transition-colors hover:text-blue-500 dark:hover:text-blue-400"
          >
            Experience
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-sm transition-colors hover:text-blue-500 dark:hover:text-blue-400"
          >
            Contact Me
          </button>
        </nav>

        {/* Right section: Theme toggle and Resume */}
        <div className="flex items-center space-x-4">
          <a
            href="https://docs.google.com/document/d/1OTWeloHca8okZahpImsONczlPF6I11eT/export?format=pdf"
            target="_blank"
            className="hidden md:block px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
            rel="noopener noreferrer"
          >
            Resume
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 md:hidden rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white dark:bg-gray-900 mt-2 rounded-lg shadow-lg overflow-hidden"
        >
          <div className="flex flex-col p-4 space-y-3">
            <button
              onClick={() => scrollToSection("profile")}
              className="py-2 px-3 text-left rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Profile
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="py-2 px-3 text-left rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              About Me
            </button>
            <button
              onClick={() => scrollToSection("experience")}
              className="py-2 px-3 text-left rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Experience
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="py-2 px-3 text-left rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Contact Me
            </button>
            <a
              href="/resume.pdf"
              target="_blank"
              className="py-2 px-3 text-center bg-blue-500 hover:bg-blue-600 text-white rounded-md"
              rel="noopener noreferrer"
            >
              Resume
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
