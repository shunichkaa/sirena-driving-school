"use client";

import { siteData } from "@/shared/config/site-data";
import { motion } from "framer-motion";
import { useCallback, useState } from "react";

type ContactsSectionProps = {
  onOpenConsult: () => void;
};

export function ContactsSection({ onOpenConsult }: ContactsSectionProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const sendMail = useCallback(() => {
    const subject = encodeURIComponent("Запись на консультацию");
    const body = encodeURIComponent(
      `Имя: ${name}\nТелефон: ${phone}\n\nСообщение отправлено с лендинга.`,
    );
    window.location.href = `mailto:${siteData.email}?subject=${subject}&body=${body}`;
  }, [name, phone]);

  return (
    <section id="kontakty" className="bg-wash/50 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-black uppercase tracking-tight text-ink md:text-3xl"
        >
          Контакты
        </motion.h2>
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-2xl border border-wash bg-white shadow-sm"
          >
            <iframe
              title="Карта"
              src={siteData.mapEmbedUrl}
              className="h-[min(60vh,440px)] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
          <div className="flex flex-col justify-center gap-8">
            <div className="space-y-2 text-sm text-ink">
              <p className="font-bold">{siteData.addressLine}</p>
              <p>
                <span className="text-muted">Телефон: </span>
                <a href={`tel:${siteData.phoneTel}`} className="font-semibold hover:text-accent">
                  {siteData.phoneDisplay}
                </a>
              </p>
              <p>
                <span className="text-muted">E-mail: </span>
                <a href={`mailto:${siteData.email}`} className="font-semibold hover:text-accent">
                  {siteData.email}
                </a>
              </p>
              <p>
                <a
                  href={siteData.vkUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-ink underline decoration-accent underline-offset-4 hover:text-accent"
                >
                  Группа ВКонтакте
                </a>
              </p>
            </div>
            <div className="rounded-2xl border border-wash bg-white p-6 shadow-sm">
              <h3 className="text-base font-bold text-ink">Запись на консультацию</h3>
              <div className="mt-4 space-y-3">
                <label htmlFor="consult-name" className="sr-only">
                  Имя
                </label>
                <input
                  id="consult-name"
                  className="w-full rounded-lg border border-wash px-3 py-2 text-sm outline-none ring-accent focus:ring-2"
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
                  className="w-full rounded-lg border border-wash px-3 py-2 text-sm outline-none ring-accent focus:ring-2"
                  placeholder="Телефон"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                  inputMode="tel"
                />
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={sendMail}
                  className="rounded-full bg-accent px-5 py-3 text-xs font-black uppercase tracking-wide text-ink"
                >
                  Открыть письмо
                </button>
                <button
                  type="button"
                  onClick={onOpenConsult}
                  className="rounded-full border-2 border-ink px-5 py-3 text-xs font-black uppercase tracking-wide text-ink hover:border-accent"
                >
                  Форма в окне
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
