"use client";

import { ConsultationButton } from "@/features/book-consultation";
import { siteData } from "@/shared/config/site-data";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export function ContactsSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [consent, setConsent] = useState(false);
  const [hp, setHp] = useState("");
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <section id="contacts" className="border-t border-wash bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-screen-2xl px-5 md:px-6 lg:px-8">
        <motion.h2
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold leading-[1.2] tracking-tight text-ink"
        >
          Контакты
        </motion.h2>
        <div className="mt-10 grid items-start gap-10 lg:grid-cols-2">
          <div className="min-w-0 w-full overflow-hidden rounded-2xl border border-wash bg-white shadow-card">
            <div className="relative h-56 w-full min-w-0 bg-wash sm:h-64 md:h-72">
              {!mapLoaded ? (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-wash">
                  <span className="rounded-lg bg-white/90 px-3 py-2 text-sm font-medium text-muted">
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
                loading="eager"
                referrerPolicy="no-referrer-when-downgrade"
                onLoad={() => setMapLoaded(true)}
              />
            </div>
          </div>
          <div className="flex flex-col justify-center gap-8 lg:min-w-0">
            <div className="space-y-2 text-[15px] text-ink">
              <p className="font-semibold">{siteData.addressLine}</p>
              <p>
                <a
                  href={siteData.yandexMapsReviewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-accent underline decoration-accent/40 underline-offset-4 transition hover:text-accentStrong"
                >
                  Схема проезда в Яндекс.Картах
                </a>
              </p>
              <p className="text-muted">{siteData.workHoursLine}</p>
              <p>
                <span className="text-muted">Телефон: </span>
                <a href={`tel:${siteData.phoneTel}`} className="text-lg font-bold text-accent hover:text-accentStrong">
                  {siteData.phoneDisplay}
                </a>
              </p>
              <p>
                <span className="text-muted">E-mail: </span>
                <a
                  href={`mailto:${siteData.email}`}
                  className="break-words font-semibold text-accent hover:text-accentStrong"
                >
                  {siteData.email}
                </a>
              </p>
              <a
                href={siteData.vkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-3 rounded-lg border border-wash bg-surface px-4 py-3 font-semibold text-ink transition hover:border-accent"
              >
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-sm font-black text-white"
                  aria-hidden
                >
                  VK
                </span>
                Группа ВКонтакте
              </a>
            </div>
          </div>
          <div className="relative w-full max-w-5xl rounded-2xl border border-wash bg-canvas p-4 shadow-card sm:p-6 md:p-7 lg:col-span-2 lg:mx-auto">
            <h3 className="text-lg font-medium text-ink">Запишитесь на обучение</h3>
            <>
              <input
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
                className="pointer-events-none absolute left-0 top-0 h-px w-px opacity-0"
                value={hp}
                onChange={(e) => setHp(e.target.value)}
              />
              <div className="mt-4 space-y-3">
                <label htmlFor="consult-name" className="block text-sm font-medium text-ink">
                  Имя
                </label>
                <input
                  id="consult-name"
                  className="min-h-12 w-full rounded-lg border border-wash bg-white px-3 py-2 text-base outline-none ring-accent focus:ring-2"
                  placeholder="Как к вам обращаться"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
                <label htmlFor="consult-phone" className="block text-sm font-medium text-ink">
                  Телефон
                </label>
                <input
                  id="consult-phone"
                  className="min-h-12 w-full rounded-lg border border-wash bg-white px-3 py-2 text-base outline-none ring-accent focus:ring-2"
                  placeholder="+7 (___) ___-__-__"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                  inputMode="tel"
                />
                <label htmlFor="consult-time" className="block text-sm font-medium text-ink">
                  Удобное время звонка
                </label>
                <select
                  id="consult-time"
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="min-h-12 w-full rounded-lg border border-wash bg-white px-3 py-2 text-base text-ink outline-none ring-accent focus:ring-2"
                >
                  <option value="">Выберите вариант</option>
                  <option value="Будни, днём (до 17:00)">Будни, днём (до 17:00)</option>
                  <option value="Будни, вечер (после 17:00)">Будни, вечер (после 17:00)</option>
                  <option value="Выходные">Выходные</option>
                  <option value="В любое рабочее время">В любое рабочее время</option>
                </select>
                <label className="flex cursor-pointer gap-3 text-sm leading-snug text-muted">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 h-5 w-5 shrink-0 rounded border-wash text-accent focus:ring-accent"
                  />
                  <span>
                    Согласен (-на) на обработку персональных данных в соответствии с{" "}
                    <Link
                      href={`${siteData.privacyPath}/`}
                      className="font-semibold text-accent underline underline-offset-2"
                    >
                      политикой конфиденциальности
                    </Link>
                  </span>
                </label>
              </div>
              <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
                <ConsultationButton className="inline-flex min-h-11 self-start items-center justify-center rounded-lg bg-accent px-6 py-2.5 text-base font-bold leading-none text-white transition hover:scale-[1.02] hover:bg-accentStrong active:scale-100 sm:min-w-[12rem]">
                  Перезвоните мне
                </ConsultationButton>
              </div>
            </>
          </div>
        </div>
      </div>
    </section>
  );
}
