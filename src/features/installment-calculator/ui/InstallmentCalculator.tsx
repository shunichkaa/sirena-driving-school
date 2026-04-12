"use client";

import { siteData } from "@/shared/config/site-data";
import { useMemo, useState } from "react";

const money = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 });

export function InstallmentCalculator() {
  const defaults = siteData.installmentCalculator;
  const [total, setTotal] = useState<number>(defaults.totalRub);
  const [first, setFirst] = useState<number>(defaults.firstRub);
  const [months, setMonths] = useState<number>(defaults.months);

  const monthly = useMemo(() => {
    const rest = total - first;
    if (rest <= 0 || months < 1) return 0;
    return Math.ceil(rest / months);
  }, [total, first, months]);

  return (
    <div className="mt-10 rounded-2xl border border-wash bg-white p-6 shadow-card md:p-8">
      <h3 className="text-lg font-bold text-ink md:text-xl">{defaults.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{defaults.hint}</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <label className="block text-sm font-medium text-ink">
          Стоимость, ₽
          <input
            type="number"
            min={1000}
            step={500}
            className="mt-1 min-h-12 w-full rounded-lg border border-wash bg-surface/40 px-3 py-2 text-base text-ink outline-none ring-accent focus:ring-2"
            value={Number.isNaN(total) ? "" : total}
            onChange={(e) => setTotal(Number(e.target.value))}
          />
        </label>
        <label className="block text-sm font-medium text-ink">
          Первый взнос, ₽
          <input
            type="number"
            min={0}
            step={500}
            className="mt-1 min-h-12 w-full rounded-lg border border-wash bg-surface/40 px-3 py-2 text-base text-ink outline-none ring-accent focus:ring-2"
            value={Number.isNaN(first) ? "" : first}
            onChange={(e) => setFirst(Number(e.target.value))}
          />
        </label>
        <label className="block text-sm font-medium text-ink">
          Месяцев
          <input
            type="number"
            min={1}
            max={24}
            step={1}
            className="mt-1 min-h-12 w-full rounded-lg border border-wash bg-surface/40 px-3 py-2 text-base text-ink outline-none ring-accent focus:ring-2"
            value={Number.isNaN(months) ? "" : months}
            onChange={(e) => setMonths(Number(e.target.value))}
          />
        </label>
      </div>
      <p className="mt-6 text-center text-sm text-muted">
        Ориентировочный платёж после взноса
      </p>
      <p className="mt-1 text-center text-[clamp(1.5rem,4vw,2rem)] font-bold text-accent">
        {monthly > 0 ? `${money.format(monthly)} ₽` : "—"} в месяц
      </p>
    </div>
  );
}
