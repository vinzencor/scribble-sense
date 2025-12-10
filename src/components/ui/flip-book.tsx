"use client"

import React, { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, Download, Smartphone } from "lucide-react"
import { cn } from "@/lib/utils"

// Storage key for tracking returning users
const RETURNING_USER_KEY = "scribblesense_returning_user"
const PREVIEW_DURATION = 15 // seconds before showing app redirect

// App store links
const APP_LINKS = {
  ios: "https://apps.apple.com/gb/app/scribblesense/id6744368645",
  android: "https://play.google.com/store/apps/details?id=com.scribblesense.app",
}

// Detect if user is on iOS or Android
const getDeviceType = (): "ios" | "android" | "desktop" => {
  if (typeof window === "undefined") return "desktop"

  const userAgent = navigator.userAgent || navigator.vendor || (window as Window & { opera?: string }).opera || ""

  if (/iPad|iPhone|iPod/.test(userAgent)) {
    return "ios"
  }
  if (/android/i.test(userAgent)) {
    return "android"
  }
  return "desktop"
}

// Check if user is a returning user (has full access)
const isReturningUser = (): boolean => {
  if (typeof window === "undefined") return false
  return localStorage.getItem(RETURNING_USER_KEY) === "true"
}

// Mark user as returning (grant full access)
const markAsReturningUser = (): void => {
  if (typeof window === "undefined") return
  localStorage.setItem(RETURNING_USER_KEY, "true")
}

interface FlipBookProps {
  isOpen: boolean
  onClose: () => void
  pdfUrl: string
  title: string
  coverImage?: string
  pageImages?: string[]
}

const FlipBook: React.FC<FlipBookProps> = ({
  isOpen,
  onClose,
  pdfUrl,
  title,
  coverImage = "https://scribblesense.co.uk/assets/img/slider/slide-02.jpg",
}) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)
  const [flipDirection, setFlipDirection] = useState<"next" | "prev">("next")
  const [showPdf, setShowPdf] = useState(false)
  const [hasFullAccess, setHasFullAccess] = useState(false)
  const [previewTimeLeft, setPreviewTimeLeft] = useState(PREVIEW_DURATION)
  const [showAppRedirect, setShowAppRedirect] = useState(false)
  const [deviceType, setDeviceType] = useState<"ios" | "android" | "desktop">("desktop")

  // Check for returning user and device type on mount
  useEffect(() => {
    setHasFullAccess(isReturningUser())
    setDeviceType(getDeviceType())
  }, [])

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setCurrentPage(0)
      setShowPdf(false)
      setPreviewTimeLeft(PREVIEW_DURATION)
      setShowAppRedirect(false)
    }
  }, [isOpen])

  // Preview timer - counts down when PDF is shown and user doesn't have full access
  useEffect(() => {
    if (!isOpen || !showPdf || hasFullAccess) return

    const timer = setInterval(() => {
      setPreviewTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setShowAppRedirect(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isOpen, showPdf, hasFullAccess])

  // Handle app redirect
  const handleAppRedirect = useCallback(() => {
    const link = deviceType === "ios" ? APP_LINKS.ios : APP_LINKS.android
    window.open(link, "_blank")
    // Mark user as returning so they get full access next time
    markAsReturningUser()
    setHasFullAccess(true)
    setShowAppRedirect(false)
    setPreviewTimeLeft(PREVIEW_DURATION)
  }, [deviceType])

  // Grant full access directly (for testing or "I already have the app" button)
  const grantFullAccess = useCallback(() => {
    markAsReturningUser()
    setHasFullAccess(true)
    setShowAppRedirect(false)
  }, [])

  const handleNextPage = () => {
    if (isFlipping) return

    if (currentPage === 0) {
      // Flip from cover to PDF view
      setFlipDirection("next")
      setIsFlipping(true)
      setTimeout(() => {
        setCurrentPage(1)
        setShowPdf(true)
        setIsFlipping(false)
      }, 600)
    }
  }

  const handlePrevPage = () => {
    if (isFlipping || currentPage === 0) return

    setFlipDirection("prev")
    setIsFlipping(true)
    setTimeout(() => {
      setCurrentPage(0)
      setShowPdf(false)
      setIsFlipping(false)
    }, 600)
  }

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = pdfUrl
    link.download = pdfUrl.split("/").pop() || "document.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, rotateY: -10 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative max-w-[95vw] max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Controls */}
          <div className="absolute -top-14 left-0 right-0 flex items-center justify-between">
            <h2 className="text-white text-lg font-semibold truncate pr-4">{title}</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownload}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-2 text-white text-sm px-4"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>

          {/* Book container */}
          <div
            className="book-cover relative shadow-2xl"
            style={{ perspective: "2000px" }}
          >
            <div
              className="book flex"
              style={{
                width: showPdf ? "900px" : "640px",
                height: "580px",
                transformStyle: "preserve-3d",
                transition: "width 0.6s ease"
              }}
            >
              {/* Left page */}
              <div
                className={cn(
                  "w-1/2 h-full bg-[#F5F5F5] overflow-hidden relative",
                  !showPdf && "rounded-l-md",
                  showPdf && "rounded-l-md"
                )}
                style={{
                  boxShadow: "inset -10px 0 30px rgba(0,0,0,0.1), inset 0 0 40px rgba(0,0,0,0.05)",
                  background: "linear-gradient(90deg, #e8e8e8 0%, #f5f5f5 20%)"
                }}
              >
                {!showPdf ? (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8">
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#382467]/10 flex items-center justify-center">
                        <ChevronRight className="w-10 h-10 text-[#382467]" />
                      </div>
                      <p className="text-slate-500 text-lg mb-2">Click the cover to open</p>
                      <p className="text-slate-400 text-sm">or use the arrow buttons</p>
                    </div>
                  </div>
                ) : (
                  <iframe
                    src={`${pdfUrl}#page=1&toolbar=0&navpanes=0`}
                    className="w-full h-full border-0"
                    title={`${title} - Left Page`}
                  />
                )}
                {/* Page edge effect */}
                <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-gradient-to-r from-transparent to-slate-300" />
              </div>

              {/* Right page (flipping page) */}
              <div
                className={cn(
                  "w-1/2 h-full bg-[#F5F5F5] overflow-hidden cursor-pointer relative rounded-r-md",
                  isFlipping && flipDirection === "next" && "animate-page-flip",
                  isFlipping && flipDirection === "prev" && "animate-page-flip-reverse"
                )}
                style={{
                  boxShadow: "inset 10px 0 30px rgba(0,0,0,0.1), 5px 0 20px rgba(0,0,0,0.2)",
                  transformOrigin: "left center",
                  transformStyle: "preserve-3d",
                  background: "linear-gradient(-90deg, #e8e8e8 0%, #f5f5f5 20%)"
                }}
                onClick={!showPdf ? handleNextPage : undefined}
              >
                {!showPdf ? (
                  <div className="w-full h-full relative group">
                    <img
                      src={coverImage}
                      alt="Book cover"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#382467]/80 via-[#382467]/30 to-transparent flex flex-col items-center justify-end p-8">
                      <h1 className="text-3xl font-bold text-white mb-3 text-center drop-shadow-lg">{title}</h1>
                      <p className="text-white/90 text-sm mb-6">Click to open</p>
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-all group-hover:scale-110">
                        <ChevronRight className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    {/* Book spine effect */}
                    <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />
                  </div>
                ) : (
                  <iframe
                    src={`${pdfUrl}#page=2&toolbar=0&navpanes=0`}
                    className="w-full h-full border-0"
                    title={`${title} - Right Page`}
                  />
                )}
              </div>
            </div>

            {/* Navigation arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                handlePrevPage()
              }}
              disabled={currentPage === 0 || isFlipping}
              className={cn(
                "absolute left-[-60px] top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all",
                (currentPage === 0 || isFlipping) && "opacity-30 cursor-not-allowed hover:bg-white/20"
              )}
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                handleNextPage()
              }}
              disabled={showPdf || isFlipping}
              className={cn(
                "absolute right-[-60px] top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all",
                (showPdf || isFlipping) && "opacity-30 cursor-not-allowed hover:bg-white/20"
              )}
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Book shadow */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[95%] h-6 bg-black/30 blur-xl rounded-full" />

            {/* Preview timer overlay - shows when PDF is visible and user doesn't have full access */}
            {showPdf && !hasFullAccess && !showAppRedirect && (
              <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-sm flex items-center gap-2">
                <div className="w-8 h-8 rounded-full border-2 border-white/30 flex items-center justify-center">
                  <span className="font-bold">{previewTimeLeft}</span>
                </div>
                <span>Preview ends in {previewTimeLeft}s</span>
              </div>
            )}

            {/* App redirect overlay */}
            {showAppRedirect && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-black/90 backdrop-blur-md rounded-lg flex flex-col items-center justify-center p-8 z-10"
              >
                <div className="text-center max-w-md">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#382467] flex items-center justify-center">
                    <Smartphone className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Get Full Access
                  </h3>
                  <p className="text-white/80 mb-6">
                    Download the ScribbleSense app to unlock all workbooks and exercises. It's free!
                  </p>

                  <div className="space-y-3">
                    <button
                      onClick={handleAppRedirect}
                      className="w-full px-6 py-4 bg-[#382467] hover:bg-[#4a3080] text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-3"
                    >
                      <Smartphone className="w-5 h-5" />
                      {deviceType === "ios" ? "Download on App Store" :
                       deviceType === "android" ? "Get it on Google Play" :
                       "Download the App"}
                    </button>

                    <button
                      onClick={grantFullAccess}
                      className="w-full px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm transition-colors"
                    >
                      I already have the app
                    </button>
                  </div>

                  {deviceType === "desktop" && (
                    <div className="mt-6 flex gap-4 justify-center">
                      <a
                        href={APP_LINKS.ios}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-white text-sm underline"
                      >
                        iOS App Store
                      </a>
                      <a
                        href={APP_LINKS.android}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-white text-sm underline"
                      >
                        Google Play
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {/* Instructions */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-white/60 text-sm text-center">
            {!showPdf ? "Click the cover or right arrow to open the book" :
             hasFullAccess ? "You have full access to this workbook" :
             `Preview time remaining: ${previewTimeLeft}s`}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default FlipBook

