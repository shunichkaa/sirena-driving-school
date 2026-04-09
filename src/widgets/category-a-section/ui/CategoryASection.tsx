"use client";

import { siteData } from "@/shared/config/site-data";
import { motion } from "framer-motion";
import Image from "next/image";

type CategoryASectionProps = {
  onConsult: () => void;
};

export function CategoryASection({ onConsult }: CategoryASectionProps) {
  return (
    <section className="relative overflow-hidden py-12 md:py-16">
      <div className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-[210px] font-black leading-none text-wash md:text-[320px]">
        A
      </div>
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 md:grid-cols-2 md:gap-10 md:px-6 lg:px-8">
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
          <h2 className="text-[1.8rem] font-black uppercase tracking-tight text-ink md:text-[2.3rem]">
            Категория A
          </h2>
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
            className="mt-6 inline-flex items-center justify-center rounded-full border border-transparent px-0 py-0 text-xs font-black uppercase tracking-wide text-ink transition hover:text-[#f05a28] md:text-sm"
          >
            Записаться
            <span className="ml-2 text-lg leading-none">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
