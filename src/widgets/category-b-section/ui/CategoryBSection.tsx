"use client";

import { siteData } from "@/shared/config/site-data";
import { motion } from "framer-motion";
import Image from "next/image";

type CategoryBSectionProps = {
  onConsult: () => void;
};

export function CategoryBSection({ onConsult }: CategoryBSectionProps) {
  const { mkpp, akpp } = siteData.categoryB;

  return (
    <section className="relative overflow-hidden py-12 md:py-16">
      <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[210px] font-black leading-none text-wash md:text-[320px]">
        B
      </div>
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 md:grid-cols-2 md:gap-10 md:px-6 lg:px-8">
        <div className="z-10">
          <h2 className="text-[1.8rem] font-black uppercase tracking-tight text-ink md:text-[2.3rem]">
            Категория B
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="border-l border-wash pl-4 first:border-l-0 first:pl-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-muted">
                {mkpp.title}
              </p>
              <p className="mt-2 text-xs text-muted">{mkpp.duration}</p>
              <p className="mt-1 text-xs font-semibold text-ink">{mkpp.lessons}</p>
              <p className="mt-4 text-2xl font-black text-ink">{mkpp.price}</p>
              <p className="mt-1 text-[11px] text-muted">{mkpp.note}</p>
            </div>
            <div className="border-l border-wash pl-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-muted">
                {akpp.title}
              </p>
              <p className="mt-2 text-xs text-muted">{akpp.duration}</p>
              <p className="mt-1 text-xs font-semibold text-ink">{akpp.lessons}</p>
              <p className="mt-4 text-2xl font-black text-ink">{akpp.price}</p>
              <p className="mt-1 text-[11px] text-muted">{akpp.note}</p>
            </div>
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
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative z-10 flex justify-end"
        >
          <div className="w-[min(100%,520px)] rounded-2xl bg-transparent p-0">
            <Image
              src={siteData.images.sideCar}
              alt="Автомобиль категории B"
              width={1200}
              height={460}
              className="h-auto w-full object-contain"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
