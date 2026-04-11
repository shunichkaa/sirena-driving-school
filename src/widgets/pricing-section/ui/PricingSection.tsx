"use client";

import { siteData } from "@/shared/config/site-data";
import { motion } from "framer-motion";

export function PricingSection() {
  return (
    <section id="ceny" className="border-t border-wash bg-surface py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold leading-[1.2] tracking-tight text-ink">Цены</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {siteData.pricing.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07 }}
              className="flex flex-col rounded-2xl border border-wash bg-white p-7 shadow-card transition duration-200 hover:-translate-y-1 hover:border-accent"
            >
              <h3 className="text-lg font-medium text-ink md:text-xl">{item.title}</h3>
              <p className="mt-4 text-[clamp(1.75rem,4vw,2.25rem)] font-bold tracking-tight text-accent">{item.price}</p>
              <p className="mt-2 max-w-measure text-[15px] leading-relaxed text-muted">{item.note}</p>
            </motion.article>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted">
          Остались вопросы по стоимости?{" "}
          <a href={`tel:${siteData.phoneTel}`} className="font-semibold text-accent hover:text-accentStrong">
            {siteData.phoneDisplay}
          </a>
        </p>
      </div>
    </section>
  );
}
