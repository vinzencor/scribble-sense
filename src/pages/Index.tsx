import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import MouseSpark from "@/components/ui/mouse-spark";
import AnimatedBoxLoader from "@/components/ui/animated-box-loader";
import AstraButton from "@/components/ui/astra-button";
import { PlayStoreButton } from "@/components/ui/play-store-button";
import ContainerScroll from "@/components/ui/container-scroll";
import LetterTracingGame from "@/components/LetterTracingGame";
import ReadingGame from "@/components/ReadingGame";
import GSAPStackedCards from "@/components/ui/gsap-stacked-cards";
import appInterface from "@/assets/app-interface.jpg";
import familySupport from "@/assets/family-support.jpg";
import { BookOpen, PenTool, Heart, Sparkles } from "lucide-react";
import InteractiveBentoGallery from "@/components/ui/interactive-bento-gallery";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show loader for 2 seconds
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const heroCards = [
    {
      backgroundImage: "https://scribblesense.co.uk/assets/img/slider/slide-01.jpg",
      badge: "🎨 Empowering Children with Dysgraphia",
      title: (
        <>
          <span className="text-white">ScribbleSense's Path</span>
          <br />
          <span className="bg-gradient-pink bg-clip-text text-transparent">to Progress</span>
        </>
      ),
      description:
        "Dedicated to tackling dysgraphia challenges, ScribbleSense focuses on empowering children and families through comprehensive support and resources.",
    },
    {
      backgroundImage: "https://scribblesense.co.uk/assets/img/slider/slide-02.jpg",
      title: (
        <span className="bg-gradient-pink bg-clip-text text-transparent">
          Empowering Families, Nurturing Children
        </span>
      ),
      description:
        "ScribbleSense can effectively empower families and nurture children affected by dysgraphia, promoting their holistic well-being and educational success.",
    },
    {
      backgroundImage: "https://scribblesense.co.uk/assets/img/slider/slide-03.jpg",
      title: (
        <span className="bg-gradient-purple bg-clip-text text-transparent">
          Helping Kids Conquer Writing Challenges
        </span>
      ),
      description:
        "Providing tailored solutions for diverse handwriting difficulties to meet each child's unique needs.",
    },
  ];
  const mediaItems = [
    // --- Your provided children illustrations ---
    {
      id: 1,
      type: "image" as const,
      title: "Playful Kids 1",
      desc: "Colorful creative character illustration.",
      url: "https://scribblesense.co.uk/assets/img/portfolio/creativeZipp/creative/Untitled-3.jpg",
      span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
    },
    {
      id: 2,
      type: "image" as const,
      title: "Imaginative Storytime",
      desc: "Illustrated child enjoying a magical story.",
      url: "https://scribblesense.co.uk/assets/img/portfolio/illustrateZipp/illustrate/Untitled-5.jpg",
      span: "md:col-span-2 md:row-span-2 col-span-1 sm:col-span-2 sm:row-span-2",
    },
    {
      id: 3,
      type: "image" as const,
      title: "Curious Child",
      desc: "Creative character sketch with bright colors.",
      url: "https://scribblesense.co.uk/assets/img/portfolio/creativeZipp/creative/Untitled-2.jpg",
      span: "md:col-span-1 md:row-span-3 sm:col-span-2 sm:row-span-2",
    },
    {
      id: 4,
      type: "image" as const,
      title: "Reading Time",
      desc: "Child illustration with books and stars.",
      url: "https://scribblesense.co.uk/assets/img/portfolio/creativeZipp/creative/Untitled-1.jpg",
      span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2",
    },
    {
      id: 5,
      type: "image" as const,
      title: "Happy Character",
      desc: "Cheerful kid with playful shapes.",
      url: "https://scribblesense.co.uk/assets/img/portfolio/creativeZipp/creative/Untitled-4.jpg",
      span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
    },
    {
      id: 6,
      type: "image" as const,
      title: "Friendly Friend",
      desc: "Illustrated buddy full of personality.",
      url: "https://scribblesense.co.uk/assets/img/portfolio/illustrateZipp/illustrate/Untitled-4.jpg",
      span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2",
    },

    // --- Additional children-themed stock images (examples) ---
    {
      id: 7,
      type: "image" as const,
      title: "Kids Playing Outdoors",
      desc: "Children running and playing together in the park.",
      url: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9",
      span: "md:col-span-1 md:row-span-2 sm:col-span-1 sm:row-span-2",
    },
    {
      id: 8,
      type: "image" as const,
      title: "Art Class Fun",
      desc: "A child covered in paint while creating art.",
      url: "https://images.unsplash.com/photo-1508948956644-0017e845d797",
      span: "md:col-span-2 md:row-span-2 sm:col-span-2 sm:row-span-2",
    },
    {
      id: 9,
      type: "image" as const,
      title: "Reading Adventure",
      desc: "Little girl reading a book full of magic and wonder.",
      url: "https://images.unsplash.com/photo-1516528387618-afa90b13e000",
      span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
    },
    {
      id: 10,
      type: "image" as const,
      title: "Smiling Friends",
      desc: "A group of children smiling and posing together.",
      url: "https://images.unsplash.com/photo-1503457574462-bd27054394c1",
      span: "md:col-span-2 md:row-span-2 sm:col-span-2 sm:row-span-2",
    },
  ]

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
        <div className="text-center">
          <AnimatedBoxLoader size={150} speed={2} />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-xl font-semibold bg-gradient-pink bg-clip-text text-transparent"
          >
            Loading ScribbleSense...
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <MouseSpark />
      <Navigation />

      {/* Hero Section - GSAP Stacked Cards */}
      <GSAPStackedCards cards={heroCards} />

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-cyan bg-clip-text text-transparent">
                Welcome to ScribbleSense
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              At ScribbleSense, we’re dedicated to transforming the lives of children with Learning Differences. Our mission is to offer the support and resources they need to excel both academically and personally. We’re here to empower every child with the tools and confidence to thrive, making their journey smoother and brighter. Let’s unlock their full potential together!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <PenTool className="w-12 h-12" />,
                title: "Empowerment",
                desc: "We empower families and children with the tools, resources, and knowledge needed to confidently navigate the complexities of dysgraphia. Our support helps build a strong foundation for success through understanding and effective strategies.",
                gradient: "gradient-pink",
              },
              {
                icon: <BookOpen className="w-12 h-12" />,
                title: "Our Focus",
                desc: "We address handwriting challenges and difficulties related to dysgraphia through tailored exercises. Our program helps children improve letter formation, spacing, and legibility, while also supporting the development of fine motor skills, visual processing, and coordination.",
                gradient: "gradient-cyan",
              },
              {
                icon: <Heart className="w-12 h-12" />,
                title: "Innovative Solutions",
                desc: "ScribbleSense leads the way in innovative approaches to dysgraphia, offering personalized strategies to meet each child’s unique needs. Our methods foster growth, build confidence, and help children conquer obstacles with ease.",
                gradient: "gradient-green",
              },
              {
                icon: <Heart className="w-12 h-12" />,
                title: "Comprehensive Support",
                desc: "From assessments to interventions and educational resources, we provide a full spectrum of dysgraphia support. Parents and educators receive tailored guidance, ensuring each child's path to success is clear and well-supported.",
                gradient: "gradient-green",
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="p-5 bg-card rounded-2xl shadow-lg border border-border hover:shadow-2xl transition-all"
              >
                <div className={`inline-block p-4 rounded-xl bg-${feature.gradient} mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* About ScribbleSense Section */}
      <section
        id="about"
        className="relative py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/10 overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute -top-32 -left-10 w-64 h-64 bg-gradient-pink rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-cyan rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-card/80 border border-border text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
              About ScribbleSense
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-purple bg-clip-text text-transparent">
                Helping Children Write
              </span>
              <br />
              <span className="bg-gradient-pink bg-clip-text text-transparent">
                With Confidence
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                ScribbleSense is a pioneering initiative dedicated to helping children
                overcome the challenges of dysgraphia, with a strong focus on
                handwriting development. We provide comprehensive support and
                resources to empower children and their families, ensuring they gain
                the confidence and skills needed to succeed.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                <div className="p-4 rounded-2xl bg-card/80 border border-border shadow-sm">
                  <p className="text-sm font-semibold text-primary mb-1">
                    Child-Centered Design
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Every activity is crafted with children&apos;s needs, attention
                    span, and motivation at heart.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-card/80 border border-border shadow-sm">
                  <p className="text-sm font-semibold text-primary mb-1">
                    Support for Families
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Parents and caregivers get tools and guidance to support progress
                    beyond the screen.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Image + Animated Card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative max-w-md mx-auto"
              >
                {/* Glow behind image */}
                <div className="absolute -inset-6 bg-gradient-to-tr from-primary/40 via-pink-400/30 to-secondary/40 blur-3xl opacity-70" />

                <div className="relative rounded-3xl overflow-hidden border border-border bg-card shadow-xl">
                  <img
                    src="https://scribblesense.co.uk/assets/img/about/about.png"
                    alt="About ScribbleSense – child learning with support"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-5 py-3 rounded-full bg-background/90 border border-border shadow-lg flex items-center gap-2"
                >
                  <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-sm font-medium">
                    Building brighter futures, one stroke at a time
                  </span>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Interactive Games Section */}
      <section id="games" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-purple bg-clip-text text-transparent">
                Try Our Games!
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience interactive learning activities designed to help children master writing skills
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <LetterTracingGame />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <ReadingGame />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-lg text-muted-foreground mb-6">
              Want more activities? Download the full app!
            </p>
            <PlayStoreButton className="inline-flex" />
          </motion.div>
        </div>
      </section>

      {/* image part */}
      <section className="py-16 bg-gradient-to-b from-white via-sky-50 to-white dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
        <div className="max-w-6xl mx-auto px-4">
          <InteractiveBentoGallery
            mediaItems={mediaItems}
            title="Children’s Illustration & Moments Gallery"
            description="Drag and explore a playful collection of children’s illustrations and joyful childhood moments."
          />
        </div>
      </section>

      {/* Scroll Sections */}
      <ContainerScroll
        titleComponent={
          <h2 className="text-3xl md:text-6xl font-bold bg-gradient-pink bg-clip-text text-transparent">
            Empower Your Child's Learning Journey
            <br />
            <br />
          </h2>
        }
      >
        <img
          src={appInterface}
          alt="ScribbleSense app interface showing interactive learning activities"
          className="mx-auto rounded-2xl object-cover h-full w-full"
          draggable={false}
        />
      </ContainerScroll>

      <ContainerScroll
        titleComponent={
          <h2 className="text-4xl md:text-5xl font-bold mt-2 bg-gradient-cyan bg-clip-text pt-36 text-transparent">
            Supporting Families Every Step Building Confidence Together
            <br />
            <span className="">

            </span>
            <br />
          </h2>
        }
      >
        <img
          src={familySupport}
          alt="Family working together on handwriting exercises"
          className="mx-auto rounded-2xl object-cover h-full w-full"
          draggable={false}
        />
      </ContainerScroll>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <Sparkles className="w-16 h-16 mx-auto mb-6 text-primary animate-float" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-green bg-clip-text text-transparent">
                Start Your Journey Today
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of families who are helping their children overcome writing challenges with ScribbleSense
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <PlayStoreButton />
              <AstraButton
                label="Contact Us"
                variant="green"
                onClick={() => window.location.href = '/contact'}
                className="text-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2024 ScribbleSense. Empowering children to conquer writing challenges.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
