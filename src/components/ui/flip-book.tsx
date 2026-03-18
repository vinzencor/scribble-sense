"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, Download, BookOpen } from "lucide-react"
import { Document, Page, pdfjs } from "react-pdf"
// @ts-ignore
import HTMLFlipBook from "react-pageflip"
import { cn } from "@/lib/utils"

import "react-pdf/dist/Page/AnnotationLayer.css"
import "react-pdf/dist/Page/TextLayer.css"

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`

interface FlipBookProps {
  isOpen: boolean
  onClose: () => void
  pdfUrl: string
  title: string
  coverImage?: string
  pageImages?: string[]
}

const PageWrapper = React.forwardRef<HTMLDivElement, { pageNum: number; pageWidth: number; pageHeight: number }>(
  ({ pageNum, pageWidth, pageHeight }, ref) => {
    return (
      <div
        className="page bg-white shadow-md border-r border-[#ecece8] overflow-hidden"
        ref={ref}
        style={{ width: pageWidth, height: pageHeight }}
      >
        <Page
          pageNumber={pageNum}
          width={pageWidth}
          renderAnnotationLayer={false}
          renderTextLayer={false}
          loading={<div className="h-full w-full animate-pulse bg-slate-100 flex items-center justify-center text-sm text-slate-400">Loading page...</div>}
        />
        {/* Page numbering */}
        <div className="absolute bottom-3 left-0 right-0 text-center text-[10px] text-slate-400 font-medium">
          {pageNum}
        </div>
      </div>
    )
  }
)
PageWrapper.displayName = "PageWrapper"

const FlipBook: React.FC<FlipBookProps> = ({
  isOpen,
  onClose,
  pdfUrl,
  title,
  coverImage,
}) => {
  const [isBookOpen, setIsBookOpen] = useState(false)
  const [numPages, setNumPages] = useState<number>(0)
  const [pageWidth, setPageWidth] = useState(400)
  const [pageHeight, setPageHeight] = useState(565) // ~1.414 ratio
  const [pdfFailed, setPdfFailed] = useState(false)
  const bookRef = useRef<any>(null)

  useEffect(() => {
    const updateDimensions = () => {
      // For mobile: single page full screen-ish
      // For desktop: still single page (portrait) as requested by user
      const maxW = Math.min(600, window.innerWidth - 60)
      const nextW = Math.max(280, maxW)
      setPageWidth(nextW)
      setPageHeight(nextW * 1.414)
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  useEffect(() => {
    if (!isOpen) {
      setIsBookOpen(false)
      setNumPages(0)
      setPdfFailed(false)
    }
  }, [isOpen, pdfUrl])

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = pdfUrl
    link.download = pdfUrl.split("/").pop() || "document.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const nextButtonClick = () => {
    if (bookRef.current && bookRef.current.pageFlip()) {
      bookRef.current.pageFlip().flipNext()
    }
  }

  const prevButtonClick = () => {
    if (bookRef.current && bookRef.current.pageFlip()) {
      bookRef.current.pageFlip().flipPrev()
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 30 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative max-w-[100vw] max-h-[100vh] flex flex-col items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Controls */}
          <div className="absolute -top-16 left-0 right-0 flex items-center justify-between w-full min-w-[300px]">
            <h2 className="text-white text-lg font-semibold truncate pr-4 drop-shadow-md">{title}</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownload}
                className="p-2 md:px-4 md:py-2 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 transition-colors flex items-center gap-2 text-white text-sm"
              >
                <Download className="w-4 h-4" />
                <span className="hidden md:inline">Download</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 md:p-2 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </button>
            </div>
          </div>

          {!isBookOpen ? (
            <div className="relative transform-gpu" style={{ perspective: "1500px" }}>
              <motion.button
                type="button"
                onClick={() => setIsBookOpen(true)}
                className="relative overflow-hidden rounded-md shadow-2xl bg-white flex flex-col items-center justify-center book-cover"
                style={{ width: pageWidth, height: pageHeight, transformStyle: "preserve-3d" }}
                whileHover={{ scale: 1.02, rotateY: -5 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.4 }}
              >
                {/* Book Spine rendering */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/25 via-black/10 to-transparent z-10 pointer-events-none" />

                {pdfFailed ? (
                  coverImage ? (
                    <img src={coverImage} alt="Cover" className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#382467] to-[#4f2f8d] flex items-center justify-center p-6">
                      <p className="text-white text-center font-bold text-2xl drop-shadow-lg">{title}</p>
                    </div>
                  )
                ) : (
                  <div className="absolute inset-0 bg-white">
                    <Document
                      file={pdfUrl}
                      loading={<div className="h-full w-full animate-pulse bg-slate-200" />}
                      onLoadError={() => setPdfFailed(true)}
                      error={<div className="hidden" />}
                    >
                      <Page pageNumber={1} width={pageWidth} renderAnnotationLayer={false} renderTextLayer={false} />
                    </Document>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col items-center justify-end p-8 z-20">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="p-3 bg-white/20 backdrop-blur-md rounded-full mb-4 shadow-lg"
                  >
                    <BookOpen className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </motion.div>
                  <h3 className="text-white text-xl md:text-2xl font-bold text-center mb-3 drop-shadow-md">{title}</h3>
                  <span className="text-white text-sm font-medium px-5 py-2.5 bg-[#382467] hover:bg-[#4f2f8d] transition-colors rounded-full shadow-lg">
                    Tap to Read
                  </span>
                </div>
              </motion.button>
              {/* Cover Shadow */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[90%] h-8 bg-black/60 blur-xl rounded-full -z-10" />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative flex items-center justify-center pdf-flip-container shadow-2xl rounded-sm"
            >
              <div className="relative">
                {/* Outer Book Binding */}
                <div className="absolute -left-3 top-0 bottom-0 w-3 bg-[#e4e1db] border border-[#d6c9b7] rounded-l-md shadow-inner z-0 pointer-events-none" />

                <Document
                  file={pdfUrl}
                  onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                  onLoadError={() => setPdfFailed(true)}
                  loading={
                    <div
                      className="bg-[#faf9f6] flex flex-col items-center justify-center shadow-xl border border-[#ecece8]"
                      style={{ width: pageWidth, height: pageHeight }}
                    >
                      <div className="w-12 h-12 border-4 border-[#382467]/20 border-t-[#382467] rounded-full animate-spin mb-4" />
                      <span className="text-[#382467] font-medium tracking-wide">Preparing pages...</span>
                    </div>
                  }
                  error={
                    <div
                      className="bg-[#faf9f6] flex flex-col items-center justify-center shadow-xl border border-[#ecece8] p-8 text-center"
                      style={{ width: pageWidth, height: pageHeight }}
                    >
                      <p className="text-red-500 font-medium mb-2">Failed to load PDF.</p>
                      <p className="text-slate-500 text-sm">You can still download the file using the button above.</p>
                    </div>
                  }
                >
                  {numPages > 0 && !pdfFailed && (
                    <HTMLFlipBook
                      width={pageWidth}
                      height={pageHeight}
                      size="fixed"
                      minWidth={280}
                      maxWidth={pageWidth}
                      minHeight={400}
                      maxHeight={pageHeight}
                      drawShadow={true}
                      flippingTime={600}
                      usePortrait={true} // Forces single page view (one side)
                      startPage={0}
                      className="flip-book bg-white shadow-xl"
                      style={{ margin: "0 auto", borderRadius: "0 4px 4px 0" }}
                      ref={bookRef}
                      showCover={false}
                      mobileScrollSupport={true}
                    >
                      {Array.from(new Array(numPages), (el, index) => (
                        <PageWrapper
                          key={`page_${index + 1}`}
                          pageNum={index + 1}
                          pageWidth={pageWidth}
                          pageHeight={pageHeight}
                        />
                      ))}
                    </HTMLFlipBook>
                  )}
                </Document>
              </div>

              {numPages > 0 && !pdfFailed && (
                <>
                  <button
                    onClick={prevButtonClick}
                    className="absolute -left-12 md:-left-16 top-1/2 -translate-y-1/2 p-2.5 md:p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full backdrop-blur-md transition-all z-20"
                    aria-label="Previous Page"
                  >
                    <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </button>
                  <button
                    onClick={nextButtonClick}
                    className="absolute -right-12 md:-right-16 top-1/2 -translate-y-1/2 p-2.5 md:p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full backdrop-blur-md transition-all z-20"
                    aria-label="Next Page"
                  >
                    <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </button>

                  {/* Page hints */}
                  <div className="absolute -bottom-12 left-0 right-0 text-center text-white/70 text-sm font-medium">
                    Swipe or use arrows to flip pages
                  </div>
                </>
              )}
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default FlipBook
