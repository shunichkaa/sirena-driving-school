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
      <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="order-2 lg:order-1 lg:col-span-6">
          <motion.h1
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[clamp(2.1rem,5vw,3.8rem)] font-black leading-[1.02] tracking-tight text-ink"
          >
            {siteData.hero.title}
          </motion.h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted md:text-lg">
            {siteData.hero.subtitle}
          </p>
          <ul className="mt-6 space-y-2.5">
            {siteData.hero.points.map((point) => (
              <li key={point} className="flex items-start gap-2 text-sm font-semibold text-ink md:text-base">
                <span className="mt-[0.4rem] h-1.5 w-1.5 rounded-full bg-accent" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={onConsult}
              className="rounded-full bg-accent px-6 py-3 text-xs font-black uppercase tracking-wide text-ink transition hover:brightness-95 md:text-sm"
            >
              {siteData.hero.primaryCta}
            </button>
            <a
              href="#stoimost"
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
            className="relative flex h-[min(58vw,380px)] w-[min(96vw,560px)] items-center justify-center md:h-[390px] md:w-[580px]"
          >
            <div className="absolute inset-0 rounded-[2rem] bg-wash/60" />
            <div className="absolute inset-[7%] rounded-[1.7rem] border-2 border-accent/70" />
            <div className="relative z-10 w-[112%] max-w-none md:w-[120%]">
              <Image
                src={siteData.images.heroCar}
                alt="Автомобиль автошколы"
                width={900}
                height={600}
                className="h-auto w-full object-contain drop-shadow-xl"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
