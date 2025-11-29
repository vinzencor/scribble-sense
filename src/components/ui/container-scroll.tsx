import React, { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

interface HeaderProps {
  translate: any;
  titleComponent: React.ReactNode;
}

export function Header({ translate, titleComponent }: HeaderProps) {
  return (
    <motion.div
      role="banner"
      style={{ translateY: translate }}
      className="max-w-5xl mx-auto text-center px-4"
    >
      {titleComponent}
    </motion.div>
  );
}

interface CardProps {
  rotateX: any;
  scale: any;
  children: React.ReactNode;
}

export function Card({ rotateX, scale, children }: CardProps) {
  return (
    <motion.div
      role="region"
      style={{
        rotateX,
        scale,
        boxShadow: "0 20px 60px -10px rgba(0,0,0,0.3)",
      }}
      className="max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full border-4 border-primary/20 p-2 md:p-6 bg-card rounded-3xl"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-muted">
        {children}
      </div>
    </motion.div>
  );
}

interface ContainerScrollProps {
  titleComponent: React.ReactNode;
  children: React.ReactNode;
}

export default function ContainerScroll({ titleComponent, children }: ContainerScrollProps) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scaleRange = isMobile ? [0.7, 0.9] : [1.05, 1];
  const rotateX = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleRange);
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      ref={containerRef}
      className="h-[30rem] md:h-[50rem] flex items-center justify-center relative p-2 md:p-20"
    >
      <div className="w-full relative py-10 md:py-40" style={{ perspective: "1000px" }}>
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotateX={rotateX} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
}
