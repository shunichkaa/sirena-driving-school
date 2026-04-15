"use client";

import { assetUrl } from "@/shared/config/app-base-path";
import { siteMedia } from "@/shared/config/site-media";
import { siteData } from "@/shared/config/site-data";
import { motion } from "framer-motion";
import Image from "next/image";

function initials(name: string) {
  const parts = name.split(" ").filter(Boolean);
  const a = parts[0]?.[0] ?? "";
  const b = parts[1]?.[0] ?? parts[0]?.[1] ?? "";
  return (a + b).toUpperCase();
}

export function ReviewsSection() {
  const { reviews, reviewsSummary, yandexRating, yandexMapsReviewsUrl } = siteData;
  const ratingCaption = `на основе ${yandexRating.reviewCount} оценок в Яндекс.Картах`;

  return (
    <section id="reviews" className="border-t border-wash bg-white py-14 md:py-20">
      <div className="mx-auto max-w-screen-2xl px-5 md:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:mb-2">
          <p className="col-span-full text-[11px] font-bold uppercase tracking-[0.14em] text-muted">Фотогалерея школы</p>
          {siteMedia.reviewsMosaic.map((item) => (
            <figure
              key={item.src}
              className="relative aspect-[5/4] overflow-hidden rounded-xl border border-wash bg-wash shadow-sm"
            >
              <Image
                fill
                src={assetUrl(item.src)}
                alt={item.alt}
                className="object-cover"
                sizes="(min-width: 1024px) 240px, 33vw"
              />
            </figure>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold leading-[1.2] tracking-tight text-ink">Отзывы</h2>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:items-end">
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
              <span className="text-3xl font-bold text-accent">{reviewsSummary.score}</span>
              <span>{ratingCaption}</span>
              <span className="text-amber-500" aria-hidden>
                ★★★★★
              </span>
            </div>
            <a
              href={yandexMapsReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 w-full items-center justify-center rounded-lg border-2 border-accent bg-white px-4 py-2.5 text-sm font-bold text-accent transition hover:bg-surface sm:w-auto"
            >
              Проверить на Яндекс.Картах
            </a>
          </div>
        </div>
        <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible">
          {reviews.map((review, index) => (
            <motion.article
              key={review.name}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ delay: index * 0.06 }}
              className="w-[min(100%,22rem)] shrink-0 snap-center rounded-2xl border border-wash bg-canvas p-5 shadow-card transition duration-200 hover:-translate-y-1 hover:border-accent md:w-auto"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/15 text-sm font-bold text-accent">
                  {initials(review.name)}
                </div>
                <div>
                  <p className="font-semibold text-ink">{review.name}</p>
                  <p className="text-[13px] text-subtle">{review.date}</p>
                  <p className="text-amber-500 text-sm" aria-hidden>
                    ★★★★★
                  </p>
                </div>
              </div>
              <p className="mt-4 text-[15px] font-normal leading-relaxed text-muted">{review.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
