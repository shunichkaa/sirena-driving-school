"use client";

import { ConsultationButton } from "@/features/book-consultation";
import { assetUrl, homeFragmentHref } from "@/shared/config/app-base-path";
import { siteData } from "@/shared/config/site-data";
import Link from "next/link";
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
      <main id="main-content">
        <Hero />
        <StatsBar />
        <LearningSteps />
        <InstructorsSection />
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
            className="inline-flex min-h-12 flex-1 items-center justify-center rounded-lg border-2 border-accent bg-white px-4 py-2.5 text-center text-xs font-bold uppercase tracking-wide text-accent"
          >
            Позвонить
          </a>
          <ConsultationButton className="min-h-12 flex-1 rounded-lg bg-accent px-4 py-2.5 text-center text-xs font-bold uppercase tracking-wide text-white transition hover:bg-accentStrong">
            Записаться
          </ConsultationButton>
        </div>
      </nav>
      <footer className="border-t border-wash bg-surface pt-10 pb-[calc(6.5rem+env(safe-area-inset-bottom,0px))] text-sm text-muted md:py-12 md:pb-12">
        <h2 className="sr-only">Навигация и реквизиты</h2>
        <div className="mx-auto grid max-w-[1240px] gap-8 px-6 md:grid-cols-2 md:px-8 lg:grid-cols-3 lg:gap-12">
          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.14em] text-subtle">Разделы</h3>
            <nav aria-label="Дополнительные разделы" className="mt-4">
              <ul className="grid list-none grid-cols-2 gap-x-4 gap-y-2 p-0 text-[11px] font-semibold uppercase leading-snug tracking-wide text-muted md:flex md:flex-col md:gap-2.5">
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
                    Юр. документы
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
            <h3 className="text-xs font-medium uppercase tracking-[0.14em] text-subtle">Юр. документы</h3>
            <ul className="mt-4 flex list-none flex-col gap-2 p-0 text-[11px] font-semibold uppercase leading-snug tracking-wide text-muted md:gap-2.5">
              {siteData.footerDocLinks.map((doc) => (
                <li key={"file" in doc ? doc.file : "href" in doc ? doc.href : doc.fragment}>
                  <a
                    href={
                      "file" in doc
                        ? assetUrl(`/docs/${encodeURIComponent(doc.file)}`)
                        : "href" in doc
                          ? doc.href
                          : homeFragmentHref(doc.fragment)
                    }
                    {...("file" in doc || "href" in doc ? { target: "_blank" as const, rel: "noopener noreferrer" as const } : {})}
                    className="transition hover:text-accent"
                  >
                    {doc.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="text-xs font-medium uppercase tracking-[0.14em] text-subtle">Реквизиты</h3>
            <p className="mt-4 text-lg font-semibold leading-snug text-ink md:text-[clamp(1.2rem,1.55vw,1.85rem)] md:leading-[1.18] lg:text-[clamp(1.3rem,1.7vw,1.95rem)]">
              {siteData.legal.fullName}
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-subtle">{siteData.legal.requisitesNote}</p>
            <ul className="mt-5 flex list-none flex-col gap-2.5 p-0 text-[15px] leading-snug text-ink">
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 text-muted" aria-hidden>
                  <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                    <path d="M10 1.75a6.5 6.5 0 0 0-6.5 6.5c0 4.772 5.302 9.373 6.04 10a.7.7 0 0 0 .92 0c.739-.627 6.04-5.228 6.04-10a6.5 6.5 0 0 0-6.5-6.5Zm0 8.75a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5Z" />
                  </svg>
                </span>
                <span>{siteData.addressLine}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 text-muted" aria-hidden>
                  <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                    <path d="M4.75 2.75A2.75 2.75 0 0 0 2 5.5c0 6.351 5.149 11.5 11.5 11.5a2.75 2.75 0 0 0 2.75-2.75V12.9c0-.58-.47-1.05-1.05-1.05h-2.39a1.05 1.05 0 0 0-.94.58l-.55 1.1a.55.55 0 0 1-.63.29A9.12 9.12 0 0 1 6.18 9.3a.55.55 0 0 1 .29-.63l1.1-.55c.36-.18.58-.55.58-.94V4.8c0-.58-.47-1.05-1.05-1.05H4.75Z" />
                  </svg>
                </span>
                <a href={`tel:${siteData.phoneTel}`} className="font-semibold text-accent transition hover:text-accentStrong">
                  {siteData.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-[1240px] border-t border-wash pt-5">
          <div className="flex flex-col gap-2 px-6 text-left text-sm md:flex-row md:items-center md:justify-between md:px-0 md:text-[15px]">
            <p className="text-muted md:text-subtle">© {new Date().getFullYear()} ЧУДПО «Сирена». Все права защищены.</p>
            <p className="text-muted md:text-subtle">
              Разработка:{" "}
              <a
                href="https://github.com/shunichkaa"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-accent"
              >
                Александра Матье
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
