"use client"

import React from "react"
import { motion } from "framer-motion"
import Navigation from "@/components/Navigation"
import MouseSpark from "@/components/ui/mouse-spark"

export default function PrivacyPolicy() {
  return (
    <main className="bg-background min-h-screen">
      <MouseSpark />
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-pink bg-clip-text text-transparent">
                Privacy Policy
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              How we collect, use, and protect your personal information
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="prose prose-lg max-w-none text-muted-foreground"
          >
            <p className="text-sm text-muted-foreground mb-8">
              Effective Date: 01-02-2024
            </p>
            <p className="mb-6">
              ScribbleSense Ltd ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, web platform, or mobile application (collectively, the "Service").
            </p>
            <p className="mb-6">
              This policy applies to all users of ScribbleSense, including children aged 4-12 years. We comply with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">1. Information We Collect</h2>
            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Personal Information</h3>
            <p className="mb-4">
              We may collect the following personal information:
            </p>
            <ul className="list-disc list-inside mb-6 ml-4">
              <li>Name and email address (for account registration)</li>
              <li>Age and date of birth (to ensure age-appropriate content)</li>
              <li>Parent/guardian contact information (for children under 13)</li>
              <li>Usage data and progress information</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Automatically Collected Information</h3>
            <p className="mb-4">
              When you use our Service, we automatically collect:
            </p>
            <ul className="list-disc list-inside mb-6 ml-4">
              <li>Device information (IP address, browser type, operating system)</li>
              <li>Usage statistics and analytics data</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">
              We use the collected information for the following purposes:
            </p>
            <ul className="list-disc list-inside mb-6 ml-4">
              <li>To provide and maintain our Service</li>
              <li>To personalize your learning experience</li>
              <li>To communicate with you and your parent/guardian</li>
              <li>To improve our Service and develop new features</li>
              <li>To ensure compliance with age restrictions and safety standards</li>
              <li>To respond to your inquiries and provide customer support</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">3. Information Sharing and Disclosure</h2>
            <p className="mb-6">
              We do not sell, trade, or otherwise transfer your personal information to third parties, except in the following circumstances:
            </p>
            <ul className="list-disc list-inside mb-6 ml-4">
              <li>With your consent or at your direction</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights, property, or safety</li>
              <li>With trusted service providers who assist us in operating our Service (under strict confidentiality agreements)</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">4. Data Security</h2>
            <p className="mb-6">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure servers, and regular security assessments.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">5. Children's Privacy</h2>
            <p className="mb-6">
              ScribbleSense is designed for children aged 4-12 years. We are committed to protecting children's privacy online. We do not knowingly collect personal information from children under 13 without verifiable parental consent.
            </p>
            <p className="mb-6">
              If we learn that we have collected personal information from a child under 13 without proper parental consent, we will delete it promptly. Parents can review, modify, or request deletion of their child's personal information by contacting us.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">6. Your Rights</h2>
            <p className="mb-4">
              Under UK GDPR, you have the following rights regarding your personal information:
            </p>
            <ul className="list-disc list-inside mb-6 ml-4">
              <li>Right to access your personal information</li>
              <li>Right to rectify inaccurate information</li>
              <li>Right to erasure ("right to be forgotten")</li>
              <li>Right to restrict processing</li>
              <li>Right to data portability</li>
              <li>Right to object to processing</li>
            </ul>
            <p className="mb-6">
              To exercise these rights, please contact us at info@scribblesense.co.uk
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">7. Cookies and Tracking Technologies</h2>
            <p className="mb-6">
              We use cookies and similar technologies to enhance your experience, analyze usage, and provide personalized content. You can control cookie settings through your browser preferences.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">8. Data Retention</h2>
            <p className="mb-6">
              We retain your personal information only as long as necessary to provide our Service, comply with legal obligations, resolve disputes, and enforce our agreements. When information is no longer needed, we securely delete or anonymize it.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">9. International Data Transfers</h2>
            <p className="mb-6">
              Your information may be transferred to and processed in countries other than the UK. We ensure that such transfers comply with UK GDPR requirements through appropriate safeguards.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">10. Changes to This Privacy Policy</h2>
            <p className="mb-6">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on our website and updating the effective date.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">11. Contact Us</h2>
            <p className="mb-6">
              If you have any questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <p className="mb-6">
              Email: info@scribblesense.co.uk<br />
              Address: ScribbleSense Ltd, England and Wales
            </p>
            <p className="mb-6">
              You can also contact our Data Protection Officer at the above email address.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}