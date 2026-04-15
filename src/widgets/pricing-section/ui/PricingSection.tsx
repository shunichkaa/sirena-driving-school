"use client";

import { InstallmentCalculator } from "@/features/installment-calculator";
import { homeFragmentHref } from "@/shared/config/app-base-path";
import { siteData } from "@/shared/config/site-data";
import { motion } from "framer-motion";

export function PricingSection() {
  const { manual, automatic } = siteData.categoryB;
  const categoryA = siteData.categoryA;
  const pricingCards = [
    {
      key: "manual",
      category: "Категория B · МКПП",
      price: manual.price,
      split: manual.note,
      features: [manual.lessons, ...manual.includes, "Рассрочка без переплат"],
      featured: false,
    },
    {
      key: "automatic",
      category: "Категория B · АКПП",
      price: automatic.price,
      split: "Теория + практика на автомате",
      features: [automatic.lessons, ...automatic.includes, "Рассрочка без переплат"],
      featured: true,
    },
    {
      key: "category-a",
      category: "Категория A · Мотоцикл",
      price: categoryA.price,
      split: `${categoryA.duration} обучения`,
      features: [categoryA.lessons, ...categoryA.includes],
      featured: false,
    },
  ] as const;

  return (
    <section id="ceny" className="border-t border-wash bg-surface py-14 md:py-20">
      <div className="mx-auto max-w-screen-2xl px-5 md:px-6 lg:px-8">
        <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold leading-[1.2] tracking-tight text-ink">Цены</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {pricingCards.map((item, index) => (
            <motion.article
              key={item.key}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ delay: index * 0.07 }}
              className={`flex flex-col rounded-2xl border bg-white p-7 shadow-card transition duration-200 hover:-translate-y-1 hover:shadow-lg ${
                item.featured
                  ? "border-2 border-accent ring-1 ring-accent/20"
                  : "border border-wash hover:border-accent"
              }`}
            >
              {item.featured ? (
                <span className="mb-3 inline-flex w-fit rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                  Популярный выбор
                </span>
              ) : null}
              <p className="text-sm text-muted">{item.category}</p>
              <p className="mt-4 text-[clamp(1.75rem,4vw,2.25rem)] font-bold tracking-tight text-accent">{item.price}</p>
              <p className="mt-2 max-w-measure text-[13px] leading-relaxed text-muted">{item.split}</p>
              <ul className="mt-4 space-y-2">
                {item.features.map((feature) => (
                  <li key={feature} className="flex gap-2 border-b border-wash py-1.5 text-sm text-ink last:border-b-0">
                    <span className="shrink-0 text-success" aria-hidden>
                      ✓
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href={homeFragmentHref("contacts")}
                className={`mt-6 inline-flex min-h-12 items-center justify-center rounded-lg px-5 py-3 text-base font-bold transition ${
                  item.featured
                    ? "bg-accent text-white hover:bg-accentStrong"
                    : "border-2 border-accent bg-white text-accent hover:bg-surface"
                }`}
              >
                Записаться
              </a>
            </motion.article>
          ))}
        </div>
        <InstallmentCalculator />
        <p className="mt-8 text-center text-sm text-muted">
          Остались вопросы по стоимости?{" "}
          <a href={`tel:${siteData.phoneTel}`} className="font-semibold text-accent hover:text-accentStrong">
            {siteData.phoneDisplay}
          </a>
        </p>
      </div>
    </section>
  );
}
