"use client"

import React from "react"
import { motion } from "framer-motion"
import Navigation from "@/components/Navigation"
import MouseSpark from "@/components/ui/mouse-spark"

export default function AboutPage() {
  return (
    <main className="bg-white min-h-screen">
      <MouseSpark />
      <Navigation />

      {/* HERO */}
      <section
        className="relative h-[260px] md:h-[320px] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage:
            "url('https://scribblesense.co.uk/assets/img/slider/slide-01.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />

        <motion.div
          className="relative z-10 text-center px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm text-slate-100/80 mb-2">Home – About</p>
          <h1 className="text-3xl md:text-5xl font-semibold text-white mb-2">
            About Our Journey
          </h1>
          <p className="text-slate-100/90 max-w-2xl mx-auto text-sm md:text-base">
            Discover how ScribbleSense supports children with dysgraphia through
            playful, research-backed solutions.
          </p>
        </motion.div>

        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </section>

      {/* SPLIT: sticky image (left) + scrollable content (right) */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            {/* LEFT: STICKY IMAGE */}
            <div className="hidden lg:block">
              <div className="sticky top-28">
                <motion.div
                  className="relative w-full h-[70vh] rounded-3xl overflow-hidden shadow-xl bg-slate-100"
                  initial={{ opacity: 0, y: 30, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <img
                    src="https://scribblesense.co.uk/assets/img/portfolio/creativeZipp/creative/Untitled-1.jpg"
                    alt="ScribbleSense children illustration"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                </motion.div>
              </div>
            </div>

            {/* RIGHT: ALL TEXT SCROLLS */}
            <div className="space-y-12">
              {/* Section 1: About + Vision */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="space-y-4"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-pink-500">
                  About ScribbleSense
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-[#382467]">
                  Welcome to ScribbleSense
                </h2>
                <p className="text-base md:text-lg leading-relaxed text-slate-700">
                  Welcome to ScribbleSense, where we are dedicated to
                  transforming the lives of children with dysgraphia and
                  handwriting challenges. Our mission is to provide a nurturing
                  and effective support system that empowers children to
                  overcome obstacles and thrive academically and personally.
                </p>

                <h3 className="text-xl md:text-2xl font-semibold text-[#382467]">
                  Our Vision
                </h3>
                <p className="text-base md:text-lg leading-relaxed text-slate-700">
                  At ScribbleSense, we believe that every child deserves the
                  opportunity to express themselves clearly and confidently. Our
                  vision is to create a world where children with dysgraphia
                  receive the personalized care and innovative solutions they
                  need to excel in their writing skills and beyond.
                </p>
              </motion.div>

              {/* Section 2: Holistic + Innovative */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                className="space-y-4"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-pink-500">
                  Our Approach
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-[#382467]">
                  A Holistic Approach
                </h2>
                <p className="text-base md:text-lg leading-relaxed text-slate-700">
                  We adopt a holistic approach to dysgraphia intervention,
                  focusing on the individual needs and circumstances of each
                  child. Our personalized support plans are designed to address
                  not only the specific challenges of dysgraphia but also to
                  build on each child's strengths. We understand that every
                  child's journey is unique, and we are committed to providing a
                  well-rounded and compassionate support experience.
                </p>

                <h3 className="text-xl md:text-2xl font-semibold text-[#382467]">
                  Innovative Solutions
                </h3>
                <p className="text-base md:text-lg leading-relaxed text-slate-700">
                  ScribbleSense is at the forefront of innovation in handwriting
                  improvement. Our methods incorporate the latest research and
                  technology to offer tailored solutions that make a real
                  difference. From comprehensive assessments to interactive
                  tools, we ensure that our approach is both effective and
                  engaging for every child.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CENTERED JOIN US + FORM */}
      <section className="pb-20 md:pb-24 bg-gradient-to-b from-white via-pink-50/40 to-white">
        <div className="container mx-auto max-w-4xl px-4">
          {/* Join Us text */}
          <motion.div
            className="text-center mb-10 md:mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[#382467] mb-4">
              Join Us on Our Journey
            </h2>
            <p className="text-base md:text-lg text-slate-700 mb-3 max-w-2xl mx-auto">
              Stay connected through our blog and updates to learn more about
              how ScribbleSense is making a difference and to discover new ways
              we can support your child’s growth and development.
            </p>
            <p className="text-base md:text-lg text-slate-700 max-w-2xl mx-auto">
              At ScribbleSense, we are committed to empowering every child to
              succeed. Together, we can make writing challenges a thing of the
              past and help children achieve their brightest future.
            </p>
          </motion.div>

          {/* Form centered */}
          <motion.form
            className="max-w-2xl mx-auto space-y-4 rounded-2xl border border-slate-200 bg-white/90 shadow-sm p-6 md:p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h3 className="text-xl md:text-2xl font-semibold text-[#382467] mb-2 text-center">
              The Best Consultants For Your Child
            </h3>
            <p className="text-sm md:text-base text-slate-700 text-center mb-4">
              Our team of experienced doctors are here to provide the best
              consultation for your child. Share your details below and we’ll be
              ready to help.
            </p>

            <div className="space-y-1">
              <label
                htmlFor="comment"
                className="text-sm font-medium text-slate-700"
              >
                Comment
              </label>
              <textarea
                id="comment"
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 min-h-[120px]"
                placeholder="Share your thoughts or questions..."
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <label
                  htmlFor="firstName"
                  className="text-sm font-medium text-slate-700"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
                  placeholder="Enter your first name"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-slate-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
                  placeholder="Enter your email address"
                />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label
                  htmlFor="website"
                  className="text-sm font-medium text-slate-700"
                >
                  Website
                </label>
                <input
                  id="website"
                  type="url"
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
                  placeholder="Optional: your website"
                />
              </div>
            </div>

            <div className="flex items-start gap-2">
              <input
                id="remember"
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-slate-300 text-pink-500 focus:ring-pink-400"
              />
              <label
                htmlFor="remember"
                className="text-xs md:text-sm text-slate-700"
              >
                Save my name, email and website in this browser for the next
                time I comment.
              </label>
            </div>

            <div className="pt-2 flex justify-center">
              <motion.button
                type="submit"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center rounded-full bg-pink-500 px-6 py-2.5 text-sm md:text-base font-semibold text-white shadow-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2"
              >
                Submit
              </motion.button>
            </div>
          </motion.form>
        </div>
      </section>
    </main>
  )
}
