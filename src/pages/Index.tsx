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
import appInterface from "@/assets/app-interface.jpg";
import familySupport from "@/assets/family-support.jpg";
import { BookOpen, PenTool, Heart, Sparkles } from "lucide-react";
import InteractiveBentoGallery from "@/components/ui/interactive-bento-gallery";
import FeatureMarquee from "@/components/FeatureMarquee";
import { SectionAnimals } from "@/components/FloatingAnimals";
import { getGalleryImages, GalleryImage } from "@/lib/supabase";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import FAQSection from "@/components/FAQSection";
import SEOHelmet from "@/components/SEOHelmet";


const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [headerCarouselApi, setHeaderCarouselApi] = useState<CarouselApi>();
  const [headerSlideIndex, setHeaderSlideIndex] = useState(0);
  const lightThemeBg = "bg-gradient-to-b from-white via-sky-50 to-white";
  const sectionHeadingGradient = "bg-gradient-purple bg-clip-text text-transparent";

  useEffect(() => {
    // Fetch gallery images during startup.
    const initializeData = async () => {
      try {
        const { data } = await getGalleryImages();
        if (data && data.length > 0) {
          // Transform Supabase data to match the gallery format
          const transformedImages = data.map((img: GalleryImage) => ({
            id: img.id,
            type: "image" as const,
            title: img.title,
            desc: img.description,
            url: img.image_url,
            span: img.span,
          }));
          setGalleryImages(transformedImages);
        }
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, []);

  useEffect(() => {
    if (!headerCarouselApi) return;

    const onSelect = () => {
      setHeaderSlideIndex(headerCarouselApi.selectedScrollSnap());
    };

    onSelect();
    headerCarouselApi.on("select", onSelect);
    headerCarouselApi.on("reInit", onSelect);

    const timer = window.setInterval(() => {
      if (headerCarouselApi.canScrollNext()) {
        headerCarouselApi.scrollNext();
      } else {
        headerCarouselApi.scrollTo(0);
      }
    }, 6000);

    return () => {
      window.clearInterval(timer);
      headerCarouselApi.off("select", onSelect);
      headerCarouselApi.off("reInit", onSelect);
    };
  }, [headerCarouselApi]);

  const headerSlides = [
    {
      title: "Helping Every Child Write Boldly",
      description: "Expert dysgraphia support and handwriting development that builds clarity, confidence, and skill.",
      mediaSrc: "/slide-01.jpg",
      mediaAlt: "Children practicing handwriting improvement activities",
      textColor: "text-white",
      gradient: "from-sky-900/80 via-sky-900/40 to-transparent",
    },
    {
      title: "Where Learning Differences Get the Right Support",
      description: "Personalised guidance to help children overcome handwriting challenges and thrive academically.",
      mediaSrc: "/slide-02.jpg",
      mediaAlt: "ScribbleSense app interface",
      textColor: "text-white",
      gradient: "from-pink-900/80 via-pink-900/40 to-transparent",
    },
    {
      title: "Supporting Families Every Step",
      description: "Practical guidance for parents and caregivers so progress continues at home, school, and beyond.",
      mediaSrc: "/slide-03.jpg",
      mediaAlt: "Family working together on handwriting exercises",
      textColor: "text-white",
      gradient: "from-purple-900/80 via-purple-900/40 to-transparent",
    },
  ];

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${lightThemeBg}`}>
        <div className="text-center">
          <AnimatedBoxLoader size={150} speed={2} />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-xl font-semibold bg-gradient-pink bg-clip-text text-transparent"
          >

          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${lightThemeBg}`}>
      <SEOHelmet page="home" />
      <MouseSpark />
      <Navigation />

      {/* Header Carousel Section */}
      <section className={`min-h-[100svh] md:min-h-screen relative flex items-center overflow-hidden`}>
        <div className="w-full absolute inset-0">
          <Carousel
            setApi={setHeaderCarouselApi}
            opts={{ loop: true, align: "start" }}
            className="w-full h-full"
          >
            <CarouselContent className="ml-0 h-full">
              {headerSlides.map((slide, index) => (
                <CarouselItem key={index} className="pl-0 min-h-[100svh] md:min-h-screen w-full relative">
                  <img
                    src={slide.mediaSrc}
                    alt={slide.mediaAlt}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading={index === 0 ? "eager" : "lazy"}
                    draggable={false}
                  />
                  {/* Less intrusive, color-matched, left-aligned gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} sm:w-2/3 pointer-events-none`} />

                  <div className="relative z-10 w-full h-full flex flex-col justify-center max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 text-left min-h-[100svh] md:min-h-screen">
                    <div className="max-w-2xl ">
                      <motion.h1
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight ${slide.textColor} mb-6 drop-shadow-lg`}
                      >
                        {slide.title}
                      </motion.h1>

                      <motion.p
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className={`text-lg md:text-2xl ${slide.textColor} opacity-90 mb-10 drop-shadow-md`}
                      >
                        {slide.description}
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-wrap gap-4"
                      >
                        <PlayStoreButton />

                        <AstraButton
                          label="Learn More"
                          variant="green"
                          onClick={() => {
                            document
                              .getElementById("about")
                              ?.scrollIntoView({ behavior: "smooth" });
                          }}
                          className="text-lg shadow-lg"
                        />
                      </motion.div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 border-none bg-white/20 text-white hover:bg-white/40 z-20" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 border-none bg-white/20 text-white hover:bg-white/40 z-20" />
          </Carousel>

          <div className="absolute bottom-6 md:bottom-10 left-0 right-0 z-20 flex justify-center gap-3">
            {headerSlides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Go to slide ${idx + 1}`}
                onClick={() => headerCarouselApi?.scrollTo(idx)}
                className={`h-3 rounded-full transition-all ${headerSlideIndex === idx ? "w-10 bg-white" : "w-3 bg-white/50 hover:bg-white/80"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 bg-gradient-to-br from-indigo-50/80 via-white to-sky-50/80 overflow-hidden">
        {/* Floating Animals */}
        <div className="absolute top-32 left-0 w-full flex justify-between px-2 sm:px-10 lg:px-20 z-0">
          <SectionAnimals side="left" type="elephant" yOffset={[0, -15, 0]} delay={0} />
          <SectionAnimals side="right" type="bird" yOffset={[0, -25, 0]} delay={1} />
        </div>

        {/* Colorful gradient blobs restored to entire section and made darker/more prominent */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] opacity-40 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] opacity-50 bg-gradient-to-tr from-cyan-400 to-emerald-300 rounded-full blur-[90px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10 w-full overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-sky-100 shadow-sm text-sm font-semibold uppercase tracking-[0.2em] text-sky-600 mb-6 backdrop-blur-md">
              <Sparkles className="w-4 h-4" /> Discover Our Approach
            </span>
            <h2 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
                Rewriting Possibilities
              </span>
              <br />
              <span className="text-slate-800">
                for Every Child
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
              At ScribbleSense, we support children who struggle with dysgraphia and handwriting challenges.
              Through personalised guidance, engaging methods, and expert-led strategies, we build confidence step by step.
            </p>
          </motion.div>

          {/* Marquee Container */}
          <div className="-mx-4 sm:mx-0 mt-16">
            <FeatureMarquee />
          </div>
        </div>
      </section>
      <FAQSection
        page="home"
        title="Questions Parents Ask Most"
        subtitle="Quick answers about our support programs, assessments, and resources."
      />
      {/* About ScribbleSense Section */}
      <section
        id="about"
        className="relative min-h-[100svh] md:min-h-screen py-12 sm:py-14 md:py-20 bg-gradient-to-bl from-indigo-50/80 via-white to-sky-50/80 overflow-hidden flex items-center"
      >
        {/* Floating Animals */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full flex justify-between px-2 sm:px-10 lg:px-20 z-0">
          <SectionAnimals side="left" type="deer" yOffset={[0, -20, 0]} delay={0.5} />
          <SectionAnimals side="right" type="elephant" yOffset={[0, -10, 0]} delay={1.5} />
        </div>

        {/* Alternating pattern: Top-Left Cyan, Bottom-Right Pink */}
        <div className="absolute top-0 left-0 -translate-y-1/2 -translate-x-1/3 w-[800px] h-[800px] opacity-50 bg-gradient-to-tr from-cyan-400 to-emerald-300 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 translate-y-1/3 translate-x-1/3 w-[600px] h-[600px] opacity-40 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-[90px] pointer-events-none" />

        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute -top-32 -left-10 w-64 h-64" />
          <div className="absolute bottom-0 right-0 w-72 h-72" />
        </div>

        <div className="container mx-auto px-4 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-sky-100 shadow-sm text-sm font-semibold uppercase tracking-[0.2em] text-sky-600 mb-6 backdrop-blur-md">
              <Sparkles className="w-4 h-4" /> About ScribbleSense
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className={sectionHeadingGradient}>
                Empowering Children
              </span>
              <br />
              <span className={sectionHeadingGradient}>
                Through Expert Support
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
                ScribbleSense is dedicated to helping children overcome dysgraphia and handwriting challenges through compassionate guidance and research-backed methods. We work closely with families to build confidence, improve skills, and create a smoother, happier learning journey. With personalised support and thoughtful strategies, we help every child move forward with clarity, comfort, and pride.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                <div className="p-4 rounded-2xl bg-card/80 border border-border shadow-sm">
                  <p className="text-sm font-semibold text-primary mb-1">
                    Child-Centered Design
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Every program is thoughtfully created to match each child’s pace, needs, and learning style.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-card/80 border border-border shadow-sm">
                  <p className="text-sm font-semibold text-primary mb-1">
                    Support for Families
                  </p>

                  <p className="text-sm text-muted-foreground">
                    We guide parents with practical tools and insights, making the entire learning journey smoother and stress-free.
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
                    src="/Hand.jpg"
                    alt="About ScribbleSense – child learning with support"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
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
      <section id="games" className="relative min-h-[100svh] md:min-h-screen py-12 sm:py-14 md:py-20 bg-gradient-to-br from-indigo-50/80 via-white to-sky-50/80 overflow-hidden flex items-center">
        {/* Floating Animals */}
        <div className="absolute top-1/4 left-0 w-full flex justify-between px-2 sm:px-10 lg:px-20 z-0">
          <SectionAnimals side="left" type="bird" yOffset={[0, -30, 0]} delay={0.2} />
          <SectionAnimals side="right" type="deer" yOffset={[0, -15, 0]} delay={1.2} />
        </div>

        {/* Alternating pattern: Top-Right Pink, Bottom-Left Cyan */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] opacity-40 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] opacity-50 bg-gradient-to-tr from-cyan-400 to-emerald-300 rounded-full blur-[90px] pointer-events-none" />
        <div className="container mx-auto px-4 w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className={sectionHeadingGradient}>
                Try Our Games!
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Play, learn, and grow through games made to support handwriting and dysgraphia development.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto items-stretch">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="h-full flex"
            >
              <LetterTracingGame />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="h-full flex"
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
      <section className="relative min-h-[100svh] md:min-h-screen py-12 sm:py-14 md:py-20 bg-gradient-to-bl from-indigo-50/80 via-white to-sky-50/80 overflow-hidden flex items-center">
        {/* Floating Animals */}
        <div className="absolute top-1/3 left-0 w-full flex justify-between px-2 sm:px-10 lg:px-20 z-0">
          <SectionAnimals side="left" type="elephant" yOffset={[0, -20, 0]} delay={0.8} />
          <SectionAnimals side="right" type="bird" yOffset={[0, -25, 0]} delay={1.8} />
        </div>

        {/* Alternating pattern: Top-Left Cyan, Bottom-Right Pink */}
        <div className="absolute top-0 left-0 -translate-y-1/2 -translate-x-1/3 w-[800px] h-[800px] opacity-50 bg-gradient-to-tr from-cyan-400 to-emerald-300 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 translate-y-1/3 translate-x-1/3 w-[600px] h-[600px] opacity-40 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-[90px] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 w-full relative z-10">
          <InteractiveBentoGallery
            mediaItems={galleryImages}
            title="Children’s Illustration & Moments Gallery"
            description="A joyful showcase of children’s creativity, growth, and unforgettable learning moments."
          />
        </div>
      </section>

      {/* Scroll Sections */}
      <ContainerScroll
        titleComponent={
          <h2 className={`text-3xl md:text-6xl font-bold ${sectionHeadingGradient}`}>
            Empower Your Child's Learning Journey
            <br />
            <br />
          </h2>
        }
      >
        <video
          src="/headerVideo.mp4"
          className="mx-auto rounded-2xl object-cover h-full w-full"
          autoPlay
          loop
          muted
          playsInline
          draggable={false}
        />
      </ContainerScroll>

      <ContainerScroll
        titleComponent={
          <h2 className={`text-4xl md:text-5xl font-bold ${sectionHeadingGradient} pt-36 mt-24`}>
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
          loading="lazy"
          decoding="async"
        />
      </ContainerScroll>

      {/* CTA Section */}
      <section className="relative py-20 bg-gradient-to-br from-indigo-50/80 via-white to-sky-50/80 mt-20 overflow-hidden">
        {/* Floating Animals */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full flex justify-between px-2 sm:px-10 lg:px-20 z-0 pointer-events-none">
          <SectionAnimals side="left" type="deer" yOffset={[0, -15, 0]} delay={0.3} />
          <SectionAnimals side="right" type="elephant" yOffset={[0, -20, 0]} delay={1.3} />
        </div>

        {/* Alternating pattern: Top-Right Pink, Bottom-Left Cyan */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] opacity-40 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] opacity-50 bg-gradient-to-tr from-cyan-400 to-emerald-300 rounded-full blur-[90px] pointer-events-none" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <Sparkles className="w-16 h-16 mx-auto mb-6 text-primary animate-float" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className={sectionHeadingGradient}>
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
      <footer className={`bg-white/90 border-t border-sky-100 py-8 ${lightThemeBg}`}>
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
