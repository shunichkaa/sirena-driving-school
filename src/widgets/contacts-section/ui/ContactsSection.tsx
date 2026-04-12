"use client";

import { siteData } from "@/shared/config/site-data";
import { motion } from "framer-motion";
import Link from "next/link";
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
  const [consent, setConsent] = useState(false);
  const [hp, setHp] = useState("");
  const [sent, setSent] = useState(false);
  const [mailHref, setMailHref] = useState("");
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
    if (hp.trim()) return;
    if (!name.trim() || !phone.trim() || !consent) return;
    const catLine =
      category === ""
        ? "не указана"
        : category === "unknown"
          ? "нужна консультация"
          : category;
    const subject = encodeURIComponent("Запись на консультацию");
    const body = encodeURIComponent(
      `Имя: ${name.trim()}\nТелефон: ${phone.trim()}\nКатегория: ${catLine}\n\nСообщение отправлено с лендинга.`,
    );
    const href = `mailto:${siteData.email}?subject=${subject}&body=${body}`;
    setMailHref(href);
    setSent(true);
  }, [name, phone, category, consent, hp]);

  return (
    <section id="kontakty" className="border-t border-wash bg-white py-16 md:py-24">
      <div className="mx-auto max-w-screen-2xl px-3 md:px-4">
        <motion.h2
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold leading-[1.2] tracking-tight text-ink"
        >
          Контакты
        </motion.h2>
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <motion.div
            ref={mapSentinelRef}
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
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
                <span className="text-muted">Телефон администратора: </span>
                <a href={`tel:${siteData.phoneTel}`} className="text-lg font-bold text-accent hover:text-accentStrong">
                  {siteData.phoneDisplay}
                </a>
                <span className="mt-1 block text-[13px] text-subtle">По вопросам записи и обучения.</span>
              </p>
              <p>
                <span className="text-muted">Телефон учреждения: </span>
                <a
                  href={`tel:${siteData.phoneOfficeTel}`}
                  className="font-semibold text-accent hover:text-accentStrong"
                >
                  {siteData.phoneOfficeDisplay}
                </a>
                <span className="mt-1 block text-[13px] text-subtle">Директор (сведения с официального сайта школы).</span>
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
            <div className="relative rounded-2xl border border-wash bg-canvas p-6 shadow-card">
              <h3 className="text-lg font-medium text-ink">Запишитесь на обучение</h3>
              {sent ? (
                <div className="mt-4 space-y-4">
                  <p className="text-[15px] leading-relaxed text-muted">
                    Сформировано письмо на {siteData.email}. Нажмите кнопку ниже, чтобы открыть почтовый клиент. Если
                    не получилось — позвоните, перезвоним в рабочее время.
                  </p>
                  <a
                    href={mailHref}
                    className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-accent px-5 py-3 text-base font-bold text-white transition hover:bg-accentStrong"
                  >
                    Открыть почту
                  </a>
                </div>
              ) : (
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
                    <label htmlFor="consult-category" className="block text-sm font-medium text-ink">
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
                      disabled={!name.trim() || !phone.trim() || !consent}
                      className="min-h-12 rounded-lg border-2 border-accent bg-white px-5 py-3 text-base font-bold text-accent transition hover:bg-surface enabled:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 sm:min-w-[12rem]"
                    >
                      Записаться на консультацию
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
