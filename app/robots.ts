import type { MetadataRoute } from "next";
import { CONFIG } from "@/lib/menu";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${CONFIG.siteUrl}/sitemap.xml` };
}
