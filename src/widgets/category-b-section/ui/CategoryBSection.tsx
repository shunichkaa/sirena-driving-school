"use client";

import { assetUrl } from "@/shared/config/app-base-path";
import { siteMedia } from "@/shared/config/site-media";
import { siteData } from "@/shared/config/site-data";
import { motion } from "framer-motion";
import Image from "next/image";

type CategoryBSectionProps = {
  onConsult: () => void;
};

export function CategoryBSection({ onConsult }: CategoryBSectionProps) {
  const { mkpp, akpp, installmentNote } = siteData.categoryB;
  const cards = [
    { key: "mkpp" as const, data: mkpp },
    { key: "akpp" as const, data: akpp },
  ];

  return (
    <section id="kategoriya-b" className="bg-white py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold leading-[1.2] tracking-tight text-ink">
          Категория B
        </h2>
        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-10">
          <figure className="flex flex-col lg:col-span-5">
            <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-wash bg-wash shadow-card lg:mx-0 lg:max-w-none">
              <div
                className="relative w-full"
                style={{ aspectRatio: `${siteMedia.categoryBFleet.width} / ${siteMedia.categoryBFleet.height}` }}
              >
                <Image
                  fill
                  src={assetUrl(siteMedia.categoryBFleet.src)}
                  alt={siteMedia.categoryBFleet.alt}
                  className="object-cover object-center"
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 384px, 100vw"
                />
              </div>
            </div>
            <figcaption className="mt-3 text-center text-[13px] text-muted lg:text-left">
              Учебный автомобиль на площадке
            </figcaption>
          </figure>
          <div className="grid gap-4 md:grid-cols-2 lg:col-span-7 lg:content-start">
          {cards.map(({ key, data }, index) => (
            <motion.article
              key={key}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ delay: index * 0.06 }}
              className={`flex flex-col rounded-2xl border bg-white p-6 shadow-card transition duration-200 hover:-translate-y-1 md:p-7 ${
                data.popular ? "border-2 border-accent" : "border border-wash hover:border-accent"
              }`}
            >
              {data.popular ? (
                <span className="mb-3 inline-flex w-fit rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                  Популярный выбор
                </span>
              ) : null}
              <h3 className="text-lg font-medium text-ink md:text-xl">{data.title}</h3>
              <p className="mt-1 text-[13px] text-muted">{data.duration}</p>
              <p className="mt-1 text-sm font-medium text-ink">{data.lessons}</p>
              <p className="mt-4 text-[clamp(1.75rem,4vw,2.25rem)] font-bold leading-none text-accent">{data.price}</p>
              <p className="mt-2 text-[13px] text-muted">{data.note}</p>
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
                className="mt-6 w-full rounded-lg bg-accent py-3.5 text-center text-base font-bold text-white transition hover:bg-accentStrong"
              >
                Записаться
              </button>
            </motion.article>
          ))}
          </div>
        </div>
        <p className="mx-auto mt-8 max-w-measure rounded-2xl border border-wash bg-surface px-5 py-4 text-center text-sm leading-relaxed text-muted">
          {installmentNote}
        </p>
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
