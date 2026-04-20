import type { MetadataRoute } from "next";
import { appBasePath } from "@/shared/config/app-base-path";
import { siteData } from "@/shared/config/site-data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseOrigin = siteData.officialUrl.replace(/\/$/, "");
  const base = `${baseOrigin}${appBasePath}`;
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/personal-data/`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
  ];
}
