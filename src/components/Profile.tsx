"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";

// Star type definition
type Star = {
  x: number;
  y: number;
  radius: number;
  velocity: number;
  alpha: number;
  isShooting: boolean;
  trail: { x: number; y: number }[];
  timeToShoot: number;
};

// Star animation component using standard React hooks
const ShootingStarsBackground = () => {
  // Use useState and useEffect instead of the experimental 'use' API
  const [isClient, setIsClient] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Store stars in a ref so they persist across renders
  const starsRef = useRef<Star[]>([]);
  const animationRef = useRef<number>(0);
  const isInitializedRef = useRef(false);

  // Set isClient to true when component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Skip this effect if we're not in a browser environment
    if (!isClient) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas to full width/height
    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Initialize stars only once
    if (!isInitializedRef.current) {
      isInitializedRef.current = true;
      const starCount = 100;

      for (let i = 0; i < starCount; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1 + 0.5,
          velocity: Math.random() * 0.05 + 0.02,
          alpha: Math.random() * 0.5 + 0.5,
          isShooting: false,
          trail: [],
          timeToShoot: Math.random() * 200 + 50,
        });
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Dark blue background with gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#0f172a");
      gradient.addColorStop(1, "#1e293b");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      starsRef.current.forEach((star) => {
        ctx.beginPath();

        // Regular star rendering
        if (!star.isShooting) {
          ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
          ctx.fill();

          // Twinkle effect
          star.alpha += Math.random() * 0.03 - 0.015;
          star.alpha = Math.max(0.1, Math.min(1, star.alpha));

          // Randomly decide if a star should start shooting
          if (Math.random() < 0.0005 && star.timeToShoot <= 0) {
            star.isShooting = true;
            star.trail = [];
          }

          star.timeToShoot--;
        } else {
          // Shooting star rendering
          star.x += 4;
          star.y += 2;

          // Keep track of trail positions
          star.trail.push({ x: star.x, y: star.y });
          if (star.trail.length > 20) {
            star.trail.shift();
          }

          // Draw trail
          if (star.trail.length > 1) {
            ctx.beginPath();
            ctx.moveTo(star.trail[0].x, star.trail[0].y);

            for (let i = 1; i < star.trail.length; i++) {
              ctx.lineTo(star.trail[i].x, star.trail[i].y);
            }

            ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
            ctx.lineWidth = star.radius * 2;
            ctx.lineCap = "round";
            ctx.stroke();
          }

          // Draw the star at the front
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255, 255, 255, 1)";
          ctx.fill();

          // Reset star when it goes off screen
          if (star.x > canvas.width || star.y > canvas.height) {
            star.x = Math.random() * canvas.width * 0.3;
            star.y = Math.random() * canvas.height * 0.3;
            star.isShooting = false;
            star.trail = [];
            star.timeToShoot = Math.random() * 200 + 100;
          }
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, [isClient]); // Only depend on isClient

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full -z-10" />
  );
};

export default function Profile() {
  // Use useState instead of the experimental 'use' API
  const [canScroll, setCanScroll] = useState(false);

  // Set canScroll to true when component mounts
  useEffect(() => {
    setCanScroll(true);
  }, []);

  const handleGetInTouch = () => {
    if (canScroll) {
      document
        .getElementById("contact")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <ParallaxProvider>
      <section
        id="profile"
        className="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden"
      >
        <ShootingStarsBackground />

        <div className="container mx-auto px-4 relative z-10">
          <Parallax translateY={[-20, 20]}>
            <div className="text-center max-w-3xl mx-auto">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl font-bold mb-4"
              >
                Anthony McGarry
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl md:text-2xl text-blue-300 mb-6"
              >
                Lead Front-End Developer
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg mb-8 text-gray-200"
              >
                I&apos;m a lead developer from Liverpool with 8 years of
                professional experience. A fast learner, self-motivated and
                problem solver.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <button
                  onClick={handleGetInTouch}
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors duration-300"
                >
                  Get In Touch
                </button>
              </motion.div>
            </div>
          </Parallax>
        </div>
      </section>
    </ParallaxProvider>
  );
}
