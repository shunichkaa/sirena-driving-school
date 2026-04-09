"use client";
import { siteData } from "@/shared/config/site-data";
import { motion } from "framer-motion";

export function StatsBar() {
  const items = siteData.stats.items;

  return (
    <section id="stoimost" className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16 lg:px-8">
      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8 text-left text-[1.6rem] font-black uppercase tracking-tight text-ink md:mb-10 md:text-[2rem]"
      >
        Ключевые направления
      </motion.h2>
      <div className="grid gap-6 sm:grid-cols-3">
        {items.map((it, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="border-l border-wash pl-4 text-left first:border-l-0 first:pl-0"
          >
            <p className="text-[2.25rem] font-black leading-none text-ink md:text-[2.75rem]">{it.value}</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted md:text-xs">
              {it.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
