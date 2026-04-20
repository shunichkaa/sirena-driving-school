"use client";

import { siteData } from "@/shared/config/site-data";
import Image from "next/image";
import { useMemo, useState } from "react";

const money = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 });

export function InstallmentCalculator() {
  const defaults = siteData.installmentCalculator;
  const requisites = defaults.paymentRequisites;
  const [activeTab, setActiveTab] = useState<"installment" | "requisites">("installment");
  const qrCodeSrc = "/docs/QR.png";
  const total = defaults.totalRub;
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
      <div className="grid grid-cols-2 gap-2 rounded-xl border border-wash bg-surface p-1">
        <button
          type="button"
          onClick={() => setActiveTab("installment")}
          className={`min-h-10 rounded-lg px-4 text-sm font-semibold transition ${
            activeTab === "installment" ? "bg-accent text-white" : "text-muted hover:text-ink"
          }`}
          aria-pressed={activeTab === "installment"}
        >
          Рассрочка
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("requisites")}
          className={`min-h-10 rounded-lg px-4 text-sm font-semibold transition ${
            activeTab === "requisites" ? "bg-accent text-white" : "text-muted hover:text-ink"
          }`}
          aria-pressed={activeTab === "requisites"}
        >
          Реквизиты
        </button>
      </div>

      <div className="mt-5 grid">
        <section
          className={`[grid-area:1/1] ${activeTab === "installment" ? "visible" : "invisible"}`}
          aria-hidden={activeTab !== "installment"}
        >
          <h3 className="text-lg font-semibold leading-tight">{defaults.title}</h3>
          <p className="mt-1 text-sm text-muted">Выберите удобный план - цена не меняется</p>
          <div className="mt-6">
            <label className="block text-[13px] text-muted">
              Стоимость курса, ₽
              <div className="mt-1.5 min-h-11 w-full rounded-lg border border-wash bg-surface px-3.5 py-2 text-base text-ink">
                {total}
              </div>
            </label>
          </div>
          <p className="mt-5 text-[13px] text-muted">Способ оплаты</p>
          <div className="mt-2 grid auto-rows-fr gap-2 md:grid-cols-3">
            {plans.map((plan) => {
              const isActive = plan.months === months;
              return (
                <button
                  key={plan.months}
                  type="button"
                  onClick={() => setMonths(plan.months)}
                  className={`flex h-full min-h-[72px] flex-col items-center justify-center rounded-xl border px-3 py-3 text-center transition ${
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
        </section>
        <section
          className={`[grid-area:1/1] h-full ${activeTab === "requisites" ? "visible" : "invisible"}`}
          aria-hidden={activeTab !== "requisites"}
        >
          <div className="mt-4 flex h-full flex-col justify-between">
            <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_170px] md:gap-6">
              <dl className="rounded-lg border border-wash bg-surface px-4 py-2 text-sm leading-snug">
                <div className="grid grid-cols-[104px_minmax(0,1fr)] gap-2 border-b border-wash py-3 sm:grid-cols-[130px_minmax(0,1fr)]">
                  <dt className="text-muted">Получатель</dt>
                  <dd className="font-semibold text-ink">{requisites.fullName}</dd>
                </div>
                <div className="grid grid-cols-[104px_minmax(0,1fr)] gap-2 border-b border-wash py-3 sm:grid-cols-[130px_minmax(0,1fr)]">
                  <dt className="text-muted">ИНН/КПП</dt>
                  <dd className="break-all text-xs font-semibold leading-tight text-ink sm:text-sm">{requisites.innKpp}</dd>
                </div>
                <div className="grid grid-cols-[104px_minmax(0,1fr)] gap-2 border-b border-wash py-3 sm:grid-cols-[130px_minmax(0,1fr)]">
                  <dt className="text-muted">ОГРН</dt>
                  <dd className="break-all text-xs font-semibold leading-tight text-ink sm:text-sm">{requisites.ogrn}</dd>
                </div>
                <div className="grid grid-cols-[104px_minmax(0,1fr)] gap-2 border-b border-wash py-3 sm:grid-cols-[130px_minmax(0,1fr)]">
                  <dt className="text-muted">Расч. счёт</dt>
                  <dd className="break-all text-xs font-semibold leading-tight text-ink sm:text-sm">{requisites.checkingAccount}</dd>
                </div>
                <div className="grid grid-cols-[104px_minmax(0,1fr)] gap-2 border-b border-wash py-3 sm:grid-cols-[130px_minmax(0,1fr)]">
                  <dt className="text-muted">Банк</dt>
                  <dd className="font-semibold text-ink">{requisites.bankName}</dd>
                </div>
                <div className="grid grid-cols-[104px_minmax(0,1fr)] gap-2 border-b border-wash py-3 sm:grid-cols-[130px_minmax(0,1fr)]">
                  <dt className="text-muted">Корр. счёт</dt>
                  <dd className="break-all text-xs font-semibold leading-tight text-ink sm:text-sm">{requisites.correspondentAccount}</dd>
                </div>
                <div className="grid grid-cols-[104px_minmax(0,1fr)] gap-2 py-3 sm:grid-cols-[130px_minmax(0,1fr)]">
                  <dt className="text-muted">БИК</dt>
                  <dd className="break-all text-xs font-semibold leading-tight text-ink sm:text-sm">{requisites.bik}</dd>
                </div>
              </dl>
              <div className="flex flex-col items-center justify-start">
                {qrCodeSrc ? (
                  <Image
                    src={qrCodeSrc}
                    alt="QR-код для оплаты по реквизитам"
                    width={160}
                    height={160}
                    className="h-40 w-40 rounded-xl border border-wash bg-white p-1.5"
                  />
                ) : null}
                <p className="mt-3 text-center text-sm leading-snug text-muted">Отсканируйте для оплаты</p>
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
        </section>
      </div>
    </div>
  );
}
