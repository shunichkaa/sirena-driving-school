import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { siteData } from "@/shared/config/site-data";
import "./globals.css";

const isProduction = process.env.NODE_ENV === "production";
const repoBasePath = "/sirena-driving-school";
const faviconPath = `${isProduction ? repoBasePath : ""}/favicon.svg`;

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const canonicalBase = siteData.officialUrl.replace(/\/$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(canonicalBase),
  title: "Автошкола Сирена Озёрск — обучение на права категории A и B",
  description:
    "Автошкола в Озёрске. Обучение на права A и B от 21 000 ₽. Гибкий график, рассрочка. 95% сдают с первого раза. Запишитесь онлайн.",
  icons: {
    icon: faviconPath,
  },
  openGraph: {
    title: "Автошкола «Сирена» — Озёрск, категории A и B",
    description:
      "Обучение на права в Озёрске: гибкий график, рассрочка без переплат, опытные инструкторы. Запись на консультацию онлайн.",
    locale: "ru_RU",
    type: "website",
    url: canonicalBase,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const localBusinessJson = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Автошкола «Сирена»",
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. Октябрьская, д. 7, оф. 315",
    addressLocality: "Озёрск",
    addressCountry: "RU",
  },
  telephone: siteData.phoneTel,
  email: siteData.email,
  url: canonicalBase,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "10:00",
      closes: "15:00",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} font-sans`}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJson) }}
        />
      </body>
    </html>
  );
}
