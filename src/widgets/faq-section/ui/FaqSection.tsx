"use client";

import { siteData } from "@/shared/config/site-data";
import { motion } from "framer-motion";

export function FaqSection() {
  return (
    <section id="faq" className="py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <h2 className="text-3xl font-black tracking-tight text-ink md:text-4xl">FAQ</h2>
        <div className="mt-8 space-y-3">
          {siteData.faq.map((item, index) => (
            <motion.details
              key={item.question}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group rounded-2xl border border-wash bg-white p-5"
            >
              <summary className="cursor-pointer list-none text-base font-bold text-ink leading-6">
                {item.question}
              </summary>
              <p className="mt-3 text-sm text-muted">{item.answer}</p>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  );
}
