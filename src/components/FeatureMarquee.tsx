import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, PenTool, Heart, Sparkles } from "lucide-react";

const features = [
  {
    icon: <PenTool className="w-8 h-8 text-white" />,
    title: "Empower",
    desc: "We equip children and families with the right tools, resources, and guidance to confidently navigate dysgraphia. Through understanding and practical strategies, we help build a strong foundation for long-term success.",
    color: "from-pink-500 to-rose-500",
    shadow: "shadow-pink-500/50",
  },
  {
    icon: <BookOpen className="w-8 h-8 text-white" />,
    title: "Our Focus",
    desc: "We address handwriting challenges and difficulties related to dysgraphia through tailored exercises. Our program helps children improve letter formation, spacing, and legibility, while also supporting the development of fine motor skills, visual processing, and coordination.",
    color: "from-cyan-500 to-blue-500",
    shadow: "shadow-cyan-500/50",
  },
  {
    icon: <Sparkles className="w-8 h-8 text-white" />,
    title: "Innovative Solutions",
    desc: "ScribbleSense leads the way in innovative approaches to dysgraphia, offering personalized strategies to meet each child’s unique needs. Our methods foster growth, build confidence, and help children conquer obstacles with ease.",
    color: "from-emerald-500 to-teal-500",
    shadow: "shadow-emerald-500/50",
  },
  {
    icon: <Heart className="w-8 h-8 text-white" />,
    title: "Comprehensive Support",
    desc: "From assessments to interventions and educational resources, we provide a full spectrum of dysgraphia support. Parents and educators receive tailored guidance, ensuring each child's path to success is clear and well-supported.",
    color: "from-purple-500 to-indigo-500",
    shadow: "shadow-purple-500/50",
  },
];

export const FeatureMarquee = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Duplicate items for seamless marquee effect
  const marqueeItems = [...features, ...features, ...features];

  return (
    <div className="relative w-full overflow-visible py-20 flex items-center bg-transparent mt-16 sm:mt-24">
      <div className="flex w-full overflow-visible space-x-12 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] relative z-10">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 20,
          }}
          className="flex space-x-12 shrink-0 items-center justify-center hover:[animation-play-state:paused]"
        >
          {marqueeItems.map((feature, idx) => (
            <div key={idx} className="flex items-center space-x-12 shrink-0">
              <div
                className="relative group cursor-pointer py-10 flex shrink-0"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <h3 className={`text-5xl md:text-7xl font-extrabold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent transform transition-transform duration-300 group-hover:scale-105 drop-shadow-lg whitespace-nowrap`}>
                  {feature.title}
                </h3>

                {/* Hover Modal */}
                <AnimatePresence>
                  {hoveredIdx === idx && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 z-50 pointer-events-none"
                    >
                      <div className={`p-6 rounded-3xl bg-white/95 backdrop-blur-xl shadow-2xl border-2 border-white/50 relative overflow-hidden`}>
                        <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${feature.color}`} />
                        
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 ${feature.shadow}`}>
                          {feature.icon}
                        </div>
                        
                        <h4 className="text-2xl font-bold text-slate-800 mb-2">{feature.title}</h4>
                        <p className="text-slate-600 leading-relaxed font-medium">
                          {feature.desc}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {/* Separator / Bullet */}
              <div className="flex items-center justify-center shrink-0">
                 <Sparkles className="w-8 h-8 text-slate-300/80" />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default FeatureMarquee;
