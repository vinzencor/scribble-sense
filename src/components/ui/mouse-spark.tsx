"use client";

import React, { useEffect, useRef } from "react";

interface MouseSparkProps {
  theme?: "light" | "dark";
}

const MouseSpark: React.FC<MouseSparkProps> = ({ theme = "light" }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReducedMotion || isCoarsePointer) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Using our gradient colors
    const colors = ["#ee56a9", "#f65180", "#11c2bd", "#3aa9e5", "#4d49a3", "#6c69bc", "#3dcd74", "#71ce4c"];

    let particles: {
      x: number;
      y: number;
      dx: number;
      dy: number;
      color: string;
      life: number;
    }[] = [];
    const maxParticles = 120;
    let rafId = 0;
    let pendingPoint: { x: number; y: number } | null = null;

    const spawnParticles = (x: number, y: number) => {
      for (let i = 0; i < 5; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2 + 1;
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push({
          x,
          y,
          dx: Math.cos(angle) * speed,
          dy: Math.sin(angle) * speed,
          color,
          life: 1,
        });
      }

      if (particles.length > maxParticles) {
        particles = particles.slice(particles.length - maxParticles);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      pendingPoint = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      if (!ctx) return;

      if (pendingPoint) {
        spawnParticles(pendingPoint.x, pendingPoint.y);
        pendingPoint = null;
      }

      if (particles.length > 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles = particles.filter((p) => {
          p.x += p.dx;
          p.y += p.dy;
          p.dx *= 0.95;
          p.dy *= 0.95;
          p.life -= 0.02;

          if (p.life > 0) {
            ctx.globalAlpha = p.life;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
            ctx.fill();
            return true;
          } else {
            return false;
          }
        });

        ctx.globalAlpha = 1;
      }

      rafId = requestAnimationFrame(animate);
    };

    canvas.addEventListener("mousemove", handleMouseMove, { passive: true });
    animate();

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener('resize', updateCanvasSize);
      cancelAnimationFrame(rafId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ mixBlendMode: theme === "dark" ? "screen" : "multiply" }}
    />
  );
};

export default MouseSpark;
