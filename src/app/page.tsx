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
import { OrganizationInfoSection } from "@/widgets/organization-info-section";
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
        <ScheduleStrip />
        <FaqSection />
        <OrganizationInfoSection />
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
      <footer className="border-t border-wash bg-white py-6 text-sm text-muted">
        <div className="mx-auto grid max-w-screen-2xl gap-6 px-5 md:grid-cols-2 md:px-6 lg:grid-cols-3 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-subtle">Разделы</p>
            <nav aria-label="Дополнительные разделы" className="mt-2 flex flex-col gap-1.5 text-sm font-semibold text-ink">
              <a href={homeFragmentHref("instruktory")} className="transition hover:text-accent">
                Инструкторы
              </a>
              <a href={homeFragmentHref("raspisanie")} className="transition hover:text-accent">
                Расписание
              </a>
              <a href={homeFragmentHref("faq")} className="transition hover:text-accent">
                Вопросы
              </a>
              <a href={homeFragmentHref("svedeniya")} className="transition hover:text-accent">
                Сведения
              </a>
              <a href={homeFragmentHref("documents")} className="transition hover:text-accent">
                Документы
              </a>
              <Link href="/personal-data/" className="transition hover:text-accent">
                Конфиденциальность
              </Link>
            </nav>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-subtle">Документы</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
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
          </div>
          <div className="md:col-span-2 lg:col-span-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-subtle">Реквизиты</p>
            <p className="mt-2 text-[13px] font-medium leading-relaxed text-ink">{siteData.legal.fullName}</p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-subtle">{siteData.legal.requisitesNote}</p>
          </div>
        </div>
        <p className="mt-6 text-center">Официальный сайт Автошколы «Сирена». © {new Date().getFullYear()}</p>
      </footer>
      <ConsultationDialog open={consultOpen} onOpenChange={setConsultOpen} />
    </div>
  );
}
