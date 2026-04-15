"use client";

import { ConsultationButton } from "@/features/book-consultation";
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

export function HomePageContent() {
  return (
    <div className="min-h-screen bg-canvas">
      <a
        href={homeFragmentHref("main-content")}
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[110] focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:font-semibold"
      >
        Перейти к основному контенту
      </a>
      <Header />
      <main
        id="main-content"
        className="pb-[calc(5.25rem+env(safe-area-inset-bottom,0px))] md:pb-0"
      >
        <Hero />
        <StatsBar />
        <LearningSteps />
        <InstructorsSection />
        <CategoryASection />
        <CategoryBSection />
        <ReviewsSection />
        <ScheduleStrip />
        <FaqSection />
        <OrganizationInfoSection />
        <DocumentsSection />
        <FinalCta />
        <ContactsSection />
      </main>
      <nav
        aria-label="Быстрые действия"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-wash bg-white/95 px-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom,0px))] pt-2.5 backdrop-blur md:hidden"
      >
        <div className="mx-auto flex max-w-screen-2xl gap-2">
          <a
            href={`tel:${siteData.phoneTel}`}
            className="min-h-12 flex-1 rounded-lg border-2 border-accent bg-white px-4 py-2.5 text-center text-xs font-bold uppercase tracking-wide text-accent"
          >
            Позвонить
          </a>
          <ConsultationButton className="min-h-12 flex-1 rounded-lg bg-accent px-4 py-2.5 text-center text-xs font-bold uppercase tracking-wide text-white transition hover:bg-accentStrong">
            Записаться
          </ConsultationButton>
        </div>
      </nav>
      <footer className="border-t border-wash bg-white py-6 text-sm text-muted">
        <h2 className="sr-only">Навигация и реквизиты</h2>
        <div className="mx-auto grid max-w-screen-2xl gap-6 px-5 md:grid-cols-2 md:px-6 lg:grid-cols-3 lg:px-8">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-subtle">Разделы</h3>
            <nav aria-label="Дополнительные разделы" className="mt-2 flex flex-col gap-1.5 text-sm font-semibold text-ink">
              <ul className="flex list-none flex-col gap-1.5 p-0">
                <li>
                  <a href={homeFragmentHref("instructors")} className="transition hover:text-accent">
                    Инструкторы
                  </a>
                </li>
                <li>
                  <a href={homeFragmentHref("schedule")} className="transition hover:text-accent">
                    Расписание
                  </a>
                </li>
                <li>
                  <a href={homeFragmentHref("faq")} className="transition hover:text-accent">
                    Вопросы
                  </a>
                </li>
                <li>
                  <a href={homeFragmentHref("info")} className="transition hover:text-accent">
                    Сведения
                  </a>
                </li>
                <li>
                  <a href={homeFragmentHref("documents")} className="transition hover:text-accent">
                    Документы
                  </a>
                </li>
                <li>
                  <Link href="/personal-data/" className="transition hover:text-accent">
                    Конфиденциальность
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-subtle">Документы</h3>
            <ul className="mt-2 flex list-none flex-wrap gap-1.5 p-0">
              {siteData.footerDocLinks.map((doc) => (
                <li key={doc.file}>
                  <a
                    href={assetUrl(`/docs/${encodeURIComponent(doc.file)}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-accent/40 bg-surface px-3 py-1.5 text-xs font-semibold text-accent transition hover:border-accent hover:bg-white"
                  >
                    {doc.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-subtle">Реквизиты</h3>
            <p className="mt-2 text-[13px] font-medium leading-relaxed text-ink">{siteData.legal.fullName}</p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-subtle">{siteData.legal.requisitesNote}</p>
          </div>
        </div>
        <p className="mt-6 text-center">Официальный сайт Автошколы «Сирена». © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
