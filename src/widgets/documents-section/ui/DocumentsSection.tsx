"use client";

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
        lower.includes("лиценз") ||
        lower.includes("егрюл") ||
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
        lower.includes("коммисия")
      ) {
        groups[1].files.push(fileName);
        return;
      }

      if (
        lower.includes("учеб") ||
        lower.includes("обуч") ||
        lower.includes("стандарт") ||
        lower.includes("образоват") ||
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
    <section id="documents" className="py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <h2 className="text-[2rem] font-black tracking-tight text-ink md:text-4xl">Документы</h2>
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
            className="w-full rounded-xl border border-wash bg-white px-4 py-3 text-sm text-ink outline-none ring-accent focus:ring-2 md:max-w-md"
          />
        </div>
        <div className="mt-6 space-y-6">
          {groupedDocuments.map((group) => (
            <section key={group.title} aria-label={group.title}>
              <h3 className="text-lg font-black text-ink">{group.title}</h3>
              <ul className="mt-2 grid gap-2 md:grid-cols-2">
                {group.files.map((fileName) => (
                  <li key={fileName}>
                    <a
                      href={`docs/${encodeURIComponent(fileName)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-11 items-center text-sm font-semibold text-ink underline decoration-accent underline-offset-4 hover:text-accent"
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
    </section>
  );
}
