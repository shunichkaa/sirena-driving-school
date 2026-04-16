"use client";

import { siteData } from "@/shared/config/site-data";
import { useMemo, useState } from "react";

const money = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 });

export function InstallmentCalculator() {
  const defaults = siteData.installmentCalculator;
  const [total, setTotal] = useState<number>(defaults.totalRub);
  const [months, setMonths] = useState<number>(3);
  const firstPayment = defaults.firstRub;

  const monthly = useMemo(() => {
    if (total <= 0 || months < 1) return 0;
    if (months === 1) return total;
    const remaining = Math.max(0, total - firstPayment);
    return Math.round(remaining / months);
  }, [firstPayment, total, months]);

  const plans = [
    { months: 1, title: "Сразу", subtitle: "без переплат" },
    { months: 2, title: "2 месяца", subtitle: "равными частями" },
    { months: 3, title: "3 месяца", subtitle: "равными частями" },
  ] as const;

  return (
    <div className="mx-auto mt-6 w-full max-w-[700px] rounded-2xl border border-wash bg-white p-6 text-ink shadow-card">
      <h3 className="text-lg font-semibold leading-tight">{defaults.title}</h3>
      <p className="mt-1 text-sm text-muted">Выберите удобный план - цена не меняется</p>
      <div className="mt-6">
        <label className="block text-[13px] text-muted">
          Стоимость курса, ₽
          <input
            type="number"
            min={54000}
            step={500}
            className="mt-1.5 min-h-11 w-full rounded-lg border border-wash bg-surface px-3.5 py-2 text-base text-ink outline-none ring-[#3B6D11]/25 focus:border-[#3B6D11] focus:ring-2"
            value={Number.isNaN(total) ? "" : total}
            onChange={(e) => setTotal(Math.max(54000, Number(e.target.value) || 0))}
          />
        </label>
      </div>
      <p className="mt-5 text-[13px] text-muted">Способ оплаты</p>
      <div className="mt-2 grid gap-2 md:grid-cols-3">
        {plans.map((plan) => {
          const isActive = plan.months === months;
          return (
            <button
              key={plan.months}
              type="button"
              onClick={() => setMonths(plan.months)}
              className={`rounded-xl border px-3 py-3 text-center transition ${
                isActive
                  ? "border-2 border-[#3B6D11] bg-[#EAF3DE] text-[#27500A]"
                  : "border-wash bg-surface text-ink hover:border-ink/25 hover:bg-white"
              }`}
            >
              <span className="block text-base font-medium leading-none">{plan.title}</span>
              <span className={`mt-1 block text-xs leading-tight ${isActive ? "text-[#3B6D11]" : "text-muted"}`}>
                {plan.subtitle}
              </span>
            </button>
          );
        })}
      </div>
      <div className="mt-5 flex flex-col justify-between gap-4 rounded-lg border border-wash bg-surface px-5 py-4 md:flex-row md:items-center">
        <div>
          <p className="text-[13px] text-muted">{months === 1 ? "Единовременно" : "Платёж в месяц после взноса"}</p>
          <p className="mt-1 text-[clamp(1.6rem,3vw,2.2rem)] font-semibold leading-none text-[#3B6D11]">
            {monthly > 0 ? `${money.format(monthly)} ₽` : "—"}
          </p>
          {months > 1 ? <p className="mt-1 text-xs text-muted">Первый взнос: {money.format(firstPayment)} ₽</p> : null}
        </div>
        <div className="text-left md:text-right">
          <p className="text-[13px] text-muted">Итого</p>
          <p className="mt-1 text-2xl font-semibold leading-none text-ink">{total > 0 ? `${money.format(total)} ₽` : "—"}</p>
        </div>
      </div>
      <p className="mt-4 text-center text-[13px] text-muted">
        Остались вопросы?{" "}
        <a
          href={`tel:${siteData.phoneTel}`}
          className="font-medium text-[#3B6D11] transition hover:text-[#2f560f]"
        >
          {siteData.phoneDisplay}
        </a>
      </p>
    </div>
  );
}
