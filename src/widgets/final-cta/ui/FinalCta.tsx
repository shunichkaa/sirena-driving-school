"use client";

import { siteData } from "@/shared/config/site-data";

type FinalCtaProps = {
  onConsult: () => void;
};

export function FinalCta({ onConsult }: FinalCtaProps) {
  return (
    <section className="border-y border-wash bg-white py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 text-center md:px-6 lg:px-8">
        <h2 className="mx-auto max-w-3xl text-3xl font-black tracking-tight text-ink md:text-4xl">
          Начните обучение в удобном формате
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted md:text-base">
          Оставьте заявку онлайн. Мы свяжемся с вами, подберем программу и удобный график занятий.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={onConsult}
            className="rounded-full bg-accent px-6 py-3 text-sm font-black uppercase tracking-wide text-ink transition hover:brightness-95"
          >
            Записаться
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
