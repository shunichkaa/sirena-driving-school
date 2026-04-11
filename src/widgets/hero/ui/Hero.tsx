"use client";

import { assetUrl } from "@/shared/config/app-base-path";
import { siteData } from "@/shared/config/site-data";
import { motion } from "framer-motion";
import Image from "next/image";

type HeroProps = {
  onConsult: () => void;
};

export function Hero({ onConsult }: HeroProps) {
  const { yandexRating } = siteData;

  return (
    <section className="bg-surface">
      <div className="mx-auto grid max-w-6xl min-h-0 grid-cols-1 items-center gap-10 px-4 py-10 md:px-6 md:py-16 lg:grid-cols-12 lg:gap-12 lg:px-8">
        <div className="min-w-0 max-w-measure lg:col-span-7">
          <motion.h1
            initial={false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="whitespace-pre-line text-[clamp(2rem,5vw,3.75rem)] font-bold uppercase leading-[1.1] tracking-tight text-ink"
          >
            {siteData.hero.title}
          </motion.h1>
          <p className="mt-4 max-w-measure text-[15px] font-normal leading-[1.6] text-muted md:text-[17px] md:leading-[1.65]">
            {siteData.hero.subtitle}
          </p>
          <ul className="mt-6 max-w-measure space-y-3">
            {siteData.hero.points.map((point) => (
              <li key={point} className="flex gap-3 text-[15px] font-medium leading-[1.6] text-ink md:text-base">
                <span className="mt-0.5 shrink-0 text-success" aria-hidden>
                  ✓
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onConsult}
              className="rounded-lg bg-accent px-8 py-3.5 text-base font-bold text-white transition hover:scale-[1.02] hover:bg-accentStrong active:scale-100"
            >
              {siteData.hero.primaryCta}
            </button>
            <a
              href="#programma"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-accent bg-white px-8 py-3.5 text-base font-bold text-accent transition hover:bg-surface"
            >
              {siteData.hero.secondaryCta}
              <span aria-hidden>→</span>
            </a>
          </div>
          <p className="mt-3 max-w-measure text-[13px] text-subtle">{siteData.hero.trustLine}</p>
          <p className="mt-4 flex flex-wrap items-center gap-2 text-[13px] text-muted">
            <span className="text-amber-500" aria-hidden>
              ★★★★★
            </span>
            <span className="font-semibold text-ink">{yandexRating.score}</span>
            <span>{yandexRating.label}</span>
          </p>
        </div>
        <div className="relative min-h-0 w-full min-w-0 overflow-hidden rounded-2xl border border-wash bg-wash shadow-card lg:col-span-5">
          <div className="relative aspect-[512/341] w-full">
            <Image
              fill
              src={assetUrl("/hero-driving.jpg")}
              alt="Инструктор объясняет курсантке за рулём белого учебного автомобиля на площадке с разметкой и конусами"
              className="object-cover"
              sizes="(min-width: 1024px) 40vw, 100vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
