import React from "react";
import { cn } from "@/lib/utils";

interface PlayStoreButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
}

export function PlayStoreButton({ className, ...props }: PlayStoreButtonProps) {
  return (
    <a
      href="https://play.google.com/store/apps/details?id=com.scribblesense.app"
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-3 h-14 px-6 rounded-xl",
        "bg-gradient-pink hover:shadow-pink",
        "text-white font-semibold",
        "transition-all duration-100 hover:scale-105",
        "group",
        className
      )}
      {...props}
    >
      <PlayIcon className="size-8 group-hover:animate-float" />
      <div className="text-left flex flex-col items-start justify-center">
        <span className="text-xs leading-none tracking-tight opacity-90">
          GET IT ON
        </span>
        <p className="text-lg font-bold leading-none mt-1">Google Play</p>
      </div>
    </a>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
    </svg>
  );
}
