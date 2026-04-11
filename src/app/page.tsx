"use client";

import { ConsultationDialog } from "@/features/book-consultation";
import { siteData } from "@/shared/config/site-data";
import { Header } from "@/widgets/header";
import { Hero } from "@/widgets/hero";
import { PricingSection } from "@/widgets/pricing-section";
import { StatsBar } from "@/widgets/stats-bar";
import dynamic from "next/dynamic";
import { useCallback, useState } from "react";

const CategoryASectionDynamic = dynamic(() =>
  import("@/widgets/category-a-section").then((m) => m.CategoryASection),
);
const CategoryBSectionDynamic = dynamic(() =>
  import("@/widgets/category-b-section").then((m) => m.CategoryBSection),
);
const ContactsSectionDynamic = dynamic(() =>
  import("@/widgets/contacts-section").then((module) => module.ContactsSection),
);
const DocumentsSectionDynamic = dynamic(() =>
  import("@/widgets/documents-section").then((m) => m.DocumentsSection),
);
const FaqSectionDynamic = dynamic(() =>
  import("@/widgets/faq-section").then((m) => m.FaqSection),
);
const FinalCtaDynamic = dynamic(() =>
  import("@/widgets/final-cta").then((m) => m.FinalCta),
);
const LearningStepsDynamic = dynamic(() =>
  import("@/widgets/learning-steps").then((module) => module.LearningSteps),
);
const ReviewsSectionDynamic = dynamic(() =>
  import("@/widgets/reviews-section").then((module) => module.ReviewsSection),
);
const ScheduleStripDynamic = dynamic(() =>
  import("@/widgets/schedule-strip").then((m) => m.ScheduleStrip),
);

export default function Home() {
  const [consultOpen, setConsultOpen] = useState(false);
  const openConsult = useCallback(() => setConsultOpen(true), []);

  return (
    <div className="min-h-screen bg-canvas">
      <a
        href="#main-content"
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
        <LearningStepsDynamic />
        <CategoryASectionDynamic onConsult={openConsult} />
        <CategoryBSectionDynamic onConsult={openConsult} />
        <ReviewsSectionDynamic />
        <PricingSection />
        <ScheduleStripDynamic />
        <FaqSectionDynamic />
        <DocumentsSectionDynamic />
        <FinalCtaDynamic onConsult={openConsult} />
        <ContactsSectionDynamic onOpenConsult={openConsult} />
      </main>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-wash bg-white/95 px-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom,0px))] pt-2.5 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-6xl gap-2">
          <a
            href={`tel:${siteData.phoneTel}`}
            className="flex-1 rounded-full border border-ink px-4 py-2.5 text-center text-xs font-black uppercase tracking-wide text-ink"
          >
            Позвонить
          </a>
          <button
            type="button"
            onClick={openConsult}
            className="flex-1 rounded-full bg-accent px-4 py-2.5 text-center text-xs font-black uppercase tracking-wide text-ink"
          >
            Записаться
          </button>
        </div>
      </div>
      <footer className="border-t border-wash bg-white py-8 text-center text-sm text-muted">
        <nav
          aria-label="Дополнительные разделы"
          className="mx-auto mb-5 flex max-w-6xl flex-wrap items-center justify-center gap-x-5 gap-y-2 px-4 text-xs font-semibold text-ink md:text-sm"
        >
          <a href="#raspisanie" className="transition hover:text-accent">
            Расписание
          </a>
          <a href="#faq" className="transition hover:text-accent">
            Вопросы
          </a>
          <a href="#documents" className="transition hover:text-accent">
            Документы
          </a>
        </nav>
        <p>Официальный сайт Автошколы «Сирена».</p>
      </footer>
      <ConsultationDialog open={consultOpen} onOpenChange={setConsultOpen} />
    </div>
  );
}
