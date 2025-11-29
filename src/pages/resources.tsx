"use client"

import { motion } from "framer-motion"
import AnimatedDownloadButton from "@/components/ui/download-hover-button"
import Navigation from "@/components/Navigation"
import MouseSpark from "@/components/ui/mouse-spark"

type ResourceItem = {
  id: number
  title: string
  fileUrl: string
}

const RESOURCES: ResourceItem[] = [
  {
    id: 1,
    title: "Deliver Therapeutic Strategies",
    fileUrl: "/downloads/deliver-therapeutic-strategies.pdf",
  },
  {
    id: 2,
    title: "Enhancing Writing Skills with Technology",
    fileUrl: "/downloads/enhancing-writing-skills-with-technology.pdf",
  },
  {
    id: 3,
    title: "Outlines and Visual Aids for Writing Success",
    fileUrl: "/downloads/outlines-and-visual-aids-for-writing-success.pdf",
  },
  {
    id: 4,
    title: "Awareness Workshops for Dysgraphia",
    fileUrl: "/downloads/awareness-workshops-for-dysgraphia.pdf",
  },
  {
    id: 5,
    title: "Tailored Handwriting Enhancement Programs",
    fileUrl: "/downloads/tailored-handwriting-enhancement-programs.pdf",
  },
]

// Animations
const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.12,
    },
  },
}

const rowVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
}

export default function ResourcesPage() {
  return (
    <main className="bg-white min-h-screen">
      <MouseSpark />
      <Navigation />
      {/* Hero / banner */}
      <section
        className="relative h-[260px] md:h-[320px] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage:
            "url('https://scribblesense.co.uk/assets/img/slider/slide-02.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Dark overlay so text pops */}
        <div className="absolute inset-0 bg-black/55" />

        <motion.div
          className="relative z-10 text-center px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs md:text-sm text-slate-100/80 mb-2">
            Home – Resources
          </p>
          <h1 className="text-3xl md:text-5xl font-semibold text-white mb-2">
            Our Resources
          </h1>
          <p className="text-slate-100/90 max-w-2xl mx-auto text-xs md:text-sm">
            Download helpful guides, worksheets, and materials designed to
            support children with dysgraphia and their families.
          </p>
        </motion.div>

        {/* Torn edge transition into white */}
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </section>

      {/* Learning Materials list */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-5xl px-4">
          <motion.div
            className="text-center mb-10 md:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-4xl font-bold text-[#382467] mb-3">
              Learning Materials
            </h2>
            <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
              Simple, practical resources that you can use at home, in the
              classroom, or during therapy sessions to make handwriting practice
              more engaging.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-4"
          >
            {RESOURCES.map((resource) => (
              <motion.div
                key={resource.id}
                variants={rowVariants}
                whileHover={{
                  y: -2,
                  boxShadow:
                    "0 10px 25px rgba(148, 163, 184, 0.35)",
                }}
                className="bg-white border border-slate-200 rounded-xl px-4 md:px-6 py-4 flex items-center justify-between gap-4"
              >
                <div className="flex-1">
                  <p className="text-sm md:text-base font-medium text-slate-800">
                    {resource.title}
                  </p>
                </div>

                <div className="flex-shrink-0">
                  <AnimatedDownloadButton
                    href={resource.fileUrl}
                    label="Download"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  )
}
