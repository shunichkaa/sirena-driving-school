"use client";

import { siteData } from "@/shared/config/site-data";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

type ContactsSectionProps = {
  onOpenConsult: () => void;
};

const categories = [
  { value: "", label: "Какая категория вас интересует?" },
  { value: "A", label: "Категория A" },
  { value: "B", label: "Категория B" },
  { value: "unknown", label: "Не знаю" },
] as const;

export function ContactsSection({ onOpenConsult }: ContactsSectionProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");
  const [sent, setSent] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const mapSentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = mapSentinelRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setMapReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: "160px", threshold: 0.01 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const sendMail = useCallback(() => {
    const catLine =
      category === ""
        ? "не указана"
        : category === "unknown"
          ? "нужна консультация"
          : category;
    const subject = encodeURIComponent("Запись на консультацию");
    const body = encodeURIComponent(
      `Имя: ${name}\nТелефон: ${phone}\nКатегория: ${catLine}\n\nСообщение отправлено с лендинга.`,
    );
    setSent(true);
    window.setTimeout(() => {
      window.location.href = `mailto:${siteData.email}?subject=${subject}&body=${body}`;
    }, 600);
  }, [name, phone, category]);

  return (
    <section id="kontakty" className="border-t border-wash bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold leading-[1.2] tracking-tight text-ink"
        >
          Контакты
        </motion.h2>
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <motion.div
            ref={mapSentinelRef}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-2xl border border-wash bg-white shadow-card"
          >
            {mapReady ? (
              <iframe
                title="Карта"
                src={siteData.mapEmbedUrl}
                className="h-[min(60vh,440px)] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="h-[min(60vh,440px)] w-full bg-wash" aria-hidden />
            )}
          </motion.div>
          <div className="flex flex-col justify-center gap-8">
            <div className="max-w-measure space-y-2 text-[15px] text-ink">
              <p className="font-semibold">{siteData.addressLine}</p>
              <p className="text-muted">{siteData.workHoursLine}</p>
              <p>
                <span className="text-muted">Телефон: </span>
                <a href={`tel:${siteData.phoneTel}`} className="text-lg font-bold text-accent hover:text-accentStrong">
                  {siteData.phoneDisplay}
                </a>
                <span className="mt-1 block text-[13px] text-subtle">Звоните в указанные часы — ответим или перезвоним.</span>
              </p>
              <p>
                <span className="text-muted">E-mail: </span>
                <a href={`mailto:${siteData.email}`} className="font-semibold text-accent hover:text-accentStrong">
                  {siteData.email}
                </a>
              </p>
              <a
                href={siteData.vkUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center gap-3 rounded-lg border border-wash bg-surface px-4 py-3 font-semibold text-ink transition hover:border-accent"
              >
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0077FF] text-sm font-black text-white"
                  aria-hidden
                >
                  VK
                </span>
                Группа ВКонтакте
              </a>
            </div>
            <div className="rounded-2xl border border-wash bg-canvas p-6 shadow-card">
              <h3 className="text-lg font-medium text-ink">Запишитесь на обучение</h3>
              {sent ? (
                <p className="mt-4 text-[15px] leading-relaxed text-muted">
                  Заявка принята. Если почтовый клиент не открылся, позвоните нам — перезвоним в течение 15 минут в
                  рабочее время.
                </p>
              ) : (
                <>
                  <div className="mt-4 space-y-3">
                    <label htmlFor="consult-category" className="sr-only">
                      Категория
                    </label>
                    <select
                      id="consult-category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="min-h-12 w-full rounded-lg border border-wash bg-white px-3 py-2 text-base text-ink outline-none ring-accent focus:ring-2"
                    >
                      {categories.map((c) => (
                        <option key={c.value || "empty"} value={c.value}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                    <label htmlFor="consult-name" className="sr-only">
                      Имя
                    </label>
                    <input
                      id="consult-name"
                      className="min-h-12 w-full rounded-lg border border-wash bg-white px-3 py-2 text-base outline-none ring-accent focus:ring-2"
                      placeholder="Имя"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                    />
                    <label htmlFor="consult-phone" className="sr-only">
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
                  </div>
                  <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
                    <button
                      type="button"
                      onClick={onOpenConsult}
                      className="min-h-12 rounded-lg bg-accent px-5 py-3 text-base font-bold text-white transition hover:scale-[1.02] hover:bg-accentStrong active:scale-100 sm:min-w-[12rem]"
                    >
                      Онлайн-запись
                    </button>
                    <button
                      type="button"
                      onClick={sendMail}
                      className="min-h-12 rounded-lg border-2 border-accent bg-white px-5 py-3 text-base font-bold text-accent transition hover:bg-surface sm:min-w-[12rem]"
                    >
                      Записаться на консультацию
                    </button>
                  </div>
                  <p className="mt-3 text-[12px] leading-snug text-subtle">
                    Нажимая кнопку, вы соглашаетесь с обработкой персональных данных в соответствии с{" "}
                    <a href={siteData.officialUrl} className="text-accent underline underline-offset-2">
                      политикой на официальном сайте
                    </a>
                    .
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
