"use client";

import { assetUrl } from "@/shared/config/app-base-path";
import { siteData } from "@/shared/config/site-data";
import { useMemo, useState } from "react";

export function DocumentsSection() {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLocaleLowerCase("ru");

  const groupedDocuments = useMemo(() => {
    const groups = [
      { title: "Лицензии и регистрация", files: [] as string[] },
      { title: "Локальные акты и положения", files: [] as string[] },
      { title: "Обучение и образовательный процесс", files: [] as string[] },
      { title: "Прочие документы", files: [] as string[] },
    ];

    const visibleFiles = siteData.documents.filter((fileName) =>
      fileName.toLocaleLowerCase("ru").includes(normalizedQuery),
    );

    visibleFiles.forEach((fileName) => {
      const lower = fileName.toLocaleLowerCase("ru");
      if (
        lower.includes("лицензия") ||
        /егр.?юл/u.test(lower) ||
        lower.includes("реестр") ||
        lower.includes("устав") ||
        lower.includes("свид-во")
      ) {
        groups[0].files.push(fileName);
        return;
      }

      if (
        lower.includes("положение") ||
        lower.includes("правила") ||
        lower.includes("порядок") ||
        lower.includes("договор") ||
        lower.includes("комиссия")
      ) {
        groups[1].files.push(fileName);
        return;
      }

      if (
        lower.includes("учеб") ||
        lower.includes("обучение") ||
        lower.includes("стандарт") ||
        lower.includes("образователь") ||
        lower.includes("режим занят")
      ) {
        groups[2].files.push(fileName);
        return;
      }

      groups[3].files.push(fileName);
    });

    return groups.filter((group) => group.files.length > 0);
  }, [normalizedQuery]);

  return (
    <section id="documents" className="border-t border-wash bg-canvas py-12 md:py-16">
      <div className="mx-auto max-w-screen-2xl px-5 md:px-6 lg:px-8">
        <details className="rounded-2xl border border-wash bg-white p-5 shadow-card md:p-6 [&[open]_summary_.doc-chevron]:rotate-180">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-lg font-bold text-ink md:text-xl">
            <span>Юридические документы</span>
            <span className="doc-chevron text-muted transition-transform duration-300" aria-hidden>
              ▾
            </span>
          </summary>
          <div className="mt-5 border-t border-wash pt-5">
            <p className="max-w-measure text-[15px] leading-relaxed text-muted">{siteData.documentsIntro}</p>
            <div className="mt-5">
              <label htmlFor="documents-search" className="sr-only">
                Поиск документа
              </label>
              <input
                id="documents-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Поиск по названию документа"
                className="w-full rounded-xl border border-wash bg-white px-4 py-3 text-base text-ink outline-none ring-accent focus:ring-2 md:max-w-md"
              />
            </div>
            <div className="mt-6 space-y-6">
              {groupedDocuments.map((group) => (
                <section key={group.title} aria-label={group.title}>
                  <h3 className="text-base font-bold text-ink">{group.title}</h3>
                  <ul className="mt-2 grid gap-2 md:grid-cols-2">
                    {group.files.map((fileName) => (
                      <li key={fileName}>
                        <a
                          href={assetUrl(`/docs/${encodeURIComponent(fileName)}`)}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex min-h-12 items-center text-sm font-semibold text-accent underline decoration-accent/40 underline-offset-4 hover:text-accentStrong"
                        >
                          {fileName}
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
              {groupedDocuments.length === 0 ? (
                <p className="text-sm font-medium text-muted">Ничего не найдено по вашему запросу.</p>
              ) : null}
            </div>
          </div>
        </details>
      </div>
    </section>
  );
}
