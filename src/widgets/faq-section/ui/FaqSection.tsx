"use client";

import { siteData } from "@/shared/config/site-data";
import { motion } from "framer-motion";

export function FaqSection() {
  return (
    <section id="faq" className="py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <h2 className="text-3xl font-black tracking-tight text-ink md:text-4xl">Вопросы и ответы</h2>
        <div className="mt-8 space-y-3">
          {siteData.faq.map((item, index) => (
            <motion.details
              key={item.question}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="rounded-2xl border border-wash bg-white p-5 shadow-card [&[open]_.faq-chevron]:rotate-180"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-base font-bold leading-6 text-ink">
                <span className="min-w-0">{item.question}</span>
                <span
                  className="faq-chevron inline-block shrink-0 text-lg leading-none text-muted transition-transform duration-200"
                  aria-hidden
                >
                  ▾
                </span>
              </summary>
              <p className="mt-3 text-sm text-muted">{item.answer}</p>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  );
}
