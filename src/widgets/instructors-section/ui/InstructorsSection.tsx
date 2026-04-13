"use client";

import { siteData } from "@/shared/config/site-data";
import { motion } from "framer-motion";
import Image from "next/image";

const toneClass: Record<string, string> = {
  blue: "bg-accent/15 text-accentStrong",
  soft: "bg-surface text-accent",
};

export function InstructorsSection() {
  return (
    <section id="instruktory" className="border-t border-wash bg-surface py-14 md:py-20">
      <div className="mx-auto max-w-screen-2xl px-5 md:px-6 lg:px-8">
        <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold leading-[1.2] tracking-tight text-ink">
          Наши инструкторы
        </h2>
        <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-2 md:overflow-visible">
          {siteData.instructors.map((person, index) => (
            <motion.article
              key={person.name}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ delay: index * 0.06 }}
              className="w-[min(100%,22rem)] shrink-0 snap-center rounded-2xl border border-wash bg-white p-6 shadow-card transition duration-200 hover:-translate-y-1 hover:shadow-lg md:w-auto"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full text-xl font-bold ${toneClass[person.tone] ?? toneClass.blue}`}
                >
                  {person.photoSrc ? (
                    <Image fill src={person.photoSrc} alt={person.name} className="object-cover" sizes="80px" />
                  ) : (
                    person.initials
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-ink md:text-xl">{person.name}</h3>
                  <p className="mt-1 text-[13px] text-muted">{person.since}</p>
                  <p className="mt-1 text-sm font-medium text-ink">{person.focus}</p>
                </div>
              </div>
              <ul className="mt-4 space-y-2 text-left text-sm leading-snug text-muted">
                <li className="flex gap-2">
                  <span className="shrink-0 text-success" aria-hidden>
                    ✓
                  </span>
                  <span>
                    <span className="font-semibold text-ink">Стаж:</span> {person.workExperience}
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="shrink-0 text-success" aria-hidden>
                    ✓
                  </span>
                  <span>
                    <span className="font-semibold text-ink">Выпускников:</span> {person.graduatesCount}
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="shrink-0 text-success" aria-hidden>
                    ✓
                  </span>
                  <span>
                    <span className="font-semibold text-ink">Специализация:</span> {person.specialization}
                  </span>
                </li>
              </ul>
              <p className="mt-4 border-l-2 border-accent pl-3 text-sm italic leading-relaxed text-muted">«{person.quote}»</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
