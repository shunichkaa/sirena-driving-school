"use client";

import { siteData } from "@/shared/config/site-data";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

type ConsultationDialogProps = {
  open: boolean;
  onOpenChangeAction: (open: boolean) => void;
};

const focusableSelector =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function ConsultationDialog({
  open,
  onOpenChangeAction,
}: ConsultationDialogProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [consent, setConsent] = useState(false);
  const [hp, setHp] = useState("");
  const [done, setDone] = useState(false);
  const [mailHref, setMailHref] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    setDone(false);
    setMailHref("");
    setConsent(false);
    setHp("");
    setPreferredDate("");
    setPreferredTime("");
  }, [open]);

  const submit = useCallback(() => {
    if (hp.trim()) return;
    if (!name.trim() || !phone.trim() || !consent) return;
    const subject = encodeURIComponent("Запись на консультацию");
    const slot =
      preferredDate.trim() || preferredTime.trim()
        ? `\nУдобная дата: ${preferredDate.trim() || "—"}\nУдобное время: ${preferredTime.trim() || "—"}`
        : "";
    const body = encodeURIComponent(
      `Имя: ${name.trim()}\nТелефон: ${phone.trim()}${slot}\n\nСообщение отправлено с лендинга.`,
    );
    const href = `mailto:${siteData.email}?subject=${subject}&body=${body}`;
    setMailHref(href);
    setDone(true);
  }, [name, phone, preferredDate, preferredTime, consent, hp]);

  useEffect(() => {
    if (!open) return;
    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    if (!panel) return;

    const getFocusableElements = () =>
      Array.from(panel.querySelectorAll<HTMLElement>(focusableSelector));

    const firstFrame = window.requestAnimationFrame(() => {
      const nodes = getFocusableElements();
      (nodes[0] ?? panel).focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onOpenChangeAction(false);
        return;
      }
      if (event.key !== "Tab") return;
      const nodes = getFocusableElements();
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
  }, [open, onOpenChangeAction]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4"
      role="presentation"
      onClick={() => onOpenChangeAction(false)}
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
          onClick={() => onOpenChangeAction(false)}
          aria-label="Закрыть"
        >
          ×
        </button>
        <h2 id="consult-title" className="text-xl font-bold text-ink">
          Запись на консультацию
        </h2>
        {!done ? (
          <>
            <p className="mt-2 text-sm text-muted">
              Заполните поля — затем откройте письмо в почтовом клиенте на {siteData.email}
            </p>
            <input
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="pointer-events-none absolute left-0 top-0 h-px w-px opacity-0"
              value={hp}
              onChange={(e) => setHp(e.target.value)}
            />
            <div className="mt-6 space-y-4">
              <label className="block text-sm font-medium text-ink">
                Имя
                <input
                  className="mt-1 min-h-12 w-full rounded-lg border border-wash bg-white px-3 py-2 text-base text-ink outline-none ring-accent focus:ring-2"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              </label>
              <label className="block text-sm font-medium text-ink">
                Телефон
                <input
                  className="mt-1 min-h-12 w-full rounded-lg border border-wash bg-white px-3 py-2 text-base text-ink outline-none ring-accent focus:ring-2"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                  inputMode="tel"
                />
              </label>
              <label className="block text-sm font-medium text-ink">
                Желаемая дата визита
                <input
                  type="date"
                  className="mt-1 min-h-12 w-full rounded-lg border border-wash bg-white px-3 py-2 text-base text-ink outline-none ring-accent focus:ring-2"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                />
              </label>
              <label className="block text-sm font-medium text-ink">
                Удобное время
                <select
                  className="mt-1 min-h-12 w-full rounded-lg border border-wash bg-white px-3 py-2 text-base text-ink outline-none ring-accent focus:ring-2"
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                >
                  <option value="">Выберите вариант</option>
                  <option value="Будни, днём (до 17:00)">Будни, днём (до 17:00)</option>
                  <option value="Будни, вечер (после 17:00)">Будни, вечер (после 17:00)</option>
                  <option value="Выходные">Выходные</option>
                  <option value="Обсудить по телефону">Обсудить по телефону</option>
                </select>
              </label>
              <label className="flex cursor-pointer gap-3 text-sm leading-snug text-muted">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 h-5 w-5 shrink-0 rounded border-wash text-accent focus:ring-accent"
                />
                <span>
                  Согласен (-на) на обработку персональных данных в соответствии с{" "}
                  <Link
                    href={`${siteData.privacyPath}/`}
                    className="font-semibold text-accent underline underline-offset-2"
                    onClick={() => onOpenChangeAction(false)}
                  >
                    политикой конфиденциальности
                  </Link>
                </span>
              </label>
            </div>
            <button
              type="button"
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-accent px-6 py-3.5 text-base font-bold text-white transition hover:bg-accentStrong disabled:cursor-not-allowed disabled:opacity-50"
              onClick={submit}
              disabled={!name.trim() || !phone.trim() || !consent}
            >
              Сформировать письмо
            </button>
          </>
        ) : (
          <div className="mt-6 space-y-4">
            <p className="text-[15px] leading-relaxed text-muted">
              Готово. Нажмите кнопку ниже — откроется почтовый клиент с заполненным письмом. Если окно не
              открылось, позвоните: {siteData.phoneDisplay}.
            </p>
            <a
              href={mailHref}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-accent px-6 py-3.5 text-base font-bold text-white transition hover:bg-accentStrong"
            >
              Открыть почту
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
