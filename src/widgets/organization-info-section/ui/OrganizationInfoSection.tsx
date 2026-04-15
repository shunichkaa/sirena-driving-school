"use client";

import { assetUrl } from "@/shared/config/app-base-path";
import { siteData } from "@/shared/config/site-data";

const infoRows = [
  { label: "Полное наименование", value: siteData.legal.fullName },
  { label: "Сокращённое наименование", value: "ЧУДПО «Автошкола «Сирена»»" },
  { label: "Дата создания", value: "2009 год" },
  { label: "Учредитель", value: "Сведения указаны в Уставе организации" },
  { label: "Место нахождения", value: siteData.addressLine },
  { label: "Режим работы", value: "Будни: 14:00–21:00; сб–вс — выходной" },
  {
    label: "Телефон",
    value: (
      <a href={`tel:${siteData.phoneOfficeTel}`} className="font-semibold text-accent hover:text-accentStrong">
        {siteData.phoneOfficeDisplay}
      </a>
    ),
  },
  {
    label: "E-mail",
    value: (
      <a href={`mailto:${siteData.email}`} className="font-semibold text-accent hover:text-accentStrong">
        {siteData.email}
      </a>
    ),
  },
  {
    label: "Сайт",
    value: (
      <a
        href={siteData.officialUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-accent hover:text-accentStrong"
      >
        Официальный сайт
      </a>
    ),
  },
  { label: "Реализуемые программы", value: "Профессиональное обучение водителей транспортных средств категорий A, B" },
  { label: "Форма обучения", value: "Очная" },
  { label: "Язык обучения", value: "Русский" },
  {
    label: "Лицензия",
    value: (
      <a
        href={assetUrl(`/docs/${encodeURIComponent("Лицензия.pdf")}`)}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-accent hover:text-accentStrong"
      >
        Скачать PDF
      </a>
    ),
  },
] as const;

export function OrganizationInfoSection() {
  return (
    <section id="info" className="border-t border-wash bg-surface py-14 md:py-20">
      <div className="mx-auto max-w-screen-xl px-5 md:px-6 lg:px-8">
        <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold leading-[1.2] tracking-tight text-ink">
          Сведения об образовательной организации
        </h2>
        <p className="mt-4 max-w-measure text-sm leading-relaxed text-muted">
          Информация публикуется в соответствии с требованиями ч. 2 ст. 29 Федерального закона № 273-ФЗ «Об
          образовании в Российской Федерации».
        </p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-wash bg-white">
          <table className="min-w-full border-collapse text-sm">
            <tbody>
              {infoRows.map((row) => (
                <tr key={row.label} className="border-b border-wash last:border-b-0">
                  <th className="w-[36%] bg-surface px-4 py-3 text-left font-medium text-muted">{row.label}</th>
                  <td className="px-4 py-3 text-ink">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Подробные сведения, включая финансово-хозяйственную деятельность и вакантные места, опубликованы в разделах
          «Сведения» и «Документы» на этом сайте.
        </p>
      </div>
    </section>
  );
}
