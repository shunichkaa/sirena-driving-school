"use client";

import { siteData } from "@/shared/config/site-data";
import { motion } from "framer-motion";
import Image from "next/image";

type CategoryASectionProps = {
  onConsult: () => void;
};

export function CategoryASection({ onConsult }: CategoryASectionProps) {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 md:grid-cols-2 md:gap-10 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative order-2 flex justify-start md:order-1"
        >
          <div className="w-[min(100%,420px)] rounded-2xl bg-wash/50 p-3 md:w-[min(100%,500px)] md:p-4">
            <Image
              src={siteData.images.moto}
              alt="Мотоцикл категории A"
              width={900}
              height={600}
              className="h-auto w-full object-contain"
            />
          </div>
        </motion.div>
        <div className="order-1 md:order-2">
          <h2 className="text-[2rem] font-black tracking-tight text-ink md:text-4xl">
            Категория A
          </h2>
          <div className="mt-6 rounded-2xl border border-wash bg-white p-4 md:p-5">
            <p className="text-sm text-muted">{siteData.categoryA.duration}</p>
            <p className="mt-1 text-sm font-semibold text-ink">{siteData.categoryA.lessons}</p>
            <p className="mt-4 text-2xl font-black text-ink">{siteData.categoryA.price}</p>
            <p className="mt-1 text-xs text-muted">
              Точная стоимость зависит от графика и комплектности программы.
            </p>
          </div>
          <button
            type="button"
            onClick={onConsult}
            className="mt-6 inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-xs font-black uppercase tracking-wide text-ink transition hover:brightness-95 md:text-sm"
          >
            Выбрать тариф
          </button>
        </div>
      </div>
    </section>
  );
}
