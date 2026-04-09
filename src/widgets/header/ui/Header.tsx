"use client";

import { siteData } from "@/shared/config/site-data";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: "#programma", label: "Программа" },
    { href: "#ceny", label: "Цены" },
    { href: "#otzyvy", label: "Отзывы" },
    { href: "#kontakty", label: "Контакты" },
  ];

  return (
    <motion.header
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
        className="hidden items-center gap-7 text-[11px] font-bold uppercase tracking-[0.12em] text-ink md:flex"
      >
        {links.map((l) => (
          <a key={l.href} href={l.href} className="hover:text-accent">
            {l.label}
          </a>
        ))}
        <a
          href="#kontakty"
          className="rounded-full bg-accent px-4 py-2 text-[11px] font-black uppercase tracking-[0.1em] text-ink transition hover:brightness-95"
        >
          Записаться
        </a>
      </nav>
      <button
        type="button"
        className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
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
          className="absolute left-4 right-4 top-full mt-2 flex flex-col gap-3 rounded-2xl border border-wash bg-white p-4 shadow-lg md:hidden"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-bold uppercase tracking-wide text-ink"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#kontakty"
            className="mt-1 inline-flex items-center justify-center rounded-full bg-accent px-4 py-2.5 text-sm font-black uppercase tracking-wide text-ink transition hover:brightness-95"
            onClick={() => setMenuOpen(false)}
          >
            Записаться
          </a>
        </div>
      ) : null}
    </motion.header>
  );
}
