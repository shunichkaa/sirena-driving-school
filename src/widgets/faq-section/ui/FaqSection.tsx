"use client";

import { siteData } from "@/shared/config/site-data";
import { motion } from "framer-motion";

export function FaqSection() {
  return (
    <section id="faq" className="border-t border-wash bg-white py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold leading-[1.2] tracking-tight text-ink">
          Вопросы и ответы
        </h2>
        <div className="mt-8 space-y-3">
          {siteData.faq.map((item, index) => (
            <motion.details
              key={item.question}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="faq-item rounded-2xl border border-wash bg-white p-5 shadow-card [&[open]_.faq-chevron]:rotate-180"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-base font-medium leading-snug text-ink">
                <span className="min-w-0">{item.question}</span>
                <span
                  className="faq-chevron inline-block shrink-0 text-lg leading-none text-muted transition-transform duration-300"
                  aria-hidden
                >
                  ▾
                </span>
              </summary>
              <div className="faq-answer">
                <p className="max-w-measure border-t border-wash/80 pt-3 text-[15px] leading-relaxed text-muted">
                  {item.answer}
                </p>
              </div>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  );
}
