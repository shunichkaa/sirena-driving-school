"use client";

import { siteData } from "@/shared/config/site-data";
import { motion } from "framer-motion";

export function StatsBar() {
  const bar = siteData.stats.bar;
  const advantages = siteData.stats.advantages;

  return (
    <section id="preimushchestva" className="border-y border-wash bg-surfaceBar">
      <div className="mx-auto max-w-screen-2xl px-5 py-10 md:px-6 md:py-12 lg:px-8">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-0 md:divide-x md:divide-wash">
          {bar.map((it) => (
            <div key={it.label} className="text-center md:px-4">
              <p className="font-bold leading-none text-accent text-[clamp(1.75rem,5vw,3rem)]">
                {it.value}
              </p>
              <p className="mt-2 text-[13px] font-medium leading-snug text-muted md:text-sm">{it.label}</p>
            </div>
          ))}
        </div>
        <motion.h2
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          className="mb-8 mt-14 text-[clamp(1.5rem,4vw,2.5rem)] font-bold leading-[1.2] tracking-tight text-ink"
        >
          Почему выбирают нас
        </motion.h2>
        <div className="grid gap-4 md:grid-cols-3">
          {advantages.map((card, index) => (
            <motion.article
              key={card.title}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ delay: index * 0.06 }}
              className="rounded-2xl border border-wash bg-white p-6 shadow-card transition duration-200 hover:-translate-y-1 hover:border-accent"
            >
              <span className="text-2xl text-accent" aria-hidden>
                ✓
              </span>
              <h3 className="mt-3 text-lg font-medium leading-snug text-ink md:text-xl">{card.title}</h3>
              <p className="mt-2 text-[15px] font-normal leading-relaxed text-muted">{card.text}</p>
              {"linkHref" in card && card.linkHref ? (
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
                  <a
                    href={card.linkHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex text-sm font-semibold text-accent underline decoration-accent/40 underline-offset-4 hover:text-accentStrong"
                  >
                    {card.linkLabel}
                  </a>
                  {"secondaryLinkHref" in card && card.secondaryLinkHref ? (
                    <a
                      href={card.secondaryLinkHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex text-sm font-semibold text-accent underline decoration-accent/40 underline-offset-4 hover:text-accentStrong"
                    >
                      {card.secondaryLinkLabel}
                    </a>
                  ) : null}
                </div>
              ) : null}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
