"use client";

import { siteData } from "@/shared/config/site-data";
import { useCallback, useEffect, useRef, useState } from "react";

type ConsultationDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const focusableSelector =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function ConsultationDialog({
  open,
  onOpenChange,
}: ConsultationDialogProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  const submit = useCallback(() => {
    const subject = encodeURIComponent("Запись на консультацию");
    const body = encodeURIComponent(
      `Имя: ${name}\nТелефон: ${phone}\n\nСообщение отправлено с лендинга.`,
    );
    window.location.href = `mailto:${siteData.email}?subject=${subject}&body=${body}`;
  }, [name, phone]);

  useEffect(() => {
    if (!open) return;
    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    if (!panel) return;

    const focusables = () =>
      Array.from(panel.querySelectorAll<HTMLElement>(focusableSelector));

    const firstFrame = window.requestAnimationFrame(() => {
      const nodes = focusables();
      (nodes[0] ?? panel).focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onOpenChange(false);
        return;
      }
      if (event.key !== "Tab") return;
      const nodes = focusables();
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.removeEventListener("keydown", onKeyDown);
      previouslyFocusedRef.current?.focus?.();
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4"
      role="presentation"
      onClick={() => onOpenChange(false)}
    >
      <div
        ref={panelRef}
        className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl outline-none"
        role="dialog"
        aria-modal="true"
        aria-labelledby="consult-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="absolute right-4 top-4 text-2xl leading-none text-muted hover:text-ink"
          onClick={() => onOpenChange(false)}
          aria-label="Закрыть"
        >
          ×
        </button>
        <h2 id="consult-title" className="text-xl font-bold text-ink">
          Запись на консультацию
        </h2>
        <p className="mt-2 text-sm text-muted">
          Откроется почтовый клиент с заполненным письмом на {siteData.email}
        </p>
        <div className="mt-6 space-y-4">
          <label className="block text-sm font-medium text-ink">
            Имя
            <input
              className="mt-1 w-full rounded-lg border border-wash bg-white px-3 py-2 text-ink outline-none ring-accent focus:ring-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
          </label>
          <label className="block text-sm font-medium text-ink">
            Телефон
            <input
              className="mt-1 w-full rounded-lg border border-wash bg-white px-3 py-2 text-ink outline-none ring-accent focus:ring-2"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="tel"
              inputMode="tel"
            />
          </label>
        </div>
        <button
          type="button"
          className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-ink"
          onClick={submit}
        >
          Отправить на почту
        </button>
      </div>
    </div>
  );
}
