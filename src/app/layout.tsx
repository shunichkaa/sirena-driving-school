import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const isProduction = process.env.NODE_ENV === "production";
const repoBasePath = "/sirena-driving-school";
const faviconPath = `${isProduction ? repoBasePath : ""}/favicon.svg`;

const inter = Inter({
  variable: "--font-geist",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: 'Автошкола «Сирена»',
  description: "Официальный сайт Автошколы «Сирена»: обучение на категории A и B в Озерске.",
  icons: {
    icon: faviconPath,
  },
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
      </body>
    </html>
  );
}
