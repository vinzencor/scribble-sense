import React from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import MouseSpark from "@/components/ui/mouse-spark";
import CloudWatchForm from "@/components/CloudWatchForm";
import { Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <MouseSpark />
      <Navigation />

      <section className="py-20 pt-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-cyan bg-clip-text text-transparent">
                Get in Touch
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <CloudWatchForm />
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-8"
            >
              <div className="bg-card p-8 rounded-2xl shadow-pink border-2 border-primary/20">
                <h2 className="text-3xl font-bold mb-6 bg-gradient-pink bg-clip-text text-transparent">
                  Contact Information
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-gradient-pink">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-muted-foreground">support@scribblesense.co.uk</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-gradient-cyan">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <p className="text-muted-foreground">Available Monday-Friday, 9AM-5PM</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-gradient-purple">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Location</h3>
                      <p className="text-muted-foreground">United Kingdom</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-success/20 to-success-glow/20 p-8 rounded-2xl border-2 border-success/20">
                <h3 className="text-2xl font-bold mb-4 bg-gradient-green bg-clip-text text-transparent">
                  Quick Support
                </h3>
                <p className="text-muted-foreground mb-4">
                  For immediate assistance or technical support with the app, please visit our help center or reach out through the app's support feature.
                </p>
                <a
                  href="https://play.google.com/store/apps/details?id=com.scribblesense.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 rounded-xl bg-gradient-green text-white font-semibold hover:shadow-green transition-all"
                >
                  Visit App Store
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
