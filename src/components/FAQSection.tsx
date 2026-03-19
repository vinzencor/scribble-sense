import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getFAQs, FAQ } from "@/lib/supabase";

interface FAQSectionProps {
  page: "home" | "about" | "services" | "resources" | "contact" | "all" | string;
  title?: string;
  subtitle?: string;
  className?: string;
}

const FAQSection = ({ page, title, subtitle, className }: FAQSectionProps) => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFAQs = async () => {
      const { data } = await getFAQs(page);
      setFaqs(data || []);
      setLoading(false);
    };

    fetchFAQs();
  }, [page]);

  if (!loading && faqs.length === 0) return null;

  const baseClasses = "py-16 md:py-24 bg-muted/30 relative z-10 pointer-events-auto";

  return (
    <section className={className ? `${baseClasses} ${className}` : baseClasses}>
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-[#382467] mb-3">
            {title ?? "Frequently Asked Questions"}
          </h2>
          {subtitle ? (
            <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          ) : null}
        </div>

        {loading ? (
          <div className="text-center text-slate-500">Loading FAQs...</div>
        ) : (
          <Accordion type="single" collapsible className="bg-white rounded-2xl border border-slate-200 shadow-sm">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="px-6">
                <AccordionTrigger className="text-left text-base md:text-lg text-slate-800">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-base text-slate-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </section>
  );
};

export default FAQSection;
