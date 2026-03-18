import React from "react";
import { motion } from "framer-motion";

export const CartoonElephant = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Body */}
    <path d="M 140 120 C 140 180, 60 180, 60 120 C 60 60, 140 60, 140 120 Z" fill="#94A3B8" />
    {/* Ear */}
    <path d="M 120 100 C 160 80, 180 140, 140 150 C 120 155, 100 130, 120 100 Z" fill="#CBD5E1" />
    {/* Trunk */}
    <path d="M 60 120 C 30 130, 20 160, 40 180 C 45 185, 55 175, 50 170 C 40 155, 45 140, 60 135 Z" fill="#94A3B8" />
    {/* Legs */}
    <path d="M 80 160 L 80 190 L 95 190 L 95 165 Z" fill="#64748B" />
    <path d="M 110 160 L 110 190 L 125 190 L 125 165 Z" fill="#64748B" />
    <path d="M 70 155 L 70 185 L 80 185 L 80 160 Z" fill="#475569" />
    <path d="M 120 155 L 120 185 L 130 185 L 130 160 Z" fill="#475569" />
    {/* Eye */}
    <circle cx="85" cy="105" r="5" fill="#1E293B" />
    <circle cx="83" cy="103" r="2" fill="#FFFFFF" />
    {/* Blush */}
    <ellipse cx="95" cy="115" rx="8" ry="5" fill="#F472B6" opacity="0.6" />
    {/* Tusk */}
    <path d="M 65 130 C 55 135, 50 145, 55 150 C 58 152, 60 145, 65 135 Z" fill="#F8FAFC" />
  </svg>
);

export const CartoonDeer = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Body */}
    <path d="M 140 110 C 140 160, 60 160, 70 110 C 80 60, 150 70, 140 110 Z" fill="#D97706" />
    {/* Chest/Belly */}
    <path d="M 110 120 C 110 150, 75 150, 80 115 C 85 80, 115 90, 110 120 Z" fill="#FDE68A" />
    {/* Head */}
    <circle cx="60" cy="80" r="30" fill="#D97706" />
    {/* Snout */}
    <path d="M 40 85 C 20 85, 20 105, 40 105 L 60 100 Z" fill="#FDE68A" />
    <circle cx="32" cy="92" r="5" fill="#1E293B" />
    {/* Ears */}
    <path d="M 70 60 C 90 40, 110 50, 80 65 Z" fill="#D97706" />
    <path d="M 75 62 C 95 45, 105 52, 82 66 Z" fill="#FDE68A" />
    {/* Antlers */}
    <path d="M 65 55 C 65 30, 80 20, 85 15 M 70 40 L 85 45 M 75 30 L 90 30" stroke="#78350F" strokeWidth="4" strokeLinecap="round" fill="none" />
    {/* Legs */}
    <path d="M 85 150 L 80 190 L 90 190 L 95 150 Z" fill="#B45309" />
    <path d="M 120 145 L 115 190 L 125 190 L 130 145 Z" fill="#B45309" />
    <path d="M 75 145 L 70 185 L 80 185 L 85 145 Z" fill="#92400E" />
    <path d="M 130 140 L 125 185 L 135 185 L 140 140 Z" fill="#92400E" />
    {/* Hooves */}
    <rect x="78" y="185" width="14" height="5" fill="#1E293B" rx="2" />
    <rect x="113" y="185" width="14" height="5" fill="#1E293B" rx="2" />
    <rect x="68" y="180" width="14" height="5" fill="#1E293B" rx="2" />
    <rect x="123" y="180" width="14" height="5" fill="#1E293B" rx="2" />
    {/* Eye */}
    <circle cx="55" cy="75" r="4" fill="#1E293B" />
    <circle cx="53" cy="73" r="1.5" fill="#FFFFFF" />
    {/* Spots */}
    <circle cx="110" cy="95" r="4" fill="#FDE68A" />
    <circle cx="125" cy="105" r="5" fill="#FDE68A" />
    <circle cx="100" cy="110" r="3" fill="#FDE68A" />
    <circle cx="120" cy="120" r="4" fill="#FDE68A" />
    {/* Tail */}
    <path d="M 148 100 C 160 90, 160 110, 145 115 Z" fill="#FDE68A" />
  </svg>
);

export const CartoonBird = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Body */}
    <path d="M 100 130 C 50 130, 40 80, 100 70 C 160 80, 150 130, 100 130 Z" fill="#60A5FA" />
    {/* Belly */}
    <path d="M 100 130 C 70 130, 60 100, 100 95 C 140 100, 130 130, 100 130 Z" fill="#BFDBFE" />
    {/* Head/Beak */}
    <path d="M 40 90 L 10 95 L 45 105 Z" fill="#FBBF24" />
    {/* Eyes */}
    <circle cx="65" cy="85" r="6" fill="#1E293B" />
    <circle cx="63" cy="83" r="2" fill="#FFFFFF" />
    <circle cx="85" cy="85" r="6" fill="#1E293B" />
    <circle cx="83" cy="83" r="2" fill="#FFFFFF" />
    {/* Blush */}
    <ellipse cx="55" cy="95" rx="5" ry="3" fill="#F472B6" opacity="0.6" />
    <ellipse cx="95" cy="95" rx="5" ry="3" fill="#F472B6" opacity="0.6" />
    {/* Wings */}
    <motion.path 
      d="M 110 90 C 150 70, 180 90, 130 110 Z" 
      fill="#3B82F6" 
      animate={{ rotate: [-10, 20, -10], y: [-5, 5, -5] }}
      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      style={{ originX: "110px", originY: "90px" }}
    />
    {/* Tail */}
    <path d="M 145 100 L 180 90 L 175 110 Z" fill="#2563EB" />
    {/* Legs */}
    <path d="M 85 130 L 80 150 M 80 150 L 70 155 M 80 150 L 90 155" stroke="#FBBF24" strokeWidth="4" strokeLinecap="round" fill="none" />
    <path d="M 105 130 L 110 150 M 110 150 L 100 155 M 110 150 L 120 155" stroke="#FBBF24" strokeWidth="4" strokeLinecap="round" fill="none" />
  </svg>
);

export const SectionAnimals = ({ side, type, delay = 0, yOffset = [0, -20, 0] }: { side: "left" | "right", type: "elephant" | "deer" | "bird", delay?: number, yOffset?: number[] }) => {
  const AnimalComponent = type === "elephant" ? CartoonElephant : type === "deer" ? CartoonDeer : CartoonBird;
  
  // Base position styling
  const positionClass = side === "left" 
    ? "absolute left-2 md:left-8 lg:left-16 z-20 pointer-events-none opacity-80" 
    : "absolute right-2 md:right-8 lg:right-16 z-20 pointer-events-none opacity-80";
    
  return (
    <motion.div
      className={positionClass}
      animate={{ 
        y: yOffset,
        rotate: side === "left" ? [0, 5, 0, -5, 0] : [0, -5, 0, 5, 0]
      }}
      transition={{ 
        duration: 8, 
        repeat: Infinity, 
        ease: "easeInOut",
        delay 
      }}
      style={{
        // Flip the animal if it's on the right side generally facing inwards
        transform: side === "right" && type !== "elephant" ? "scaleX(-1)" : "none"
      }}
    >
      <AnimalComponent className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 drop-shadow-xl" />
    </motion.div>
  );
};
