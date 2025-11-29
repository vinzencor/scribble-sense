"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface AstraButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  variant?: 'pink' | 'cyan' | 'purple' | 'green';
}

const AstraButton: React.FC<AstraButtonProps> = ({ 
  label = "Button", 
  variant = 'pink',
  className,
  ...props 
}) => {
  const variantClasses = {
    pink: 'border-primary hover:bg-gradient-pink hover:shadow-pink',
    cyan: 'border-secondary hover:bg-gradient-cyan hover:shadow-cyan',
    purple: 'border-accent hover:bg-gradient-purple hover:shadow-purple',
    green: 'border-success hover:bg-gradient-green hover:shadow-green',
  };

  return (
    <button
      className={cn(
        "relative px-8 py-3 rounded-xl border-2",
        "text-sm font-bold tracking-wider uppercase",
        "text-foreground bg-transparent overflow-hidden",
        "transition-all duration-300 ease-in-out",
        "hover:text-white hover:scale-105",
        "active:scale-95",
        "group",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      <span
        className="absolute top-0 left-0 h-full w-0 opacity-0 bg-white skew-x-[-20deg] shadow-[0_0_50px_30px_rgba(255,255,255,0.3)] group-hover:animate-shine"
      />
      <span className="relative z-10">{label}</span>
    </button>
  );
};

export default AstraButton;
