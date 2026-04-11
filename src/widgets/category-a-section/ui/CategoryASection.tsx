"use client";

import { siteData } from "@/shared/config/site-data";
import { motion } from "framer-motion";
import Image from "next/image";

type CategoryASectionProps = {
  onConsult: () => void;
};

export function CategoryASection({ onConsult }: CategoryASectionProps) {
  return (
    <section id="kategoriya-a" className="relative overflow-hidden bg-white py-14 md:py-20">
      <div className="pointer-events-none absolute left-1 top-1/2 -translate-y-1/2 select-none text-[min(28vw,9rem)] font-black leading-none text-wash opacity-50 md:left-2 md:text-[min(22vw,11rem)]">
        A
      </div>
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2 md:gap-12 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative z-10 order-2 flex justify-start md:order-1"
        >
          <div className="w-[min(100%,500px)] rounded-2xl bg-transparent p-0">
            <Image
              src={siteData.images.moto}
              alt="Мотоцикл категории A"
              width={1000}
              height={440}
              className="h-auto w-full object-contain"
              unoptimized
            />
          </div>
        </motion.div>
        <div className="order-1 z-10 md:order-2">
          <h2 className="text-3xl font-black tracking-tight text-ink md:text-4xl">Категория A</h2>
          <div className="mt-6 max-w-sm border-l border-wash pl-4">
            <p className="text-xs text-muted">{siteData.categoryA.duration}</p>
            <p className="mt-1 text-xs font-semibold text-ink">{siteData.categoryA.lessons}</p>
            <p className="mt-4 text-2xl font-black text-ink">{siteData.categoryA.price}</p>
            <p className="mt-1 text-[11px] text-muted">
              Точная стоимость зависит от графика и комплектности программы.
            </p>
          </div>
          <button
            type="button"
            onClick={onConsult}
            className="mt-6 inline-flex items-center justify-center rounded-full border border-transparent px-0 py-0 text-xs font-black uppercase tracking-wide text-ink transition hover:text-accent md:text-sm"
          >
            Записаться
            <span className="ml-2 text-lg leading-none">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
