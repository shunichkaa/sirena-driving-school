"use client";

import { ConsultationButton } from "@/features/book-consultation";
import { siteData } from "@/shared/config/site-data";
import { motion } from "framer-motion";
import { useState } from "react";

export function ContactsSection() {
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <section
      id="contacts"
      className="border-t border-wash bg-surface pt-16 pb-[calc(4rem+5.25rem+env(safe-area-inset-bottom,0px))] md:pt-24 md:pb-24"
    >
      <div className="mx-auto max-w-screen-2xl px-5 md:px-6 lg:px-8">
        <div className="rounded-3xl border border-wash bg-canvas p-3 shadow-card sm:p-4 md:p-6">
          <motion.h2
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold leading-[1.2] tracking-tight text-ink"
          >
            Контакты
          </motion.h2>
          <div className="mt-5 overflow-hidden rounded-2xl border border-wash bg-surface">
            <div className="relative h-56 w-full sm:h-64 md:h-72">
              {!mapLoaded ? (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-surface">
                  <span className="rounded-lg bg-white/95 px-3 py-2 text-sm font-semibold text-muted">
                    Загружаем карту...
                  </span>
                </div>
              ) : null}
              <iframe
                title="Карта"
                src={siteData.mapEmbedUrl}
                width="100%"
                height="100%"
                className="absolute inset-0 block h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                onLoad={() => setMapLoaded(true)}
              />
            </div>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <div className="flex flex-col rounded-2xl border border-wash bg-white p-5 text-ink">
              <p className="text-xs font-semibold leading-tight text-muted">Адрес</p>
              <p className="mt-2 text-sm font-semibold leading-snug">{siteData.addressLine}</p>
              <a
                href={siteData.yandexMapsReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex text-sm font-semibold text-accent transition hover:text-accentStrong"
              >
                Построить маршрут →
              </a>
              <div className="mt-3 border-t border-wash pt-3 text-sm leading-snug text-ink">
                <p className="text-xs font-semibold leading-tight text-muted">График работы</p>
                <p className="mt-1 whitespace-pre-line">{siteData.workHoursLine.replace(/\s+(выходной)/iu, "\n$1")}</p>
              </div>
            </div>
            <div className="rounded-2xl border border-wash bg-white p-5 text-ink">
              <p className="text-xs font-semibold leading-tight text-muted">Телефон</p>
              <a
                href={`tel:${siteData.phoneTel}`}
                className="mt-2 block text-base font-bold leading-tight text-accent transition hover:text-accentStrong"
              >
                {siteData.phoneDisplay}
              </a>
              <p className="mt-4 text-xs font-semibold leading-tight text-muted">E-mail</p>
              <a
                href={`mailto:${siteData.email}`}
                className="mt-1 block break-words text-sm font-semibold leading-snug text-accent transition hover:text-accentStrong"
              >
                {siteData.email}
              </a>
              <div className="mt-auto flex justify-center pt-3">
                <a
                  href={siteData.vkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-accent px-4 py-2 text-sm font-semibold leading-none text-white transition hover:bg-accentStrong"
                >
                  <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center" aria-hidden>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                      <path d="M12.58 17.6h1.45s.44-.05.66-.29c.2-.22.19-.64.19-.64s-.03-1.97.89-2.26c.91-.29 2.08 1.9 3.32 2.74.94.63 1.65.49 1.65.49l3.32-.05s1.73-.11.91-1.47c-.07-.11-.49-1.04-2.5-2.91-2.1-1.95-1.82-1.63.71-5.01 1.54-2.05 2.16-3.3 1.97-3.84-.18-.51-1.28-.37-1.28-.37l-3.74.02s-.28-.04-.48.08c-.2.12-.33.39-.33.39s-.59 1.56-1.37 2.89c-1.65 2.8-2.31 2.95-2.58 2.77-.63-.41-.47-1.64-.47-2.52 0-2.74.42-3.88-.81-4.18-.41-.1-.72-.17-1.77-.18-1.35-.01-2.49 0-3.13.31-.43.21-.76.69-.56.72.24.03.78.15 1.07.55.37.51.36 1.65.36 1.65s.21 3.22-.49 3.62c-.49.27-1.16-.28-2.61-2.82-.74-1.3-1.29-2.73-1.29-2.73s-.11-.26-.31-.39c-.24-.15-.57-.2-.57-.2l-3.55.02s-.53.01-.73.25c-.17.22-.01.67-.01.67s2.78 6.5 5.94 9.77c2.9 2.98 6.19 2.79 6.19 2.79Z" />
                    </svg>
                  </span>
                  <span>Группа ВКонтакте</span>
                </a>
              </div>
            </div>
            <div className="flex flex-col rounded-2xl border border-wash bg-white p-5 text-ink">
              <h3 className="text-xs font-semibold leading-tight text-muted">Запись на обучение</h3>
              <p className="mt-2 text-sm leading-snug text-ink">
                Оставьте заявку — мы уточним детали и подберем удобное время.
              </p>
              <div className="mt-auto flex justify-center pt-6">
                <ConsultationButton className="inline-flex min-h-10 w-fit items-center justify-center rounded-xl bg-accent px-5 py-2.5 text-sm font-bold leading-none text-white transition hover:bg-accentStrong">
                  Перезвоните мне
                </ConsultationButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
