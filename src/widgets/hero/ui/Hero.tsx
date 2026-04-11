"use client";

import { siteData } from "@/shared/config/site-data";
import { motion } from "framer-motion";
import Image from "next/image";

type HeroProps = {
  onConsult: () => void;
};

export function Hero({ onConsult }: HeroProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-12 pt-2 md:px-6 md:pb-16 lg:px-8">
      <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="order-2 lg:order-1 lg:col-span-6">
          <motion.h1
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="whitespace-pre-line text-[clamp(2.1rem,5vw,3.9rem)] font-black uppercase leading-[0.98] tracking-tight text-ink"
          >
            {siteData.hero.title}
          </motion.h1>
          <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-muted md:text-base">
            {siteData.hero.subtitle}
          </p>
          <ul className="mt-6 space-y-2">
            {siteData.hero.points.map((point) => (
              <li key={point} className="flex items-start gap-2 text-sm font-semibold text-ink md:text-[15px]">
                <span className="mt-[0.4rem] h-1.5 w-1.5 rounded-full bg-accent" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap gap-2.5 md:hidden">
            <button
              type="button"
              onClick={onConsult}
              className="rounded-full bg-accent px-6 py-3 text-xs font-black uppercase tracking-wide text-ink transition hover:brightness-95"
            >
              {siteData.hero.primaryCta}
            </button>
            <a
              href="#programma"
              className="rounded-full border border-ink px-6 py-3 text-xs font-black uppercase tracking-wide text-ink transition hover:border-accent hover:text-accent"
            >
              Узнать подробнее
            </a>
          </div>
          <div className="mt-7 hidden flex-wrap gap-2.5 md:flex">
            <button
              type="button"
              onClick={onConsult}
              className="rounded-full bg-accent px-6 py-3 text-xs font-black uppercase tracking-wide text-ink transition hover:brightness-95 md:text-sm"
            >
              {siteData.hero.primaryCta}
            </button>
            <a
              href="#programma"
              className="rounded-full border border-ink px-6 py-3 text-xs font-black uppercase tracking-wide text-ink transition hover:border-accent hover:text-accent md:text-sm"
            >
              {siteData.hero.secondaryCta}
            </a>
          </div>
        </div>

        <div className="relative order-1 flex justify-center lg:order-2 lg:col-span-6">
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="relative flex h-[min(58vw,380px)] w-[min(96vw,560px)] items-center justify-center overflow-hidden rounded-[2rem] border border-wash bg-white p-3 shadow-card md:h-[390px] md:w-[580px] md:p-5"
          >
            <div className="absolute right-8 top-8 h-5 w-5 rounded-full border-4 border-ink bg-accent max-md:right-4 max-md:top-4" />
            <div className="absolute inset-[10%] rounded-[1.8rem] border border-wash" />
            <div className="relative z-10 w-full max-md:scale-[1.02] md:w-[118%]">
              <Image
                src={siteData.images.heroCar}
                alt="Автомобиль автошколы"
                width={900}
                height={520}
                className="h-auto w-full object-contain drop-shadow-xl"
                priority
                unoptimized
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
