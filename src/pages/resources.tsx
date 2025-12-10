"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import AnimatedDownloadButton from "@/components/ui/download-hover-button"
import Navigation from "@/components/Navigation"
import MouseSpark from "@/components/ui/mouse-spark"
import FlipBook from "@/components/ui/flip-book"
import { BookOpen } from "lucide-react"

type ResourceItem = {
  id: number
  title: string
  fileUrl: string
}

type WorkbookItem = {
  id: string
  title: string
  pdfUrl: string
  coverImage: string
  description: string
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

const WORKBOOKS: WorkbookItem[] = [
  {
    id: "curve-line-tracing",
    title: "Curve Line Tracing",
    pdfUrl: "/CurveLineTracing.pdf",
    coverImage: "https://scribblesense.co.uk/assets/img/slider/slide-02.jpg",
    description: "Practice curve and line tracing exercises",
  },
  {
    id: "exercises-dashboard",
    title: "List of Exercises",
    pdfUrl: "/List of Exercise - Social media dash board.pdf",
    coverImage: "https://scribblesense.co.uk/assets/img/slider/slide-01.jpg",
    description: "Comprehensive exercise collection",
  },
  {
    id: "st-workbook",
    title: "ST Workbook",
    pdfUrl: "/ST.pdf",
    coverImage: "https://scribblesense.co.uk/assets/img/slider/slide-03.jpg",
    description: "Special therapy workbook activities",
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
      ease: "easeOut" as const,
      when: "beforeChildren" as const,
      staggerChildren: 0.12,
    },
  },
}

const rowVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
}

export default function ResourcesPage() {
  const [activeWorkbook, setActiveWorkbook] = useState<WorkbookItem | null>(null)

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

      {/* Interactive Workbook Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto max-w-6xl px-4">
          <motion.div
            className="text-center mb-10 md:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-4xl font-bold text-[#382467] mb-3">
              Interactive Workbooks
            </h2>
            <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
              Click on any book below to preview. Download our app for full access to all workbooks!
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
          >
            {WORKBOOKS.map((workbook, index) => (
              <motion.div
                key={workbook.id}
                className="relative cursor-pointer group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveWorkbook(workbook)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative w-[260px] h-[360px] md:w-[280px] md:h-[380px] rounded-lg overflow-hidden shadow-2xl">
                  {/* Book cover image */}
                  <img
                    src={workbook.coverImage}
                    alt={workbook.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay with title */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#382467]/90 via-[#382467]/40 to-transparent flex flex-col items-center justify-end p-6">
                    <BookOpen className="w-10 h-10 text-white mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="text-lg md:text-xl font-bold text-white text-center mb-1">
                      {workbook.title}
                    </h3>
                    <p className="text-white/70 text-xs text-center mb-3">
                      {workbook.description}
                    </p>
                    <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm group-hover:bg-white/30 transition-colors">
                      Click to Open
                    </span>
                  </div>
                  {/* Book spine effect */}
                  <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black/30 to-transparent" />
                </div>
                {/* Book shadow */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[90%] h-8 bg-black/20 blur-xl rounded-full" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FlipBook Modal */}
      <FlipBook
        isOpen={activeWorkbook !== null}
        onClose={() => setActiveWorkbook(null)}
        pdfUrl={activeWorkbook?.pdfUrl || ""}
        title={activeWorkbook?.title || ""}
        coverImage={activeWorkbook?.coverImage}
        pageImages={[]}
      />
    </main>
  )
}
