"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";

type Star = {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  phase: number;
};

type Meteor = {
  x: number;
  y: number;
  angle: number;
  speed: number;
  length: number;
  age: number;
  lifetime: number;
};

const ShootingStarsBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [motionEnabled, setMotionEnabled] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let meteors: Meteor[] = [];
    let frame = 0;
    let previousTime = 0;
    let elapsed = 0;
    let nextMeteor = 0.35;
    let inView = true;
    let background: CanvasGradient;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, width, height);

      for (const star of stars) {
        // Leave the text area quieter than the edges of the sky.
        const central = star.x > width * 0.18 && star.x < width * 0.82
          && star.y > height * 0.28 && star.y < height * 0.72;
        const twinkle = (motionPreference.matches && !motionEnabled) ? 1 : 0.8 + Math.sin(elapsed * 0.7 + star.phase) * 0.2;
        ctx.fillStyle = `rgba(210, 226, 255, ${star.alpha * twinkle * (central ? 0.35 : 1)})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const meteor of meteors) {
        const progress = meteor.age / meteor.lifetime;
        const opacity = Math.min(1, progress / 0.12) * Math.min(1, (1 - progress) / 0.35);
        const tailX = meteor.x - Math.cos(meteor.angle) * meteor.length;
        const tailY = meteor.y - Math.sin(meteor.angle) * meteor.length;
        const trail = ctx.createLinearGradient(tailX, tailY, meteor.x, meteor.y);
        trail.addColorStop(0, "rgba(96, 165, 250, 0)");
        trail.addColorStop(0.65, `rgba(147, 197, 253, ${opacity * 0.45})`);
        trail.addColorStop(1, `rgba(235, 245, 255, ${opacity})`);
        ctx.strokeStyle = trail;
        ctx.lineWidth = 1.8;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(meteor.x, meteor.y);
        ctx.stroke();

        const glow = ctx.createRadialGradient(meteor.x, meteor.y, 0, meteor.x, meteor.y, 5);
        glow.addColorStop(0, `rgba(240, 248, 255, ${opacity})`);
        glow.addColorStop(0.25, `rgba(186, 220, 255, ${opacity * 0.5})`);
        glow.addColorStop(1, "rgba(147, 197, 253, 0)");
        ctx.fillStyle = glow;
        ctx.fillRect(meteor.x - 5, meteor.y - 5, 10, 10);
      }
    };

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      background = ctx.createLinearGradient(0, 0, width * 0.3, height);
      background.addColorStop(0, "#0b1222");
      background.addColorStop(1, "#19263b");
      stars = Array.from({ length: Math.min(110, Math.max(35, Math.round(width * height / 10000))) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 0.4 + Math.random() * 0.9,
        alpha: 0.2 + Math.random() * 0.45,
        phase: Math.random() * Math.PI * 2,
      }));
      meteors = [];
      draw();
    };

    const animate = (time: number) => {
      const delta = previousTime ? Math.min((time - previousTime) / 1000, 0.05) : 0;
      previousTime = time;
      elapsed += delta;
      nextMeteor -= delta;
      if (nextMeteor <= 0 && meteors.length < 2) {
        meteors.push({
          x: width * (0.08 + Math.random() * 0.55),
          y: height * (0.08 + Math.random() * 0.18),
          angle: (28 + Math.random() * 12) * Math.PI / 180,
          speed: Math.min(width * 0.32, 460) + Math.random() * 80,
          length: Math.min(width * 0.35, 200 + Math.random() * 80),
          age: 0,
          lifetime: 1.7 + Math.random() * 0.4,
        });
        nextMeteor = 1.8 + Math.random() * 1.4;
      }
      for (const meteor of meteors) {
        meteor.age += delta;
        meteor.x += Math.cos(meteor.angle) * meteor.speed * delta;
        meteor.y += Math.sin(meteor.angle) * meteor.speed * delta;
      }
      meteors = meteors.filter((meteor) => meteor.age < meteor.lifetime);
      draw();
      frame = requestAnimationFrame(animate);
    };

    const updatePlayback = () => {
      cancelAnimationFrame(frame);
      previousTime = 0;
      if ((!motionPreference.matches || motionEnabled) && !document.hidden && inView) {
        frame = requestAnimationFrame(animate);
      } else if (motionPreference.matches && !motionEnabled) {
        meteors = [];
        draw();
      }
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      updatePlayback();
    });
    visibilityObserver.observe(canvas);
    document.addEventListener("visibilitychange", updatePlayback);
    motionPreference.addEventListener("change", updatePlayback);
    updatePlayback();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", updatePlayback);
      motionPreference.removeEventListener("change", updatePlayback);
    };
  }, [motionEnabled]);

  return (
    <>
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 w-full h-full"
    />
    <button
      type="button"
      onClick={() => setMotionEnabled((enabled) => !enabled)}
      className="hidden motion-reduce:block absolute bottom-6 right-6 z-20 rounded-md border border-slate-600 bg-slate-900/70 px-3 py-2 text-xs text-slate-300 hover:bg-slate-800 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400"
    >
      {motionEnabled ? "Use system motion setting" : "Play meteors"}
    </button>
    </>
  );
};

export default function Profile() {
  const handleGetInTouch = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
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
                Principal Lead Frontend Developer
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg mb-8 text-gray-200"
              >
                I help businesses build and improve web and mobile applications.
                Whether you need a new product, support with an existing app or
                technical direction for your team, I can help you plan and deliver it.
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
                  Get in touch
                </button>
              </motion.div>
            </div>
          </Parallax>
        </div>
      </section>
    </ParallaxProvider>
  );
}
