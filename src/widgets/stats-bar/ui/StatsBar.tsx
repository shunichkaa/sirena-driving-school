"use client";

import { siteData } from "@/shared/config/site-data";
import { motion } from "framer-motion";

export function StatsBar() {
  const items = [
    { value: "18+", label: "лет опыта" },
    { value: siteData.stats.duration, label: "до экзамена" },
    { value: "80%", label: "сдача с первого раза" },
    { value: "4.9", label: "оценка выпускников" },
  ];

  return (
    <section id="stoimost" className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16 lg:px-8">
      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8 text-center text-2xl font-black tracking-tight text-ink md:mb-10 md:text-3xl"
      >
        Почему выбирают нас
      </motion.h2>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {items.map((it, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="rounded-2xl border border-wash bg-white px-4 py-5 text-center md:px-5 md:py-6"
          >
            <p className="text-[1.9rem] font-black leading-none text-ink md:text-4xl">{it.value}</p>
            <p className="mt-2 text-xs font-medium uppercase tracking-wide text-muted md:text-sm">
              {it.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
