import type { MetadataRoute } from "next";
import { appBasePath } from "@/shared/config/app-base-path";
import { siteData } from "@/shared/config/site-data";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const baseOrigin = siteData.officialUrl.replace(/\/$/, "");
  const base = `${baseOrigin}${appBasePath}`;
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${base}/sitemap.xml`,
    host: baseOrigin,
  };
}
