"use client";

import { siteData } from "@/shared/config/site-data";
import { motion } from "framer-motion";

type CategoryASectionProps = {
  onConsult: () => void;
};

export function CategoryASection({ onConsult }: CategoryASectionProps) {
  const a = siteData.categoryA;

  return (
    <section id="kategoriya-a" className="border-t border-wash bg-surface py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold leading-[1.2] tracking-tight text-ink">
          Категория A
        </h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2 md:items-start">
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            className="rounded-2xl border border-wash bg-white p-6 shadow-card md:p-7"
          >
            <p className="text-[13px] text-muted">{a.duration}</p>
            <p className="mt-1 text-sm font-medium text-ink">{a.lessons}</p>
            <p className="mt-4 text-[clamp(1.75rem,4vw,2.25rem)] font-bold text-accent">{a.price}</p>
            <ul className="mt-4 space-y-2">
              {a.includes.map((line) => (
                <li key={line} className="flex gap-2 text-sm text-ink">
                  <span className="shrink-0 text-success" aria-hidden>
                    ✓
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={onConsult}
              className="mt-6 w-full rounded-lg bg-accent py-3.5 text-base font-bold text-white transition hover:bg-accentStrong"
            >
              Записаться
            </button>
          </motion.div>
          <div className="flex min-h-[14rem] items-center justify-center rounded-2xl border border-dashed border-wash bg-white/60 p-6 text-center text-sm text-subtle">
            Фото учебного мотоцикла можно разместить здесь после съёмки.
          </div>
        </div>
        <p className="mt-8 text-center text-sm text-muted">
          Вопросы по категории A?{" "}
          <a href={`tel:${siteData.phoneTel}`} className="font-semibold text-accent hover:text-accentStrong">
            {siteData.phoneDisplay}
          </a>
        </p>
      </div>
    </section>
  );
}
