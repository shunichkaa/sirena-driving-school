"use client";

import { InstallmentCalculator } from "@/features/installment-calculator";
import { assetUrl } from "@/shared/config/app-base-path";
import { siteMedia } from "@/shared/config/site-media";
import { siteData } from "@/shared/config/site-data";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

type CategoryBSectionProps = {
  onConsult: () => void;
};

export function CategoryBSection({ onConsult }: CategoryBSectionProps) {
  const { mkpp, akpp } = siteData.categoryB;
  const slides = siteMedia.categoryBFleetSlides;
  const [activeSlide, setActiveSlide] = useState(0);
  const slidesCount = slides.length;
  const cards = [
    { key: "mkpp" as const, data: mkpp },
    { key: "akpp" as const, data: akpp },
  ];
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
    <section id="kategoriya-b" className="bg-surface py-14 md:py-20">
      <div className="mx-auto max-w-screen-2xl px-5 md:px-6 lg:px-8">
        <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold leading-[1.2] tracking-tight text-ink">
          Категория B
        </h2>
        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-10">
          <figure className="flex flex-col lg:col-span-5">
            <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-wash bg-wash shadow-card lg:mx-0 lg:h-[520px] lg:max-w-none">
              <div className="relative h-[300px] w-full sm:h-[380px] lg:h-full">
                <Image
                  key={currentSlide.src}
                  fill
                  src={assetUrl(currentSlide.src)}
                  alt={currentSlide.alt}
                  className="object-cover object-center"
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 384px, 100vw"
                />
                <button
                  type="button"
                  onClick={handlePrevSlide}
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/45 px-3 py-1.5 text-lg font-semibold text-white transition hover:bg-black/60"
                  aria-label="Предыдущее фото"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={handleNextSlide}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/45 px-3 py-1.5 text-lg font-semibold text-white transition hover:bg-black/60"
                  aria-label="Следующее фото"
                >
                  ›
                </button>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-center gap-2 lg:justify-start">
              {slides.map((slide, index) => (
                <button
                  key={slide.src}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  className={`h-2.5 w-2.5 rounded-full transition ${
                    index === activeSlide ? "bg-accent" : "bg-wash hover:bg-muted"
                  }`}
                  aria-label={`Показать фото ${index + 1}`}
                />
              ))}
            </div>
            <figcaption className="mt-3 text-center text-[13px] text-muted lg:text-left">
              Учебный автомобиль на площадке
            </figcaption>
          </figure>
          <div className="grid gap-4 md:grid-cols-2 md:items-stretch lg:col-span-7">
          {cards.map(({ key, data }, index) => (
            <div key={key} className="flex h-full flex-col lg:h-[520px]">
              <div className="relative flex h-full flex-col">
                {data.popular ? (
                  <span className="absolute left-4 top-0 z-10 inline-flex w-fit -translate-y-1/2 rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                    Популярный выбор
                  </span>
                ) : null}
            <motion.article
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ delay: index * 0.06 }}
              className={`flex flex-1 flex-col rounded-2xl border bg-white p-6 shadow-card transition duration-200 hover:-translate-y-1 hover:shadow-lg md:p-7 ${
                data.popular ? "border-2 border-accent ring-1 ring-accent/15" : "border border-wash hover:border-accent"
              }`}
            >
              <h3 className="text-lg font-medium text-ink md:text-xl">{data.title}</h3>
              <p className="mt-1 text-sm leading-snug text-muted">{data.duration}</p>
              <p className="mt-1 text-sm font-medium text-ink">{data.lessons}</p>
              <p className="mt-4 text-[clamp(1.75rem,4vw,2.25rem)] font-bold leading-none text-accent">{data.price}</p>
              <p className="mt-2 text-sm leading-snug text-muted">{data.note}</p>
              {key === "mkpp" ? (
                <div className="mt-4 grid grid-cols-2 gap-2 rounded-lg border border-wash bg-surface/50 p-3 text-center text-xs font-semibold text-ink">
                  <div>
                    <p className="text-subtle">Теория</p>
                    <p className="mt-1 text-sm">7 000 ₽</p>
                  </div>
                  <div>
                    <p className="text-subtle">Практика</p>
                    <p className="mt-1 text-sm">14 000 ₽</p>
                  </div>
                </div>
              ) : null}
              <ul className="mt-4 space-y-2">
                {data.includes.map((line) => (
                  <li key={line} className="flex gap-2 text-sm leading-relaxed text-ink">
                    <span className="shrink-0 text-success" aria-hidden>
                      ✓
                    </span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-6">
                <button
                  type="button"
                  onClick={onConsult}
                  className="w-full rounded-lg bg-accent py-3.5 text-center text-base font-bold text-white transition hover:bg-accentStrong"
                >
                  Записаться
                </button>
              </div>
            </motion.article>
              </div>
            </div>
          ))}
          </div>
        </div>
        <InstallmentCalculator />
        <p className="mt-8 text-center text-sm text-muted">
          Остались вопросы по стоимости?{" "}
          <a href={`tel:${siteData.phoneTel}`} className="font-semibold text-accent hover:text-accentStrong">
            {siteData.phoneDisplay}
          </a>
        </p>
      </div>
    </section>
  );
}
