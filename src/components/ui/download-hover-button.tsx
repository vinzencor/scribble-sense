"use client"

import * as React from "react"
import { motion } from "framer-motion"

interface AnimatedDownloadButtonProps {
  href: string
  label?: string
  className?: string
}

export default function AnimatedDownloadButton({
  href,
  label = "Download",
  className,
}: AnimatedDownloadButtonProps) {
  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <a
      href={href}
      download
      className={`inline-block ${className ?? ""}`}
    >
      <motion.div
        initial={{ width: 64, height: 48 }}
        whileHover={{ width: 210 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        transition={{ duration: 0.3 }}
        className="bg-pink-500 hover:bg-pink-600 flex items-center justify-center overflow-hidden relative shadow-md"
        style={{ borderRadius: 9999 }}
      >
        {/* Icon state */}
        <motion.div
          className="absolute"
          animate={{
            opacity: isHovered ? 0 : 1,
            scale: isHovered ? 0.8 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-white text-xl leading-none">↓</span>
        </motion.div>

        {/* Label state */}
        <motion.div
          className="w-full flex justify-center items-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2, delay: isHovered ? 0.1 : 0 }}
        >
          <span className="text-white text-sm font-semibold whitespace-nowrap">
            {label}
          </span>
        </motion.div>
      </motion.div>
    </a>
  )
}

