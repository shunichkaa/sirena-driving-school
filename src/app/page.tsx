"use client";

import { ConsultationDialog } from "@/features/book-consultation";
import { assetUrl, homeFragmentHref } from "@/shared/config/app-base-path";
import { siteData } from "@/shared/config/site-data";
import Link from "next/link";
import { CategoryASection } from "@/widgets/category-a-section";
import { CategoryBSection } from "@/widgets/category-b-section";
import { ContactsSection } from "@/widgets/contacts-section";
import { DocumentsSection } from "@/widgets/documents-section";
import { FaqSection } from "@/widgets/faq-section";
import { FinalCta } from "@/widgets/final-cta";
import { Header } from "@/widgets/header";
import { Hero } from "@/widgets/hero";
import { InstructorsSection } from "@/widgets/instructors-section";
import { LearningSteps } from "@/widgets/learning-steps";
import { PricingSection } from "@/widgets/pricing-section";
import { ReviewsSection } from "@/widgets/reviews-section";
import { ScheduleStrip } from "@/widgets/schedule-strip";
import { StatsBar } from "@/widgets/stats-bar";
import { useCallback, useState } from "react";

export default function Home() {
  const [consultOpen, setConsultOpen] = useState(false);
  const openConsult = useCallback(() => setConsultOpen(true), []);

  return (
    <div className="min-h-screen bg-canvas">
      <a
        href={homeFragmentHref("main-content")}
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[110] focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:font-semibold"
      >
        Перейти к основному контенту
      </a>
      <Header onOpenConsult={openConsult} />
      <main
        id="main-content"
        className="pb-[calc(5.25rem+env(safe-area-inset-bottom,0px))] md:pb-0"
      >
        <Hero onConsult={openConsult} />
        <StatsBar />
        <LearningSteps />
        <InstructorsSection />
        <CategoryASection onConsult={openConsult} />
        <CategoryBSection onConsult={openConsult} />
        <ReviewsSection />
        <PricingSection />
        <ScheduleStrip />
        <FaqSection />
        <DocumentsSection />
        <FinalCta onConsult={openConsult} />
        <ContactsSection onOpenConsult={openConsult} />
      </main>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-wash bg-white/95 px-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom,0px))] pt-2.5 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-screen-2xl gap-2">
          <a
            href={`tel:${siteData.phoneTel}`}
            className="min-h-12 flex-1 rounded-lg border-2 border-accent bg-white px-4 py-2.5 text-center text-xs font-bold uppercase tracking-wide text-accent"
          >
            Позвонить
          </a>
          <button
            type="button"
            onClick={openConsult}
            className="min-h-12 flex-1 rounded-lg bg-accent px-4 py-2.5 text-center text-xs font-bold uppercase tracking-wide text-white transition hover:bg-accentStrong"
          >
            Записаться
          </button>
        </div>
      </div>
      <footer className="border-t border-wash bg-white py-8 text-center text-sm text-muted">
        <nav
          aria-label="Дополнительные разделы"
          className="mx-auto mb-5 flex max-w-screen-2xl flex-wrap items-center justify-center gap-x-5 gap-y-2 px-5 text-xs font-semibold text-ink md:px-6 md:text-sm lg:px-8"
        >
          <a href={homeFragmentHref("instruktory")} className="transition hover:text-accent">
            Инструкторы
          </a>
          <a href={homeFragmentHref("raspisanie")} className="transition hover:text-accent">
            Расписание
          </a>
          <a href={homeFragmentHref("faq")} className="transition hover:text-accent">
            Вопросы
          </a>
          <a href={homeFragmentHref("documents")} className="transition hover:text-accent">
            Документы
          </a>
          <Link href="/personal-data/" className="transition hover:text-accent">
            Конфиденциальность
          </Link>
        </nav>
        <div className="mx-auto mb-5 flex flex-wrap items-center justify-center gap-2 px-5 md:px-6 lg:px-8">
          {siteData.footerDocLinks.map((doc) => (
            <a
              key={doc.file}
              href={assetUrl(`/docs/${encodeURIComponent(doc.file)}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-accent/40 bg-surface px-3 py-1.5 text-xs font-semibold text-accent transition hover:border-accent hover:bg-white"
            >
              {doc.label}
            </a>
          ))}
        </div>
        <p className="max-w-2xl px-5 text-center text-[13px] font-medium leading-relaxed text-ink md:px-6 lg:px-8">
          {siteData.legal.fullName}
        </p>
        <p className="mx-auto mt-2 max-w-2xl px-5 text-center text-[13px] leading-relaxed text-subtle md:px-6 lg:px-8">
          {siteData.legal.requisitesNote}
        </p>
        <p className="mt-4">Официальный сайт Автошколы «Сирена». © {new Date().getFullYear()}</p>
      </footer>
      <ConsultationDialog open={consultOpen} onOpenChange={setConsultOpen} />
    </div>
  );
}
