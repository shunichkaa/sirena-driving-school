"use client";

import { siteData } from "@/shared/config/site-data";

type FinalCtaProps = {
  onConsult: () => void;
};

export function FinalCta({ onConsult }: FinalCtaProps) {
  return (
    <section className="border-y border-wash bg-white py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 text-center md:px-6 lg:px-8">
        <h2 className="text-3xl font-black tracking-tight text-ink md:text-4xl">
          Готовы начать обучение?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted md:text-base">
          Оставьте заявку, и мы подберем удобный график и формат обучения под ваш запрос.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={onConsult}
            className="rounded-full bg-accent px-6 py-3 text-sm font-black uppercase tracking-wide text-ink transition hover:brightness-95"
          >
            Оставить заявку
          </button>
          <a
            href={`tel:${siteData.phoneTel}`}
            className="rounded-full border border-ink px-6 py-3 text-sm font-black uppercase tracking-wide text-ink transition hover:border-accent hover:text-accent"
          >
            {siteData.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
