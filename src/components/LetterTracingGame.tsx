"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import AstraButton from "./ui/astra-button";
import { toast } from "sonner";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const PLAYABLE_MAX_INDEX = 2; // A=0, B=1, C=2
const MIN_STROKE_LENGTH = 150; // minimum drawing distance to consider checking
const MIN_ACCURACY = 0.7; // 70% of points must follow the guide

type Point = { x: number; y: number };

// --- Geometry helpers ---
function distancePointToSegment(
  px: number,
  py: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number {
  const dx = x2 - x1;
  const dy = y2 - y1;
  if (dx === 0 && dy === 0) {
    return Math.hypot(px - x1, py - y1);
  }
  const t = ((px - x1) * dx + (py - y1) * dy) / (dx * dx + dy * dy);
  const clampedT = Math.max(0, Math.min(1, t));
  const cx = x1 + clampedT * dx;
  const cy = y1 + clampedT * dy;
  return Math.hypot(px - cx, py - cy);
}

// Rough accuracy check: how many points are “near” the ideal strokes
function getLetterAccuracy(letter: string, points: Point[]): number {
  if (points.length === 0) return 0;

  const tolerance = 22; // px

  let isPointNear: (p: Point) => boolean;

  if (letter === "A") {
    // A = two diagonals + crossbar
    const segments = [
      { x1: 140, y1: 250, x2: 200, y2: 60 }, // left
      { x1: 260, y1: 250, x2: 200, y2: 60 }, // right
      { x1: 160, y1: 170, x2: 240, y2: 170 }, // crossbar
    ];

    isPointNear = (p) =>
      segments.some(
        (s) =>
          distancePointToSegment(p.x, p.y, s.x1, s.y1, s.x2, s.y2) <= tolerance
      );
  } else if (letter === "B") {
    // B ≈ spine + two loops (approx circles)
    const spine = { x1: 150, y1: 60, x2: 150, y2: 250 };
    const topCenter = { x: 200, y: 95, r: 45 };
    const bottomCenter = { x: 200, y: 190, r: 50 };

    isPointNear = (p) => {
      const dSpine = distancePointToSegment(
        p.x,
        p.y,
        spine.x1,
        spine.y1,
        spine.x2,
        spine.y2
      );
      const dTop = Math.abs(
        Math.hypot(p.x - topCenter.x, p.y - topCenter.y) - topCenter.r
      );
      const dBottom = Math.abs(
        Math.hypot(p.x - bottomCenter.x, p.y - bottomCenter.y) - bottomCenter.r
      );
      return (
        dSpine <= tolerance ||
        dTop <= tolerance ||
        dBottom <= tolerance
      );
    };
  } else if (letter === "C") {
    // C ≈ arc of a circle
    const center = { x: 200, y: 150, r: 90 };
    isPointNear = (p) => {
      const angle = Math.atan2(p.y - center.y, p.x - center.x); // -PI..PI
      // Restrict to left side arc-ish
      const isLeftSide = angle > (-3 * Math.PI) / 4 && angle < (3 * Math.PI) / 4;
      const d = Math.abs(
        Math.hypot(p.x - center.x, p.y - center.y) - center.r
      );
      return isLeftSide && d <= tolerance;
    };
  } else {
    // For other letters, we don't check (not playable)
    return 0;
  }

  let validCount = 0;
  for (const p of points) {
    if (isPointNear(p)) validCount++;
  }

  return validCount / points.length;
}

export default function LetterTracingGame() {
  const [currentLetter, setCurrentLetter] = useState(0); // start at A
  const [traced, setTraced] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokeLength, setStrokeLength] = useState(0);
  const [points, setPoints] = useState<Point[]>([]);
  const lastPointRef = useRef<Point | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const isPlayable = currentLetter <= PLAYABLE_MAX_INDEX;
  const isLastPlayable = currentLetter === PLAYABLE_MAX_INDEX;

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    setTraced(false);
    setStrokeLength(0);
    setPoints([]);
    clearCanvas();
  }, [currentLetter]);

  const getCanvasPoint = (
    e: React.PointerEvent<HTMLCanvasElement>
  ): Point | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isPlayable) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const point = getCanvasPoint(e);
    if (!point) return;

    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDrawing(true);
    lastPointRef.current = point;

    ctx.lineWidth = 14;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#6c69bc";
    ctx.beginPath();
    ctx.moveTo(point.x, point.y);

    setPoints((prev) => [...prev, point]);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !isPlayable) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const point = getCanvasPoint(e);
    const lastPoint = lastPointRef.current;
    if (!point || !lastPoint) return;

    ctx.lineTo(point.x, point.y);
    ctx.stroke();

    const dx = point.x - lastPoint.x;
    const dy = point.y - lastPoint.y;
    const dist = Math.hypot(dx, dy);
    setStrokeLength((prev) => prev + dist);

    lastPointRef.current = point;
    setPoints((prev) => [...prev, point]);
  };

  const endDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    setIsDrawing(false);
    lastPointRef.current = null;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    // Only evaluate for A, B, C
    if (!isPlayable) return;

    if (strokeLength < MIN_STROKE_LENGTH) return; // too short / scribble

    const letter = letters[currentLetter];
    const accuracy = getLetterAccuracy(letter, points);

    if (!traced && accuracy >= MIN_ACCURACY) {
      setTraced(true);

      // Trigger confetti celebration
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#6c69bc", "#8b5cf6", "#10b981", "#22c55e", "#f59e0b", "#ec4899"],
      });

      if (!isLastPlayable) {
        const nextLetter = letters[currentLetter + 1];
        toast.success(`Great job! You traced ${letter}. Next is ${nextLetter}.`);
      } else {
        toast.success(
          `Great job! You traced A, B and C! 🎉 Redirecting to the app...`
        );
        setTimeout(() => {
          window.open(
            "https://play.google.com/store/apps/details?id=com.scribblesense.app",
            "_blank"
          );
        }, 1200);
      }
    }
  };

  const handleNext = () => {
    if (!traced) {
      toast.message("Trace the dotted letter first!");
      return;
    }

    if (!isLastPlayable) {
      setCurrentLetter((prev) => prev + 1);
    } else {
      // fallback redirect
      window.open(
        "https://play.google.com/store/apps/details?id=com.scribblesense.app",
        "_blank"
      );
    }
  };

  const handleClear = () => {
    clearCanvas();
    setStrokeLength(0);
    setPoints([]);
    setTraced(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-card rounded-3xl shadow-purple border-2 border-accent/20">
      <h3 className="text-3xl font-bold text-center mb-2 bg-gradient-purple bg-clip-text text-transparent">
        Letter Tracing Game
      </h3>
      <p className="text-center text-sm text-muted-foreground mb-6">
        Carefully trace the <span className="font-semibold">dotted letter</span>.
        The drawing must follow the shape to move on.
      </p>

      {/* A–Z strip */}
      <div className="flex justify-center gap-1 mb-8 flex-wrap">
        {letters.map((letter, idx) => (
          <div
            key={letter}
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
              idx === currentLetter
                ? "bg-gradient-purple text-white"
                : idx <= PLAYABLE_MAX_INDEX && idx < currentLetter
                ? "bg-gradient-green text-white"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {letter}
          </div>
        ))}
      </div>

      {/* Tracing area */}
      <motion.div
        key={currentLetter}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative mb-8 mx-auto max-w-md aspect-[4/3]"
      >
        <canvas
          ref={canvasRef}
          width={400}
          height={300}
          className="absolute inset-0 w-full h-full touch-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrawing}
          onPointerLeave={endDrawing}
        />

        {isPlayable ? (
          <DottedLetterGuide letter={letters[currentLetter]} />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm text-center px-4">
            Tracing is available for A, B, and C. Complete them to unlock the
            full app experience.
          </div>
        )}
      </motion.div>

      <div className="text-center space-y-3">
        {traced ? (
          <p className="text-sm text-emerald-500 font-medium">
            Great job!{" "}
            {isLastPlayable ? "Redirecting you to the app..." : "Tap next to continue."}
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">
            Follow the dotted lines as closely as you can.
          </p>
        )}

        <div className="flex justify-center gap-3 mt-4">
          <AstraButton
            label={
              isLastPlayable
                ? traced
                  ? "Go to Play Store →"
                  : "Trace the Letter"
                : traced
                ? "Next Letter →"
                : "Trace the Letter"
            }
            variant="purple"
            onClick={handleNext}
            className="text-lg px-8 py-3"
          />

          <button
            type="button"
            onClick={handleClear}
            className="px-6 py-3 rounded-full border border-border text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

/** Dotted outlines for A, B, C only */
function DottedLetterGuide({ letter }: { letter: string }) {
  if (letter === "A") {
    return (
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 400 300"
      >
        <path
          d="M 140 250 L 200 60"
          stroke="#b0b0c8"
          strokeWidth="10"
          fill="none"
          strokeDasharray="6 12"
          strokeLinecap="round"
        />
        <path
          d="M 260 250 L 200 60"
          stroke="#b0b0c8"
          strokeWidth="10"
          fill="none"
          strokeDasharray="6 12"
          strokeLinecap="round"
        />
        <path
          d="M 160 170 L 240 170"
          stroke="#b0b0c8"
          strokeWidth="10"
          fill="none"
          strokeDasharray="6 12"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (letter === "B") {
    return (
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 400 300"
      >
        <path
          d="M 150 60 L 150 250"
          stroke="#b0b0c8"
          strokeWidth="10"
          fill="none"
          strokeDasharray="6 12"
          strokeLinecap="round"
        />
        <path
          d="M 150 60 C 240 60 240 130 150 130"
          stroke="#b0b0c8"
          strokeWidth="10"
          fill="none"
          strokeDasharray="6 12"
          strokeLinecap="round"
        />
        <path
          d="M 150 150 C 240 150 240 230 150 230"
          stroke="#b0b0c8"
          strokeWidth="10"
          fill="none"
          strokeDasharray="6 12"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (letter === "C") {
    return (
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 400 300"
      >
        <path
          d="M 260 80 C 220 40 140 60 140 150 C 140 240 220 260 260 220"
          stroke="#b0b0c8"
          strokeWidth="10"
          fill="none"
          strokeDasharray="6 12"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return null;
}
