"use client";

import { assetUrl, fragmentIdFromHref, homeFragmentHref } from "@/shared/config/app-base-path";
import { siteData } from "@/shared/config/site-data";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

type HeaderProps = {
  onOpenConsult: () => void;
};

const sectionIds = ["programma", "instruktory", "kategoriya-a", "otzyvy", "svedeniya", "kontakty"] as const;

function IconMenu({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 7h14M5 12h14M5 17h10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconClose({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconPhone({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconChevron({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconEye({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function Header({ onOpenConsult }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [lowVisionMode, setLowVisionMode] = useState(false);

  const links = [
    { href: homeFragmentHref("programma"), label: "Программа" },
    { href: homeFragmentHref("instruktory"), label: "Инструкторы" },
    { href: homeFragmentHref("kategoriya-a"), label: "Категории" },
    { href: homeFragmentHref("otzyvy"), label: "Отзывы" },
    { href: homeFragmentHref("svedeniya"), label: "Сведения" },
    { href: homeFragmentHref("kontakty"), label: "Контакты" },
  ] as const;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const nodes = sectionIds
      .map((id) => document.getElementById(id))
      .filter((n): n is HTMLElement => Boolean(n));
    if (nodes.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top);
        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-18% 0px -50% 0px", threshold: [0, 0.12, 0.25] },
    );
    nodes.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const stored = window.localStorage.getItem("lowVisionMode");
    if (stored === "1") {
      setLowVisionMode(true);
    }
  }, []);

  useEffect(() => {
    if (lowVisionMode) {
      document.documentElement.setAttribute("data-vision", "low");
      window.localStorage.setItem("lowVisionMode", "1");
      return;
    }
    document.documentElement.removeAttribute("data-vision");
    window.localStorage.setItem("lowVisionMode", "0");
  }, [lowVisionMode]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const openConsultFromMenu = () => {
    setMenuOpen(false);
    onOpenConsult();
  };

  const toggleLowVisionMode = () => {
    setLowVisionMode((value) => !value);
  };

  const linkClass = (href: string) => {
    const id = fragmentIdFromHref(href);
    const active = activeSection === id;
    return active ? "text-accent" : "text-muted hover:text-accent";
  };

  return (
    <div className="sticky top-0 z-50">
      <motion.header
        animate={{
          paddingTop: scrolled ? 8 : 20,
          paddingBottom: scrolled ? 8 : 20,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={`border-b border-transparent ${
          scrolled ? "border-wash bg-white/92 shadow-sm backdrop-blur-md" : "bg-surface/90 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-2 px-5 sm:gap-3 md:px-6 lg:px-8">
          <button
            type="button"
            className="relative order-1 flex min-h-14 min-w-14 shrink-0 items-center justify-center rounded-xl border border-wash/80 bg-white text-ink shadow-sm transition hover:border-accent/40 hover:text-accent md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-drawer"
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span
              className={`absolute inset-0 flex items-center justify-center transition duration-200 ${
                menuOpen ? "scale-90 opacity-0" : "scale-100 opacity-100"
              }`}
            >
              <IconMenu />
            </span>
            <span
              className={`absolute inset-0 flex items-center justify-center transition duration-200 ${
                menuOpen ? "scale-100 opacity-100" : "scale-90 opacity-0"
              }`}
            >
              <IconClose />
            </span>
          </button>
          <Link
            href="/"
            className="relative order-2 flex min-h-14 min-w-0 flex-1 items-center justify-center md:order-1 md:h-16 md:max-h-16 md:flex-none md:justify-start md:max-w-[min(100%,32rem)] lg:min-h-20 lg:max-h-20 lg:max-w-[min(100%,40rem)]"
          >
            <Image
              src={assetUrl("/logo-sirena.png")}
              alt="Автошкола «Сирена»"
              width={657}
              height={239}
              className="h-14 w-auto max-w-full object-contain md:h-16 lg:h-20"
              priority
              unoptimized
            />
          </Link>
          <nav
            aria-label="Основная навигация"
            className="order-3 hidden items-center gap-5 text-[11px] font-semibold uppercase tracking-wide md:flex lg:gap-6"
          >
            {links.map((l) => (
              <a key={l.href} href={l.href} className={`transition ${linkClass(l.href)}`}>
                {l.label}
              </a>
            ))}
            <button
              type="button"
              onClick={toggleLowVisionMode}
              aria-pressed={lowVisionMode}
              className="inline-flex items-center gap-1.5 rounded-lg border border-wash px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-ink transition hover:border-accent hover:text-accent"
            >
              <IconEye className="h-3.5 w-3.5" />
              {lowVisionMode ? "Обычная версия" : "Версия для слабовидящих"}
            </button>
            <a
              href={`tel:${siteData.phoneTel}`}
              className="text-sm font-bold normal-case tracking-normal text-accent transition hover:text-accentStrong"
            >
              {siteData.phoneDisplay}
            </a>
            <button
              type="button"
              onClick={onOpenConsult}
              className="rounded-lg bg-accent px-4 py-2.5 text-[11px] font-bold uppercase tracking-wide text-white transition hover:scale-[1.02] hover:bg-accentStrong active:scale-100"
            >
              Записаться
            </button>
          </nav>
          <a
            href={`tel:${siteData.phoneTel}`}
            className="order-3 flex min-h-14 min-w-14 shrink-0 items-center justify-center rounded-xl border border-wash/80 bg-white text-accent shadow-sm transition hover:border-accent/40 hover:bg-surface md:hidden"
          >
            <IconPhone className="h-[22px] w-[22px]" />
            <span className="sr-only">Позвонить {siteData.phoneDisplay}</span>
          </a>
        </div>
      </motion.header>
      <div
        role="presentation"
        className={`fixed inset-0 z-[60] bg-black/35 transition-opacity duration-300 md:hidden ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!menuOpen}
        onClick={closeMenu}
      />
      <div
        id="mobile-drawer"
        className={`fixed inset-y-0 left-0 z-[70] flex w-[min(100%,20rem)] flex-col border-r border-wash bg-white shadow-[8px_0_32px_rgba(17,24,39,0.12)] transition-transform duration-300 ease-out md:hidden ${
          menuOpen ? "pointer-events-auto translate-x-0" : "pointer-events-none -translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-wash px-4 py-4">
          <span className="text-xs font-bold uppercase tracking-[0.12em] text-muted">Меню</span>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-muted transition hover:bg-surface hover:text-ink"
            aria-label="Закрыть меню"
            onClick={closeMenu}
          >
            <IconClose />
          </button>
        </div>
        <div className="border-b border-wash px-4 py-4">
          <button
            type="button"
            onClick={toggleLowVisionMode}
            aria-pressed={lowVisionMode}
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-wash bg-surface px-4 py-3 text-sm font-bold text-ink transition hover:border-accent hover:text-accent"
          >
            <IconEye className="h-4 w-4" />
            {lowVisionMode ? "Обычная версия" : "Версия для слабовидящих"}
          </button>
        </div>
        <div className="border-b border-wash px-4 py-4">
          <a
            href={`tel:${siteData.phoneTel}`}
            className="flex min-h-12 items-center gap-3 rounded-xl bg-surface px-4 py-3 text-accent transition hover:bg-wash/80"
            onClick={closeMenu}
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-accent shadow-sm">
              <IconPhone className="h-5 w-5" />
            </span>
            <span className="text-base font-bold leading-tight">{siteData.phoneDisplay}</span>
          </a>
        </div>
        <nav aria-label="Мобильное меню" className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-3 py-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`flex min-h-12 items-center justify-between gap-2 rounded-xl px-3 py-3 text-sm font-semibold uppercase tracking-wide transition ${
                activeSection === fragmentIdFromHref(l.href)
                  ? "bg-surface text-accent"
                  : "text-ink hover:bg-surface/80"
              }`}
              onClick={closeMenu}
            >
              <span>{l.label}</span>
              <IconChevron className="shrink-0 text-subtle" />
            </a>
          ))}
          <button
            type="button"
            onClick={openConsultFromMenu}
            className="mt-4 min-h-12 rounded-xl bg-accent px-4 py-3 text-center text-sm font-bold uppercase tracking-wide text-white transition hover:bg-accentStrong"
          >
            Записаться
          </button>
        </nav>
      </div>
    </div>
  );
}
