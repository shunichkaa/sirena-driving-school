"use client";

import { assetUrl } from "@/shared/config/app-base-path";
import { siteMedia } from "@/shared/config/site-media";
import { siteData } from "@/shared/config/site-data";
import { motion } from "framer-motion";
import Image from "next/image";

type CategoryASectionProps = {
  onConsult: () => void;
};

export function CategoryASection({ onConsult }: CategoryASectionProps) {
  const a = siteData.categoryA;

  return (
    <section id="kategoriya-a" className="border-t border-wash bg-surface py-14 md:py-20">
      <div className="mx-auto max-w-screen-2xl px-5 md:px-6 lg:px-8">
        <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold leading-[1.2] tracking-tight text-ink">
          Категория A
        </h2>
        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-10">
          <figure className="flex flex-col lg:col-span-5">
            <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-wash bg-wash shadow-card lg:mx-0 lg:max-w-none">
              <div
                className="relative w-full"
                style={{ aspectRatio: `${siteMedia.categoryAFleet.width} / ${siteMedia.categoryAFleet.height}` }}
              >
                <Image
                  fill
                  src={assetUrl(siteMedia.categoryAFleet.src)}
                  alt={siteMedia.categoryAFleet.alt}
                  className="object-cover object-center"
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 384px, 100vw"
                />
              </div>
            </div>
            <figcaption className="mt-3 text-center text-[13px] text-muted lg:text-left">
              Учебный мотоцикл на площадке
            </figcaption>
          </figure>
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            className="rounded-2xl border border-wash bg-white p-6 shadow-card md:p-7 lg:col-span-7 lg:self-start"
          >
            <p className="text-[13px] text-muted">{a.duration}</p>
            <p className="mt-1 text-sm font-medium text-ink">{a.lessons}</p>
            <p className="mt-4 text-[clamp(1.75rem,4vw,2.25rem)] font-bold text-accent">{a.price}</p>
            <ul className="mt-4 space-y-2">
              {a.includes.map((line) => (
                <li key={line} className="flex gap-2 text-sm text-ink">
                  <span className="shrink-0 text-success" aria-hidden>
                    ✓
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={onConsult}
              className="mt-6 w-full rounded-lg bg-accent py-3.5 text-base font-bold text-white transition hover:bg-accentStrong"
            >
              Записаться
            </button>
          </motion.div>
        </div>
        <p className="mt-8 text-center text-sm text-muted">
          Вопросы по категории A?{" "}
          <a href={`tel:${siteData.phoneTel}`} className="font-semibold text-accent hover:text-accentStrong">
            {siteData.phoneDisplay}
          </a>
        </p>
      </div>
    </section>
  );
}
