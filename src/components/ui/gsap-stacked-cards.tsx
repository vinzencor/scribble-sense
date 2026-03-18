import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PlayStoreButton } from "./play-store-button";
import AstraButton from "./astra-button";

interface CardData {
  backgroundImage?: string;
  backgroundVideo?: string;
  backgroundClassName?: string;
  badge?: string;
  title: React.ReactNode;
  description: string;
}

interface GSAPStackedCardsProps {
  cards: CardData[];
}

const GSAPStackedCards: React.FC<GSAPStackedCardsProps> = ({ cards }) => {
  return (
    <div className="relative">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`relative min-h-screen flex items-center justify-center overflow-hidden ${card.backgroundClassName ?? ""}`}
          style={
            card.backgroundImage
              ? {
                  backgroundImage: `url('${card.backgroundImage}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }
              : {}
          }
        >
          {card.backgroundVideo && (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover object-right"
              style={{ objectPosition: "right center" }}
            >
              <source src={card.backgroundVideo} type="video/mp4" />
            </video>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/75 to-white/80" />

          <div className="container mx-auto px-4 py-20 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto rounded-3xl bg-white/65 backdrop-blur-sm border border-sky-100 p-6 md:p-10 shadow-sm"
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

              <p className="text-xl md:text-2xl text-slate-700 mb-12 max-w-2xl mx-auto">
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
            transition={{ delay: 0.3 }}
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

