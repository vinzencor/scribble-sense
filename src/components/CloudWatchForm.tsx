"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function CloudWatchForm() {
  const [isTyping, setIsTyping] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [eyePos, setEyePos] = useState({ x: 0, y: 0 });
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  useEffect(() => {
    const offsetX = ((cursor.x / window.innerWidth) - 0.5) * 40;
    const offsetY = ((cursor.y / window.innerHeight) - 0.5) * 20;
    setEyePos({ x: offsetX, y: offsetY });
  }, [cursor]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you! We'll get back to you soon.");
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card/80 backdrop-blur-md rounded-3xl shadow-purple border-2 border-accent/20 p-8 flex flex-col items-center gap-6">
        
        {/* Cloud Character */}
        <div className="relative w-60 h-32">
          <div className="absolute inset-0 bg-gradient-cyan rounded-full blur-2xl opacity-30 animate-pulse" />
          <svg viewBox="0 0 200 100" className="w-full h-full">
            {/* Cloud shape */}
            <ellipse cx="100" cy="60" rx="70" ry="35" fill="url(#cloudGradient)" />
            <circle cx="60" cy="55" r="30" fill="url(#cloudGradient)" />
            <circle cx="140" cy="55" r="30" fill="url(#cloudGradient)" />
            
            {/* Eyes */}
            {["left", "right"].map((side, idx) => (
              <g key={side}>
                <ellipse
                  cx={idx === 0 ? 75 : 125}
                  cy={55}
                  rx={14}
                  ry={isTyping ? 2 : blink ? 3 : 18}
                  fill="white"
                  style={{ transition: "all 0.15s ease" }}
                />
                {!isTyping && !blink && (
                  <circle
                    cx={idx === 0 ? 75 + eyePos.x / 4 : 125 + eyePos.x / 4}
                    cy={58}
                    r={6}
                    fill="#1a1a1a"
                    style={{ transition: "all 0.1s ease" }}
                  />
                )}
              </g>
            ))}
            
            {/* Smile */}
            <path
              d="M 85 70 Q 100 80 115 70"
              stroke="#1a1a1a"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            
            <defs>
              <linearGradient id="cloudGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#11c2bd" />
                <stop offset="100%" stopColor="#3aa9e5" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label>Name</Label>
            <Input placeholder="Your Name" required />
          </div>
          
          <div className="flex flex-col gap-2">
            <Label>Email</Label>
            <Input type="email" placeholder="your@email.com" required />
          </div>
          
          <div className="flex flex-col gap-2">
            <Label>Message</Label>
            <Textarea
              placeholder="Tell us how we can help..."
              rows={4}
              onFocus={() => setIsTyping(true)}
              onBlur={() => setIsTyping(false)}
              required
            />
          </div>
          
          <Button 
            type="submit"
            className="mt-2 w-full bg-gradient-cyan hover:shadow-cyan text-white font-bold py-6 text-lg"
          >
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
}
