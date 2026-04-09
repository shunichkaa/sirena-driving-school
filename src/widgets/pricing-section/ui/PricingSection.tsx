"use client";

import { motion } from "framer-motion";

const plans = [
  {
    title: "Базовый",
    theory: "Теория по программе",
    practice: "Практика по маршрутам",
    extras: "Поддержка по документам",
  },
  {
    title: "Стандарт",
    theory: "Теория + разбор экзаменационных кейсов",
    practice: "Расширенная практика в городе",
    extras: "Сопровождение до экзамена",
  },
  {
    title: "Максимум",
    theory: "Интенсивная теория с куратором",
    practice: "Индивидуальный график практики",
    extras: "Приоритетная запись на занятия",
  },
];

type PricingSectionProps = {
  onConsult: () => void;
};

export function PricingSection({ onConsult }: PricingSectionProps) {
  return (
    <section className="bg-wash/30 py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <h2 className="text-[2rem] font-black tracking-tight text-ink md:text-4xl">Тарифы</h2>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.article
              key={plan.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="rounded-2xl border border-wash bg-white p-4 md:p-5"
            >
              <h3 className="text-xl font-black text-ink">{plan.title}</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                <li>{plan.theory}</li>
                <li>{plan.practice}</li>
                <li>{plan.extras}</li>
              </ul>
              <button
                type="button"
                onClick={onConsult}
                className="mt-6 w-full rounded-full bg-accent px-5 py-3 text-xs font-black uppercase tracking-wide text-ink transition hover:brightness-95"
              >
                Записаться
              </button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
