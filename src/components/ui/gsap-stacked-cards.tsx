import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PlayStoreButton } from "./play-store-button";
import AstraButton from "./astra-button";

gsap.registerPlugin(ScrollTrigger);

interface CardData {
  backgroundImage: string;
  badge?: string;
  title: React.ReactNode;
  description: string;
}

interface GSAPStackedCardsProps {
  cards: CardData[];
}

const GSAPStackedCards: React.FC<GSAPStackedCardsProps> = ({ cards }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!containerRef.current) return;

    const cardElements = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    
    cardElements.forEach((card, index) => {
      const isLast = index === cardElements.length - 1;
      
      ScrollTrigger.create({
        trigger: card,
        start: "top top",
        end: isLast ? "bottom bottom" : "bottom top",
        pin: !isLast,
        pinSpacing: false,
        scrub: true,
        id: `card-${index}`,
      });

      if (!isLast) {
        gsap.to(card, {
          scale: 0.9,
          opacity: 0.5,
          filter: "blur(4px)",
          scrollTrigger: {
            trigger: cardElements[index + 1],
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative">
      {cards.map((card, index) => (
        <div
          key={index}
          ref={(el) => { cardsRef.current[index] = el; }}
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: `url('${card.backgroundImage}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/50 to-black/40" />

          <div className="container mx-auto px-4 py-20 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              {card.badge && (
                <motion.div
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block mb-6"
                >
                  <span className="px-6 py-2 rounded-full bg-gradient-pink text-white text-sm font-semibold">
                    {card.badge}
                  </span>
                </motion.div>
              )}

              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                {card.title}
              </h1>

              <p className="text-xl md:text-2xl text-[#F5F4EB] mb-12 max-w-2xl mx-auto">
                {card.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <PlayStoreButton />
                <AstraButton
                  label="Learn More"
                  variant="purple"
                  onClick={() =>
                    document.getElementById("games")?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="text-lg"
                />
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <ArrowRight className="w-8 h-8 text-primary rotate-90" />
            </motion.div>
          </motion.div>
        </div>
      ))}
    </div>
  );
};

export default GSAPStackedCards;

