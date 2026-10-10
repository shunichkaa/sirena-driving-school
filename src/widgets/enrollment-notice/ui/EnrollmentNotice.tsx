"use client";

import { siteData } from "@/shared/config/site-data";
import { useCallback, useEffect, useRef, useState } from "react";

const storageKey = "enrollment-notice-seen";

export function EnrollmentNotice() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem(storageKey)) return;
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    sessionStorage.setItem(storageKey, "1");
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = window.requestAnimationFrame(() => {
      panelRef.current?.focus();
    });
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.cancelAnimationFrame(frame);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4"
      role="presentation"
      onClick={close}
    >
      <div
        ref={panelRef}
        className="relative w-full max-w-xl rounded-2xl border-4 border-[#B42318] bg-white px-8 pb-8 pt-7 shadow-2xl outline-none"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="enrollment-notice-title"
        aria-describedby="enrollment-notice-text"
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="absolute right-4 top-3 text-3xl leading-none text-[#B42318] hover:text-[#8E1C13]"
          onClick={close}
          aria-label="Закрыть"
        >
          ×
        </button>
        <h2 id="enrollment-notice-title" className="pr-8 text-[clamp(1.75rem,4vw,2.25rem)] font-bold leading-tight text-[#B42318]">
          {siteData.enrollmentNotice.title}
        </h2>
        <p id="enrollment-notice-text" className="mt-4 text-lg leading-relaxed text-ink md:text-xl">
          {siteData.enrollmentNotice.text}
        </p>
        <button
          type="button"
          className="mt-7 inline-flex min-h-14 w-full items-center justify-center rounded-lg bg-[#B42318] px-6 py-4 text-lg font-bold text-white transition hover:bg-[#8E1C13]"
          onClick={close}
        >
          Понятно
        </button>
      </div>
    </div>
  );
}
