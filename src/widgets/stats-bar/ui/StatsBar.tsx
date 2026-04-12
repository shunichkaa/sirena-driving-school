"use client";

import { siteData } from "@/shared/config/site-data";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function useCountUp(target: number, enabled: boolean) {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!enabled || started.current) return;
    started.current = true;
    const duration = 1500;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - t) * (1 - t);
      setValue(Math.round(target * eased));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [enabled, target]);

  return value;
}

export function StatsBar() {
  const bar = siteData.stats.bar;
  const advantages = siteData.stats.advantages;
  const target = siteData.stats.counterPercent;
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);
  const count = useCountUp(target, run);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setRun(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px 120px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="preimushchestva" className="border-y border-wash bg-surfaceBar">
      <div ref={ref} className="mx-auto max-w-screen-2xl px-5 py-10 md:px-6 md:py-12 lg:px-8">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-0 md:divide-x md:divide-wash">
          {bar.map((it, i) => (
            <div key={it.label} className="text-center md:px-4">
              <p
                className={`font-bold leading-none text-accent ${
                  i === 0 ? "text-[clamp(2.75rem,9vw,4.5rem)]" : "text-[clamp(1.75rem,5vw,3rem)]"
                }`}
              >
                {i === 0 ? `${count}%` : it.value}
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
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
