"use client";

import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface AnimatedBoxLoaderProps {
  size?: number;
  speed?: number; // video speed multiplier (1 = normal, 2 = double, etc.)
}

const AnimatedBoxLoader: React.FC<AnimatedBoxLoaderProps> = ({
  size = 150,
  speed = 1.8, // default increased speed
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoSrc = "/envato_video_gen_Nov_29_2025_9_56_23.mp4";

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  }, [speed]);

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* Rotated container */}
      <div
        className={cn(
          "relative rounded-[39px] overflow-hidden",
          "bg-muted shadow-inner border-2 border-border transition-colors",
          "rotate-45"
        )}
        style={{ width: size, height: size }}
      >
        {/* Video (zoomed + counter-rotated) */}
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className={cn(
            "absolute inset-0 w-full h-full object-cover",
            "-rotate-45",
            "scale-[1.15]" // zoomed in
          )}
        />
      </div>
    </div>
  );
};

export default AnimatedBoxLoader;
