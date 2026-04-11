"use client";

import { siteData } from "@/shared/config/site-data";
import { motion } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

type HeaderProps = {
  onOpenConsult: () => void;
};

const sectionIds = ["programma", "instruktory", "kategoriya-a", "ceny", "otzyvy", "kontakty"] as const;

export function Header({ onOpenConsult }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  const links = [
    { href: "#programma", label: "Программа" },
    { href: "#instruktory", label: "Инструкторы" },
    { href: "#kategoriya-a", label: "A и B" },
    { href: "#ceny", label: "Цены" },
    { href: "#otzyvy", label: "Отзывы" },
    { href: "#kontakty", label: "Контакты" },
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

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const openConsultFromMenu = () => {
    setMenuOpen(false);
    onOpenConsult();
  };

  const linkClass = (href: string) => {
    const id = href.slice(1);
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
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 md:px-6 lg:px-8">
          <Link href="/" className="flex h-9 max-h-9 shrink-0 items-center gap-2 select-none">
            <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden className="shrink-0">
              <circle cx="16" cy="16" r="16" fill="#1A56DB" />
              <text
                x="16"
                y="21"
                textAnchor="middle"
                fill="#ffffff"
                fontSize="15"
                fontWeight="700"
                fontFamily="system-ui, sans-serif"
              >
                С
              </text>
            </svg>
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="text-[10px] font-medium uppercase tracking-wide text-muted">{siteData.brandLine}</span>
              <span className="truncate text-sm font-bold text-ink">{siteData.brandShort}</span>
            </span>
          </Link>
          <nav
            aria-label="Основная навигация"
            className="hidden items-center gap-5 text-[11px] font-semibold uppercase tracking-wide md:flex lg:gap-6"
          >
            {links.map((l) => (
              <a key={l.href} href={l.href} className={`transition ${linkClass(l.href)}`}>
                {l.label}
              </a>
            ))}
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
          <div className="flex items-center gap-2 md:hidden">
            <a
              href={`tel:${siteData.phoneTel}`}
              className="min-h-12 min-w-12 shrink-0 rounded-lg border border-wash bg-white px-2 text-center text-[10px] font-bold leading-tight text-accent"
            >
              <span className="mt-2 block text-lg leading-none" aria-hidden>
                ☎
              </span>
              <span className="sr-only">Позвонить {siteData.phoneDisplay}</span>
            </a>
            <button
              type="button"
              className="relative flex min-h-12 min-w-12 items-center justify-center rounded-lg border border-wash bg-white"
              aria-expanded={menuOpen}
              aria-controls="mobile-drawer"
              aria-label={menuOpen ? "Закрыть меню" : "Меню"}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span
                className={`absolute h-0.5 w-5 bg-ink transition ${
                  menuOpen ? "translate-y-0 rotate-45" : "-translate-y-1.5"
                }`}
              />
              <span className={`absolute h-0.5 w-5 bg-ink transition ${menuOpen ? "scale-0 opacity-0" : ""}`} />
              <span
                className={`absolute h-0.5 w-5 bg-ink transition ${
                  menuOpen ? "translate-y-0 -rotate-45" : "translate-y-1.5"
                }`}
              />
            </button>
          </div>
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
        className={`fixed inset-y-0 right-0 z-[70] flex w-[min(100%,20rem)] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out md:hidden ${
          menuOpen ? "pointer-events-auto translate-x-0" : "pointer-events-none translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-wash px-4 py-5">
          <a
            href={`tel:${siteData.phoneTel}`}
            className="flex min-h-12 items-center gap-3 rounded-lg bg-surface px-3 py-3 text-accent"
            onClick={closeMenu}
          >
            <span className="text-2xl" aria-hidden>
              ☎
            </span>
            <span className="text-base font-bold">{siteData.phoneDisplay}</span>
          </a>
        </div>
        <nav aria-label="Мобильное меню" className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`min-h-12 rounded-lg px-3 py-3 text-sm font-semibold uppercase tracking-wide transition ${
                activeSection === l.href.slice(1) ? "bg-surface text-accent" : "text-ink hover:bg-surface"
              }`}
              onClick={closeMenu}
            >
              {l.label}
            </a>
          ))}
          <button
            type="button"
            onClick={openConsultFromMenu}
            className="mt-3 min-h-12 rounded-lg bg-accent px-3 py-3 text-center text-sm font-bold uppercase tracking-wide text-white transition hover:bg-accentStrong"
          >
            Записаться
          </button>
        </nav>
      </div>
    </div>
  );
}
