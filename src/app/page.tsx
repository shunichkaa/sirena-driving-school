"use client";

import { ConsultationDialog } from "@/features/book-consultation";
import { siteData } from "@/shared/config/site-data";
import { Header } from "@/widgets/header";
import { Hero } from "@/widgets/hero";
import { PricingSection } from "@/widgets/pricing-section";
import { StatsBar } from "@/widgets/stats-bar";
import dynamic from "next/dynamic";
import { useState } from "react";

const ContactsSectionDynamic = dynamic(() =>
  import("@/widgets/contacts-section").then((module) => module.ContactsSection),
);
const LearningStepsDynamic = dynamic(() =>
  import("@/widgets/learning-steps").then((module) => module.LearningSteps),
);
const ReviewsSectionDynamic = dynamic(() =>
  import("@/widgets/reviews-section").then((module) => module.ReviewsSection),
);

export default function Home() {
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
        <LearningStepsDynamic />
        <ReviewsSectionDynamic />
        <PricingSection />
        <ContactsSectionDynamic onOpenConsult={() => setConsultOpen(true)} />
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
