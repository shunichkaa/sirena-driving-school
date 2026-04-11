"use client";

import { siteData } from "@/shared/config/site-data";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type HeaderProps = {
  onOpenConsult: () => void;
};

export function Header({ onOpenConsult }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const rootRef = useRef<HTMLElement>(null);

  const links = [
    { href: "#programma", label: "Программа" },
    { href: "#kategoriya-a", label: "A и B" },
    { href: "#ceny", label: "Цены" },
    { href: "#otzyvy", label: "Отзывы" },
    { href: "#kontakty", label: "Контакты" },
  ];

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      const root = rootRef.current;
      if (root && !root.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const openConsultFromMenu = () => {
    setMenuOpen(false);
    onOpenConsult();
  };

  return (
    <motion.header
      ref={rootRef}
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="relative z-50 mx-auto flex max-w-6xl items-center justify-between px-4 pb-5 pt-7 md:px-6 lg:px-8"
    >
      <Link href="/" className="select-none text-base font-black tracking-[0.08em] text-ink md:text-lg">
        <span className="text-accent">{siteData.brandYellow}</span>{" "}
        <span>{siteData.brandBlack}</span>
      </Link>
      <nav
        aria-label="Основная навигация"
        className="hidden flex-wrap items-center justify-end gap-x-4 gap-y-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-ink md:flex"
      >
        {links.map((l) => (
          <a key={l.href} href={l.href} className="hover:text-accent">
            {l.label}
          </a>
        ))}
        <button
          type="button"
          onClick={onOpenConsult}
          className="rounded-full bg-accent px-4 py-2 text-[11px] font-black uppercase tracking-[0.1em] text-ink transition hover:brightness-95"
        >
          Записаться
        </button>
      </nav>
      <button
        type="button"
        className="flex min-h-11 min-w-11 flex-col items-center justify-center gap-1.5 md:hidden"
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        aria-label="Меню"
        onClick={() => setMenuOpen((v) => !v)}
      >
        <span className="h-0.5 w-6 bg-ink" />
        <span className="h-0.5 w-6 bg-ink" />
        <span className="h-0.5 w-6 bg-ink" />
      </button>
      {menuOpen ? (
        <div
          id="mobile-menu"
          className="absolute left-4 right-4 top-full mt-2 flex max-h-[min(70vh,520px)] flex-col gap-3 overflow-y-auto rounded-2xl border border-wash bg-white p-4 shadow-lg md:hidden"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg py-2.5 text-sm font-bold uppercase tracking-wide text-ink"
              onClick={closeMenu}
            >
              {l.label}
            </a>
          ))}
          <button
            type="button"
            onClick={openConsultFromMenu}
            className="mt-1 inline-flex items-center justify-center rounded-full bg-accent px-4 py-2.5 text-sm font-black uppercase tracking-wide text-ink transition hover:brightness-95"
          >
            Записаться
          </button>
        </div>
      ) : null}
    </motion.header>
  );
}
