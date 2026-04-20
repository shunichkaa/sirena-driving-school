"use client";

import { ConsultationButton } from "@/features/book-consultation";
import { assetUrl, homeFragmentHref } from "@/shared/config/app-base-path";
import { siteMedia } from "@/shared/config/site-media";
import { siteData } from "@/shared/config/site-data";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export function Hero() {
  const { yandexRating } = siteData;
  const slides = siteMedia.categoryBFleetSlides;
  const [activeSlide, setActiveSlide] = useState(0);
  const slidesCount = slides.length;
  const currentSlide = slides[activeSlide];

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setActiveSlide((prevSlide) => (prevSlide + 1) % slidesCount);
    }, 5000);

    return () => {
      window.clearInterval(timerId);
    };
  }, [slidesCount]);

  const handlePrevSlide = () => {
    setActiveSlide((prevSlide) => (prevSlide - 1 + slidesCount) % slidesCount);
  };

  const handleNextSlide = () => {
    setActiveSlide((prevSlide) => (prevSlide + 1) % slidesCount);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#f6f7f2] to-surface">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(75,94,46,0.12),transparent)]" />
      <div className="relative mx-auto grid max-w-screen-2xl min-h-0 grid-cols-1 items-center gap-12 px-5 py-12 md:gap-14 md:px-6 md:py-20 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="min-w-0 max-w-measure lg:col-span-7">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent md:text-xs">
            {siteData.hero.eyebrow}
          </p>
          <motion.h1
            initial={false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="mt-3 whitespace-pre-line text-[clamp(3rem,5.5vw,3.75rem)] font-black leading-[1.08] tracking-tight text-ink"
          >
            {siteData.hero.title}
          </motion.h1>
          <p className="mt-5 max-w-[36rem] text-base font-medium leading-relaxed text-ink/85 md:text-lg md:leading-relaxed">
            {siteData.hero.subtitle}
          </p>
          <ul className="mt-7 max-w-measure space-y-3.5 border-l-2 border-accent/35 pl-5">
            {siteData.hero.points.map((point) => (
              <li key={point} className="text-[15px] font-medium leading-snug text-muted md:text-base md:leading-snug">
                {point}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ConsultationButton className="min-h-12 rounded-xl bg-accent px-8 py-3.5 text-center text-base font-bold text-white shadow-[0_10px_32px_rgba(75,94,46,0.38)] ring-2 ring-accent/25 transition hover:bg-accentStrong hover:shadow-[0_12px_36px_rgba(61,79,38,0.42)] hover:ring-accent/35 active:translate-y-px">
              {siteData.hero.primaryCta}
            </ConsultationButton>
            <a
              href={homeFragmentHref(siteData.hero.secondaryCtaHref)}
              className="inline-flex min-h-12 items-center justify-center rounded-xl border-2 border-accent bg-white px-8 py-3.5 text-center text-base font-bold text-accent transition hover:bg-surface hover:shadow-md"
            >
              {siteData.hero.secondaryCta}
            </a>
          </div>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-6">
            <p className="text-[13px] text-subtle">{siteData.hero.trustLine}</p>
          </div>
          <p className="mt-5 flex flex-wrap items-center gap-2 text-[13px] text-muted">
            <span className="text-amber-500" aria-hidden>
              ★★★★★
            </span>
            <span className="font-semibold text-ink">{yandexRating.score}</span>
            <span>{yandexRating.label}</span>
          </p>
        </div>
        <div className="relative min-h-0 w-full min-w-0 lg:col-span-5">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-wash/80 bg-wash shadow-card ring-1 ring-black/[0.04] md:aspect-[5/4] lg:aspect-[4/4.5]">
            <Image
              key={currentSlide.src}
              fill
              src={assetUrl(currentSlide.src)}
              alt={currentSlide.alt}
              className="object-cover object-center"
              sizes="(min-width: 1024px) 38vw, 100vw"
            />
            <button
              type="button"
              onClick={handlePrevSlide}
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/45 px-3 py-1.5 text-lg font-semibold text-white transition hover:bg-black/60"
              aria-label="Предыдущее фото"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={handleNextSlide}
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/45 px-3 py-1.5 text-lg font-semibold text-white transition hover:bg-black/60"
              aria-label="Следующее фото"
            >
              ›
            </button>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
          </div>
          <div className="mt-3 flex items-center justify-center gap-2 lg:justify-start" role="group" aria-label="Переключение фотографий автопарка">
            {slides.map((slide, index) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => setActiveSlide(index)}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  index === activeSlide ? "bg-accent" : "bg-wash hover:bg-muted"
                }`}
                aria-label={`Показать фото ${index + 1}`}
                aria-current={index === activeSlide}
              />
            ))}
          </div>
          <p className="mt-3 text-center text-[13px] text-muted lg:text-left">Учебный автомобиль на площадке</p>
        </div>
      </div>
    </section>
  );
}
