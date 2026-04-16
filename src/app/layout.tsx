import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import { appBasePath, assetUrl } from "@/shared/config/app-base-path";
import { siteData } from "@/shared/config/site-data";
import "./globals.css";

const faviconPath = `${appBasePath}/favicon-48x48.png`;

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const canonicalBase = siteData.officialUrl.replace(/\/$/, "");
const ogImageUrl = `${canonicalBase}${assetUrl("/photos/hero-traffic.png")}`;

const ogDescription =
  "Автошкола «Сирена», Озёрск: права категории B от 54 000 ₽. Теория и практика, рассрочка без переплат, лицензия. Запись по телефону и онлайн.";

export const metadata: Metadata = {
  metadataBase: new URL(canonicalBase),
  title: "Автошкола Сирена — Озёрск, права категории B | обучение вождению",
  description:
    "ЧУДПО «Автошкола «Сирена»», Озёрск: категория B от 54 000 ₽. Теория, практика, рассрочка без переплат. Офис на Октябрьской: будни 14–21, выходной сб–вс. Запись: +79222362114.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: faviconPath,
  },
  openGraph: {
    title: "Автошкола «Сирена» — Озёрск, категория B",
    description: ogDescription,
    locale: "ru_RU",
    type: "website",
    url: canonicalBase,
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 800,
        alt: "Автошкола Сирена Озёрск: учебная площадка и автомобиль",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Автошкола «Сирена» — Озёрск",
    description: ogDescription,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const localBusinessJson = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "EducationalOrganization"],
  name: "Автошкола «Сирена»",
  legalName: siteData.legal.fullName,
  description: "Обучение вождению по категории B в Озёрске.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. Октябрьская, д. 7, оф. 316",
    addressLocality: "Озёрск",
    addressRegion: "Челябинская область",
    addressCountry: "RU",
  },
  telephone: [siteData.phoneTel, siteData.phoneOfficeTel],
  email: siteData.email,
  url: canonicalBase,
  geo: {
    "@type": "GeoCoordinates",
    latitude: 55.7632,
    longitude: 60.7076,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "14:00",
      closes: "21:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: siteData.yandexRating.score,
    ratingCount: siteData.yandexRating.reviewCount,
    bestRating: "5",
    worstRating: "1",
  },
};

const faqJson = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: siteData.faq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link rel="dns-prefetch" href="//yandex.ru" />
        <link rel="dns-prefetch" href="//mc.yandex.ru" />
        <link rel="preconnect" href="https://yandex.ru" crossOrigin="" />
      </head>
      <body className={`${inter.variable} font-sans`}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJson) }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }} />
      </body>
    </html>
  );
}
