"use client";

import { siteData } from "@/shared/config/site-data";
import { motion } from "framer-motion";
import { Fragment } from "react";
import { SectionReveal } from "@/shared/ui/SectionReveal";

export function LearningSteps() {
  return (
    <section id="program" className="border-t border-wash bg-white py-14 md:py-20">
      <SectionReveal className="mx-auto max-w-screen-2xl px-5 md:px-6 lg:px-8">
        <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold leading-[1.2] tracking-tight text-ink">
          Программа обучения
        </h2>
        <div className="mt-8 flex flex-col gap-10 md:flex-row md:items-stretch">
          {siteData.learningSteps.map((step, index) => (
            <Fragment key={step.title}>
              <motion.article
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ delay: index * 0.07 }}
                className="flex flex-1 flex-col rounded-2xl border border-wash bg-white p-6 shadow-card transition duration-200 hover:-translate-y-1 hover:border-accent"
              >
                <h3 className="text-lg font-medium text-ink md:text-xl">{step.title}</h3>
                <p className="mt-2 text-[15px] font-normal leading-relaxed text-muted">{step.text}</p>
              </motion.article>

              {index < siteData.learningSteps.length - 1 && (
                <span
                  aria-hidden
                  key={`sep-${index}`}
                  className="flex-shrink-0 self-center text-center text-xl font-semibold text-accent"
                >
                  +
                </span>
              )}
            </Fragment>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}