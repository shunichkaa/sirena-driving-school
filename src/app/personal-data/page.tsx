import type { Metadata } from "next";
import Link from "next/link";
import { siteData } from "@/shared/config/site-data";

export const metadata: Metadata = {
  title: "Политика конфиденциальности — Автошкола «Сирена», Озёрск",
  description:
    "Порядок обработки персональных данных посетителей сайта и заявок на консультацию. Контакты автошколы «Сирена» в Озёрске.",
};

export default function PersonalDataPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12 md:py-16">
      <p className="text-sm text-muted">
        <Link href="/" className="font-semibold text-accent underline-offset-2 hover:underline">
          На главную
        </Link>
      </p>
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-ink md:text-4xl">
        Политика в отношении обработки персональных данных
      </h1>
      <p className="mt-4 text-[15px] leading-relaxed text-muted">
        Настоящая страница описывает общий порядок обработки персональных данных, которые вы передаёте через формы на
        сайте или по контактам {siteData.legal.fullName} ({siteData.phoneDisplay}, {siteData.email}).
      </p>
      <ul className="mt-8 list-disc space-y-3 pl-5 text-[15px] leading-relaxed text-muted">
        <li>Данные используются для связи с вами по вопросам записи на обучение и консультации.</li>
        <li>Передача третьим лицам осуществляется только в случаях, предусмотренных законодательством РФ.</li>
        <li>Вы вправе запросить уточнение, блокирование или удаление данных — направьте запрос на {siteData.email}.</li>
        <li>
          Полный комплект локальных актов и сведений о деятельности организации размещён в разделе документов на
          официальном сайте:{" "}
          <a
            href={siteData.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-accent underline underline-offset-2"
          >
            {siteData.officialUrl}
          </a>
        </li>
      </ul>
      <p className="mt-8 text-sm text-subtle">{siteData.legal.requisitesNote}</p>
    </main>
  );
}
