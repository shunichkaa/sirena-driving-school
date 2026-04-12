"use client";

import { siteData } from "@/shared/config/site-data";
import { motion } from "framer-motion";

const toneClass: Record<string, string> = {
  blue: "bg-accent/15 text-accentStrong",
  soft: "bg-surface text-accent",
};

export function InstructorsSection() {
  return (
    <section id="instruktory" className="border-t border-wash bg-surface py-14 md:py-20">
      <div className="mx-auto max-w-screen-2xl px-3 md:px-4">
        <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold leading-[1.2] tracking-tight text-ink">
          Ваши инструкторы
        </h2>
        <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-2 md:overflow-visible">
          {siteData.instructors.map((person, index) => (
            <motion.article
              key={person.name}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ delay: index * 0.06 }}
              className="w-[min(100%,20rem)] shrink-0 snap-center rounded-2xl border border-wash bg-white p-6 shadow-card transition duration-200 hover:-translate-y-1 hover:border-accent md:w-auto"
            >
              <div
                className={`mx-auto flex h-44 w-44 items-center justify-center rounded-full text-2xl font-bold ${toneClass[person.tone] ?? toneClass.blue}`}
              >
                {person.initials}
              </div>
              <h3 className="mt-4 text-center text-lg font-medium text-ink md:text-xl">{person.name}</h3>
              <p className="mt-2 text-center text-[13px] text-muted">{person.since}</p>
              <p className="mt-2 text-center text-sm font-medium text-ink">{person.focus}</p>
              <p className="mt-3 text-center text-sm italic leading-relaxed text-muted">«{person.quote}»</p>
              <p className="mt-3 text-center text-[13px] font-semibold text-accent">{person.graduates}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
