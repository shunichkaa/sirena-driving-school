"use client";

import { ConsultationButton } from "@/features/book-consultation";
import { siteData } from "@/shared/config/site-data";

export function FinalCta() {
  return (
    <section className="border-y border-wash bg-white py-14 md:py-20">
      <div className="mx-auto max-w-screen-2xl px-5 text-center md:px-6 lg:px-8">
        <h2 className="mx-auto max-w-3xl text-3xl font-black tracking-tight text-ink md:text-4xl">
          Начните обучение в удобном формате
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted md:text-base">
          Оставьте заявку онлайн. Мы свяжемся с вами, подберем программу и удобный график занятий.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <ConsultationButton className="min-h-12 rounded-lg bg-accent px-8 py-3.5 text-base font-bold text-white transition hover:scale-[1.02] hover:bg-accentStrong active:scale-100">
            Перезвоните мне
          </ConsultationButton>
          <a
            href={`tel:${siteData.phoneTel}`}
            className="min-h-12 rounded-lg border-2 border-accent bg-white px-8 py-3.5 text-base font-bold text-accent transition hover:bg-surface"
          >
            {siteData.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
