"use client";

import { motion } from "framer-motion";

interface HandWrittenTitleProps {
  title?: string;
  subtitle?: string;
  color?: string;
}

function HandWrittenTitle({
  title = "Hand Written",
  subtitle = "Optional subtitle",
  color = "#6c69b3",
}: HandWrittenTitleProps) {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 2.1 },
        opacity: { duration: 0.5 },
      },
    },
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto py-16 md:py-20">
      <div className="absolute inset-0 -translate-y-10 translate-x-10 md:translate-y-0 md:translate-x-8">
        <motion.svg
          width="100%"
          height="100%"
          viewBox="0 0 2400 780"
          initial="hidden"
          animate="visible"
          className="w-full h-full"
        >
          <title>Empowering Children to Write with Confidence</title>

          <motion.path
            d="M 2100 120
              C 2280 380, 1760 720, 1030 730
              C 320 730, 20 560, 20 330
              C 20 60, 460 10, 1030 10
              C 1560 10, 1940 220, 1940 220"
            fill="none"
            strokeWidth="16"
            stroke="#000000"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={draw}
            className="opacity-85"
          />
        </motion.svg>
      </div>
      <div className="relative text-center z-10 flex flex-col items-center justify-center" style={{ color }}>
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold tracking-tight flex items-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            className="text-2xl md:text-4xl font-semibold mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
}

export { HandWrittenTitle };
