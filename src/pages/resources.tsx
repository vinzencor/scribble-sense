"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import AnimatedDownloadButton from "@/components/ui/download-hover-button"
import Navigation from "@/components/Navigation"
import MouseSpark from "@/components/ui/mouse-spark"
import FlipBook from "@/components/ui/flip-book"
import { BookOpen, X, Loader2 } from "lucide-react"
import { getResources, getWorkbooks, Resource, Workbook } from "@/lib/supabase"
import { sendEmail } from "@/lib/email"
import { toast } from "sonner"
import { Document, Page, pdfjs } from "react-pdf"
import "react-pdf/dist/Page/AnnotationLayer.css"
import "react-pdf/dist/Page/TextLayer.css"

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`

type ResourceItem = {
  id: string | number
  title: string
  fileUrl: string
}

function WorkbookCover({
  pdfUrl,
  title,
  fallbackImage,
}: {
  pdfUrl: string
  title: string
  fallbackImage?: string
}) {
  const [pdfFailed, setPdfFailed] = useState(false)

  if (pdfFailed && fallbackImage) {
    return (
      <img
        src={fallbackImage}
        alt={title}
        className="w-full h-full object-cover"
      />
    )
  }

  if (pdfFailed) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-[#382467] to-[#4f2f8d] flex items-center justify-center p-5">
        <p className="text-white text-center font-semibold leading-tight">{title}</p>
      </div>
    )
  }

  return (
    <div className="w-full h-full bg-white [&_.react-pdf__Page]:!w-full [&_.react-pdf__Page__canvas]:!w-full [&_.react-pdf__Page__canvas]:!h-full">
      <Document
        file={pdfUrl}
        loading={
          <div className="w-full h-full animate-pulse bg-slate-200" />
        }
        onLoadError={() => setPdfFailed(true)}
        error={<div className="hidden" />}
      >
        <Page
          pageNumber={1}
          width={280}
          renderAnnotationLayer={false}
          renderTextLayer={false}
        />
      </Document>
    </div>
  )
}
type WorkbookItem = {
  id: string
  title: string
  pdfUrl: string
  coverImage: string
  description: string
}

const FALLBACK_RESOURCES: ResourceItem[] = [
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

const FALLBACK_WORKBOOKS: WorkbookItem[] = [
  {
    id: "curve-line-tracing",
    title: "Curve Line Tracing",
    pdfUrl: "/CurveLineTracing.pdf",
    coverImage: "",
    description: "Practice curve and line tracing exercises",
  },
  {
    id: "exercises-dashboard",
    title: "List of Exercises",
    pdfUrl: "/List of Exercise - Social media dash board.pdf",
    coverImage: "",
    description: "Comprehensive exercise collection",
  },
  {
    id: "st-workbook",
    title: "ST Workbook",
    pdfUrl: "/ST.pdf",
    coverImage: "",
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
  const [pendingWorkbook, setPendingWorkbook] = useState<WorkbookItem | null>(null)
  const [showContactModal, setShowContactModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [resources, setResources] = useState<ResourceItem[]>(FALLBACK_RESOURCES)
  const [workbooks, setWorkbooks] = useState<WorkbookItem[]>(FALLBACK_WORKBOOKS)

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await sendEmail(formData.name, formData.email, formData.message)
      toast.success("Details submitted successfully!")
      setShowContactModal(false)
      setActiveWorkbook(pendingWorkbook)
      setFormData({ name: "", email: "", message: "" })
    } catch (error) {
      toast.error("Failed to submit details. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }


  useEffect(() => {
    const fetchData = async () => {
      const [resourcesRes, workbooksRes] = await Promise.all([
        getResources(),
        getWorkbooks()
      ])

      if (resourcesRes.data && resourcesRes.data.length > 0) {
        setResources(resourcesRes.data.map((r: Resource) => ({
          id: r.id,
          title: r.title,
          fileUrl: r.file_url,
        })))
      }

      if (workbooksRes.data && workbooksRes.data.length > 0) {
        setWorkbooks(workbooksRes.data.map((w: Workbook) => ({
          id: w.id,
          title: w.title,
          pdfUrl: w.pdf_url,
          coverImage: w.cover_image_url || "",
          description: w.description,
        })))
      }

    }
    fetchData()
  }, [])

  return (
    <main className="bg-white min-h-screen">
      <MouseSpark />
      <Navigation />
      {/* Hero / banner */}
      <section
        className="relative h-[260px] md:h-[320px] flex items-center justify-center overflow-hidden bg-gradient-to-r from-pink-100 via-purple-100 to-cyan-100"
      >

        <motion.div
          className="relative z-10 text-center px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm md:text-base text-slate-800/80 mb-2 font-medium">
            Home – Resources
          </p>
          <h1 className="text-4xl md:text-7xl font-['Fredoka',sans-serif] font-bold text-[#382467] mb-4">
            Our Resources
          </h1>
          <p className="text-slate-700 max-w-2xl mx-auto text-base md:text-xl font-medium">
            Download helpful guides, worksheets, and materials designed to
            support children with dysgraphia and their families.
          </p>
        </motion.div>

        {/* Torn edge transition into white */}
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </section>

      {/* Learning Materials list */}
      {/* <section className="py-16 md:py-24">
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
            {resources.map((resource) => (
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
      </section> */}

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
            {workbooks.map((workbook, index) => (
              <motion.div
                key={workbook.id}
                className="relative cursor-pointer group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setPendingWorkbook(workbook)
                  setShowContactModal(true)
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative w-[260px] h-[360px] md:w-[280px] md:h-[380px] rounded-lg overflow-hidden shadow-2xl">
                  <WorkbookCover
                    pdfUrl={workbook.pdfUrl}
                    title={workbook.title}
                    fallbackImage={workbook.coverImage}
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

      {/* Contact Modal */}
      <AnimatePresence>
        {showContactModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 md:p-8"
            >
              <button
                onClick={() => setShowContactModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
                disabled={isSubmitting}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6 text-center">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-6 h-6 text-pink-500" />
                </div>
                <h3 className="text-xl font-bold text-[#382467]">
                  Want to peek inside?
                </h3>
                <p className="text-sm text-slate-500 mt-2">
                  Please share your details to preview this workbook.
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    placeholder="Your name"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    placeholder="your@email.com"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Message
                  </label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all resize-none"
                    placeholder="Why are you interested in this workbook?"
                    disabled={isSubmitting}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 w-full py-3 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-xl flex items-center justify-center transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Opening...
                    </>
                  ) : (
                    "Open Workbook"
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
