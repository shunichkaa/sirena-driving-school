"use client";

import { siteData } from "@/shared/config/site-data";
import { motion } from "framer-motion";
import { SectionReveal } from "@/shared/ui/SectionReveal";

export function LearningSteps() {
  return (
    <section id="programma" className="border-t border-wash bg-white py-14 md:py-20">
      <SectionReveal className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold leading-[1.2] tracking-tight text-ink">
          Программа обучения
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {siteData.learningSteps.map((step, index) => (
            <motion.article
              key={step.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07 }}
              className="rounded-2xl border border-wash bg-white p-6 shadow-card transition duration-200 hover:-translate-y-1 hover:border-accent"
            >
              <h3 className="text-lg font-medium text-ink md:text-xl">{step.title}</h3>
              <p className="mt-2 max-w-measure text-[15px] font-normal leading-relaxed text-muted">{step.text}</p>
            </motion.article>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}
