"use client";

import { siteData } from "@/shared/config/site-data";
import { motion } from "framer-motion";

export function ScheduleStrip() {
  return (
    <section
      id="raspisanie"
      className="border-y border-wash bg-white py-12 md:py-14"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-4 text-center md:flex-row md:items-center md:justify-between md:text-left"
        >
          <div>
            <h2 className="text-xl font-black uppercase tracking-tight text-ink md:text-2xl">
              Расписание
            </h2>
            <p className="mt-2 max-w-xl text-sm text-muted">
              График занятий и набор групп уточняйте в офисе или по телефону. Актуальные
              документы и программы — на{" "}
              <a
                href={siteData.officialUrl}
                className="font-semibold text-ink underline decoration-accent underline-offset-4 hover:text-accent"
                target="_blank"
                rel="noreferrer"
              >
                официальном сайте
              </a>
              .
            </p>
          </div>
          <a
            href={`tel:${siteData.phoneTel}`}
            className="inline-flex shrink-0 items-center justify-center rounded-full border-2 border-accent px-6 py-3 text-sm font-black uppercase tracking-wide text-ink"
          >
            Позвонить
          </a>
        </motion.div>
      </div>
    </section>
  );
}
