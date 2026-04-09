"use client";

import { ConsultationDialog } from "@/features/book-consultation";
import { Header } from "@/widgets/header";
import { Hero } from "@/widgets/hero";
import { StatsBar } from "@/widgets/stats-bar";
import { siteData } from "@/shared/config/site-data";
import dynamic from "next/dynamic";
import { useState } from "react";

const CategoryBSection = dynamic(() =>
  import("@/widgets/category-b-section").then((module) => module.CategoryBSection),
);
const CategoryASection = dynamic(() =>
  import("@/widgets/category-a-section").then((module) => module.CategoryASection),
);
const PricingSection = dynamic(() =>
  import("@/widgets/pricing-section").then((module) => module.PricingSection),
);
const LearningSteps = dynamic(() =>
  import("@/widgets/learning-steps").then((module) => module.LearningSteps),
);
const ReviewsSection = dynamic(() =>
  import("@/widgets/reviews-section").then((module) => module.ReviewsSection),
);
const FaqSection = dynamic(() =>
  import("@/widgets/faq-section").then((module) => module.FaqSection),
);
const DocumentsSection = dynamic(() =>
  import("@/widgets/documents-section").then((module) => module.DocumentsSection),
);
const ScheduleStrip = dynamic(() =>
  import("@/widgets/schedule-strip").then((module) => module.ScheduleStrip),
);
const FinalCta = dynamic(() =>
  import("@/widgets/final-cta").then((module) => module.FinalCta),
);
const ContactsSection = dynamic(() =>
  import("@/widgets/contacts-section").then((module) => module.ContactsSection),
);

export function LandingPage() {
  const [consultOpen, setConsultOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[110] focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:font-semibold"
      >
        Перейти к основному контенту
      </a>
      <Header />
      <main id="main-content" className="pb-20 md:pb-0">
        <Hero onConsult={() => setConsultOpen(true)} />
        <StatsBar />
        <CategoryBSection onConsult={() => setConsultOpen(true)} />
        <CategoryASection onConsult={() => setConsultOpen(true)} />
        <PricingSection onConsult={() => setConsultOpen(true)} />
        <LearningSteps />
        <ReviewsSection />
        <FaqSection />
        <DocumentsSection />
        <ScheduleStrip />
        <FinalCta onConsult={() => setConsultOpen(true)} />
        <ContactsSection onOpenConsult={() => setConsultOpen(true)} />
      </main>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-wash bg-white/95 p-2.5 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-6xl gap-2">
          <a
            href={`tel:${siteData.phoneTel}`}
            className="flex-1 rounded-full border border-ink px-4 py-2.5 text-center text-xs font-black uppercase tracking-wide text-ink"
          >
            Позвонить
          </a>
          <button
            type="button"
            onClick={() => setConsultOpen(true)}
            className="flex-1 rounded-full bg-accent px-4 py-2.5 text-center text-xs font-black uppercase tracking-wide text-ink"
          >
            Записаться
          </button>
        </div>
      </div>
      <footer className="border-t border-wash py-8 text-center text-sm text-muted">
        <p>Официальный сайт Автошколы «Сирена».</p>
      </footer>
      <ConsultationDialog open={consultOpen} onOpenChange={setConsultOpen} />
    </div>
  );
}
