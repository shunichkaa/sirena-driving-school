import type { MetadataRoute } from "next";
import { siteData } from "@/shared/config/site-data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteData.officialUrl.replace(/\/$/, "");
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/personal-data/`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
  ];
}
