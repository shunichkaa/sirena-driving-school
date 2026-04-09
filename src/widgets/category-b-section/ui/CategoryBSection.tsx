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
    <section className="py-12 md:py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 md:grid-cols-2 md:gap-10 md:px-6 lg:px-8">
        <div>
          <h2 className="text-[2rem] font-black tracking-tight text-ink md:text-4xl">
            Категория B
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-wash bg-white p-4 md:p-5">
              <p className="text-xs font-bold tracking-wider text-muted">
                {mkpp.title}
              </p>
              <p className="mt-2 text-sm text-muted">{mkpp.duration}</p>
              <p className="mt-1 text-sm font-semibold text-ink">{mkpp.lessons}</p>
              <p className="mt-4 text-2xl font-black text-ink">{mkpp.price}</p>
              <p className="mt-1 text-xs text-muted">{mkpp.note}</p>
            </div>
            <div className="rounded-2xl border border-wash bg-white p-4 md:p-5">
              <p className="text-xs font-bold tracking-wider text-muted">
                {akpp.title}
              </p>
              <p className="mt-2 text-sm text-muted">{akpp.duration}</p>
              <p className="mt-1 text-sm font-semibold text-ink">{akpp.lessons}</p>
              <p className="mt-4 text-2xl font-black text-ink">{akpp.price}</p>
              <p className="mt-1 text-xs text-muted">{akpp.note}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onConsult}
            className="mt-6 inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-xs font-black uppercase tracking-wide text-ink transition hover:brightness-95 md:text-sm"
          >
            Выбрать тариф
          </button>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative flex justify-end"
        >
          <div className="w-[min(100%,440px)] rounded-2xl bg-wash/50 p-3 md:w-[min(100%,520px)] md:p-4">
            <Image
              src={siteData.images.sideCar}
              alt="Автомобиль категории B"
              width={900}
              height={600}
              className="h-auto w-full object-contain"
              unoptimized
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
