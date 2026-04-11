"use client";

import { siteData } from "@/shared/config/site-data";
import { motion } from "framer-motion";

export function LearningSteps() {
  return (
    <section id="programma" className="py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <h2 className="text-3xl font-black tracking-tight text-ink md:text-4xl">
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
              className="rounded-2xl border border-wash bg-white p-5 shadow-card transition duration-200 hover:-translate-y-0.5"
            >
              <h3 className="text-lg font-bold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm text-muted">{step.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
