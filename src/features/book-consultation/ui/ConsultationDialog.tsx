"use client";

import { siteData } from "@/shared/config/site-data";
import { useCallback, useEffect, useState } from "react";

type ConsultationDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ConsultationDialog({
  open,
  onOpenChange,
}: ConsultationDialogProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const submit = useCallback(() => {
    const subject = encodeURIComponent("Запись на консультацию");
    const body = encodeURIComponent(
      `Имя: ${name}\nТелефон: ${phone}\n\nСообщение отправлено с лендинга.`,
    );
    window.location.href = `mailto:${siteData.email}?subject=${subject}&body=${body}`;
  }, [name, phone]);

  useEffect(() => {
    if (!open) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    };
    window.addEventListener("keydown", onEscape);
    return () => {
      window.removeEventListener("keydown", onEscape);
    };
  }, [onOpenChange, open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4"
      role="presentation"
      onClick={() => onOpenChange(false)}
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="consult-title"
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
