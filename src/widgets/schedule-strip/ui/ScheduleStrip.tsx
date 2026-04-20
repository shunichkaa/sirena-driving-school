"use client";

import { assetUrl, homeFragmentHref } from "@/shared/config/app-base-path";
import { siteData } from "@/shared/config/site-data";
import { motion } from "framer-motion";

export function ScheduleStrip() {
  const scheduleItems = [
    { label: "Набор на теорию", value: "Ежемесячно" },
    { label: "Практика вождения", value: "Инд. график" },
    { label: "Офис, будни", value: "14:00-21:00" },
  ] as const;

  const resolveHref = (href: string) => {
    if (href.startsWith("/#")) {
      return homeFragmentHref(href.slice(2));
    }
    if (href.startsWith("/")) {
      return assetUrl(href);
    }
    return href;
  };

  return (
    <section id="schedule" className="border-y border-wash/80 bg-canvas py-10 md:py-12">
      <div className="mx-auto max-w-screen-2xl px-5 md:px-6 lg:px-8">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          className="grid gap-0 overflow-hidden rounded-3xl border border-wash bg-white shadow-card md:grid-cols-[1.05fr_1fr]"
        >
          <div className="min-w-0 p-6 md:p-9">
            <h2 className="mt-2 text-2xl font-bold leading-[1.1] tracking-tight text-ink md:text-3xl">
              {siteData.scheduleStrip.title}
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-ink md:text-[17px]">
              Уточните расписание и запишитесь на ближайшую группу по телефону или лично в офисе.
            </p>
            <div className="mt-11 flex flex-wrap gap-2.5">
              {siteData.trainingLinks.map((link) => (
                <a
                  key={link.href}
                  href={resolveHref(link.href)}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="rounded-full border border-wash bg-white px-4 py-2 text-xs font-semibold leading-none text-ink transition hover:border-accent hover:text-accent"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div className="border-t border-wash bg-canvas p-6 md:border-l md:border-t-0 md:p-9">
            <div className="space-y-3">
              {scheduleItems.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-wash bg-white px-5 py-3"
                >
                  <span className="text-sm font-medium leading-tight text-ink md:text-base">{item.label}</span>
                  <span className="inline-flex items-center whitespace-nowrap rounded-full bg-surface px-3 py-1.5 text-sm font-bold leading-none text-accent md:px-4 md:text-base">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
            <a
              href={`tel:${siteData.phoneTel}`}
              className="mx-auto mt-5 flex min-h-12 w-fit items-center justify-center rounded-xl bg-accent px-6 py-3 text-base font-bold text-white transition hover:bg-accentStrong"
            >
              Позвонить
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
