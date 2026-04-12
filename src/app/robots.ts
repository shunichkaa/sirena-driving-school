import type { MetadataRoute } from "next";
import { siteData } from "@/shared/config/site-data";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const base = siteData.officialUrl.replace(/\/$/, "");
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
