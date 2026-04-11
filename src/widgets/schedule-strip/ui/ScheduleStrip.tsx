"use client";

import { siteData } from "@/shared/config/site-data";
import { motion } from "framer-motion";

export function ScheduleStrip() {
  return (
    <section id="raspisanie" className="border-y border-wash/80 bg-canvas py-10 md:py-12">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          className="flex flex-col gap-5 rounded-2xl border border-wash/90 bg-white/90 px-5 py-6 text-center shadow-card backdrop-blur-sm md:flex-row md:items-center md:justify-between md:gap-8 md:px-8 md:py-7 md:text-left"
        >
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">Справка</p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-ink md:text-3xl">Расписание</h2>
            <p className="mt-2 max-w-xl text-sm text-muted">
              График занятий и набор групп уточняйте в офисе или по телефону. Актуальные документы
              и программы доступны в соответствующих разделах сайта.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {siteData.trainingLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-wash px-3 py-1.5 text-xs font-semibold text-ink hover:border-accent hover:text-accent"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <a
            href={`tel:${siteData.phoneTel}`}
            className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-lg border-2 border-accent bg-white px-6 py-3 text-sm font-bold text-accent transition hover:bg-surface"
          >
            Позвонить
          </a>
        </motion.div>
      </div>
    </section>
  );
}
