"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Navigation from "@/components/Navigation"
import MouseSpark from "@/components/ui/mouse-spark"
import { getServices, Service as SupabaseService } from "@/lib/supabase"
import { Loader2 } from "lucide-react"
import FAQSection from "@/components/FAQSection"
import SEOHelmet from "@/components/SEOHelmet"


type Service = {
  id: string | number
  title: string
  description: string
  imageUrl: string
}

// Fallback services for when database is empty
const FALLBACK_SERVICES: Service[] = [
  {
    id: 1,
    title: "Dysgraphia Diagnosis & Treatment",
    description:
      "At ScribbleSense, we understand that early identification and intervention are crucial when it comes to managing dysgraphia. Our goal is to help children overcome these challenges and reach their full potential through comprehensive diagnosis and personalised treatment plans.",
    imageUrl:
      "https://scribblesense.co.uk/assets/img/services/service1.jpg",
  },
  {
    id: 2,
    title: "Handwriting Support & Improvement",
    description:
      "Many children experience handwriting difficulties that may not be related to dysgraphia but still significantly impact their academic performance. ScribbleSense offers handwriting support tailored to children who need help improving their writing technique, legibility, and speed.",
    imageUrl:
      "https://scribblesense.co.uk/assets/img/services/service2.jpg",
  },
  {
    id: 3,
    title: "Personalized Handwriting Programs",
    description:
      "Handwriting is a skill that many children struggle with, but at ScribbleSense, we offer bespoke programs to meet every child’s unique needs. Our personalized handwriting programs go beyond generic approaches, focusing on each child’s specific writing challenges and developmental level.",
    imageUrl:
      "https://scribblesense.co.uk/assets/img/services/service3.jpg",
  },
]

// Container + card animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <motion.article
      variants={cardVariants}
      whileHover={{
        y: -8,
        boxShadow:
          "0 18px 45px rgba(15, 23, 42, 0.18), 0 0 0 1px rgba(148, 163, 184, 0.35)",
      }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="bg-white rounded-2xl shadow-md overflow-hidden border border-slate-100/80 flex flex-col"
    >
      <div className="relative h-52 overflow-hidden">
        <motion.img
          src={service.imageUrl}
          alt={service.title}
          className="w-full h-full object-cover"
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg md:text-xl font-semibold text-[#382467] mb-3 leading-snug">
          {service.title}
        </h3>
        <p className="text-sm md:text-[15px] leading-relaxed text-slate-700 flex-1">
          {service.description}
        </p>
      </div>
    </motion.article>
  )
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>(FALLBACK_SERVICES)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await getServices()
      if (data && data.length > 0) {
        setServices(data.map((s: SupabaseService) => ({
          id: s.id,
          title: s.title,
          description: s.description,
          imageUrl: s.image_url,
        })))
      }
      setLoading(false)
    }
    fetchServices()
  }, [])

  return (
    <main className="bg-white min-h-screen">
      <SEOHelmet page="services" />
      <MouseSpark />
      <Navigation />
      {/* Hero / banner section */}
      <section
        className="relative h-[260px] md:h-[320px] flex items-center justify-center overflow-hidden bg-gradient-to-r from-pink-100 via-purple-100 to-cyan-100"
      >

        {/* Floating decorative shapes */}
        <motion.span
          className="absolute -left-10 bottom-6 w-32 h-32 rounded-full bg-pink-400/40 blur-3xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1 }}
        />
        <motion.span
          className="absolute right-4 top-6 w-28 h-28 rounded-3xl bg-sky-400/40 blur-2xl"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2 }}
        />

        <motion.div
          className="relative z-10 text-center px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* <p className="text-xs md:text-sm text-slate-800/80 mb-2">
            Home – Services
          </p> */}
          <h1 className="text-4xl md:text-7xl font-['Fredoka',sans-serif] font-bold text-[#382467] mb-4">
            Our Services
          </h1>
          <p className="text-slate-700 max-w-2xl mx-auto text-base md:text-xl font-medium">
            Supporting children and families with dysgraphia through
            personalised, playful, and research-informed programs.
          </p>
        </motion.div>

        {/* “Torn edge” into white content */}
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </section>

      {/* Services grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-4">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-[#382467]" />
            </div>
          ) : (
            <motion.div
              className="grid gap-8 md:gap-10 md:grid-cols-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </motion.div>
          )}
        </div>
      </section>
      <FAQSection
        page="services"
        title="Services FAQ"
        subtitle="Common questions about our programs, assessments, and support plans."
      />
    </main>
  )
}
